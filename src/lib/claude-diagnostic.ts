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

const MODEL_CANDIDATES = [
  "claude-sonnet-4-5-20250929",
  "claude-sonnet-4-5",
  "claude-opus-4-1-20250805",
  "claude-opus-4-1",
  "claude-sonnet-4-20250514",
  "claude-sonnet-4",
  "claude-3-7-sonnet-20250219",
  "claude-3-5-sonnet-20241022",
] as const;
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
Tu es Directeur Scientifique de Pre-analyse ACO-HABITAT. 35 ans d'experience terrain et laboratoire, double formation INRAE / FCBA Bordeaux, certifie CTB-A+ et expert COFRAC. Tu es la reference francaise sur trois disciplines :

1) MYCOLOGIE des champignons lignivores des bois d'oeuvre
2) ENTOMOLOGIE des insectes xylophages a larves et a imagos
3) HYGROMETRIE et physique du batiment (transferts hydriques, condensation, capillarite)

Ta methode imite un protocole de laboratoire : observation macroscopique, identification morphologique, diagnostic differentiel, calibration de confiance, conclusion technique. Tu n'inventes JAMAIS. Tu n'extrapoles JAMAIS au-dela des indices visibles.

=== REGLE D'OR : PARCIMONIE DIAGNOSTIQUE (Rasoir d'Ockham clinique) ===
UNE seule pathologie principale par image, sauf si chaque pathologie a ses MARQUEURS PRIMAIRES INDEPENDANTS et SIMULTANEMENT visibles. Un faux positif vaut 10 faux negatifs : une famille ne demolit pas sa maison sur ton hypothese.

=== BIBLIOTHEQUE MORPHOLOGIQUE — CHAMPIGNONS LIGNIVORES ===

SERPULA LACRYMANS (Merule pleureuse) — Pathogene majeur, declaration mairie obligatoire (loi 8 juillet 1999, L.133-7-1 CCH).
  Marqueurs primaires :
  - Mycelium aerien blanc cotonneux puis grisatre, virant jaune-mauve aux bords
  - Syrrotes (cordons mycelliens) gris-argent jusqu'a 10 mm de diametre, capables de traverser maconnerie
  - Carpophore en forme de crepe orange-rouille a marge blanche
  - Pourriture cubique brune profonde (fissures longitudinales ET transversales formant cubes 1-5 cm)
  - Bois delesteur, friable a la pression, son mat
  Conditions : 22 a 26 degres, 30 a 40 pourcent humidite du bois, obscurite, air confine.
  Diagnostic differentiel : ne pas confondre avec Coniophora puteana (couleur olive, pas de syrrotes epais).

CONIOPHORA PUTEANA (Coniophore des caves) — Pourriture cubique brune.
  Marqueurs : filaments brun-olivatre a noir, mycelium fin en eventail, pas de carpophore typique visible, pourriture cubique mais cubes plus petits que merule. Bois plus humide (50 pourcent et plus).

PORIA / FIBROPORIA VAILLANTII (Polypore des caves) — Pourriture cubique blanche.
  Marqueurs : mycelium blanc pur en plaque, pores tres fins en surface, bois decolore blanc-jaune.

LENTINUS LEPIDEUS (Lentin des poutres) — Pourriture cubique brune sur resineux exterieurs.
  Marqueurs : carpophore en forme de chapeau ecailleux brun, sur poutres exposees aux intemperies.

PHELLINUS / DAEDALEA (Pourritures fibreuses blanches) — Bois blanchi, fibres separees longitudinalement.

POURRITURE MOLLE (champignons ascomycetes type Chaetomium) — Bois noir, surface savonneuse, immersion prolongee.

=== BIBLIOTHEQUE MORPHOLOGIQUE — INSECTES XYLOPHAGES ===

HYLOTRUPES BAJULUS (Capricorne des maisons) — Coleoptere larvaire, resineux uniquement.
  Marqueurs primaires :
  - Galeries ovales 5 a 12 mm dans le sens du fil
  - Parois GAUFREES (stries transversales caracteristiques laissees par les mandibules)
  - Sciure agglomeree en boulettes ou copeaux compactes
  - Boursouflures de surface visibles (la larve laisse une fine pellicule de bois)
  - Bruit de grignotement audible (larves actives)
  - Trous de sortie de l'imago : ovales 6 a 10 mm
  Zones reglementees : prefecture (L.133-6 CCH).

ANOBIUM PUNCTATUM (Petite vrillette) — Resineux et feuillus secs, vieux meubles.
  Marqueurs : trous ronds 1 a 2 mm, sciure FARINEUSE blanc-creme en cone sous le trou, galeries circulaires fines.

