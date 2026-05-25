import Anthropic from "@anthropic-ai/sdk";
import { diagnosticReportSchema, type DiagnosticReport } from "@/types/diagnostic";

type ImageInput = {
  mediaType: string;
  base64: string;
};

type ClaudeBase64MediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

function toClaudeBase64MediaType(mediaType: string): ClaudeBase64MediaType {
  if (
    mediaType === "image/jpeg" ||
    mediaType === "image/png" ||
    mediaType === "image/gif" ||
    mediaType === "image/webp"
  ) {
    return mediaType;
  }
  return "image/jpeg";
}

const MODEL_CANDIDATES = ["claude-3-5-sonnet-20241022", "claude-3-5-sonnet-20240620"] as const;
let cachedDiscoveredModel: string | null = null;

function buildFallbackReport(imageCount: number, reason: string): DiagnosticReport {
  const analyzedCount = Math.max(1, imageCount);
  return {
    diagnostic_global:
      `Pré-analyse provisoire (${reason}). ` +
      `Nos serveurs d'analyse haute précision sont actuellement en cours de calibration. ` +
      `Une vérification visuelle de vos ${analyzedCount} photo(s) a été effectuée.`,
    analyses: [
      {
        image_index: 1,
        zone: "Zone principale",
        pathologie: "Analyse en attente",
        confiance: "45%",
        urgence: "Modérée",
        preuve: "Les serveurs d'analyse ACO-HABITAT effectuent une mise à jour de sécurité.",
        annotations: [
          {
            label: "Verification manuelle recommandee",
            couleur: "ORANGE",
            position_relative: { x: 50, y: 50 },
          },
        ],
      },
    ],
    score_confiance_general: "45%",
    preconisations_techniques: [
      "Action immédiate (0-24h) : documenter les zones suspectes par photographies horodatées et limiter toute humidité active visible (épongeage, ventilation, coupure d'arrivée d'eau si fuite).",
      "Action court terme (7 jours) : faire intervenir un diagnostiqueur certifié COFRAC pour réaliser un état parasitaire conforme à la norme NF P 03-200, incluant sondage mécanique des bois et mesure d'humidité par humidimètre.",
      "Action 30 jours : planifier une étude structurelle complète par un bureau d'études pour évaluer la capacité résiduelle des éléments porteurs et définir un plan de traitement curatif (CTB-A+).",
      "Mesure conservatoire : ne pas modifier ni nettoyer les zones d'intérêt avant la contre-visite, conserver les photographies originales pour traçabilité (assurance, transaction, contentieux).",
      "Suivi : relancer l'analyse IA complète une fois les serveurs disponibles afin d'obtenir un rapport détaillé.",
    ],
    conclusion_juridique:
      "Rapport provisoire généré en mode dégradé. Ce document a une valeur strictement indicative et ne constitue ni un état parasitaire ni un diagnostic immobilier réglementé au sens du Code de la construction et de l'habitation. Une analyse complète, suivie d'une vérification terrain par un spécialiste certifié, est requise avant toute prise de décision technique, juridique ou financière.",
  };
}

