import nodemailer from "nodemailer";

export async function sendLeadEmail(session: any, reportUrl: string) {
  // Configurer le transporteur Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // L'adresse Gmail qui envoie (ex: contact.aco.habitat@gmail.com)
      pass: process.env.GMAIL_APP_PASSWORD, // Le mot de passe d'application généré
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.LEAD_EMAIL_RECIPIENT || process.env.GMAIL_USER, // L'adresse qui reçoit (la tienne)
    subject: `🚀 Nouveau Lead ACO-HABITAT : ${session.clientName || "Client"}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f172a;">Nouveau Diagnostic Terminé</h2>
        <p>Une nouvelle pré-analyse vient d'être générée sur la plateforme.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #334155;">Coordonnées du client :</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 10px;"><strong>Nom :</strong> ${session.clientName || "Non renseigné"}</li>
            <li style="margin-bottom: 10px;"><strong>Téléphone :</strong> ${session.clientPhone || "Non renseigné"}</li>
            <li style="margin-bottom: 10px;"><strong>Email :</strong> ${session.clientEmail || "Non renseigné"}</li>
            <li style="margin-bottom: 10px;"><strong>Adresse du bien :</strong> ${session.clientAddress || "Non renseigné"}</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${reportUrl}" style="background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Voir le rapport du client
          </a>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[mailer] Email envoyé avec succès pour le lead ${session.clientName}`);
  } catch (error) {
    console.error("[mailer] Erreur lors de l'envoi de l'email :", error);
  }
}
