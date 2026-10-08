import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois dans la Sarthe (72) : merule, capricorne, traitement | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois dans la Sarthe : Le Mans, La Fleche, Sable-sur-Sarthe, Mamers. Expert depuis 2006. Pre-analyse par photo sous 24h. Devis gratuit.",
  keywords: ["diagnostic bois sarthe", "merule sarthe", "capricorne sarthe", "traitement charpente le mans", "diagnostic bois 72", "expert bois la fleche", "merule le mans"],
};

export default function SarthePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Sarthe",
            "description": "Diagnostic bois et traitement des pathologies dans la Sarthe (72)",
            "telephone": "+33-2-33-31-19-79",
            "email": "aco.habitat@orange.fr",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "18 Rue Bernard Palissy",
              "addressLocality": "Alencon",
              "postalCode": "61000",
              "addressRegion": "Normandie",
              "addressCountry": "FR"
            },
            "areaServed": ["Le Mans", "La Fleche", "Sable-sur-Sarthe", "Mamers", "Saint-Calais", "Chateau-du-Loir"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-pays-de-la-loire">Pays de la Loire</Link> &gt; Sarthe (72)
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Departement</span>
          <h1 className={styles.articleTitle}>Diagnostic bois dans la Sarthe (72)</h1>
          <p className={styles.articleMeta}>
            Le Mans · La Fleche · Sable-sur-Sarthe · Mamers — Intervention depuis l&apos;Orne voisin
          </p>
        </header>

        <Image 
          src="/images/pathologies/capricorne-galeries-poutre.jpg" 
          alt="Galeries de capricorne dans une poutre de charpente - diagnostic dans la Sarthe" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>La Sarthe : departement limitrophe de l&apos;Orne</h2>
          <p>
            La Sarthe (72) est un departement des Pays de la Loire, limitrophe de l&apos;Orne ou nous sommes bases. 
            Cette proximite nous permet d&apos;intervenir facilement sur <strong>Le Mans, Mamers, La Fleche</strong> 
            et l&apos;ensemble du departement.
          </p>
          <p>
            Le climat de la Sarthe, de type oceanique degrade, favorise les problemes d&apos;humidite dans les 
            constructions anciennes. Les maisons du Vieux-Mans et les demeures rurales sont particulierement 
            concernees par les pathologies du bois.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Zone d&apos;intervention privilegiee</p>
            <p className={styles.alertText}>
              Depuis Alencon, nous intervenons rapidement sur le nord de la Sarthe (Mamers, Beaumont-sur-Sarthe) 
              et l&apos;ensemble du departement pour les diagnostics et traitements.
            </p>
          </div>

          <h2>Pathologies frequentes dans la Sarthe</h2>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/vrillettes-trous-poutre.jpg" 
                alt="Trous de vrillettes sur poutre ancienne dans la Sarthe" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Attaque de vrillettes</strong>
                Nombreux trous de sortie sur poutre ancienne
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/poutre-galeries-xylophages.jpg" 
                alt="Poutre avec galeries d'insectes xylophages dans une maison sarthoise" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Galeries d&apos;insectes</strong>
                Degradation avancee necessitant un traitement
              </figcaption>
            </figure>
          </div>

          <h3>Le capricorne des maisons</h3>
          <p>
            Le capricorne est tres present dans la Sarthe. Les charpentes des maisons construites entre 1950 et 1990, 
            souvent en pin non traite, sont particulierement vulnerables. Les larves peuvent se developper pendant 
            plusieurs annees avant d&apos;etre detectees.
          </p>

          <h3>Les vrillettes</h3>
          <p>
            La petite vrillette (Anobium punctatum) est tres repandue dans les maisons anciennes du Mans et des 
            villages sarthois. Elle s&apos;attaque aux meubles, parquets et boiseries, mais aussi aux charpentes.
          </p>

          <h3>La merule</h3>
          <p>
            Moins frequente que dans le Calvados ou la Manche, la merule est neanmoins presente dans la Sarthe, 
            particulierement dans les quartiers anciens du Mans et les maisons de campagne mal ventilees.
          </p>

          <h2>Villes principales de la Sarthe</h2>

          <div className={styles.regionGrid}>
            <div className={styles.regionCard}>
              <h4>Le Mans (72000)</h4>
              <p>Prefecture de la Sarthe. Le Vieux-Mans avec ses maisons a colombages necessite une surveillance particuliere. Nombreux batiments medievaux.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>La Fleche (72200)</h4>
              <p>Ville historique avec le Prytanee militaire. Patrimoine bati ancien sujet aux pathologies du bois.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Sable-sur-Sarthe (72300)</h4>
              <p>Cite de caractere au bord de la Sarthe. Humidite naturelle elevee favorisant les champignons.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Mamers (72600)</h4>
              <p>Nord du departement, proche de l&apos;Orne. Zone d&apos;intervention prioritaire depuis notre base d&apos;Alencon.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Saint-Calais (72120)</h4>
              <p>Petite cite de caractere. Maisons anciennes en tuffeau et charpentes traditionnelles.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Chateau-du-Loir (72500)</h4>
              <p>Sud du departement. Constructions anciennes typiques de la vallee du Loir.</p>
            </div>
          </div>

          <h2>Types de constructions en Sarthe</h2>
          <p>
            Nous intervenons sur tous les types de batiments sarthois :
          </p>
          <ul>
            <li>Maisons a colombages du Vieux-Mans</li>
            <li>Demeures en tuffeau de la vallee du Loir</li>
            <li>Fermes et longeres des campagnes sarthoises</li>
            <li>Pavillons des annees 60-90 autour du Mans</li>
            <li>Maisons bourgeoises de La Fleche et Sable</li>
          </ul>

          <h2>Pre-analyse gratuite pour la Sarthe</h2>
          <p>
            Vous habitez dans la Sarthe et suspectez un probleme de bois ? Envoyez-nous vos photos pour une 
            <strong> pre-analyse gratuite sous 24h</strong>. Notre proximite depuis l&apos;Orne nous permet 
            d&apos;intervenir rapidement si necessaire.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour la Sarthe</h3>
              <p>Envoyez vos photos et recevez un avis d&apos;expert sous 24h</p>
            </div>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li><Link href="/guide/capricorne" style={{ color: "#0066ff" }}>Guide complet sur le capricorne →</Link></li>
            <li><Link href="/guide/vrillettes" style={{ color: "#0066ff" }}>Guide sur les vrillettes →</Link></li>
            <li><Link href="/guide/merule" style={{ color: "#0066ff" }}>Guide sur la merule →</Link></li>
            <li><Link href="/guide/diagnostic-bois-orne" style={{ color: "#0066ff" }}>Diagnostic bois dans l&apos;Orne voisin →</Link></li>
            <li><Link href="/guide/diagnostic-bois-pays-de-la-loire" style={{ color: "#0066ff" }}>Diagnostic bois en Pays de la Loire →</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
