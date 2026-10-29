import { NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Le formulaire envoie : nom, telephone, email, adresse, ville, departement, note
    
    // Créer un code postal fictif pour que le mailer détecte le bon département
    // (le mailer attend un code postal à 5 chiffres dans l'adresse)
    let fakeZip = data.departement || "";
    if (fakeZip.length === 2) {
      fakeZip += "000";
    } else if (fakeZip.length === 3) {
      fakeZip += "00";
    }
    
    const fullAddress = `${data.adresse}, ${fakeZip} ${data.ville} (Dept: ${data.departement})`;
    
    // On ajoute la note à la fin du nom pour qu'elle apparaisse dans l'email
    const clientNameWithNote = data.note ? `${data.nom} - Note : ${data.note}` : data.nom;

    const session = {
      id: "CONTACT-" + Date.now(),
      clientName: clientNameWithNote,
      clientPhone: data.telephone,
      clientEmail: data.email,
      clientAddress: fullAddress,
    };
    
    const reportUrl = "Formulaire de Contact (Page Ville)";
    
    await sendLeadEmail(session, reportUrl);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/contact] Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
