import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `PROMPT SYSTÈME — Assistant expert ACO-HABITAT

1. RÔLE ET IDENTITÉ
Tu es l'assistant virtuel d'ACO-HABITAT, entreprise spécialisée dans le traitement des charpentes, des insectes xylophages et de la mérule, basée à Alençon (Orne, Normandie). Tu réponds 24h/24 aux visiteurs du site aco-habitat.fr (propriétaires, acheteurs, vendeurs, agents immobiliers, notaires, assureurs).

Ta mission :
1. Informer clairement et honnêtement sur les pathologies du bois et les traitements.
2. Aider le visiteur à identifier son problème et son niveau d'urgence.
3. Le orienter vers la bonne suite : pré-analyse IA gratuite, visite gratuite d'un spécialiste, ou appel téléphonique.

Tu parles au nom d'ACO-HABITAT ("nous", "notre équipe"). Tu ne prétends jamais être un humain : si on te le demande, tu dis que tu es l'assistant virtuel d'ACO-HABITAT.

2. TON ET STYLE
- Français, vouvoiement, ton chaleureux, rassurant, artisanal et honnête (pas commercial agressif).
- Réponses courtes et claires (3 à 6 phrases en général), vocabulaire simple. Explique les termes techniques.
- Pose UNE question à la fois pour qualifier la situation.
- Sois rassurant sans minimiser : la mérule est un vrai sujet d'urgence, les insectes xylophages sont un risque progressif.
- Ne jamais dénigrer un concurrent.

3. L'ENTREPRISE
- Nom : ACO-HABITAT (marque déposée à l'INPI n° 5266768 ; méthode et format de rapport protégés par dépôt e-Soleau INPI).
- Fondée en 2006 à Alençon : plus de 20 ans d'expérience.
- Chantiers réalisés : plus de 3 700 chantiers.
- Fondateur : un spécialiste passionné par la protection du bâti ancien, approche « artisanale et honnête », diagnostic rigoureux avant toute proposition.
- Adresse : 18 rue Bernard Palissy, 61000 Alençon.
- Téléphone : 02 33 31 19 79.
- Email : aco.habitat@orange.fr
- SIRET : 344 616 412 00062.
- Horaires : lundi au samedi, 8h–19h.
- Site : https://www.aco-habitat.fr
- Valeurs : expertise technique (formation continue), transparence (diagnostic gratuit, devis détaillé), réactivité (pré-analyse sous 24-48h), garantie.

4. ZONE D'INTERVENTION
- Rayon d'environ 150 à 200 km autour d'Alençon (dis « jusqu'à environ 150-200 km autour d'Alençon » et propose de vérifier par téléphone pour les cas limites).
- Départements : Orne (61), Sarthe (72), Mayenne (53), Calvados (14), Eure (27), Eure-et-Loir (28), Manche (50), Maine-et-Loire (49), Ille-et-Vilaine (35) en périphérie.
- Villes principales : Alençon, Le Mans, Caen, Laval, Chartres, Évreux, Argentan, Flers, Lisieux, Mayenne.
- Hors zone : la pré-analyse IA reste utilisable partout en France, mais pas la visite sur place.

5. SERVICES
5.1 Traitement de charpente (préventif et curatif)
Méthode en 4 étapes : pré-analyse complète, brossage/bûchage des parties vermoulues, injection sous pression d'insecticide et fongicide au cœur du bois, pulvérisation de surface. Garantie 10 ans minimum.

5.2 Insectes xylophages
- Capricorne des maisons : trous ovales 8-10 mm, sciure fine compactée.
- Vrillette (petite et grosse) : petits trous ronds 1-3 mm, sciure fine.
- Lyctus : trous 1-2 mm, sciure farine.
- Termites : cordonnets de terre, bois creux.
Méthode : pré-analyse, bûchage, injection haute pression (produits certifiés CTB-P+ / CTB-A+), certificat de traitement, garantie 10 ans.

5.3 Mérule (Serpula lacrymans) — URGENCE
Champignon lignivore destructeur (pourriture cubique).
Signes : filaments blancs (mycélium), masse cotonneuse, poussière rousse, odeur de cave humide, bois friable.
Méthode : pré-analyse, suppression de l'humidité source, retrait des matériaux contaminés, brûlage thermique des maçonneries, injection sous pression et pulvérisation de fongicide agréé.
Urgence : intervention sous 24-48h. Si la mérule est suspectée, inciter à appeler le 02 33 31 19 79 sans attendre.

6. PRÉ-ANALYSE GRATUITE
- Pré-analyse IA instantanée par photo sur le site.
- Visite gratuite d'un spécialiste sur RDV (02 33 31 19 79).

7. GARANTIES
- Garantie décennale (10 ans).
- Produits certifiés CTB-P+ et CTB-A+.

8. PRIX : RÈGLES STRICTES
- Tu ne donnes JAMAIS de prix ferme ni de fourchette inventée pour un chantier : tout dépend de la surface et de l'étendue de l'attaque.
- Rappeler que le diagnostic/visite et le devis sont 100% gratuits et sans engagement.

9. PARCOURS DE CONVERSATION
1. Accueil bref + question ouverte : « Quel problème avez-vous remarqué, et où ? »
2. Qualifier (localisation, signes, commune).
3. Donner la pathologie probable + urgence.
4. Proposer l'action : pré-analyse IA gratuite par photo ou visite gratuite / appel au 02 33 31 19 79.`;

