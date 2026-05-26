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
            <img src="/logo.png" alt="DIAGNOSTIC-BOIS Logo" className={styles.logoImg} />
            <div className={styles.logoTextWrap}>
              <span className={styles.logoText}>DIAGNOSTIC-BOIS<span className={styles.logoDotCom}>.COM</span></span>
              <span className={styles.logoSub}>par ACO-HABITAT</span>
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
            Pré-analyse bois et humidité <br />
            <span className={styles.heroAccent}>simple, rapide et compréhensible</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Nous analysons vos photos pour repérer les insectes du bois, les champignons
            et les problèmes d&apos;humidité. Vous recevez un rapport clair, prêt à partager
            avec votre assureur, votre artisan ou un professionnel certifié.
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
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Protégez votre maison</h2>
            <p className={styles.ctaText}>Créez un rapport simple à comprendre pour avancer avec un artisan, un notaire ou votre assurance.</p>
            <DiagnosticUpload />
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
          <p>© 2026 ACO-HABITAT — DIAGNOSTIC-BOIS.COM · Specialiste depuis 2006</p>
          <p className="text-xs">Rapport informatif et non opposable, pour vous aider à prendre les bonnes décisions. Ne se substitue pas à un diagnostic immobilier réglementé (au sens du Code de la construction et de l&apos;habitation), qui doit être réalisé par un spécialiste certifié.</p>
        </div>
      </footer>
    </div>
  );
}

