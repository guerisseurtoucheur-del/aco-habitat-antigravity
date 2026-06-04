"use client";

import Link from "next/link";
import { DiagnosticUpload } from "@/components/DiagnosticUpload";
import styles from "./page.module.css";

export default function DiagnosticPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>DIAGNOSTIC-BOIS<span className={styles.logoDotCom}>.COM</span></span>
              <span className={styles.logoSub}>par ACO-HABITAT</span>
            </Link>
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

      <main className={styles.main}>
        <div className="container">
          <div className={styles.intro}>
            <h1 className={styles.title}>Upload → Analyse → Résultats</h1>
            <p className={styles.subtitle}>
              Chargez 4 photos pour lancer l&apos;analyse. Le statut est suivi en temps
              réel jusqu&apos;à la finalisation.
            </p>
          </div>

          <DiagnosticUpload />

          <div className={styles.tips}>
            <div className={styles.tipsTitle}>Procédure</div>
            <ul className={styles.tipsList}>
              <li>Sélectionnez vos 4 photos techniques.</li>
              <li>Envoyez les images vers l&apos;API de simulation.</li>
              <li>Le polling vous bascule automatiquement vers les résultats.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

