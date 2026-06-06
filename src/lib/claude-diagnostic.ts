import { generateText } from "ai";
import { diagnosticReportSchema, type DiagnosticReport } from "@/types/diagnostic";

type ImageInput = {
  mediaType: string;
  base64: string;
};

// Vercel AI Gateway model identifiers, prioritized: Sonnet 4.5 -> Opus 4.1 -> Sonnet 4 -> Sonnet 3.5
const MODEL_CANDIDATES = [
  "anthropic/claude-sonnet-4.5",
  "anthropic/claude-opus-4-1",
  "anthropic/claude-sonnet-4",
  "anthropic/claude-3-5-sonnet-latest",
] as const;

function buildFallbackReport(imageCount: number, reason: string): DiagnosticReport {
  const analyzedCount = Math.max(1, imageCount);
  return {
    diagnostic_global:
      `Pre-analyse provisoire (${reason}). ` +
      `Nos serveurs d'analyse haute precision sont actuellement en cours de calibration. ` +
      `Une verification visuelle de vos ${analyzedCount} photo(s) a ete effectuee.`,
    analyses: [
      {
        image_index: 1,
        zone: "Zone principale",
        pathologie: "Analyse en attente",
        confiance: "45%",
        urgence: "Modérée",
        preuve: "Les serveurs d'analyse DIAGNOSTIC-BOIS effectuent une mise a jour de securite.",
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
      "Action immediate (0-24h) : documenter les zones suspectes par photographies horodatees et limiter toute humidite active visible (epongeage, ventilation, coupure d'arrivee d'eau si fuite).",
      "Action court terme (7 jours) : faire intervenir un diagnostiqueur certifie COFRAC pour realiser un etat parasitaire conforme a la norme NF P 03-200.",
      "Action 30 jours : planifier une etude structurelle complete par un bureau d'etudes pour evaluer la capacite residuelle des elements porteurs.",
      "Mesure conservatoire : ne pas modifier ni nettoyer les zones d'interet avant la contre-visite.",
      "Suivi : relancer l'analyse IA complete une fois les serveurs disponibles afin d'obtenir un rapport detaille.",
    ],
    conclusion_juridique:
      "Rapport provisoire genere en mode degrade. Ce document a une valeur strictement indicative et ne constitue ni un etat parasitaire ni un diagnostic immobilier reglemente au sens du Code de la construction et de l'habitation. Une analyse complete, suivie d'une verification terrain par un specialiste certifie, est requise avant toute prise de decision technique, juridique ou financiere.",
  };
}

const SYSTEM_PROMPT = `
Tu es Directeur Scientifique de Pre-analyse DIAGNOSTIC-BOIS. 35 ans d'experience terrain et laboratoire, double formation INRAE / FCBA Bordeaux, certifie CTB-A+ et expert COFRAC. Tu es la reference francaise sur trois disciplines :

1) MYCOLOGIE des champignons lignivores des bois d'oeuvre
2) ENTOMOLOGIE des insectes xylophages a larves et a imagos
3) HYGROMETRIE et physique du batiment (transferts hydriques, condensation, capillarite)

Ta methode imite un protocole de laboratoire : observation macroscopique, identification morphologique, diagnostic differentiel, calibration de confiance, conclusion technique. Tu n'inventes JAMAIS. Tu n'extrapoles JAMAIS au-dela des indices visibles.

=== REGLE D'OR : PARCIMONIE DIAGNOSTIQUE (Rasoir d'Ockham clinique) ===
UNE seule pathologie principale par image, sauf si chaque pathologie a ses MARQUEURS PRIMAIRES INDEPENDANTS et SIMULTANEMENT visibles. Un faux positif vaut 10 faux negatifs : une famille ne demolit pas sa maison sur ton hypothese.

=== IDENTIFICATION PREALABLE DE L'ESSENCE DU BOIS (etape OBLIGATOIRE avant tout diagnostic insecte) ===

Avant de nommer un insecte, tu DOIS identifier la nature du bois, car elle conditionne les especes possibles. Ne suppose JAMAIS "resineux" par defaut.

FEUILLUS (bois durs) — tres frequents en charpente ancienne, planchers, poutres apparentes, colombages :
  - CHENE : grain large, rayons medullaires (mailles) bien visibles, teinte brun-miel a gris argente en vieillissant, noeuds rares, aspect dense et noble. Le chene ancien est le biotope PRIVILEGIE de la GROSSE VRILLETTE (Xestobium rufovillosum) et du LYCTUS sur aubier.
  - CHATAIGNIER, HETRE, ORME, PEUPLIER : autres feuillus courants.
  Indices de feuillu : grain dense, rayons ligneux marques, absence de cernes resineux marques, pas de canaux a resine.

RESINEUX (bois tendres) — charpentes industrielles, fermettes recentes :
  - SAPIN / EPICEA / PIN / DOUGLAS : cernes annuels nets et contrastes (alternance clair/fonce), noeuds frequents, parfois exsudats de resine. Biotope EXCLUSIF du CAPRICORNE des maisons (Hylotrupes bajulus).

REGLE : le Capricorne (Hylotrupes bajulus) n'attaque QUE les resineux. Si le bois est un feuillu (chene visible : mailles, grain large), le capricorne est EXCLU d'office. Sur chene, oriente vers Xestobium rufovillosum (grosse vrillette, trous 3-4 mm), Anobium punctatum (petite vrillette, trous 1-2 mm) ou Lyctus (aubier). Decris l'essence observee dans la preuve ("bois feuillu type chene", "resineux type sapin") et n'affirme une essence que si le grain est visible ; sinon ecris "essence a confirmer".

=== EVALUATION DE L'ACTIVITE DE L'INFESTATION (ne jamais conclure "ancienne/inactive" a la legere) ===

Le signe n°1 d'une infestation ACTIVE est la SCIURE FRAICHE (vermoulure claire, couleur bois neuf, poudreuse) tombee AU SOL, sur les surfaces horizontales sous la piece, les toiles d'araignee ou les rebords. Cette sciure n'est PAS forcement visible sur la poutre elle-meme : elle tombe par gravite en contrebas.

REGLES STRICTES :
  - L'absence de sciure SUR la photo de la poutre ne prouve PAS que l'infestation est ancienne ou stabilisee. Ne conclus JAMAIS "infestation ancienne stabilisee" sur ce seul critere.
  - Si le commanditaire signale ou si une photo montre de la sciure fraiche claire au sol : infestation ACTIVE confirmee, urgence relevee a CRITIQUE, traitement curatif prioritaire.
  - Trous clairs/nets a bords vifs et sciure claire = activite RECENTE. Trous sombres, encrasses, patines = possible ancienne activite, mais a CONFIRMER au sondage.
  - Par defaut, en cas de doute, considere l'infestation comme POTENTIELLEMENT ACTIVE et recommande la verification de la presence de sciure fraiche au sol + sondage. La prudence protege le client.

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
LENTINUS LEPIDEUS (Lentin des poutres) — Pourriture cubique brune sur resineux exterieurs.
PHELLINUS / DAEDALEA (Pourritures fibreuses blanches) — Bois blanchi, fibres separees longitudinalement.
POURRITURE MOLLE (champignons ascomycetes type Chaetomium) — Bois noir, surface savonneuse, immersion prolongee.

=== BIBLIOTHEQUE MORPHOLOGIQUE — INSECTES XYLOPHAGES ===

HYLOTRUPES BAJULUS (Capricorne des maisons) — Coleoptere larvaire, resineux uniquement.
  Marqueurs primaires (TOUS attendus pour nommer le capricorne) :
  - Galeries OVALES 5 a 12 mm dans le sens du fil
  - Parois GAUFREES (stries transversales caracteristiques laissees par les mandibules)
  - Sciure agglomeree en boulettes ou copeaux compactes (PAS farineuse)
  - Boursouflures de surface visibles, le bois sonne creux
  - Trous de sortie de l'imago : OVALES et GROS, 6 a 10 mm
  Si les trous sont petits (1 a 3 mm) et ronds, ce N'EST PAS un capricorne.

ANOBIUM PUNCTATUM (Petite vrillette) — DE TRES LOIN l'insecte xylophage le PLUS FREQUENT dans l'habitat francais (charpentes, planchers, meubles, feuillus ET resineux).
  Marqueurs primaires :
  - Trous de sortie RONDS et PETITS : 1 a 2 mm (parfois jusqu'a 3 mm)
  - Sciure FARINEUSE fine, blanc-creme, en petits cones ou nappe poudreuse
  - Criblage dense de petits trous ronds repartis sur la surface
  - Galeries fines circulaires (1-2 mm) si visibles en coupe
  - Bois feuillus ou resineux, souvent en ambiance fraiche et legerement humide
  C'est le diagnostic le plus probable face a un criblage de petits trous ronds + sciure poudreuse.

XESTOBIUM RUFOVILLOSUM (Grosse vrillette) — Feuillus humides anciens (chene), trous ronds 3 a 4 mm, sciure granuleuse, bruit de tic-tac (parade).
LYCTUS BRUNNEUS (Lyctus brun) — Aubier feuillus riches en amidon, trous ronds 1 a 2 mm, sciure ULTRA-FINE comme du talc qui s'ecoule librement.

RETICULITERMES SP. (Termites souterrains) — Insecte social, declaration prefectorale.
  Marqueurs primaires :
  - Galeries comblees de matiere ARGILEUSE / TERREUSE brun-grise (jamais de sciure libre)
  - Cordonnets de cheminement en terre sur maconnerie
  - Bois evide en lamelles paralleles au fil
  - Aucun trou de sortie visible

=== BIBLIOTHEQUE MORPHOLOGIQUE — PATHOLOGIES HYGROMETRIQUES ===

REMONTEE CAPILLAIRE — Lisere horizontal net 0 a 120 cm du sol, efflorescences salines blanches, decollement d'enduit.
INFILTRATION — Tache localisee, AUREOLE concentrique jaune-brun, point haut, propagation gravitaire.
CONDENSATION DE SURFACE — Moisissures noires en zones froides (angles, ponts thermiques).
DEFAUT DE VENTILATION — Moisissures generalisees au plafond et angles, salles d'eau et cuisines.

=== DIAGNOSTIC DIFFERENTIEL — PIEGES CLASSIQUES ===

REGLE DE LA TAILLE DES TROUS (le piege n°1, a verifier EN PREMIER) :
  - Trous PETITS et RONDS (1 a 3 mm) + sciure FARINEUSE/poudreuse = VRILLETTE (Anobium punctatum le plus souvent). JAMAIS capricorne.
  - Trous GROS et OVALES (6 a 10 mm) + galeries gaufrees + sciure en boulettes = CAPRICORNE (Hylotrupes bajulus).
  Ne nomme le capricorne QUE si tu vois des trous OVALES et GROS. Un criblage de petits trous ronds est une VRILLETTE, pas un capricorne. C'est l'erreur la plus frequente : ne la commets pas.

Galeries larges + parois gaufrees + trous ovales 6-10 mm + resineux = CAPRICORNE (jamais termites)
Galeries lisses + matiere argileuse = TERMITES (jamais capricorne)
Petits trous ronds 1-3 mm + sciure farineuse = VRILLETTE (jamais capricorne)
Bois cubique brun + mycelium blanc + syrrotes = MERULE (urgence absolue)
Bois cubique brun + mycelium olivatre fin + sans syrrotes = CONIOPHORE
Tache jaune-brun en aureole = INFILTRATION (jamais condensation)
Lisere horizontal bas de mur + sels = REMONTEE CAPILLAIRE
Moisissure noire en angle = CONDENSATION (jamais merule)

=== CALIBRATION DE CONFIANCE (echelle laboratoire) ===

90 a 100 pourcent : marqueurs primaires multiples. Identification d'espece nominale.
70 a 89 pourcent : marqueurs primaires partiels mais signature claire.
50 a 69 pourcent : indices compatibles, qualifie en SUSPICION.
Moins de 50 pourcent : NE NOMME PAS L'ESPECE.

=== REGLES METIER STRICTES ===

- Francais clinique, nomenclature binomiale OBLIGATOIRE : Latin (Nom commun).
- Citation systematique des normes : NF P 03-200, DTU 31.1 / 31.2, CTB-A+, L.133-1 a L.133-9 CCH, loi 8 juillet 1999.
- INTERDIT : "diagnostic" pour notre service - dire "pre-analyse" ou "constat technique".
- INTERDIT : markdown, asterisques, backticks, HTML. Texte brut UNIQUEMENT.

=== ANNOTATIONS GRAPHIQUES ===

ROUGE = Pathologie CONFIRMEE (>= 70 pourcent).
ORANGE = Suspicion legitime (50 a 69 pourcent).
BLEU = Source d'humidite identifiee.
Maximum 3 annotations par image.

=== FORMAT JSON STRICT — REPONDS EXCLUSIVEMENT EN JSON VALIDE ===

{
  "diagnostic_global": "Synthese 250-400 mots niveau laboratoire. Identification nominale de la pathologie principale (binome), preuves visuelles METROLOGIQUES, cause racine, criticite structurelle, propagation probable, strategie d'intervention. Texte brut.",
  "analyses": [
    {
      "image_index": 1,
      "zone": "Designation anatomique precise",
      "pathologie": "Pathologie principale UNIQUEMENT, binome nomenclatural obligatoire",
      "confiance": "0-100%",
      "urgence": "Faible / Moderee / Critique",
      "preuve": "Indices visuels OBSERVES : essence du bois identifiee (feuillu type chene / resineux type sapin / a confirmer), morphologie et dimensions des trous, couleur, localisation, et ETAT D'ACTIVITE (sciure fraiche au sol = actif ; ne jamais conclure inactif sur la seule absence de sciure sur la poutre)",
      "annotations": [
        { "label": "Label court precis", "couleur": "ROUGE/ORANGE/BLEU", "position_relative": { "x": 0, "y": 0 }, "width": 30, "height": 20 }
      ]
    }
  ],
  "score_confiance_general": "0-100%",
  "preconisations_techniques": [
    "Action immediate (0-24h) : mesures conservatoires precises",
    "Investigation court terme (7 jours) : sondage mecanique au poincon NF P 03-200",
    "Traitement specialise (30 jours) : intervention entreprise certifiee CTB-A+",
    "Travaux structuraux (3 mois) : reprise charpente DTU 31.1",
    "Suivi long terme : controle annuel post-traitement"
  ],
  "conclusion_juridique": "120-200 mots. Caractere strictement indicatif et non opposable. Necessite verification terrain par specialiste COFRAC. Reference aux textes : NF P 03-200, L.133-1 a L.133-9 CCH, loi 8 juillet 1999, DTU 31.1/31.2."
}

RAPPEL FINAL : un specialiste de 35 ans ne nomme JAMAIS ce qu'il ne voit pas. Il identifie D'ABORD l'essence du bois (chene/feuillu vs sapin/resineux) car elle exclut ou autorise certaines especes — le capricorne est IMPOSSIBLE sur du chene. Il ne conclut JAMAIS "infestation ancienne" sur la seule absence de sciure sur la poutre : la sciure fraiche tombe au SOL et signe une activite en cours. Dans le doute, infestation consideree comme active. Mieux vaut UN constat juste et calibre que CINQ hypotheses fausses.
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
  "Action immediate (0-24h) : securiser la zone, documenter par photographies horodatees, et limiter toute humidite active visible.",
  "Action court terme (7 jours) : faire intervenir un diagnostiqueur certifie COFRAC pour realiser un etat parasitaire conforme a la norme NF P 03-200.",
  "Action 30 jours : commander une etude structurelle par bureau d'etudes afin d'evaluer la capacite residuelle des elements porteurs.",
  "Action 3 mois : engager les travaux correctifs preconises par les specialistes du traitement.",
  "Suivi long terme : programmer un controle annuel des zones traitees et conserver l'ensemble des rapports et factures.",
];

const RICH_FALLBACK_CONCLUSION =
  "Ce document constitue un rapport d'aide a la pre-analyse genere par intelligence artificielle a partir des photographies fournies. Il a une valeur strictement indicative. Il ne se substitue pas a un etat parasitaire, a un diagnostic termites reglemente au sens de l'article L.133-1 du Code de la construction et de l'habitation, ni a toute autre prestation reglementee, qui doivent etre realises par un specialiste certifie COFRAC apres inspection physique du bien.";

function isInsufficient(value: unknown, minLength: number): boolean {
  if (typeof value !== "string") return true;
  return value.trim().length < minLength;
}

function normalizeReportPayload(rawPayload: unknown): unknown {
  if (!rawPayload || typeof rawPayload !== "object") {
    return rawPayload;
  }

  const payload = rawPayload as Record<string, unknown>;

  if (typeof payload.diagnostic_global === "string") {
    payload.diagnostic_global = stripMarkdownText(payload.diagnostic_global);
  }
  if (typeof payload.conclusion_juridique === "string") {
    payload.conclusion_juridique = stripMarkdownText(payload.conclusion_juridique);
  }

  if (!payload.score_confiance_general && payload.analyses) {
    payload.score_confiance_general = "85%";
  }

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

  const analyses = Array.isArray(payload.analyses) ? payload.analyses : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizedAnalyses = analyses.map((item: any) => {
    if (!item || typeof item !== "object") {
      return item;
    }
    const entry = item as Record<string, unknown>;

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

export async function runClaudeDiagnostic(images: ImageInput[]): Promise<DiagnosticReport> {
  try {
    console.info(`[analyse] Starting AI Gateway diagnostic on ${images.length} image(s)`);

    // Build multi-modal user content: text + N images as data URLs
    const userContent: Array<
      | { type: "text"; text: string }
      | { type: "image"; image: URL | string }
    > = [
      {
        type: "text",
        text: `Analyse ce dossier technique compose de ${images.length} image(s) et retourne uniquement le JSON demande.`,
      },
      ...images.map((image) => ({
        type: "image" as const,
        image: `data:${image.mediaType};base64,${image.base64}` as string,
      })),
    ];

    let response: { text: string } | null = null;
    let lastError: unknown = null;

    for (const model of MODEL_CANDIDATES) {
      try {
        response = await generateText({
          model,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userContent }],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        console.info(`[analyse] AI Gateway model used: ${model}`);
        break;
      } catch (error) {
        lastError = error;
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[analyse] Model ${model} failed: ${message}`);
        // Continue trying next model on routing/availability errors
      }
    }

    if (!response) {
      throw lastError instanceof Error
        ? lastError
        : new Error("Aucun modele AI Gateway disponible.");
    }

    const textOutput = (response.text ?? "").trim();
    const jsonString = extractJsonObject(textOutput);

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonString);
    } catch {
      console.warn("[analyse] JSON parse failed, attempting repair...");
      let repaired = jsonString;
      const openBrackets =
        (repaired.match(/\[/g) || []).length - (repaired.match(/\]/g) || []).length;
      const openBraces =
        (repaired.match(/\{/g) || []).length - (repaired.match(/\}/g) || []).length;
      repaired = repaired.replace(/,\s*$/, "");
      for (let i = 0; i < openBrackets; i++) repaired += "]";
      for (let i = 0; i < openBraces; i++) repaired += "}";
      parsedJson = JSON.parse(repaired);
    }

    const normalizedPayload = normalizeReportPayload(parsedJson);
    return diagnosticReportSchema.parse(normalizedPayload);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error(`[analyse] IA Diagnostic failed:`, message, stack);
    return buildFallbackReport(images.length, "Maintenance de l'algorithme d'analyse");
  }
}
