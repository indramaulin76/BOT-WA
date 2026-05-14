    /**
 * Pengembang : Bangirul
 * Instagram @Bangirul
 * Terima kasih telah menjadi bagian dari script ini
*/

require('./config')

const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    downloadContentFromMessage, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType,
    InteractiveMessage,
} = require("baileys");

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const axios = require('axios');
const cheerio = require('cheerio');
const crypto = require('crypto');
const os = require('os');
const FormData = require('form-data')
const { exec } = require("child_process");
const speed = require('performance-now');
const { sizeFormatter } = require('human-readable');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const moment = require('moment-timezone');
const ms = require('parse-ms');
const md5 = require('md5');
const { set } = require('lodash');
const archiver = require('archiver');
const cancelFlags = new Map();

// Function Addlist
const imgbb = require("imgbb-uploader");
const imgbbapi = "23ebb69bc2325696a7f283d9d8b6c146"
const db_respon_list = JSON.parse(fs.readFileSync('./src/db_list.json'));
const { 
    addResponList, 
    delResponList, 
    isAlreadyResponList, 
    isAlreadyResponListGroup, 
    sendResponList, 
    updateResponList, 
    getDataResponList, 
    renameResponList 
} = require('../lib/function_list');


// Function Grub
const money = JSON.parse(fs.readFileSync('./src/balance.json'));
const signup = JSON.parse(fs.readFileSync('./src/user.json'));
const ban = JSON.parse(fs.readFileSync('./src/banned.json'));
const isBanned = JSON.parse(fs.readFileSync('./src/banned.json'));
const afk = require('../lib/afk');
const _afk = JSON.parse(fs.readFileSync('./src/afk.json'));
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'));

let set_welcome_db = JSON.parse(fs.readFileSync('./src/grub/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./src/grub/set_left.json'));
let _welcome = JSON.parse(fs.readFileSync('./src/grub/welcome.json'));
let _left = JSON.parse(fs.readFileSync('./src/grub/left.json'));
let set_open = JSON.parse(fs.readFileSync('./src/grub/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./src/grub/set_close.json'));
const {
  isSetClose,
  addSetClose,
  removeSetClose,
  changeSetClose,
  getTextSetClose,
  isSetLeft,
  addSetLeft,
  removeSetLeft,
  changeSetLeft,
  getTextSetLeft,
  isSetOpen,
  addSetOpen,
  removeSetOpen,
  changeSetOpen,
  getTextSetOpen,
  isSetWelcome,
  addSetWelcome,
  removeSetWelcome,
  changeSetWelcome,
  getTextSetWelcome
} = require("../lib/store")


// Function Pembantu
const { 
    formatmoney, 
    formatmoneyy, 
    generateRandomString 
} = require('../lib/functionTrx');
const { 
    formatp, 
    isUrl, 
    jsonformat, 
    getGroupAdmins, 
    fetchJson, 
    sleep, 
    runtime, 
    hitungmundur,
    msToDate, 
    acakindong 
} = require('../lib/lainnya');


/* FITUR TOPUP DIGIFLAZZ */
const { createTransactionDigiflazz, checkTransactionStatusDigiflazz, checkSaldoDigiflazz, getPriceListDigiflazz, getProductName, getProductDetail } = require('../lib/vendor/functionDigiflazz');
// Topup Publik
const { 
    addMoney, 
    refundMoney, 
    moneyAdd, 
    subtractMoney, 
    resetMoney, 
    getMonUser, 
    getRoleUser, 
    catatRiwayatTransaksi,
    cleanNumber 
} = require('../lib/money');
const pathTrx = "./src/transaksi/user/";
const archivePath = "./src/transaksi/user/archive/";
const pathPascabayar = "./src/transaksi/digiflazz/pascabayar/";
// Cetak Invoice
const { saveTransactionData, createInvoiceImage, sendInvoiceImage, hapusinvoice } = require("../lib/invoice/createInvoice");
// Versi Invoice
const invoiceFilePath = './src/transaksi/invoice/invoiceMode.json';


/* FITUR PAYMENT GATEWAY */
const { checkInfoAccountSakurupiah, createNewTransactionSakurupiah, checkPaymentStatusDepositSakurupiah, checkTransactionPaymentStatusSakurupiah } = require('../lib/paygate/sakurupiah.js');


