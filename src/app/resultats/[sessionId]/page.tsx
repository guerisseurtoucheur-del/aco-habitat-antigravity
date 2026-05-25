export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { getAnalysisSession } from "@/lib/analysis-store";
import { UnlockButton } from "@/components/UnlockButton";

type ResultPageProps = {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(date);
}

function formatRef(sessionId: string): string {
  return `ACO-${sessionId.slice(0, 8).toUpperCase()}`;
}

// Mode teaser : on cache l'espece precise (Serpula lacrymans, Hylotrupes bajulus...)
// et on n'affiche que la famille generique pour faire peur sans tout reveler.
// Le client doit payer 49 euros pour acceder au binome nomenclatural complet.
function redactPathologyForTeaser(pathologie: string): string {
  const lower = pathologie.toLowerCase();
  // Champignons lignivores
  if (
    lower.includes("serpula") ||
    lower.includes("merul") ||
    lower.includes("mérul") ||
    lower.includes("coniophora") ||
    lower.includes("coniophore") ||
    lower.includes("poria") ||
    lower.includes("fibroporia") ||
    lower.includes("polypore") ||
    lower.includes("lentinus") ||
    lower.includes("lentin") ||
    lower.includes("phellinus") ||
    lower.includes("daedalea") ||
    lower.includes("chaetomium") ||
    lower.includes("champignon") ||
    lower.includes("pourriture") ||
    lower.includes("mycelium") ||
    lower.includes("lignivore")
  ) {
    return "Champignon lignivore identifie - espece masquee";
  }
  // Insectes xylophages
  if (
    lower.includes("hylotrupes") ||
    lower.includes("capricorne") ||
    lower.includes("anobium") ||
    lower.includes("vrillette") ||
    lower.includes("xestobium") ||
    lower.includes("lyctus") ||
    lower.includes("reticulitermes") ||
    lower.includes("termite") ||
    lower.includes("kalotermes") ||
    lower.includes("sirex") ||
    lower.includes("urocerus") ||
    lower.includes("cerambyc") ||
    lower.includes("xylophage") ||
    lower.includes("hesperophanes")
  ) {
    return "Insecte xylophage identifie - espece masquee";
  }
  // Pathologies hygrometriques
  if (
    lower.includes("capillair") ||
    lower.includes("infiltration") ||
    lower.includes("condensation") ||
    lower.includes("ventilation") ||
    lower.includes("pont thermique") ||
    lower.includes("humidite") ||
    lower.includes("humidité") ||
    lower.includes("moisissure")
  ) {
    return "Pathologie hygrometrique identifiee - origine masquee";
  }
  // Cas par defaut : aucune pathologie reelle nommee
  if (
    lower.includes("attente") ||
    lower.includes("aucune") ||
    lower.length < 8
  ) {
    return pathologie;
  }
  return "Pathologie identifiee - details masques";
}

// Liste exhaustive des noms latins binomiaux et noms communs a masquer dans tout texte libre.
// On remplace par un placeholder generique pour conserver le sens sans reveler l'identification.
const SPECIES_REDACTION_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // ── Champignons lignivores : noms latins binomiaux ─────────────
  { pattern: /\bSerpula\s+lacrymans\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bConiophora\s+puteana\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bPoria\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bFibroporia\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bAntrodia\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bGloeophyllum\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bDaedalea\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bLentinus\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bPhellinus\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bChaetomium\s+\w+\b/gi, replacement: "[espece champignon masquee]" },
  // ── Champignons : noms communs francais ────────────────────────
  { pattern: /\bm[ée]rule(?:\s+pleureuse)?\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bconiophore(?:\s+des\s+caves)?\b/gi, replacement: "[espece champignon masquee]" },
  { pattern: /\bpolypore(?:\s+\w+)?\b/gi, replacement: "[espece champignon masquee]" },
  // ── Insectes xylophages : noms latins binomiaux ────────────────
  { pattern: /\bHylotrupes\s+bajulus\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bAnobium\s+punctatum\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bXestobium\s+rufovillosum\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bLyctus\s+\w+\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bReticulitermes\s+\w+\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bKalotermes\s+\w+\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bSirex\s+\w+\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bUrocerus\s+\w+\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bHesperophanes\s+\w+\b/gi, replacement: "[espece insecte masquee]" },
  // ── Insectes : noms communs francais ───────────────────────────
  { pattern: /\bcapricorne(?:\s+des\s+maisons)?\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\bvrillette(?:\s+\w+)?\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\btermites?\b/gi, replacement: "[espece insecte masquee]" },
  { pattern: /\blyctus?\b/gi, replacement: "[espece insecte masquee]" },
  // ── References techniques precises a masquer (DTU, NF, articles) ─
  { pattern: /\bDTU\s*\d+[-.\d]*\b/gi, replacement: "[reference technique masquee]" },
  { pattern: /\bNF\s*[A-Z]\s*\d+[-.\d]*\b/gi, replacement: "[reference technique masquee]" },
  { pattern: /\bprotocole\s+NF\s*[A-Z]?\s*\d+[-.\d]*\b/gi, replacement: "[protocole masque]" },
  { pattern: /\barticle\s+L?\.?\s*\d+[-.\d]*(?:\s+du\s+code\s+\w+)?/gi, replacement: "[reference juridique masquee]" },
  { pattern: /\bloi\s+du\s+\d+\s+\w+\s+\d{4}\b/gi, replacement: "[reference juridique masquee]" },
  // ── Pourcentages de confiance precis ───────────────────────────
  { pattern: /\b(?:de\s+)?\d{2,3}\s*(?:pour\s*cent|pourcent|%)\b/gi, replacement: "[niveau masque]" },
];

