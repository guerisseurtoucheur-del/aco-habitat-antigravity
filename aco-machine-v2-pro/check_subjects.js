const imaps = require('imap-simple');

require('dotenv').config({ path: '.env.local' });

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
        const messages = await connection.search(['UNSEEN'], { bodies: ['HEADER'], markSeen: false });
        
        console.log(`Found ${messages.length} UNSEEN messages.`);
        messages.forEach(item => {
            const header = item.parts.find(p => p.which === 'HEADER');
            console.log("UNSEEN Subject:", header.body.subject[0]);
        });
        connection.end();
    } catch (err) {
        console.error(err);
    }
}
run();