module.exports = bgrl = async (client, m, chatUpdate, store) => {
    try {
        const body =
            (m.mtype === 'conversation') ? m.message.conversation :
            (m.mtype == 'imageMessage') ? (m.message.imageMessage.caption || '') :
            (m.mtype == 'videoMessage') ? (m.message.videoMessage.caption || '') :
            (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
            (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
            (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
            (m.mtype === 'messageContextInfo')
                ? (m.message.buttonsResponseMessage?.selectedButtonId ||
                   m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
                   m.text || '')
                : '';

var budy = typeof m.text == "string" ? m.text : "";
const bodyText = (body || "").trim()

const prefixRegex = /^[\\/!#.]/
const hasPrefix = prefixRegex.test(bodyText)

const prefix = hasPrefix ? bodyText.match(prefixRegex)[0] : ""

const command = hasPrefix
? bodyText.slice(1).trim().split(/ +/).shift().toLowerCase()
: bodyText.split(/ +/).shift().toLowerCase()

const isCmd2 = bodyText.length > 0

const chath =
(m.mtype === 'conversation') ? m.message.conversation :
(m.mtype == 'imageMessage') ? (m.message.imageMessage.caption || '') :
(m.mtype == 'documentMessage') ? (m.message.documentMessage.caption || '') :
(m.mtype == 'videoMessage') ? (m.message.videoMessage.caption || '') :
(m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
(m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
(m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
(m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
(m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
''

const args = bodyText.split(/ +/).slice(1)

const pushname = m.pushName || "-"
const botNumber = await client.decodeJid(client.user.id)

const isCreator = [botNumber, ...global.owner]
.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
.includes(m.sender)

const isBanned = ban.includes(m.sender)

const itsMe = m.sender == botNumber ? true : false

let text = (q = args.join(" "))

const fatkuns = (m.quoted || m)

const quoted =
(fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] :
(fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
(fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] :
m.quoted ? m.quoted : m

const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)

const arg = bodyText.substring(bodyText.indexOf(" ") + 1)
const arg1 = arg.substring(arg.indexOf(" ") + 1)

const quotedMsg = m

const tanggal = moment().tz('Asia/Jakarta').locale('id').format('dddd, D MMM YYYY');
const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z')
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
	var ucapanWaktu = 'Selamat Malam'
}
if(time2 < "19:00:00"){
	var ucapanWaktu = 'Selamat Petang'
}
if(time2 < "18:00:00"){
	var ucapanWaktu = 'Selamat Sore'
}
if(time2 < "15:00:00"){
	var ucapanWaktu = 'Selamat Siang️'
}
if(time2 < "11:00:00"){
	var ucapanWaktu = 'Selamat Pagi'
}
if(time2 < "05:00:00"){
	var ucapanWaktu = 'Selamat Malam'
}
      
var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
var date = new Date();
var thisDay = date.getDay(),
thisDay = myDays[thisDay];  
    
const from = m.chat;
const reply = m.reply;

const sender = m.sender;
const mek = chatUpdate.messages[0];  
    
const content = JSON.stringify(m.message)
    
const type = getContentType(m.message)

const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = m.quoted ? m.quoted.sender : "";
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []
let mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
      
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isQuoted = type == 'extendedTextMessage'

const isQuotedImage = isQuoted ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuoted ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuoted ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuoted ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuoted ? content.includes('stickerMessage') ? true : false : false
const isQuotedContact = isQuoted ? content.includes('contactMessage') ? true : false : false
const isQuotedLocation = isQuoted ? content.includes('locationMessage') ? true : false : false
    
async function downloadAndSaveMediaMessage (type_file, path_file) {
    if (type_file === 'image') {
        var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    } else if (type_file === 'video') {
        var stream = await downloadContentFromMessage(m.message.videoMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    } else if (type_file === 'sticker') {
        var stream = await downloadContentFromMessage(m.message.stickerMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return path_file
    } else if (type_file === 'audio') {
        var stream = await downloadContentFromMessage(m.message.audioMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
		return path_file
    }
}

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

// Group
// ===== GROUP METADATA (AMAN) =====
let groupMetadata = null;
let groupName = "";
let participants = [];
let groupAdmins = [];

if (m.isGroup) {
    try {
        groupMetadata = await client.groupMetadata(m.chat);
        groupName = groupMetadata.subject || "";
        participants = groupMetadata.participants || [];
        groupAdmins = getGroupAdmins(participants);
    } catch (e) {
        groupMetadata = null;
    }
}

const isGroup = m.isGroup;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

const isUser = signup.includes(sender);
const isAfkOn = afk.checkAfkUser(m.sender, _afk);
const isWelcome = _welcome.includes(m.chat);
const isLeft = _left.includes(m.chat);

function mentions(teks, mems = [], quoted = null) {
    return client.sendMessage(
        m.chat,
        { text: teks, mentions: mems },
        quoted ? { quoted: m } : {}
    );
}

//━━━━━━━━━━━━━━━[ FITUR GRUB ]━━━━━━━━━━━━━━━━━//
// Antilink
const isAntiLink = isGroup ? antilink.includes(from) : false
if (isGroup && isAntiLink && !isCreator && !isAdmins && isBotAdmins){
            if (chath.includes(`https://chat.whatsapp.com`)) {
                await client.sendMessage(from, { delete: m.key })
                reply(`🛡 *GROUP LINK DETECTOR* 🛡\n\nBudayakan baca Deskribsi mas, mari saling menghargai`)
                let number = sender
client.groupParticipantsUpdate(from, [number], "remove")
            }
    }   
 
// Addlist
let db_respon_list = [];
if (fs.existsSync('./src/db_list.json')) {
	db_respon_list = JSON.parse(fs.readFileSync('./src/db_list.json', 'utf8'));
}
if (!isCmd2 && m.isGroup && chath && isAlreadyResponList(from, chath, db_respon_list)) {
      var get_data_respon = getDataResponList(from, chath, db_respon_list)
      if (get_data_respon.isImage === false) {
      client.sendMessage(from, { text: sendResponList(from, chath, db_respon_list) }, { quoted: m })
    } else {
      client.sendMessage(m.chat, { caption: get_data_respon.response, image: { url: get_data_respon.image_url }, mentions: [m.sender] });
    }
}       
   
// Push Message To Console
let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

// Auto Daftar
if (isCmd2 && !isUser) {
	signup.push(sender)
	fs.writeFileSync('./src/user.json', JSON.stringify(signup, null, 3))
}

// FITUR AFK  
if (m.isGroup && !m.key.fromMe) {
    let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let ment of mentionUser) {
        if (afk.checkAfkUser(ment, _afk)) {
            let getId2 = afk.getAfkId(ment, _afk)
            let getReason2 = afk.getAfkReason(getId2, _afk)
            let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
            let heheh2 = ms(getTimee)
            reply(`*Mohon maaf, admin sedang offline.*\n*Admin sedang ${getReason2} sejak ${heheh2.hours} jam ${heheh2.minutes} menit yang lalu*\n*Jangan spam dan jika sudah online pesan anda akan segera dibalas.*`)
        }
    }
    if (afk.checkAfkUser(m.sender, _afk)) {
        let getId = afk.getAfkId(m.sender, _afk)
        let getReason = afk.getAfkReason(getId, _afk)
        let getTime = Date.now() - afk.getAfkTime(getId, _afk)
        let heheh = ms(getTime)
        _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
        fs.writeFileSync('./src/afk.json', JSON.stringify(_afk))
        client.sendTextWithMentions(m.chat, `*@${m.sender.split('@')[0]} telah online kembali*\n*Yang mau transaksi melalui Admin silahkan chat admin kembali atau tunggu balasan admin.*\n`, m)
    }
}



var _0x179eed=_0x25ce;(function(_0x3bde4a,_0x2f75d3){var _0x980564=_0x25ce,_0x14bdef=_0x3bde4a();while(!![]){try{var _0x4e3ce8=parseInt(_0x980564(0xcd))/0x1*(parseInt(_0x980564(0xc6))/0x2)+-parseInt(_0x980564(0xc9))/0x3+parseInt(_0x980564(0xcf))/0x4*(-parseInt(_0x980564(0xc8))/0x5)+-parseInt(_0x980564(0xd9))/0x6*(-parseInt(_0x980564(0xd8))/0x7)+parseInt(_0x980564(0xc7))/0x8*(-parseInt(_0x980564(0xd0))/0x9)+parseInt(_0x980564(0xcc))/0xa*(-parseInt(_0x980564(0xcb))/0xb)+parseInt(_0x980564(0xc5))/0xc;if(_0x4e3ce8===_0x2f75d3)break;else _0x14bdef['push'](_0x14bdef['shift']());}catch(_0x57ccd9){_0x14bdef['push'](_0x14bdef['shift']());}}}(_0x7906,0x43533));if(isCmd2&&!m['isGroup'])console[_0x179eed(0xc3)](chalk[_0x179eed(0xd7)](_0x179eed(0xd5)),color(argsLog,_0x179eed(0xd2)),chalk['green']('dari'),chalk[_0x179eed(0xd7)](m[_0x179eed(0xd3)]||m['sender'][_0x179eed(0xd4)]('@')[0x0]),chalk[_0x179eed(0xd7)]('[\x20'+m[_0x179eed(0xd6)][_0x179eed(0xd1)](_0x179eed(0xca),'')+'\x20]\x20'+wayah));else isCmd2&&m['isGroup']&&console['log'](chalk[_0x179eed(0xd7)]('[\x20bangirulstore\x20]'),color(argsLog,_0x179eed(0xd2)),chalk[_0x179eed(0xd7)](_0x179eed(0xce)),chalk[_0x179eed(0xd7)](m['pushName']||m['sender'][_0x179eed(0xd4)]('@')[0x0]),chalk['green']('[\x20'+m[_0x179eed(0xd6)][_0x179eed(0xd1)](_0x179eed(0xca),'')+_0x179eed(0xc4)+wayah),chalk[_0x179eed(0xd7)]('Group'),chalk[_0x179eed(0xd7)](groupName));function _0x25ce(_0x44b690,_0x8c311){var _0x790654=_0x7906();return _0x25ce=function(_0x25ceaa,_0x1dae9c){_0x25ceaa=_0x25ceaa-0xc3;var _0x1e7bd1=_0x790654[_0x25ceaa];return _0x1e7bd1;},_0x25ce(_0x44b690,_0x8c311);}function _0x7906(){var _0x262795=['replace','turquoise','pushName','split','[\x20bangirulstore\x20]','sender','green','3458gJZmpp','4866balKmF','log','\x20]\x20','6829548XKGrlM','7550tslYWm','19576qGXrNE','15JhwWfb','676368hZtwUv','@s.whatsapp.net','11MtwCtf','3377020HTwEiG','55fXNfOA','dari','337096dDhGJY','315QACaCy'];_0x7906=function(){return _0x262795;};return _0x7906();}

//━━━━━━━━━━━━━━━[ FITUR NON MULTI ORDER ]━━━━━━━━━━━━━━━━━//  
// FITUR NON MULTI ORDER 
const transactionsFile = './src/recentTransactions.json';
let recentTransactions = loadRecentTransactions();

function loadRecentTransactions() {
    try {
        const data = fs.readFileSync(transactionsFile);
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

function saveRecentTransactions(transactions) {
    try {
        fs.writeFileSync(transactionsFile, JSON.stringify(transactions));
    } catch (err) {
        console.error('Gagal menyimpan data transaksi ke file JSON:', err);
    }
}
    
    
    



    
//━━━━━━━━━━━━━━━[ FITUR DIGIFLAZZ ]━━━━━━━━━━━━━━━━━//
// Cek Versi Invoice apakah Gambar / Teks
if (!fs.existsSync(invoiceFilePath)) {
    fs.writeFileSync(invoiceFilePath, JSON.stringify({
        mode: false
    }, null, 2));
}
const invoiceData = JSON.parse(fs.readFileSync(invoiceFilePath));
let invoiceMode = invoiceData.mode; // true untuk gambar, false untuk teks

//━━━━━━━━━━━━━━━[ FITUR DIGIFLAZZ ]━━━━━━━━━━━━━━━━━//    
// CTR DIGIFLAZZ PUBLIK
async function rekursifDigiPublik(transactionData, timeout = 600000) {
    const fs = require('fs');
    const path = require('path');
    const ownerr = global.owner[0];

    const invoicePath = `src/transaksi/invoice/invoice_${transactionData.refid}.jpeg`;
    let startTime = Date.now();

    let cekdata = {
        username: usernamekey,
        buyer_sku_code: transactionData.kode,
        customer_no: transactionData.tujuan,
        ref_id: transactionData.refid,
        sign: md5(usernamekey + productionkey + transactionData.refid),
    };

    try {
        const response = await fetch('https://api.digiflazz.com/v1/transaction', {
            method: 'POST',
            body: JSON.stringify(cekdata),
            headers: { 'Content-Type': 'application/json' },
        });

        const ress = await response.json();

        // ======================= SUKSES =======================
        if (ress.data.status === 'Sukses') {
            console.log(chalk.bgMagenta(`Cek Status Order Publik Digiflazz:\n`), ress);

            const waktuTransaksi = `${tanggal} | ${wayah}`;
            const invoiceTransaksi = ress.data.sn;
            const keuntungan = transactionData.harga - ress.data.price;

            // Catat riwayat transaksi
            await catatRiwayatTransaksi(
                transactionData.no,
                transactionData.produk,
                waktuTransaksi,
                transactionData.harga,
                keuntungan,
                'Sukses',
                invoiceTransaksi
            );

            // Simpan invoice JSON
            const transactionDataInvoice = {
                tujuan: ress.data.customer_no,
                produk: transactionData.produk,
                refid: ress.data.ref_id,
                harga: `${formatmoney(transactionData.harga)}`,
                nama: pushname,
                waktu: waktuTransaksi,
                invoice: invoiceTransaksi
            };

            await saveTransactionData(transactionDataInvoice);
            await sleep(3000);

            // ================= NOTIF KE OWNER =================
            const sisaSaldoBuyer = await getMonUser(sender);

            const notifOwner = `── 「 *TRANSAKSI MEMBER* 」 ──

*# Informasi Transaksi*
> Status : ${ress.data.message}
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${ress.data.customer_no}
> Ref ID : ${ress.data.ref_id}
> Invoice : ${invoiceTransaksi}
> Waktu : ${waktuTransaksi}

*# Informasi Harga*
> Harga Jual : ${formatmoney(transactionData.harga)}
> Harga Modal : ${formatmoney(ress.data.price)}
> Keuntungan : ${formatmoney(keuntungan)}

*# Informasi Pengguna*
> Nama : ${pushname}
> Nomor : ${transactionData.no}
> Role : ${getRoleUser(sender)}
> Sisa Saldo : ${formatmoney(sisaSaldoBuyer)}

*# Informasi Saldo Server*
> Sisa Saldo Digi : ${formatmoney(ress.data.buyer_last_saldo)}`;

            await client.sendMessage(
                ownerr + `@s.whatsapp.net`,
                { text: notifOwner },
                { quoted: m }
            );

            // ================= REPLY KE USER =================
            if (invoiceMode) {

                await sendInvoiceImage(transactionData.refid, client, m);

                fs.unlink(invoicePath, (err) => {
                    if (err) console.error(`Error deleting invoice image: ${err}`);
                    else console.log(`Invoice image deleted: ${invoicePath}`);
                });

            } else {

                await m.reply(`── 「 *DETAIL PESANAN* 」 ──

> Status : ${ress.data.message}
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${ress.data.customer_no}
> Waktu  : ${waktuTransaksi}
> Invoice: ${invoiceTransaksi}
> Ref ID : ${transactionData.refid}

*Terima kasih telah bertransaksi di ${packname}*`);

            }

            // ================= HAPUS FILE TRANSAKSI =================
            const transactionFileArchive = `${archivePath}${transactionData.no}.json`;
            const transactionFile = `${pathTrx}${transactionData.no}.json`;

            try {

                if (fs.existsSync(transactionFileArchive)) {

                    fs.unlinkSync(transactionFileArchive);
                    console.log(`File arsip dihapus: ${transactionFileArchive}`);
                    return;

                } else if (fs.existsSync(transactionFile)) {

                    fs.unlinkSync(transactionFile);
                    console.log(`File transaksi dihapus: ${transactionFile}`);
                    return;

                } else {

                    console.log('File tidak ditemukan di kedua lokasi.');
                    return;

                }

            } catch (error) {

                console.error(`Error saat menghapus file: ${error.message}`);

            }

        // ======================= GAGAL =======================
        } else if (ress.data.status === 'Gagal') {

            await refundMoney(sender, transactionData.harga);

            await m.reply(`── 「 *DETAIL PESANAN* 」 ──

> Status : ${ress.data.message}
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${ress.data.customer_no}
> Ref ID : ${transactionData.refid}

*_Terimakasih telah bertransaksi di ${packname}_*`);

            await client.sendMessage(
                ownerr + `@s.whatsapp.net`,
                {
                    text: `── 「 *TRANSAKSI MEMBER* 」 ──

> Status : ${ress.data.message}
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${ress.data.customer_no}
> Ref ID : ${ress.data.ref_id}

> Transaksi Dari : ${transactionData.no}
> Role : ${getRoleUser(sender)}
> Sisa Saldo : ${formatmoney(getMonUser(sender))}`
                },
                { quoted: m }
            );

            const transactionFileArchive = `${archivePath}${transactionData.no}.json`;
            const transactionFile = `${pathTrx}${transactionData.no}.json`;

            try {

                if (fs.existsSync(transactionFileArchive)) {

                    fs.unlinkSync(transactionFileArchive);
                    return;

                } else if (fs.existsSync(transactionFile)) {

                    fs.unlinkSync(transactionFile);
                    return;

                }

            } catch (error) {

                console.error(`Error saat menghapus file: ${error.message}`);

            }

        // ======================= PENDING =======================
        } else {

            if (Date.now() - startTime >= timeout) {

                await reply(`Waktu tunggu habis. Silahkan ketik .cektransaksi REFID`);
                return;

            } else {

                await new Promise(resolve => setTimeout(resolve, 5000));
                await rekursifDigiPublik(transactionData, timeout);

            }

        }

    } catch (error) {

        console.error('An error occurred:', error);

    }
}

// CTR DIGIFLAZZ PUBLIK AUTO PAYMENT
// ===== HELPER AMAN HAPUS PESAN =====
async function safeDeleteMessage(client, chat, msgOrKey) {
    try {
        const key = msgOrKey?.key ?? msgOrKey;
        if (!key) return false;

        await client.sendMessage(chat, { delete: key });
        return true;
    } catch (e) {
        console.log('Gagal hapus pesan QRIS:', e.message);
        return false;
    }
}

// ===== CTR DIGIFLAZZ PUBLIK AUTO PAYMENT =====
async function checkAutoPaymentStatus(
    unique_code,
    amount,
    startTime,
    sender,
    client,
    m,
    transactionData,
    textAutoPayment
) {
    const fs = require("fs");
    const currentTime = Date.now();
    const nomor = m.sender.split("@")[0];
    const filePath = `${pathTrx}${nomor}.json`;

    // ===== CEK CANCEL FLAG =====
    if (cancelFlags.has(nomor)) {
        console.log(`Pembatalan transaksi terdeteksi untuk nomor: ${nomor}`);
        cancelFlags.delete(nomor);
        return;
    }

    let paymentStatus;
    try {
        paymentStatus = await checkTransactionPaymentStatusSakurupiah(
            transactionData.refid,
            amount,
            startTime,
            sender,
            client,
            m,
            textAutoPayment
        );
    } catch (err) {
        console.error('Error cek status pembayaran:', err);
        return;
    }

    const status = paymentStatus?.data?.status;

    // ===== PAYMENT SUCCESS =====
    if (status === 'Success') {

        console.log('Sukses melakukan pembayaran, pesanan akan diproses');

        await m.reply(`── 「 *PEMBAYARAN DITERIMA* 」 ──
        
> Status : Transaksi Diproses
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(transactionData.harga)}
> Ref ID : ${transactionData.refid}

Pesanan anda sedang diproses, silahkan tunggu...`);

        await safeDeleteMessage(client, m.chat, transactionData.qrisKey);

        try {
            const response = await createTransactionDigiflazz(
                transactionData.kode,
                transactionData.tujuan,
                transactionData.refid
            );

            if (response?.data?.status === "Gagal") {
                await refundMoney(sender, transactionData.harga);

                await m.reply(
                    `Maaf Kak, untuk produk *${transactionData.produk}* sedang mengalami gangguan.\n\n` +
                    `Saldo yang kamu bayar sudah kami refund sebesar *${formatmoney(transactionData.harga)}*.\n\n` +
                    `Silahkan hubungi admin untuk update produk.`
                );

                await client.sendMessage(
                    global.owner[0] + `@s.whatsapp.net`,
                    {
                        text:
                            `Halo owner, produk ${transactionData.produk} sedang gangguan.\n\n` +
                            `_Alasan:_\n> ${response.data.message}`
                    },
                    { quoted: m }
                );

                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                return;
            }

            if (response?.data?.status === "Pending") {
                await rekursifDigiPublik(transactionData);
            }

        } catch (error) {
            console.error("Error during digi transaction:", error);
            await m.reply("❌ Terjadi kesalahan saat memproses transaksi.");
        }

        return;
    }

    // ===== PAYMENT FAILED =====
    if (status === 'Failed') {
        console.log(paymentStatus);

        await safeDeleteMessage(client, m.chat, transactionData.qrisKey);

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await m.reply('❌ Pembayaran gagal atau sudah kadaluwarsa. Silahkan lakukan deposit ulang!');
        return;
    }

    // ===== PAYMENT PENDING =====
    if (currentTime - startTime < 600000) { // 10 menit
        await new Promise(resolve => setTimeout(resolve, 10000));

        if (!cancelFlags.has(nomor)) {
            return await checkAutoPaymentStatus(
                unique_code,
                amount,
                startTime,
                sender,
                client,
                m,
                transactionData,
                textAutoPayment
            );
        }

        await safeDeleteMessage(client, m.chat, transactionData.qrisKey);
        cancelFlags.delete(nomor);
        return;
    }

    // ===== EXPIRED =====
    await safeDeleteMessage(client, m.chat, transactionData.qrisKey);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await m.reply('❌ Pembayaran QRIS sudah kadaluwarsa.');
}


      switch (command) {
//━━━━━━━━━━━━━━━[ FITUR DIGIFLAZZ ]━━━━━━━━━━━━━━━━━//  
// Prabayar
case 'digi': {
  if (!isCreator) throw mess.owner;
  if (!text) return m.reply(`🛒 : *CARA TRANSAKSI*\n\nGunakan perintah:\n> ${prefix}${command} (KodeProduk) (NomerTujuan) [Server]\n\nContoh:\n> ${prefix}${command} ML86 123456781234\n> ${prefix}${command} ML86 123456781234 456`);

  const fetch = require('node-fetch');

  const inputs = text.split(" ");
  const skc = inputs[0];
  const ctn = inputs[1];
  const server = inputs[2] || null;

  if (!skc || !ctn) return m.reply(`*FORMAT SALAH*\n\nGunakan perintah:\n> ${prefix}${command} (KodeProduk) (NomerTujuan) [Server]\n\nContoh:\n> ${prefix}${command} ML86 123456781234\n> ${prefix}${command} ML86 123456781234 456`);

  const productName = await getProductName(skc);
  const dgrefid = generateRandomString(4);

  // Concatenate ID and Server if server is provided
  const customerNo = server ? `${ctn} ${server}` : ctn;

  try {
    const response = await createTransactionDigiflazz(skc, customerNo, dgrefid);

    if (response.data.status === "Gagal") {
      await m.reply(response.data.message);
    } else if (response.data.status === "Pending") {
      await m.reply(`── 「 *DETAIL PESANAN* 」 ──

> Status : ${response.data.message}
> Tujuan : ${response.data.customer_no}
> Produk : ${productName}
> Ref ID : ${response.data.ref_id}

Silahkan menunggu, orderan kamu sedang diproses...`);

      await checkTransactionStatusDigiflazz(dgrefid, skc, customerNo, client, m);
    }
  } catch (error) {
    console.error("Error during digi transaction:", error);
    await m.reply("Terjadi kesalahan saat melakukan transaksi.");
  }
  break;
};

case 'cektransaksi': {
    let refid = text.split("|")[0];
    let skc = text.split("|")[1];
    let ctn = text.split("|")[2];
    let data = {
        username: usernamekey,
        buyer_sku_code: skc,
        customer_no: ctn,
        ref_id: refid,
        sign: md5(usernamekey + productionkey + refid),
    };
    fetch('https://api.digiflazz.com/v1/transaction', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        m.reply(`── 「 *DETAIL PESANAN* 」 ──\n\n*› Status :* ${res.data.message}\n*› Nomor Tujuan :* ${res.data.customer_no}\n*› Produk :* ${res.data.buyer_sku_code}\n*› Invoice :* ${res.data.sn}\n> Ref ID : ${transactionData.refid}\n\nTerimakasih telah bertransaksi di ${packname}`);
    });
    break;
};
case 'detail' : case 'cek': {
    if (!isCreator) throw mess.owner;
    const skuCode = args[0];
    if (!skuCode) return m.reply(`*_Harap Isi Kode Produk Digiflazzmu_*`);
    await getProductDetail(skuCode, m);
break;
};              
case 'cekdigi' : case 'saldodigi': {
    if (!isCreator) return m.reply(mess.owner);

    try {
        const saldoData = await checkSaldoDigiflazz();

        const message = `*INFORMASI SALDO DIGIFLAZZ*\n\nSaldo: ${formatmoney(saldoData.data.deposit)}`;
        return m.reply(message);
    } catch (error) {
        return m.reply(`_Terjadi kesalahan saat memproses permintaan. Silahkan pastikan Anda memasukkan Username & Productionkey akun Digiflazz dengan benar_`);
    }

    break;
};
case 'depodigi': {
    if (!isCreator) throw mess.owner;
    if (!text) return reply(`DEPOSIT SALDO DIGIFLAZZ\n\n\nSilahkan gunakan dengan cara :\n${prefix + command} [Nominal]/[Nama Rekening]/[Kode Bank]\n\nContoh : ${prefix + command} 200000/Khairullah/BCA\n\n\nInformasi Kode Bank :\n- BCA\n- MANDIRI\n- BRI`)
    
    const nominal = parseInt(text.split("/")[0]);
    const nama = text.split("/")[1];
    const bankCode = text.split("/")[2];
    
    if (!nominal) return m.reply(`*_Harap Isi Nominal Deposit Kamu_*`);
	if (!nama) return m.reply(`*_Harap Isi Nama Rekening Kamu_*`);
    if (!bankCode) return m.reply(`*_Harap Isi Kode Bank : BCA/MANDIRI/BRI_*`);
    
    // Daftar pemetaan kode bank ke nomor rekening bank
    const bankMappings = {
        BCA: '6042888890',
        MANDIRI: '1550009910111',
        BRI: '213501000291307',
        // Tambahkan bank lain jika diperlukan
    };
    
    const signa = md5(usernamekey + productionkey + `deposit`);
    
    // Cari nomor rekening bank yang sesuai berdasarkan kode bank yang diberikan
    const bankRekening = bankMappings[bankCode.toUpperCase()];
    if (!bankRekening) return m.reply(`*_Kode Bank Tidak Valid_*`);

    const data = {
        username: usernamekey,
        amount: nominal,
        Bank: bankCode, // Gunakan nomor rekening yang sesuai
        owner_name: nama,
        sign: signa,
    };

    fetch('https://api.digiflazz.com/v1/deposit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(res => {
        console.log(res)
        if (res.data.rc === 64) return m.reply(res.data.message)
        const anjir = `Silahkan Lakukan pembayaran ke Rekening Digiflazz Sesuai Bank Tujuan :

Rekening Bank: ${bankCode.toUpperCase()} : ${bankRekening}

atas nama *Digiflazz Interkoneksi Indonesia*

Total Deposit : Rp ${res.data.amount}
Catatan : ${res.data.notes}`;
        client.sendText(m.chat, anjir, m);
    })
    .catch(error => {
        m.reply(`_Maaf ada gangguan_`);
    });
break;
};



//━━━━━━━━━━━━━━━[ FITUR STORE ]━━━━━━━━━━━━━━━━━//  
case 'listttt': {
    if (!isGroup) {
        return m.reply(`Fitur khusus Grub! Fitur topup Otomatis? ketik .menu`);
    }
    if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
    if (!isAlreadyResponListGroup((m.isGroup ? m.chat : botNumber), db_respon_list)) return reply(`Belum ada list message yang terdaftar di group/chat ini`)

    db_respon_list.sort((a, b) => a.key.localeCompare(b.key)); // Mengurutkan list sesuai abjad

    let teks = `${ucapanWaktu} Kak *${m.pushName}*👋.\n\n🛒 ${groupMetadata.subject}\n📆 ${tanggal}\n⏰ ${wayah}\n\n=================================\n\n`;

    for (let i of db_respon_list) {
        if (i.id === (m.isGroup ? m.chat : botNumber)) {
            teks += `› ${i.key}\n`;
        }
    }

    teks += `\n=================================\n\nUntuk melihat detail produk, silahkan kirim nama produk yang ada pada list di atas. Misalnya kamu ingin melihat detail produk dari *${db_respon_list[0].key}*, maka kirim pesan *${db_respon_list[0].key}* kepada bot`;

    client.sendMessage(m.chat, {
        text: teks,
        mentions: [m.sender]
    }, {
        quoted: m
    });
    break;
}
case 'addlist': {
    if (!isGroup) {
        return m.reply(mess.group);
    }
    if (!isBotAdmins) {
        return m.reply(mess.botAdmin);
    }
    if (!isAdmins) {
        return m.reply(mess.admin);
    }
    let textSplit = text.split("@"); // Memisahkan judul dan isi dengan @
    let text1 = textSplit.shift().trim(); // Mengambil judul dan menghapus spasi ekstra
    let text2 = textSplit.join("@"); // Menggabungkan kembali bagian isi yang terpisah oleh @
    if (!text.includes("@")) { // Memastikan format input sesuai
        return m.reply(`Gunakan dengan cara ${prefix + command} *_Judul@Isinya_*`);
    }
    if (isAlreadyResponList(from, text1, db_respon_list)) {
        return m.reply(`List dengan key *${text1}* telah tersedia di grup ini`);
    }
    if (text1.startsWith(" ") || text1.endsWith(" ")) { // Memeriksa apakah judul memiliki spasi di ujung
        return m.reply("Judul tidak boleh memiliki spasi di ujung.");
    }
    if (isImage || isQuotedImage) {
        let media = await downloadAndSaveMediaMessage('image', `./src/${sender}`)
        var njay = await imgbb(imgbbapi, media)
        addResponList(from, text1, text2, true, `${njay.display_url}`, db_respon_list)
        m.reply(`Sukses menambahkan list message dengan key : *${text1}*`)
        if (fs.existsSync(media)) fs.unlinkSync(media)
    } else {
        addResponList(from, text1, text2, false, '-', db_respon_list)
        m.reply(`Sukses menambahkan list message dengan key : *${text1}*`)
    }
    break;
}
case 'dellist': {
    if (!isGroup) {
        return m.reply(mess.group);
    }
    if (!isBotAdmins) {
        return m.reply(mess.botAdmin);
    }
    if (!isAdmins) {
        return m.reply(mess.admin);
    }
    if (db_respon_list.length === 0) {
        return m.reply(`Belum ada List di Database`);
    }
    if (!text) {
        return m.reply(`Example: ${prefix + command} *_key_*`);
    }
    if (!isAlreadyResponList(from, text, db_respon_list)) {
        return m.reply(`List Response Dengan Key *_${text}_* Tidak Di Temukan`);
    }
    delResponList(from, text, db_respon_list);
    m.reply(`Sukses Delete List Dengan Key *${text}*`);
    break;
}
case 'update': {
    if (!isGroup) {
        return m.reply(mess.group);
    }
    if (!isBotAdmins) {
        return m.reply(mess.botAdmin);
    }
    if (!isAdmins) {
        return m.reply(mess.admin);
    }
    var text1 = text.split("@")[0];
    var text2 = text.split("@")[1];
    if (!text.includes("@")) {
        return m.reply(`Gunakan dengan cara ${prefix + command} *_key@response_*`);
    }
    if (!isAlreadyResponListGroup(from, db_respon_list)) {
        return m.reply(`Maaf, Untuk Key *${text1}* Belum Terdaftar`);
    }
    if (isImage || isQuotedImage) {
        let media = await downloadAndSaveMediaMessage('image', `./src/${sender}`)
        var njay = await imgbb(imgbbapi, media)
        updateResponList(from, text1, text2, true, `${njay.display_url}`, db_respon_list)
        m.reply(`Sukses update list message dengan key : *${text1}*`)
        if (fs.existsSync(media)) fs.unlinkSync(media)
    } else {
        updateResponList(from, text1, text2, false, '-', db_respon_list)
        m.reply(`Sukses update respon list dengan key *${text1}*`)
    }
    break;
}
case 'renamelist': {
    if (!isGroup) {
        return m.reply(mess.group);
    }
    if (!isBotAdmins) {
        return m.reply(mess.botAdmin);
    }
    if (!isAdmins) {
        return m.reply(mess.admin);
    }
    if (db_respon_list.length === 0) {
        return m.reply(`Belum ada List di Database`);
    }
    if (!text.includes("@")) {
        return m.reply(`Contoh penggunaan: ${prefix + command} *_keyLama@keyBaru_*`);
    }
    let keySplit = text.split("@");
    let keyLama = keySplit[0].trim();
    let keyBaru = keySplit[1].trim();

    if (!isAlreadyResponList(from, keyLama, db_respon_list)) {
        return m.reply(`List Response Dengan Key *_${keyLama}_* Tidak Ditemukan`);
    }
    if (isAlreadyResponList(from, keyBaru, db_respon_list)) {
        return m.reply(`List dengan key *${keyBaru}* sudah ada di grup ini`);
    }
    if (keyBaru.startsWith(" ") || keyBaru.endsWith(" ")) {
        return m.reply("Key baru tidak boleh memiliki spasi di ujung.");
    }

    renameResponList(from, keyLama, keyBaru, db_respon_list);
    m.reply(`Sukses mengubah nama list dari *${keyLama}* menjadi *${keyBaru}*`);
    break;
}
case 'resetlist': {
    if (!isGroup) {
        return m.reply(mess.group);
    }
    if (!isBotAdmins) {
        return m.reply(mess.botAdmin);
    }
    if (!isAdmins) {
        return m.reply(mess.admin);
    }

    const fs = require("fs");

    let groupID = m.isGroup ? m.chat : botNumber; // Mendapatkan ID grup
    let newList = db_respon_list.filter(item => item.id !== groupID); // Filter list untuk menghapus yang memiliki ID grup yang sesuai
    db_respon_list = newList; // Update db_respon_list dengan newList
    fs.writeFileSync('./src/db_list.json', JSON.stringify(newList, null, 3)); // Menulis ulang file dengan data list yang baru
    m.reply("Seluruh data list di grup ini telah direset.");
    break;
}
      
// KALKULATOR
case 'tambah': {
    const [num_one, num_two] = text.split(' ').map(Number);

    if (!num_one || !num_two) {
        return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
    }

    const result = num_one + num_two;
    reply(`Hasilnya adalah *${result}*`);
    break;
}
case 'kurang': {
    const [num_one, num_two] = text.split(' ').map(Number);

    if (!num_one || !num_two) {
        return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
    }

    const result = num_one - num_two;
    reply(`Hasilnya adalah *${result}*`);
    break;
}
case 'kali': {
    const [num_one, num_two] = text.split(' ').map(Number);

    if (!num_one || !num_two) {
        return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
    }

    const result = num_one * num_two;
    reply(`Hasilnya adalah *${result}*`);
    break;
}
case 'bagi': {
    const [num_one, num_two] = text.split(' ').map(Number);

    if (!num_one || !num_two) {
        return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
    }

    const result = num_one / num_two;
    reply(`Hasilnya adalah *${result}*`);
    break;
}

//━━━━━━━━━━━━━━━[ DIGIFLAZZ TOPUP PUBLIK ]━━━━━━━━━━━━━━━━━//
// Versi Button
case 'y': {
    const fs = require('fs')
    const fetch = require('node-fetch')

    const nomor = m.sender.split("@")[0]
    const transactionFile = `${pathTrx}${nomor}.json`
    const waOwnerUrl = `https://wa.me/${owner[0]}`

    if (!fs.existsSync(transactionFile))
        return m.reply("Tidak ada transaksi yang belum terselesaikan.")

    const transactionData = JSON.parse(fs.readFileSync(transactionFile))

    if (transactionData.status === 'processing' || transactionData.status === 'pending') {
        return m.reply('Transaksi sedang diproses, mohon tunggu sampai selesai.')
    }

    transactionData.status = 'processing'
    fs.writeFileSync(transactionFile, JSON.stringify(transactionData, null, 3))

    const userBalance = getMonUser(sender)

    if (userBalance < transactionData.harga) {
        fs.unlinkSync(transactionFile)
        return m.reply('Saldo Kamu tidak mencukupi, silahkan ketik *.depo* untuk isi saldo.')
    }

    await moneyAdd(sender, transactionData.harga)

    let topupffdata = {
        username: usernamekey,
        buyer_sku_code: transactionData.kode,
        customer_no: transactionData.tujuan,
        ref_id: transactionData.refid,
        sign: md5(usernamekey + productionkey + transactionData.refid),
    }

    fetch('https://api.digiflazz.com/v1/transaction', {
        method: 'POST',
        body: JSON.stringify(topupffdata),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then(async (res) => {

        if (res.data.status === "Gagal") {

            await refundMoney(sender, transactionData.harga)

            await m.reply(
`Maaf Kak, produk ${transactionData.produk} sedang gangguan.
Saldo telah kami refund ${formatmoney(transactionData.harga)}`
            )

            await client.sendMessage(
                global.owner[0] + '@s.whatsapp.net',
                { text: `Produk ${transactionData.produk} gangguan\nAlasan: ${res.data.message}` },
                { quoted: m }
            )

            fs.unlinkSync(transactionFile)

        } else if (res.data.status === "Pending") {

            transactionData.status = 'pending'
            fs.writeFileSync(transactionFile, JSON.stringify(transactionData, null, 3))

            const destPath = `${archivePath}${nomor}.json`
            fs.renameSync(transactionFile, destPath)

            await m.reply(
`── 「 *DETAIL PESANAN* 」 ──

> Status : ${res.data.message}
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(transactionData.harga)}
> Ref ID : ${transactionData.refid}

Pesanan sedang diproses...`
            )

            await rekursifDigiPublik(transactionData)

        } else {

            transactionData.status = 'completed'
            fs.writeFileSync(transactionFile, JSON.stringify(transactionData, null, 3))

        }

    })

    break
}
case 'n': case 'batal': {
  const nomor = m.sender.split("@")[0];
    const transactionFile = `${pathTrx}${nomor}.json`;

    const fs = require('fs');
    if (fs.existsSync(transactionFile)) {
        try {
            // Set cancel flag untuk menghentikan checkAutoPaymentStatus
            cancelFlags.set(nomor, true);

            // Hapus file transaksi yang tersimpan
            fs.unlinkSync(transactionFile);

            // Hapus cancel flag untuk nomor ini
            cancelFlags.delete(nomor);

            return m.reply("Transaksi berhasil dibatalkan!");
        } catch (error) {
            console.error(`Error saat membatalkan transaksi untuk nomor ${nomor}:`, error);
            return m.reply("Gagal membatalkan transaksi. Silakan coba lagi.");
        }

    } else {
        return m.reply("Tidak ada transaksi yang belum terselesaikan.");
    }
  break;
};

//======> PRODUK GAME <======//
case 'getml': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        // Cek apakah response valid (bukan rate limit / error)
        if (!Array.isArray(result.data)) {
            const errMsg = result.data?.message || 'Gagal mengambil data dari Digiflazz';
            return m.reply(`❌ *Gagal Sync Produk ML*\n\n${errMsg}\n\nSilahkan coba beberapa saat lagi.`);
        }

        const allProducts = result.data;

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Membership", "Indonesia", "Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const mlProducts = allProducts.filter(item =>
            item.brand === "MOBILE LEGENDS" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = mlProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace(/MOBILELEGEND -|MOBILE LEGENDS|Mobile Legends/g, "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-ml.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Mobile Legends Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Mobile Legends dari Digiflazz.");
    }
}
break;

case "setml": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    ml: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-ml.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Mobile Legends. Silahkan ketik *.listml*_`);
  break;
}
case 'listml': case 'ml': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-ml.json', 'utf8'));
    if (!marginData.ml) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Mobile Legends.`);

    const { bronze, silver, gold } = marginData.ml;

    // Ambil produk ML dari file
    const mlListPath = './src/listmargin/list-ml.json';
    if (!fs.existsSync(mlListPath)) {
        return m.reply(`List produk Mobile Legends belum tersedia.\nSilakan ketik *.getml* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(mlListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Membership": 1,
        "Indonesia": 2,
        "Umum": 3
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST MOBILE LEGENDS ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topupml [kodeproduk] [id] [server]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topupml ML5 12345678 1234`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargaml': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-ml.json'));
    if (!marginData.ml) {
        return m.reply(`Belum ada List harga Mobile Legends. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.ml;

    // Ambil data produk ML
    const mlListPath = './src/listmargin/list-ml.json';
    if (!fs.existsSync(mlListPath)) {
        return m.reply(`List produk Mobile Legends belum tersedia.\nSilakan ketik *.getml* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(mlListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Membership": 1,
        "Indonesia": 2,
        "Umum": 3
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA MOBILE LEGENDS (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tml': case 'topupml': {
  if (isBanned) return m.reply(`*You Have Been Banned*`);

  const nomor = m.sender.split("@")[0];

  if (fs.existsSync(`${pathTrx}${nomor}.json`)) {
    const transactionData = JSON.parse(fs.readFileSync(`${pathTrx}${nomor}.json`));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──\n\n` +
      `> Status : Transaksi Belum Selesai\n` +
      `> Kategori : ${transactionData.kategori}\n` +
      `> Produk : ${transactionData.produk}\n` +
      `> Tujuan : ${transactionData.tujuan}\n\n` +
      `Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const [skc, id, srv] = text.split(" ");

  if (!skc || !id || !srv) {
    return m.reply(
      `TOPUP MOBILE LEGENDS\n\n` +
      `*Cara order :*\n${prefix + command} [kodeproduk] [id] [server]\n\n` +
      `*Contoh :*\n${prefix + command} ML5 12345678 1234\n\n` +
      `Silahkan ketik *.listml* untuk melihat kode produk`
    );
  }

  const listml = JSON.parse(fs.readFileSync('./src/listmargin/list-ml.json'));
  const produkml = listml.find(v => v.sku.toUpperCase() === skc.toUpperCase());
  if (!produkml) return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listml* untuk melihat kode produk.`);

  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-ml.json'));
  if (!marginData.ml) return m.reply(`Belum ada list harga. Hubungi admin untuk mengatur harga produk.`);

  const { bronze, silver, gold } = marginData.ml;
  const userRole = getRoleUser(sender);
  const basePrice = produkml.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold": userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);

  const transactionData = {
    no: nomor,
    kategori: "Mobile Legends",
    kode: skc,
    produk: produkml.name,
    tujuan: `${id} ${srv}`,
    id,
    server: srv,
    harga: userRolePrice,
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {
    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {
        if (responseData.status !== 'Success') return m.reply('Terjadi kesalahan saat membuat pembayaran.');

        const data = responseData.data;
        const textTransaction = `*PEMBAYARAN OTOMATIS*\n\n` +
          `> Kategori : ${transactionData.kategori}\n` +
          `> Produk : ${transactionData.produk}\n` +
          `> Tujuan : ${transactionData.tujuan}\n` +
          `> Harga : ${formatmoney(data.total_bayar)} inc fee\n` +
          `> Ref ID : ${transactionData.refid}\n\n` +
          `Ketik *.batal* untuk membatalkan pesanan.`;

        const qrisMsg = await client.sendMessage(
          m.chat,
          { caption: textTransaction, image: { url: data.qr_link } },
          { quoted: m }
        );

        transactionData.qrisKey = qrisMsg.key;
        fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

        const startTime = Date.now();
        await checkAutoPaymentStatus(
          transactionData.refid,
          roundedUserRolePrice,
          startTime,
          sender,
          client,
          m,
          transactionData
        );
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });
  } else {
    const confirmTransaction = `*KONFIRMASI PESANAN*\n\n` +
      `> Produk : ${produkml.name}\n` +
      `> Tujuan : ${id} ${srv}\n` +
      `> Harga : ${formatmoney(userRolePrice)}\n` +
      `> Ref ID : ${dgrefid}\n\n` +
      `Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Mobile Legends Malaysia
case 'getmlmy': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Malaysia"];

        // Filter produk sesuai type yg kita mau simpan
        const mlmyProducts = allProducts.filter(item =>
            item.brand === "MOBILE LEGENDS" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = mlmyProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace(/MOBILELEGEND -|MOBILE LEGENDS|Mobile Legends/g, "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-mlmy.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Mobile Legends Malaysia Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Mobile Legends Malaysia dari Digiflazz.");
    }
}
break;

case "setmlmy": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    mlmy: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-mlmy.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Mobile Legends Malaysia. Silahkan ketik *.listmlmy*_`);
  break;
}
case 'listmlmy': case 'mlmy': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-mlmy.json', 'utf8'));
    if (!marginData.mlmy) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Mobile Legends Malaysia.`);

    const { bronze, silver, gold } = marginData.mlmy;

    // Ambil produk ML dari file
    const mlmyListPath = './src/listmargin/list-mlmy.json';
    if (!fs.existsSync(mlmyListPath)) {
        return m.reply(`List produk Mobile Legends Malaysia belum tersedia.\nSilakan ketik *.getmlmy* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(mlmyListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Malaysia": 1
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST MOBILE LEGENDS MALAYSIA ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topupmlmy [kodeproduk] [id] [server]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topupmlmy MLMY5 12345678 1234`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargamlmy': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin mlmy
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-mlmy.json'));
    if (!marginData.mlmy) {
        return m.reply(`Belum ada List harga Mobile Legends Malaysia. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.mlmy;

    // Ambil data produk ML
    const mlmyListPath = './src/listmargin/list-mlmy.json';
    if (!fs.existsSync(mlmyListPath)) {
        return m.reply(`List produk Mobile Legends Malaysia belum tersedia.\nSilakan ketik *.getmlmy* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(mlmyListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Malaysia": 1
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA MOBILE LEGENDS MALAYSIA (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tmlmy': case 'topupmlmy': {
  if (isBanned) return m.reply(`*You Have Been Banned*`);

  const nomor = m.sender.split("@")[0];

  if (fs.existsSync(`${pathTrx}${nomor}.json`)) {
    const transactionData = JSON.parse(fs.readFileSync(`${pathTrx}${nomor}.json`));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──\n\n` +
      `> Status : Transaksi Belum Selesai\n` +
      `> Kategori : ${transactionData.kategori}\n` +
      `> Produk : ${transactionData.produk}\n` +
      `> Tujuan : ${transactionData.tujuan}\n\n` +
      `Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const [skc, id, srv] = text.split(" ");

  if (!skc || !id || !srv) {
    return m.reply(
      `TOPUP MOBILE LEGENDS MALAYSIA\n\n` +
      `*Cara order :*\n${prefix + command} [kodeproduk] [id] [server]\n\n` +
      `*Contoh :*\n${prefix + command} MLMY5 12345678 1234\n\n` +
      `Silahkan ketik *.listmlmy* untuk melihat kode produk`
    );
  }

  const listmlmy = JSON.parse(fs.readFileSync('./src/listmargin/list-mlmy.json'));
  const produkmlmy = listmlmy.find(v => v.sku.toUpperCase() === skc.toUpperCase());
  if (!produkmlmy) return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listmlmy* untuk melihat kode produk.`);

  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-mlmy.json'));
  if (!marginData.mlmy) return m.reply(`Belum ada list harga. Hubungi admin untuk mengatur harga produk.`);

  const { bronze, silver, gold } = marginData.mlmy;
  const userRole = getRoleUser(sender);
  const basePrice = produkmlmy.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold": userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);

  const transactionData = {
    no: nomor,
    kategori: "Mobile Legends Malaysia",
    kode: skc,
    produk: produkmlmy.name,
    tujuan: `${id} ${srv}`,
    id,
    server: srv,
    harga: userRolePrice,
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {
    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {
        if (responseData.status !== 'Success') return m.reply('Terjadi kesalahan saat membuat pembayaran.');

        const data = responseData.data;
        const textTransaction = `*PEMBAYARAN OTOMATIS*\n\n` +
          `> Kategori : ${transactionData.kategori}\n` +
          `> Produk : ${transactionData.produk}\n` +
          `> Tujuan : ${transactionData.tujuan}\n` +
          `> Harga : ${formatmoney(data.total_bayar)} inc fee\n` +
          `> Ref ID : ${transactionData.refid}\n\n` +
          `Ketik *.batal* untuk membatalkan pesanan.`;

        const qrisMsg = await client.sendMessage(
          m.chat,
          { caption: textTransaction, image: { url: data.qr_link } },
          { quoted: m }
        );

        transactionData.qrisKey = qrisMsg.key;
        fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

        const startTime = Date.now();
        await checkAutoPaymentStatus(
          transactionData.refid,
          roundedUserRolePrice,
          startTime,
          sender,
          client,
          m,
          transactionData
        );
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });
  } else {
    const confirmTransaction = `*KONFIRMASI PESANAN*\n\n` +
      `> Produk : ${produkmlmy.name}\n` +
      `> Tujuan : ${id} ${srv}\n` +
      `> Harga : ${formatmoney(userRolePrice)}\n` +
      `> Ref ID : ${dgrefid}\n\n` +
      `Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Free Fire
case 'getff': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Membership", "Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const ffProducts = allProducts.filter(item =>
            item.brand === "FREE FIRE" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = ffProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("Free Fire ", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-ff.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Free Fire Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Free Fire dari Digiflazz.");
    }
}
break;

case "setff": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    ff: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-ff.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Free Fire Silahkan ketik *.listff*_`);
  break;
}
case 'listff': case 'ff': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-ff.json', 'utf8'));
    if (!marginData.ff) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Free Fire.`);

    const { bronze, silver, gold } = marginData.ff;

    // Ambil produk ML dari file
    const ffListPath = './src/listmargin/list-ff.json';
    if (!fs.existsSync(ffListPath)) {
        return m.reply(`List produk Free Fire belum tersedia.\nSilakan ketik *.getff* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(ffListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST FREE FIRE ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topupff [kodeproduk] [id]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topupff FF70 18913655`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargaff': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-ff.json'));
    if (!marginData.ff) {
        return m.reply(`Belum ada List harga Free Fire. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.ff;

    // Ambil data produk ML
    const ffListPath = './src/listmargin/list-ff.json';
    if (!fs.existsSync(ffListPath)) {
        return m.reply(`List produk Free Fire belum tersedia.\nSilakan ketik *.getff* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(ffListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA FREE FIRE (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tff': case 'topupff': {

  if (isBanned) return m.reply(`*You Have Been Banned*`);

  // Cek transaksi belum selesai
  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──
      
> Status : Transaksi Belum Selesai
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];   // kode produk
  const id  = text.split(" ")[1];   // user ID

  if (!skc || !id)
    return m.reply(
      `TOPUP FREE FIRE

*Cara order :*
${prefix + command} [kodeproduk] [id]

*Contoh :*
${prefix + command} FF70 18913655

Silahkan ketik *.listff* untuk melihat kode produk`
    );

  // Ambil list SKU JSON
  const listff = JSON.parse(fs.readFileSync('./src/listmargin/list-ff.json'));
  const produkff = listff.find(v => v.sku.toUpperCase() === skc.toUpperCase());

  if (!produkff) {
    return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listff* untuk melihat kode produk yang tersedia.`);
  }

  // Ambil margin
  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-ff.json'));
  if (!marginData.ff) {
    return m.reply(`Belum ada List harga. Hubungi admin untuk mengatur harga produk.`);
  }

  const { bronze, silver, gold } = marginData.ff;

  // Tentukan role
  const userRole = getRoleUser(sender);
  const basePrice = produkff.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold":   userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  const transactionData = {
    no: nomor,
    kategori: "Free Fire",
    kode: skc,
    produk: produkff.name,
    tujuan: `${id}`,
    id: id,
    harga: userRolePrice,
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {

    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {

        if (responseData.status == 'Success') {
          const data = responseData.data;

          const textTransaction = `*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)} inc fee
> Ref ID : ${transactionData.refid}

Silahkan lanjutkan pembayaran dengan scan Qris di bawah.

Ketik *.batal* untuk membatalkan pesanan.`;

          let replyAutoPayment = await client.sendMessage(
            m.chat,
            { caption: textTransaction, image: { url: data.qr_link } },
            { quoted: m }
          );

          transactionData.qrisKey = replyAutoPayment.key;
          fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

          const startTime = Date.now();
          await checkAutoPaymentStatus(
            transactionData.refid,
            roundedUserRolePrice,
            startTime,
            sender,
            client,
            m,
            transactionData
          );

        } else {
          return m.reply('Terjadi kesalahan saat membuat pembayaran.');
        }
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });

  } else {

    let confirmTransaction = `*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkff.name}
> Tujuan : ${id}
> Harga : ${formatmoney(userRolePrice)}
> Ref ID : ${dgrefid}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Call of Duty MOBILE
case 'getcod': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const codProducts = allProducts.filter(item =>
            item.brand === "Call of Duty MOBILE" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = codProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("Call of Duty Mobile", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-cod.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Call of Duty MOBILE Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Call of Duty MOBILE dari Digiflazz.");
    }
}
break;

case "setcod": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    cod: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-cod.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Call of Duty MOBILE. Silahkan ketik *.listcod*_`);
  break;
}
case 'listcod': case 'cod': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-cod.json', 'utf8'));
    if (!marginData.cod) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Call of Duty MOBILE.`);

    const { bronze, silver, gold } = marginData.cod;

    // Ambil produk ML dari file
    const codListPath = './src/listmargin/list-cod.json';
    if (!fs.existsSync(codListPath)) {
        return m.reply(`List produk Call of Duty MOBILE belum tersedia.\nSilakan ketik *.getcod* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(codListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Umum": 1
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST CALL OF DUTY MOBILE ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topupcod [kodeproduk] [id]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topupcod COD31 18913655`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargacod': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-cod.json'));
    if (!marginData.cod) {
        return m.reply(`Belum ada List harga Call of Duty MOBILE. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.cod;

    // Ambil data produk ML
    const codListPath = './src/listmargin/list-cod.json';
    if (!fs.existsSync(codListPath)) {
        return m.reply(`List produk Call of Duty MOBILE belum tersedia.\nSilakan ketik *.getcod* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(codListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Umum": 1
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA CALL OF DUTY MOBILE (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tcod': case 'topupcod': {
  
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  
  // Cek transaksi belum selesai
  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──
      
> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];   // kode produk
  const id  = text.split(" ")[1];   // user ID

  if (!skc || !id)
    return m.reply(
      `TOPUP CALL OF DUTY MOBILE

*Cara order :*
${prefix + command} [kodeproduk] [id]

*Contoh :*
${prefix + command} COD31 18913655

Silahkan ketik *.listcod* untuk melihat kode produk`
    );

  // Ambil list SKU JSON
  const listcod = JSON.parse(fs.readFileSync('./src/listmargin/list-cod.json'));
  const produkcod = listcod.find(v => v.sku.toUpperCase() === skc.toUpperCase());

  if (!produkcod) {
    return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listcod* untuk melihat kode produk yang tersedia.`);
  }

  // Ambil margin
  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-cod.json'));
  if (!marginData.cod) {
    return m.reply(`Belum ada List harga. Hubungi admin untuk mengatur harga produk.`);
  }

  const { bronze, silver, gold } = marginData.cod;

  // Tentukan role
  const userRole = getRoleUser(sender);
  const basePrice = produkcod.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold":   userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];
  
let nicknameCOD = "-";
try {
  const nickRes = await cekNickname("call-of-duty-mobile", id);
  if (nickRes.status && nickRes.data?.nickname) {
    nicknameCOD = nickRes.data.nickname;
  } else {
    nicknameCOD = "Nickname tidak ditemukan";
  }
} catch (e) {
  nicknameCOD = "Nickname tidak ditemukan";
}

  const transactionData = {
    no: nomor,
    kategori: "Call of Duty MOBILE",
    kode: skc,
    produk: produkcod.name,
    tujuan: `${id}`,
    id: id,
    harga: userRolePrice,
    nickname: "-",
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {

    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {

        if (responseData.status == 'Success') {
          const data = responseData.data;

          const textTransaction = `*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Nickname : ${transactionData.nickname}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)} inc fee
> Ref ID : ${transactionData.refid}

Silahkan lanjutkan pembayaran dengan scan Qris di bawah.

Ketik *.batal* untuk membatalkan pesanan.`;

          let replyAutoPayment = await client.sendMessage(
  m.chat,
  { caption: textTransaction, image: { url: data.qr_link } },
  { quoted: m }
);

transactionData.qrisKey = replyAutoPayment.key;
fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

          const startTime = Date.now();
          await checkAutoPaymentStatus(
            transactionData.refid,
            roundedUserRolePrice,
            startTime,
            sender,
            client,
            m,
            transactionData
          );

        } else {
          return m.reply('Terjadi kesalahan saat membuat pembayaran.');
        }
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });

  } else {

    let confirmTransaction = `*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkcod.name}
> Tujuan : ${id}
> Harga : ${formatmoney(userRolePrice)}
> Ref ID : ${dgrefid}

Apakah data diatas sudah benar?
Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Valorant
case 'getvalo': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const valoProducts = allProducts.filter(item =>
            item.brand === "Valorant" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = valoProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("Valorant ", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-valo.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Valorant Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Valorant dari Digiflazz.");
    }
}
break;

case "setvalo": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    valo: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-valo.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Valorant. Silahkan ketik *.listvalo*_`);
  break;
}
case 'listvalo': case 'valo': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-valo.json', 'utf8'));
    if (!marginData.valo) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Valorant.`);

    const { bronze, silver, gold } = marginData.valo;

    // Ambil produk ML dari file
    const valoListPath = './src/listmargin/list-valo.json';
    if (!fs.existsSync(valoListPath)) {
        return m.reply(`List produk Valorant belum tersedia.\nSilakan ketik *.getvalo* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(valoListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Umum": 1
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST VALORANT ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topupvalo [kodeproduk] [RiotID#Tag]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topupvalo VALO475 Bangirul#1234`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargavalo': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-valo.json'));
    if (!marginData.valo) {
        return m.reply(`Belum ada List harga Valorant. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.valo;

    // Ambil data produk ML
    const valoListPath = './src/listmargin/list-valo.json';
    if (!fs.existsSync(valoListPath)) {
        return m.reply(`List produk Valorant belum tersedia.\nSilakan ketik *.getvalo* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(valoListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Umum": 1
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA VALORANT (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tvalo': case 'topupvalo': {
  
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  
  // Cek transaksi belum selesai
  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──
      
> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];   // kode produk
  const id  = text.split(" ")[1];   // user ID

  if (!skc || !id)
    return m.reply(
      `TOPUP VALORANT

*Cara order :*
${prefix + command} [kodeproduk] [RiotID#Tag]

*Contoh :*
${prefix + command} VALO475 Bangirul#1234

Silahkan ketik *.listvalo* untuk melihat kode produk`
    );

  // Ambil list SKU JSON
  const listvalo = JSON.parse(fs.readFileSync('./src/listmargin/list-valo.json'));
  const produkvalo = listvalo.find(v => v.sku.toUpperCase() === skc.toUpperCase());

  if (!produkvalo) {
    return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listvalo* untuk melihat kode produk yang tersedia.`);
  }

  // Ambil margin
  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-valo.json'));
  if (!marginData.valo) {
    return m.reply(`Belum ada List harga. Hubungi admin untuk mengatur harga produk.`);
  }

  const { bronze, silver, gold } = marginData.valo;

  // Tentukan role
  const userRole = getRoleUser(sender);
  const basePrice = produkvalo.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold":   userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  const transactionData = {
    no: nomor,
    kategori: "Valorant",
    kode: skc,
    produk: produkvalo.name,
    tujuan: `${id}`,
    id: id,
    harga: userRolePrice,
    nickname: "-",
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {

    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {

        if (responseData.status == 'Success') {
          const data = responseData.data;

          const textTransaction = `*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Nickname : ${transactionData.nickname}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)} inc fee
> Ref ID : ${transactionData.refid}

Silahkan lanjutkan pembayaran dengan scan Qris di bawah.

Ketik *.batal* untuk membatalkan pesanan.`;

          let replyAutoPayment = await client.sendMessage(
  m.chat,
  { caption: textTransaction, image: { url: data.qr_link } },
  { quoted: m }
);

transactionData.qrisKey = replyAutoPayment.key;
fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

          const startTime = Date.now();
          await checkAutoPaymentStatus(
            transactionData.refid,
            roundedUserRolePrice,
            startTime,
            sender,
            client,
            m,
            transactionData
          );

        } else {
          return m.reply('Terjadi kesalahan saat membuat pembayaran.');
        }
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });

  } else {

    let confirmTransaction = `*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkvalo.name}
> Tujuan : ${id}
> Harga : ${formatmoney(userRolePrice)}
> Ref ID : ${dgrefid}

Apakah data diatas sudah benar?
Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

case 'getpubg': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const pubgProducts = allProducts.filter(item =>
            item.brand === "PUBG MOBILE" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = pubgProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("PUBG MOBILE", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-pubg.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk PUBG Mobile Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data PUBG Mobile dari Digiflazz.");
    }
}
break;

case "setpubg": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    pubg: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-pubg.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk PUBG Mobile. Silahkan ketik *.listpubg*_`);
  break;
}
case 'listpubg': case 'pubg': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-pubg.json', 'utf8'));
    if (!marginData.pubg) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin PUBG Mobile.`);

    const { bronze, silver, gold } = marginData.pubg;

    // Ambil produk ML dari file
    const pubgListPath = './src/listmargin/list-pubg.json';
    if (!fs.existsSync(pubgListPath)) {
        return m.reply(`List produk PUBG Mobile belum tersedia.\nSilakan ketik *.getpubg* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(pubgListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Umum": 1
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST PUBG MOBILE ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topuppubg [kodeproduk] [id]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topuppubg UC60 18913655`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargapubg': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-pubg.json'));
    if (!marginData.pubg) {
        return m.reply(`Belum ada List harga PUBG Mobile. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.pubg;

    // Ambil data produk ML
    const pubgListPath = './src/listmargin/list-pubg.json';
    if (!fs.existsSync(pubgListPath)) {
        return m.reply(`List produk PUBG Mobile belum tersedia.\nSilakan ketik *.getpubg* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(pubgListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Umum": 1
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA PUBG MOBILE (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tpubg': case 'topuppubg': {

  if (isBanned) return m.reply(`*You Have Been Banned*`);

  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──
      
> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];
  const id  = text.split(" ")[1]; 

  if (!skc || !id)
    return m.reply(
      `TOPUP PUBG MOBILE

*Cara order :*
${prefix + command} [kodeproduk] [id]

*Contoh :*
${prefix + command} UC60 18913655

Silahkan ketik *.listpubg* untuk melihat kode produk`
    );

  const listpubg = JSON.parse(fs.readFileSync('./src/listmargin/list-pubg.json'));
  const produkpubg = listpubg.find(v => v.sku.toUpperCase() === skc.toUpperCase());

  if (!produkpubg)
    return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listpubg* untuk melihat kode produk yang tersedia.`);

  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-pubg.json'));
  if (!marginData.pubg)
    return m.reply(`Belum ada List harga. Hubungi admin untuk mengatur harga produk.`);

  const { bronze, silver, gold } = marginData.pubg;

  const userRole = getRoleUser(sender);
  const basePrice = produkpubg.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold":   userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  let nicknamePUBG = "-";

  const transactionData = {
    no: nomor,
    kategori: "PUBG Mobile",
    kode: skc,
    produk: produkpubg.name,
    tujuan: id,
    id: id,
    harga: userRolePrice,
    nickname: nicknamePUBG,
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {

    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {

        if (responseData.status == 'Success') {
          const data = responseData.data;

          const textTransaction = `*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Nickname : ${transactionData.nickname}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)} inc fee
> Ref ID : ${transactionData.refid}

Silahkan lanjutkan pembayaran dengan scan Qris di bawah.

Ketik *.batal* untuk membatalkan pesanan.`;

          let replyAutoPayment = await client.sendMessage(
            m.chat,
            { caption: textTransaction, image: { url: data.qr_link } },
            { quoted: m }
          );

          transactionData.qrisKey = replyAutoPayment.key;
          fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

          const startTime = Date.now();
          await checkAutoPaymentStatus(
            transactionData.refid,
            roundedUserRolePrice,
            startTime,
            sender,
            client,
            m,
            transactionData
          );

        } else {
          return m.reply('Terjadi kesalahan saat membuat pembayaran.');
        }
      })
      .catch(() => m.reply('Terjadi kesalahan saat membuat pembayaran.'));

  } else {

    const confirmTransaction = `*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkpubg.name}
> Nickname : ${nicknamePUBG}
> Tujuan : ${id}
> Harga : ${formatmoney(userRolePrice)}
> Ref ID : ${dgrefid}

Apakah data diatas sudah benar?
Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Point Blank
case 'getpb': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const pbProducts = allProducts.filter(item =>
            item.brand === "POINT BLANK" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = pbProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("POINT BLANK", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-pb.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Point Blank Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Point Blank dari Digiflazz.");
    }
}
break;

case "setpb": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    pb: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-pb.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Point Blank. Silahkan ketik *.listpb*_`);
  break;
}
case 'listtopup':
case 'listpb':
case 'pb': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-pb.json', 'utf8'));
    if (!marginData.pb) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Point Blank.`);

    const { bronze, silver, gold } = marginData.pb;

    // Ambil produk ML dari file
    const pbListPath = './src/listmargin/list-pb.json';
    if (!fs.existsSync(pbListPath)) {
        return m.reply(`List produk Point Blank belum tersedia.\nSilakan ketik *.getpb* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(pbListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Umum": 1
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST POINT BLANK ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topuppb [kodeproduk] [id]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topuppb PB1200 18913655`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargapb': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-pb.json'));
    if (!marginData.pb) {
        return m.reply(`Belum ada List harga Point Blank. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.pb;

    // Ambil data produk ML
    const pbListPath = './src/listmargin/list-pb.json';
    if (!fs.existsSync(pbListPath)) {
        return m.reply(`List produk Point Blank belum tersedia.\nSilakan ketik *.getpb* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(pbListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Umum": 1
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA POINT BLANK (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tpb': case 'topuppb': {
  
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  
  // Cek transaksi belum selesai
  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──
      
> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];   // kode produk
  const id  = text.split(" ")[1];   // user ID

  if (!skc || !id)
    return m.reply(
      `TOPUP POINT BLANK

*Cara order :*
${prefix + command} [kodeproduk] [id]

*Contoh :*
${prefix + command} PB1200 18913655

Silahkan ketik *.listpb* untuk melihat kode produk`
    );

  // Ambil list SKU JSON
  const listpb = JSON.parse(fs.readFileSync('./src/listmargin/list-pb.json'));
  const produkpb = listpb.find(v => v.sku.toUpperCase() === skc.toUpperCase());

  if (!produkpb) {
    return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listpb* untuk melihat kode produk yang tersedia.`);
  }

  // Ambil margin
  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-pb.json'));
  if (!marginData.pb) {
    return m.reply(`Belum ada List harga. Hubungi admin untuk mengatur harga produk.`);
  }

  const { bronze, silver, gold } = marginData.pb;

  // Tentukan role
  const userRole = getRoleUser(sender);
  const basePrice = produkpb.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold":   userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  const transactionData = {
    no: nomor,
    kategori: "Point Blank",
    kode: skc,
    produk: produkpb.name,
    tujuan: `${id}`,
    id: id,
    harga: userRolePrice,
    nickname: "-",
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {

    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {

        if (responseData.status == 'Success') {
          const data = responseData.data;

          const textTransaction = `*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Nickname : ${transactionData.nickname}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)} inc fee
> Ref ID : ${transactionData.refid}

Silahkan lanjutkan pembayaran dengan scan Qris di bawah.

Ketik *.batal* untuk membatalkan pesanan.`;

          let replyAutoPayment = await client.sendMessage(
  m.chat,
  { caption: textTransaction, image: { url: data.qr_link } },
  { quoted: m }
);

transactionData.qrisKey = replyAutoPayment.key;
fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

          const startTime = Date.now();
          await checkAutoPaymentStatus(
            transactionData.refid,
            roundedUserRolePrice,
            startTime,
            sender,
            client,
            m,
            transactionData
          );

        } else {
          return m.reply('Terjadi kesalahan saat membuat pembayaran.');
        }
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });

  } else {

    let confirmTransaction = `*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkpb.name}
> Tujuan : ${id}
> Harga : ${formatmoney(userRolePrice)}
> Ref ID : ${dgrefid}

Apakah data diatas sudah benar?
Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Genshin Impact
case 'getgi': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Membership", "Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const giProducts = allProducts.filter(item =>
            item.brand === "Genshin Impact" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = giProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("Genshin Impact", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-gi.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Genshin Impact Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Genshin Impact dari Digiflazz.");
    }
}
break;

case "setgi": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    gi: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-gi.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Genshin Impact. Silahkan ketik *.listgi*_`);
  break;
}
case 'listgi':
case 'gi': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-gi.json', 'utf8'));
    if (!marginData.gi) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Genshin Impact.`);

    const { bronze, silver, gold } = marginData.gi;

    // Ambil produk ML dari file
    const giListPath = './src/listmargin/list-gi.json';
    if (!fs.existsSync(giListPath)) {
        return m.reply(`List produk Genshin Impact belum tersedia.\nSilakan ketik *.getgi* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(giListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST GENSHIN IMPACT ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topupgi [kodeproduk] [id+server]\n`
    teks += `> ${prefix}topupgi [kodeproduk] [id|server]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> .topupgi GI60 638292263828Asia\n`
    teks += `> .topupgi GI60 638292263828prod_official_asia\n`
    teks += `> .topupgi GI60 638292263828|Asia\n`
    teks += `> .topupgi GI60 638292263828|prod_official_asia\n\n`
    teks += `*Server List :*\n`
    teks += `> prod_official_asia = Asia\n`
    teks += `> prod_official_usa = America\n`
    teks += `> prod_official_eur = Europe\n`
    teks += `> prod_official_cht = TW,HK,MO`
    ;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargagi': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-gi.json'));
    if (!marginData.gi) {
        return m.reply(`Belum ada List harga Genshin Impact. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.gi;

    // Ambil data produk ML
    const giListPath = './src/listmargin/list-gi.json';
    if (!fs.existsSync(giListPath)) {
        return m.reply(`List produk Genshin Impact belum tersedia.\nSilakan ketik *.getgi* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(giListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA GENSHIN IMPACT (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'tgi': case 'topupgi': {

  if (isBanned) return m.reply(`*You Have Been Banned*`);

  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
`── 「 *PESANAN BELUM SELESAI* 」 ──

> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];
  const rawId = text.split(" ")[1];

  if (!skc || !rawId)
    return m.reply(
`TOPUP GENSHIN IMPACT

*Cara order :*
${prefix + command} [kodeproduk] [id|server]
${prefix + command} [kodeproduk] [idserver]

*Contoh :*
> .topupgi GI60 638292263828|Asia
> .topupgi GI60 638292263828prod_official_asia

*Server List :*
> prod_official_asia
> prod_official_usa
> prod_official_eur
> prod_official_cht

Silahkan ketik *.listgi* untuk melihat kode produk`
    );

  let userId = "";
  let server = "";

  if (rawId.includes("|")) {
    const split = rawId.split("|");
    userId = split[0];
    server = split[1];
  } else {
    const match = rawId.match(/^(\d+)([a-zA-Z_]+)$/);
    if (match) {
      userId = match[1];
      server = match[2];
    }
  }

  if (!userId || !server)
    return m.reply("❌ Format ID Genshin tidak valid");

  const listgi = JSON.parse(fs.readFileSync('./src/listmargin/list-gi.json'));
  const produkgi = listgi.find(v => v.sku.toUpperCase() === skc.toUpperCase());
  if (!produkgi) return m.reply(`Kode Produk tidak ditemukan!\nKetik *.listgi*`);

  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-gi.json'));
  if (!marginData.gi) return m.reply(`Harga belum tersedia`);

  const { bronze, silver, gold } = marginData.gi;
  const userRole = getRoleUser(sender);
  const basePrice = produkgi.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze":
      userRolePrice = basePrice * (1 + bronze / 100);
      break;

    case "Silver":
      userRolePrice = basePrice * (1 + silver / 100);
      break;

    case "Gold":
      userRolePrice = basePrice * (1 + gold / 100);
      break;

    default:
      return m.reply('Kamu belum memiliki role');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  const transactionData = {
    no: nomor,
    kategori: "Genshin Impact",
    kode: skc,
    produk: produkgi.name,
    tujuan: rawId,
    id: userId,
    harga: Math.round(userRolePrice),
    refid: dgrefid
  };

  fs.writeFileSync(
    `${pathTrx}${nomor}.json`,
    JSON.stringify(transactionData, null, 3)
  );

  const userBalance = getMonUser(sender);

  if (userBalance < transactionData.harga) {

    await createNewTransactionTokopay(
      transactionData.refid,
      transactionData.harga
    )
    .then(async (responseData) => {

      if (responseData.status == 'Success') {

        const data = responseData.data;

        const textTransaction =
`*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)}
> Ref ID : ${transactionData.refid}

Scan QRIS untuk membayar
Ketik *.batal* untuk membatalkan`;

        let replyAutoPayment = await client.sendMessage(
          m.chat,
          {
            caption: textTransaction,
            image: { url: data.qr_link }
          },
          { quoted: m }
        );

        transactionData.qrisKey = replyAutoPayment.key;

        fs.writeFileSync(
          `${pathTrx}${nomor}.json`,
          JSON.stringify(transactionData, null, 3)
        );

        const startTime = Date.now();

        await checkAutoPaymentStatus(
          transactionData.refid,
          transactionData.harga,
          startTime,
          sender,
          client,
          m,
          transactionData
        );

      } else {
        return m.reply('Gagal membuat pembayaran');
      }

    })
    .catch(() => m.reply('Terjadi kesalahan'));

  } else {

    return client.sendMessage(
      m.chat,
      {
        text:
`*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkgi.name}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(transactionData.harga)}
> Ref ID : ${dgrefid}

Ketik *Y* untuk lanjut atau *N* untuk batal`
      },
      { quoted: m }
    );

  }

  break;
}

// Honor of Kings
case 'gethok': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Membership", "Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const hokProducts = allProducts.filter(item =>
            item.brand === "Honor of Kings" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = hokProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("Honor of Kings", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-hok.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Honor of Kings Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Honor of Kings dari Digiflazz.");
    }
}
break;

case "sethok": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    hok: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-hok.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Honor of Kings. Silahkan ketik *.listhok*_`);
  break;
}
case 'listhok': case 'hok': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-hok.json', 'utf8'));
    if (!marginData.hok) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Honor of Kings.`);

    const { bronze, silver, gold } = marginData.hok;

    // Ambil produk ML dari file
    const hokListPath = './src/listmargin/list-hok.json';
    if (!fs.existsSync(hokListPath)) {
        return m.reply(`List produk Honor of Kings belum tersedia.\nSilakan ketik *.gethok* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(hokListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST HONOR OF KINGS ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topuphok [kodeproduk] [uid]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> ${prefix}topuphok HOK16 9373893688518913655`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargahok': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-hok.json'));
    if (!marginData.hok) {
        return m.reply(`Belum ada List harga Honor of Kings. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.hok;

    // Ambil data produk ML
    const hokListPath = './src/listmargin/list-hok.json';
    if (!fs.existsSync(hokListPath)) {
        return m.reply(`List produk Honor of Kings belum tersedia.\nSilakan ketik *.gethok* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(hokListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA HONOR OF KINGS (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'thok': case 'topuphok': {
  
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  
  // Cek transaksi belum selesai
  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
      `── 「 *PESANAN BELUM SELESAI* 」 ──
      
> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];   // kode produk
  const id  = text.split(" ")[1];   // user ID

  if (!skc || !id)
    return m.reply(
      `TOPUP HONOR OF KINGS

*Cara order :*
${prefix + command} [kodeproduk] [uid]

*Contoh :*
${prefix + command} HOK16 9373893688518913655

Silahkan ketik *.listhok* untuk melihat kode produk`
    );

  // Ambil list SKU JSON
  const listhok = JSON.parse(fs.readFileSync('./src/listmargin/list-hok.json'));
  const produkhok = listhok.find(v => v.sku.toUpperCase() === skc.toUpperCase());

  if (!produkhok) {
    return m.reply(`Kode Produk tidak ditemukan!\nSilahkan ketik *.listhok* untuk melihat kode produk yang tersedia.`);
  }

  // Ambil margin
  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-hok.json'));
  if (!marginData.hok) {
    return m.reply(`Belum ada List harga. Hubungi admin untuk mengatur harga produk.`);
  }

  const { bronze, silver, gold } = marginData.hok;

  // Tentukan role
  const userRole = getRoleUser(sender);
  const basePrice = produkhok.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze": userRolePrice = basePrice * (1 + bronze / 100); break;
    case "Silver": userRolePrice = basePrice * (1 + silver / 100); break;
    case "Gold":   userRolePrice = basePrice * (1 + gold / 100); break;
    default:
      return m.reply('Kamu belum memiliki role, ketik *info* untuk mendapatkan role default.');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  const transactionData = {
    no: nomor,
    kategori: "Honor of Kings",
    kode: skc,
    produk: produkhok.name,
    tujuan: `${id}`,
    id: id,
    harga: userRolePrice,
    nickname: "-",
    refid: dgrefid
  };

  fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

  const userBalance = getMonUser(sender);

  if (userBalance < userRolePrice) {

    const roundedUserRolePrice = Math.round(userRolePrice);
    await createNewTransactionSakurupiah(transactionData.refid, roundedUserRolePrice)
      .then(async (responseData) => {

        if (responseData.status == 'Success') {
          const data = responseData.data;

          const textTransaction = `*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Nickname : ${transactionData.nickname}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)} inc fee
> Ref ID : ${transactionData.refid}

Silahkan lanjutkan pembayaran dengan scan Qris di bawah.

Ketik *.batal* untuk membatalkan pesanan.`;

          let replyAutoPayment = await client.sendMessage(
  m.chat,
  { caption: textTransaction, image: { url: data.qr_link } },
  { quoted: m }
);

transactionData.qrisKey = replyAutoPayment.key;
fs.writeFileSync(`${pathTrx}${nomor}.json`, JSON.stringify(transactionData, null, 3));

          const startTime = Date.now();
          await checkAutoPaymentStatus(
            transactionData.refid,
            roundedUserRolePrice,
            startTime,
            sender,
            client,
            m,
            transactionData
          );

        } else {
          return m.reply('Terjadi kesalahan saat membuat pembayaran.');
        }
      })
      .catch(err => {
        console.error(err);
        return m.reply('Terjadi kesalahan saat membuat pembayaran.');
      });

  } else {

    let confirmTransaction = `*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkhok.name}
> Tujuan : ${id}
> Harga : ${formatmoney(userRolePrice)}
> Ref ID : ${dgrefid}

Apakah data diatas sudah benar?
Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan transaksi`;

    return client.sendMessage(m.chat, { text: confirmTransaction }, { quoted: m });
  }

  break;
};

// Honkai Star Rail
case 'gethsr': {
    if (!isCreator) return m.reply(`Only Owner!`);
    const fs = require('fs');
    const fetch = require('node-fetch');

    let signa = md5(usernamekey + productionkey + `pricelist`);
    let bodyData = {
        cmd: `prepaid`,
        username: usernamekey,
        sign: signa
    };

    try {
        const response = await fetch(`https://api.digiflazz.com/v1/price-list`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data: allProducts } = await response.json();

        // Jenis Type yang mau disimpan
        const allowedTypes = ["Membership", "Umum"];

        // Filter produk sesuai type yg kita mau simpan
        const hsrProducts = allProducts.filter(item =>
            item.brand === "Honkai Star Rail" &&
            allowedTypes.includes(item.type)
        );

        // Format untuk disimpan ke file JSON
        const output = hsrProducts.map(item => ({
            sku: item.buyer_sku_code,
            name: item.product_name.replace("Honkai Star Rail", "").trim(),
            price: item.price,
            type: item.type,
            status: item.seller_product_status ? "Active" : "Nonactive"
        }));

        // FULL SYNC → Overwrite total
        fs.writeFileSync('./src/listmargin/list-hsr.json', JSON.stringify(output, null, 3));

        return m.reply(
            `*Sinkronisasi Produk Honkai Star Rail Berhasil!*\n\n` +
            `Total produk disimpan: ${output.length}\n` +
            `Produk Baru → Ditambahkan otomatis\n` +
            `Produk Lama → Diperbarui otomatis\n` +
            `Produk Hilang → Dihapus otomatis`
        );

    } catch (err) {
        console.error(err);
        return m.reply("Terjadi kesalahan saat mengambil data Honkai Star Rail dari Digiflazz.");
    }
}
break;

case "sethsr": {
  if (!isCreator) throw mess.owner;
  const fs = require('fs');
    
  const margins = text.split("/"); // Membagi parameter menjadi array angka
  if (margins.length !== 3) {
    return m.reply(`Silakan ketik margin keuntungan untuk Bronze, Silver, dan Gold.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  const marginBronze = parseFloat(margins[0]);
  const marginSilver = parseFloat(margins[1]);
  const marginGold = parseFloat(margins[2]);
  
  if (!marginBronze || !marginSilver || !marginGold) {
    return m.reply(`Silakan ketik angka untuk setiap margin keuntungan.\n\nContoh : *${prefix}${command} 5/4/3*`);
  }
  
  await m.reply(`_Sedang mengatur margin keuntungan: Bronze(${marginBronze}%), Silver(${marginSilver}%), Gold(${marginGold}%)..._`);
  
  // Menyimpan data margin ke dalam objek
  const marginData = {
    hsr: {
      bronze: marginBronze,
      silver: marginSilver,
      gold: marginGold
    }
  };

  // Menyimpan data margin ke dalam file JSON
  await fs.writeFileSync('./src/produk-digiflazz/margin/margin-hsr.json', JSON.stringify(marginData, null, 3), { flag: 'w' });
  await m.reply(`_Sukses mengatur margin keuntungan produk Honkai Star Rail. Silahkan ketik *.listhsr*_`);
  break;
}
case 'listhsr':
case 'hsr': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-hsr.json', 'utf8'));
    if (!marginData.hsr) return m.reply(`Belum ada List harga. Silakan hubungi Admin untuk mengatur margin Honkai Star Rail.`);

    const { bronze, silver, gold } = marginData.hsr;

    // Ambil produk ML dari file
    const hsrListPath = './src/listmargin/list-hsr.json';
    if (!fs.existsSync(hsrListPath)) {
        return m.reply(`List produk Honkai Star Rail belum tersedia.\nSilakan ketik *.gethsr* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(hsrListPath, 'utf8'));

    // Ambil role user
    const userRole = getRoleUser(sender);

    // Format ulang & hitung harga sesuai role
    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        price: p.price,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    // Urutan TYPE yang diminta
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    // Sort berdasarkan TYPE → lalu harga
    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Header
    let teks = `*LIST HONKAI STAR RAIL ROLE ${userRole.toUpperCase()}*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    // Menampilkan produk
    calculatedProducts.forEach(item => {
        let hargaRole = 0;

        switch (userRole) {
            case "Bronze":
                hargaRole = item.bronze_price;
                break;
            case "Silver":
                hargaRole = item.silver_price;
                break;
            case "Gold":
                hargaRole = item.gold_price;
                break;
            default:
                hargaRole = item.bronze_price;
        }

        // Format BARU (tanpa type)
        teks += `\n✅ *${item.name}*\n`;
        teks += `> ${item.sku} = ${formatmoney(hargaRole)}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `*Cara Order :*\n`;
    teks += `> ${prefix}topuphsr [kodeproduk] [id+server]\n`
    teks += `> ${prefix}topuphsr [kodeproduk] [id|server]\n\n`;
    teks += `*Contoh :*\n`;
    teks += `> .topuphsr HSR60 638292263828Asia\n`
    teks += `> .topuphsr HSR60 638292263828prod_official_asia\n`
    teks += `> .topuphsr HSR60 638292263828|Asia\n`
    teks += `> .topuphsr HSR60 638292263828|prod_official_asia\n\n`
    teks += `*Server List :*\n`
    teks += `> prod_official_asia = Asia\n`
    teks += `> prod_official_usa = America\n`
    teks += `> prod_official_eur = Europe\n`
    teks += `> prod_official_cht = TW,HK,MO`
    ;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'hargahsr': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);

    const fs = require('fs');

    // Ambil margin ML
    const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-hsr.json'));
    if (!marginData.hsr) {
        return m.reply(`Belum ada List harga Honkai Star Rail. Silakan hubungi Admin.`);
    }

    const { bronze, silver, gold } = marginData.hsr;

    // Ambil data produk ML
    const hsrListPath = './src/listmargin/list-hsr.json';
    if (!fs.existsSync(hsrListPath)) {
        return m.reply(`List produk Honkai Star Rail belum tersedia.\nSilakan ketik *.gethsr* untuk mengambil data.`);
    }

    const products = JSON.parse(fs.readFileSync(hsrListPath));

    // Hitung harga semua role + urutkan berdasarkan type → lalu harga
    const typeOrder = {
        "Membership": 1,
        "Umum": 2
    };

    const calculatedProducts = products.map(p => ({
        name: p.name.trim(),
        sku: p.sku,
        type: p.type,
        bronze_price: p.price * (1 + bronze / 100),
        silver_price: p.price * (1 + silver / 100),
        gold_price: p.price * (1 + gold / 100)
    }));

    calculatedProducts.sort((a, b) => {
        const typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        if (typeDiff !== 0) return typeDiff;
        return a.bronze_price - b.bronze_price;
    });

    // Output text
    let teks = `*DAFTAR HARGA HONKAI STAR RAIL (ALL ROLE)*\n`;
    teks += `➖➖➖➖➖➖➖➖➖`;

    calculatedProducts.forEach(i => {
        teks += `\n✅ *${i.name}*\n`;
        teks += `• Bronze : ${formatmoney(i.bronze_price)}\n`;
        teks += `• Silver : ${formatmoney(i.silver_price)}\n`;
        teks += `• Gold : ${formatmoney(i.gold_price)}\n`;
        teks += `• Kode : ${i.sku}\n`;
    });

    teks += `\n➖➖➖➖➖➖➖➖➖\n`;
    teks += `Ingin upgrade role? Ketik *${prefix}upgrade*`;

    client.sendMessage(m.chat, { text: teks }, { quoted: m });
    break;
}
case 'thsr': case 'topuphsr': {

  if (isBanned) return m.reply(`*You Have Been Banned*`);

  if (fs.existsSync(`${pathTrx}${m.sender.split("@")[0]}.json`)) {
    const transactionFile = `${pathTrx}${m.sender.split("@")[0]}.json`;
    const transactionData = JSON.parse(fs.readFileSync(transactionFile));
    return m.reply(
`── 「 *PESANAN BELUM SELESAI* 」 ──

> Status : Transaksi Belum Selesai
> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}

Ketik *Y* untuk melanjutkan atau ketik *N* untuk membatalkan pesanan.`
    );
  }

  const skc = text.split(" ")[0];
  const rawId = text.split(" ")[1];

  if (!skc || !rawId)
    return m.reply(
`TOPUP HONKAI STAR RAIL

*Cara order :*
${prefix + command} [kodeproduk] [id|server]
${prefix + command} [kodeproduk] [idserver]

*Contoh :*
> .topuphsr HSR60 638292263828|Asia
> .topuphsr HSR60 638292263828prod_official_asia

*Server List :*
> prod_official_asia
> prod_official_usa
> prod_official_eur
> prod_official_cht

Silahkan ketik *.listhsr* untuk melihat kode produk`
    );

  let userId = "";
  let server = "";

  if (rawId.includes("|")) {
    const split = rawId.split("|");
    userId = split[0];
    server = split[1];
  } else {
    const match = rawId.match(/^(\d+)([a-zA-Z_]+)$/);
    if (match) {
      userId = match[1];
      server = match[2];
    }
  }

  if (!userId || !server)
    return m.reply("❌ Format ID Honkai Star Rail tidak valid");

  const listhsr = JSON.parse(fs.readFileSync('./src/listmargin/list-hsr.json'));
  const produkhsr = listhsr.find(v => v.sku.toUpperCase() === skc.toUpperCase());
  if (!produkhsr) return m.reply(`Kode Produk tidak ditemukan!\nKetik *.listhsr*`);

  const marginData = JSON.parse(fs.readFileSync('./src/produk-digiflazz/margin/margin-hsr.json'));
  if (!marginData.hsr) return m.reply(`Harga belum tersedia`);

  const { bronze, silver, gold } = marginData.hsr;
  const userRole = getRoleUser(sender);
  const basePrice = produkhsr.price;
  let userRolePrice = 0;

  switch (userRole) {
    case "Bronze":
      userRolePrice = basePrice * (1 + bronze / 100);
      break;

    case "Silver":
      userRolePrice = basePrice * (1 + silver / 100);
      break;

    case "Gold":
      userRolePrice = basePrice * (1 + gold / 100);
      break;

    default:
      return m.reply('Kamu belum memiliki role');
  }

  const dgrefid = generateRandomString(4);
  const nomor = m.sender.split("@")[0];

  const transactionData = {
    no: nomor,
    kategori: "Honkai Star Rail",
    kode: skc,
    produk: produkhsr.name,
    tujuan: rawId,
    id: userId,
    harga: Math.round(userRolePrice),
    refid: dgrefid
  };

  fs.writeFileSync(
    `${pathTrx}${nomor}.json`,
    JSON.stringify(transactionData, null, 3)
  );

  const userBalance = getMonUser(sender);

  if (userBalance < transactionData.harga) {

    await createNewTransactionTokopay(
      transactionData.refid,
      transactionData.harga
    )
    .then(async (responseData) => {

      if (responseData.status == 'Success') {

        const data = responseData.data;

        const textTransaction =
`*PEMBAYARAN OTOMATIS*

> Kategori : ${transactionData.kategori}
> Produk : ${transactionData.produk}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(data.total_bayar)}
> Ref ID : ${transactionData.refid}

Scan QRIS untuk membayar
Ketik *.batal* untuk membatalkan`;

        let replyAutoPayment = await client.sendMessage(
          m.chat,
          {
            caption: textTransaction,
            image: { url: data.qr_link }
          },
          { quoted: m }
        );

        transactionData.qrisKey = replyAutoPayment.key;

        fs.writeFileSync(
          `${pathTrx}${nomor}.json`,
          JSON.stringify(transactionData, null, 3)
        );

        const startTime = Date.now();

        await checkAutoPaymentStatus(
          transactionData.refid,
          transactionData.harga,
          startTime,
          sender,
          client,
          m,
          transactionData
        );

      } else {
        return m.reply('Gagal membuat pembayaran');
      }

    })
    .catch(() => m.reply('Terjadi kesalahan'));

  } else {

    return client.sendMessage(
      m.chat,
      {
        text:
`*KONFIRMASI PESANAN*

> Kategori : ${transactionData.kategori}
> Produk : ${produkhsr.name}
> Tujuan : ${transactionData.tujuan}
> Harga : ${formatmoney(transactionData.harga)}
> Ref ID : ${dgrefid}

Ketik *Y* untuk lanjut atau *N* untuk batal`
      },
      { quoted: m }
    );

  }

  break;
}

// Payment Gateway SakuRupiah
case 'depo': case 'deposit': case 'depoauto': {
    if (!q) {
        return m.reply(`*DEPOSIT SALDO OTOMATIS*\n\nSilahkan gunakan dengan cara :\n${prefix + command} nominalnya\n\nContoh :\n${prefix + command} 50000\n\nMinimal deposit otomatis adalah ${formatmoney(minimalDepoOtomatis)}`);
    }

    const amount = args[0];
    const refId = generateRandomString(4);

    // Validasi input jumlah
    if (isNaN(parseInt(amount))) {
        return m.reply('Format Deposit Harus Berupa Angka!');
    }
    if (parseInt(amount) < minimalDepoOtomatis) {
        return m.reply(`Minimal deposit saldo otomatis adalah ${formatmoney(minimalDepoOtomatis)}. Jika kamu ingin deposit dibawah itu silahkan ketik ${prefix}depomanual atau hubungi Admin`);
    }
    if (parseInt(amount) > maximalDepoOtomatis) {
        return m.reply(`Maksimal deposit saldo otomatis adalah ${formatmoney(maximalDepoOtomatis)}. Jika kamu ingin deposit diatas itu silahkan ketik ${prefix}depomanual atau hubungi Admin`);
    }

    try {
        // Membuat transaksi baru via SakuRupiah
        const responseData = await createNewTransactionSakurupiah(refId, amount);
        console.log(responseData);

        if (responseData.status === 'Success') {
            const data = responseData.data;
            const totalBayar = parseFloat(data.total_bayar);

            const depositSaldoBot = `*DEPOSIT SALDO OTOMATIS*

> Total: ${formatmoney(totalBayar)}
> Ref Id: ${refId}
> Via: ${data.via || global.sakurupiah.method}

Silahkan Scan QR Code / bayar ke nomor VA berikut sebelum 1 jam.`;

            // Kirim pesan + QR (jika QRIS) atau nomor VA
            if (data.qr_link && data.qr_link.startsWith('http')) {
                await client.sendMessage(m.chat, { caption: depositSaldoBot, image: { url: data.qr_link } }, { quoted: m });
            } else if (data.qr_link) {
                // String QR base64 atau string QRIS langsung
                await client.sendMessage(m.chat, { text: depositSaldoBot + `\n\nKode QRIS: ${data.qr_link}` }, { quoted: m });
            } else {
                await client.sendMessage(m.chat, { text: depositSaldoBot + `\n\nNo. Pembayaran: ${data.payment_no}` }, { quoted: m });
            }

            // Memulai polling status pembayaran
            const startTime = Date.now();
            await checkPaymentStatusDepositSakurupiah(data.trx_id, amount, startTime, sender, client, m);
        } else {
            return m.reply('Gagal membuat transaksi. Silahkan coba lagi.');
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return m.reply('Terjadi kesalahan saat membuat pembayaran. Silahkan coba lagi.');
    }
    break;
}

case 'saldosakurupiah': {
    if (!isCreator) throw mess.owner;
    
    try {
        const response = await checkInfoAccountSakurupiah();
        console.log(response);
        
        if (response.status === '200' && response.data) {
            const { nama_merchant, balance, saldo_tersedia } = response.data;
            const message = `*INFORMASI AKUN SAKURUPIAH*\n\n> Nama Merchant : ${nama_merchant}\n> Saldo Tersedia : ${formatmoney(parseFloat(saldo_tersedia))}\n> Saldo Settlement : ${formatmoney(parseFloat(balance))}`;
            return m.reply(message);
        } else {
            return m.reply('Gagal mengambil informasi akun SakuRupiah.');
        }
    } catch (error) {
        console.error(error);
        return m.reply('Terjadi kesalahan saat mengecek saldo SakuRupiah.');
    }
break;
}   


async function digiflazzPricelist() {
    const url = "https://api.digiflazz.com/v1/price-list";

    const payload = {
        cmd: "prepaid",
        username: global.usernamekey,
        sign: require("crypto")
            .createHash("md5")
            .update(global.usernamekey + global.developementkey + "pricelist")
            .digest("hex")
    };

    try {
        const { data } = await axios.post(url, payload, {
            headers: { "Content-Type": "application/json" }
        });

        if (!data || !data.data) return [];

        return data.data; // hasil list produk Digiflazz
    } catch (err) {
        console.log("ERR PRICELIST:", err.response?.data || err);
        return [];
    }
}

case 'sync': {
    if (!isCreator) throw mess.owner;
    reply("⏳ Menyinkron semua produk dari Provider...");

    try {
        // 1. Ambil data terbaru dari Digiflazz
        const dflist = await digiflazzPricelist(); 
        if (!dflist || !Array.isArray(dflist)) 
            return reply("Gagal mengambil data Digiflazz!");

        // 2. Ambil semua SKU dari Digiflazz
        const providerSkuList = dflist.map(p => p.buyer_sku_code);

        // 3. Baca semua file list di folder
        const folderPath = './src/listmargin/';
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));

        let totalChanged = 0;
        let totalDeleted = 0;

        // 4. Loop semua file JSON
        for (const file of files) {
            const filePath = folderPath + file;
            let localData = JSON.parse(fs.readFileSync(filePath));

            let changed = 0;
            let deleted = 0;

            // ✅ Hapus SKU yang sudah tidak ada di Digiflazz
            localData = localData.filter(item => {
                if (!providerSkuList.includes(item.sku)) {
                    deleted++;
                    return false;
                }
                return true;
            });

            // 5. Loop produk yang masih ada
            for (let item of localData) {
                const match = dflist.find(p => p.buyer_sku_code === item.sku);
                if (!match) continue;

                const providerPrice = Number(match.price);
                const localPrice = Number(item.harga ?? item.price);

                let updated = false;

                // ✅ Update harga
                if (providerPrice !== localPrice) {
                    item.harga = providerPrice;
                    item.price = providerPrice;
                    updated = true;
                }

                // ✅ Update seller
                if (item.seller !== match.seller) {
                    item.seller = match.seller || "-";
                    updated = true;
                }

                // ✅ Update status
                if (item.status !== match.buyer_product_status) {
                    item.status = match.buyer_product_status;
                    updated = true;
                }

                if (updated) changed++;
            }

            // 6. Simpan file jika ada perubahan
            if (changed > 0 || deleted > 0) {
                fs.writeFileSync(filePath, JSON.stringify(localData, null, 2));
            }

            totalChanged += changed;
            totalDeleted += deleted;
        }

        reply(`✅ Sinkron selesai!
• Produk diupdate: *${totalChanged}*
• Produk dihapus: *${totalDeleted}*`);

    } catch (err) {
        console.log(err);
        reply("Terjadi kesalahan saat sinkron data.");
    }
}
break;


case "cancel": {
    //if (!isCreator) return m.reply(mess.owner);
    const fetch = require('node-fetch');
    const md5 = require('md5');
    
    const url = 'https://paydisini.co.id/api/';
    const key = global.paydisini_apikey;
    const unique_code = args[0];
    if (!unique_code) {
        return m.reply(`Silahkan gunakan dengan cara :\n\n${prefix + command} Ref ID Deposit`)
    }

    const signature = md5(key + unique_code + 'CancelTransaction');

    const formData = new FormData();
    formData.append('key', key);
    formData.append('request', 'cancel');
    formData.append('unique_code', unique_code);
    formData.append('signature', signature);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        const data = responseData.data;

        let teks = `${responseData.msg} dengan Ref ID ${data.unique_code}`;

        // Send the formatted text message
        client.sendMessage(m.chat, { text: teks }, { quoted: m });
        
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
    break;
}

case "depomanual" : case "depositmanual" : {
	if (isBanned) return m.reply(`*You Have Been Banned*`)
    //if (isGroup) throw mess.private
let linkQrisnya = { url: './gambar/qris.jpeg' };
let caradeponya = `*Berikut Adalah Cara Deposit Manual!.*

DATA EWALLET DAN BANK

Jika sudah melakukan transfer, harap kirim bukti dengan cara mengirim screenshot dengan caption,
${prefix}bukti jumlah.CATATAN

Contoh :
https://telegra.ph/file/857456db1074eef23b381.jpg

Saldo akan masuk ketika Owner menyetujui screenshot bukti transfer yang dikirim!.

Note :
Perhatian, untuk minimal deposit adalah ${formatmoney(minimaldeposit)}!. Pastikan Anda transfer untuk deposit diatas minimal transaksi. Terimakasih...!`
      client.sendMessage(m.chat, { caption: caradeponya, image: linkQrisnya });
break;
};
case "bukti" : {
  //if (isGroup) throw mess.private
  if (isBanned) return m.reply(`*You Have Been Banned*`)
  
  let depo = text.split(".")[0];
  let catatnya = text.split(".")[1];
  if (!depo || !catatnya) return m.reply(`*Gunakan dengan cara :*\n*Kirim screenshot bukti transfer mu ke bot, lalu kasih caption .bukti [nominal].pesan*\n*Contoh : .bukti 5000.buktideposit*`);
  depo = parseInt(depo); // Mengonversi nilai depo ke tipe data integer
  if (isNaN(parseInt(depo))) return m.reply('Format Deposit Harus Berupa Angka!');
  if (parseInt(depo) < minimaldeposit) return m.reply(`Minimal deposit adalah ${minimaldeposit}. Silakan masukkan nominal deposit yang sesuai.`);
  
  const ownerr = global.owner[0];  
    
  let bukti = `*PERMINTAAN DEPOSIT SALDO*\n\n› Saldo : ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}\n› Deposit : ${formatmoney(depo)}\n› Uid : ${sender.replace("@s.whatsapp.net", "")}\n› Catatan : ${catatnya}\n\n*Identifikasi bukti dengan cermat agar tidak terjadi penipuan!*`;

  if (/image/.test(mime)) {
    let media = await quoted.download();
    await m.reply("Depositmu sedang diteruskan. jika dalam 10 menit saldo tidak bertambah, silahkan hubungi owner.");
	await sleep(2000);
    await client.sendMessage(ownerr+`@s.whatsapp.net`, {caption: bukti, image: media});
    await client.sendMessage(ownerr+`@s.whatsapp.net`, { text: `Untuk menambahkan saldo member, silahkan ketik :\n${prefix}addsaldo ${depo} ${sender.replace("@s.whatsapp.net", "")}` });  
  };
break;
};

// Bagian Urus Member
case 'addsaldo': {
    if (!isCreator) return m.reply(mess.owner);

    const target = m.mentionedJid[0] || (m.isQuotedMsg ? m.quotedMsg.sender : null);
    const targetNumber = target ? target.replace("@s.whatsapp.net", "") : null;

    if (!targetNumber) {
        const [saldo, nomor] = text.split(" ");

        if (!nomor || !saldo || isNaN(parseInt(saldo))) {
            return m.reply(`Format tidak valid. Harap gunakan cara berikut:\n1. Mention pengguna: ${prefix + command} 50000 @pengguna\n2. Input nomor langsung: ${prefix + command} 50000 628xxxxx`);
        }

        const saldoNumber = parseInt(saldo);

        if (saldoNumber < 10) {
            return m.reply('*Minimal saldo yang dapat ditambahkan adalah 10!*');
        }

        await addMoney(nomor + '@s.whatsapp.net', saldoNumber);
        await m.reply(`Berhasil menambahkan saldo ke pengguna dengan nomor ${nomor} sebesar *${formatmoney(saldoNumber)}*`);
        await client.sendMessage(nomor + '@s.whatsapp.net', { text: `Halo, Saldo Anda berhasil ditambahkan sebesar *${formatmoney(saldoNumber)}*\n\nSilahkan ketik ${prefix}info untuk melihat profil Anda` });
        
    } else {
        const [saldo] = text.split(" ");

        if (!saldo || isNaN(parseInt(saldo))) {
            return m.reply(`Harap isi nominal saldo yang akan ditambahkan.\nContoh: ${prefix + command} 50000 @pengguna`);
        }

        const saldoNumber = parseInt(saldo);

        if (saldoNumber < 10) {
            return m.reply('*Minimal saldo yang dapat ditambahkan adalah 10!*');
        }

        try {
            await addMoney(target, saldoNumber);
            await m.reply(`Berhasil menambahkan saldo ke pengguna dengan nomor ${targetNumber} sebesar *${formatmoney(saldoNumber)}*`);
            await client.sendMessage(target, { text: `Halo, Saldo Anda berhasil ditambahkan sebesar *${formatmoney(saldoNumber)}*\n\nSilahkan ketik ${prefix}info untuk melihat profil Anda` });

        } catch (error) {
            console.error("Error adding money:", error);
            m.reply("Terjadi kesalahan dalam menambahkan saldo.");
        }
    }
    break;
}
case 'minsaldo': {
    if (!isCreator) return m.reply(mess.owner);

    const target = m.mentionedJid[0] || (m.isQuotedMsg ? m.quotedMsg.sender : null);
    const targetNumber = target ? target.replace("@s.whatsapp.net", "") : null;

    if (!targetNumber) {
        const [saldo, nomor] = text.split(" ");

        if (!nomor || !saldo || isNaN(parseInt(saldo))) {
            return m.reply(`Format tidak valid. Harap gunakan cara berikut:\n1. Mention pengguna: ${prefix + command} 50000 @pengguna\n2. Input nomor langsung: ${prefix + command} 50000 628xxxxx`);
        }

        const saldoNumber = parseInt(saldo);

        if (saldoNumber < 10) {
            return m.reply('*Minimal saldo yang dapat dikurangi adalah 10!*');
        }

        const success = await subtractMoney(nomor + '@s.whatsapp.net', saldoNumber);
        const message = success ? `Berhasil mengurangi saldo pengguna dengan nomor ${nomor} sebesar *${formatmoney(saldoNumber)}*` : `*_Gagal mengurangi saldo. Pengguna dengan nomor ${nomor} tidak ditemukan di dalam daftar saldo_*`;

        await m.reply(message);
    } else {
        const [saldo] = text.split(" ");

        if (!saldo || isNaN(parseInt(saldo))) {
            return m.reply(`Harap isi nominal saldo yang akan dikurangi.\nContoh: ${prefix + command} 50000 @pengguna`);
        }

        const saldoNumber = parseInt(saldo);

        if (saldoNumber < 10) {
            return m.reply('*Minimal saldo yang dapat dikurangi adalah 10!*');
        }

        try {
            const success = await subtractMoney(target, saldoNumber);
            const message = success ? `Berhasil mengurangi saldo pengguna dengan nomor ${targetNumber} sebesar *${formatmoney(saldoNumber)}*` : `*_Gagal mengurangi saldo. Pengguna dengan nomor ${targetNumber} tidak ditemukan di dalam daftar saldo_*`;

            await client.sendMessage(target, {
                text: `Saldo Anda telah dikurangi sebesar *${formatmoney(saldoNumber)}*\n\nSilahkan ketik ${prefix}info untuk melihat profil Anda`
            });

            setTimeout(() => {
                m.reply(message);
            }, 5000);
        } catch (error) {
            console.error("Error subtracting money:", error);
            m.reply("Terjadi kesalahan dalam mengurangi saldo.");
        }
    }
    break;
}
case 'delsaldo': {
    if (!isCreator) return m.reply(mess.owner);

    const target = m.mentionedJid[0] || (m.isQuotedMsg ? m.quotedMsg.sender : null);
    const targetNumber = target ? target.replace("@s.whatsapp.net", "") : null;

    if (!targetNumber) {
        const nomor = text;

        if (!nomor) {
            return m.reply(`Format tidak valid. Harap gunakan cara berikut:\n1. Mention pengguna: ${prefix + command} @pengguna\n2. Input nomor langsung: ${prefix + command} 628xxxxx`);
        }

        const success = await resetMoney(nomor + '@s.whatsapp.net');
        const message = success ? `Berhasil mereset saldo pengguna dengan nomor ${nomor} menjadi 0` : `*_Gagal mereset saldo. Pengguna dengan nomor ${nomor} tidak ditemukan di dalam daftar saldo_*`;

        await m.reply(message);
    } else {
        try {
            const success = await resetMoney(target);
            const message = success ? `Berhasil mereset saldo pengguna dengan nomor ${targetNumber} menjadi 0` : `*_Gagal mereset saldo. Pengguna dengan nomor ${targetNumber} tidak ditemukan di dalam daftar saldo_*`;

            await client.sendMessage(target, {
                text: `Saldo Anda telah direset menjadi 0\n\nSilahkan ketik ${prefix}info untuk melihat profil Anda`
            });

            setTimeout(() => {
                m.reply(message);
            }, 5000);
        } catch (error) {
            console.error("Error resetting money:", error);
            m.reply("Terjadi kesalahan dalam mereset saldo.");
        }
    }
    break;
}
case 'deluser': {
    if (!isCreator) return m.reply(mess.owner);

    const target = m.mentionedJid[0] || (m.isQuotedMsg ? m.quotedMsg.sender : null);
    const targetNumber = target ? target.replace("@s.whatsapp.net", "") : null;

    if (!targetNumber) {
        const nomor = text;

        if (!nomor) {
            return m.reply(`Format tidak valid. Harap gunakan cara berikut:\n1. Mention pengguna: ${prefix + command} @pengguna\n2. Input nomor langsung: ${prefix + command} 628xxxxx`);
        }

        try {
            const fs = require('fs');
            const balanceFilePath = './src/balance.json';
            let money = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));

            // Filter out the users with the target number
            const updatedMoney = money.filter(pengguna => pengguna.id.replace("@s.whatsapp.net", "") !== nomor);

            // Write the updated data back to balance.json
            fs.writeFileSync(balanceFilePath, JSON.stringify(updatedMoney, null, 3));

            const message = updatedMoney.length < money.length ? 
                `Berhasil menghapus pengguna dengan nomor ${nomor} dari daftar saldo.` :
                `Pengguna dengan nomor ${nomor} tidak ditemukan di dalam daftar saldo.`;

            await m.reply(message);
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
            m.reply('Maaf, terjadi kesalahan saat menghapus data pengguna.');
        }
    } else {
        try {
            const fs = require('fs');
            const balanceFilePath = './src/balance.json';
            let money = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));

            // Filter out the users with the target number
            const updatedMoney = money.filter(pengguna => pengguna.id !== target);

            // Write the updated data back to balance.json
            fs.writeFileSync(balanceFilePath, JSON.stringify(updatedMoney, null, 3));

            const message = updatedMoney.length < money.length ? 
                `Berhasil menghapus pengguna dengan nomor ${targetNumber} dari daftar saldo.` :
                `Pengguna dengan nomor ${targetNumber} tidak ditemukan di dalam daftar saldo.`;

            await client.sendMessage(target, {
                text: `Data Anda telah dihapus dari sistem kami.\n\nSilahkan hubungi admin jika ini adalah kesalahan.`
            });

            setTimeout(() => {
                m.reply(message);
            }, 5000);
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
            m.reply('Maaf, terjadi kesalahan saat menghapus data pengguna.');
        }
    }
    break;
}
              
// Daftar User
case 'fixdata': {
    if (!isCreator) throw mess.owner;
    
    const fs = require('fs');
    const balanceFilePath = './src/balance.json';
    
    try {
        let money = JSON.parse(fs.readFileSync(balanceFilePath));
        let fixedCount = 0;
        let duplicateCount = 0;
        
        // 1. Bersihkan semua ID dari Unicode
        const cleanedData = money.map(pengguna => {
            const rawId = pengguna.id;
            const cleanId = cleanNumber(pengguna.id);
            
            if (cleanId !== rawId) {
                fixedCount++;
                return { ...pengguna, id: cleanId };
            }
            return pengguna;
        });
        
        // 2. Hapus duplikat
        const uniqueData = [];
        const seenIds = new Set();
        
        cleanedData.forEach(p => {
            if (!seenIds.has(p.id)) {
                seenIds.add(p.id);
                uniqueData.push(p);
            } else {
                duplicateCount++;
            }
        });
        
        // 3. Simpan data yang sudah dibersihkan
        fs.writeFileSync(balanceFilePath, JSON.stringify(uniqueData, null, 2));
        
        reply(`✅ Data berhasil diperbaiki:\n- ${fixedCount} ID dibersihkan\n- ${duplicateCount} duplikat dihapus\n\nGunakan *${prefix}saldomember* untuk memverifikasi`);
    } catch (error) {
        console.error('Error fixing data:', error);
        reply('❌ Gagal memperbaiki data');
    }
    break;
}
case 'saldomember': {
    if (!isCreator) throw mess.owner;

    const fs = require('fs');
    const balanceFilePath = './src/balance.json';

    try {
        let money = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));

        if (money.length === 0) {
            return reply(`Belum ada list pengguna`);
        }

        // Variabel untuk mengelompokkan data
        let normalIds = [];
        let unicodeIds = [];
        let duplicateIds = {};
        
        // Kelompokkan berdasarkan role dan urutkan
        let roles = {
            Gold: [],
            Silver: [],
            Bronze: []
        };

        // Proses pemeriksaan setiap pengguna
        money.forEach(pengguna => {
            const rawId = pengguna.id.replace("@s.whatsapp.net", "");
            
            // Deteksi karakter Unicode tersembunyi
            const hasUnicode = /[\u200E\u200F\u202A-\u202E]/.test(pengguna.id);
            
            // Deteksi duplikat setelah dibersihkan
            const cleanId = rawId.replace(/[\u200E\u200F\u202A-\u202E]/g, '');
            
            if (hasUnicode) {
                unicodeIds.push({
                    original: pengguna.id,
                    cleaned: cleanId,
                    money: pengguna.money,
                    role: pengguna.role
                });
            } else {
                normalIds.push({
                    id: pengguna.id,
                    money: pengguna.money,
                    role: pengguna.role
                });
                
                // Kelompokkan berdasarkan role untuk yang normal
                const role = pengguna.role || 'Bronze';
                if (!roles[role]) roles[role] = [];
                roles[role].push({
                    id: pengguna.id,
                    money: pengguna.money,
                    role: role
                });
            }
            
            // Catat duplikat
            if (!duplicateIds[cleanId]) {
                duplicateIds[cleanId] = [];
            }
            duplicateIds[cleanId].push(pengguna.id);
        });

        // Urutkan setiap role berdasarkan balance (terbesar ke terkecil)
        for (const role in roles) {
            roles[role].sort((a, b) => b.money - a.money);
        }

        // Siapkan teks untuk ditampilkan
        let teks = '*LAPORAN DATA MEMBER*\n\n';
        
        // 1. Tampilkan per role yang sudah diurutkan
        teks += '*🏆 GOLD MEMBERS:*\n';
        if (roles.Gold.length > 0) {
            roles.Gold.forEach((user, index) => {
                teks += `${index + 1}. ${user.id.replace("@s.whatsapp.net", "")} : ${formatmoney(user.money)}\n`;
            });
        } else {
            teks += `Tidak ada member Gold\n`;
        }
        teks += `*Total: ${roles.Gold.length} member | Total Balance: ${formatmoney(roles.Gold.reduce((sum, user) => sum + (user.money || 0), 0))}*\n\n`;
        
        teks += '*🥈 SILVER MEMBERS:*\n';
        if (roles.Silver.length > 0) {
            roles.Silver.forEach((user, index) => {
                teks += `${index + 1}. ${user.id.replace("@s.whatsapp.net", "")} : ${formatmoney(user.money)}\n`;
            });
        } else {
            teks += `Tidak ada member Silver\n`;
        }
        teks += `*Total: ${roles.Silver.length} member | Total Balance: ${formatmoney(roles.Silver.reduce((sum, user) => sum + (user.money || 0), 0))}*\n\n`;
        
        teks += '*🥉 BRONZE MEMBERS:*\n';
        if (roles.Bronze.length > 0) {
            roles.Bronze.forEach((user, index) => {
                teks += `${index + 1}. ${user.id.replace("@s.whatsapp.net", "")} : ${formatmoney(user.money)}\n`;
            });
        } else {
            teks += `Tidak ada member Bronze\n`;
        }
        teks += `*Total: ${roles.Bronze.length} member | Total Balance: ${formatmoney(roles.Bronze.reduce((sum, user) => sum + (user.money || 0), 0))}*\n\n`;
        
        // 2. Tampilkan ID dengan Unicode
        teks += '*⚠️ ID DENGAN UNICODE:*\n';
        if (unicodeIds.length > 0) {
            unicodeIds.forEach(user => {
                teks += `- ${user.original.replace("@s.whatsapp.net", "")} → ${user.cleaned}\n`;
                teks += `  Role: ${user.role}, Balance: ${formatmoney(user.money)}\n`;
            });
        } else {
            teks += `Tidak ada ID dengan Unicode\n`;
        }
        
        teks += `\n*Total ID Unicode: ${unicodeIds.length}*\n\n`;
        
        // 3. Tampilkan duplikat
        teks += '*🔍 DUPLIKAT ID (setelah dibersihkan):*\n';
        let duplicateFound = false;
        
        Object.keys(duplicateIds).forEach(cleanId => {
            if (duplicateIds[cleanId].length > 1) {
                duplicateFound = true;
                teks += `- ${cleanId} muncul ${duplicateIds[cleanId].length}x:\n`;
                duplicateIds[cleanId].forEach(id => {
                    const isUnicode = /[\u200E\u200F\u202A-\u202E]/.test(id) ? ' (unicode)' : '';
                    teks += `  • ${id.replace("@s.whatsapp.net", "")}${isUnicode}\n`;
                });
            }
        });
        
        if (!duplicateFound) {
            teks += `Tidak ada duplikat ID\n`;
        }
        
        // Total saldo semua member
        const totalSaldo = money.reduce((total, p) => total + (p.money || 0), 0);
        teks += `\n*TOTAL SALDO SEMUA MEMBER: ${formatmoney(totalSaldo)}*`;
        
        // Info statistik
        teks += `\n\n*STATISTIK:*`;
        teks += `\n- Total Member: ${money.length}`;
        teks += `\n- Gold: ${roles.Gold.length} member`;
        teks += `\n- Silver: ${roles.Silver.length} member`;
        teks += `\n- Bronze: ${roles.Bronze.length} member`;
        
        // Petunjuk
        teks += `\n\n*Petunjuk:*`;
        teks += `\n- ID dengan Unicode perlu diperbaiki`;
        teks += `\n- Duplikat ID perlu dihapus salah satunya`;
        teks += `\n- Gunakan *${prefix}fixdata* untuk memperbaiki masalah`;
        
        // Kirim pesan (potong jika terlalu panjang)
        if (teks.length > 10000) {
            const part1 = teks.substring(0, 10000);
            const part2 = teks.substring(10000);
            await client.sendMessage(from, { text: part1 }, { quoted: m });
            await client.sendMessage(from, { text: part2 });
        } else {
            await client.sendMessage(from, { text: teks.trim() }, { quoted: m });
        }
    } catch (error) {
        console.error('Error:', error);
        reply('Terjadi error saat memproses data member');
    }
    break;
}
case 'setrole': {
    if (!isCreator) return m.reply(mess.owner);

    const fs = require('fs');
    const balanceFilePath = './src/balance.json';

    const target = m.mentionedJid[0] || (m.isQuotedMsg ? m.quotedMsg.sender : null);
    const targetNumber = target ? target.replace("@s.whatsapp.net", "") : null;
    const newRole = text.split(" ")[1]; // Peran baru yang akan diberikan

    const validRoles = ["Bronze", "Silver", "Gold"]; // Peran yang valid

    if (!targetNumber) {
        const [nomor, role] = text.split(" ");

        if (!nomor || !role || !validRoles.includes(role)) {
            return m.reply(`*JENIS JENIS ROLE :*\n- Bronze\n- Silver\n- Gold\n\nGunakan dengan cara :\n> ${prefix}${command} [nomor_pengguna] [peran_baru]\n\nContoh :\n> ${prefix + command} 6285787668876 Silver\n\n> ${prefix + command} @pengguna Silver`);
        }

        try {
            const balanceData = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));
            const targetUser = balanceData.find(user => user.id === `${nomor}@s.whatsapp.net`);

            if (targetUser) {
                targetUser.role = role; // Mengubah peran pengguna

                fs.writeFileSync(balanceFilePath, JSON.stringify(balanceData, null, 3));

                m.reply(`Role pengguna dengan nomor ${nomor} berhasil diubah menjadi *${role}*.`);

                await client.sendMessage(`${nomor}@s.whatsapp.net`, {
                    text: `Selamat, Role Kamu sekarang menjadi *${role}*.\n\nSilahkan ketik ${prefix}info untuk melihat Data Profil Kamu`
                });

            } else {
                m.reply(`User dengan nomor ${nomor} tidak ditemukan.`);
            }
        } catch (error) {
            console.error(`Error reading/updating balance file: ${error}`);
            m.reply('Maaf, terjadi kesalahan saat mengakses database.');
        }
    } else {
        if (!newRole || !validRoles.includes(newRole)) {
            return m.reply(`*JENIS JENIS ROLE :*\n- Bronze\n- Silver\n- Gold\n\nGunakan dengan cara :\n${prefix}${command} [nomor_pengguna] [peran_baru]\n\nContoh :\n> ${prefix + command} 6285787668876 Silver\n\n> ${prefix + command} @pengguna Silver`);
        }

        try {
            const balanceData = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));
            const targetUser = balanceData.find(user => user.id === `${targetNumber}@s.whatsapp.net`);

            if (targetUser) {
                targetUser.role = newRole; // Mengubah peran pengguna

                fs.writeFileSync(balanceFilePath, JSON.stringify(balanceData, null, 3));

                m.reply(`Role pengguna dengan nomor ${targetNumber} berhasil diubah menjadi *${newRole}*.`);

                await client.sendMessage(`${targetNumber}@s.whatsapp.net`, {
                    text: `Selamat, Role Kamu sekarang menjadi *${newRole}*.\n\nSilahkan ketik ${prefix}info untuk melihat Data Profil Kamu`
                });

            } else {
                m.reply(`User dengan nomor ${targetNumber} tidak ditemukan karena belum terdaftar didatabase Bot.\n\nSilahkan suruh nomer ${targetNumber} ini untuk ketik .saldo ke bot agar terdaftar dan bisa dilakukan setrole`);
            }
        } catch (error) {
            console.error(`Error reading/updating balance file: ${error}`);
            m.reply('Maaf, terjadi kesalahan saat mengakses database.');
        }
    }
    break;
}
case 'urutbalance': {
    if (!isCreator) return m.reply(mess.owner);

    const fs = require('fs');
    const balanceFilePath = './src/balance.json';

    try {
        // Baca data dari file balance.json
        let data = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));

        // Fungsi untuk menyusun objek dengan urutan kunci yang konsisten
        const sortJsonKeys = (obj) => {
            // Tentukan urutan kunci yang diinginkan
            const orderedKeys = ['id', 'role', 'money'];

            // Susun objek berdasarkan urutan kunci
            const sortedObj = {};
            orderedKeys.forEach(key => {
                if (obj.hasOwnProperty(key)) {
                    sortedObj[key] = obj[key];
                }
            });
            return sortedObj;
        };

        // Susun setiap objek dalam array data
        const sortedData = data.map(sortJsonKeys);

        // Tulis kembali data yang sudah disusun ke file balance.json
        fs.writeFileSync(balanceFilePath, JSON.stringify(sortedData, null, 3), 'utf8');

        m.reply("Balance file berhasil dirapikan dengan urutan kunci yang konsisten.");

    } catch (error) {
        console.error(`Error saat menyusun balance file: ${error}`);
        return m.reply("Terjadi kesalahan saat mencoba merapikan balance file.");
    }
    break;
}

// Backup Bot
case 'backupbot': {
    if (!isCreator) throw mess.owner;
    
    const fs = require('fs');
    const path = require('path');
    const archiver = require('archiver');
    const moment = require('moment-timezone');
    
    // Pastikan Anda berada di dalam konteks async
    async function createZipArchive() {
        const tanggalBackup = moment().tz('Asia/Jakarta').locale('id').format('DMMMYYYY');
        const filePath = `backup-${tanggalBackup}.zip`;
        const output = fs.createWriteStream(filePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        return new Promise((resolve, reject) => {
            output.on('close', async () => {
                try {
                    console.log(`Berhasil mengompres ${archive.pointer()} total byte`);
                    const fileData = fs.readFileSync(filePath);
                    const messageOptions = {
                        document: fileData,
                        mimetype: 'application/zip',
                        fileName: `backup-${tanggalBackup}.zip`,
                    };

                    if (isGroup) {
                        await m.reply(
                            `File backup-${tanggalBackup}.zip dikirim ke Private Chat Owner. Silahkan di cek dan di download`
                        );
                    }
                    
                    await client.sendMessage(
                        `${global.owner[0]}@s.whatsapp.net`,
                        messageOptions,
                        { quoted: m }
                    );

                    // Hapus file setelah berhasil dikirim
                    fs.unlinkSync(filePath);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);

            const foldersToArchive = ['gambar', 'lib', 'setting', 'src'];
            const filesToArchive = ['index.js', 'LICENSE', 'package.json', 'README.md', 'SECURITY.md'];

            foldersToArchive.forEach((folder) => {
                archive.directory(folder, folder);
            });

            filesToArchive.forEach((file) => {
                archive.file(file, { name: file });
            });

            archive.finalize();
        });
    }

    // Panggil fungsi async dengan penanganan kesalahan yang tepat
    createZipArchive()
        .then(() => console.log('Proses backup selesai'))
        .catch((error) => console.error('Terjadi kesalahan saat backup:', error));

    break;
}
case "getfilelist" : {
if (!isCreator) return reply(`Hanya Bisa Digunakan Oleh Owner`);
    
const fs = require('fs');
const foldernya = "./src/db_list.json";
const filenya = await fs.readFileSync(`${foldernya}`);

await m.reply(`*Note :*\n_File List Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk Publik Ataupun Pengguna Bot._`)
await m.reply(`_Sedang Mengirim Document_\n_Nama File : ${foldernya}.json_\n_Mohon Tunggu Sebentar..._`)
    
client.sendMessage(m.chat, { document: filenya, mimetype: 'document/application', fileName: 'db_list.json'}, {quoted: m } )
break;
}
case "getfilesaldo" : {
if (!isCreator) return reply(`Hanya Bisa Digunakan Oleh Owner`);
    
const fs = require('fs');
const foldernya = "./src/balance.json";
const filenya = await fs.readFileSync(`${foldernya}`);

await m.reply(`*Note :*\n_File Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk Publik Ataupun Pengguna Bot._`)
await m.reply(`_Sedang Mengirim Document_\n_Nama File : ${foldernya}.json_\n_Mohon Tunggu Sebentar..._`)
    
client.sendMessage(m.chat, { document: filenya, mimetype: 'document/application', fileName: 'balance.json'}, {quoted: m } )
break;
}
case "getfiletransaksi" : {
if (!isCreator) return reply(`Hanya Bisa Digunakan Oleh Owner`);
    
const fs = require('fs');
const foldernya = "./src/transaksi/riwayatTransaksiUser.json";
const filenya = await fs.readFileSync(`${foldernya}`);

await m,reply(`File ini berada di folder "src/transaksi/"\n\nJadi jika mau backup silahkan di upload di folder transaksi\n\n*Note :*\n_File Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk Publik Ataupun Pengguna Bot._`)
client.sendMessage(m.chat, { document: filenya, mimetype: 'document/application', fileName: 'riwayatTransaksiUser.json'}, {quoted: m } )
break;
}
 
// Bagian Lainnya   
case 'cekriwayat': {
    if (!text) return m.reply(`Silahkan Gunakan dengan cara :\n> ${prefix + command} Bulan Tahun\n\n_Contoh :_\n> ${prefix + command} Januari 2025`)
    const riwayatPath = './src/transaksi/riwayatTransaksiUser.json';
    const fs = require('fs');

    try {
        const data = fs.readFileSync(riwayatPath);
        const riwayatTransaksi = JSON.parse(data);

        // Ambil nomer user
        const userNumberString = sender.replace("@s.whatsapp.net", "");

        // Menerima input bulan dan tahun dari pesan
        const args = body.trim().split(" ");
        const month = args[1];
        const year = parseInt(args[2]);

        // Filter transaksi berdasarkan bulan dan tahun
        const transaksiUser = riwayatTransaksi.filter(transaksi => transaksi.userNumber === userNumberString && transaksi.month === month && transaksi.year === year);

        if (transaksiUser.length === 0) {
            return m.reply('Kamu belum memiliki riwayat transaksi untuk bulan dan tahun tersebut. Jika ingin melakukan transaksi, silahkan ketik .menu');
        }

        let totalTransaksi = 0;
        let totalHarga = 0;

        // Menampilkan detail setiap transaksi
        const detailTransaksi = transaksiUser.map((transaksi, index) => {
            totalTransaksi++;
            totalHarga += transaksi.price;

            return `# *Transaksi Ke-${index + 1}*\n> *› Produk* : ${transaksi.productName}\n> *› Harga* : ${formatmoney(transaksi.price)}\n> *› Waktu* : ${transaksi.transactionTime}\n> *› Invoice* : ${transaksi.invoiceNumber}\n> *› Status* : ${transaksi.status}\n\n`;
        });

        // Menampilkan total transaksi dan total harga
        const totalInfo = `\n*TOTAL TRANSAKSI*\n*› Total Transaksi* : ${totalTransaksi}\n*› Jumlah Transaksi* : ${formatmoney(totalHarga)}`;

        const replyMessage = `*RIWAYAT TRANSAKSI ${month.toUpperCase()} ${year}*\n\n${detailTransaksi.join('\n')}${totalInfo}`;

        client.sendMessage(m.chat, {
            text: replyMessage
        }, {
            quoted: m
        });
        //await m.reply(replyMessage);
    } catch (err) {
        console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
        return m.reply('Terjadi kesalahan saat membaca data riwayat transaksi.');
    }
    break;
}
case 'topuser': {
    try {
        const riwayatPath = './src/transaksi/riwayatTransaksiUser.json';
        const data = fs.readFileSync(riwayatPath);
        const riwayatTransaksi = JSON.parse(data);

        const userStats = riwayatTransaksi.reduce((stats, transaksi) => {
            const userNumber = transaksi.userNumber;
            stats[userNumber] = stats[userNumber] || {
                transactionCount: 0,
                totalSpending: 0
            };
            stats[userNumber].transactionCount++;
            stats[userNumber].totalSpending += transaksi.price;
            return stats;
        }, {});

        const topUsers = Object.keys(userStats)
            .sort((a, b) => userStats[b].totalSpending - userStats[a].totalSpending)
            .slice(0, 10);

        const topUserMessage = topUsers.map((userNumber, index) => {
            const {
                transactionCount,
                totalSpending
            } = userStats[userNumber];
            return `*#Rank ${index + 1}*\n> User: ${userNumber}\n> Jumlah Transaksi: ${transactionCount}\n> Total Belanja: ${formatmoney(totalSpending)}`;
        }).join('\n\n');

        await m.reply(`*Top 10 User Berdasarkan Jumlah Transaksi*\n\n` + topUserMessage);
    } catch (err) {
        console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
        return m.reply('Terjadi kesalahan saat membaca data riwayat transaksi.');
    }
    break;
}
case 'toplayanan': {
    try {
        const riwayatPath = './src/transaksi/riwayatTransaksiUser.json';
        const data = fs.readFileSync(riwayatPath);
        const riwayatTransaksi = JSON.parse(data);

        // Inisialisasi objek untuk menghitung jumlah pembelian produk dan total belanja
        const produkData = {};

        // Iterasi melalui riwayat transaksi
        riwayatTransaksi.forEach(transaksi => {
            const productName = transaksi.productName;
            const price = transaksi.price;

            if (!produkData[productName]) {
                produkData[productName] = {
                    totalPembelian: 0,
                    totalBelanja: 0,
                };
            }

            // Menghitung jumlah pembelian produk dan total belanja
            produkData[productName].totalPembelian += 1;
            produkData[productName].totalBelanja += price;
        });

        // Mengubah objek produkData menjadi array
        const produkArray = Object.keys(produkData).map(productName => ({
            productName,
            totalPembelian: produkData[productName].totalPembelian,
            totalBelanja: produkData[productName].totalBelanja,
        }));

        // Mengurutkan produk berdasarkan jumlah pembelian (dalam urutan descending)
        produkArray.sort((a, b) => b.totalPembelian - a.totalPembelian);

        // Ambil 10 produk teratas
        const topProducts = produkArray.slice(0, 10);

        // Buat pesan yang menampilkan top 10 produk
        const topProductsMessage = topProducts.map((product, index) => {
            return `*#Rank ${index + 1}*\n> Produk: ${product.productName}\n> Jumlah Pembelian: ${product.totalPembelian}\n> Total Transaksi: ${formatmoney(product.totalBelanja)}`;
        }).join('\n\n');

        await m.reply(`*Top 10 Produk Berdasarkan Jumlah Pembelian*\n\n` + topProductsMessage);
    } catch (err) {
        console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
        return m.reply('Terjadi kesalahan saat membaca data riwayat transaksi.');
    }
    break;
}
case 'cekprofit': {
    if (!isCreator) return m.reply(mess.owner);

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"
    ];

    try {
        const riwayatPath = './src/transaksi/riwayatTransaksiUser.json';
        const data = fs.readFileSync(riwayatPath);
        const riwayatTransaksi = JSON.parse(data);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        let totalKeuntungan = 0;
        riwayatTransaksi.forEach(transaksi => {
            if (transaksi.month === monthNames[currentMonth] && transaksi.year === currentYear) {
                totalKeuntungan += transaksi.keuntungan;
            }
        });

        await m.reply(`Total Keuntungan untuk Bulan ${monthNames[currentMonth]} Tahun ${currentYear}: *${formatmoney(totalKeuntungan)}*`);
    } catch (err) {
        console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
        return m.reply('Terjadi kesalahan saat membaca data riwayat transaksi.');
    }
    break;
}
case 'cekprofitall': {
    if (!isCreator) return m.reply(mess.owner);

    try {
        const riwayatPath = './src/transaksi/riwayatTransaksiUser.json';
        const data = fs.readFileSync(riwayatPath);
        const riwayatTransaksi = JSON.parse(data);

        const currentYear = new Date().getFullYear();
        const keuntunganBulanan = {};

        // Inisialisasi keuntungan bulanan ke 0 untuk setiap bulan
        const monthNames = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober", "November", "Desember"
        ];
        monthNames.forEach(month => keuntunganBulanan[month] = 0);

        // Menghitung total keuntungan untuk setiap bulan dalam tahun saat ini
        riwayatTransaksi.forEach(transaksi => {
            const transactionYear = transaksi.year;
            const transactionMonthName = transaksi.month;

            if (transactionYear === currentYear) {
                keuntunganBulanan[transactionMonthName] += transaksi.keuntungan;
            }
        });

        // Membuat pesan yang menampilkan keuntungan bulanan
        let message = `*DAFTAR PROFIT PADA TAHUN ${currentYear}*\n\n`;
        monthNames.forEach(month => {
            message += `> ${month} : ${formatmoney(keuntunganBulanan[month])}\n`;
        });

        // Menghitung total profit dari 12 bulan
        const totalProfit = Object.values(keuntunganBulanan).reduce((total, profit) => total + profit, 0);
        message += `\nTotal Profit 12 Bulan : ${formatmoney(totalProfit)}`;

        await m.reply(message);
    } catch (err) {
        console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
        return m.reply('Terjadi kesalahan saat membaca data riwayat transaksi.');
    }
    break;
}

// Dashboard
case "saldo":
case "info": {
  if (isBanned) return m.reply(`*Maaf, Akun Anda Telah Diblokir*`);

  const fs = require("fs");
  const saldo = formatmoney(getMonUser(sender) || 0);
  const role = getRoleUser(sender);
  const riwayatPath = "./src/transaksi/riwayatTransaksiUser.json";

  let totalPesanan = 0;   // jumlah transaksi
  let totalTransaksi = 0; // total nominal transaksi

  const userNumber = sender.replace(/\D/g, "");

  try {
    if (fs.existsSync(riwayatPath)) {
      const data = fs.readFileSync(riwayatPath, "utf8");
      const riwayat = data ? JSON.parse(data) : [];

      if (Array.isArray(riwayat)) {
        const transaksiUser = riwayat.filter(trx =>
          trx.userNumber === userNumber &&
          trx.status === "Sukses"
        );

        totalPesanan = transaksiUser.length;

        totalTransaksi = transaksiUser.reduce(
          (sum, trx) => sum + Number(trx.price || 0),
          0
        );
      }
    }
  } catch (err) {
    console.error("Gagal membaca riwayat transaksi:", err);
  }

  const menuInfo = `*INFORMASI AKUN PENGGUNA*

> Nama : ${m.pushName}
> Saldo : ${saldo}
> Role  : ${role}
> Total Pesanan : ${totalPesanan}
> Total Transaksi : Rp ${formatmoney(Math.round(totalTransaksi))}

Cek riwayat transaksi:
> ${prefix}cekriwayat

Upgrade role:
> ${prefix}upgrade`;

  client.sendMessage(m.chat, { text: menuInfo }, { quoted: m });
  break;
}
// Versi Button
case "upgrade" : {
m.reply(`*Upgrade ke Level Reseller Premium!*

Apakah Anda ingin mengambil bisnis produk digital Anda ke level berikutnya? Upgrade peran Anda menjadi Silver atau Gold sekarang untuk menikmati manfaat luar biasa berikut:

*Manfaat Upgrade:*
1. Harga Produk Lebih Murah: Dapatkan harga produk yang lebih rendah, memberikan keuntungan besar dalam bisnis produk digital Anda.
2. Proses Otomatisasi: Mudah dan efisien. Tidak perlu ribet dengan pembuatan situs web, semuanya dapat diatur melalui WhatsApp.
3. Beragam Pilihan Produk: Tersedia berbagai pilihan produk, seperti game, pulsa, token PLN, dan banyak lagi.

*Ayo Mulai Bisnis Anda Sekarang!*
- Upgrade ke Level Silver: ${formatmoney(upgradeSilver)}
- Upgrade ke Level Gold: ${formatmoney(upgradeGold)}

Tidak ada batasan waktu, Anda dapat menjadi Reseller Produk Digital bersama Bot ${packname}!

Jadi, tertarik untuk menjadi seorang Reseller? Silahkan ketik format berikut :

.upgraderole Silver
.upgraderole Gold`)
break;
};
// Versi Teks
case "upgraderole": {
  const fs = require('fs');
  const balanceFilePath = './src/balance.json';

  const senderNumber = `${sender}`; // Nomor pengguna yang melakukan upgrade
  const currentRole = getRoleUser(senderNumber); // Mendapatkan peran pengguna saat ini
  const targetRole = args[0]; // Peran baru yang akan diberikan

  // Hanya perbolehkan "Silver" atau "Gold" sebagai input peran
  if (targetRole !== "Silver" && targetRole !== "Gold") {
    return m.reply(`Peran yang dimasukkan tidak valid. Hanya bisa meng-upgrade ke "Silver" atau "Gold".`);
  }

  const userBalance = getMonUser(senderNumber);

  let upgradeCost = 0;

  // Tentukan biaya upgrade berdasarkan peran saat ini
  if (currentRole === "Bronze" && targetRole === "Silver") {
    upgradeCost = upgradeSilver; // Biaya upgrade dari Bronze ke Silver
  } else if (currentRole === "Silver" && targetRole === "Gold") {
    upgradeCost = upgradeGold; // Biaya upgrade dari Silver ke Gold
  } else if (currentRole === "Bronze" && targetRole === "Gold") {
    upgradeCost = upgradeGold; // Biaya upgrade langsung dari Bronze ke Gold
  }

  if (currentRole === "Gold") {
    return m.reply(`Anda sudah memiliki peran "Gold" dan tidak dapat meng-upgrade ke peran yang lebih rendah seperti "Silver" atau "Bronze".`);
  }

  if (upgradeCost === 0) {
    return m.reply(`Peran yang dimasukkan tidak valid atau Anda sudah memiliki role tersebut.`);
  }

  if (userBalance < upgradeCost) {
    return m.reply(`Maaf, saldo Anda tidak mencukupi untuk meng-upgrade ke role ${targetRole}\n\nBiaya Upgrade ke ${targetRole} adalah ${formatmoney(upgradeCost)}\n\nSilahkan ketik ${prefix}depo atau hubungi owner jika ingin deposit saldo`);
  }

  try {
    // Kurangi saldo pengguna sesuai dengan biaya upgrade
    moneyAdd(senderNumber, upgradeCost);

    // Update peran pengguna
    const balanceData = JSON.parse(fs.readFileSync(balanceFilePath));
    const targetUser = balanceData.find(user => user.id === senderNumber);

    if (targetUser) {
      targetUser.role = targetRole; // Mengubah peran pengguna

      fs.writeFileSync(balanceFilePath, JSON.stringify(balanceData, null, 3));

      await m.reply(`Selamat, Anda berhasil meng-upgrade ke role *${targetRole}*.\n\nSaldo kamu telah di kurangi sebanyak ${formatmoney(upgradeCost)}.\n\nSilahkan ketik ${prefix}info untuk melihat informasi seputar akun Kamu`);
      await client.sendMessage(global.owner[0]+`@s.whatsapp.net`, {text: `Halo owner, user ${sender.replace('@s.whatsapp.net', '')} melakukan upgrade ke role *${targetRole}* dan Saldonya sudah di kurangi sebanyak ${formatmoney(upgradeCost)}`})
        
    } else {
      m.reply(`User dengan nomor ${senderNumber} tidak ditemukan.`);
    }
  } catch (error) {
    console.error(`Error reading/updating balance file: ${error}`);
    m.reply('Maaf, terjadi kesalahan saat mengakses database.');
  }
  break;
};
case "req": {
  if (!isGroup) {
    const requestMessage = args.join(" ");
    if (requestMessage) {
      for (const ownerNumber of global.owner) {
        const messageToOwner = `*PESAN REQUEST*\n\nDari : ${sender.replace("@s.whatsapp.net", "")}\nPesan : ${requestMessage}`;
        client.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: messageToOwner }, { quoted: m });
      }
      return reply("_Request Anda telah diteruskan ke owner. Terima kasih atas Sarannya!_");
    } else {
      return reply("_Mohon berikan pesan yang ingin Anda request._");
    }
  } else {
    return m.reply("_Perintah ini hanya dapat digunakan dalam pesan pribadi (DM)._");
  }
break;
};  


// Versi Teks
case "menu": {
if (isBanned) return m.reply(`*You Have Been Banned*`);
//if (isGroup) return m.reply('Untuk akses Fitur Topup Mandiri, silahkan gunakan di Private Chat Bot!')
  
const menuText = `*Halo ${pushname ? pushname : "Anon"} ${ucapanWaktu}.*\n*Ketik salah satu dari menu berikut untuk melihat apa yang kami tawarkan.*
*Contoh : .listtopup*
*Hanya tulis .listtopup tidak ada tambahan yang lainnya*

✦ *Layanan Point Blank* ✦
> ${prefix}listtopup - List Harga Cash PB
> ${prefix}listakunpb - Daftar Akun PB Ready
> ${prefix}gbexp - Jasa GB EXP (Point Blank)
> ${prefix}gbkill - Jasa GB Kill (Point Blank)
> ${prefix}gbbp - Jasa GB Battle Pass (Point Blank)

✦ *Menu Sistem* ✦
> ${prefix}dashboard - Dashboard Akun Anda
> ${prefix}upgrade - Upgrade Akun VIP
> ${prefix}owner - Kontak Owner / CS

✦ *Bantuan* ✦
> WA Owner: wa.me/6281511132181`;

client.sendMessage(m.chat, {caption: menuText, image: {url: "./gambar/bot.webp"} }, {quoted: m})
break;
};       

case "dashboard" : {
//if (isGroup) return m.reply('Untuk akses Fitur Topup Mandiri, silahkan gunakan di Private Chat Bot!')
    
const textDashboard = `✦ *Menu Akun* ✦
> ${prefix}depo
> ${prefix}depomanual
> ${prefix}caradepo
> ${prefix}bukti nominal.teksnya
> ${prefix}saldo
> ${prefix}cekriwayat
> ${prefix}req

✦ *Peringkat* ✦
> ${prefix}topuser
> ${prefix}toplayanan`;
    client.sendMessage(m.chat, {caption: textDashboard, image: {url: "./gambar/icon-dashboard.png"} }, {quoted: m})

break;
};

case "daftarharga":
case "listgame" : {
m.reply(`*LIST HARGA TOPUP GAME*

*Ketik command list harga produk yang mau anda lihat harganya*
*Contoh : .listml*
*Hanya tulis .listml tidak ada tambahan yang lainnya*
➖➖➖➖➖➖➖➖➖
> ${prefix}listml - Mobile Legends
> ${prefix}listmlmy - Mobile Legends Malaysia
> ${prefix}listff - Free Fire
> ${prefix}listgi - Genshin Impact
> ${prefix}listpb - Point Blank
> ${prefix}listpubg - PUBG Mobile
> ${prefix}listvalo - Valorant
> ${prefix}listvhok - Honor of Kings
> ${prefix}listcod - Call of Duty MOBILE
> ${prefix}listhsr - Honkai Star Rail`)
break;
};

case "list" : {
m.reply(`*LIST HARGA TOPUP GAME*

*Ketik command list harga produk yang mau anda lihat harganya*
*Contoh : .listml*
*Hanya tulis .listml tidak ada tambahan yang lainnya*
➖➖➖➖➖➖➖➖➖
> ${prefix}listml - Mobile Legends
> ${prefix}listmlmy - Mobile Legends Malaysia
> ${prefix}listff - Free Fire
> ${prefix}listgi - Genshin Impact
> ${prefix}listpb - Point Blank
> ${prefix}listpubg - PUBG Mobile
> ${prefix}listvalo - Valorant
> ${prefix}listvhok - Honor of Kings
> ${prefix}listcod - Call of Duty MOBILE
> ${prefix}listhsr - Honkai Star Rail`)
break;
}; 

case "listlainnya" : {
//if (isGroup) return m.reply('Untuk akses Fitur Topup Mandiri, silahkan gunakan di Private Chat Bot!')
    
m.reply(`✦ *List Lainnya* ✦
✦ *Kalkulator* ✦
> ${prefix}kali - Perkalian
> ${prefix}bagi - Pembagian
> ${prefix}tambah - Pertambahan
> ${prefix}kurang - Pengurangan
➖➖➖➖➖➖➖➖➖
✦ *Fitur Tambahan* ✦
> ${prefix}sticker - Buat Sticker
> ${prefix}ttdl - Tiktok Download`)
break;
};

case "daftarharga" : {
//if (isGroup) return m.reply('Untuk akses Fitur Topup Mandiri, silahkan gunakan di Private Chat Bot!')
    
m.reply(`*DAFTAR HARGA SEMUA PRODUK*

*Ketik command cek harga produk yang mau anda lihat harganya*
*Contoh : .hargaml*
*Hanya tulis .hargaml tidak ada tambahan yang lainnya*
➖➖➖➖➖➖➖➖➖
✦ *Daftar Harga Game* ✦
> ${prefix}hargaml - Mobile Legends
> ${prefix}hargamlmy - Mobile Legends Malaysia
> ${prefix}hargaff - Free Fire
> ${prefix}hargagi - Genshin Impact
> ${prefix}hargapb - Point Blank
> ${prefix}hargapubg - PUBG Mobile
> ${prefix}hargavalo - Valorant
> ${prefix}hargavhok - Honor of Kings
> ${prefix}hargacod - Call of Duty MOBILE
> ${prefix}hargahsr - Honkai Star Rail`)
break;
};

case "caratopup" : {
//if (isGroup) return m.reply('Untuk akses Fitur Topup Mandiri, silahkan gunakan di Private Chat Bot!')

let text = `✦ *CARA TOPUP SEMUA PRODUK* ✦

*Ketik command list cara topup yang mau anda lihat cara topupnya*
*Contoh : .topupml*
*Hanya tulis .topupml tidak ada tambahan yang lainnya*
➖➖➖➖➖➖➖➖➖
✦ *Cara Topup Game* ✦
> ${prefix}topupml - Mobile Legends
> ${prefix}topupmlmy - Mobile Legends Malaysia
> ${prefix}topupff - Free Fire
> ${prefix}topupgi - Genshin Impact
> ${prefix}topuppb - Point Blank
> ${prefix}topuppubg - PUBG Mobile
> ${prefix}topupvalo - Valorant
> ${prefix}topupvhok - Honor of Kings
> ${prefix}topupcod - Call of Duty MOBILE
> ${prefix}topuphsr - Honkai Star Rail`
//client.sendMessage(m.chat, { caption: text, image: { url: "./gambar/topup.webp"} }, { quoted: m });
client.sendMessage(m.chat, { text }, { quoted: m });
break;
};

// Cetak Invoice
case 'cekmargin': {
  if (!isCreator) return m.reply(mess.owner);
  const fs = require('fs');
  const path = './src/produk-digiflazz/margin/';

  // Membaca semua file di folder margin
  let files;
  try {
    files = fs.readdirSync(path);
  } catch (error) {
    return m.reply(`Gagal membaca folder margin: ${error.message}`);
  }

  let marginData = {};

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = `${path}${file}`;
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        marginData[file.replace('margin-', '').replace('.json', '')] = data;
      } catch (error) {
        console.error(`Gagal membaca atau mengurai file ${filePath}: ${error.message}`);
      }
    }
  });

  // Menyusun pesan untuk ditampilkan
  let message = `*DATA MARGIN PRODUK*\n\n`;
  for (let [product, margins] of Object.entries(marginData)) {
    message += `*Produk ${product}*\n`;
    if (margins && Object.keys(margins).length > 0) {
      const { bronze, silver, gold } = margins[Object.keys(margins)[0]]; // Mengambil margin dari produk pertama dalam file
      message += `> Bronze: ${bronze}\n`;
      message += `> Silver: ${silver}\n`;
      message += `> Gold: ${gold}\n\n`;
    } else {
      message += `  Tidak ada data margin.\n\n`;
    }
  }
  message += `Diatas adalah informasi Margin yang telah di setting`;

  // Mengirim pesan ke pengguna
  m.reply(message);
  break;
}
case 'setinvoice': {
  if (!isCreator) throw mess.owner;
    
  const petunjuk = `*PENGATURAN VERSI INVOICE PUBLIK*\n\n_Versi Gambar Silahkan gunakan dengan cara :_\n> ${prefix + command} gambar\n\n_Versi Teks Silahkan gunakan dengan cara :_\n> ${prefix + command} teks`;
    
  if (!text) return m.reply(petunjuk)
  const status = args[0].toLowerCase(); // ON/OFF
  let newMode;

  if (status === 'gambar') {
    newMode = true;
  } else if (status === 'teks') {
    newMode = false;
  } else {
    return m.reply(petunjuk);
  }

  // Simpan status baru ke file JSON
  fs.writeFileSync(invoiceFilePath, JSON.stringify({ mode: newMode }, null, 2));
  
  // Perbarui invoiceMode
  invoiceMode = newMode;

  const modeMessage = invoiceMode ? 'Gambar' : 'Teks';
  return m.reply(`Invoice mode telah diatur ke ${modeMessage}.`);
}
case "cetakinvoice" : {
    if (!isCreator) throw mess.owner;
    if (!text) return m.reply(`*FITUR CETAK INVOICE*\n\nSilahkan gunakan dengan cara :\n> ${prefix + command} Ref ID Transaksi\n\nContoh :\n> ${prefix + command} BGRL20250425U5DJ`);
              
    const refId = args[0];
    await sendInvoiceImage(refId, client, m)
break;
}
case "hapusinvoice": {
    if (!isCreator) return m.reply('Hanya pembuat yang bisa menggunakan perintah ini.');

    // Panggil fungsi untuk menghapus invoice
    await hapusinvoice(m);
break;
}
case 'setlogoinvoice': {
  if (!isCreator) return m.reply('Perintah ini hanya dapat digunakan oleh owner.');
    
  const fs = require('fs');
  try {
    // Download gambar yang diterima dari pesan yang di-reply
    if (/image/.test(mime)) {
      const media = await await quoted.download();
      
      // Simpan gambar ke dalam file ./gambar/bot.webp
      fs.writeFileSync('./gambar/invoice/logo-invoice.png', media);
      
      return m.reply('Gambar berhasil diubah.');
    } else {
      return m.reply('Balas pesan dengan gambar untuk menggantikan gambar bot.');
    }
  } catch (error) {
    console.error('Error while changing image:', error);
    return m.reply('Terjadi kesalahan saat mengubah gambar.');
  }
break;
}

// Set Icon
case 'setmenu': {
    if (!isCreator) return m.reply('Perintah ini hanya dapat digunakan oleh owner.');

    const fs = require('fs');
    try {
        // Download gambar yang diterima dari pesan yang di-reply
        if (/image/.test(mime)) {
            const media = await await quoted.download();

            // Simpan gambar ke dalam file ./gambar/bot.webp
            fs.writeFileSync('./gambar/bot.webp', media);

            return m.reply('Gambar berhasil diubah.');
        } else {
            return m.reply('Balas pesan dengan gambar untuk menggantikan gambar bot.');
        }
    } catch (error) {
        console.error('Error while changing image:', error);
        return m.reply('Terjadi kesalahan saat mengubah gambar.');
    }
    break;
}

// Bagian Dokumentasi Command
case "help" : { 
require('./menuHelp')
    
client.sendMessage(from, { text: `${menuHelp(m.pushname)}` }, { quoted: m });
break;
}; 
case "menudigi" : {
	if (!isCreator) throw mess.owner   
require('./menuHelp')
    
client.sendMessage(from, { text: `${menuDigiflazz(m.pushname)}` }, { quoted: m });
break;
};
case "menustore" : { 
require('./menuHelp')
    
client.sendMessage(from, { text: `${menuFiturStore(m.pushname)}` }, { quoted: m });
break;
}; 

// Fitur lainnya
case 'ttdl': {
    //if (!isCreator) throw mess.owner;
    if (m.isGroup) return m.reply(mess.private)
    if (args.length == 0) return m.reply(`contoh .ttdl link`)
    m.reply(mess.wait)
    const axios = require('axios')

    let headerTiktok = `*TIKTOK DOWNLOAD*`
    let res = await tiktok2(`${args[0]}`)
    client.sendMessage(m.chat, {
        video: {
            url: res.no_watermark
        },
        caption: headerTiktok,
        fileName: `tiktok.mp4`,
        mimetype: 'video/mp4'
    }).then(() => {})
    async function tiktok2(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const encodedParams = new URLSearchParams();
                encodedParams.set('url', query);
                encodedParams.set('hd', '1');

                const response = await axios({
                    method: 'POST',
                    url: 'https://tikwm.com/api/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Cookie': 'current_language=en',
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                    },
                    data: encodedParams
                });
                const videos = response.data.data;
                const result = {
                    title: videos.title,
                    cover: videos.cover,
                    origin_cover: videos.origin_cover,
                    no_watermark: videos.play,
                    watermark: videos.wmplay,
                    music: videos.music
                };
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    break
}


//━━━━━━━━━━━━━━━[ FITUR TAMBAHAN ]━━━━━━━━━━━━━━━━━//

case 'bottwteueie' : {
m.reply(`Halo kak ${pushname}`)
break;
}             

case 'afk': {
    if (!m.isGroup) return reply("Fitur Ini Khusus Group Blok !");
    if (!isAdmins) throw mess.admin
    
	const cooldowns = new Map();              
    const now = Date.now();
    const cooldownTime = 5000; // Batas waktu antara eksekusi perintah AFK dalam milidetik (misalnya, 5 detik)

    if (cooldowns.has(m.sender)) {
        const lastExecutionTime = cooldowns.get(m.sender);
        const remainingTime = lastExecutionTime + cooldownTime - now;
        if (remainingTime > 0) {
            return m.reply(`Tunggu beberapa saat sebelum menggunakan perintah AFK lagi. (Sisa Waktu: ${msToDate(remainingTime)})`);
        }
    }

    let reason = text ? text : 'Nothing.';
    afk.addAfkUser(m.sender, Date.now(), reason, _afk);
    client.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} telah offline\nAlasan : ${reason}`, m);
    cooldowns.set(m.sender, now); // Catat waktu terakhir pengguna menjalankan perintah AFK
break;
};           
    
case 'owner': case 'admin': {
  if (isBanned) {
    return m.reply(`*You Have Been Banned*`);
  }
  client.sendContact(m.chat, global.owner, m);
break;
};
case 'getip': {
  if (!isCreator) throw mess.owner;
  m.reply("My public IP address is: " + ipserver);
break;
};              
case 'restart': {
  if (!isCreator) {
    return m.reply(mess.owner);
  }
  await m.reply(`_Restarting ${packname}_`);
  try {
    await client.sendMessage(from, {text: "*_Succes_*"});
    await sleep(3000);
    exec(`npm start`);
  } catch (err) {
    exec(`node index.js`);
    await sleep(4000);
    m.reply('*_Sukses_*');
  }
break;
};

case 'join': {
	if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!isCreator) throw mess.owner
    if (!text) throw 'Masukkan Link Group!'
    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
    m.reply(mess.wait)
    let result = args[0].split('https://chat.whatsapp.com/')[1]
    await client.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)));
break;
}
case 'block': {
	if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!isCreator) throw mess.owner
    if (!text) return m.reply(`Silahkan gunakan dengan cara : ${prefix + command} 628xxxxxx`);
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await client.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)));
break;
};           
case 'unblock': {
	if (isBanned) return m.reply(`*You Have Been Banned*`)
	if (!isCreator) throw mess.owner
    if (!text) return m.reply(`Silahkan gunakan dengan cara : ${prefix + command} 628xxxxxx`);
	let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	await client.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
break;
};                                        
case '🙂' : case 'kick': case 'k': {
	if (!m.isGroup) throw mess.group
    if (!isBotAdmins) throw mess.botAdmin
    if (!isAdmins) throw mess.admin
    var number;
		if (mentionUser.length !== 0) {
        number = mentionUser[0]
        client.groupParticipantsUpdate(from, [number], "remove")
        } else if (m.isQuotedMsg) {
          number = m.quotedMsg.sender
          client.groupParticipantsUpdate(from, [number], "remove")
        } else {
          m.reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
        }
break;
};
case 'listuser' : {
  if (!isCreator) throw mess.owner
  teks = '*_List User :)_*\n\n'
  for (let pengguna of signup) {
    teks += `- ${pengguna}\n`
  }
  teks += `\n*_Total User : ${signup.length}_*`
  client.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": signup } });
break;
};    
case 'sticker' : case 's': {
  if (!isCreator) throw mess.owner;
 //if (isGroup) throw mess.group;

  if (/image/.test(mime)) {
    m.reply(mess.wait);
    let media = await client.downloadMediaMessage(qmsg);
    let encmedia = await client.sendImageAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author
    });
    await fs.unlinkSync(encmedia);
  } else if (/video/.test(mime)) {
    m.reply(mess.wait);
    if (qmsg.seconds > 11) {
      return m.reply('Maksimal 10 detik!');
    }
    let media = await client.downloadMediaMessage(qmsg);
    let encmedia = await client.sendVideoAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author
    });
    await fs.unlinkSync(encmedia);
  } else {
    m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`);
  }
break;
};
case 'ping': {
  if (!isCreator) throw mess.owner;
  const used = process.memoryUsage();
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
    return cpu;
  });

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total;
    last.speed += cpu.speed / length;
    last.times.user += cpu.times.user;
    last.times.nice += cpu.times.nice;
    last.times.sys += cpu.times.sys;
    last.times.idle += cpu.times.idle;
    last.times.irq += cpu.times.irq;
    return last;
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  });

  let timestamp = speed();
  let latensi = speed() - timestamp;
  neww = performance.now();
  oldd = performance.now();
  respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_
