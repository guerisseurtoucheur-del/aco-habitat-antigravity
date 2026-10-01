import { GoogleGenAI } from '@google/genai';

// Initialisation de l'Intelligence Artificielle Google Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chasserArtisans(ville: string, probleme: string) {
  console.log(`🔍 [MOTEUR IA] Recherche des vrais spécialistes pour : ${probleme} à ${ville}...`);
  
  const promptRecherche = `
    Trouve 5 à 10 sociétés EXPERTES ET ULTRA-SPÉCIALISÉES en traitement des bois, charpente, mérule, et insectes xylophages dans un RAYON DE 200 KM autour de ${ville}.
    IMPORTANT : Ces entreprises sont RARES. Cherche dans les grandes villes dans un rayon de 200 km autour de ${ville}.
    ATTENTION DIRECTIVE CRITIQUE : INTERDICTION ABSOLUE de ramener des couvreurs, des charpentiers classiques, des maçons ou des zingueurs. S'ils font de la couverture ou de la charpente générale, TU LES IGNORES. Uniquement les spécialistes en traitement (insectes, champignons, humidité).
    Format strict JSON : [{"nom_societe": "...", "email": "...", "telephone": "...", "ville": "..."}]
    Si tu ne trouves pas l'email exact, déduis-le logiquement. Ne laisse jamais le champ email vide.
    Ne renvoie QUE le JSON, sans aucun autre texte.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptRecherche,
      config: {
        tools: [{ googleSearch: {} }], // Autorise l'IA à fouiller internet en temps réel
        temperature: 0.2, // Mode "Précision maximale"
      }
    });

    let texteReponse = response.text || "[]";
    
    // Nettoyage au cas où l'IA rajoute des balises Markdown (```json ... ```)
    texteReponse = texteReponse.replace(/```json/g, '').replace(/```/g, '').trim();

    const artisans = JSON.parse(texteReponse);
    console.log(`✅ [MOTEUR IA] ${artisans.length} artisans qualifiés trouvés.`);
    return artisans;

  } catch (error) {
    console.error("❌ Erreur pendant la chasse IA :", error);
    return [];
  }
}

export async function chasserFutursPartenaires(ville: string) {
  console.log(`🔍 [RECRUTEMENT IA] Recherche de spécialistes pour le réseau partenaire à : ${ville}...`);
  
  const promptRecherche = `
    Trouve 5 à 10 sociétés EXPERTES ET ULTRA-SPÉCIALISÉES en traitement des bois, charpente, mérule, et insectes xylophages à ${ville}.
    ATTENTION DIRECTIVE CRITIQUE : INTERDICTION ABSOLUE de ramener des couvreurs, des charpentiers classiques, des maçons ou des plombiers. S'ils font de la couverture ou de la charpente générale, TU LES IGNORES. Uniquement les spécialistes en traitement (insectes, champignons).
    Format strict JSON : [{"nom_societe": "...", "email": "...", "telephone": "...", "ville": "..."}]
    Si tu ne trouves pas l'email exact, déduis-le logiquement. Ne laisse jamais le champ email vide.
    Ne renvoie QUE le JSON, sans aucun autre texte.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptRecherche,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      }
    });

    let texteReponse = response.text || "[]";
    texteReponse = texteReponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const artisans = JSON.parse(texteReponse);
    console.log(`✅ [RECRUTEMENT IA] ${artisans.length} futurs partenaires trouvés.`);
    return artisans;
  } catch (error) {
    console.error("❌ Erreur pendant le recrutement IA :", error);
    return [];
  }
}

export async function redigerMailDeVente(nomSociete: string, ville: string, probleme: string) {
  const promptRedaction = `
    Rédige le corps de l'email (sans objet ni signature) pour proposer ce chantier à l'entreprise : ${nomSociete}.
    Détails du lead : Problème de ${probleme} à ${ville}.
    Le ton doit être urgent. Précise que le premier confrère qui valide le transfert récupère l'exclusivité du client. Ne mentionne pas de prix.
    RÈGLES ABSOLUES :
    - Aucun astérisque (**), aucun markdown.
    - Ton direct, professionnel, entre artisans du bâtiment.
    - Commencer par "Bonjour,"
    - Pas de blabla. Va droit au but.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptRedaction,
        config: { temperature: 0.7 }
    });
    return response.text;
  } catch (error) {
    console.error("❌ Erreur de rédaction IA :", error);
    return "Bonjour,\nUn prospect exclusif est disponible sur votre secteur. Cliquez sur le lien pour récupérer le chantier.";
  }
}

export async function extraireInfosLead(texteMail: string) {
  const prompt = `
    Analyse ce message de client et extrais les informations en format JSON strict.
    ATTENTION TRÈS IMPORTANT : Le formulaire du client a un bug qui supprime les espaces. 
    Par exemple, "NomJolie" signifie que le nom est "Jolie". "Telephone0685214521" signifie que le téléphone est "0685214521". "Ville75013 Paris" signifie que la ville est "75013 Paris".
    "Adresse35 rue du moulin" signifie que l'adresse est "35 rue du moulin".
    "Emailjean@gmail.com" signifie que l'email est "jean@gmail.com".
    
    Tu dois absolument extraire : nom, ville, adresse, telephone, email_client, probleme.
    Si une information est introuvable, mets "Inconnu".
    
    Message du client :
    ${texteMail}
  `;
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { temperature: 0.1 }
    });
    let texteReponse = response.text || "{}";
    texteReponse = texteReponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(texteReponse);
  } catch (error: any) {
    console.error("Erreur extraction IA:", error);
    return { nom: "Client Inconnu", ville: "Inconnue", adresse: "Inconnue", email_client: "Inconnu", probleme: "ERREUR IA: " + (error.message || "Parse Error"), telephone: "Inconnu" };
  }
}

export async function suggestNearbyHubs(ville: string) {
  const prompt = `
    Le code postal et/ou la ville saisis sont : "${ville}".
    S'il s'agit d'un petit village ou d'une petite commune, trouve les 3 plus grandes agglomérations / bassins économiques majeurs dans un rayon de 50 km (là où les entreprises du bâtiment sont généralement implantées).
    Si la ville saisie est DÉJÀ une grande agglomération (ex: Paris, Bordeaux, Nantes, Rennes), renvoie un tableau vide [].
    Format strict JSON attendu : un tableau de strings, ex: ["Saint-Malo", "Dinan", "Saint-Brieuc"].
    Ne renvoie QUE le JSON, sans aucun autre texte.
  `;
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { temperature: 0.1 }
    });
    let texteReponse = response.text || "[]";
    texteReponse = texteReponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(texteReponse);
  } catch (error: any) {
    console.error("Erreur suggestion hubs IA:", error);
    return [];
  }
}
