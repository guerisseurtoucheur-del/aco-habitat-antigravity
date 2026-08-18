import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois a Falaise (14700) : merule, capricorne, traitement | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic et traitement du bois a Falaise (Calvados) : merule, capricorne, vrillettes, humidite. Expert base a Alencon, a 55 km. Pre-analyse gratuite par photo sous 24h.",
  keywords: ["diagnostic bois falaise", "merule falaise", "capricorne falaise", "traitement charpente falaise", "traitement bois 14700", "expert bois falaise", "humidite falaise"],
};

export default function FalaisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Falaise",
            "description": "Diagnostic bois et traitement des pathologies a Falaise (14700)",
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
            "areaServed": ["Falaise", "Pont-d'Ouilly", "Morteaux-Couliboeuf", "Potigny", "Saint-Pierre-en-Auge"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; <Link href="/guide/diagnostic-bois-calvados">Calvados</Link> &gt; Falaise
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0ea5e9" }}>Ville</span>
          <h1 className={styles.articleTitle}>Diagnostic bois a Falaise (14700)</h1>
          <p className={styles.articleMeta}>
            Sud Calvados · a 55 km d&apos;Alencon — Intervention rapide par un expert local depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/charpente-ancienne-combles.jpg"
          alt="Charpente ancienne dans une maison de Falaise dans le Calvados"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Falaise : cite medievale, bati ancien a surveiller</h2>
          <p>
            Ville natale de Guillaume le Conquerant, <strong>Falaise</strong> possede un riche patrimoine bati :
            maisons anciennes en pierre de taille, immeubles reconstruits apres 1944 et fermes du plateau. Ce bati
            ancien, combine au climat humide du sud Calvados, expose particulierement les charpentes et planchers
            a la <strong>merule</strong>, au capricorne et aux vrillettes.
          </p>
          <p>
            Situee a seulement <strong>55 km de notre base d&apos;Alencon</strong>, Falaise fait partie de nos secteurs
            d&apos;intervention prioritaires. Nous pouvons nous y rendre rapidement pour un diagnostic approfondi apres
            votre pre-analyse par photo.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Un doute sur votre charpente a Falaise ?</p>
            <p className={styles.alertText}>
              Envoyez vos photos : vous recevez une pre-analyse gratuite sous 24h, puis un rendez-vous rapide
              sur place grace a notre proximite.
            </p>
          </div>

          <h2>Les pathologies les plus courantes a Falaise</h2>
          <p>
            Les maisons du secteur de Falaise, souvent construites en pierre calcaire avec des charpentes en chene
            ou en resineux, presentent regulierement :
          </p>
          <ul>
            <li><strong>La merule</strong> dans les caves, vides sanitaires et derriere les doublages mal ventiles</li>
            <li><strong>Le capricorne des maisons</strong> dans les charpentes resineuses</li>
            <li><strong>Les vrillettes</strong> dans les boiseries, escaliers et meubles anciens</li>
            <li><strong>L&apos;humidite</strong> par remontees capillaires dans les murs anciens</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/poutre-capricorne-degat.jpg" alt="Poutre attaquee par le capricorne a Falaise" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Degats de capricorne</strong>
                Galeries creusees dans une poutre de charpente
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/merule-mur-cave-1.jpg" alt="Merule dans une cave a Falaise" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Merule en cave</strong>
                Developpement favorise par l&apos;humidite du sous-sol
              </figcaption>
            </figure>
          </div>

          <h2>Notre intervention a Falaise et alentours</h2>
          <p>
            Nous couvrons Falaise et les communes voisines : Pont-d&apos;Ouilly, Morteaux-Couliboeuf, Potigny,
            Saint-Pierre-en-Auge et tout le sud du Calvados. Diagnostic, identification de la pathologie et
            preconisations de traitement adapte.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour Falaise</h3>
              <p>Envoyez vos photos et recevez un avis d&apos;expert sous 24h</p>
            </div>
            <Link href="#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li><Link href="/guide/diagnostic-bois-calvados" style={{ color: "#059669" }}>Diagnostic bois dans le Calvados (14) &rarr;</Link></li>
            <li><Link href="/guide/merule" style={{ color: "#059669" }}>Guide complet sur la merule &rarr;</Link></li>
            <li><Link href="/guide/capricorne" style={{ color: "#059669" }}>Guide sur le capricorne des maisons &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-orne" style={{ color: "#059669" }}>Diagnostic bois dans l&apos;Orne (61) &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