${oldd - neww} _miliseconds_

Runtime: ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
  `.trim();

  m.reply(respon);
break;
};

case 'ban' : {
	if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
	if (!isCreator) throw mess.owner
	bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
    ban.push(bnnd)
	fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
	m.reply(`${bnnd}`);
break;
};             
case 'unban' : {
	if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
	if (!isCreator) throw mess.owner
	bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
    unp = ban.indexOf(bnnd)
    ban.splice(unp, 1)
	fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
	m.reply(`${bnnd}`);
break;
};             
case 'listban': case 'lisbanned': {
	if (!isCreator) throw mess.owner
    teks = '*List Banned*\n\n'
    for (let medog of ban) {
    teks += `- ${medog}\n`
    }
    teks += `\n*Total Banned : ${ban.length}*`
    client.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": ban } });
break;
};
case 'hidetag': case 'h': {
	if (!m.isGroup) return reply(mess.group)
    if (!isAdmins) return reply(mess.admin)
    client.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m });
break;
};
case 'antilink': {
  if (!isGroup) return m.reply(mess.group);
  if (!isAdmins) return m.reply(mess.admin);
  if (!isBotAdmins) return m.reply("Jadikan saya Admin dulu ya :)");
  
  const action = args[0]; // 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan
  
  if (action === 'on') {
    antilink.push(from);
    fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink, null, 2));
    reply(`✅ Sukses mengaktifkan fitur antilink di group *${groupMetadata.subject}*`);
  } else if (action === 'off') {
    const index = antilink.indexOf(from);
    if (index !== -1) {
      antilink.splice(index, 1);
      fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink, null, 2));
      reply(`✅ Sukses menonaktifkan fitur antilink di group *${groupMetadata.subject}*`);
    } else {
      reply(`Fitur antilink tidak aktif di group *${groupMetadata.subject}*.`);
    }
  } else {
    reply('Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan fitur antilink.');
  };
break;
};           
case 'p': case 'proses': {
	if (!isGroup) {
        if (isBanned) return;
        const usedPrefix = prefix || '.';
        const menuText = `*Halo ${pushname ? pushname : "Anon"} ${ucapanWaktu}.*\n*Ketik salah satu dari menu berikut untuk melihat apa yang kami tawarkan.*\n*Contoh : ${usedPrefix}listtopup*\n*Hanya tulis ${usedPrefix}listtopup tidak ada tambahan yang lainnya*\n\n✦ *Layanan Point Blank* ✦\n> ${usedPrefix}listtopup - List Harga Cash PB\n> ${usedPrefix}listakunpb - Daftar Akun PB Ready\n> ${usedPrefix}gbexp - Jasa GB EXP (Point Blank)\n> ${usedPrefix}gbkill - Jasa GB Kill (Point Blank)\n> ${usedPrefix}gbbp - Jasa GB Battle Pass (Point Blank)\n\n✦ *Menu Sistem* ✦\n> ${usedPrefix}dashboard - Dashboard Akun Anda\n> ${usedPrefix}upgrade - Upgrade Akun VIP\n> ${usedPrefix}owner - Kontak Owner / CS\n\n✦ *Bantuan* ✦\n> WA Owner: wa.me/6281511132181`;
        return client.sendMessage(m.chat, {caption: menuText, image: {url: "./gambar/bot.webp"} }, {quoted: m});
    }
	if (!isAdmins) return m.reply(mess.admin)
	if (!m.quoted) return reply(`Reply pesanannya!`)
	let proses = `── 「 *DETAIL PESANAN* 」 ──\n\n${m.quoted.text}\n\n> Status : Transaksi Diproses ♻️\n> Tanggal : ${tanggal}\n> Jam : ${wayah}\n\n*Pesanan ${m.quoted.sender.split("@")[0]} sedang di proses!, harap tunggu 1-10 Menit*`
	client.sendText(m.chat, proses, m);
break;
};             
case 'd': case 'done': {
	if (!isGroup) {
        if (isBanned) return;
        const usedPrefix = prefix || '.';
        const menuText = `*Halo ${pushname ? pushname : "Anon"} ${ucapanWaktu}.*\n*Ketik salah satu dari menu berikut untuk melihat apa yang kami tawarkan.*\n*Contoh : ${usedPrefix}listtopup*\n*Hanya tulis ${usedPrefix}listtopup tidak ada tambahan yang lainnya*\n\n✦ *Layanan Point Blank* ✦\n> ${usedPrefix}listtopup - List Harga Cash PB\n> ${usedPrefix}listakunpb - Daftar Akun PB Ready\n> ${usedPrefix}gbexp - Jasa GB EXP (Point Blank)\n> ${usedPrefix}gbkill - Jasa GB Kill (Point Blank)\n> ${usedPrefix}gbbp - Jasa GB Battle Pass (Point Blank)\n\n✦ *Menu Sistem* ✦\n> ${usedPrefix}dashboard - Dashboard Akun Anda\n> ${usedPrefix}upgrade - Upgrade Akun VIP\n> ${usedPrefix}owner - Kontak Owner / CS\n\n✦ *Bantuan* ✦\n> WA Owner: wa.me/6281511132181`;
        return client.sendMessage(m.chat, {caption: menuText, image: {url: "./gambar/bot.webp"} }, {quoted: m});
    }
	if (!isAdmins) return m.reply(mess.admin)
	if (!m.quoted) return reply(`Reply pesanannya!`)
	let sukses = `── 「 *DETAIL PESANAN* 」 ──\n\n${m.quoted.text}\n\n> Status : Transaksi Sukses ✅\n> Tanggal : ${tanggal}\n> Jam : ${wayah}\n\n*Pesanan ${m.quoted.sender.split("@")[0]} sudah sukses. Terima kasih sudah bertransaksi di Bangirul Store*`
	client.sendText(m.chat, sukses, m);
break;
};             
case 'linkgroup': case 'linkgc': case 'gclink': case 'grouplink':{
	if (!m.isGroup) throw reply(`Fitur Ini Khusus Group`)
	if (!isBotAdmins) throw reply(`Bot Bukan Admin`)
let response = await client.groupInviteCode(m.chat)
client.sendText(m.chat, `Link : https://chat.whatsapp.com/${response}`, m, { detectLink: true });
break;
};

