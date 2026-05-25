import React from "react";
import { createHash } from "node:crypto";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  renderToBuffer,
} from "@react-pdf/renderer";
import { DiagnosticReport } from "@/types/diagnostic";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Helvetica",
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  contentPadding: {
    padding: 40,
    flex: 1,
  },
  // Typography
  h1: { fontSize: 28, fontWeight: "bold", color: "#0f172a", letterSpacing: -1, marginBottom: 5 },
  h2: { fontSize: 13, fontWeight: "bold", color: "#0f172a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 5 },
  text: { fontSize: 9, lineHeight: 1.6, color: "#334155" },
  bold: { fontWeight: "bold" },
  
  // Header / Footer
  header: {
    height: 70,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  headerBrand: { color: "#0f172a", fontSize: 14, fontWeight: "bold", letterSpacing: 1 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    fontSize: 7,
    color: "#94a3b8",
  },

  // Cover Page
  cover: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 60,
  },
  coverBadge: {
    borderColor: "#10b981",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  coverBadgeText: { color: "#10b981", fontSize: 8, fontWeight: "bold" },
  coverLine: { width: 60, height: 4, backgroundColor: "#0f172a", marginBottom: 30 },
  coverClient: {
    borderLeftWidth: 2,
    borderLeftColor: "#10b981",
    paddingLeft: 25,
    marginTop: 40,
  },
  coverLabel: { color: "#94a3b8", fontSize: 8, textTransform: "uppercase", marginBottom: 6, letterSpacing: 0.5 },
  coverValue: { color: "#0f172a", fontSize: 13, marginBottom: 20, fontWeight: "bold" },

  // Dashboard Gauges
  gaugeContainer: { flexDirection: "row", gap: 15, marginBottom: 30, marginTop: 10 },
  gauge: {
    flex: 1,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
  },
  gaugeNum: { fontSize: 26, fontWeight: "bold", marginBottom: 4 },
  gaugeLabel: { fontSize: 8, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 0.5 },

  // Cards
  card: {
    backgroundColor: "#fcfcfc",
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 25,
  },

  // Photo Section (Technical Sheet Style)
  evidenceBox: {
    marginBottom: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#fafafa",
    position: "relative",
  },
  evidenceMeta: {
    padding: 15,
    backgroundColor: "#ffffff",
  },
  techDetail: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#cbd5e1",
  },

  // Annotations
  box: { position: "absolute", borderWidth: 2, borderRadius: 2 },
  boxTag: {
    position: "absolute",
    top: -16,
    left: -2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 7,
    fontWeight: "bold",
    color: "#ffffff",
    borderRadius: 2,
  },
  dot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    marginLeft: -10,
  },

  // Table
  table: { width: "100%", marginTop: 5, borderRadius: 6, overflow: "hidden", borderWidth: 1, borderColor: "#f1f5f9" },
  th: { flexDirection: "row", backgroundColor: "#f8fafc", padding: 10 },
  thText: { color: "#64748b", fontSize: 8, fontWeight: "bold", textTransform: "uppercase" },
  tr: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#f1f5f9", padding: 10, backgroundColor: "#ffffff" },
  td: { fontSize: 8.5, color: "#1e293b" },

  // Action Plan
  actionItem: { flexDirection: "row", gap: 12, marginBottom: 12, alignItems: "flex-start" },
  actionBullet: { width: 18, height: 18, borderRadius: 4, backgroundColor: "#f1f5f9", color: "#0f172a", fontSize: 8, fontWeight: "bold", textAlign: "center", lineHeight: 18 },

  // Traceability block on cover
  traceabilityBlock: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },
  traceabilityTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  traceabilityRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  traceabilityKey: {
    fontSize: 7,
    color: "#94a3b8",
    fontWeight: "bold",
    textTransform: "uppercase",
    width: 130,
  },
  traceabilityValue: {
    fontSize: 8,
    color: "#0f172a",
    fontFamily: "Courier",
    flex: 1,
  },

  // Traceability table on dedicated page
  ledgerCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 10,
    marginBottom: 8,
  },
  ledgerCardTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  ledgerRow: {
    flexDirection: "row",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  ledgerKey: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#475569",
    textTransform: "uppercase",
    width: 150,
  },
  ledgerValue: {
    fontSize: 8,
    color: "#0f172a",
    fontFamily: "Courier",
    flex: 1,
    flexWrap: "wrap",
  },

  // Next step card
  nextStepBox: {
    marginTop: 14,
    marginBottom: 18,
    padding: 18,
    backgroundColor: "#ecfdf5",
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  nextStepLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#047857",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  nextStepTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  nextStepText: {
    fontSize: 9,
    color: "#1f2937",
    lineHeight: 1.5,
  },

  // Insurance usage card
  insuranceBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#2563eb",
  },
  insuranceTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1e40af",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  insuranceText: {
    fontSize: 8,
    color: "#1e293b",
    lineHeight: 1.5,
  },

  // Disclaimer
  disclaimerBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fffbeb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fbbf24",
  },
  disclaimerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  disclaimerText: {
    fontSize: 8,
    color: "#78350f",
    lineHeight: 1.5,
  },

  // Signature Block
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 20,
  },
  signatureBox: {
    width: "48%",
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minHeight: 120,
  },
  signatureTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  signatureSub: {
    fontSize: 7,
    color: "#64748b",
    marginBottom: 15,
  },
  signatureLine: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    borderTopColor: "#cbd5e1",
    paddingTop: 4,
    fontSize: 7,
    color: "#94a3b8",
    textAlign: "center",
  },
});

