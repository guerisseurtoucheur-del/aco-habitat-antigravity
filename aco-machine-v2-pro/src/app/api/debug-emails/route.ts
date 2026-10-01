import { NextResponse } from "next/server";
import imaps from "imap-simple";
import { simpleParser } from "mailparser";

export const runtime = 'nodejs';

export async function GET() {
  const config = {
    imap: {
      user: process.env.EMAIL_USER!,
      password: process.env.EMAIL_PASSWORD!,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      authTimeout: 3000,
      tlsOptions: { rejectUnauthorized: false }
    }
  };

  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");
    
    // Fetch last 10 messages regardless of SEEN status
    const searchCriteria = ["ALL"];
    const fetchOptions = { bodies: ["HEADER"], struct: true };
    const messages = await connection.search(searchCriteria, fetchOptions);
    
    // Sort by sequence number descending (newest first)
    messages.sort((a, b) => b.seqNo - a.seqNo);
    const last5 = messages.slice(0, 5);
    
    const results = last5.map(item => {
      const header = item.parts.find(part => part.which === "HEADER");
      let subject = "No Subject";
      if (header && header.body && header.body.subject) {
        subject = header.body.subject[0];
      }
      return {
        seqNo: item.seqNo,
        uid: item.attributes.uid,
        date: item.attributes.date,
        flags: item.attributes.flags,
        subject: subject
      };
    });
    
    connection.end();
    return NextResponse.json({ success: true, count: messages.length, last5: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
