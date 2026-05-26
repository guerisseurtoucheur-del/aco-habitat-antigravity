import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Pays de la Loire : Nantes, Angers | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Pays de la Loire (Loire-Atlantique, Maine-et-Loire, Vendee). Zone mixte merule/termites. Pre-analyse par photo.",
  keywords: ["diagnostic bois pays de la loire", "diagnostic bois nantes", "merule loire atlantique", "termites vendee", "capricorne angers"],
};

export default function PaysDeLoirePage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Pays de la Loire
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Pays de la Loire</h1>
          <p className={styles.articleMeta}>Loire-Atlantique · Maine-et-Loire · Vendee · Sarthe · Mayenne</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Zone de transition</h2>
          <p>
            Les Pays de la Loire se situent a la croisee de deux zones a risque : la <strong>zone merule</strong> 
            au nord (influence bretonne/normande) et la <strong>zone termites</strong> au sud (influence aquitaine).
          </p>
          <p>
            C&apos;est une region ou les deux types de pathologies coexistent, necessitant une vigilance particuliere.
          </p>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Merule</strong> — Surtout en Loire-Atlantique et nord de la region</li>
            <li><strong>Termites</strong> — En Vendee et sud de la region</li>
            <li><strong>Capricorne</strong> — Partout dans la region</li>
            <li><strong>Humidite</strong> — Climat oceanique propice</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Loire-Atlantique (44)</strong> — Nantes, Saint-Nazaire, La Baule</li>
            <li><strong>Maine-et-Loire (49)</strong> — Angers, Cholet, Saumur</li>
            <li><strong>Vendee (85)</strong> — La Roche-sur-Yon, Les Sables-d&apos;Olonne</li>
            <li><strong>Sarthe (72)</strong> — Le Mans, La Fleche</li>
            <li><strong>Mayenne (53)</strong> — Laval, Mayenne</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes en Pays de la Loire ?</h3>
            <p className={styles.ctaBoxText}>
              Pre-analyse adaptee a cette zone de transition merule/termites.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Regions voisines</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/diagnostic-bois-bretagne" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Bretagne</p>
                <p className={styles.relatedCardDesc}>Region a haut risque merule au nord.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-nouvelle-aquitaine" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Nouvelle-Aquitaine</p>
                <p className={styles.relatedCardDesc}>Region a haut risque termites au sud.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
