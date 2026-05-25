import nodemailer from "nodemailer";

export async function sendLeadEmail(session: any, reportUrl: string) {
  // Configurer le transporteur Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Extraire les infos du rapport si disponibles
  const result = session.result || {};
  const analyses = result.analyses || [];
  const nbPathologies = analyses.filter((a: any) => a.pathologie && !a.pathologie.toLowerCase().includes("aucune")).length;
  const maxUrgence = analyses.some((a: any) => a.urgence?.toLowerCase() === "critique") ? "CRITIQUE" :
                     analyses.some((a: any) => a.urgence?.toLowerCase() === "moderee") ? "MODÉRÉE" : "FAIBLE";
  const scoreConfiance = result.score_confiance_general || "N/A";

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.LEAD_EMAIL_RECIPIENT || process.env.GMAIL_USER,
    subject: `🚨 Nouveau Lead DIAGNOSTIC-BOIS : ${session.clientName || "Client"} - ${maxUrgence}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">DIAGNOSTIC-BOIS.COM</h1>
          <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 12px;">Nouveau lead entrant</p>
        </div>

        <!-- Alerte urgence -->
        <div style="background: ${maxUrgence === "CRITIQUE" ? "#fef2f2" : maxUrgence === "MODÉRÉE" ? "#fffbeb" : "#f0fdf4"}; border-left: 4px solid ${maxUrgence === "CRITIQUE" ? "#ef4444" : maxUrgence === "MODÉRÉE" ? "#f59e0b" : "#22c55e"}; padding: 16px; margin: 0;">
          <p style="margin: 0; font-weight: 600; color: ${maxUrgence === "CRITIQUE" ? "#dc2626" : maxUrgence === "MODÉRÉE" ? "#d97706" : "#16a34a"};">
            Niveau d'urgence : ${maxUrgence}
          </p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
            ${nbPathologies} pathologie(s) detectee(s) | Score IA : ${scoreConfiance}
          </p>
        </div>

        <!-- Coordonnees client -->
        <div style="padding: 24px;">
          <h2 style="color: #0f172a; font-size: 16px; margin: 0 0 16px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
            Coordonnees du client
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px;">Nom</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${session.clientName || "Non renseigne"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Telephone</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">
                <a href="tel:${session.clientPhone}" style="color: #0066ff; text-decoration: none;">${session.clientPhone || "Non renseigne"}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Email</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">
                <a href="mailto:${session.clientEmail}" style="color: #0066ff; text-decoration: none;">${session.clientEmail || "Non renseigne"}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Adresse</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${session.clientAddress || "Non renseigne"}</td>
            </tr>
          </table>
        </div>

        <!-- Bouton CTA -->
        <div style="padding: 0 24px 24px 24px; text-align: center;">
          <a href="${reportUrl}" style="display: inline-block; background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
            VOIR LE RAPPORT COMPLET
          </a>
        </div>

        <!-- Lien texte de secours -->
        <div style="padding: 0 24px 24px 24px;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
            Si le bouton ne fonctionne pas, copiez ce lien :<br/>
            <a href="${reportUrl}" style="color: #0066ff; word-break: break-all;">${reportUrl}</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">
            diagnostic-bois.com | Pre-analyse automatisee par IA
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[mailer] Email envoye pour le lead ${session.clientName}`);
  } catch (error) {
    console.error("[mailer] Erreur envoi email :", error);
  }
}