case 'setopen': {
  if (!isGroup) return reply(mess.group);
  if (!isAdmins) return m.reply(mess.admin);
  if (!text) return reply(`Kirim perintah: ${command} *teks_open*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetOpen(m.chat, set_open)) return reply(`Set open already active`)
  addSetOpen(text, m.chat, set_open)
  reply(`Successfully set open!`)
break;
}
case 'changeopen': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return reply(`Kirim perintah: ${command} *teks_open*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetOpen(m.chat, set_open)) {
      changeSetOpen(text, m.chat, set_open)
      reply(`Sukses change set open teks!`)
  }
  else {
      addSetOpen(text, m.chat, set_open)
      reply(`Sukses change set open teks!`)
  }
break;
}
case 'delsetopen': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!isSetOpen(m.chat, set_open)) return reply(`Belum ada set open di sini..`)
  removeSetOpen(m.chat, set_open)
  reply(`Sukses delete set open`)
break;
}
case 'setclose': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return reply(`Kirim perintah: ${command} *teks_close*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetClose(m.chat, set_close)) return reply(`Set close already active`)
  addSetClose(text, m.chat, set_close)
  reply(`Successfully set close!`)
break;
}
case 'changeclose': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return reply(`Kirim perintah: ${command} *teks_close*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
  if (isSetClose(m.chat, set_close)) {
      changeSetClose(text, m.chat, set_close)
      reply(`Sukses change set close teks!`)
  }
  else {
      addSetClose(text, m.chat, set_close)
      reply(`Sukses change set close teks!`)
  }
break;
}
case 'delsetclose': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!isSetClose(m.chat, set_close)) return reply(`Belum ada set close di sini..`)
  removeSetClose(m.chat, set_close)
  reply(`Sukses delete set close`)