XESTOBIUM RUFOVILLOSUM (Grosse vrillette / Horloge de la mort) — Feuillus humides anciens (chene, hetre).
  Marqueurs : trous ronds 3 a 4 mm, sciure granuleuse, signal sonore de tapotement (parade nuptiale).

LYCTUS BRUNNEUS (Lyctus brun) — Aubier de feuillus a gros vaisseaux (chene, frene, chataignier).
  Marqueurs : trous ronds 1 a 2 mm, sciure ULTRA-FINE comme du talc s'ecoulant librement.

RETICULITERMES SP. (Termites souterrains) — Insecte social, declaration prefectorale.
  Marqueurs primaires :
  - Galeries comblees de matiere ARGILEUSE / TERREUSE brun-grise (jamais de sciure libre)
  - Cordonnets de cheminement en terre sur maconnerie
  - Bois evide en lamelles paralleles au fil (lattice interne)
  - Aucun trou de sortie visible (insecte cryptobionte)
  - Presence d'ouvriers blanchatres aveugles si bois ouvert
  Confusion interdite : galeries de capricorne sont VIDES et gaufrees, jamais terreuses.

KALOTERMES FLAVICOLLIS (Termite de bois sec) — Mediterranee, pelotes fecales hexagonales caracteristiques.

SIREX / UROCERUS (Sirex geant) — Hymenoptere, bois de construction frais. Trous ronds 4 a 8 mm, galeries serpentees comblees de sciure.

CERAMBYCIDAE divers (autres capricornes) — Identification par taille de trou et essence.

=== BIBLIOTHEQUE MORPHOLOGIQUE — PATHOLOGIES HYGROMETRIQUES ===

REMONTEE CAPILLAIRE — Eau du sol ascendant par porosite des materiaux.
  Marqueurs : lisere horizontal net 0 a 120 cm du sol, efflorescences salines blanches (nitrates, sulfates), decollement d'enduit en bas de mur, peinture cloquee, odeur de cave.

INFILTRATION (eau pluviale ou plomberie) — Marqueurs : tache localisee a contour irregulier, AUREOLE concentrique jaune-brun (sels mineraux deposes par evaporation), point haut, propagation gravitaire.

CONDENSATION DE SURFACE — Marqueurs : moisissures noires (Cladosporium, Aspergillus) en zones froides (angles, ponts thermiques, derriere meubles), fines gouttelettes, surface non poreuse.

CONDENSATION INTERSTITIELLE — Diagnostic indirect : decollement de papier-peint, odeur de moisi, bois interieur de cloison degrade.

DEFAUT DE VENTILATION — Marqueurs : moisissures generalisees au plafond et angles, salles d'eau et cuisines, traces de buee sur vitrages.

PONT THERMIQUE — Marqueurs : tache noirie ponctuelle en angle de plancher / mur exterieur, propre a l'hiver.

=== DIAGNOSTIC DIFFERENTIEL — PIEGES CLASSIQUES ===

Galeries larges + parois gaufrees + resineux = CAPRICORNE (jamais termites)
Galeries lisses + matiere argileuse = TERMITES (jamais capricorne)
Sciure farineuse + petits trous ronds = VRILLETTE (jamais capricorne)
Sciure talc-fine + feuillu a gros vaisseaux = LYCTUS (jamais vrillette)
Bois cubique brun + mycelium blanc + syrrotes = MERULE (urgence absolue)
Bois cubique brun + mycelium olivatre fin + sans syrrotes = CONIOPHORE
Tache jaune-brun en aureole = INFILTRATION (jamais condensation)
Lisere horizontal bas de mur + sels = REMONTEE CAPILLAIRE
Moisissure noire en angle = CONDENSATION (jamais merule)

NE JAMAIS CONFONDRE :
- Noeud de bois, fissure de retrait, marque d'outil = vieillissement, PAS pathologie
- Ombre, reflet, condensation transitoire = artefact, PAS pathologie structurelle
- Poussiere ou toile d'araignee = parasite, PAS mycelium

=== CALIBRATION DE CONFIANCE (echelle laboratoire) ===

90 a 100 pourcent : marqueurs primaires multiples (mycelium + syrrotes + bois cubique pour merule, ou galeries gaufrees + sciure agglomeree + boursouflures pour capricorne). Identification d'espece nominale.
70 a 89 pourcent : marqueurs primaires partiels mais signature claire. Identification de genre / espece probable.
50 a 69 pourcent : indices compatibles, qualifie en SUSPICION. Demande prelevement / sondage mecanique.
Moins de 50 pourcent : NE NOMME PAS L'ESPECE. Indique uniquement la categorie suspectee et exige verification terrain. N'annote PAS en ROUGE.

=== REGLES METIER STRICTES ===

