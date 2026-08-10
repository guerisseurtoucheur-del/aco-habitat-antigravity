import nodemailer from "nodemailer";

// Nom d'expediteur professionnel
const SENDER_NAME = "DIAGNOSTIC-BOIS.COM";

// Adresse de reception des leads (surchargeable via LEAD_EMAIL_RECIPIENT)
const LEAD_RECIPIENT = "aco.habitat.contact@gmail.com";

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

// Formater l'expediteur avec nom professionnel
function getFromAddress() {
  return `"${SENDER_NAME}" <${process.env.GMAIL_USER}>`;
}

export async function sendLeadEmail(session: any, reportUrl: string, result?: any, pdfBuffer?: Buffer) {
  // Configurer le transporteur Gmail
  const transporter = getTransporter();

  // Extraire les infos du rapport si disponibles
  const analyses = result?.analyses || [];
  const nbPathologies = analyses.filter((a: any) => a.pathologie && !a.pathologie.toLowerCase().includes("aucune")).length;
  const maxUrgence = analyses.some((a: any) => a.urgence?.toLowerCase() === "critique") ? "CRITIQUE" :
                     analyses.some((a: any) => a.urgence?.toLowerCase() === "moderee") ? "MODÉRÉE" : "FAIBLE";
  const scoreConfiance = result?.score_confiance_general || "N/A";

  const mailOptions: any = {
    from: getFromAddress(),
    to: process.env.LEAD_EMAIL_RECIPIENT || LEAD_RECIPIENT,
    subject: `Nouveau Lead DIAGNOSTIC-BOIS : ${session.clientName || "Client"} - ${maxUrgence}`,
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

  // Ajouter le PDF en piece jointe si disponible
  if (pdfBuffer) {
    const ref = session.id ? session.id.slice(0, 12).toUpperCase() : "DIAG";
    mailOptions.attachments = [
      {
        filename: `Rapport_DIAGNOSTIC-BOIS_${ref}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];
  }

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

  const clientName = session.clientName || "cher client";
  const ref = session.id ? session.id.slice(0, 8).toUpperCase() : "DIAG";

  const mailOptions: any = {
    from: getFromAddress(),
    to: clientEmail,
    subject: `Votre rapport de diagnostic bois est disponible - Ref. ${ref}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                
                <!-- Header avec logo - Bulletproof -->
                <tr>
                  <td style="background-color: #0f172a; padding: 32px 40px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">DIAGNOSTIC-BOIS.COM</h1>
                    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 13px; font-weight: 400;">Expert en pathologies du bois depuis 2006</p>
                  </td>
                </tr>

                <!-- Badge de confirmation - Bulletproof -->
                <tr>
                  <td style="padding: 32px 40px 0 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #10b981; border-radius: 8px; padding: 16px 24px; text-align: center;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">
                            Paiement confirme - Votre rapport est pret !
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message principal -->
                <tr>
                  <td style="padding: 32px 40px;">
                    <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                      Bonjour ${clientName},
                    </p>
                    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0;">
                      Nous vous remercions pour votre confiance. Votre paiement a bien ete enregistre et votre <strong>rapport de diagnostic complet</strong> est maintenant disponible.
                    </p>
                    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0;">
                      Vous trouverez votre rapport detaille <strong>en piece jointe</strong> de cet email. Ce document contient l'analyse complete de vos photos avec les pathologies identifiees et nos recommandations.
                    </p>
                  </td>
                </tr>

                <!-- Reference -->
                <tr>
                  <td style="padding: 0 40px 24px 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Reference de votre dossier</p>
                          <p style="margin: 4px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 600; font-family: monospace;">${ref}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Bouton CTA - Bulletproof pour Gmail -->
                <tr>
                  <td style="padding: 0 40px 32px 40px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="background-color: #0f172a; border-radius: 8px;">
                          <a href="${reportUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            CONSULTER MON RAPPORT EN LIGNE
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 12px 0 0 0; font-size: 12px; color: #94a3b8;">
                      ou copiez ce lien : <a href="${reportUrl}" style="color: #0066ff;">${reportUrl}</a>
                    </p>
                  </td>
                </tr>

                <!-- Separateur -->
                <tr>
                  <td style="padding: 0 40px;">
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;">
                  </td>
                </tr>

                <!-- Contact -->
                <tr>
                  <td style="padding: 32px 40px;">
                    <p style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px; font-weight: 600;">
                      Une question ? Besoin d'un devis de traitement ?
                    </p>
                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
                      Notre equipe d'experts est a votre disposition pour vous accompagner.<br/>
                      <strong>Appelez-nous :</strong> <a href="tel:+33233311979" style="color: #10b981; text-decoration: none; font-weight: 600;">02 33 31 19 79</a><br/>
                      <strong>Email :</strong> <a href="mailto:aco.habitat@orange.fr" style="color: #10b981; text-decoration: none;">aco.habitat@orange.fr</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="text-align: center;">
                          <p style="margin: 0 0 4px 0; color: #0f172a; font-size: 13px; font-weight: 600;">ACO-HABITAT</p>
                          <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.5;">
                            18 Rue Bernard Palissy, 61000 Alencon<br/>
                            SIRET : 344 616 412 00062
                          </p>
                          <p style="margin: 16px 0 0 0;">
                            <a href="https://diagnostic-bois.com" style="color: #10b981; font-size: 12px; text-decoration: none; font-weight: 500;">www.diagnostic-bois.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  // Ajouter le PDF en piece jointe
  if (pdfBuffer) {
    mailOptions.attachments = [
      {
        filename: `Rapport_DIAGNOSTIC-BOIS_${ref}.pdf`,
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
