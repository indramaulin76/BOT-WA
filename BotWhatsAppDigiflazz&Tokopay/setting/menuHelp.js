const chalk = require('chalk')
const fs = require('fs')


global.menuHelp = (pushname, prefix, hituet) =>{
	return `✦ *MENU TOPUP* ✦
> .menudigi
> .menustore`
};

global.menuFiturStore = (pushname, prefix, hituet) =>{
	return `✦ *FITUR STORE* ✦

✦ *Layanan Khusus Owner* ✦
> .backupbot
> .getfilelist
> .getfilesaldo
> .getfiletransaksi
> .restart 
> .getip 
> .ping 
> .ban 
> .unban
> .listban
> .listuser
> .block 
> .unblock

✦ *Layanan Owner Group* ✦
> .afk
> .kick 
> .add 
> .join
> .tagall
> .grup _open / close_
> .antilink on / off

✦ *Versi Teks* ✦
> .list
> .addlist
> .dellist
> .update
> .renamelist
> .resetlist
> .p
> .d`
};

global.menuDigiflazz = (pushname, prefix, hituet) =>{
	return `✦ *FITUR ORDER BIASA* ✦
> .digi
> .saldodigi
> .cek
> .cektransaksi

✦ *Menu Saldo* ✦
> .addsaldo
> .minsaldo
> .delsaldo
> .saldomember
> .setrole

✦ *Cek Profit* ✦
> .cekmargin
> .cekprofit
> .cekprofitall

✦ *Menu Invoice* ✦
> .setinvoice
> .cetakinvoice
> .hapusinvoice

✦ *Menu Set Keuntungan* ✦
> .setml
> .setmlmy
> .setff
> .setgi
> .setpb
> .setpubg
> .setvalo
> .sethok
> .setcod
> .sethsr

✦ *Menu Gambar* ✦
> .setmenu
> .setlogoinvoice`
};
   

 
    
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})    