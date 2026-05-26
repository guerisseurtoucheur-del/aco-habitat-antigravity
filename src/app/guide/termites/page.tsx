import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Les Termites : detection, traitement et prevention | DIAGNOSTIC-BOIS.COM",
  description: "Guide complet sur les termites en France. Zones infestees, signes de presence, traitements anti-termites et obligations legales. Expert diagnostic bois depuis 2006.",
  keywords: ["termites", "termites France", "traitement termites", "diagnostic termites", "zone termites", "insecte xylophage", "termite souterrain"],
};

export default function TermitesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Les Termites : detection, traitement et prevention",
            "author": { "@type": "Organization", "name": "ACO-HABITAT" },
            "publisher": { "@type": "Organization", "name": "DIAGNOSTIC-BOIS.COM" },
            "datePublished": "2024-01-15",
            "dateModified": "2026-05-26"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Termites
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#f59e0b" }}>Insecte xylophage</span>
          <h1 className={styles.articleTitle}>Les Termites : la menace invisible</h1>
          <p className={styles.articleMeta}>Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Les termites en France</h2>
          <p>
            Les <strong>termites</strong> sont des insectes sociaux vivant en colonies souterraines pouvant compter 
            plusieurs millions d&apos;individus. En France metropolitaine, l&apos;espece principale est le 
            <strong>Reticulitermes</strong> (termite souterrain).
          </p>
          <p>
            Contrairement au capricorne qui laisse des traces visibles, les termites travaillent dans l&apos;obscurite 
            totale et peuvent devorer l&apos;interieur d&apos;une piece de bois en ne laissant qu&apos;une fine pellicule 
            de surface intacte.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Obligation legale</p>
            <p className={styles.alertText}>
              Le diagnostic termites est obligatoire pour la vente de tout bien immobilier situe dans une zone 
              declaree par arrete prefectoral. Consultez la carte des departements concernes.
            </p>
          </div>

          <h2>Zones a risque en France</h2>
          <p>Les termites sont principalement presents dans :</p>
          <ul>
            <li><strong>Sud-Ouest</strong> — Gironde, Landes, Charente-Maritime, Dordogne (zone la plus touchee)</li>
            <li><strong>Facade Atlantique</strong> — De la Loire-Atlantique aux Pyrenees</li>
            <li><strong>Pourtour mediterraneen</strong> — Var, Bouches-du-Rhone, Herault</li>
            <li><strong>Ile-de-France</strong> — Paris et petite couronne (infestation urbaine croissante)</li>
            <li><strong>Vallee du Rhone</strong> — Drome, Ardeche</li>
          </ul>
          <p>
            Le rechauffement climatique etend progressivement leur territoire vers le nord.
          </p>

          <h2>Reconnaitre une infestation de termites</h2>
          <h3>Signes de presence</h3>
          <ul>
            <li><strong>Cordonnets</strong> — Petits tunnels de terre sur les murs ou fondations (voies de circulation)</li>
            <li><strong>Bois sonne creux</strong> — Le bois infeste sonne creux quand on tape dessus</li>
            <li><strong>Surface papier</strong> — Fine pellicule de bois qui s&apos;enfonce au toucher</li>
            <li><strong>Essaimage</strong> — Presence d&apos;ailes au printemps (avril-mai) pres des fenetres</li>
          </ul>

          <h3>Ce qui distingue les termites</h3>
          <ul>
            <li>Pas de trous de sortie (contrairement au capricorne)</li>
            <li>Pas de vermoulure visible (ils mangent tout)</li>
            <li>Galeries tapissees de terre et d&apos;excrements</li>
            <li>Travaillent 24h/24, 365 jours par an</li>
          </ul>

          <h2>Degats causes par les termites</h2>
          <p>Les termites s&apos;attaquent a :</p>
          <ul>
            <li>Tous types de bois (resineux ET feuillus)</li>
            <li>Papier, carton, livres</li>
            <li>Certains plastiques et isolants</li>
            <li>Textiles naturels</li>
          </ul>
          <p>
            Une colonie de termites peut consommer <strong>plusieurs kilos de bois par jour</strong>. 
            Les degats structurels peuvent etre catastrophiques en quelques annees.
          </p>

          <h2>Traitements anti-termites</h2>
          
          <h3>Traitement par barriere chimique</h3>
          <p>
            Injection de produit termiticide dans le sol autour et sous les fondations. Cree une barriere 
            infranchissable pour les termites. Duree de protection : 5 a 10 ans.
          </p>

          <h3>Traitement par pieges-appats</h3>
          <p>
            Installation de stations contenant un appat empoisonne. Les termites le rapportent a la colonie 
            et contaminent l&apos;ensemble des individus. Methode plus ecologique.
          </p>

          <h3>Traitement du bois</h3>
          <p>
            Injection ou pulverisation de produit insecticide sur les bois infestes ou a proteger.
          </p>

          <div className={styles.alertBox + " " + styles.info}>
            <p className={styles.alertTitle}>Garantie decennale</p>
            <p className={styles.alertText}>
              Les traitements anti-termites realises par des professionnels certifies CTB-A+ beneficient 
              d&apos;une garantie decennale obligatoire.
            </p>
          </div>

          <h2>Obligations legales</h2>
          <ul>
            <li><strong>Diagnostic obligatoire</strong> — Etat relatif aux termites obligatoire en zone declaree (validite 6 mois)</li>
            <li><strong>Declaration en mairie</strong> — Toute decouverte de termites doit etre declaree dans un delai d&apos;un mois</li>
            <li><strong>Travaux de demolition</strong> — Les bois infestes doivent etre incineres ou traites</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Suspicion de termites ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez des photos des indices constates. Notre analyse IA vous aide a determiner s&apos;il 
              s&apos;agit bien de termites et quelle action entreprendre.
            </p>
            <Link href="/diagnostic/nouveau" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/capricorne" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Le capricorne</p>
                <p className={styles.relatedCardDesc}>L&apos;autre grand insecte xylophage des charpentes francaises.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-nouvelle-aquitaine" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Diagnostic bois Nouvelle-Aquitaine</p>
                <p className={styles.relatedCardDesc}>Region la plus touchee par les termites en France.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
