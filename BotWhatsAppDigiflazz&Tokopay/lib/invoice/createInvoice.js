require("../../setting/config");


const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');  
const chalk = require('chalk');
const path = require('path');

// Save Hasil Transaksi
async function saveTransactionData(data) {
  const fs = require('fs');  
    
  // Baca file jika sudah ada
  let existingData = [];
  try {
    const jsonData = fs.readFileSync('./src/transaksi/invoice/invoice.json', 'utf8');
    existingData = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading transactions.json:', error);
  }

  // Tambahkan data baru ke dalam array
  existingData.push(data);

  // Tulis kembali data ke file JSON
  fs.writeFile('./src/transaksi/invoice/invoice.json', JSON.stringify(existingData, null, 3), (err) => {
    if (err) {
      console.error('Error writing to invoice.json:', err);
    } else {
      console.log('Berhasil menyimpan data invoice.');
    }
  });
}

// Cetak Invoice
async function createInvoiceImage(data) {
  // Membuat kanvas dengan ukuran yang sesuai
  const canvas = createCanvas(828, 1064);
  const ctx = canvas.getContext('2d');

  // Muat gambar background
  const background = await loadImage('./gambar/invoice/background-invoice.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
  // Memuat gambar logo
 const logo = await loadImage('./gambar/invoice/logo-invoice.png');
 const logoWidth = canvas.width / 1; // Setengah dari lebar kanvas
 const logoHeight = (logoWidth * logo.height) / logo.width; // Biarkan aspek rasio gambar tetap
 const logoX = (canvas.width - logoWidth) / 2; // Meletakkan logo di tengah-tengah kanvas secara horizontal
 const logoY = (canvas.height - logoHeight) / 2; // Meletakkan logo di tengah-tengah kanvas secara vertikal
 ctx.globalAlpha = 0.1; // Atur transparansi gambar (misalnya, 90% opasitas)
 ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
 ctx.globalAlpha = 1; // Kembalikan transparansi ke nilai default

    
  // Menulis teks pada kanvas
  ctx.fillStyle = '#000000';
  ctx.font = '40px Roboto';
    
  const textWidthJudul1 = ctx.measureText(`INVOICE`).width;
  const textXJudul1 = (canvas.width - textWidthJudul1) / 2;
  ctx.fillText(`INVOICE`, textXJudul1, 100);  
    
  const textWidthJudul2 = ctx.measureText(`${packname.toUpperCase()}`).width;
  const textXJudul2 = (canvas.width - textWidthJudul2) / 2;
  
  ctx.fillText(`${packname.toUpperCase()}`, textXJudul2, 150);
    
  ctx.font = '22px Verdana';
    
  ctx.fillText(`${data.produk}`, 65, 226); // Atur posisi teks produk
  ctx.fillText(`${data.tujuan}`, 65, 259);
  ctx.fillText(`${data.waktu}`, 65, 338); // Atur posisi teks waktu
  ctx.fillText(`${data.invoice}`, 65, 630); // Atur posisi teks invoice

  // Kanan - Nama
  const textWidthNama = ctx.measureText(data.nama).width;
  const textXNama = canvas.width - textWidthNama - 65;
  ctx.fillText(`${data.nama}`, textXNama, 787); // Atur posisi teks nama
    
  // Kanan - Refid
  const textWidthRefid = ctx.measureText(data.refid).width;
  const textXRefid = canvas.width - textWidthRefid - 65 
  ctx.fillText(`${data.refid}`, textXRefid, 836); // Atur posisi teks refid
    
    
  // Harga
  ctx.font = '35px Verdana'
  ctx.fillText(`${data.harga}`, 65, 495); // Atur posisi teks waktu
    
    
  ctx.font = '30px Roboto';
    
  const textWidthPesanAkhir = ctx.measureText(`Terima kasih atas kepercayaannya`).width;
  const textXPesanAkhir = (canvas.width - textWidthPesanAkhir) / 2;
  ctx.fillText(`Terima kasih atas kepercayaannya`, textXPesanAkhir, 964);  

  // Mengirim gambar sebagai hasilnya
  const buffer = canvas.toBuffer('image/jpeg');
  return buffer;
}

// Kirim Invoice Gambar
async function sendInvoiceImage(refId, client, m) {

  // Periksa apakah gambar lama ada
  const oldImagePath = `./src/transaksi/invoice/invoice_${refId}.jpeg`;
  if (fs.existsSync(oldImagePath)) {
    // Hapus gambar lama
    fs.unlinkSync(oldImagePath);
  }

  // Membaca data invoice dari file JSON
  let existingData = [];
  try {
    const jsonData = fs.readFileSync('./src/transaksi/invoice/invoice.json', 'utf8');
    existingData = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading invoice.json:', error);
  }

  // Mencari data invoice berdasarkan refId
  const invoiceData = existingData.find(data => data.refid === refId);
  if (!invoiceData) {
    return m.reply(`Maaf, invoice dengan Refid tersebut tidak ditemukan, silahkan di cek ulang Refid yang kamu input.`);
  }
    
  // Membuat gambar invoice
  const imageBuffer = await createInvoiceImage(invoiceData);

  // Simpan gambar sebagai file
  fs.writeFileSync(`./src/transaksi/invoice/invoice_${refId}.jpeg`, imageBuffer);

  // Kirim gambar sebagai balasan
  await client.sendMessage(m.chat, {image: {url: `./src/transaksi/invoice/invoice_${refId}.jpeg`}}, {quoted:m});
}

async function hapusinvoice(m) {
  const directory = './src/transaksi/invoice/';
  let filesDeleted = 0; // Variabel untuk menghitung jumlah file yang dihapus
  try {
    // Baca isi direktori
    const files = fs.readdirSync(directory);

    // Loop melalui setiap file
    for (const file of files) {
      // Hanya hapus file yang sesuai dengan format invoice_refid.png
      if (file.startsWith('invoice_') && file.endsWith('.jpeg')) {
        fs.unlinkSync(path.join(directory, file));
        filesDeleted++; // Tambahkan 1 ke jumlah file yang dihapus
        //console.log(`File ${file} berhasil dihapus.`);
      }
    }

    // Setelah selesai menghapus semua file, kirim pesan sukses hanya satu kali
    if (filesDeleted > 0) {
      m.reply("File image invoice yang menumpuk berhasil dihapus.")
    } else {
      m.reply("Tidak ada file image invoice yang ditemukan.")
    }
  } catch (error) {
    console.error('Error saat menghapus file invoice:', error);
  }
}


module.exports = { createInvoiceImage, saveTransactionData, sendInvoiceImage, hapusinvoice }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})    