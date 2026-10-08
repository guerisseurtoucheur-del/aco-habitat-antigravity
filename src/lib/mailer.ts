import nodemailer from "nodemailer";

function getPublicBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://diagnostic-bois.com";
}

// Départements conservés pour ACO-HABITAT (Orne 61, Calvados 14, Mayenne 53, Eure 27, Eure-et-Loir 28, Sarthe 72)
const OUR_DEPARTMENTS = ["61", "14", "53", "27", "28", "72"];

function extractDepartment(address: string | null | undefined): string | null {
  if (!address) return null;
  // Recherche d'un code postal français à 5 chiffres (ex: 61000, 62270, 72000, etc.)
  const match = address.match(/\b(\d{2})\d{3}\b/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export async function sendLeadEmail(session: any, reportUrlFromCaller?: string) {
  const baseUrl = getPublicBaseUrl();
  const sessionId = session.id || session.sessionId;
  const finalReportUrl = (reportUrlFromCaller && !reportUrlFromCaller.includes("localhost"))
    ? reportUrlFromCaller
    : `${baseUrl}/resultats/${sessionId}`;

  const clientAddress = session.clientAddress || "";
  const dept = extractDepartment(clientAddress);
  const isInSector = dept ? OUR_DEPARTMENTS.includes(dept) : false;

  const statusTag = isInSector ? "SECTEUR_ACO" : "LEAD_A_REVENDRE";
  const deptDisplay = dept ? `Dept ${dept}` : "Secteur Inconnu";

  const subjectPrefix = isInSector
    ? `🟢 [SECTEUR ACO - ${deptDisplay}]`
    : `🔴 [À REVENDRE - ${deptDisplay}]`;

  const gmailUser = process.env.GMAIL_USER || "aco.habitat.contact@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD || "qczwydyrhaypzydt";
  const recipientEmail = process.env.LEAD_EMAIL_RECIPIENT || "aco.habitat.contact@gmail.com, kemal.ousmani@wanadoo.fr";

  const mailOptions = {
    from: `"Diagnostic Bois ACO" <${gmailUser}>`,
    to: recipientEmail,
    subject: `${subjectPrefix} Nouveau Lead : ${session.clientName || "Client"} (${deptDisplay})`,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
          .header { padding: 24px; text-align: center; background: #0f172a; color: #ffffff; }
          .status-box { background: ${isInSector ? "#f0fdf4" : "#fef2f2"}; border: 2px solid ${isInSector ? "#22c55e" : "#ef4444"}; border-radius: 12px; padding: 18px; margin: 24px 24px 0 24px; text-align: left; }
          .status-title { font-size: 15px; font-weight: 800; color: ${isInSector ? "#15803d" : "#b91c1c"}; margin: 0 0 6px 0; }
          .status-sub { font-size: 12px; color: ${isInSector ? "#166534" : "#991b1b"}; margin: 0; line-height: 1.4; }
          .content { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .table td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .table td.label { font-weight: 700; color: #64748b; width: 35%; }
          .table td.val { font-weight: 600; color: #0f172a; }
          .btn-container { text-align: center; margin: 28px 0 10px 0; }
          .btn { background-color: #0066ff; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 800; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(0,102,255,0.25); }
          .footer { padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #f8fafc; }
          .ai-tag { font-family: monospace; font-size: 11px; color: #475569; background: #e2e8f0; padding: 3px 8px; border-radius: 4px; display: inline-block; margin-top: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 20px; font-weight: 800; tracking: 0.05em;">ACO-HABITAT</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8;">Notification Lead & Diagnostic IA</p>
          </div>

          <!-- Encadré Qualification Lead (Vert / Rouge) -->
          <div class="status-box">
            <p class="status-title">
              ${isInSector ? "🟢 LEAD NOTRE SECTEUR (ACO HABITAT)" : "🔴 LEAD À REVENDRE (HORS SECTEUR)"}
            </p>
            <p class="status-sub">
              ${
                isInSector
                  ? `Le département ${dept || "?"} fait partie de notre secteur d'intervention (61, 14, 53, 27, 28, 72). À traiter par notre équipe.`
                  : `Le département ${dept || "inconnu"} est hors de notre secteur. Lead qualifié pour la revente automatique.`
              }
            </p>
            <div>
              <span class="ai-tag">TAG_AGENT_IA: [STATUS:${statusTag}]</span>
              <span class="ai-tag">DEPT: [${dept || "INCONNU"}]</span>
            </div>
          </div>

          <div class="content">
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 12px;">Coordonnées du client :</h3>
            <table class="table">
              <tr>
                <td class="label">Nom :</td>
                <td class="val">${session.clientName || "Non renseigné"}</td>
              </tr>
              <tr>
                <td class="label">Téléphone :</td>
                <td class="val"><a href="tel:${session.clientPhone}" style="color: #0066ff; text-decoration: none;">${session.clientPhone || "Non renseigné"}</a></td>
              </tr>
              <tr>
                <td class="label">Email :</td>
                <td class="val"><a href="mailto:${session.clientEmail}" style="color: #0066ff; text-decoration: none;">${session.clientEmail || "Non renseigné"}</a></td>
              </tr>
              <tr>
                <td class="label">Adresse du bien :</td>
                <td class="val">${session.clientAddress || "Non renseigné"}</td>
              </tr>
              <tr>
                <td class="label">Département :</td>
                <td class="val">
                  <strong>${dept ? `${dept}` : "Non déterminé"}</strong> 
                  ${isInSector ? "<span style='color: #15803d; font-weight: bold;'>(Notre secteur 🟢)</span>" : "<span style='color: #b91c1c; font-weight: bold;'>(Lead à revendre 🔴)</span>"}
                </td>
              </tr>
            </table>

            <div class="btn-container">
              <a href="${finalReportUrl}" target="_blank" class="btn">
                Voir le rapport du client
              </a>
            </div>
          </div>

          <div class="footer">
            ACO-HABITAT · Système de qualification des leads et pré-analyse IA<br>
            URL du rapport : <a href="${finalReportUrl}" style="color: #0066ff; text-decoration: underline;">${finalReportUrl}</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail(mailOptions);
    console.log(`[mailer] Email envoyé avec succès à ${recipientEmail} (${statusTag}) pour le lead ${session.clientName}`);
  } catch (error) {
    console.error("[mailer] Erreur lors de l'envoi de l'email :", error);
  }
}
