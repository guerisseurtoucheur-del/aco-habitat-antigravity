const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
require('dotenv').config({ path: '.env.local' });

const config = {
  imap: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: { rejectUnauthorized: false }
  }
};

async function main() {
  const connection = await imaps.connect(config);
  await connection.openBox("INBOX");
  const searchCriteria = ["ALL"];
  const fetchOptions = { bodies: ["HEADER", "TEXT", ""], struct: true };
  
  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log("Total messages:", messages.length);
  
  // Get the last 3 messages
  const lastMessages = messages.slice(-3);
  for (let item of lastMessages) {
    const all = item.parts.find(part => part.which === "");
    if (all && all.body) {
      const mail = await simpleParser("Imap-Uid: " + item.attributes.uid + "\r\n" + all.body);
      console.log("----- SUBJECT:", mail.subject);
      console.log("TEXT:", mail.text ? mail.text.substring(0, 100) : "NONE");
      console.log("HTML:", mail.html ? mail.html.substring(0, 100) : "NONE");
      console.log("TEXT_AS_HTML:", mail.textAsHtml ? mail.textAsHtml.substring(0, 100) : "NONE");
    }
  }
  connection.end();
}

main().catch(console.error);