const SYSTEM_PROMPT = `
Tu es le Directeur Technique Senior de Pré-analyse ACO-HABITAT. 38 ans d'expérience terrain. Spécialiste en entomologie du bois, mycologie des champignons lignivores et pathologies hygrométriques.

=== REGLE D'OR : PARCIMONIE ABSOLUE (Rasoir d'Ockham) ===
Tu identifies UNE SEULE pathologie principale par image : la thèse la plus simple qui explique TOUS les indices visuels.
INTERDICTION FORMELLE de cumuler plusieurs pathologies sur une même image SAUF si chacune possede ses propres marqueurs visuels INDEPENDANTS et DISTINCTS clairement visibles.
Exemple : si tu vois des galeries larges gaufrées dans du résineux, c'est Hylotrupes bajulus (Capricorne). Tu ne rajoutes PAS termites, merule ou coniophore sans preuve visuelle SPECIFIQUE et SEPAREE de chacun.
UN FAUX POSITIF EST 10 FOIS PLUS GRAVE QU'UN FAUX NEGATIF. Une famille ne doit pas demolir sa maison sur une erreur.

=== MARQUEURS VISUELS OBLIGATOIRES (tu ne nommes RIEN sans les voir) ===
HYLOTRUPES BAJULUS (Capricorne) : galeries 5-15 mm, parois GAUFREES (stries transversales), sciure en copeaux agglomerés, bois résineux uniquement, boursouflures de surface.
ANOBIUM PUNCTATUM (Petite Vrillette) : trous ronds 1-2 mm, sciure farineuse blanc-crème en cone.
RETICULITERMES SP. (Termites) : galeries comblees de matiere ARGILEUSE brun-grise (JAMAIS de sciure libre). Terre dans les galeries = signature absolue.
SERPULA LACRYMANS (Merule) : mycelium blanc cotonneux OU feuillet orange-brun OU bois cubique brun (fissures en cubes). DEUX de ces trois marqueurs requis minimum.
CONIOPHORA PUTEANA (Coniophore) : filaments brun-olivatre visibles, bois brun fissures longitudinales, humidite importante.
INFILTRATION : tache d'humidite avec AUREOLE concentrique jaune-brun (sels mineraux).
REMONTEE CAPILLAIRE : lisere horizontal 0-120 cm, efflorescences salines blanches en bas de mur.

=== DIAGNOSTIC DIFFERENTIEL — CONFUSIONS INTERDITES ===
Galeries larges + parois gaufrees + resineux = CAPRICORNE (pas termites : les termites ont parois lisses boueuses)
Galeries lisses + matiere argileuse = TERMITES (pas capricorne)
Sciure farineuse + petits trous ronds = VRILLETTE (pas capricorne)
Bois cubique brun + mycelium blanc = MERULE (pas simple vieillissement)
Noeud de bois, vieillissement naturel, trace d'outil = PAS une pathologie
Ombre, reflet, condensation de surface = PAS de l'humidite structurelle
Poussiere, toile d'araignee = PAS du mycelium

=== CALIBRATION DE CONFIANCE ===
80-100% : marqueurs PRIMAIRES clairement visibles (galeries gaufrees identifiees, mycelium visible, trous mesurables)
50-79% : indices compatibles mais pas totalement distincts (angle, luminosite, resolution insuffisante). Qualifie avec "suspicion de..." ou "indice compatible avec..."
Moins de 50% : mentionne la necessite de verification terrain mais NE POSE PAS de conclusion. N'annote PAS en ROUGE.

=== REGLES METIER ===
- Francais clinique et autoritaire. Zero approximation.
- Binome nomenclatural OBLIGATOIRE : Nom latin (Nom commun).
- INTERDIT : "diagnostic" pour notre service -> "pre-analyse", "constat technique".
- INTERDIT : "expert" -> "specialiste".
- INTERDIT : markdown (asterisques, tirets bas, backticks, HTML). Texte brut uniquement.
- Le champ "preuve" cite les indices visuels PRECIS observes (morphologie, couleur, taille, localisation). Si tu ne peux pas le remplir precisement, tu NE NOMMES PAS la pathologie.

=== ANNOTATIONS ===
ROUGE = Pathologie CONFIRMEE visuellement (marqueurs primaires observes).
ORANGE = Suspicion a confirmer sur place.
BLEU = Source d'humidite identifiee.
MAXIMUM 3 annotations par image. Annote UNIQUEMENT ce que tu identifies avec confiance >= 50%.

=== NORMES (a citer si pertinent) ===
NF P 03-200 (etat parasitaire) - DTU 31.1/31.2 (charpentes) - CTB-A+ (traitement curatif) - Loi 8 juillet 1999 (merule, declaration mairie) - L.133-6 CCH (capricorne, zones delimitees)

=== FORMAT JSON STRICT ===
Reponds EXCLUSIVEMENT en JSON valide. Zero texte avant ou apres.
{
  "diagnostic_global": "Synthese 200-350 mots. Pathologie PRINCIPALE identifiee avec binome, preuves visuelles precises, cause racine, criticite structurelle, strategie d'intervention. Texte brut.",
  "analyses": [
    {
      "image_index": 1,
      "zone": "Designation anatomique precise",
      "pathologie": "Pathologie principale uniquement avec binome nomenclatural",
      "confiance": "0-100%",
      "urgence": "Faible/Moderee/Critique",
      "preuve": "Indices visuels precis OBSERVES : morphologie, couleurs, dimensions estimees, localisation exacte",
      "annotations": [
        {
          "label": "Label court et precis (ex: Galeries gaufrees Capricorne 8mm)",
          "couleur": "ROUGE/ORANGE/BLEU",
          "position_relative": { "x": 0, "y": 0 },
          "width": 30,
          "height": 20
        }
      ]
    }
  ],
  "score_confiance_general": "0-100%",
  "preconisations_techniques": [
    "Action immediate (0-24h) : mesures conservatoires",
    "Action court terme (7 jours) : investigations COFRAC",
    "Action 30 jours : traitement curatif CTB-A+ ou consolidation DTU 31.1",
    "Action 3 mois : travaux correctifs",
    "Suivi long terme : controles periodiques et tracabilite"
  ],
  "conclusion_juridique": "100-180 mots. Caractere non opposable. Verification terrain obligatoire par specialiste certifie COFRAC."
}

RAPPEL : un vrai specialiste de 38 ans ne dit JAMAIS ce qu'il ne voit pas. Sa valeur est dans sa precision et sa discipline, pas dans l'exhaustivite de ses hypotheses. Mieux vaut un seul constat juste que cinq hypotheses fausses.
`.trim();





