require("http")
    .createServer((_, res) => res.end("Hello Owner."))
    .listen(0000);

require('./setting/config')
require('./setting/mechaine')
const donet = "https://kitabisa.com";
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    jidNormalizedUser,
    proto,
    getContentType,
    getAggregateVotesInPollMessage
} = require("baileys");


const {
    makeInMemoryStore
} = require("@rodrigogs/baileys-store");
const qrcode = require('qrcode-terminal');

const pino = require("pino");
const {
    Boom
} = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const figlet = require("figlet");
const _ = require("lodash");
const PhoneNumber = require("awesome-phonenumber");
const path = require("path");
const FileType = require("file-type");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");
const readline = require("readline");
const {
    tmpdir
} = require("os");
const Crypto = require("crypto");
const {
    createCanvas,
    loadImage
} = require('canvas');

// Cache untuk groupMetadata, biar nggak fetch ulang terus-terusan
const groupMetadataCache = new Map();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 menit dalam milidetik

// Fitur Grub
let set_welcome_db = JSON.parse(fs.readFileSync('./src/grub/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./src/grub/set_left.json'));
let set_open = JSON.parse(fs.readFileSync('./src/grub/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./src/grub/set_close.json'));
let _welcome = JSON.parse(fs.readFileSync('./src/grub/welcome.json'));
let _left = JSON.parse(fs.readFileSync('./src/grub/left.json'));
let sewa = JSON.parse(fs.readFileSync('./src/grub/sewa.json'));
const {
    isSetLeft,
    getTextSetLeft,
    isSetWelcome,
    getTextSetWelcome
} = require("./lib/store")
const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid
} = require('./lib/exif')

const store = makeInMemoryStore({
    logger: pino().child({
        level: "silent",
        stream: "store"
    }),
});
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

