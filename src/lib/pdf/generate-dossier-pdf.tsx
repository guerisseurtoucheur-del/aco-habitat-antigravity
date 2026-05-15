import React from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type DossierWithConstats = Prisma.DossierGetPayload<{
  include: {
    constatsXylophages: {
      include: {
        photos: true;
      };
    };
  };
}>;

const styles = StyleSheet.create({
  page: { paddingTop: 32, paddingBottom: 42, paddingHorizontal: 28, fontSize: 10, color: "#0F172A" },
  footer: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 20,
    fontSize: 8,
    color: "#475569",
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerPage: { minWidth: 64, textAlign: "right" },
  coverBlock: {
    backgroundColor: "#0F172A",
    borderRadius: 6,
    padding: 20,
    marginBottom: 16,
  },
  coverLabel: { fontSize: 10, color: "#94A3B8", marginBottom: 6 },
  coverTitle: { fontSize: 21, color: "#FFFFFF", fontWeight: 700, marginBottom: 8 },
  coverSubtitle: { fontSize: 11, color: "#CBD5E1", lineHeight: 1.4 },
  badgeRow: { flexDirection: "row", gap: 8, marginTop: 12, flexWrap: "wrap" },
  badge: {
    backgroundColor: "#E2E8F0",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    color: "#0F172A",
  },
  section: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },
  sectionTitle: { fontSize: 13, marginBottom: 8, fontWeight: 700, color: "#0F172A" },
  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  row: { flexDirection: "row", gap: 8, marginBottom: 4, flexWrap: "wrap" },
  key: { fontWeight: 700, color: "#1E293B" },
  value: { color: "#0F172A" },
  photoBox: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    marginBottom: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  photoLabel: {
    backgroundColor: "#0F172A",
    color: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    fontWeight: 700,
  },
  photoCaption: { paddingHorizontal: 8, paddingVertical: 6, fontSize: 9, color: "#334155" },
  photoMissing: { padding: 10, color: "#64748B", fontSize: 9 },
  photoFrame: { position: "relative" },
  annotationPin: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#DC2626",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  annotationText: { color: "#FFFFFF", fontSize: 9, fontWeight: 700 },
  annotationHint: { paddingHorizontal: 8, paddingBottom: 6, fontSize: 8, color: "#64748B" },
  listItem: { marginBottom: 5, lineHeight: 1.35 },
  riskCritical: { color: "#B91C1C", fontWeight: 700 },
  riskModerate: { color: "#C2410C", fontWeight: 700 },
  riskLow: { color: "#166534", fontWeight: 700 },
  legalBox: {
    borderWidth: 1,
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  tocRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 5,
  },
  riskGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  riskCard: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#FFFFFF",
  },
  riskValue: { fontSize: 16, fontWeight: 700, marginBottom: 2 },
  riskLabel: { fontSize: 8, color: "#475569" },
  evidenceHeader: {
    flexDirection: "row",
    backgroundColor: "#0F172A",
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  evidenceCellHead: { color: "#FFFFFF", fontSize: 8, fontWeight: 700 },
  evidenceRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  evidenceCell: { fontSize: 8, color: "#0F172A" },
  colPin: { width: "10%" },
  colHash: { width: "32%" },
  colMime: { width: "18%" },
  colWeight: { width: "20%" },
  colDate: { width: "20%" },
  signatureGrid: { flexDirection: "row", gap: 10 },
  signatureCard: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    padding: 10,
    minHeight: 110,
    backgroundColor: "#FFFFFF",
  },
  signatureTitle: { fontSize: 10, fontWeight: 700, marginBottom: 8, color: "#0F172A" },
  signatureLine: { marginBottom: 5, fontSize: 9, color: "#334155" },
  glossaryTerm: { fontSize: 10, fontWeight: 700, color: "#0F172A", marginBottom: 3 },
  glossaryDef: { fontSize: 9, color: "#334155", marginBottom: 8, lineHeight: 1.35 },
});

