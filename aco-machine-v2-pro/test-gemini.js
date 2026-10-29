require('dotenv').config({ path: '.env.local' });
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const texteMail = `NomDe le rivière\nEmailkemal.ousmani@wanadoo.fr\nTelephone0685235412\ntel:0685235412 Adresse35 rue du moulin Ville44000 Nantes\nServicePre-analyse Bois GRATUITE - RAPPORT IA\n\nMessage\n\nRAPPORT D'ANALYSE IA.\nProbleme: autre. Gravite: 82/100 (critique). Diagnostic: Analyse en cours...`;
  
  const prompt = `
    Analyse ce message de client et extrais les informations en format JSON strict.
    ATTENTION TRÈS IMPORTANT : Le formulaire du client a un bug qui supprime les espaces. 
    Par exemple, "NomJolie" signifie que le nom est "Jolie". "Telephone0685214521" signifie que le téléphone est "0685214521". "Ville75013 Paris" signifie que la ville est "75013 Paris".
    Si une information est introuvable, mets "Inconnu".
    
    Message du client :
    ${texteMail}
  `;
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: { 
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              nom: { type: "STRING" },
              ville: { type: "STRING" },
              probleme: { type: "STRING" },
              telephone: { type: "STRING" }
            },
            required: ["nom", "ville", "probleme", "telephone"]
          }
        }
    });
    console.log("RESPONSE:", response.text);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
run();
