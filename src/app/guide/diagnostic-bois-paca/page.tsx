import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois PACA : Marseille, Nice, Toulon | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en PACA (Provence-Alpes-Cote d'Azur). Zone termites, capricornes. Pre-analyse par photo pour maisons et villas.",
  keywords: ["diagnostic bois paca", "termites marseille", "termites nice", "capricorne provence", "diagnostic bois var"],
};

export default function PACAPage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois PACA
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en PACA</h1>
          <p className={styles.articleMeta}>Bouches-du-Rhone · Var · Alpes-Maritimes · Vaucluse</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Region a risque termites</h2>
          <p>
            La region PACA fait partie des zones ou les <strong>termites sont actifs</strong>. Le climat mediterraneen 
            leur convient parfaitement. Les departements du Var et des Bouches-du-Rhone sont particulierement touches.
          </p>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Diagnostic termites obligatoire</p>
            <p className={styles.alertText}>
              De nombreuses communes de PACA sont classees en zone termites. Le diagnostic est obligatoire 
              pour toute vente immobiliere dans ces zones.
            </p>
          </div>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Termites</strong> — Risque eleve dans le Var et les Bouches-du-Rhone</li>
            <li><strong>Capricorne</strong> — Frequent dans les charpentes</li>
            <li><strong>Lyctus</strong> — Insecte attaquant les bois tropicaux (parquets)</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Bouches-du-Rhone (13)</strong> — Marseille, Aix-en-Provence, Arles</li>
            <li><strong>Var (83)</strong> — Toulon, Frejus, Hyeres, Saint-Tropez</li>
            <li><strong>Alpes-Maritimes (06)</strong> — Nice, Cannes, Antibes, Grasse</li>
            <li><strong>Vaucluse (84)</strong> — Avignon, Orange, Carpentras</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes en PACA ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos pour une pre-analyse des risques termites et autres pathologies.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
