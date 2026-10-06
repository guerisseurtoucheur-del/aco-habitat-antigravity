'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { DiagnosticUpload } from '@/components/DiagnosticUpload';
import { LandingProductDemo } from '@/components/LandingProductDemo';

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Header Institutionnel */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.logo}>
            <img src="/logo.png" alt="ACO-HABITAT Logo" className={styles.logoImg} />
            <span className={styles.logoText}>ACO-HABITAT</span>
          </div>
        </div>
      </header>

      {/* Trust Bar (Screenshot) */}
      <div className="bg-[#1a4731] text-white text-xs md:text-sm py-3 border-b border-green-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 opacity-90">
            <div className="flex items-center gap-2">
              <span className="text-green-400">⬡</span> ACO-HABITAT · Marque déposée à l'INPI
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Méthode protégée (dépôt e-Soleau)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">⬡</span> Spécialiste du bois depuis 2006
            </div>
          </div>
        </div>
      </div>

      {/* Hero : Message client clair */}
      <section className={styles.hero}>
        <div className="container">
          <div className="inline-block border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs uppercase tracking-widest text-red-400/90 font-medium">Pré-analyse en ligne gratuite</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Charpente, boiseries, bois de cave : ne laissez pas le doute s'installer. <br className="hidden md:block" />
            <span className="text-[#34d399]">Diagnostiquez en 3 minutes, agissez avant les degats.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Envoyez vos photos, notre IA detecte les signes de <span className="text-[#ef4444] font-bold">MERULE</span>, capricorne, termites ou humidite. Vous saurez immediatement si ca vaut le deplacement d'un expert.
          </p>

          <div className={styles.priceBox}>
            <div className={styles.priceAmount}>Analyse Offerte</div>
            <div className={styles.priceLabel}>
              Pré-analyse assistée par IA · rapport détaillé disponible pour vos dossiers (réponse sous quelques minutes)
            </div>
            <p className={styles.offerLeadHint}>
              Capturez vos photos, recevez votre diagnostic instantanément et débloquez votre dossier PDF officiel pour vos démarches.
            </p>
          </div>

          <a href="#diagnostic-upload" className="btn btn-primary" id="cta-start">
            Démarrer mon analyse
          </a>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>Utile pour votre assurance</div>
            <div className={styles.trustItem}>Rapport structuré et photos annotées</div>
            <div className={styles.trustItem}>Résultat lisible par tous</div>
          </div>
        </div>
      </section>

      <LandingProductDemo />

      {/* Comment ca marche */}
      <section className={styles.howSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Comment ça marche</h2>
          <div className={styles.steps}>
            {[
              { num: '01', title: 'Prenez 4 photos', desc: 'Photographiez les zones qui vous semblent abîmées ou humides.' },
              { num: '02', title: 'Analyse automatique', desc: 'Notre IA examine les images pour identifier les problèmes possibles.' },
              { num: '03', title: 'Recevez le rapport', desc: 'Vous obtenez un PDF clair avec les constats et les actions conseillées.' },
            ].map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problemes detectes */}
      <section className={styles.pathoSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Pathologies que nous détectons</h2>
          <div className={styles.pathoGrid}>
            {[
              { label: 'Hylotrupes bajulus', cat: 'Xylophage', name: 'Capricorne des maisons', slug: 'capricorne-des-maisons' },
              { label: 'Anobium punctatum', cat: 'Xylophage', name: 'Petite Vrillette', slug: 'petite-vrillette' },
              { label: 'Serpula lacrymans', cat: 'Lignivore', name: 'Mérule Pleureuse', slug: 'merule-pleureuse' },
              { label: 'Coniophora puteana', cat: 'Lignivore', name: 'Coniophore des caves', slug: 'coniophore-des-caves' },
              { label: 'Reticulitermes spp.', cat: 'Xylophage', name: 'Termites', slug: 'termites' },
              { label: 'Xestobium rufovillosum', cat: 'Xylophage', name: 'Grosse Vrillette', slug: 'grosse-vrillette' },
              { label: 'Hygrométrie Ascensionnelle', cat: 'Désordre', name: 'Remontées capillaires' },
              { label: 'Infiltration Pariétale', cat: 'Désordre', name: 'Fuites / Humidité' },
            ].map((p) => {
              const content = (
                <>
                  <div className={styles.pathoName}>{p.name}</div>
                  <div className={styles.pathoScientific}>{p.label}</div>
                  <span className={`badge ${p.cat === 'Xylophage' ? 'badge-warning' : p.cat === 'Lignivore' ? 'badge-danger' : 'badge-tech'}`}>{p.cat}</span>
                </>
              );

              return p.slug ? (
                <Link href={`/pathologie/${p.slug}`} key={p.label} className={`${styles.pathoItem} hover:border-teal-500 transition-colors block`}>
                  {content}
                </Link>
              ) : (
                <div key={p.label} className={styles.pathoItem}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Vidéos Intervention */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden border-y border-slate-700 shadow-2xl z-10">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-3 block">Notre Expertise en Action</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Traitement curatif de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Mérule</span></h2>
            <p className="text-lg text-slate-300">
              Découvrez nos méthodes de traitement en profondeur. Piquage, brûlage au chalumeau, et injection au cœur de la maçonnerie. Ne laissez aucune chance aux champignons lignivores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto perspective-1000">
            {/* Vidéo 1 */}
            <div className="group relative transition-all duration-500 hover:-translate-y-4 hover:rotate-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-3xl p-3 shadow-2xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02]">
                <video 
                  src="/videos/merule-1.mp4" 
                  controls 
                  className="w-full rounded-2xl bg-black aspect-video object-contain"
                  preload="metadata"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Phase d'intervention - Étape 1</h3>
                  <p className="text-sm text-slate-400">Sécurisation et traitement des maçonneries</p>
                </div>
              </div>
            </div>

            {/* Vidéo 2 */}
            <div className="group relative transition-all duration-500 hover:-translate-y-4 hover:-rotate-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-3xl p-3 shadow-2xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02]">
                <video 
                  src="/videos/merule-2.mp4" 
                  controls 
                  className="w-full rounded-2xl bg-black aspect-video object-contain"
                  preload="metadata"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Phase d'intervention - Étape 2</h3>
                  <p className="text-sm text-slate-400">Application du fongicide et brûlage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Protégez votre maison</h2>
            <p className={styles.ctaText}>Créez un rapport simple à comprendre pour avancer avec un artisan, un notaire ou votre assurance.</p>
            <DiagnosticUpload />
          </div>
        </div>
      </section>

      {/* SEO Cities Linking */}
      <section className="bg-white py-12 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Interventions & Diagnostics locaux</h2>
          <div className="flex flex-wrap gap-3">
            {['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Alencon', 'Caen', 'Rouen'].map(city => (
              <Link key={city} href={`/diagnostic-bois-${city.toLowerCase()}`} className="text-sm text-slate-600 hover:text-teal-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100 hover:border-teal-200 transition-colors">
                Diagnostic bois à {city === 'Alencon' ? 'Alençon' : city}
              </Link>
            ))}
            <Link href="/diagnostic-bois-brest" className="text-sm text-slate-500 hover:text-teal-600 px-3 py-1.5">
              Voir toutes les villes...
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.storeRow}>
            <span className={styles.storeTitle}>Bientôt disponible sur :</span>
            <div className={styles.storeBadges}>
              <div className={styles.storeBadge} aria-label="Application iPhone">
                <span className={styles.storeIcon}></span>
                <span>iPhone</span>
              </div>
              <div className={styles.storeBadge} aria-label="Application Samsung">
                <span className={styles.storeIcon}>◉</span>
                <span>Samsung</span>
              </div>
            </div>
          </div>
          <nav className={styles.legalNav} aria-label="Liens légaux">
            <Link href="/mentions-legales" className={styles.legalLink}>Mentions légales</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/cgv" className={styles.legalLink}>CGV</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/confidentialite" className={styles.legalLink}>Confidentialité</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/cookies" className={styles.legalLink}>Cookies</Link>
          </nav>
          <p className={styles.footerIdentity}>
            ACO-HABITAT — 18 rue Bernard Palissy, 61000 Alençon · SIRET : 344 616 412 00062 · TVA : FR65 344 616 412
          </p>
          <p>© 2026 ACO-HABITAT — Service de pré-analyse par image · Spécialiste depuis 2006</p>
          <p className="text-xs">Rapport informatif et non opposable, pour vous aider à prendre les bonnes décisions. Ne se substitue pas à un diagnostic immobilier réglementé (au sens du Code de la construction et de l&apos;habitation), qui doit être réalisé par un spécialiste certifié.</p>
        </div>
      </footer>
    </div>
  );
}

