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
            <Link href="/" className={styles.back} id="back-home">
              ← ANNULER
            </Link>
            <span className={styles.headerTitle}>UNITÉ D&apos;ACQUISITION</span>
            <span className={styles.headerStep}>FLOW 1/1</span>
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