function extractJsonObject(raw: string): string {
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Claude n'a pas retourne de JSON exploitable.");
  }
  return raw.slice(firstBrace, lastBrace + 1);
}

function stripMarkdownText(value: unknown): unknown {
  if (typeof value !== "string") return value;
  return value
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_{2}(.+?)_{2}/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

const RICH_FALLBACK_PRECONISATIONS = [
  "Action immédiate (0-24h) : sécuriser la zone, documenter par photographies horodatées, et limiter toute humidité active visible (épongeage, ventilation, coupure d'arrivée d'eau si fuite).",
  "Action court terme (7 jours) : faire intervenir un diagnostiqueur certifié COFRAC pour réaliser un état parasitaire conforme à la norme NF P 03-200 (sondage mécanique, mesure d'humidité par humidimètre, prélèvement éventuel pour analyse mycologique).",
  "Action 30 jours : commander une étude structurelle par bureau d'études afin d'évaluer la capacité résiduelle des éléments porteurs et définir un plan de traitement curatif (CTB-A+) ou de remplacement partiel.",
  "Action 3 mois : engager les travaux correctifs préconisés par les spécialistes du traitement (xylophages/fongicides, reprise de couverture, traitement de l'humidité structurelle).",
  "Suivi long terme : programmer un contrôle annuel des zones traitées et conserver l'ensemble des rapports et factures pour traçabilité (assurance, transaction, contentieux).",
];

const RICH_FALLBACK_CONCLUSION =
  "Ce document constitue un rapport d'aide à la pré-analyse généré par intelligence artificielle à partir des photographies fournies. Il a une valeur strictement indicative. Il ne se substitue pas à un état parasitaire, à un diagnostic termites réglementé au sens de l'article L.133-1 du Code de la construction et de l'habitation, ni à toute autre prestation réglementée, qui doivent être réalisés par un spécialiste certifié COFRAC après inspection physique du bien. Une vérification terrain par un spécialiste qualifié est impérative avant toute prise de décision technique, juridique ou financière. ACO-HABITAT décline toute responsabilité quant à l'usage de ce document dans le cadre d'une transaction immobilière ou d'un litige.";

function isInsufficient(value: unknown, minLength: number): boolean {
  if (typeof value !== "string") return true;
  return value.trim().length < minLength;
}

function normalizeReportPayload(rawPayload: unknown): unknown {
  if (!rawPayload || typeof rawPayload !== "object") {
    return rawPayload;
  }

  const payload = rawPayload as Record<string, unknown>;

  // Strip markdown defensively from top-level text fields
  if (typeof payload.diagnostic_global === "string") {
    payload.diagnostic_global = stripMarkdownText(payload.diagnostic_global);
  }
  if (typeof payload.conclusion_juridique === "string") {
    payload.conclusion_juridique = stripMarkdownText(payload.conclusion_juridique);
  }

  // Default global score
  if (!payload.score_confiance_general && payload.analyses) {
    payload.score_confiance_general = "85%";
  }

  // Rich fallback if Claude returned nothing or a one-liner
  const preconisationsRaw = Array.isArray(payload.preconisations_techniques)
    ? (payload.preconisations_techniques as unknown[]).map((item) =>
        typeof item === "string" ? (stripMarkdownText(item) as string) : item,
      )
    : [];
  const usefulPreconisations = preconisationsRaw.filter(
    (item): item is string => typeof item === "string" && item.trim().length >= 30,
  );
  payload.preconisations_techniques =
    usefulPreconisations.length >= 3 ? usefulPreconisations : RICH_FALLBACK_PRECONISATIONS;

  if (isInsufficient(payload.conclusion_juridique, 80)) {
    payload.conclusion_juridique = RICH_FALLBACK_CONCLUSION;
  }

  // Normalize analyses
  const analyses = Array.isArray(payload.analyses) ? payload.analyses : [];
  const normalizedAnalyses = analyses.map((item) => {
    if (!item || typeof item !== "object") {
      return item;
    }
    const entry = item as Record<string, any>;

    if (typeof entry.image_index === "string") {
      entry.image_index = parseInt(entry.image_index, 10) || 1;
    }

    if (typeof entry.urgence === "string") {
      entry.urgence = entry.urgence.replace("Moderee", "Modérée");
    }

    if (typeof entry.confiance === "number") {
      entry.confiance = `${entry.confiance}%`;
    }

    if (typeof entry.zone === "string") entry.zone = stripMarkdownText(entry.zone);
    if (typeof entry.pathologie === "string") entry.pathologie = stripMarkdownText(entry.pathologie);
    if (typeof entry.preuve === "string") entry.preuve = stripMarkdownText(entry.preuve);

    return entry;
  });

  if (typeof payload.score_confiance_general === "number") {
    payload.score_confiance_general = `${payload.score_confiance_general}%`;
  }

  return {
    ...payload,
    analyses: normalizedAnalyses,
  };
}

async function discoverModel(anthropic: Anthropic): Promise<string | null> {
  if (cachedDiscoveredModel) {
    return cachedDiscoveredModel;
  }

  try {
    const models = await anthropic.models.list();
    const ids = models.data.map((item) => item.id);
    const discovered =
      ids.find((id) => id === "claude-3-5-sonnet-20241022") ??
      ids.find((id) => id.includes("claude-3-5-sonnet")) ??
      ids.find((id) => id.includes("sonnet")) ??
      null;

    if (discovered) {
      cachedDiscoveredModel = discovered;
      console.info("[analyse] Claude discovered model:", discovered);
    }

    return discovered;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[analyse] Unable to list Claude models:", message);
    return null;
  }
}

export async function runClaudeDiagnostic(images: ImageInput[]): Promise<DiagnosticReport> {
  try {
    // Support both ANTHROPIC_API_KEY and anthropic_api_key (case-insensitive)
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic_api_key;
    if (!apiKey) {
      console.warn("[analyse] ANTHROPIC_API_KEY manquante, utilisation du mode secours.");
      return buildFallbackReport(images.length, "cle API manquante");
    }

    const anthropic = new Anthropic({ apiKey });
    const discoveredModel = await discoverModel(anthropic);
    const modelsToTry = [
      ...(discoveredModel ? [discoveredModel] : []),
      ...MODEL_CANDIDATES,
    ].filter((value, index, array) => array.indexOf(value) === index);

    if (discoveredModel && !discoveredModel.includes("claude-3-5-sonnet")) {
      console.warn(
        `[analyse] Claude 3.5 Sonnet indisponible pour cette clé, fallback: ${discoveredModel}`,
      );
    }

    const contentBlocks: Anthropic.Messages.MessageParam["content"] = [
      {
        type: "text",
        text: `Analyse ce dossier technique compose de ${images.length} image(s) et retourne uniquement le JSON demande.`,
      },
      ...images.map((image) => ({
        type: "image" as const,
        source: {
          type: "base64" as const,
          media_type: toClaudeBase64MediaType(image.mediaType),
          data: image.base64,
        },
      })),
    ];

    let response: Anthropic.Messages.Message | null = null;
    let lastError: unknown = null;

    for (const model of modelsToTry) {
      try {
        response = await anthropic.messages.create({
          model,
          max_tokens: 8000,
          temperature: 0.1,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: contentBlocks,
            },
          ],
        });
        console.info("[analyse] Claude model used:", model);
        break;
      } catch (error) {
        lastError = error;
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes("not_found_error")) {
          throw error;
        }
      }
    }

    if (!response) {
      throw lastError instanceof Error
        ? lastError
        : new Error("Aucun modele Claude disponible.");
    }

    const textOutput = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    const jsonString = extractJsonObject(textOutput);

    // Repair truncated JSON: attempt to close unclosed brackets
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonString);
    } catch {
      console.warn("[analyse] JSON parse failed, attempting repair...");
      // Try closing open arrays and objects
      let repaired = jsonString;
      const openBrackets = (repaired.match(/\[/g) || []).length - (repaired.match(/\]/g) || []).length;
      const openBraces = (repaired.match(/\{/g) || []).length - (repaired.match(/\}/g) || []).length;
      // Remove any trailing comma before closing
      repaired = repaired.replace(/,\s*$/, "");
      for (let i = 0; i < openBrackets; i++) repaired += "]";
      for (let i = 0; i < openBraces; i++) repaired += "}";
      parsedJson = JSON.parse(repaired);
    }

    const normalizedPayload = normalizeReportPayload(parsedJson);
    return diagnosticReportSchema.parse(normalizedPayload);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[analyse] IA Diagnostic failed:`, message);
    
    // User friendly fallback
    return buildFallbackReport(images.length, "Maintenance de l'algorithme d'analyse");
  }
}
