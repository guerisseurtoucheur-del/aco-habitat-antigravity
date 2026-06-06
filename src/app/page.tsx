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

      {/* Hero : Message client clair */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge}>
            <span className="text-xs">Pré-analyse maison en ligne</span>
          </div>
          <h1 className={styles.heroTitle}>
            Un doute sur votre charpente ? <br />
            <span className={styles.heroAccent}>Obtenez une premiere lecture claire en 3 minutes</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Envoyez vos photos, notre IA detecte les signes de <span className={styles.meruleText}>MERULE</span>, 
            capricorne, termites ou humidite. Vous saurez immediatement si ca vaut le deplacement d&apos;un expert.
          </p>

          <div className={styles.priceBox}>
            <div className={styles.priceAmount}>Premier filtre intelligent GRATUIT</div>
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

      <LandingProductDemo />

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
              { label: 'Hylotrupes bajulus', cat: 'Xylophage', name: 'Capricorne des maisons' },
              { label: 'Anobium punctatum', cat: 'Xylophage', name: 'Petite Vrillette' },
              { label: 'Serpula lacrymans', cat: 'Lignivore', name: 'Mérule Pleureuse' },
              { label: 'Coniophora puteana', cat: 'Lignivore', name: 'Coniophore des caves' },
              { label: 'Hygrométrie Ascensionnelle', cat: 'Désordre', name: 'Remontées capillaires' },
              { label: 'Infiltration Pariétale', cat: 'Désordre', name: 'Fuites / Humidité' },
            ].map((p) => (
              <div key={p.label} className={styles.pathoItem}>
                <div className={styles.pathoName}>{p.name}</div>
                <div className={styles.pathoScientific}>{p.label}</div>
                <span className={`badge ${p.cat === 'Xylophage' ? 'badge-warning' : p.cat === 'Lignivore' ? 'badge-danger' : 'badge-tech'}`}>{p.cat}</span>
              </div>
            ))}
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
          <p className={styles.footerDisclaimer}>Pre-analyse informative — pour un diagnostic immobilier opposable, consultez un expert certifie.</p>
        </div>
      </footer>
    </div>
  );
}