const ANNOTATION_CODES = ["A", "B", "C", "D", "E", "F"];
const ANNOTATION_POSITIONS = [
  { top: 16, left: 16 },
  { top: 26, right: 18 },
  { bottom: 22, left: 24 },
  { bottom: 18, right: 22 },
  { top: 90, left: 110 },
  { top: 130, right: 120 },
];

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(value);
}

function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: "Europe/Paris",
  }).format(value);
}

function formatIso(value: Date): string {
  return value.toISOString();
}

function prettifyEnum(value: string): string {
  return value
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase())
    .join(" ");
}

function urgenceStyle(urgence: string | undefined) {
  const normalized = (urgence ?? "").toLowerCase();
  if (normalized.includes("crit")) return styles.riskCritical;
  if (normalized.includes("mod")) return styles.riskModerate;
  return styles.riskLow;
}

function PageFooter({ reference }: { reference: string }) {
  return (
    <View fixed style={styles.footer}>
      <Text>ACO-HABITAT — Pré-analyse pathologique IA — Document non opposable sans validation par un spécialiste</Text>
      <Text style={styles.footerPage} render={({ pageNumber, totalPages }) => `Dossier ${reference} — Page ${pageNumber}/${totalPages}`} />
    </View>
  );
}

function getAnnotationPinStyle(index: number) {
  return ANNOTATION_POSITIONS[index % ANNOTATION_POSITIONS.length];
}