break;
}
case 'open': case 'buka': {
    if (!isGroup) return reply(mess.group)
    if (!isAdmins) return m.reply(mess.admin)
    if (!isBotAdmins) return reply(mess.botAdmin)
    client.groupSettingUpdate(from, 'not_announcement')

    if (isSetOpen(from, set_open)) {
        var get_teks_open = await getTextSetOpen(from, set_open)
        var replace_pesan = (get_teks_open.replace(/@user/gi, `@${sender.split("@")[0]}`))

        mentions(replace_pesan, [sender], true)
    } else {
        let opengc = `── 「 *GROUP OPEN* 」 ──

*GROUP TELAH DIBUKA OLEH ADMIN* @${sender.split("@")[0]}

*GROUP OPEN :*
Tanggal : ${tanggal}
Jam : ${time2}

*SILAHKAN BERTRANSAKSI*`
        mentions(opengc, [sender], true)
    }
    break
}
case 'close': case 'tutup': {
    if (!isGroup) return reply(mess.group)
    if (!isAdmins) return m.reply(mess.admin)
    if (!isBotAdmins) return reply(mess.botAdmin)
    client.groupSettingUpdate(from, 'announcement')
    if (isSetClose(from, set_close)) {
        var get_teks_close = await getTextSetClose(from, set_close)
        var replace_pesan = (get_teks_close.replace(/@user/gi, `@${sender.split("@")[0]}`))

        mentions(replace_pesan, [sender], true)
    } else {
        let closegc = `── 「 *GROUP CLOSE* 」 ──

*GROUP TELAH DITUTUP OLEH ADMIN* @${sender.split("@")[0]}

*GROUP CLOSED :*
Tanggal : ${tanggal}
Jam : ${time2}

*SILAHKAN TUNGGU SAMPAI GROUP DIBUKA KEMBALI*`
        mentions(closegc, [sender], true)
    }
    break
}
case 'welcome': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  let _welcome = JSON.parse(fs.readFileSync('./src/grub/welcome.json'));
  if (args[0] === "on") {
      if (isWelcome) return reply(`Udah on`)
      _welcome.push(m.chat)
      fs.writeFileSync('./src/grub/welcome.json', JSON.stringify(_welcome, null, 2))
      reply('Sukses mengaktifkan Welcome digrub ini')
  }
  else if (args[0] === "off") {
      if (!isWelcome) return reply(`Udah off`)
      let anu = _welcome.indexOf(m.chat)
      _welcome.splice(anu, 1)
      fs.writeFileSync('./src/grub/welcome.json', JSON.stringify(_welcome, null, 2))
      reply('Sukses menonaktifkan Welcome digrub ini')
  }
  else {
      reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
  }
