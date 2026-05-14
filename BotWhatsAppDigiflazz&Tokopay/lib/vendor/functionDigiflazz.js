require('../../setting/config');



const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const md5 = require('md5');
const fetch = require('node-fetch');
const moment = require('moment-timezone');

// Function Pembantu
const { formatmoney, generateRandomString } = require('../../lib/functionTrx');
const { formatp, isUrl, jsonformat, fetchJson, sleep, runtime, hitungmundur, msToDate, acakindong } = require('../../lib/lainnya');

async function createTransactionDigiflazz(buyerSkuCode, customerNo, refId) {
    const dataTransaksi = {
        username: usernamekey,
        buyer_sku_code: buyerSkuCode,
        customer_no: customerNo,
        ref_id: refId,
        sign: md5(usernamekey + productionkey + refId),
    };

    const response = await fetch('https://api.digiflazz.com/v1/transaction', {
        method: 'POST',
        body: JSON.stringify(dataTransaksi),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response.json();
    return res;
}

async function checkTransactionStatusDigiflazz(refId, skuCode, customerNo, client, m, timeout = 600000) {
  const tanggal = moment().tz('Asia/Jakarta').locale('id').format('dddd, D MMM YYYY');
  const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z');
  const startTime = Date.now();
  const notifOwner = global.owner[0] + '@s.whatsapp.net';

  const cekData = {
    username: usernamekey,
    buyer_sku_code: skuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign: md5(usernamekey + productionkey + refId),
  };

  try {
    const response = await fetch('https://api.digiflazz.com/v1/transaction', {
      method: 'POST',
      body: JSON.stringify(cekData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const ress = await response.json();
    const productName = await getProductName(skuCode);

    if (ress.data.status === 'Sukses') {
        console.log(ress)
      await m.reply(`── 「 *DETAIL PESANAN* 」 ──\n
> Status : ${ress.data.message}
> Tujuan : ${ress.data.customer_no}
> Produk : ${productName}
> Waktu : ${tanggal} | ${wayah}
> Invoice : ${ress.data.sn}\n
Terimakasih telah bertransaksi di ${packname}`);

      await client.sendMessage(
        notifOwner,
        {
          text: `Saldo Digiflazz Kamu telah dikurangi sebesar ${formatmoney(
            ress.data.price
          )} untuk pembelian produk ${productName}.\n\nSisa saldo saat ini adalah ${formatmoney(
            ress.data.buyer_last_saldo
          )}.\n\nJika transaksi Kamu mengalami masalah, silahkan hubungi Sellernya melalui\n\nWhatsapp : ${
            ress.data.wa
          }\nTelegram : ${ress.data.tele}`,
        },
        { quoted: m }
      );
    } else if (ress.data.status === 'Gagal') {
      console.log(ress.data);
      await m.reply(`── 「 *DETAIL PESANAN* 」 ──\n
> Status : ${ress.data.message}
> Tujuan : ${ress.data.customer_no}
> Produk : ${productName}
> Ref ID : ${ress.data.ref_id}
> Waktu : ${tanggal} | ${wayah}\n
Silahkan hubungi admin ${packname}`);
    } else {
      if (Date.now() - startTime >= timeout) {
        await m.reply('Waktu tunggu habis. Silahkan ketik .cektransaksi Refidnya');
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await checkTransactionStatusDigiflazz(refId, skuCode, customerNo, client, m, timeout);
      }
    }
  } catch (error) {
    console.error('Error during checking transaction status:', error);
    await m.reply('Terjadi kesalahan saat memeriksa status transaksi.');
  }
}

async function checkSaldoDigiflazz() {
    const sign = md5(usernamekey + productionkey + 'depo');

    const data = {
        cmd: 'deposit',
        username: usernamekey,
        sign: sign,
    };

    try {
        const response = await fetch('https://api.digiflazz.com/v1/cek-saldo', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching saldo data:', error);
        throw error;
    }
}

async function getPriceListDigiflazz(nameItem, itemCategory, m, client, customProductNameReplacement) {
  await m.reply(mess.wait);

  const signa = md5(usernamekey + productionkey + `pricelist`);
  const data = {
    cmd: "prepaid",
    username: usernamekey,
    sign: signa,
  };

  try {
    const response = await fetch("https://api.digiflazz.com/v1/price-list", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data: responseData } = await response.json();
    const sortedList = responseData
      .filter((item) => item[itemCategory].toLowerCase() === nameItem.toLowerCase())
      .sort((a, b) => a.price - b.price);

    let teks = `*LIST ${nameItem.toUpperCase()} DIGIFLAZZ*\n\n`;
    sortedList.forEach((item) => {
      const statusIcon = item.seller_product_status ? "✅" : "🚫";
      const productName = customProductNameReplacement
        ? customProductNameReplacement(item.product_name)
        : item.product_name;

      teks += `\n_*🛒 ${productName}*_\n> ${formatmoney(item.price)}\n> ${item.buyer_sku_code}\n> ${statusIcon}\n`;
    });

    teks += "\n\n*Keterangan:*\n✅ = Produk tersedia\n🚫 = Produk tidak tersedia";
    client.sendMessage(m.chat, { text: teks, mentions: [m.sender] }, { quoted: m });
  } catch (error) {
    console.error(`Error fetching price list for ${nameItem}:`, error);
    // Handle error appropriately
  }
}

async function getProductName(skuCode) {
  const signa = md5(usernamekey + productionkey + `pricelist`);
  const data = {
    cmd: `prepaid`,
    username: usernamekey,
    code: skuCode,
    sign: signa,
  };

  try {
    const response = await fetch('https://api.digiflazz.com/v1/price-list', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataResponse = await response.json();
    const productName = dataResponse.data[0].product_name || 'Produk tidak ditemukan';

    return productName;
  } catch (error) {
    console.error('Error during fetching product details:', error);
    return 'Produk tidak ditemukan';
  }
}

async function getProductDetail(skuCode, m) {
  const signa = md5(usernamekey + productionkey + `pricelist`);
  const data = {
    cmd: `prepaid`,
    username: usernamekey,
    code: skuCode,
    sign: signa,
  };

  try {
    const response = await fetch('https://api.digiflazz.com/v1/price-list', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataResponse = await response.json();
    const productData = dataResponse.data[0];

    if (productData) {
      const productName = productData.product_name || 'Produk tidak ditemukan';
      const status = productData.seller_product_status ? "Ready" : "Habis";
      const multi = productData.multi ? "Bisa" : "Tidak";

      await m.reply(`*DETAIL PRODUK DIGIFLAZZ*\n
> Nama : ${productName}
> Harga : ${formatmoney(productData.price)}
> Seller : ${productData.seller_name}
> Status Produk Seller : ${status}
> Cut Off : ${productData.start_cut_off} - ${productData.end_cut_off}
> Multi : ${multi}
> Deskribsi : ${productData.desc}`);
    } else {
      await m.reply(`Kode Produk Digiflazz *"${skuCode}"* tidak ditemukan`);
    }
  } catch (error) {
    console.error('Error during fetching product details:', error);
    await m.reply(`Terjadi kesalahan saat mengambil detail produk Digiflazz *"${skuCode}"*`);
  }
}

module.exports = { createTransactionDigiflazz, checkTransactionStatusDigiflazz, checkSaldoDigiflazz, getPriceListDigiflazz, getProductName, getProductDetail };