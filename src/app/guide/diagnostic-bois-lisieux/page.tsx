import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois a Lisieux (14100) : merule, capricorne, colombages | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic et traitement du bois a Lisieux (Pays d'Auge, Calvados) : merule, capricorne, vrillettes, colombages. Expert base a Alencon. Pre-analyse gratuite par photo sous 24h.",
  keywords: ["diagnostic bois lisieux", "merule lisieux", "capricorne lisieux", "traitement charpente 14100", "colombages pays d'auge", "expert bois lisieux", "traitement colombage"],
};

export default function LisieuxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Lisieux",
            "description": "Diagnostic bois et traitement des pathologies a Lisieux (14100)",
            "telephone": "+33-2-33-31-19-79",
            "email": "aco.habitat@orange.fr",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "18 Rue Bernard Palissy",
              "addressLocality": "Alencon",
              "postalCode": "61000",
              "addressRegion": "Orne",
              "addressCountry": "FR"
            },
            "areaServed": ["Lisieux", "Pont-l'Eveque", "Orbec", "Livarot", "Saint-Pierre-sur-Dives"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; <Link href="/guide/diagnostic-bois-calvados">Calvados</Link> &gt; Lisieux
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0ea5e9" }}>Ville</span>
          <h1 className={styles.articleTitle}>Diagnostic bois a Lisieux (14100)</h1>
          <p className={styles.articleMeta}>
            Capitale du Pays d&apos;Auge · pays des colombages — Expert normand depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/traitement-poutres-pinceau.jpg"
          alt="Traitement de poutres au pinceau dans une maison a colombages de Lisieux"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Lisieux : le pays des maisons a colombages</h2>
          <p>
            Capitale du Pays d&apos;Auge, <strong>Lisieux</strong> et sa region concentrent un patrimoine exceptionnel
            de <strong>maisons a pans de bois (colombages)</strong>. Ce bati traditionnel, ou le bois est apparent et
            expose aux intemperies, est particulierement vulnerable aux insectes xylophages et aux champignons.
            Le climat doux et humide du Pays d&apos;Auge accentue encore ces risques.
          </p>
          <p>
            Manoirs augerons, fermes a colombages, chaumieres : ces constructions demandent une surveillance
            reguliere du bois. Nous intervenons a Lisieux et dans tout le Pays d&apos;Auge apres votre pre-analyse
            par photo.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Colombages : un bois a proteger en priorite</p>
            <p className={styles.alertText}>
              Le bois apparent des colombages est une cible privilegiee pour le capricorne, les vrillettes et
              les champignons. Envoyez vos photos pour une pre-analyse gratuite sous 24h.
            </p>
          </div>

          <h2>Pathologies frequentes a Lisieux et en Pays d&apos;Auge</h2>
          <ul>
            <li><strong>Le capricorne et les vrillettes</strong> dans les pans de bois et charpentes</li>
            <li><strong>La merule</strong> dans les parties basses humides des colombages</li>
            <li><strong>La pourriture</strong> du bois expose aux intemperies</li>
            <li><strong>L&apos;humidite</strong> liee aux torchis et remplissages anciens</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/poutre-capricorne-degat.jpg" alt="Degats de capricorne sur une poutre de colombage a Lisieux" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Degats sur colombage</strong>
                Poutre de pan de bois attaquee par les xylophages
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/traitement-poutres-pinceau.jpg" alt="Traitement de colombage au pinceau a Lisieux" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Traitement du bois</strong>
                Application d&apos;un produit curatif et preventif
              </figcaption>
            </figure>
          </div>

          <h2>Notre intervention a Lisieux et en Pays d&apos;Auge</h2>
          <p>
            Nous couvrons Lisieux et les communes du Pays d&apos;Auge : Pont-l&apos;Eveque, Orbec, Livarot,
            Saint-Pierre-sur-Dives. Notre experience des constructions a colombages nous permet un diagnostic
            precis et des preconisations respectueuses du bati ancien.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour Lisieux</h3>
              <p>Envoyez vos photos et recevez un avis d&apos;expert sous 24h</p>
            </div>
            <Link href="#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li><Link href="/guide/diagnostic-bois-calvados" style={{ color: "#059669" }}>Diagnostic bois dans le Calvados (14) &rarr;</Link></li>
            <li><Link href="/guide/capricorne" style={{ color: "#059669" }}>Guide sur le capricorne des maisons &rarr;</Link></li>
            <li><Link href="/guide/traitement-du-bois" style={{ color: "#059669" }}>Comment se deroule un traitement du bois &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-caen" style={{ color: "#059669" }}>Diagnostic bois a Caen &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
