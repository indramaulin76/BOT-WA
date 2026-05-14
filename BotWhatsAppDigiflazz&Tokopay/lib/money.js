const fs = require('fs');

// Fungsi untuk membersihkan nomor telepon
const cleanNumber = (number) => {
  // Hapus karakter Unicode tersembunyi (LTR/RTL markers)
  let cleaned = number.replace(/[\u200E\u200F\u202A-\u202E]/g, '');
  // Pastikan formatnya konsisten dengan @s.whatsapp.net
  if (!cleaned.endsWith('@s.whatsapp.net')) {
    cleaned = cleaned.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  }
  return cleaned;
};

const addMoney = (sender, amount) => {
  const balanceFilePath = './src/balance.json';
  const cleanSender = cleanNumber(sender);

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => cleanNumber(user.id) === cleanSender);

    if (position === -1) {
      money.push({ id: cleanSender, role: "Bronze", money: 0 });
      position = money.length - 1;
    }

    if (money[position].money === null) {
      money[position].money = 0;
    }

    money[position].money += amount;

    fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    return true;
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return false;
  }
};

const refundMoney = (sender, amount) => {
  addMoney(sender, amount);
};

const moneyAdd = (sender, amount) => {
  const balanceFilePath = './src/balance.json';
  const cleanSender = cleanNumber(sender);

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => cleanNumber(user.id) === cleanSender);

    if (position !== -1) {
      // Inisialisasi money ke 0 jika null
      if (money[position].money === null) {
        money[position].money = 0;
      }

      const newBalance = money[position].money - amount;

      // Jika pengurangan saldo tidak diinginkan, beri peringatan
      if (newBalance < 0) {
        console.warn(`Saldo pengguna ${cleanSender} akan menjadi negatif.`);
      }

      money[position].money -= amount;

      // Tulis kembali data
      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    }
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
  }
};

const subtractMoney = (sender, amount) => {
  const balanceFilePath = './src/balance.json';
  const cleanSender = cleanNumber(sender);

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => cleanNumber(user.id) === cleanSender);

    if (position !== -1) {
      if (money[position].money === null) {
        money[position].money = 0;
      }

      const newBalance = money[position].money - amount;

      if (newBalance < 0) {
        console.warn(`Saldo pengguna ${cleanSender} akan menjadi negatif.`);
      }

      money[position].money -= amount;

      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
      return true;
    } else {
      console.log(`Pengguna ${cleanSender} tidak ditemukan.`);
      return false;
    }
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return false;
  }
};

const resetMoney = (sender) => {
  const balanceFilePath = './src/balance.json';
  const cleanSender = cleanNumber(sender);

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => cleanNumber(user.id) === cleanSender);

    if (position !== -1) {
      money[position].money = 0;

      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
      return true;
    } else {
      console.log(`Pengguna ${cleanSender} tidak ditemukan.`);
      return false;
    }
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return false;
  }
};

const getMonUser = (sender) => {
  const balanceFilePath = './src/balance.json';
  const cleanSender = cleanNumber(sender);

  try {
    const money = JSON.parse(fs.readFileSync(balanceFilePath));
    const user = money.find(obj => cleanNumber(obj.id) === cleanSender);

    return user ? (user.money === null ? 0 : user.money) : 0;
  } catch (error) {
    console.log(`Error reading balance file: ${error}`);
    return 0;
  }
};

const getRoleUser = (sender) => {
  const balanceFilePath = './src/balance.json';
  const cleanSender = cleanNumber(sender);

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let user = money.find((obj) => cleanNumber(obj.id) === cleanSender);

    if (!user) {
      user = { id: cleanSender, role: "Bronze", money: 0 };
      money.push(user);
      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    } else {
      if (!user.role) {
        user.role = "Bronze";
      }
      if (user.money === null) {
        user.money = 0;
      }
      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    }

    return user.role;
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return "Bronze";
  }
};

function catatRiwayatTransaksi(userNumber, productName, transactionTime, price, keuntungan, status, invoiceNumber) {
  const fs = require('fs');
  const riwayatPath = './src/transaksi/riwayatTransaksiUser.json';
  const cleanUserNumber = cleanNumber(userNumber);

  const bulanTeks = new Date().toLocaleString('id-ID', { month: 'long' });
  const tahunNumerik = new Date().getFullYear();

  let riwayatTransaksi = [];
  try {
    const data = fs.readFileSync(riwayatPath);
    riwayatTransaksi = JSON.parse(data);
  } catch (err) {
    console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
  }

  const transaksiBaru = {
    userNumber: cleanUserNumber.split("@")[0],
    productName,
    transactionTime,
    price,
    keuntungan,
    status,
    invoiceNumber,
    month: bulanTeks,
    year: tahunNumerik,
  };

  riwayatTransaksi.push(transaksiBaru);

  try {
    fs.writeFileSync(riwayatPath, JSON.stringify(riwayatTransaksi, null, 3));
    console.log('Riwayat transaksi berhasil ditambahkan.');
  } catch (err) {
    console.error('Error writing riwayatTransaksiUser.json:', err);
  }
}

module.exports = {
  addMoney,
  refundMoney,
  moneyAdd,
  subtractMoney,
  resetMoney,
  getMonUser,
  getRoleUser,
  catatRiwayatTransaksi,
  cleanNumber
};