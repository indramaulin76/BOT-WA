/**
 * Pengembang : Bangirul
 * Instagram @bgirull
 * Terima kasih telah menjadi bagian dari script ini
*/

const fs = require("fs");
const chalk = require("chalk");
const moment = require('moment-timezone');
const axios = require('axios');



// Data Owner
global.owner = ["6285788134245", "6281511132181"];
global.no_bot = "6282349839745";
global.packname = "Xyozi Store";
global.author = "Xyozi Store";


//======> APIKEY VENDOR UTAMA <======//
// digiflazz.com
global.usernamekey = "mucopuWjPMBo";
global.developementkey = "dev-584e7840-280a-11f1-9064-39b59037a696";
global.productionkey = "8c4469f6-2c65-5e45-a8e7-d5270195a525";

global.minimalDepoOtomatis = 1000;
global.maximalDepoOtomatis = 1000000;

global.upgradeSilver = 50000;
global.upgradeGold = 100000;
global.minimaldeposit = 1000;  // minimal deposit manual

global.versionscript = require("baileys/package.json").version;
global.session = "session";

global.tanggalserver = `${moment().tz("Asia/Jakarta").locale("id").format("ll")}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss z')}`; 


// SakuRupiah Apikey (Payment Gateway)
global.sakurupiah = {
    apiId: 'ID-3112998342',
    apiKey: 'KEY-DcdUfixIIvKmW6maNYVcxVb9YANZ',
    method: 'QRIS',       // Metode pembayaran: QRIS, BCAVA, BRIVA, BNIVA, dll
    name: 'Xyozi Store',
    email: 'xyozistore@gmail.com',
    number: '6282349839745'
};

// Respon Bot
global.mess = {
  wait: "Loading...",
  owner: "Maaf pak, fitur ini khusus Owner",
  waitdata: "Melihat Data Terkini...",
  admin: "Fitur Khusus Admin Group!",
  group: "Fitur Khusus Group!",
  private: "Silahkan menggunakan Fitur ini di Private Chat Bot!",
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
};


axios.get('http://api.ipify.org')
  .then((response) => {
    global.ipserver = response.data; // Simpan IP dalam variabel global
  })
  .catch((error) => {
    console.error('Error getting IP:', error);
  });


let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