function ReportDocument({
  dossier,
  photoDataUriById,
}: {
  dossier: DossierWithConstats;
  photoDataUriById: Record<string, string | null>;
}) {
  const generatedAt = new Date();
  const analyses = Array.isArray(dossier.analysesIaJson)
    ? (dossier.analysesIaJson as Array<Record<string, unknown>>)
    : [];
  const preconisations = Array.isArray(dossier.preconisationsIaJson)
    ? (dossier.preconisationsIaJson as Array<unknown>).map((item) => String(item))
    : [];
  const totalPhotos = dossier.constatsXylophages.reduce((acc, current) => acc + current.photos.length, 0);
  const urgencyCounts = analyses.reduce<{ critical: number; moderate: number; low: number }>(
    (acc, current) => {
      const urgence = String(current.urgence ?? "").toLowerCase();
      if (urgence.includes("crit")) acc.critical += 1;
      else if (urgence.includes("mod")) acc.moderate += 1;
      else acc.low += 1;
      return acc;
    },
    { critical: 0, moderate: 0, low: 0 },
  );

  const photoEvidenceRows = dossier.constatsXylophages.flatMap((constat) =>
    constat.photos.map((photo, index) => ({
      pin: `${ANNOTATION_CODES[index] ?? "Z"}${constat.ordre}`,
      hash: photo.hashSha256,
      mime: photo.mimeType,
      bytes: Number(photo.tailleBytes),
      uploadedAt: photo.uploadedAt,
    })),
  );

  return (
    <Document title={`Rapport ${dossier.reference}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.coverBlock}>
          <Text style={styles.coverLabel}>PRÉ-ANALYSE PATHOLOGIQUE — RAPPORT TECHNIQUE</Text>
          <Text style={styles.coverTitle}>Pré-analyse multimodale assistée par IA</Text>
          <Text style={styles.coverSubtitle}>
            Document de travail technique consolidant les constats relatifs aux pathologies biologiques et
            physiques (xylophages, champignons lignivores, humidité), avec synthèse IA structurée.
            À valider par le spécialiste signataire avant exploitation.
          </Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>Dossier : {dossier.reference}</Text>
            <Text style={styles.badge}>Inspection : {formatDate(dossier.inspecteLe)}</Text>
            <Text style={styles.badge}>Statut : {prettifyEnum(dossier.statut)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identité du client et du bien</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.key}>Nom du client :</Text>
              <Text style={styles.value}>{dossier.commanditaireNom || "Non renseigné"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Adresse du bien :</Text>
              <Text style={styles.value}>{dossier.adresseBien || "Non renseignée"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Adresse email :</Text>
              <Text style={styles.value}>{dossier.commanditaireEmail || "Non renseignée"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Téléphone :</Text>
              <Text style={styles.value}>{dossier.commanditaireTelephone || "Non renseigné"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sommaire</Text>
          <View style={styles.tocRow}>
            <Text>1. Synthèse exécutive et cadre de mission</Text>
            <Text>p.1</Text>
          </View>
          <View style={styles.tocRow}>
            <Text>2. Informations administratives du dossier</Text>
            <Text>p.2</Text>
          </View>
          <View style={styles.tocRow}>
            <Text>3. Constats techniques et photos annotées</Text>
            <Text>p.3+</Text>
          </View>
          <View style={styles.tocRow}>
            <Text>4. Matrice des risques et chaîne de preuve</Text>
            <Text>avant fin</Text>
          </View>
          <View style={styles.tocRow}>
            <Text>5. Synthèse IA et cadre réglementaire</Text>
            <Text>dernière page</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synthèse exécutive</Text>
          <Text style={styles.listItem}>
            {dossier.diagnosticGlobalIa ??
              "Synthèse non disponible. Relancer l'analyse IA pour enrichir la conclusion."}
          </Text>
          <View style={styles.row}>
            <Text style={styles.key}>Score de confiance IA :</Text>
            <Text style={styles.value}>{dossier.scoreConfianceIa ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Constats techniques :</Text>
            <Text style={styles.value}>{dossier.constatsXylophages.length}</Text>
            <Text style={styles.key}>Photos exploitées :</Text>
            <Text style={styles.value}>{totalPhotos}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cadre de mission</Text>
          <Text style={styles.listItem}>
            Le présent rapport constitue une pré-analyse technique assistée par IA, destinée à appuyer la
            décision du spécialiste signataire et à prioriser les actions correctives. Sa valeur opposable
            dépend de la validation par un professionnel certifié après inspection physique du bien.
          </Text>
          <Text style={styles.listItem}>
            Les conclusions sont formulées selon les constatations photographiques disponibles, complétées
            par les analyses structurées de l&apos;IA et par des préconisations de vérification complémentaire
            chaque fois que nécessaire.
          </Text>
        </View>
        <View style={styles.legalBox}>
          <Text style={styles.listItem}>
            <Text style={styles.key}>Horodatage de génération :</Text> {formatDateTime(generatedAt)}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.key}>Horodatage technique (UTC ISO) :</Text> {formatIso(generatedAt)}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.key}>Identifiant de preuve dossier :</Text> {dossier.id}
          </Text>
        </View>
        <PageFooter reference={dossier.reference} />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A — Désignation du bien et contexte</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.key}>Adresse du bien :</Text>
              <Text style={styles.value}>{dossier.adresseBien ?? "Non renseignée"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Date d&apos;inspection :</Text>
              <Text style={styles.value}>{formatDate(dossier.inspecteLe)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>B — Donneur d&apos;ordre / commanditaire</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.key}>Nom :</Text>
              <Text style={styles.value}>{dossier.commanditaireNom ?? "Non renseigné"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Email :</Text>
              <Text style={styles.value}>{dossier.commanditaireEmail ?? "Non renseigné"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Téléphone :</Text>
              <Text style={styles.value}>{dossier.commanditaireTelephone ?? "Non renseigné"}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>C — Conclusion immédiate (à valider)</Text>
          <View style={styles.legalBox}>
            <Text style={styles.listItem}>
              {dossier.conclusionJuridiqueIa ??
                "Conclusion IA non disponible. Vérification humaine requise avant diffusion."}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>D — Horodatage et traçabilité</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.key}>Date d&apos;inspection déclarée :</Text>
              <Text style={styles.value}>{formatDateTime(dossier.inspecteLe)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Date de génération du rapport :</Text>
              <Text style={styles.value}>{formatDateTime(generatedAt)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Timestamp UTC :</Text>
              <Text style={styles.value}>{formatIso(generatedAt)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Référence dossier :</Text>
              <Text style={styles.value}>{dossier.reference}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>ID unique dossier :</Text>
              <Text style={styles.value}>{dossier.id}</Text>
            </View>
          </View>
        </View>
        <PageFooter reference={dossier.reference} />
      </Page>

      {dossier.constatsXylophages.map((constat) => (
        <Page key={constat.id} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Constat #{constat.ordre}</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.key}>Famille :</Text>
                <Text style={styles.value}>{prettifyEnum(constat.famillePathologie)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Type :</Text>
                <Text style={styles.value}>{prettifyEnum(constat.typePathologie)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Activité :</Text>
                <Text style={styles.value}>{prettifyEnum(constat.activiteDiagnostic)}</Text>
                <Text style={styles.key}>Sondage :</Text>
                <Text style={styles.value}>{prettifyEnum(constat.degreInfestationSondage)}</Text>
              </View>
              <Text style={styles.listItem}>
                <Text style={styles.key}>Localisation :</Text> {constat.localisationStructurelle}
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.key}>Éléments touchés :</Text> {constat.elementsBoisTouches}
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.key}>Dégradations relevées :</Text> {constat.releveDegradationsStructurelles}
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.key}>Preuve matérielle :</Text> {constat.preuveMaterielle}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos et annotations techniques</Text>
            {constat.photos.length === 0 ? (
              <Text style={styles.photoMissing}>Aucune photo rattachée à ce constat.</Text>
            ) : (
              constat.photos.map((photo, index) => (
                <View key={photo.id} style={styles.photoBox}>
                  <Text style={styles.photoLabel}>
                    Photo {index + 1} — Annotation {ANNOTATION_CODES[index] ?? "Z"}
                  </Text>
                  {photoDataUriById[photo.id] ? (
                    <View style={styles.photoFrame}>
                      <Image
                        src={photoDataUriById[photo.id] as string}
                        style={{ width: "100%", height: 210, objectFit: "cover" }}
                      />
                      <View style={[styles.annotationPin, getAnnotationPinStyle(index)]}>
                        <Text style={styles.annotationText}>{ANNOTATION_CODES[index] ?? "Z"}</Text>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.photoMissing}>Image non disponible (fichier introuvable).</Text>
                  )}
                  <Text style={styles.photoCaption}>{photo.legendeTechnique}</Text>
                  <Text style={styles.annotationHint}>
                    Point {ANNOTATION_CODES[index] ?? "Z"} : repère visuel utilisé dans le constat technique.
                  </Text>
                </View>
              ))
            )}
            <Text style={styles.listItem}>
              Les annotations A/B/C permettent de relier chaque vue à la description technique du constat
              et aux preuves mobilisables dans la conclusion.
            </Text>
          </View>
          <PageFooter reference={dossier.reference} />
        </Page>
      ))}

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Matrice des risques</Text>
          <View style={styles.riskGrid}>
            <View style={styles.riskCard}>
              <Text style={[styles.riskValue, styles.riskCritical]}>{urgencyCounts.critical}</Text>
              <Text style={styles.riskLabel}>Niveaux critiques</Text>
            </View>
            <View style={styles.riskCard}>
              <Text style={[styles.riskValue, styles.riskModerate]}>{urgencyCounts.moderate}</Text>
              <Text style={styles.riskLabel}>Niveaux modérés</Text>
            </View>
            <View style={styles.riskCard}>
              <Text style={[styles.riskValue, styles.riskLow]}>{urgencyCounts.low}</Text>
              <Text style={styles.riskLabel}>Niveaux faibles</Text>
            </View>
          </View>
          <Text style={styles.listItem}>
            Priorité d&apos;action : traiter immédiatement les zones critiques, planifier les actions modérées
            sous 30 jours, puis consolider le suivi des zones faibles.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chaîne de preuve photographique</Text>
          <View style={styles.evidenceHeader}>
            <View style={styles.colPin}>
              <Text style={styles.evidenceCellHead}>Repère</Text>
            </View>
            <View style={styles.colHash}>
              <Text style={styles.evidenceCellHead}>Hash SHA-256</Text>
            </View>
            <View style={styles.colMime}>
              <Text style={styles.evidenceCellHead}>MIME</Text>
            </View>
            <View style={styles.colWeight}>
              <Text style={styles.evidenceCellHead}>Poids</Text>
            </View>
            <View style={styles.colDate}>
              <Text style={styles.evidenceCellHead}>Horodatage</Text>
            </View>
          </View>
          {photoEvidenceRows.length === 0 ? (
            <Text style={styles.photoMissing}>Aucune preuve photo disponible.</Text>
          ) : (
            photoEvidenceRows.slice(0, 14).map((item) => (
              <View key={`${item.pin}-${item.hash}`} style={styles.evidenceRow}>
                <View style={styles.colPin}>
                  <Text style={styles.evidenceCell}>{item.pin}</Text>
                </View>
                <View style={styles.colHash}>
                  <Text style={styles.evidenceCell}>{item.hash.slice(0, 18)}…</Text>
                </View>
                <View style={styles.colMime}>
                  <Text style={styles.evidenceCell}>{item.mime}</Text>
                </View>
                <View style={styles.colWeight}>
                  <Text style={styles.evidenceCell}>{Math.round(item.bytes / 1024)} Ko</Text>
                </View>
                <View style={styles.colDate}>
                  <Text style={styles.evidenceCell}>{formatDate(item.uploadedAt)}</Text>
                </View>
              </View>
            ))
          )}
          {photoEvidenceRows.length > 14 ? (
            <Text style={styles.annotationHint}>
              {photoEvidenceRows.length - 14} preuve(s) supplémentaire(s) non affichée(s) sur cette page.
            </Text>
          ) : null}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visa et signatures</Text>
          <Text style={styles.annotationHint}>
            La validité opposable de ce document dépend de la signature et de la certification
            (COFRAC ou équivalent) du professionnel signataire. Sans visa, ce rapport reste un
            document de pré-analyse à valeur strictement informative.
          </Text>
          <View style={styles.signatureGrid}>
            <View style={styles.signatureCard}>
              <Text style={styles.signatureTitle}>Visa du professionnel signataire</Text>
              <Text style={styles.signatureLine}>Nom : ______________________________</Text>
              <Text style={styles.signatureLine}>N° de certification : __________________</Text>
              <Text style={styles.signatureLine}>Date : ______________________________</Text>
              <Text style={styles.signatureLine}>Signature : __________________________</Text>
            </View>
            <View style={styles.signatureCard}>
              <Text style={styles.signatureTitle}>Validation cabinet / contre-visa</Text>
              <Text style={styles.signatureLine}>Nom : ______________________________</Text>
              <Text style={styles.signatureLine}>Fonction : ___________________________</Text>
              <Text style={styles.signatureLine}>Date : ______________________________</Text>
              <Text style={styles.signatureLine}>Cachet / Visa : ______________________</Text>
            </View>
          </View>
        </View>
        <PageFooter reference={dossier.reference} />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Annexe — Glossaire technique</Text>
          <Text style={styles.glossaryTerm}>Champignons lignivores</Text>
          <Text style={styles.glossaryDef}>
            Champignons dégradant les composants ligneux du bois (cellulose/lignine). Leur développement
            est favorisé par l&apos;humidité persistante et la faible ventilation.
          </Text>
          <Text style={styles.glossaryTerm}>Insectes xylophages</Text>
          <Text style={styles.glossaryDef}>
            Insectes dont les larves creusent des galeries dans le bois, pouvant provoquer des pertes
            de section mécanique et des désordres structurels progressifs.
          </Text>
          <Text style={styles.glossaryTerm}>Humidité structurelle</Text>
          <Text style={styles.glossaryDef}>
            Présence anormale d&apos;eau dans les éléments constructifs (capillarité, infiltration,
            condensation), augmentant le risque biologique et les dégradations des matériaux.
          </Text>
          <Text style={styles.glossaryTerm}>Sondage destructif / non destructif</Text>
          <Text style={styles.glossaryDef}>
            Méthode d&apos;investigation permettant d&apos;évaluer l&apos;état interne du bois et le degré
            d&apos;infestation, active ou ancienne.
          </Text>
          <Text style={styles.glossaryTerm}>Indice de confiance IA</Text>
          <Text style={styles.glossaryDef}>
            Indicateur probabiliste d&apos;aide à la décision. Il n&apos;écarte pas la vérification métier
            et ne se substitue pas à la responsabilité du professionnel signataire.
          </Text>
        </View>
        <PageFooter reference={dossier.reference} />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synthèse IA — Analyse par zone</Text>
          {analyses.length === 0 ? (
            <Text style={styles.listItem}>Aucune analyse IA détaillée disponible.</Text>
          ) : (
            analyses.map((item, index) => (
              <View key={`${String(item.zone ?? "zone")}-${index}`} style={styles.card}>
                <Text style={styles.listItem}>
                  <Text style={styles.key}>Zone :</Text> {String(item.zone ?? "N/A")}
                </Text>
                <Text style={styles.listItem}>
                  <Text style={styles.key}>Pathologie :</Text> {String(item.pathologie ?? "N/A")}
                </Text>
                <Text style={styles.listItem}>
                  <Text style={styles.key}>Confiance :</Text> {String(item.confiance ?? "N/A")} —{" "}
                  <Text style={urgenceStyle(String(item.urgence ?? ""))}>
                    Urgence {String(item.urgence ?? "N/A")}
                  </Text>
                </Text>
                <Text style={styles.listItem}>
                  <Text style={styles.key}>Preuve exploitée :</Text> {String(item.preuve ?? "N/A")}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préconisations techniques priorisées</Text>
          {preconisations.length === 0 ? (
            <Text style={styles.listItem}>Aucune préconisation IA disponible.</Text>
          ) : (
            preconisations.map((item, index) => (
              <Text key={`${item}-${index}`} style={styles.listItem}>
                {index + 1}. {item}
              </Text>
            ))
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cadre réglementaire (à valider)</Text>
          <View style={styles.legalBox}>
            <Text style={styles.listItem}>
              {dossier.conclusionJuridiqueIa ??
                "Aucune conclusion IA disponible. Validation par un professionnel certifié COFRAC requise."}
            </Text>
            <Text style={[styles.listItem, { marginTop: 6 }]}>
              <Text style={styles.key}>Avertissement :</Text> ce document est une pré-analyse assistée
              par IA. Il n&apos;a pas valeur de diagnostic immobilier réglementé au sens du Code de la
              construction et de l&apos;habitation et ne se substitue pas à un état parasitaire conforme
              à la norme NF P 03-200 réalisé par un spécialiste certifié COFRAC après inspection physique.
            </Text>
          </View>
        </View>
        <PageFooter reference={dossier.reference} />
      </Page>
    </Document>
  );
}

export async function generateDossierPdfBuffer(dossierId: string): Promise<Buffer> {
  const dossier = await prisma.dossier.findUniqueOrThrow({
    where: { id: dossierId },
    include: {
      constatsXylophages: {
        orderBy: { ordre: "asc" },
        include: {
          photos: { orderBy: { ordre: "asc" } },
        },
      },
    },
  });

  const photoDataUriById: Record<string, string | null> = {};
  for (const constat of dossier.constatsXylophages) {
    for (const photo of constat.photos) {
      try {
        const absolutePath = path.join(process.cwd(), "public", photo.storageKey);
        const bytes = await fs.readFile(absolutePath);
        photoDataUriById[photo.id] = `data:${photo.mimeType};base64,${bytes.toString("base64")}`;
      } catch {
        photoDataUriById[photo.id] = null;
      }
    }
  }

  return renderToBuffer(<ReportDocument dossier={dossier} photoDataUriById={photoDataUriById} />);
}