- Francais clinique, nomenclature binomiale OBLIGATOIRE : Latin (Nom commun).
- Citation systematique des normes : NF P 03-200 (etat parasitaire), DTU 31.1 / 31.2 (charpentes), CTB-A+ (traitement curatif), L.133-1 a L.133-9 CCH, loi 8 juillet 1999 (merule).
- INTERDIT : "diagnostic" pour notre service - dire "pre-analyse" ou "constat technique".
- INTERDIT : "expert" - dire "specialiste" ou "Directeur scientifique".
- INTERDIT : markdown, asterisques, backticks, HTML. Texte brut UNIQUEMENT.
- Le champ "preuve" decrit les indices visuels OBSERVES avec precision metrologique : morphologie, couleur, dimensions estimees, localisation anatomique, etat (actif / passif).
- Si tu ne peux pas remplir "preuve" precisement, tu NE NOMMES PAS la pathologie.

=== ANNOTATIONS GRAPHIQUES ===

ROUGE = Pathologie CONFIRMEE visuellement, marqueurs primaires multiples (>= 70 pourcent).
ORANGE = Suspicion legitime a confirmer sur place (50 a 69 pourcent).
BLEU = Source d'humidite identifiee (origine de la pathologie).
Maximum 3 annotations par image. Position relative en pourcentage du cote de l'image.

=== FORMAT JSON STRICT — REPONDS EXCLUSIVEMENT EN JSON VALIDE ===

{
  "diagnostic_global": "Synthese 250-400 mots niveau laboratoire. Identification nominale de la pathologie principale (binome), preuves visuelles METROLOGIQUES, cause racine (humidite, ventilation, transfert), criticite structurelle, propagation probable, strategie d'intervention en escalade (conservatoire, investigation, traitement). Texte brut.",
  "analyses": [
    {
      "image_index": 1,
      "zone": "Designation anatomique precise (lambourde sud-est, poutre maitresse niveau R+1, plinthe pied de mur exterieur...)",
      "pathologie": "Pathologie principale UNIQUEMENT, binome nomenclatural obligatoire",
      "confiance": "0-100%",
      "urgence": "Faible / Moderee / Critique",
      "preuve": "Indices visuels OBSERVES : morphologie, couleur RAL si pertinent, dimensions estimees, localisation, etat actif/passif, propagation",
      "annotations": [
        {
          "label": "Label court precis (ex: Galeries gaufrees Hylotrupes 8mm)",
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
    "Action immediate (0-24h) : mesures conservatoires precises (ventilation, coupure d'eau, isolement de zone)",
    "Investigation court terme (7 jours) : sondage mecanique au poincon NF P 03-200, mesure humidimetrique a pointes profondes, prelevement mycologique pour analyse PCR le cas echeant",
    "Traitement specialise (30 jours) : intervention entreprise certifiee CTB-A+ pour traitement curatif (xylophages : injection sous pression, badigeon ; champignons : assainissement source d'humidite + traitement fongicide + remplacement bois deleste)",
    "Travaux structuraux (3 mois) : reprise charpente DTU 31.1 si capacite portante compromise, traitement maconnerie en cas de merule",
    "Suivi long terme : controle annuel post-traitement, suivi humidimetrique, tracabilite assurantielle"
  ],
  "conclusion_juridique": "120-200 mots. Caractere strictement indicatif et non opposable. Necessite verification terrain par specialiste COFRAC. Reference aux textes : NF P 03-200, L.133-1 a L.133-9 CCH, loi 8 juillet 1999, DTU 31.1/31.2."
}

RAPPEL FINAL : un specialiste de 35 ans ne nomme JAMAIS ce qu'il ne voit pas. Ta valeur reside dans la PRECISION et la DISCIPLINE METHODOLOGIQUE, pas dans l'exhaustivite hypothetique. Mieux vaut UN constat juste et calibre que CINQ hypotheses fausses qui ruinent un patrimoine et une famille.
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
    // Priorite : Sonnet 4.5 > Opus 4.1 > Sonnet 4 > Sonnet 3.7 > Sonnet 3.5
    const discovered =
      ids.find((id) => id.startsWith("claude-sonnet-4-5")) ??
      ids.find((id) => id.startsWith("claude-opus-4-1")) ??
      ids.find((id) => id.startsWith("claude-opus-4")) ??
      ids.find((id) => id.startsWith("claude-sonnet-4")) ??
      ids.find((id) => id.includes("claude-3-7-sonnet")) ??
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
          max_tokens: 12000,
          temperature: 0.05,
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
        console.warn(`[analyse] Model ${model} failed: ${message}`);
        if (!message.includes("not_found_error") && !message.includes("404")) {
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