// Handle Message Baru
async function smsg(conn, m, store) {
    if (!m) return m;
    let M = proto.WebMessageInfo;

    // Inisialisasi jidMap dan groupMetadata
    let jidMap = new Map();
    let groupMetadata = {};

    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith("@g.us");

        // Tentukan sender berdasarkan konteks dengan prioritas JID
        if (m.isGroup) {
            m.sender = conn.decodeJid(
                m.key.participant && m.key.participant.includes('@s.whatsapp.net') ? m.key.participant :
                m.key.participantPn && m.key.participantPn.includes('@s.whatsapp.net') ? m.key.participantPn :
                m.key.participantLid && m.key.participantLid.includes('@lid') ? conn.decodeJid(m.key.participantLid) :
                null
            );
            if (!m.sender) {
                console.log(`smsg - Log 1\nMengabaikan pesan grup tanpa participantPn valid: ${JSON.stringify(m.key, null, 3)}`);
                return null; // Kembalikan null jika tidak ada JID valid
            }
        } else {
            // Untuk private chat, gunakan senderPn jika remoteJid adalah @lid
            m.sender = conn.decodeJid(
                m.key.remoteJid.includes('@lid') && m.key.senderPn && m.key.senderPn.includes('@s.whatsapp.net') ? m.key.senderPn :
                m.key.remoteJid
            );
        }

        // Fallback untuk pushName
        m.pushName = m.pushName || (await conn.getName(m.sender)) || m.sender.split('@')[0] || 'Unknown';

        // Normalkan sender untuk grup LID
        if (m.isGroup) {
            try {
                const cacheKey = m.chat; // Key cache berdasarkan group ID
                let cachedMetadata = groupMetadataCache.get(cacheKey);

                // Cek kalau cache ada dan belum expired
                if (cachedMetadata && (Date.now() - cachedMetadata.timestamp < CACHE_TIMEOUT)) {
                    groupMetadata = cachedMetadata.data;
                } else {
                    // Fetch baru kalau cache kosong atau expired
                    groupMetadata = await conn.groupMetadata(m.chat);
                    // Simpan ke cache dengan timestamp
                    groupMetadataCache.set(cacheKey, {
                        data: groupMetadata,
                        timestamp: Date.now()
                    });
                }

                (groupMetadata.participants || []).forEach(p => {
                    if (p.jid && p.id) jidMap.set(p.id, p.jid); // Map LID ke JID
                });
            } catch (err) {
                console.error('Error fetching groupMetadata:', err);
                // Tambahin handling: kalau error rate limit, coba delay dan retry sekali
                if (err.message.includes('rate-overlimit')) {
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Delay 5 detik
                    try {
                        groupMetadata = await conn.groupMetadata(m.chat);
                    } catch (retryErr) {
                        console.error('Retry failed:', retryErr);
                    }
                }
            }
            m.sender = jidMap.get(m.sender) || m.key.participantPn || m.sender;
            m.participant = jidMap.get(m.key.participant) || m.key.participantPn || m.key.participant || '';
        }
    }

    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg =
            m.mtype == "viewOnceMessage" ?
            m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] :
            m.message[m.mtype];

        // Perbaikan untuk m.body
        m.body =
            m.message.conversation ||
            (m.msg && typeof m.msg === 'object' && 'caption' in m.msg ? m.msg.caption : '') ||
            (m.msg && typeof m.msg === 'object' && 'text' in m.msg ? m.msg.text : '') ||
            (m.mtype === "listResponseMessage" && m.msg?.singleSelectReply?.selectedRowId) ||
            (m.mtype === "buttonsResponseMessage" && m.msg?.selectedButtonId) ||
            (m.mtype === "viewOnceMessage" && m.msg && 'caption' in m.msg ? m.msg.caption : '') ||
            m.text ||
            '';

        // Perbaikan untuk m.quoted
        let quoted = null;
        if (m.msg && typeof m.msg === 'object' && 'contextInfo' in m.msg && m.msg.contextInfo) {
            quoted = m.msg.contextInfo.quotedMessage ? m.msg.contextInfo.quotedMessage : null;
        }
        m.quoted = quoted;
        m.mentionedJid = m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid ? m.msg.contextInfo.mentionedJid : [];

        // Normalkan mentionedJid untuk grup
        if (m.isGroup && m.mentionedJid.length > 0) {
            m.mentionedJid = m.quoted && m.quoted.mentedJid ? m.quoted.mentionedJid.map(jid => jidMap.get(jid) || jid) : m.mentionedJid.map(jid => jidMap.get(jid) || jid);
        }

        if (m.quoted) {
            let type = getContentType(m.quoted);
            if (!type) {
                console.log('Invalid quoted message type, setting m.quoted to null:', JSON.stringify(m.quoted, null, 2));
                m.quoted = null;
            } else {
                m.quoted = m.quoted[type];
                if (["productMessage"].includes(type)) {
                    type = getContentType(m.quoted);
                    m.quoted = m.quoted[type];
                }
                if (typeof m.quoted === "string" || !m.quoted) {
                    m.quoted = {
                        conversation: m.quoted || ''
                    };
                }
                m.quoted.mtype = type || 'conversation';
                m.quoted.id = m.msg.contextInfo.stanzaId;
                m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
                m.quoted.isBaileys = m.quoted.id ?
                    m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16 :
                    false;
                let quotedSender = conn.decodeJid(m.msg.contextInfo?.participant || '');
                m.quoted.sender = m.isGroup ? (jidMap.get(quotedSender) || m.key.participantPn || quotedSender) : quotedSender || m.sender;
                m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
                m.quoted.text =
                    m.quoted.text ||
                    m.quoted.caption ||
                    m.quoted.conversation ||
                    m.quoted.contentText ||
                    m.quoted.selectedDisplayText ||
                    m.quoted.title ||
                    "";
                m.quoted.mentionedJid = m.msg.contextInfo && m.msg.contextInfo.mentionedJid ? m.msg.contextInfo.mentionedJid : [];
                m.quoted.mentionedJid = m.quoted.mentionedJid.map(jid => jidMap.get(jid) || jid);

                m.getQuotedObj = m.getQuotedMessage = async () => {
                    if (!m.quoted.id) return false;
                    let q = await store.loadMessage(m.chat, m.quoted.id, conn);
                    return smsg(conn, q, store);
                };

                if (!m.quoted.id || !m.quoted.chat || !m.quoted.sender) {
                    console.log('Incomplete quoted message data, setting m.quoted to null:', JSON.stringify(m.quoted, null, 2));
                    m.quoted = null;
                } else {
                    try {
                        let vM = (m.quoted.fakeObj = M.fromObject({
                            key: {
                                remoteJid: m.quoted.chat,
                                fromMe: m.quoted.fromMe,
                                id: m.quoted.id,
                            },
                            message: {
                                [m.quoted.mtype]: m.quoted
                            },
                            ...(m.isGroup ? {
                                participant: m.quoted.sender
                            } : {}),
                        }));

                        m.quoted.delete = () => conn.sendMessage(m.quoted.chat, {
                            delete: vM.key
                        });
                        m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
                            conn.copyNForward(jid, vM, forceForward, options);
                        m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
                    } catch (err) {
                        console.error('Error creating fakeObj for quoted message:', err);
                        m.quoted = null;
                    }
                }
            }
        }
    }

    if (m.msg && m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg);
    m.text =
        m.msg && (m.msg.text ||
            m.msg.caption ||
            m.message.conversation ||
            m.msg.contentText ||
            m.msg.selectedDisplayText ||
            m.msg.title ||
            "");

    m.reply = (text, chatId = m.chat, options = {}) =>
        Buffer.isBuffer(text) ?
        conn.sendMedia(chatId, text, "file", "", m, {
            ...options
        }) :
        conn.sendText(chatId, text, m, {
            ...options
        });

    m.copy = () => smsg(conn, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
        conn.copyNForward(jid, m, forceForward, options);

    // Tambahkan isBotAdmins dan isAdmins
    const botNumber = conn.decodeJid(conn.user.id);
    const groupAdmins = m.isGroup ?
        (groupMetadata.participants || [])
        .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
        .map(p => p.jid || p.id) : [];
    m.isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    m.isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;

    return m;
}