const FRENCH_PARTICLES = new Set([
  "de",
  "du",
  "des",
  "la",
  "le",
  "les",
  "l",
  "d",
  "et",
  "en",
  "au",
  "aux",
  "sur",
  "sous",
  "par",
  "pour",
  "chez",
  "lès",
]);

function titleCase(input: string | null | undefined): string {
  if (!input) return "";
  const value = input.trim();
  if (!value) return "";
  if (value !== value.toLowerCase() && value !== value.toUpperCase()) {
    return value;
  }
  const segments = value.toLowerCase().split(/(\s|-|')/);
  let wordIndex = 0;
  return segments
    .map((segment) => {
      if (!segment) return segment;
      if (/^[\s\-']+$/.test(segment)) return segment;
      const isFirstWord = wordIndex === 0;
      wordIndex += 1;
      if (!isFirstWord && FRENCH_PARTICLES.has(segment)) {
        return segment;
      }
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join("");
}

function stripMarkdown(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_{2}(.+?)_{2}/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

const RICH_FALLBACK_PRECONISATIONS: string[] = [
  "Action immédiate (0-24h) : sécuriser la zone, documenter par photographies horodatées, et limiter toute humidité active visible (épongeage, ventilation, coupure d'arrivée d'eau si fuite).",
  "Action court terme (7 jours) : faire intervenir un diagnostiqueur certifié COFRAC pour réaliser un état parasitaire conforme à la norme NF P 03-200 (sondage mécanique, mesure d'humidité par humidimètre, prélèvement éventuel pour analyse mycologique).",
  "Action 30 jours : commander une étude structurelle par bureau d'études afin d'évaluer la capacité résiduelle des éléments porteurs et définir un plan de traitement curatif (CTB-A+) ou de remplacement partiel.",
  "Action 3 mois : engager les travaux correctifs préconisés par les spécialistes (traitement xylophages/fongicides, reprise de couverture, traitement de l'humidité structurelle).",
  "Suivi long terme : programmer un contrôle annuel des zones traitées et conserver l'ensemble des rapports et factures pour traçabilité (assurance, transaction, contentieux).",
];

const RICH_FALLBACK_CONCLUSION =
  "Ce document constitue un rapport d'aide à la pré-analyse généré par intelligence artificielle à partir des photographies fournies. Il a une valeur strictement indicative. Il ne se substitue pas à un état parasitaire, à un diagnostic termites réglementé au sens de l'article L.133-1 du Code de la construction et de l'habitation, ni à toute autre prestation réglementée, qui doivent être réalisés par un spécialiste certifié COFRAC après inspection physique du bien. Une vérification terrain par un spécialiste qualifié est impérative avant toute prise de décision technique, juridique ou financière. DIAGNOSTIC-BOIS décline toute responsabilité quant à l'usage de ce document dans le cadre d'une transaction immobilière ou d'un litige.";

function ensureRichPreconisations(items: string[] | undefined | null): string[] {
  const cleaned = (items ?? [])
    .map((item) => stripMarkdown(item).trim())
    .filter((item) => item.length >= 30);
  return cleaned.length >= 3 ? cleaned : RICH_FALLBACK_PRECONISATIONS;
}

function ensureRichConclusion(value: string | undefined | null): string {
  const cleaned = stripMarkdown(value).trim();
  return cleaned.length >= 80 ? cleaned : RICH_FALLBACK_CONCLUSION;
}

type NextStepSeverity = "critical" | "moderate" | "low";

type NextStepContent = {
  severity: NextStepSeverity;
  label: string;
  title: string;
  body: string;
  borderColor: string;
};

function computeNextStep(critical: number, moderate: number): NextStepContent {
  if (critical > 0) {
    return {
      severity: "critical",
      label: "Action requise sous 7 jours",
      title: "Faites établir un diagnostic immobilier réglementé par un spécialiste certifié COFRAC",
      body:
        "L'analyse a détecté une ou plusieurs pathologies de niveau critique. Avant toute prise de décision (achat, vente, travaux, déclaration assurantielle), il est impératif de faire réaliser un état parasitaire conforme à la norme NF P 03-200 par un diagnostiqueur certifié COFRAC, avec sondage mécanique et mesure d'humidité au point. Seule cette prestation réglementée a une valeur opposable.",
      borderColor: "#dc2626",
    };
  }
  if (moderate > 0) {
    return {
      severity: "moderate",
      label: "Action recommandée sous 30 jours",
      title: "Consultez un diagnostiqueur certifié pour confirmer l'état du bien",
      body:
        "L'analyse a relevé un ou plusieurs désordres modérés à surveiller. Pour sécuriser une transaction immobilière ou planifier un traitement curatif adapté, il est recommandé de faire intervenir un diagnostiqueur certifié COFRAC pour une inspection physique complète. Lui seul est habilité à produire un état parasitaire opposable.",
      borderColor: "#ea580c",
    };
  }
  return {
    severity: "low",
    label: "Suivi périodique conseillé",
    title: "Programmez une surveillance annuelle de votre bien",
    body:
      "L'analyse n'a pas révélé de pathologie majeure sur les images soumises. Pour conserver la fiabilité de cet état des lieux, mettez en place une surveillance annuelle de votre charpente, caves et points sensibles. En cas de doute ou avant toute transaction, faites valider l'absence de désordres par un diagnostiqueur certifié COFRAC.",
    borderColor: "#0891b2",
  };
}

const PARIS_DATETIME_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "medium",
  timeZone: "Europe/Paris",
});

function formatParisDateTime(value: Date): string {
  return PARIS_DATETIME_FORMATTER.format(value);
}

function formatIsoUtc(value: Date): string {
  return value.toISOString();
}

function computeReportFingerprint(
  sessionId: string,
  report: DiagnosticReport,
  generatedAt: Date,
): { full: string; short: string } {
  const canonical = JSON.stringify({
    sessionId,
    diagnostic_global: report.diagnostic_global,
    analyses: report.analyses,
    score_confiance_general: report.score_confiance_general,
    preconisations_techniques: report.preconisations_techniques,
    conclusion_juridique: report.conclusion_juridique,
    generatedAt: generatedAt.toISOString(),
  });
  const full = createHash("sha256").update(canonical).digest("hex").toUpperCase();
  const short = `${full.slice(0, 4)}-${full.slice(4, 8)}-${full.slice(8, 12)}-${full.slice(12, 16)}`;
  return { full, short };
}

const PageHeader = ({ refId }: { refId: string }) => (
  <View fixed style={styles.header}>
    <View>
      <Text style={styles.headerBrand}>ACO<Text style={{ color: "#10b981" }}>-HABITAT</Text></Text>
      <Text style={{ color: "#94a3b8", fontSize: 7, marginTop: 2 }}>DIRECTION TECHNIQUE — PRÉ-ANALYSE PAR IMAGE</Text>
    </View>
    <View style={{ alignItems: "flex-end" }}>
      <Text style={{ color: "#64748b", fontSize: 8, fontWeight: "bold" }}>FICHE TECHNIQUE DE PRÉ-ANALYSE</Text>
      <Text style={{ color: "#0f172a", fontSize: 10, fontWeight: "bold" }}>REF #{refId}</Text>
    </View>
  </View>
);

const PageFooter = ({
  generatedAtLabel,
  fingerprintShort,
}: {
  generatedAtLabel: string;
  fingerprintShort: string;
}) => (
  <View fixed style={styles.footer}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 7 }}>
        Rapport d&apos;aide à la pré-analyse Haute Précision — DIAGNOSTIC-BOIS — Document non opposable
      </Text>
      <Text style={{ fontSize: 6, color: "#94a3b8", marginTop: 1 }}>
        Horodaté le {generatedAtLabel} - Empreinte {fingerprintShort}
      </Text>
    </View>
    <Text
      style={{ fontWeight: "bold", fontSize: 8 }}
      render={({ pageNumber, totalPages }) => `PAGE ${pageNumber} / ${totalPages}`}
    />
  </View>
);

export const DiagnosticReportPdf = ({
  session,
  report,
}: {
  session: any;
  report: DiagnosticReport;
}) => {
  const refId = session.id.slice(0, 8).toUpperCase();
  const createdAt = new Date(session.createdAt);
  const images = session.images || [];
  const clientName = titleCase(session.clientName) || "Non renseigné";
  const clientAddress = titleCase(session.clientAddress) || "Pré-analyse à distance";

  const generatedAt = new Date();
  const generatedAtLabel = formatParisDateTime(generatedAt);
  const generatedAtIso = formatIsoUtc(generatedAt);
  const fingerprint = computeReportFingerprint(session.id, report, generatedAt);
  const docId = `ACO-${createdAt.getFullYear()}-${refId}-${fingerprint.short.replace(/-/g, "")}`;

  const counts = report.analyses.reduce(
    (acc, a) => {
      if (a.urgence === "Critique") acc.c++;
      else if (a.urgence === "Modérée") acc.m++;
      else acc.l++;
      return acc;
    },
    { c: 0, m: 0, l: 0 }
  );

  const nextStep = computeNextStep(counts.c, counts.m);

  const renderPhotoWithDetails = (img: any, index: number) => {
    const matching = report.analyses.filter(a => (a as any).image_index === index + 1);
    const base64Clean = img.base64.replace(/\s/g, '');
    
    return (
      <View style={styles.evidenceBox} key={index} wrap={false}>
        {/* L'image en grand */}
        <View style={styles.imageContainer}>
          <Image src={Buffer.from(base64Clean, 'base64')} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          {matching.flatMap(a => (a.annotations || []).map((ann, ai) => {
            const color = ann.couleur === "ROUGE" ? "#ef4444" : ann.couleur === "ORANGE" ? "#f59e0b" : "#3b82f6";
            if (ann.width && ann.height) {
              return (
                <View key={ai} style={[styles.box, { 
                  top: `${ann.position_relative.y}%`, left: `${ann.position_relative.x}%`, width: `${ann.width}%`, height: `${ann.height}%`, borderColor: color 
                }]}>
                  <View style={[styles.boxTag, { backgroundColor: color }]}><Text>{ann.label}</Text></View>
                </View>
              );
            }
            return (
              <View key={ai} style={[styles.dot, { top: `${ann.position_relative.y}%`, left: `${ann.position_relative.x}%`, backgroundColor: color }]}>
                <Text style={{ fontSize: 9, color: "#fff", fontWeight: "bold" }}>!</Text>
              </View>
            );
          }))}
        </View>

        {/* Le bloc de texte descriptif dessous pour combler le vide */}
        <View style={styles.evidenceMeta}>
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#0f172a", marginBottom: 6 }}>
            PIÈCE JUSTIFICATIVE #{index + 1}
          </Text>
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#0f172a",
              borderRadius: 4,
              marginBottom: 8,
              maxWidth: "100%",
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 7, fontWeight: "bold", lineHeight: 1.3 }}>
              ZONE : {stripMarkdown(matching[0]?.zone || "NC").toUpperCase()}
            </Text>
          </View>

          {matching.map((m, mi) => (
            <View key={mi} style={styles.techDetail}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0f172a", flexShrink: 1, marginRight: 8 }}>
                  Pathologie : {stripMarkdown(m.pathologie)}
                </Text>
                <Text style={{ fontSize: 8, fontWeight: "bold", color: m.urgence === "Critique" ? "#ef4444" : "#1e293b" }}>
                  {m.urgence.toUpperCase()}
                </Text>
              </View>
              <Text style={{ fontSize: 8.5, color: "#475569", lineHeight: 1.4, fontStyle: "italic" }}>
                Constat de spécialiste : {stripMarkdown(m.preuve)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Document title={`Rapport DIAGNOSTIC-BOIS ${refId}`}>
      {/* PAGE 1: COVER */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <View style={styles.coverBadge}><Text style={styles.coverBadgeText}>RAPPORT D&apos;INSPECTION PAR IMAGE — DIAGNOSTIC-BOIS</Text></View>
          <Text style={styles.h1}>PRÉ-ANALYSE TECHNIQUE</Text>
          <View style={styles.coverLine} />
          <Text style={{ color: "#0f172a", fontSize: 16, letterSpacing: 1, fontWeight: "bold" }}>PATHOLOGIES DES BOIS ET HUMIDITÉ</Text>
          
          <View style={styles.coverClient}>
            <Text style={styles.coverLabel}>Commanditaire</Text>
            <Text style={styles.coverValue}>{clientName}</Text>

            <Text style={styles.coverLabel}>Adresse du Bien</Text>
            <Text style={styles.coverValue}>{clientAddress}</Text>

            <Text style={styles.coverLabel}>Référence</Text>
            <Text style={styles.coverValue}>{refId}</Text>

            <Text style={styles.coverLabel}>Date d&apos;analyse</Text>
            <Text style={styles.coverValue}>{createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>

          <View style={styles.traceabilityBlock}>
            <Text style={styles.traceabilityTitle}>Traçabilité du document</Text>
            <View style={styles.traceabilityRow}>
              <Text style={styles.traceabilityKey}>Identifiant</Text>
              <Text style={styles.traceabilityValue}>{docId}</Text>
            </View>
            <View style={styles.traceabilityRow}>
              <Text style={styles.traceabilityKey}>Généré le</Text>
              <Text style={styles.traceabilityValue}>{generatedAtLabel} (Europe/Paris)</Text>
            </View>
            <View style={styles.traceabilityRow}>
              <Text style={styles.traceabilityKey}>Timestamp UTC</Text>
              <Text style={styles.traceabilityValue}>{generatedAtIso}</Text>
            </View>
            <View style={styles.traceabilityRow}>
              <Text style={styles.traceabilityKey}>Empreinte SHA-256</Text>
              <Text style={styles.traceabilityValue}>{fingerprint.short}</Text>
            </View>
          </View>
        </View>
        <PageFooter generatedAtLabel={generatedAtLabel} fingerprintShort={fingerprint.short} />
      </Page>

      {/* CONTINUOUS CONTENT PAGES */}
      <Page size="A4" style={[styles.page, { paddingBottom: 60, paddingTop: 70 }]} wrap>
        <PageHeader refId={refId} />
        <PageFooter generatedAtLabel={generatedAtLabel} fingerprintShort={fingerprint.short} />
        
        <View style={{ paddingHorizontal: 40, paddingTop: 20 }}>
          {/* SECTION: SYNTHÈSE */}
          <Text style={styles.h2}>Synthèse de l&apos;Analyse</Text>
          <View style={styles.card}>
            <Text style={styles.text}>{stripMarkdown(report.diagnostic_global)}</Text>
          </View>

          <Text style={styles.h2}>Indice de Gravité par Catégorie</Text>
          <View style={styles.gaugeContainer}>
            <View style={[styles.gauge, { borderColor: "#ef4444", backgroundColor: "#ffffff" }]}>
              <Text style={[styles.gaugeNum, { color: "#ef4444" }]}>{counts.c}</Text>
              <Text style={[styles.gaugeLabel, { color: "#ef4444" }]}>Critique</Text>
            </View>
            <View style={[styles.gauge, { borderColor: "#f59e0b", backgroundColor: "#ffffff" }]}>
              <Text style={[styles.gaugeNum, { color: "#f59e0b" }]}>{counts.m}</Text>
              <Text style={[styles.gaugeLabel, { color: "#f59e0b" }]}>Modérée</Text>
            </View>
            <View style={[styles.gauge, { borderColor: "#10b981", backgroundColor: "#ffffff" }]}>
              <Text style={[styles.gaugeNum, { color: "#10b981" }]}>{counts.l}</Text>
              <Text style={[styles.gaugeLabel, { color: "#10b981" }]}>Faible</Text>
            </View>
          </View>

          <View wrap={false}>
            <Text style={styles.h2}>Résumé des Observations Techniques</Text>
            <View style={styles.table}>
              <View style={styles.th}>
                <View style={{ width: "25%" }}><Text style={styles.thText}>Localisation</Text></View>
                <View style={{ width: "45%" }}><Text style={styles.thText}>Pathologie</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.thText}>Niveau de Risque</Text></View>
              </View>
              {report.analyses.map((a, i) => (
                <View key={i} style={styles.tr} wrap={false}>
                  <View style={{ width: "25%" }}><Text style={[styles.td, { fontWeight: "bold" }]}>{stripMarkdown(a.zone)}</Text></View>
                  <View style={{ width: "45%" }}><Text style={styles.td}>{stripMarkdown(a.pathologie)}</Text></View>
                  <View style={{ width: "30%" }}><Text style={[styles.td, { color: a.urgence === "Critique" ? "#ef4444" : "#1e293b", fontWeight: "bold" }]}>{a.urgence.toUpperCase()}</Text></View>
                </View>
              ))}
            </View>
          </View>

          {/* SECTION: PHOTOS */}
          <Text style={[styles.h2, { marginTop: 30 }]}>Documentation Visuelle & Analyses</Text>
          {images.map((img: any, i: number) => renderPhotoWithDetails(img, i))}

          {/* SECTION: RECOMMENDATIONS */}
          <View style={[styles.nextStepBox, { borderLeftColor: nextStep.borderColor, marginTop: 20 }]} wrap={false}>
            <Text style={styles.nextStepLabel}>Votre prochaine étape · {nextStep.label}</Text>
            <Text style={styles.nextStepTitle}>{nextStep.title}</Text>
            <Text style={styles.nextStepText}>{nextStep.body}</Text>
          </View>

          <Text style={styles.h2}>Préconisations et Actions Correctives</Text>
          <View style={styles.card}>
            {ensureRichPreconisations(report.preconisations_techniques).map((p, i) => (
              <View key={i} style={styles.actionItem} wrap={false}>
                <Text style={styles.actionBullet}>{i + 1}</Text>
                <Text style={[styles.text, { flex: 1 }]}>{p}</Text>
              </View>
            ))}
          </View>

          <View wrap={false}>
            <Text style={styles.h2}>Synthèse Technique de Conclusion</Text>
            <View style={{ paddingBottom: 20 }}>
              <Text style={[styles.text, { fontSize: 10 }]}>{ensureRichConclusion(report.conclusion_juridique)}</Text>
            </View>
          </View>

          <View style={styles.disclaimerBox} wrap={false}>
            <Text style={styles.disclaimerTitle}>Avertissement réglementaire</Text>
            <Text style={styles.disclaimerText}>
              Ce document est un <Text style={{ fontWeight: "bold" }}>rapport d&apos;aide à la pré-analyse Haute Précision</Text> à partir de photographies fournies par le commanditaire. Il a une valeur strictement informative et indicative.
            </Text>
            <Text style={[styles.disclaimerText, { marginTop: 6 }]}>
              Il <Text style={{ fontWeight: "bold" }}>ne se substitue pas</Text> à un état parasitaire, un diagnostic termites réglementé (article L.133-1 du CCH) ou tout autre diagnostic immobilier réglementé, qui doivent être réalisés par un spécialiste certifié COFRAC, assuré en responsabilité civile professionnelle, après inspection physique du bien.
            </Text>
            <Text style={[styles.disclaimerText, { marginTop: 6 }]}>
              DIAGNOSTIC-BOIS décline toute responsabilité quant à l&apos;usage de ce document dans le cadre d&apos;une transaction immobilière, d&apos;un litige ou d&apos;une décision technique. Une vérification terrain par un spécialiste qualifié est <Text style={{ fontWeight: "bold" }}>impérative</Text> avant toute action corrective.
            </Text>
          </View>

          {/* Bloc de Signature Formel */}
          <View style={styles.signatureSection} wrap={false}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureTitle}>LE COMMANDITAIRE</Text>
              <Text style={styles.signatureSub}>Lu et approuvé — Bon pour accord</Text>
              <Text style={{ fontSize: 9, color: "#0f172a", marginBottom: 10, fontWeight: "bold" }}>{clientName}</Text>
              <Text style={styles.signatureLine}>Signature numérique ou manuscrite</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureTitle}>DIAGNOSTIC-BOIS</Text>
              <Text style={styles.signatureSub}>Direction technique — Analyse Haute Précision</Text>
              <Text style={{ fontSize: 9, color: "#10b981", marginBottom: 10, fontWeight: "bold" }}>SENIOR SPECIALIST</Text>
              <Text style={styles.signatureLine}>Document généré automatiquement</Text>
            </View>
          </View>

          {/* SECTION: AUDIT (Forces a new page logically if needed, but flows otherwise) */}
          <View break>
            <Text style={[styles.h2, { marginBottom: 8 }]}>Registre d&apos;Audit et Traçabilité Cryptographique</Text>
            <Text style={[styles.text, { fontSize: 8, marginBottom: 10 }]}>
              Cette page consigne l&apos;ensemble des éléments d&apos;horodatage et d&apos;intégrité du présent rapport. L&apos;empreinte SHA-256 est calculée à partir de l&apos;intégralité des données d&apos;analyse et de l&apos;identifiant de session ; toute altération du contenu invaliderait l&apos;empreinte.
            </Text>
          </View>

          <View style={styles.ledgerCard} wrap={false}>
            <Text style={styles.ledgerCardTitle}>Identification du document</Text>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Identifiant document</Text>
              <Text style={styles.ledgerValue}>{docId}</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Référence courte</Text>
              <Text style={styles.ledgerValue}>{refId}</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Identifiant session</Text>
              <Text style={styles.ledgerValue}>{session.id}</Text>
            </View>
            <View style={[styles.ledgerRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.ledgerKey}>Type de document</Text>
              <Text style={styles.ledgerValue}>Rapport d&apos;aide à la pré-analyse IA</Text>
            </View>
          </View>

          <View style={styles.ledgerCard} wrap={false}>
            <Text style={styles.ledgerCardTitle}>Horodatage</Text>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Date d&apos;analyse</Text>
              <Text style={styles.ledgerValue}>{formatParisDateTime(createdAt)} (Europe/Paris)</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Date de génération</Text>
              <Text style={styles.ledgerValue}>{generatedAtLabel} (Europe/Paris)</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Timestamp UTC ISO 8601</Text>
              <Text style={styles.ledgerValue}>{generatedAtIso}</Text>
            </View>
            <View style={[styles.ledgerRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.ledgerKey}>Timestamp Unix (ms)</Text>
              <Text style={styles.ledgerValue}>{generatedAt.getTime()}</Text>
            </View>
          </View>

          <View style={styles.ledgerCard} wrap={false}>
            <Text style={styles.ledgerCardTitle}>Empreinte cryptographique</Text>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Algorithme</Text>
              <Text style={styles.ledgerValue}>SHA-256</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Empreinte courte</Text>
              <Text style={[styles.ledgerValue, { fontWeight: "bold" }]}>{fingerprint.short}</Text>
            </View>
            <View style={[styles.ledgerRow, { borderBottomWidth: 0, flexDirection: "column", paddingTop: 4 }]}>
              <Text style={[styles.ledgerKey, { width: "100%", marginBottom: 3 }]}>Empreinte complète (64 caractères hex)</Text>
              <Text style={[styles.ledgerValue, { fontSize: 7 }]}>{fingerprint.full}</Text>
            </View>
          </View>

          <View style={styles.ledgerCard} wrap={false}>
            <Text style={styles.ledgerCardTitle}>Statistiques d&apos;analyse</Text>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Photos analysées</Text>
              <Text style={styles.ledgerValue}>{images.length}</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Constats générés</Text>
              <Text style={styles.ledgerValue}>{report.analyses.length}</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={styles.ledgerKey}>Score de confiance global</Text>
              <Text style={styles.ledgerValue}>{report.score_confiance_general}</Text>
            </View>
            <View style={[styles.ledgerRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.ledgerKey}>Niveaux critiques détectés</Text>
              <Text style={[styles.ledgerValue, { color: counts.c > 0 ? "#ef4444" : "#0f172a", fontWeight: "bold" }]}>{counts.c}</Text>
            </View>
          </View>

          <View style={styles.insuranceBox} wrap={false}>
            <Text style={styles.insuranceTitle}>Usage assurantiel</Text>
            <Text style={styles.insuranceText}>
              Ce document, horodaté cryptographiquement le <Text style={{ fontWeight: "bold" }}>{generatedAtLabel}</Text> sous l&apos;empreinte SHA-256 <Text style={{ fontWeight: "bold" }}>{fingerprint.short}</Text>, peut être joint à un dossier de déclaration de sinistre afin d&apos;établir une date certaine d&apos;observation des désordres et constituer une pièce d&apos;antériorité.
            </Text>
            <Text style={[styles.insuranceText, { marginTop: 4 }]}>
              Il ne se substitue pas à l&apos;expertise contradictoire diligentée par votre assureur, qui demeure seule habilitée à chiffrer les dommages et à engager la garantie.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export async function generateDiagnosticPdfBuffer(session: any, report: DiagnosticReport): Promise<Buffer> {
  return renderToBuffer(<DiagnosticReportPdf session={session} report={report} />);
}