break;
}
case 'left': {
    if (!isGroup) return reply(mess.group)
    if (!isAdmins) return m.reply(mess.admin)
    if (args[0] === "on") {
        if (isLeft) return reply(`Udah on`)
        _left.push(m.chat)
        fs.writeFileSync('./src/grub/left.json', JSON.stringify(_left, null, 2))
        reply('Sukses mengaktifkan goodbye di grup ini')
    } else if (args[0] === "off") {
        if (!isLeft) return reply(`Udah off`)
        let anu = _left.indexOf(m.chat)
        _left.splice(anu, 1)
        fs.writeFileSync('./src/grub/left.json', JSON.stringify(_left, null, 2))
        reply('Sukses menonaktifkan goodbye di grup ini')
    } else {
        reply(`Kirim perintah ${prefix + command} on/off\n\nContoh: ${prefix + command} on`)
    }
    break;
}
case 'delsetwelcome': {
    if (!isGroup) return reply(mess.group)
    if (!isAdmins) return m.reply(mess.admin)
    if (!isSetWelcome(m.chat, set_welcome_db)) return reply(`Belum ada set welcome di sini..`)
    removeSetWelcome(m.chat, set_welcome_db)
    reply(`Sukses delete set welcome`)
break;
}
case 'setwelcome': {
    if (!isGroup) return reply(mess.group)
    if (!isAdmins) return m.reply(mess.admin)
    if (!text) return reply(`Kirim perintah: ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
    if (isSetWelcome(m.chat, set_welcome_db)) return reply(`Set welcome already active`)
    addSetWelcome(text, m.chat, set_welcome_db)
    reply(`Successfully set welcome!`)
break;
}
case 'changewelcome': {
    if (!isGroup) return reply(mess.group)
    if (!isAdmins) return m.reply(mess.admin)
    if (!text) return reply(`Kirim perintah: ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
    if (isSetWelcome(m.chat, set_welcome_db)) {
        changeSetWelcome(text, m.chat, set_welcome_db)
        reply(`Sukses change set welcome teks!`)
    } else {
        addSetWelcome(text, m.chat, set_welcome_db)
        reply(`Sukses change set welcome teks!`)
    }
break;
}
case 'setleft': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return reply(`Kirim perintah: ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
  if (isSetLeft(m.chat, set_left_db)) return reply(`Set left already active`)
  addSetLeft(q, m.chat, set_left_db)
  reply(`Sukses mengatur set left`)
break;
}
case 'changeleft': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return reply(`Kirim perintah: ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
  if (isSetLeft(m.chat, set_left_db)) {
      changeSetLeft(q, m.chat, set_left_db)
      reply(`Sukses mengatur teks change left`)
  }
  else {
      addSetLeft(q, m.chat, set_left_db)
      reply(`Sukses mengatur teks change left`)
  }
break;
}
case 'delsetleft': {
  if (!isGroup) return reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!isSetLeft(m.chat, set_left_db)) return reply(`Belum ada set left di sini..`)
  removeSetLeft(m.chat, set_left_db)
  reply(`Sukses menghapus set left`)
break;
}       

