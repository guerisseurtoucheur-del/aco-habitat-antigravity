import nodemailer from "nodemailer";

// Transporteur Gmail reutilisable
function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendLeadEmail(session: any, reportUrl: string) {
  // Configurer le transporteur Gmail
  const transporter = getTransporter();

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
            DIAGNOSTIC-BOIS.COM | Emis par ACO-HABITAT
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

// Envoyer le rapport PDF au client apres paiement
export async function sendReportToClient(session: any, reportUrl: string, pdfBuffer?: Buffer) {
  const transporter = getTransporter();

  const clientEmail = session.clientEmail;
  if (!clientEmail) {
    console.error("[mailer] Pas d'email client pour envoyer le rapport");
    return;
  }

  const mailOptions: any = {
    from: process.env.GMAIL_USER,
    to: clientEmail,
    subject: `Votre rapport de diagnostic bois - DIAGNOSTIC-BOIS.COM`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">DIAGNOSTIC-BOIS.COM</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 12px;">Votre rapport est pret !</p>
        </div>

        <!-- Message de remerciement -->
        <div style="padding: 24px;">
          <p style="color: #0f172a; font-size: 16px; margin: 0 0 16px 0;">
            Bonjour ${session.clientName || ""},
          </p>
          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
            Merci pour votre confiance ! Votre paiement a bien ete recu et votre rapport de diagnostic complet est maintenant disponible.
          </p>
          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
            ${pdfBuffer ? "Vous trouverez votre rapport en piece jointe de cet email." : "Cliquez sur le bouton ci-dessous pour telecharger votre rapport."}
          </p>
        </div>

        <!-- Bouton CTA -->
        <div style="padding: 0 24px 24px 24px; text-align: center;">
          <a href="${reportUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
            ACCEDER A MON RAPPORT
          </a>
        </div>

        <!-- Lien texte de secours -->
        <div style="padding: 0 24px 24px 24px;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
            Si le bouton ne fonctionne pas, copiez ce lien :<br/>
            <a href="${reportUrl}" style="color: #10b981; word-break: break-all;">${reportUrl}</a>
          </p>
        </div>

        <!-- Rappel contact -->
        <div style="background: #f0fdf4; padding: 16px 24px; margin: 0 24px 24px 24px; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #16a34a; font-weight: 600;">
            Besoin d'un devis ou de conseils ?
          </p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">
            Contactez-nous au <a href="tel:+33233311979" style="color: #10b981; font-weight: 600;">02 33 31 19 79</a><br/>
            ou par email : <a href="mailto:aco.habitat@orange.fr" style="color: #10b981;">aco.habitat@orange.fr</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">
            DIAGNOSTIC-BOIS.COM | ACO-HABITAT<br/>
            18 Rue Bernard Palissy, 61000 Alencon
          </p>
        </div>
      </div>
    `,
  };

  // Ajouter le PDF en piece jointe si disponible
  if (pdfBuffer) {
    mailOptions.attachments = [
      {
        filename: `rapport-diagnostic-${session.id || "bois"}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[mailer] Rapport envoye au client ${clientEmail}`);
  } catch (error) {
    console.error("[mailer] Erreur envoi rapport client :", error);
  }
}
