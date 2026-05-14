/**
 * Integrasi Payment Gateway: SakuRupiah
 * Menggantikan TokoPay
 * Dokumentasi: https://sakurupiah.id/developers/api-dokumentasi
 */

require('../../setting/config');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const crypto = require('crypto');
const moment = require('moment-timezone');
const {
    addMoney,
    getMonUser,
    catatRiwayatTransaksi
} = require('../../lib/money');
const { formatmoney, generateRandomString } = require('../../lib/functionTrx');

const BASE_URL = 'https://sakurupiah.id/api';

// ====== HELPER: Buat Signature HMAC-SHA256 ======
function buatSignature(api_id, method, merchant_ref, amount) {
    const apikey = global.sakurupiah.apiKey;
    return crypto
        .createHmac('sha256', apikey)
        .update(api_id + method + merchant_ref + String(amount))
        .digest('hex');
}

// ====== HELPER: Build FormData sebagai URLSearchParams ======
function buildForm(data) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
        params.append(key, value);
    }
    return params;
}

// ====== 1. CEK SALDO MERCHANT (pengganti checkInfoAccountTokopay) ======
async function checkInfoAccountSakurupiah() {
    const api_id = global.sakurupiah.apiId;
    const apiKey = global.sakurupiah.apiKey;

    try {
        const response = await fetch(`${BASE_URL}/check_balance.php`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: buildForm({
                api_id,
                method: 'balance'
            }),
        });

        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error cek saldo SakuRupiah:', err);
        throw err;
    }
}

// ====== 2. BUAT TRANSAKSI BARU (pengganti createNewTransactionTokopay) ======
async function createNewTransactionSakurupiah(merchant_ref, amount) {
    const api_id = global.sakurupiah.apiId;
    const apiKey = global.sakurupiah.apiKey;
    const method = global.sakurupiah.method; // misal: 'QRIS'

    const signature = buatSignature(api_id, method, merchant_ref, amount);

    try {
        const response = await fetch(`${BASE_URL}/create.php`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: buildForm({
                api_id,
                method,
                name: global.tokopay?.name || global.packname || 'Customer',
                email: global.sakurupiah.email,
                phone: global.sakurupiah.number,
                amount: String(parseInt(amount)),
                merchant_fee: '1',
                merchant_ref: String(merchant_ref),
                expired: '1',
                produk: global.packname,
                qty: '1',
                harga: String(parseInt(amount)),
                callback_url: 'https://google.com',
                return_url: 'https://google.com',
                signature,
            }),
        });

        const result = await response.json();
        console.log('SakuRupiah create response:', result);

        // Normalisasi response agar mirip format TokoPay
        if (result.status === '200' && result.data && result.data[0]) {
            const d = result.data[0];
            return {
                status: 'Success',
                data: {
                    trx_id: d.trx_id,
                    total_bayar: d.total,
                    total_diterima: d.total,
                    qr_link: d.qr || d.checkout_url || '',
                    payment_no: d.payment_no || '',
                    checkout_url: d.checkout_url || '',
                    via: d.via || method,
                }
            };
        }

        return {
            status: 'Failed',
            message: result.message || 'Gagal membuat transaksi'
        };
    } catch (err) {
        console.error('Error buat transaksi SakuRupiah:', err);
        throw err;
    }
}

// ====== 3. CEK STATUS TRANSAKSI (by merchant_ref) ======
async function checkStatusByMerchantRef(merchant_ref) {
    const api_id = global.sakurupiah.apiId;
    const apiKey = global.sakurupiah.apiKey;

    try {
        const response = await fetch(`${BASE_URL}/transaction.php`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: buildForm({
                api_id,
                method: 'transaction',
                merchant_ref,
            }),
        });

        const result = await response.json();
        console.log('SakuRupiah status response:', result);
        return result;
    } catch (err) {
        console.error('Error cek status SakuRupiah:', err);
        throw err;
    }
}

// ====== 4. POLLING CEK DEPOSIT (pengganti checkPaymentStatusDepositTokopay) ======
async function checkPaymentStatusDepositSakurupiah(merchant_ref, amount, startTime, sender, client, m) {
    const ownerr = global.owner[0];
    const currentTime = Date.now();

    try {
        const result = await checkStatusByMerchantRef(merchant_ref);

        if (result.status === '200' && result.data && result.data.length > 0) {
            const statusTrx = result.data[0].status;

            // ===== BERHASIL =====
            if (statusTrx === 'berhasil') {
                const jumlah = parseFloat(amount);
                await addMoney(sender, jumlah);
                await m.reply(
                    `🎉 *Pembayaran Berhasil!* 🎉\n\n` +
                    `Saldo Anda bertambah sebesar ${formatmoney(jumlah)}\n` +
                    `Saldo saat ini : ${formatmoney(getMonUser(sender))}`
                );
                await client.sendMessage(
                    ownerr + '@s.whatsapp.net',
                    {
                        text: `── 「 *DEPOSIT SALDO OTOMATIS* 」 ──\n\n` +
                            `Dari : ${sender.replace('@s.whatsapp.net', '')}\n` +
                            `Deposit : ${formatmoney(jumlah)}\n` +
                            `Saldo saat ini : ${formatmoney(getMonUser(sender))}`
                    },
                    { quoted: m }
                );
                return;

            // ===== KADALUARSA/EXPIRED =====
            } else if (statusTrx === 'expired') {
                return m.reply('Pembayaran sudah kadaluwarsa. Silahkan lakukan deposit ulang!');

            // ===== PENDING: lanjut polling =====
            } else if (statusTrx === 'pending') {
                // Cek apakah timeout 5 menit sudah lewat
                if (currentTime - startTime >= 300000) {
                    return m.reply('Waktu pembayaran habis. Silahkan ketik .deposit lagi untuk membuat transaksi baru.');
                }
                // Tunggu 7.5 detik lalu cek lagi
                setTimeout(() => {
                    checkPaymentStatusDepositSakurupiah(merchant_ref, amount, startTime, sender, client, m);
                }, 7500);
            }

        } else {
            console.error('Respon tidak valid dari SakuRupiah:', result);
            return m.reply(result.message || 'Gagal cek status pembayaran.');
        }
    } catch (err) {
        console.error('Error polling deposit SakuRupiah:', err);
    }
}

// ====== 5. POLLING CEK STATUS PEMBAYARAN PRODUK (pengganti checkTransactionPaymentStatusTokopay) ======
async function checkTransactionPaymentStatusSakurupiah(merchant_ref, amount, startTime, sender, client, m, textAutoPayment) {
    try {
        const result = await checkStatusByMerchantRef(merchant_ref);

        if (result.status === '200' && result.data && result.data.length > 0) {
            const statusTrx = result.data[0].status;

            // Normalisasi ke format yang dipakai mechaine.js
            if (statusTrx === 'berhasil') {
                return { data: { status: 'Success' } };
            } else if (statusTrx === 'expired') {
                return { data: { status: 'Failed' } };
            } else {
                return { data: { status: 'Pending' } };
            }
        }

        return { data: { status: 'Pending' } };
    } catch (err) {
        console.error('Error cek status transaksi SakuRupiah:', err);
        return { data: { status: 'Pending' } };
    }
}

module.exports = {
    checkInfoAccountSakurupiah,
    createNewTransactionSakurupiah,
    checkPaymentStatusDepositSakurupiah,
    checkTransactionPaymentStatusSakurupiah,
};