async function startBgrl() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(`./${session}`)
/*
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion();
    
    console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
*/
    // Baca versi dari file JSON
    let waVersion;
    const versionPath = './src/version/version.json';
    try {
        const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
        waVersion = versionData.version;
        if (!Array.isArray(waVersion) || waVersion.length !== 3) {
            throw new Error('Format versi tidak valid');
        }
        console.log(`Menggunakan versi WA manual dari JSON: ${waVersion.join('.')}`);
    } catch (error) {
        console.error(`Error membaca ${versionPath}:`, error);
        waVersion = [2, 3000, 1028442591]; // Fallback ke default kalau error
        console.log(`Fallback ke versi default: ${waVersion.join('.')}`);
    }
    
    console.log(
        color(
            figlet.textSync("BGRL", {
                font: "Standard",
                horizontalLayout: "default",
                vertivalLayout: "default",
                whitespaceBreak: false,
            }),
            "cyan"
        )
    );

    const client = makeWASocket({
        logger: pino({
            level: "silent"
        }),
        version: waVersion,
        auth: state,
        browser: [ "Chrome", "Windows", "124.0.6367.207" ],
        defaultQueryTimeoutMs: 60000,
        syncFullHistory: false,
        online: true,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 30000,
        qrTimeout: 60000,
        retryRequestDelayMs: 1000 + Math.floor(Math.random() * 2000), // delay random
        generateHighQualityLinkPreview: false,
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id);
                return msg?.message || undefined;
            }
            return {
                conversation: "",
            };
        },
        patchMessageBeforeSending: async (msg, recipientJids) => {
            await client.uploadPreKeysToServerIfRequired();
            return msg;
        },
    });

client.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
        return jidNormalizedUser(jid)
    }
    return jid
}

    const processedMessages = new Map();