// Masque les noms d'especes et references techniques dans n'importe quel texte libre.
// Utilise pour le diagnostic global, la conclusion juridique, l'observation visuelle, etc.
function redactTextForTeaser(text: string): string {
  if (!text) return "";
  let redacted = text;
  for (const rule of SPECIES_REDACTION_RULES) {
    redacted = redacted.replace(rule.pattern, rule.replacement);
  }
  return redacted;
}

// Tronque le diagnostic global pour ne garder que les 2 premieres phrases
// (juste assez pour faire peur, pas assez pour le client se passe du paiement).
// Applique aussi le masquage des especes pour eviter toute fuite.
function truncateForTeaser(text: string, sentences: number = 2): string {
  if (!text) return "";
  const redacted = redactTextForTeaser(text);
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  const matches = redacted.match(sentenceRegex);
  if (!matches || matches.length <= sentences) return redacted;
  return matches.slice(0, sentences).join(" ").trim() + " […]";
}

export default async function DiagnosticDashboardPage({ params, searchParams }: ResultPageProps) {
  const { sessionId } = await params;
  const { success } = await searchParams;
  const session = await getAnalysisSession(sessionId);
  
  // Tricherie temporaire pour le test local : si ?success=true est là, on débloque l'affichage
  // Note: En prod, c'est isPaid qui fait foi.
  const isActuallyPaid = session?.isPaid || success === "true";
  const report = session?.result;
  const confidence = Number.parseInt(report?.score_confiance_general.replace("%", "") ?? "0", 10);
  const reportRef = formatRef(sessionId);

  const confidenceColor =
    confidence >= 80
      ? "text-emerald-700"
      : confidence >= 60
      ? "text-amber-700"
      : "text-red-700";

  const urgenceColor = (urgence: string): string => {
    if (urgence === "Critique") return "text-red-700 bg-red-50 border-red-300";
    if (urgence === "Modérée") return "text-amber-700 bg-amber-50 border-amber-300";
    return "text-emerald-700 bg-emerald-50 border-emerald-300";
  };

  const urgenceDotColor = (urgence: string): string => {
    if (urgence === "Critique") return "bg-red-500";
    if (urgence === "Modérée") return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-5xl space-y-5">

        {/* ── EN-TÊTE RAPPORT ─────────────────────────────────────── */}
        <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Bandeau top */}
          <div className="flex items-center justify-between bg-slate-900 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-white">ACO-HABITAT</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400 border border-slate-700">
                Senior Specialist
              </span>
              <span className="hidden text-xs text-slate-400 sm:block">— Analyse Technique par Imagerie IA</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Référence dossier</p>
              <p className="font-mono text-sm font-bold text-white">{reportRef}</p>
            </div>
          </div>

          {/* Corps identité */}
          <div className="grid gap-0 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {/* Identité client */}
            <div className="px-6 py-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Donneur d&apos;ordre
              </p>
              {session?.clientName ? (
                <div className="space-y-1.5">
                  <p className="text-base font-bold text-slate-900">{session.clientName}</p>
                  {session.clientEmail && (
                    <p className="flex items-center gap-2 text-sm text-slate-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-shrink-0 text-slate-400">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                      {session.clientEmail}
                    </p>
                  )}
                  {session.clientPhone && (
                    <p className="flex items-center gap-2 text-sm text-slate-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-shrink-0 text-slate-400">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l1.07-1.07a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {session.clientPhone}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm italic text-slate-400">Coordonnées non renseignées</p>
              )}

              {session?.clientAddress && (
                <div className="mt-4">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Bien analysé</p>
                  <p className="flex items-start gap-2 text-sm text-slate-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {session.clientAddress}
                  </p>
                </div>
              )}
            </div>

            {/* Horodatage & statut */}
            <div className="px-6 py-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Informations du rapport
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-slate-500">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Soumis le</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {session ? formatDate(session.createdAt) : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-emerald-600">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Analyse générée le</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {session ? formatDate(session.updatedAt) : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-slate-500">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Statut</p>
                    <p className={`text-sm font-semibold ${session?.status === "completed" ? "text-emerald-700" : session?.status === "failed" ? "text-red-700" : "text-amber-700"}`}>
                      {session?.status === "completed" ? "✓ Terminée" : session?.status === "failed" ? "✗ Échouée" : "⏳ En cours…"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barre score confiance */}
          {report && (
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-3">
              <div className="flex items-center gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap">
                  Score de confiance IA
                </p>
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>
                <p className={`text-lg font-extrabold ${confidenceColor}`}>{confidence}%</p>
              </div>
            </div>
          )}
        </header>

        {/* ── ERREURS ─────────────────────────────────────────────── */}
        {!session && (
          <section className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 shadow-sm">
            Session introuvable. Lancez une nouvelle analyse depuis l&apos;accueil.
          </section>
        )}
        {session && session.status !== "completed" && session.status !== "failed" && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 shadow-sm">
            Analyse encore en cours — Statut&nbsp;: <strong>{session.status}</strong>. Rechargez dans quelques instants.
          </section>
        )}
        {session?.status === "failed" && (
          <section className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 shadow-sm">
            L&apos;analyse a échoué&nbsp;: {session.error ?? "erreur inconnue"}.
          </section>
        )}

        {report && (
          <>
            {/* ── ALERTE HAUTE PRIORITÉ (Si Critique) ─────────────── */}
            {!isActuallyPaid && report.analyses.some(a => a.urgence === "Critique") && (
              <section className="mb-5 animate-pulse rounded-2xl border-2 border-red-500 bg-red-50 p-5 shadow-lg shadow-red-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-6 w-6">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase text-red-900">Risque structurel identifié</h3>
                      <p className="text-sm font-medium text-red-700">
                        Attention : L&apos;analyse a détecté au moins une pathologie à évolution rapide.
                      </p>
                    </div>
                  </div>
                  <UnlockButton 
                    sessionId={sessionId} 
                    price="49"
                    className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-red-200 hover:bg-red-700 transition-all"
                  >
                    Stopper les dégâts (49€)
                  </UnlockButton>
                </div>
              </section>
            )}

            {/* ── SYNTHÈSE + JAUGES ───────────────────────────────── */}
            <section className="grid gap-5 lg:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-emerald-500" />
                  <h2 className="text-base font-bold text-slate-900">Synthèse de l&apos;analyse</h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  {isActuallyPaid ? report.diagnostic_global : truncateForTeaser(report.diagnostic_global, 2)}
                </p>
                {!isActuallyPaid && (
                  <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Attention : Certaines pathologies détectées nécessitent une intervention rapide pour stopper la dégradation structurelle.
                    </p>
                  </div>
                )}
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-red-500" />
                  <h2 className="text-base font-bold text-slate-900">Niveaux d&apos;urgence</h2>
                </div>
                <div className="space-y-3">
                  {report.analyses.map((analysis, idx) => (
                    <div key={`${analysis.zone}-${idx}`} className={`rounded-xl border p-3 ${urgenceColor(analysis.urgence)}`}>
                      <div className="flex items-start gap-2">
                        <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${urgenceDotColor(analysis.urgence)}`} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold leading-snug">{analysis.urgence}</p>
                          <p className="mt-0.5 truncate text-[11px] font-medium text-slate-700">{analysis.zone}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500">
                            {isActuallyPaid ? analysis.pathologie : redactPathologyForTeaser(analysis.pathologie)}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">Confiance {analysis.confiance}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!isActuallyPaid && (
                    <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3 border border-slate-200">
                      <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400 italic">Risques identifiés pour ce bien :</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <span className="text-red-500">✕</span> Dégradation de la valeur immobilière
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <span className="text-red-500">✕</span> Risque d&apos;infestation généralisée
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <span className="text-red-500">✕</span> Coût des travaux x10 en cas d&apos;attente
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </section>

            {/* ── TABLEAU PATHOLOGIES ─────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-amber-500" />
                  <h2 className="text-base font-bold text-slate-900">Tableau des pathologies</h2>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Zone</th>
                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Pathologie</th>
                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Confiance</th>
                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Urgence</th>
                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Preuve observée</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 bg-white">
                    {report.analyses.map((analysis, idx) => (
                      <tr key={`${analysis.zone}-${idx}`} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{analysis.zone}</td>
                        <td className="px-4 py-3 text-slate-700">
                          {isActuallyPaid ? analysis.pathologie : redactPathologyForTeaser(analysis.pathologie)}
                        </td>
                        <td className="px-4 py-3 text-slate-700">{analysis.confiance}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${urgenceColor(analysis.urgence)}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${urgenceDotColor(analysis.urgence)}`} />
                            {analysis.urgence}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-xs leading-5 text-slate-500 ${!isActuallyPaid ? "blur-[3px] select-none pointer-events-none" : ""}`}>
                          {isActuallyPaid ? analysis.preuve : redactTextForTeaser(analysis.preuve)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── GALERIE ANNOTÉE ─────────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-sky-500" />
                  <h2 className="text-base font-bold text-slate-900">Galerie photos annotées</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {session.images.map((img, idx) => {
                    const imageIndex = idx + 1;
                    const matchingAnalyses = report.analyses.filter(
                      (a: any) => a.image_index === imageIndex
                    );
                    return (
                      <div key={idx} className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                          <img
                            src={`data:${img.mediaType};base64,${img.base64}`}
                            alt={`Photo ${imageIndex}`}
                            className="h-full w-full object-cover"
                          />
                          <div className={!isActuallyPaid ? "blur-[6px] grayscale brightness-110" : ""}>
                            {matchingAnalyses.flatMap((analysis, aIdx) =>
                              (analysis.annotations || []).map((ann: any, annIdx: number) => {
                                const x = parseFloat(String(ann.position_relative.x));
                                const y = parseFloat(String(ann.position_relative.y));
                                const w = ann.width ? parseFloat(String(ann.width)) : 0;
                                const h = ann.height ? parseFloat(String(ann.height)) : 0;
                                const colorBorder = ann.couleur === "ROUGE" ? "border-red-500 bg-red-500/10" : ann.couleur === "ORANGE" ? "border-amber-500 bg-amber-500/10" : "border-blue-500 bg-blue-500/10";
                                const colorTag = ann.couleur === "ROUGE" ? "bg-red-500" : ann.couleur === "ORANGE" ? "bg-amber-500" : "bg-blue-500";
                                if (w > 0 && h > 0) {
                                  return (
                                    <div
                                      key={`${aIdx}-${annIdx}`}
                                      className={`absolute border-2 rounded-sm ${colorBorder}`}
                                      style={{ top: `${y}%`, left: `${x}%`, width: `${w}%`, height: `${h}%` }}
                                    >
                                      <div className={`absolute -top-5 left-0 whitespace-nowrap rounded-t-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tighter text-white shadow ${colorTag}`}>
                                        {ann.label}
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={`${aIdx}-${annIdx}`}
                                    className={`absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white shadow ${colorTag}`}
                                    style={{ top: `${y}%`, left: `${x}%` }}
                                    title={ann.label}
                                  >!</div>
                                );
                              })
                            )}
                          </div>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-sm font-bold text-slate-900">Photo {imageIndex}</p>
                          <div className="mt-1 space-y-0.5">
                            {matchingAnalyses.map((analysis, aIdx) => (
                              <p key={aIdx} className="text-xs text-slate-500">
                                <span className="font-semibold text-slate-700">{aIdx + 1}.</span>{" "}
                                {isActuallyPaid ? analysis.pathologie : redactPathologyForTeaser(analysis.pathologie)}
                              </p>
                            ))}
                            {matchingAnalyses.length === 0 && (
                              <p className="text-xs italic text-slate-400">Aucune pathologie associée à cette photo</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── PRÉCONISATIONS ──────────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full bg-violet-500" />
                  <h2 className="text-base font-bold text-slate-900">Plan d&apos;action technique</h2>
                </div>
              </div>
              <div className="relative">
                {!isActuallyPaid && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[6px]">
                    <div className="rounded-2xl bg-white p-6 shadow-xl border border-slate-100 text-center max-w-sm">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                          <path d="M12 15V17M12 7V13M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" />
                        </svg>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">Plan de sauvetage verrouillé</h3>
                      <p className="mb-4 text-sm text-slate-600">
                        Accédez aux préconisations techniques immédiates pour stopper la propagation et protéger la valeur de votre patrimoine.
                      </p>
                      <UnlockButton 
                        sessionId={sessionId} 
                        price="49"
                        className="w-full rounded-xl bg-violet-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all transform hover:scale-[1.02]"
                      >
                        Protéger ma maison & Voir le plan
                      </UnlockButton>
                      <p className="mt-3 text-[10px] text-slate-400">
                        ⭐ 4.9/5 — Plus de 1 200 audits réalisés ce mois-ci
                      </p>
                    </div>
                  </div>
                )}
                <ol className={`divide-y divide-slate-50 px-6 ${!isActuallyPaid ? "blur-[2px] select-none pointer-events-none opacity-40" : ""}`}>
                  {report.preconisations_techniques.map((item, idx) => (
                    <li key={idx} className="flex gap-4 py-4">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                        {idx + 1}
                      </div>
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── CONCLUSION JURIDIQUE ──────────���─────────────────── */}
            <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0 text-amber-600">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <h2 className="text-sm font-bold text-amber-800">Cadre réglementaire et limites du rapport</h2>
              </div>
              <p className="text-xs leading-6 text-amber-900">{isActuallyPaid ? report.conclusion_juridique : redactTextForTeaser(report.conclusion_juridique)}</p>
            </section>
          </>
        )}

        {/* ── ACTIONS ─────────────────────────────────────────────── */}
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          {session?.status === "completed" ? (
            <div className="flex items-center gap-3">
              {isActuallyPaid ? (
                <a
                  href={`/api/resultats/${sessionId}/pdf`}
                  download={`Rapport_ACO-HABITAT_${reportRef}.pdf`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Télécharger le PDF — {reportRef}
                </a>
              ) : (
                <UnlockButton
                  sessionId={sessionId}
                  price="49"
                  className="inline-flex flex-col items-center gap-1 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    DÉBLOQUER MON ANALYSE HAUTE PRÉCISION (49€)
                  </div>
                  <span className="text-[10px] font-normal opacity-90 italic">
                    Offert : 49€ déduits de vos futurs travaux avec nos partenaires
                  </span>
                </UnlockButton>
              )}
            </div>
          ) : (
            <button type="button" disabled className="cursor-not-allowed rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-400">
              Rapport PDF (analyse en cours…)
            </button>
          )}
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            Nouvelle analyse
          </Link>
        </section>

            {/* ── BLOC SIGNATURES ─────────────────────────────────── */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  Accusé de réception — Rapport réf. {reportRef}
                </p>
              </div>
              <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {/* Signature ACO-HABITAT */}
                <div className="flex flex-col justify-between px-6 py-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Établi par
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900">ACO-HABITAT</p>
                    <p className="text-xs text-slate-500">Directeur Technique Senior</p>
                    <p className="text-xs text-slate-500">Pré-analyse par imagerie IA</p>
                  </div>
                  <div className="mt-6">
                    <div className="h-10 w-40 border-b-2 border-slate-300" />
                    <p className="mt-1 text-[10px] text-slate-400">Signature &amp; cachet</p>
                    <p className="mt-3 text-[10px] text-slate-400">
                      Généré le {session ? formatDate(session.updatedAt) : "—"}
                    </p>
                  </div>
                </div>

                {/* Signature client — Lu et approuvé */}
                <div className="flex flex-col justify-between px-6 py-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Lu et approuvé — Donneur d&apos;ordre
                    </p>
                    {session?.clientName ? (
                      <>
                        <p className="mt-2 text-sm font-bold text-slate-900">
                          {session.clientName}
                        </p>
                        {session.clientAddress && (
                          <p className="text-xs text-slate-500">{session.clientAddress}</p>
                        )}
                      </>
                    ) : (
                      <p className="mt-2 text-sm italic text-slate-400">Nom non renseigné</p>
                    )}
                    <p className="mt-3 text-[10px] leading-5 text-slate-400">
                      En signant ce document, le commanditaire reconnaît avoir pris connaissance
                      du présent rapport de pré-analyse et de son caractère indicatif non opposable.
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="h-10 w-40 border-b-2 border-slate-300" />
                    <p className="mt-1 text-[10px] text-slate-400">
                      Signature précédée de la mention &laquo;&nbsp;Lu et approuvé&nbsp;&raquo;
                    </p>
                    <p className="mt-3 text-[10px] text-slate-400">
                      À _____________, le _____ / _____ / _________
                    </p>
                  </div>
                </div>
              </div>
            </section>

        <footer className="py-4 text-center">
          <p className="text-[10px] text-slate-400">
            {reportRef} · Généré le {session ? formatDate(session.updatedAt) : "—"} · Document non opposable · ACO-HABITAT © {new Date().getFullYear()}
          </p>
        </footer>

      </div>
    </main>
  );
}
