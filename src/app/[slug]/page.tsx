import { notFound } from "next/navigation";
import { seoCities } from "@/data/seo-content";
import { ContactForm } from "@/components/ContactForm";
import { DiagnosticUpload } from "@/components/DiagnosticUpload";
import Link from "next/link";
import { Metadata } from "next";

interface LocalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoCities.map((city) => ({
    slug: `diagnostic-bois-${city.slug}`,
  }));
}

function getCityFromSlug(slug: string) {
  const citySlug = slug.replace(/^diagnostic-bois-/, "");
  return seoCities.find((c) => c.slug === citySlug);
}

export async function generateMetadata({ params }: LocalPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityFromSlug(resolvedParams.slug);

  if (!city) {
    return {};
  }

  return {
    title: `Diagnostic Bois & Mérule à ${city.name} (${city.zipPattern}) - ACO-HABITAT`,
    description: `Expertise bois, détection de la mérule, capricornes et termites à ${city.name} (${city.zipPattern}). Pré-analyse photo gratuite par IA et intervention rapide en ${city.region}.`,
    openGraph: {
      title: `Diagnostic Bois & Mérule à ${city.name} - ACO-HABITAT`,
      description: `Détection gratuite par IA de la mérule et des insectes xylophages à ${city.name} (${city.zipPattern}). Intervention d'experts certifiés.`,
      url: `https://diagnostic-bois.com/diagnostic-bois-${city.slug}`,
    },
  };
}

export default async function LocalSeoPage({ params }: LocalPageProps) {
  const resolvedParams = await params;
  const city = getCityFromSlug(resolvedParams.slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Header Institutionnel Dark */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-300"></div>
              <img src="/logo.png" alt="ACO-HABITAT Logo" className="relative h-10 w-10 object-contain bg-white rounded-lg p-1" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">ACO-HABITAT</span>
          </Link>
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/50 px-3 py-1.5 rounded-full shadow-inner">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Secteur {city.name} ({city.zipPattern})</span>
          </div>
        </div>
      </header>

      {/* Trust Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/40 text-emerald-200 text-xs py-2.5">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-center font-medium">
          <span className="flex items-center gap-1.5"><span className="text-teal-400">✓</span> Marque déposée INPI</span>
          <span className="flex items-center gap-1.5"><span className="text-teal-400">⬡</span> Méthode protégée e-Soleau</span>
          <span className="flex items-center gap-1.5"><span className="text-teal-400">✓</span> Spécialiste Bois depuis 2006</span>
        </div>
      </div>

      {/* Hero Section 3D */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-teal-500/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-teal-500/30 bg-teal-950/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-xs uppercase tracking-widest text-teal-300 font-bold">
              Expertise Locale • Région {city.region}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            Diagnostic Bois & Humidité à{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-green-400 drop-shadow-sm">
              {city.name}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto font-normal">
            Vous suspectez la présence de <span className="text-red-400 font-bold">MÉRULE</span>, de capricornes ou de termites dans votre charpente à <strong className="text-white font-semibold">{city.name} ({city.zipPattern})</strong> ? N&apos;attendez pas que les dégâts deviennent irréversibles.
          </p>

          {/* 3D Stat Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md transform transition hover:-translate-y-1 hover:border-teal-500/40">
              <div className="text-teal-400 font-extrabold text-lg mb-1">⚡ Pré-analyse IA 3 Min.</div>
              <div className="text-xs text-slate-400">Détection visuelle immédiate par intelligence artificielle</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md transform transition hover:-translate-y-1 hover:border-teal-500/40">
              <div className="text-emerald-400 font-extrabold text-lg mb-1">🛡️ Rapport Officiel PDF</div>
              <div className="text-xs text-slate-400">Dossier technique structuré pour assurances & notaires</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md transform transition hover:-translate-y-1 hover:border-teal-500/40">
              <div className="text-green-400 font-extrabold text-lg mb-1">📍 Experts {city.name}</div>
              <div className="text-xs text-slate-400">Intervention & traitement curatif en région {city.region}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 : Full-Width Photo Upload Widget */}
      <section className="py-14 bg-slate-950 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2 block">
              Étape 1 sur 2
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Déposez vos photos pour l&apos;analyse instantanée
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-2">
              Téléchargez 1 à 4 photos de la charpente ou de la zone abîmée. Notre IA analyse la menace gratuitement.
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl backdrop-blur-xl relative">
            <DiagnosticUpload />
          </div>
        </div>
      </section>

      {/* Section 2 : Expert Intervention & Form Grid */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
              Étape 2
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Intervention d&apos;un spécialiste certifié à {city.name}
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-2">
              Besoin d&apos;un diagnostic physique sur site ou d&apos;un traitement curatif de charpente ?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Card 1 : Details & Expertise */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-bl-full pointer-events-none"></div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="bg-teal-500/20 text-teal-400 w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black border border-teal-500/30">
                    📍
                  </span>
                  Pourquoi traiter à {city.name} ?
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Le climat et l&apos;humidité en région <strong className="text-teal-300">{city.region}</strong> favorisent le développement rapide des champignons lignivores (Mérule pleureuse, Coniophore) et la prolifération des larves de Capricorne dans les boiseries.
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Traitement fongicide & insecticide certifié</h4>
                      <p className="text-xs text-slate-400">Piquetage, brûlage au chalumeau et injection sous pression au cœur de la maçonnerie.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Rapport certifié assurances</h4>
                      <p className="text-xs text-slate-400">Dossier d&apos;expertise officiel utilisable auprès des assurances, notaires et artisans.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Intervention rapide secteur {city.zipPattern}</h4>
                      <p className="text-xs text-slate-400">Déplacement prioritaire d&apos;un technicien applicateur qualifié.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 : Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 text-center text-xs text-slate-500 mt-auto">
        <div className="container mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-slate-400 font-semibold">
            <Link href="/" className="hover:text-teal-400 transition-colors">Accueil ACO-HABITAT</Link>
            <span>·</span>
            <Link href="/mentions-legales" className="hover:text-teal-400 transition-colors">Mentions légales</Link>
            <span>·</span>
            <Link href="/cgv" className="hover:text-teal-400 transition-colors">CGV</Link>
            <span>·</span>
            <Link href="/confidentialite" className="hover:text-teal-400 transition-colors">Confidentialité</Link>
          </div>
          <p className="text-slate-500">
            ACO-HABITAT — 18 rue Bernard Palissy, 61000 Alençon · SIRET : 344 616 412 00062 · Spécialiste Bois depuis 2006
          </p>
          <p className="text-[11px] text-slate-600 max-w-3xl mx-auto">
            Diagnostic informatif et pré-analyse IA. Ne se substitue pas à un diagnostic immobilier réglementé au sens du Code de la construction et de l&apos;habitation.
          </p>
        </div>
      </footer>
    </div>
  );
}
