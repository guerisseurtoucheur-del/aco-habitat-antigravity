import { NextResponse } from "next/server";
import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import { db } from "@/lib/db";
import crypto from "crypto";
import { extraireInfosLead } from "@/lib/ai";

export async function GET(req: Request) {
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
    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: ["HEADER", "TEXT", ""], markSeen: true };
    const messages = await connection.search(searchCriteria, fetchOptions);
    let leadsTraites = 0;

    for (let item of messages) {
      const all = item.parts.find((part: any) => part.which === "");
      if (all && all.body) {
          const mail = await simpleParser("Imap-Uid: " + item.attributes.uid + "\r\n" + all.body);
          const subject = mail.subject || "";
          const text = mail.text || mail.html || mail.textAsHtml || "";

          if (subject.toLowerCase().includes("vert") || text.toLowerCase().includes("vert")) {
              console.log(`🟢 Ignoré : ${subject}`);
              continue;
          }

          if (subject.toLowerCase().includes("rouge") || subject.toLowerCase().includes("lead") || subject.toLowerCase().includes("contact")) {
              console.log(`🔴 Lead détecté : ${subject}`);
              
              // 1. Extraction IA ultra-rapide (Pas de timeout Vercel)
              const infos = await extraireInfosLead(`Sujet: ${subject}\n\nCorps: ${text}`);
              if (infos.nom === "Client Inconnu") {
                if (!infos.probleme || !infos.probleme.startsWith("ERREUR IA:")) {
                  infos.probleme = "TEXTE REÇU:\n" + text.substring(0, 1000);
                }
              }
              const newId = crypto.randomUUID();
              
              // 2. Sauvegarde BD
              const codePostalMatches = infos.adresse ? infos.adresse.match(/\d{5}/) : null;
              const codePostal = codePostalMatches ? codePostalMatches[0] : "";

              await db.save({
                  id: newId,
                  nom: infos.nom,
                  telephone: infos.telephone,
                  email: (infos.email_client && infos.email_client !== "Inconnu") ? infos.email_client : (mail.from?.value[0]?.address || "inconnu"),
                  adresse: infos.adresse || "Inconnue",
                  ville: infos.ville,
                  probleme: infos.probleme,
                  texte_original: text,
                  statut: 'NOUVEAU',
                  date_creation: new Date().toISOString()
              });

              // 3. Délégation asynchrone à la route unifiée (Évite le Timeout Vercel de 10s)
              if (infos.ville !== "Inconnue") {
                const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
                
                fetch(`${baseUrl}/api/recrutement`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ 
                    leadId: newId, 
                    ville: infos.ville, 
                    codePostal, 
                    probleme: infos.probleme 
                  })
                }).catch(err => console.error("Erreur appel /api/recrutement:", err));
                
                console.log(`🚀 Appel /api/recrutement délégué en arrière-plan pour ${infos.ville}`);
              }
              leadsTraites++;
          }
      }
    }
    connection.end();
    return NextResponse.json({ success: true, leadsTraites });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
