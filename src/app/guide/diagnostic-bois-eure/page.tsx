import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Eure (27) - Merule, capricorne, termites | Evreux, Vernon, Louviers",
  description: "Expert diagnostic bois dans l'Eure (27). Detection merule, capricorne, vrillettes a Evreux, Vernon, Louviers, Les Andelys. Pre-analyse gratuite par photo.",
  keywords: ["diagnostic bois Eure", "merule Evreux", "capricorne 27", "traitement charpente Vernon", "expert bois Louviers"],
  openGraph: {
    title: "Diagnostic bois Eure (27) - Expert merule et insectes xylophages",
    description: "Pre-analyse gratuite des pathologies du bois dans l'Eure. Merule, capricorne, vrillettes. Intervention rapide Evreux et environs.",
    type: "article",
  },
};

export default function DiagnosticBoisEurePage() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DIAGNOSTIC-BOIS.COM - Eure",
    "description": "Expert diagnostic bois dans l'Eure (27)",
    "url": "https://diagnostic-bois.com/guide/diagnostic-bois-eure",
    "telephone": "+33-2-33-31-19-79",
    "email": "aco.habitat@orange.fr",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Eure"
    },
    "serviceArea": ["Evreux", "Vernon", "Louviers", "Les Andelys", "Bernay", "Gisors", "Pont-Audemer"]
  };

  return (
    <div className={styles.guidePage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Eure (27)
      </nav>

      <article className={styles.articleContent}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0284c7" }}>Departement 27</span>
          <h1 className={styles.articleTitle}>Diagnostic bois dans l&apos;Eure (27)</h1>
          <p className={styles.articleMeta}>Expert merule, capricorne et insectes xylophages - Evreux et toute la Normandie orientale</p>
        </header>

        <Image 
          src="/images/pathologies/traitement-charpente-echelle.jpg" 
          alt="Traitement de charpente dans l'Eure par notre equipe" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <section className={styles.articleSection}>
          <h2>Pathologies du bois dans l&apos;Eure</h2>
          <p>
            L&apos;Eure, departement normand limitrophe de l&apos;Ile-de-France, combine un climat humide 
            propice aux champignons et un patrimoine bati exceptionnel. Des maisons a colombages 
            aux grandes proprietes rurales, les ouvrages en bois necessitent une surveillance attentive.
          </p>
          
          <h3>Risques specifiques dans l&apos;Eure</h3>
          <ul>
            <li><strong>Merule pleureuse</strong> — Tres presente dans les vallees de la Seine et de l&apos;Eure, zones humides</li>
            <li><strong>Capricorne des maisons</strong> — Frequent dans les charpentes des pavillons et maisons de campagne</li>
            <li><strong>Vrillettes</strong> — Nombreuses dans les maisons a colombages et le mobilier ancien</li>
            <li><strong>Termites</strong> — Attention : zone de vigilance dans le sud du departement</li>
          </ul>
        </section>

        <div className={styles.imageGallery}>
          <figure className={styles.imageCard}>
            <Image 
              src="/images/pathologies/merule-carpophore-gros-plan.jpg" 
              alt="Carpophore de merule en gros plan - champignon lignivore" 
              width={400} 
              height={250}
            />
            <figcaption className={styles.imageCaption}>
              <strong>Merule - Carpophore</strong>
              Fructification du champignon destructeur
            </figcaption>
          </figure>
          <figure className={styles.imageCard}>
            <Image 
              src="/images/pathologies/degats-humidite-infiltration.jpg" 
              alt="Degats d'humidite sur charpente dans l'Eure" 
              width={400} 
              height={250}
            />
            <figcaption className={styles.imageCaption}>
              <strong>Degats d&apos;humidite</strong>
              Infiltration endommageant la structure bois
            </figcaption>
          </figure>
        </div>

        <section className={styles.articleSection}>
          <h2>Zones d&apos;intervention dans l&apos;Eure</h2>
          
          <h3>Evreux et agglomeration</h3>
          <p>
            Prefecture de l&apos;Eure, Evreux possede un centre historique avec de nombreuses maisons anciennes. 
            Les quartiers autour de la cathedrale et les faubourgs presentent souvent des problematiques 
            d&apos;humidite et de champignons lignivores.
          </p>

          <h3>Vernon et la vallee de la Seine</h3>
          <p>
            Situee en bord de Seine, Vernon est particulierement exposee aux problemes d&apos;humidite. 
            Les maisons anciennes du centre-ville et les proprietes des coteaux necessitent 
            des diagnostics reguliers.
          </p>

          <h3>Louviers</h3>
          <p>
            Ville industrielle historique, Louviers conserve un patrimoine architectural remarquable 
            avec des maisons a pans de bois vulnerables aux xylophages.
          </p>

          <h3>Autres communes</h3>
          <ul>
            <li>Les Andelys — Chateau Gaillard, maisons medievales</li>
            <li>Bernay — Riche patrimoine a colombages</li>
            <li>Gisors — Limite avec le Vexin, maisons anciennes</li>
            <li>Pont-Audemer — "Venise normande", problematiques humidite</li>
            <li>Gaillon — Patrimoine Renaissance</li>
            <li>Val-de-Reuil — Constructions plus recentes mais vigilance capricorne</li>
          </ul>
        </section>

        <section className={styles.articleSection}>
          <h2>Notre expertise dans l&apos;Eure</h2>
          <p>
            Depuis l&apos;Orne, nous intervenons dans tout l&apos;Eure pour des diagnostics et traitements 
            de charpentes. Notre connaissance du bati normand et notre experience des pathologies 
            locales nous permettent des interventions efficaces.
          </p>
          
          <div className={styles.ctaBox}>
            <h3>Pre-analyse gratuite pour l&apos;Eure</h3>
            <p>Envoyez-nous vos photos pour une premiere evaluation sans engagement.</p>
            <Link href="/" className={styles.ctaButton}>Demander une pre-analyse</Link>
          </div>
        </section>

        <section className={styles.articleSection}>
          <h2>Departements voisins</h2>
          <ul>
            <li><Link href="/guide/diagnostic-bois-orne">Orne (61)</Link> — Notre base d&apos;intervention</li>
            <li><Link href="/guide/diagnostic-bois-normandie">Seine-Maritime (76)</Link> — Haute-Normandie</li>
            <li><Link href="/guide/diagnostic-bois-ile-de-france">Yvelines (78)</Link> — Ile-de-France</li>
          </ul>
        </section>
      </article>

      <footer className={styles.guideFooter}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopy}>DIAGNOSTIC-BOIS.COM par ACO-HABITAT - Expert bois depuis 2006</p>
        </div>
      </footer>
    </div>
  );
}