case "pay" : case "bayar" : case "payment" : {
const linkQris = { url: './gambar/qris.jpeg' };
    
let listPayment = `DATA EWALLET DAN BANK`;
    
client.sendMessage(m.chat, { caption: listPayment, image: linkQris});
break;
};                     
              
// =============================================
// FITUR POINT BLANK - AKUN & JASA GB
// =============================================

case 'listakunpb':
case 'akunpb': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);
    const listAkunPB = `🎮 *DAFTAR AKUN POINT BLANK READY* 🎮
━━━━━━━━━━━━━━━━━━━━
*[SEGERA ISI DAFTAR AKUN DI SINI]*

Contoh format:
> 1. Akun Bintang 5 Full Title - *Rp XXX.XXX*
>    Spec: Level XX | BP XX | Skin XX
>
> 2. Akun Bintang 3 - *Rp XXX.XXX*
>    Spec: Level XX | BP XX | Skin XX
━━━━━━━━━━━━━━━━━━━━
📌 *Cara Order Akun:*
Hubungi admin untuk melihat screenshot lengkap akun.

📞 *Kontak Admin:*
> wa.me/6281511132181`;
    m.reply(listAkunPB);
    break;
};

case 'gbexp': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);
    const infoGbExp = `⚡ *GB EXP+POINT CHAR / AKUN* ⚡
━━━━━━━━━━━━━━━━━━━━
🔵 *GB BUNDIR*
> 1 JUTA EXP ➜ *Rp 10.000*
> 2 JUTA EXP ➜ *Rp 18.000*
> 3 JUTA EXP ➜ *Rp 28.000*
> 5 JUTA EXP ➜ *Rp 40.000*
> 10 JUTA EXP ➜ *Rp 80.000*
> 20 JUTA EXP ➜ *Rp 150.000*
> 50 JUTA EXP ➜ *Rp 350.000*
> 100 JUTA EXP ➜ *Rp 700.000*
📌 _1 Juta EXP dapet 400-600.000 Point_
📌 _GB Full 24 Jam_

🟣 *GB GLAS*
> 1 JUTA EXP ➜ *Rp 15.000*
> 2 JUTA EXP ➜ *Rp 28.000*
> 3 JUTA EXP ➜ *Rp 40.000*
> 5 JUTA EXP ➜ *Rp 50.000*
> 10 JUTA EXP ➜ *Rp 100.000*
> 20 JUTA EXP ➜ *Rp 200.000*
> 50 JUTA EXP ➜ *Rp 500.000*
> 100 JUTA EXP ➜ *Rp 800.000*
📌 _KDA tidak berubah_
📌 _Wajib Premium_
📌 _1 Juta EXP dapet 400-600.000 Point_
📌 _GB Full 24 Jam_
━━━━━━━━━━━━━━━━━━━━
⏳ *Order GB EXP Start 2-4 Hari*

🟡 *GB TITLE*
> GB 1 Master Medal ➜ *Rp 1.000*
> GB Ful Title ➜ *Rp 30.000* _(Harus ada Point 800.000)_
> GB Ful Title+Point ➜ *Rp 40.000*
━━━━━━━━━━━━━━━━━━━━
📞 *Kontak Admin:* wa.me/6281511132181`;
    m.reply(infoGbExp);
    break;
};

