const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const crypto = require('crypto');
const { Redis } = require('@upstash/redis');

require('dotenv').config({ path: '.env.local' });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const config = {
    imap: {
        user: 'aco.habitat.contact@gmail.com',
        password: 'qczwydyrhaypzydt',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000,
        tlsOptions: { rejectUnauthorized: false }
    }
};

async function run() {
    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');
        const messages = await connection.search(['ALL'], { bodies: ['HEADER', 'TEXT', ''] });
        
        // Take the last message
        const item = messages[messages.length - 1];
        if (!item) {
            console.log("No messages found");
            return;
        }

        const all = item.parts.find(part => part.which === "");
        const id = item.attributes.uid;
        const idHeader = "Imap-Uid: " + id + "\r\n";
        
        const mail = await simpleParser(idHeader + all.body);
        const text = mail.text || "";
        
        const newId = crypto.randomUUID();
        const lead = {
            id: newId,
            nom: mail.from.value[0].address,
            telephone: "0600000000",
            email: mail.from.value[0].address,
            ville: "Annecy",
            probleme: "Vrillettes / Sciure",
            texte_original: text,
            statut: 'NOUVEAU',
            date_creation: new Date().toISOString()
        };

        // Save to upstash
        let leads = await redis.get('leads') || [];
        leads.push(lead);
        await redis.set('leads', leads);

        console.log("✅ Lead forcé et sauvegardé dans Upstash Redis!");
        connection.end();
    } catch (err) {
        console.error(err);
    }
}
run();
