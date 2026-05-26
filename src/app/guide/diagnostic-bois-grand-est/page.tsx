import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Grand Est : Nancy, Metz, Strasbourg | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Grand Est (Alsace, Lorraine, Champagne). Capricorne et vrillettes dans les maisons a colombages. Pre-analyse par photo.",
  keywords: ["diagnostic bois grand est", "diagnostic bois alsace", "capricorne strasbourg", "colombages alsace", "charpente lorraine"],
};

export default function GrandEstPage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Grand Est
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Grand Est</h1>
          <p className={styles.articleMeta}>Bas-Rhin · Haut-Rhin · Moselle · Meurthe-et-Moselle · Marne</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Region riche en patrimoine bois</h2>
          <p>
            Le Grand Est possede un patrimoine unique de maisons a <strong>colombages</strong>, notamment en Alsace. 
            Ces constructions traditionnelles necessitent une attention particuliere aux pathologies du bois.
          </p>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Capricorne</strong> — Menace principale pour les charpentes</li>
            <li><strong>Vrillettes</strong> — Frequentes dans les colombages et parquets anciens</li>
            <li><strong>Humidite</strong> — Probleme dans les maisons anciennes</li>
            <li><strong>Merule</strong> — Plus rare mais presente dans les zones humides</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Bas-Rhin (67)</strong> — Strasbourg, Haguenau, Selestat</li>
            <li><strong>Haut-Rhin (68)</strong> — Mulhouse, Colmar</li>
            <li><strong>Moselle (57)</strong> — Metz, Thionville, Forbach</li>
            <li><strong>Meurthe-et-Moselle (54)</strong> — Nancy, Luneville</li>
            <li><strong>Marne (51)</strong> — Reims, Chalons, Epernay</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes dans le Grand Est ?</h3>
            <p className={styles.ctaBoxText}>
              Pre-analyse adaptee au patrimoine a colombages et aux charpentes traditionnelles.
            </p>
            <Link href="/diagnostic/nouveau" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