case 'gbkill': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);
    const infoGbKill = `⚔️ *GB KILL POINT BLANK* ⚔️
━━━━━━━━━━━━━━━━━━━━
> 50.000 Kill ➜ *Rp 75.000*
> 100.000 Kill ➜ *Rp 150.000*
📌 _Minimal D1_
━━━━━━━━━━━━━━━━━━━━
⚠️ *Ragu? Bisa verifikasi akun terlebih dahulu.*
_Jika ada masalah akun ganti PW, pasti bukan kami._

📞 *Kontak Admin:* wa.me/6281511132181`;
    m.reply(infoGbKill);
    break;
};

case 'gbbp': {
    if (isBanned) return m.reply(`*You Have Been Banned*`);
    const infoGbBP = `🏆 *GB BATTLE PASS POINT BLANK* 🏆
━━━━━━━━━━━━━━━━━━━━
> GB T-M1 ➜ *Rp 40.000*
> GB T-B1 ➜ *Rp 100.000*
> GB M1-B1 ➜ *Rp 80.000*
> GB T/M1/B1-B5 ➜ *Rp 750.000*
━━━━━━━━━━━━━━━━━━━━
⚠️ *Ragu? Bisa verifikasi akun terlebih dahulu.*
_Jika ada masalah akun ganti PW, pasti bukan kami._

📞 *Kontak Admin:* wa.me/6281511132181`;
    m.reply(infoGbBP);
    break;
};

// End Nambah Fitur              
default: {
    if (!m.isGroup) {
        if (isBanned) return m.reply(`*You Have Been Banned*`);
        const usedPrefix = prefix || '.';
        const menuText = `*Halo ${pushname ? pushname : "Anon"} ${ucapanWaktu}.*\n*Ketik salah satu dari menu berikut untuk melihat apa yang kami tawarkan.*\n*Contoh : ${usedPrefix}listtopup*\n*Hanya tulis ${usedPrefix}listtopup tidak ada tambahan yang lainnya*\n\n✦ *Layanan Point Blank* ✦\n> ${usedPrefix}listtopup - List Harga Cash PB\n> ${usedPrefix}listakunpb - Daftar Akun PB Ready\n> ${usedPrefix}gbexp - Jasa GB EXP (Point Blank)\n> ${usedPrefix}gbkill - Jasa GB Kill (Point Blank)\n> ${usedPrefix}gbbp - Jasa GB Battle Pass (Point Blank)\n\n✦ *Menu Sistem* ✦\n> ${usedPrefix}listlainnya - Menu Tambahan (Game Lain)\n> ${usedPrefix}dashboard - Dashboard Akun Anda\n> ${usedPrefix}upgrade - Upgrade Akun VIP\n> ${usedPrefix}owner - Kontak Owner / CS\n\n✦ *Bantuan* ✦\n> WA Owner: wa.me/6281511132181`;
        client.sendMessage(m.chat, {caption: menuText, image: {url: "./gambar/bot.webp"} }, {quoted: m});
    }
    break;
}
}
} catch (err) {
	m.reply(util.format(err));
	} 
    
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
