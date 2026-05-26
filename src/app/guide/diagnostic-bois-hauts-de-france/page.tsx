import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Hauts-de-France : Lille, Amiens | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Hauts-de-France (Nord, Pas-de-Calais, Somme, Aisne, Oise). Humidite et pathologies du bois. Pre-analyse par photo.",
  keywords: ["diagnostic bois hauts de france", "diagnostic bois lille", "merule nord", "capricorne amiens", "humidite picardie"],
};

export default function HautsDeFrancePage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Hauts-de-France
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Hauts-de-France</h1>
          <p className={styles.articleMeta}>Nord · Pas-de-Calais · Somme · Aisne · Oise</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Climat humide et pathologies</h2>
          <p>
            Les Hauts-de-France, avec leur climat oceanique humide, connaissent des problematiques similaires 
            a la Normandie et la Bretagne. L&apos;humidite favorise le developpement des champignons lignivores.
          </p>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Merule</strong> — En progression dans le bati ancien</li>
            <li><strong>Capricorne</strong> — Frequent dans les charpentes</li>
            <li><strong>Humidite</strong> — Remontees capillaires dans les maisons anciennes</li>
            <li><strong>Vrillettes</strong> — Parquets et boiseries</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Nord (59)</strong> — Lille, Roubaix, Tourcoing, Dunkerque</li>
            <li><strong>Pas-de-Calais (62)</strong> — Calais, Boulogne, Arras, Lens</li>
            <li><strong>Somme (80)</strong> — Amiens, Abbeville</li>
            <li><strong>Aisne (02)</strong> — Saint-Quentin, Laon, Soissons</li>
            <li><strong>Oise (60)</strong> — Beauvais, Compiegne, Creil</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes dans les Hauts-de-France ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos pour une pre-analyse des pathologies du bois.
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