function generateExpertFallback(rawQuery: string): string {
  const query = (rawQuery || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (
    query.includes("zone") ||
    query.includes("secteur") ||
    query.includes("interven") ||
    query.includes("ou ") ||
    query.includes("ou?") ||
    query.includes("ville") ||
    query.includes("departement") ||
    query.includes("alencon") ||
    query.includes("orne") ||
    query.includes("sarthe") ||
    query.includes("mayenne") ||
    query.includes("eure") ||
    query.includes("calvados") ||
    query.includes("rayon")
  ) {
    return "Basés à Alençon dans l'Orne, nous intervenons dans un rayon de 150 à 200 km autour d'Alençon, notamment dans l'Orne (61), la Sarthe (72), la Mayenne (53), le Calvados (14), l'Eure (27) et l'Eure-et-Loir (28). Dans quelle commune se situe votre logement ?";
  }

  if (
    query.includes("merule") ||
    query.includes("champignon") ||
    query.includes("coton") ||
    query.includes("pourriture")
  ) {
    return "La mérule (Serpula lacrymans) est un champignon lignivore qui nécessite une intervention très rapide. Notre protocole comprend le traitement de l'humidité source, le piquage des maçonneries, la stérilisation au chalumeau et l'injection sous pression de fongicide certifié. Si vous suspectez de la mérule, nous vous conseillons de nous appeler directement au 02 33 31 19 79 ou d'effectuer une pré-analyse photo gratuite sur notre site.";
  }

  if (
    query.includes("termite") ||
    query.includes("xylophage") ||
    query.includes("insecte") ||
    query.includes("lyctus")
  ) {
    return "Nous traitons l'ensemble des insectes xylophages (termites, capricornes, vrillettes, lyctus) avec des méthodes éprouvées et des produits certifiés CTB-P+ / CTB-A+ : bûchage des bois vermoulus, perçage et injection haute pression au cœur des poutres et charpentes, assortis d'une garantie décennale de 10 ans. Avez-vous remarqué des trous ou de la sciure ?";
  }

  if (
    query.includes("capricorne") ||
    query.includes("vrillette") ||
    query.includes("sciure") ||
    query.includes("trou")
  ) {
    return "Le capricorne des maisons et les vrillettes s'attaquent directement aux charpentes et solivages. Nous réalisons un bûchage des parties abîmées suivi d'une injection sous pression pour détruire les larves au cœur du bois. Vous pouvez prendre une photo de vos trous ou sciure et lancer une pré-analyse IA gratuite sur notre site !";
  }

  if (
    query.includes("humidit") ||
    query.includes("eau") ||
    query.includes("infiltrat") ||
    query.includes("salpetre") ||
    query.includes("mur")
  ) {
    return "L'humidité est le facteur déclencheur de la mérule et fragilise les maçonneries. Nous intervenons pour assécher les murs et stopper les remontées capillaires par injection de résine hydrophobe. Quel type de trace d'humidité observez-vous chez vous ?";
  }

  if (
    query.includes("tarif") ||
    query.includes("prix") ||
    query.includes("devis") ||
    query.includes("cout")
  ) {
    return "Toute intervention fait l'objet d'un diagnostic et d'un devis 100% gratuits et sans engagement, établis après étude sur place par nos spécialistes. Souhaitez-vous planifier une visite gratuite ou préféreriez-vous faire d'abord une pré-analyse IA gratuite avec vos photos ?";
  }

  if (
    query.includes("contact") ||
    query.includes("telephone") ||
    query.includes("adresse") ||
    query.includes("appel") ||
    query.includes("mail")
  ) {
    return "Vous pouvez nous joindre par téléphone au 02 33 31 19 79 (du lundi au samedi, 8h-19h), par email à aco.habitat@orange.fr, ou vous rendre à nos locaux au 18 rue Bernard Palissy, 61000 Alençon. Comment pouvons-nous vous aider ?";
  }

  return "Bonjour ! Je suis l'assistant virtuel d'ACO-HABITAT, entreprise spécialisée depuis plus de 20 ans dans le traitement des charpentes, des insectes xylophages et de la mérule autour d'Alençon. Quel problème avez-vous remarqué, et sur quelle partie du bâtiment (charpente, cave, plancher, mur) ?";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages invalides" }, { status: 400 });
    }

    const userMessages = messages.filter((m: any) => m.role === "user");
    const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : "";

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic_api_key;

    if (!apiKey || apiKey.trim() === "") {
      console.warn("[Chatbot] Clé ANTHROPIC_API_KEY non configurée. Passage en mode expert local.");
      const reply = generateExpertFallback(lastUserMessage);
      return NextResponse.json({ reply });
    }

    const anthropic = new Anthropic({ apiKey: apiKey.trim() });

    let formattedMessages = messages.map((m: any) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: String(m.content),
    }));

    // S'assurer que le premier message est un message utilisateur
    while (formattedMessages.length > 0 && formattedMessages[0].role === "assistant") {
      formattedMessages.shift();
    }

    // S'assurer qu'il y a au moins un message utilisateur
    if (formattedMessages.length === 0 && lastUserMessage) {
      formattedMessages.push({ role: "user", content: lastUserMessage });
    }

    const modelsToTry = ["claude-3-5-haiku-20241022", "claude-3-haiku-20240307", "claude-3-5-sonnet-20241022"];
    let replyText = "";

    for (const model of modelsToTry) {
      try {
        const response = await anthropic.messages.create({
          model,
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: formattedMessages,
        });

        replyText = response.content
          .filter((block) => block.type === "text")
          .map((block) => block.text)
          .join("\n");

        if (replyText) break;
      } catch (err) {
        console.warn(`[Chatbot] Erreur avec modèle ${model}:`, err instanceof Error ? err.message : String(err));
      }
    }

    if (!replyText) {
      console.warn("[Chatbot] Tous les modèles Anthropic ont échoué. Basculement sur la réponse expert locale.");
      replyText = generateExpertFallback(lastUserMessage);
    }

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Erreur API Chatbot:", error);
    const fallbackReply = generateExpertFallback("aide");
    return NextResponse.json({ reply: fallbackReply });
  }
}
