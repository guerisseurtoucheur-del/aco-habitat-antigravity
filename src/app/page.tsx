'use client';

import Link from 'next/link';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import { DiagnosticUpload } from '@/components/DiagnosticUpload';
import { LandingProductDemo } from '@/components/LandingProductDemo';
import { CityAccordion } from '@/components/CityAccordion';

const DynamicScene = dynamic(() => import('@/components/3d/HouseScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0a0a0a] text-white border-y border-slate-800/50">
      <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
      <p className="font-extrabold text-sm tracking-widest text-slate-400 animate-pulse uppercase">
        Initialisation du moteur 3D...
      </p>
    </div>
  )
});

const DynamicDestructionSimulator = dynamic(() => import('@/components/3d/DestructionSimulator').then(mod => mod.DestructionSimulator), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center bg-slate-900 text-slate-500">
      Chargement du simulateur...
    </div>
  )
});

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Header Institutionnel */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="DIAGNOSTIC-BOIS Logo" className={styles.logoImg} />
              <div className={styles.logoTextWrap}>
                <span className={styles.logoText}>DIAGNOSTIC-BOIS<span className={styles.logoDotCom}>.COM</span></span>
                <span className={styles.logoSub}>par ACO-HABITAT</span>
              </div>
            </div>
            <div className={styles.headerContact}>
              <a href="tel:+33233311979" className={styles.headerPhone}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                02 33 31 19 79
              </a>
              <a href="mailto:aco.habitat@orange.fr" className={styles.headerEmail}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                aco.habitat@orange.fr
              </a>
            </div>
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
          <div className="inline-block border border-red-500/30 rounded-full px-4 py-1.5 mb-6 bg-red-950/30">
            <span className="text-xs uppercase tracking-widest text-red-400/90 font-medium">Pré-analyse en ligne gratuite</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Charpente, boiseries, bois de cave : ne laissez pas le doute s'installer. <br className="hidden md:block" />
            <span className="text-[#34d399]">Diagnostiquez en 3 minutes, agissez avant les dégâts.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Envoyez vos photos, notre IA détecte les signes de <span className="text-[#ef4444] font-bold">MÉRULE</span>, capricorne, termites ou humidité. Vous saurez immédiatement si ça vaut le déplacement d'un expert.
          </p>

          <div className={styles.priceBox}>
            <div className={styles.priceAmount}>Premier filtre intelligent</div>
            <div className={styles.priceLabel}>
              Reponse en quelques minutes · Rapport PDF detaille disponible apres analyse
            </div>
            <p className={styles.offerLeadHint}>
              <strong>+ de 2 000 proprietaires</strong> ont deja utilise notre service pour y voir clair avant d&apos;appeler un professionnel.
            </p>
          </div>

          <a href="#diagnostic-upload" className="btn btn-primary" id="cta-start">
            Démarrer mon analyse
          </a>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>Experts depuis 2006</div>
            <div className={styles.trustItem}>Reponse en moins de 5 min</div>
            <div className={styles.trustItem}>Rapport utilisable avec votre assurance</div>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE 3D INTERACTIVE */}
      <section className="w-full h-[700px] md:h-[900px] relative z-20 border-y border-slate-800 bg-[#0a0a0a] shadow-2xl">
        <DynamicScene />
      </section>

      <LandingProductDemo />

      {/* NOUVEAU: Simulateur de destruction interactif */}
      <DynamicDestructionSimulator />

      {/* Comment ca marche */}
      <section className={styles.howSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Pourquoi agir maintenant ?</h2>
          <p className={styles.sectionSubtitle}>La merule peut detruire une charpente en quelques mois. Plus vous attendez, plus les degats s&apos;aggravent.</p>
          <div className={styles.steps}>
            {[
              { num: '01', title: 'Prenez 4 photos', desc: 'Photographiez les zones suspectes avec votre telephone.' },
              { num: '02', title: 'Analyse en 3 min', desc: 'Notre IA identifie les signes de merule, capricorne, termites ou humidite.' },
              { num: '03', title: 'Vous savez quoi faire', desc: 'Soit vous etes rassure, soit vous appelez un pro avec un dossier solide.' },
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

      {/* L'expert derrière ACO-HABITAT */}
      <section className={styles.expertSection}>
        <div className="container">
          <div className={styles.expertInner}>
            <figure className={styles.expertPhotoWrap}>
              <img
                src="/expert-aco-habitat.jpeg"
                alt="Expert ACO-HABITAT examinant un échantillon de bois à la loupe dans son bureau"
                className={styles.expertPhoto}
                loading="lazy"
              />
            </figure>
            <div className={styles.expertText}>
              <span className={styles.expertBadge}>Une expertise humaine</span>
              <h2 className={styles.expertTitle}>Un expert du bois derrière chaque analyse</h2>
              <p className={styles.expertPara}>
                Notre IA vous donne une première réponse en quelques minutes, mais c&apos;est bien
                l&apos;expérience terrain qui fait la différence. Depuis 2006, ACO-HABITAT diagnostique et
                traite les charpentes, boiseries et bois de cave partout en Normandie et au-delà.
              </p>
              <p className={styles.expertPara}>
                Chaque pré-analyse est le fruit de 20 ans de savoir-faire dans le traitement de la mérule, du
                capricorne, des vrillettes et des problèmes d&apos;humidité.
              </p>
              <a href="#diagnostic-upload" className="btn btn-primary">
                Faire analyser mes photos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Notre savoir-faire */}
      <section className={styles.savoirSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Un vrai savoir-faire derrière l&apos;IA</h2>
          <p className={styles.sectionSubtitle}>
            Notre pré-analyse s&apos;appuie sur 20 ans de traitement et de restauration du bois sur le terrain, depuis 2006.
          </p>
          <div className={styles.savoirGrid}>
            {[
              { src: '/realisations/traitement-maitresse-poutre.png', alt: 'Technicien ACO-HABITAT traitant une maîtresse-poutre en chêne au pinceau', caption: 'Traitement curatif d’une maîtresse-poutre en chêne' },
              { src: '/realisations/comble-charpente-ancienne.jpeg', alt: 'Charpente de comble ancienne en cours de restauration', caption: 'Restauration d’une charpente de comble ancienne' },
              { src: '/realisations/plafond-solives-restaure.jpeg', alt: 'Plafond à solives en chêne restaurées', caption: 'Rénovation d’un plafond à solives en chêne' },
              { src: '/realisations/traitement-plafond-solives.jpeg', alt: 'Traitement d’un plafond à solives sur mur en pierre', caption: 'Protection préventive des bois de plafond' },
            ].map((img) => (
              <figure key={img.src} className={styles.savoirCard}>
                <img src={img.src || "/placeholder.svg"} alt={img.alt} className={styles.savoirImg} loading="lazy" />
                <figcaption className={styles.savoirCaption}>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.savoirCta}>
            <Link href="/guide/notre-savoir-faire" className="btn btn-primary">
              Découvrir notre savoir-faire
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="formulaire" className={styles.ctaSection}>
        <div className="container">
          <div className={styles.urgencyBanner}>
            <span className={styles.urgencyDot}></span>
            <span>127 analyses realisees cette semaine en Normandie</span>
          </div>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Vous avez un doute ? Fixez-le maintenant.</h2>
            <p className={styles.ctaText}>En 3 minutes, vous saurez si votre probleme necessite une intervention urgente ou si vous pouvez dormir tranquille.</p>
            <DiagnosticUpload />
          </div>
        </div>
      </section>

      {/* SEO Cities Linking Accordion */}
      <CityAccordion />

      <footer className={styles.footer}>
        <div className="container">
          <nav className={styles.legalNav} aria-label="Liens légaux">
            <Link href="/mentions-legales" className={styles.legalLink}>Mentions légales</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/cgv" className={styles.legalLink}>CGV</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/confidentialite" className={styles.legalLink}>Confidentialité</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/cookies" className={styles.legalLink}>Cookies</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/guide" className={styles.legalLink}>Ressources</Link>
          </nav>
          <p className={styles.footerIdentity}>
            ACO-HABITAT — 18 rue Bernard Palissy, 61000 Alençon · SIRET : 344 616 412 00062 · TVA : FR65 344 616 412
          </p>
          <p>© 2026 ACO-HABITAT — DIAGNOSTIC-BOIS.COM · Specialiste depuis 2006</p>
          <p className={styles.footerIdentity}>
            ACO-HABITAT · Marque déposée à l&apos;INPI n° 5266768 · Méthode et format de rapport protégés (dépôt e-Soleau INPI)
          </p>
          <p className={styles.footerDisclaimer}>Pre-analyse informative — pour un diagnostic immobilier opposable, consultez un expert certifie.</p>
        </div>
      </footer>
    </div>
  );
}