client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
        if (chatUpdate.type !== "notify") return;

        const mek = chatUpdate.messages?.[0];
        if (!mek || !mek.message) return;
        if (mek.key.fromMe) return;
        if (mek.key.remoteJid === "status@broadcast") return;

        // 🔽 TAMBAHKAN INI
        if (mek.key.remoteJid.endsWith('@g.us')) {
            console.log('GROUP ID:', mek.key.remoteJid);
        }

        const uniqueKey = mek.key.id;
        if (processedMessages.has(uniqueKey)) return;
        processedMessages.set(uniqueKey, Date.now());

        setTimeout(() => {
            processedMessages.delete(uniqueKey);
        }, 5 * 60 * 1000);

        mek.message = Object.keys(mek.message)[0] === "ephemeralMessage"
            ? mek.message.ephemeralMessage.message
            : mek.message;

        const m = await smsg(client, mek, store);
        if (!m) return;

        require("./setting/mechaine")(
            client,
            m,
            chatUpdate,
            store,
            set_welcome_db,
            set_left_db,
            set_open,
            set_close,
            sewa,
            _welcome,
            _left
        );
    } catch (err) {
        console.error("Error di messages.upsert:", err);
    }
});

    // Bersihkan cache berdasarkan umur
    setInterval(() => {
        const currentTime = Date.now();
        for (let [key, time] of processedMessages) {
            if (currentTime - time >= 60 * 60 * 1000) { // Hapus jika lebih dari 1 jam
                processedMessages.delete(key);
            }
        }
        //console.log('Cache processedMessages dibersihkan setelah 1 jam');
    }, 60 * 60 * 1000);

    client.ev.on('messages.update', async chatUpdate => {
        for (const {
                key,
                update
            }
            of chatUpdate) {
            if (update.pollUpdates && key.fromMe) {
                const pollCreation = await getMessage(key)
                if (pollCreation) {
                    const pollUpdate = await getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                    var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
                    if (toCmd == undefined) return
                    var prefCmd = prefix + toCmd
                    client.appenTextMessage(prefCmd, chatUpdate)
                }
            }
        }
    })

    client.ev.on("group-participants.update", async (anu) => {
        console.log(anu);
        const isWelcome = _welcome.includes(anu.id)
        const isLeft = _left.includes(anu.id)

        try {
            let metadata;
            const cacheKey = anu.id;
            let cachedMetadata = groupMetadataCache.get(cacheKey);

            if (cachedMetadata && (Date.now() - cachedMetadata.timestamp < CACHE_TIMEOUT)) {
                metadata = cachedMetadata.data;
            } else {
                metadata = await client.groupMetadata(anu.id);
                groupMetadataCache.set(cacheKey, {
                    data: metadata,
                    timestamp: Date.now()
                });
            }
            let participants = anu.participants
            const groupName = metadata.subject
            const groupDesc = metadata.desc

            for (let num of participants) {
                try {
                    ppuser = await client.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://iili.io/FFlWDoG.jpg'
                }

                try {
                    ppgroup = await client.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://iili.io/FFlWDoG.jpg'
                }
                if (anu.action == 'add' && (isWelcome)) {
                    //console.log(metadata)
                    if (isSetWelcome(anu.id, set_welcome_db)) {
                        var get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db)
                        var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                        client.sendMessage(anu.id, {
                            image: {
                                url: ppuser
                            },
                            mentions: [num],
                            caption: `${full_pesan}`
                        })
                    } else {
                        client.sendMessage(anu.id, {
                            image: {
                                url: ppuser
                            },
                            mentions: [num],
                            caption: `*Welcome Kak @${num.split("@")[0]} Di Group ${metadata.subject}* 

${metadata.desc}`
                        })
                    }
                } else if (anu.action == 'remove' && (isLeft)) {
                    //console.log(anu)
                    if (isSetLeft(anu.id, set_left_db)) {
                        var get_teks_left = await getTextSetLeft(anu.id, set_left_db)
                        var replace_pesan = (get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                        client.sendMessage(anu.id, {
                            image: {
                                url: ppuser
                            },
                            mentions: [num],
                            text: `${full_pesan}`
                        })
                    } else {
                        client.sendMessage(anu.id, {
                            image: {
                                url: ppuser
                            },
                            mentions: [num],
                            caption: `Bye Kak 👋
                       	
*"Karna Setiap Ucapan Selamat Datang Akan Selalu Diakhiri Dengan Ucapan Selamat Tinggal"*

Terima Kasih Kak @${num.split("@")[0]} Sampai Bertemu Kembali Di Group ${metadata.subject}`
                        })
                    }
                } else if (anu.action == 'promote') {
                    client.sendMessage(anu.id, {
                        image: {
                            url: ppuser
                        },
                        mentions: [num],
                        caption: `@${num.split('@')[0]} sekaran menjadi admin grup ${metadata.subject}`
                    })
                } else if (anu.action == 'demote') {
                    client.sendMessage(anu.id, {
                        image: {
                            url: ppuser
                        },
                        mentions: [num],
                        caption: `@${num.split('@')[0]} bukan admin grup ${metadata.subject} lagi`
                    })
                }
            }
        } catch (err) {
            console.log(err);
            if (err.message.includes('rate-overlimit')) {
                console.log('Rate limit detected in group update, delaying...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });

    // === FIX MEMORY LEAK & WARNING MaxListenersExceededWarning ===
    if (!global.listenersFixed) {
        global.listenersFixed = true;
        process.setMaxListeners(0); // Unlimited listener, aman!

        process.on('unhandledRejection', (reason) => {
            console.error('Unhandled Rejection:', reason?.stack || reason);
        });

        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err?.stack || err);
        });
    }

    // Setting
    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (
                (decode.user && decode.server && decode.user + "@" + decode.server) ||
                jid
            );
        } else return jid;
    };

    client.ev.on("contacts.update", (update) => {
        for (let contact of update) {
            let id = client.decodeJid(contact.id);
            if (store && store.contacts)
                store.contacts[id] = {
                    id,
                    name: contact.notify
                };
        }
    });

    client.getName = async (jid, withoutContact = false) => {
        const id = client.decodeJid(jid);
        withoutContact = client.withoutContact || withoutContact;

        let v;

        if (id.endsWith("@g.us")) {
            return new Promise(async (resolve) => {
                v = store.contacts[id] || {};
                if (!(v.name || v.subject)) v = await client.groupMetadata(id) || {};
                resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
            });
        } else {
            v = id === "0@s.whatsapp.net" ? {
                    id,
                    name: "WhatsApp"
                } :
                id === client.decodeJid(client.user.id) ?
                client.user :
                store.contacts[id] || {};
        }

        const name = (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");

        return name && isNaN(name) ? name : "-";
    };

    client.setStatus = (status) => {
        client.query({
            tag: "iq",
            attrs: {
                to: "@s.whatsapp.net",
                type: "set",
                xmlns: "status",
            },
            content: [{
                tag: "status",
                attrs: {},
                content: Buffer.from(status, "utf-8"),
            }, ],
        });
        return status;
    };

    client.sendContact = async (jid, kon, quoted = "", opts = {}) => {
        const contacts = await Promise.all(kon.map(async (i) => ({
            displayName: await client.getName(i + "@s.whatsapp.net"),
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await client.getName(i + "@s.whatsapp.net")}\nFN:${await client.getName(i + "@s.whatsapp.net")}\nitem1.TEL;waid=${i}:${i}\nEND:VCARD`,
        })));

        client.sendMessage(jid, {
            contacts: {
                displayName: `${kon.length} Kontak`,
                contacts
            },
            ...opts
        }, {
            quoted
        });
    };

    client.public = true;

client.serializeM = (m) => smsg(client, m, store);

let autoGroupLoaded = false;

client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    // Handle QR Code
    if (qr) {
        console.log(
            color(
                "Scan QR berikut untuk mengautentikasi bot Anda:",
                "yellow"
            )
        );
        qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

        switch (reason) {
            case DisconnectReason.badSession:
                console.log(chalk.red('Bad Session File, Please Delete Session and Scan Again'));
                break;
            case DisconnectReason.connectionClosed:
                console.log(chalk.yellow('Connection closed by server'));
                break;
            case DisconnectReason.connectionLost:
                console.log(chalk.yellow('Connection lost from server'));
                break;
            case DisconnectReason.connectionReplaced:
                console.log(chalk.red('Connection replaced, another session opened.'));
                break;
            case DisconnectReason.loggedOut:
                console.log(chalk.red.bold('Device Logged Out, ') +
                    chalk.yellow(`Delete session folder ${session}`));
                break;
            case DisconnectReason.restartRequired:
                console.log(chalk.yellow('Restart required by WhatsApp'));
                break;
            case DisconnectReason.timedOut:
                console.log(chalk.yellow('Connection timed out'));
                break;
            default:
                console.log(chalk.red(`Unknown DisconnectReason: ${reason}`));
                break;
        }

        console.log(chalk.cyan('Exiting process to avoid duplicate listeners...'));
        process.exit(0);

    } else if (connection === "open") {

        const userInfo = {
            id: client.user.id,
            name: client.user.name,
            lid: client.user.lid
        };

        console.log(chalk.yellow(`${packname} connected to:`) + chalk.cyan(` ${userInfo.id}`));
        console.log(chalk.yellow(`${packname} version:`) + chalk.cyan(` ${versionscript}`));
        console.log(chalk.yellow(`${packname} ipv4 server:`) + chalk.cyan(` ${ipserver}`));
        console.log(chalk.yellow(`Type .help to display the menu.`));

        if (!autoGroupLoaded) {
            autoGroupLoaded = true;
            require('./src/grub/autogroup')(client);
        }
    }
});

    client.ev.on("creds.update", saveCreds);

    client.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await client.relayMessage(jid, waMessage.message, {
            messageId: waMessage.key.id
        })
        return waMessage
    }

    client.sendPoll = (jid, name = '', values = [], selectableCount = 1) => {
        return client.sendMessage(jid, {
            poll: {
                name,
                values,
                selectableCount
            }
        })
    }
    client.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype ?
            message.mtype.replace(/Message/gi, "") :
            mime.split("/")[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        /**
         *
         * @param {*} jid
         * @param {*} path
         * @param {*} quoted
         * @param {*} options
         * @returns
         */
        client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ?
                path :
                /^data:.*?\/.*?;base64,/i.test(path) ?
                Buffer.from(path.split`,` [1], "base64") :
                /^https?:\/\//.test(path) ?
                await await getBuffer(path) :
                fs.existsSync(path) ?
                fs.readFileSync(path) :
                Buffer.alloc(0);
            let buffer;
            if (options && (options.packname || options.author)) {
                buffer = await writeExifImg(buff, options);
            } else {
                buffer = await imageToWebp(buff);
            }

            await client.sendMessage(
                jid, {
                    sticker: {
                        url: buffer
                    },
                    ...options
                }, {
                    quoted
                }
            );
            return buffer;
        };

        /**
         *
         * @param {*} jid
         * @param {*} path
         * @param {*} quoted
         * @param {*} options
         * @returns
         */
        client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ?
                path :
                /^data:.*?\/.*?;base64,/i.test(path) ?
                Buffer.from(path.split`,` [1], "base64") :
                /^https?:\/\//.test(path) ?
                await await getBuffer(path) :
                fs.existsSync(path) ?
                fs.readFileSync(path) :
                Buffer.alloc(0);
            let buffer;
            if (options && (options.packname || options.author)) {
                buffer = await writeExifVid(buff, options);
            } else {
                buffer = await videoToWebp(buff);
            }

            await client.sendMessage(
                jid, {
                    sticker: {
                        url: buffer
                    },
                    ...options
                }, {
                    quoted
                }
            );
            return buffer;
        };

        return buffer;
    };

    client.downloadAndSaveMediaMessage = async (
        message,
        filename,
        attachExtension = true
    ) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype ?
            message.mtype.replace(/Message/gi, "") :
            mime.split("/")[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        trueFileName = attachExtension ? filename + "." + type.ext : filename;
        // save to file
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };

    client.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = "";
        let res = await axios.head(url);
        mime = res.headers["content-type"];
        if (mime.split("/")[1] === "gif") {
            return client.sendMessage(
                jid, {
                    video: await getBuffer(url),
                    caption: caption,
                    gifPlayback: true,
                    ...options,
                }, {
                    quoted: quoted,
                    ...options
                }
            );
        }
        let type = mime.split("/")[0] + "Message";
        if (mime === "application/pdf") {
            return client.sendMessage(
                jid, {
                    document: await getBuffer(url),
                    mimetype: "application/pdf",
                    caption: caption,
                    ...options,
                }, {
                    quoted: quoted,
                    ...options
                }
            );
        }
        if (mime.split("/")[0] === "image") {
            return client.sendMessage(
                jid, {
                    image: await getBuffer(url),
                    caption: caption,
                    ...options
                }, {
                    quoted: quoted,
                    ...options
                }
            );
        }
        if (mime.split("/")[0] === "video") {
            return client.sendMessage(
                jid, {
                    video: await getBuffer(url),
                    caption: caption,
                    mimetype: "video/mp4",
                    ...options,
                }, {
                    quoted: quoted,
                    ...options
                }
            );
        }
        if (mime.split("/")[0] === "audio") {
            return client.sendMessage(
                jid, {
                    audio: await getBuffer(url),
                    caption: caption,
                    mimetype: "audio/mpeg",
                    ...options,
                }, {
                    quoted: quoted,
                    ...options
                }
            );
        }
    };

    client.sendButtonText = (
        jid,
        butt = [],
        text,
        quot,
    ) => {
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            businessMessageForwardInfo: {
                                businessOwnerJid: client.decodeJid(client.user.id)
                            },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: text
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: butt,
                        })
                    })
                }
            }
        }, {
            quoted: quot
        })

        client.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        })
    };
    const getBuffer = async (url, options) => {
        try {
            options ? options : {};
            const res = await axios({
                method: "get",
                url,
                headers: {
                    DNT: 1,
                    "Upgrade-Insecure-Request": 1,
                },
                ...options,
                responseType: "arraybuffer",
            });
            return res.data;
        } catch (err) {
            return err;
        }
    };

    client.sendImage = async (jid, path, caption = "", quoted = "", options) => {
        let buffer = Buffer.isBuffer(path) ?
            path :
            /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`,` [1], "base64") :
            /^https?:\/\//.test(path) ?
            await await getBuffer(path) :
            fs.existsSync(path) ?
            fs.readFileSync(path) :
            Buffer.alloc(0);
        return await client.sendMessage(
            jid, {
                image: buffer,
                caption: caption,
                ...options
            }, {
                quoted
            }
        );
    };

    client.sendText = (jid, text, quoted = "", options) =>
        client.sendMessage(jid, {
            text: text,
            ...options
        }, {
            quoted
        });

    client.sendTextWithMentions = async (jid, text, quoted, options = {}) => client.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })

    client.cMod = (
        jid,
        copy,
        text = "",
        sender = client.user.id,
        options = {}
    ) => {
        //let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0];
        let isEphemeral = mtype === "ephemeralMessage";
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
        }
        let msg = isEphemeral ?
            copy.message.ephemeralMessage.message :
            copy.message;
        let content = msg[mtype];
        if (typeof content === "string") msg[mtype] = text || content;
        else if (content.caption) content.caption = text || content.caption;
        else if (content.text) content.text = text || content.text;
        if (typeof content !== "string")
            msg[mtype] = {
                ...content,
                ...options,
            };
        if (copy.key.participant)
            sender = copy.key.participant = sender || copy.key.participant;
        else if (copy.key.participant)
            sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes("@s.whatsapp.net"))
            sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes("@broadcast"))
            sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        copy.key.fromMe = sender === client.user.id;

        return proto.WebMessageInfo.fromObject(copy);
    };

    return client;
}

startBgrl();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});