import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois a Vire Normandie (14500) : merule, capricorne | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic et traitement du bois a Vire Normandie (Calvados) : merule, capricorne, vrillettes, humidite. Expert base a Alencon, a 75 km. Pre-analyse gratuite par photo sous 24h.",
  keywords: ["diagnostic bois vire", "merule vire normandie", "capricorne vire", "traitement charpente 14500", "expert bois bocage", "humidite vire"],
};

export default function VirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Vire Normandie",
            "description": "Diagnostic bois et traitement des pathologies a Vire Normandie (14500)",
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
            "areaServed": ["Vire Normandie", "Vaudry", "Roullours", "Saint-Sever-Calvados", "Coulonces"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; <Link href="/guide/diagnostic-bois-calvados">Calvados</Link> &gt; Vire Normandie
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0ea5e9" }}>Ville</span>
          <h1 className={styles.articleTitle}>Diagnostic bois a Vire Normandie (14500)</h1>
          <p className={styles.articleMeta}>
            Capitale du Bocage · a 75 km d&apos;Alencon — Expert normand depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/charpente-xylophages.jpg"
          alt="Charpente attaquee par les xylophages a Vire Normandie"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Vire Normandie : granit, bocage et humidite</h2>
          <p>
            <strong>Vire Normandie</strong>, capitale du Bocage virois, est batie sur un socle granitique dans un
            environnement vallonne et humide. Les maisons traditionnelles en granit, les charpentes anciennes et
            les fermes du bocage y sont exposees aux insectes xylophages (capricorne, vrillettes) et a la
            <strong> merule</strong> lorsque la ventilation est insuffisante.
          </p>
          <p>
            Reconstruite apres 1944, la ville compte de nombreux immeubles d&apos;apres-guerre ainsi qu&apos;un bati
            rural ancien alentour. A <strong>75 km d&apos;Alencon</strong>, Vire s&apos;inscrit dans notre zone
            d&apos;intervention dans le sud-ouest du Calvados.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Charpentes du Bocage a surveiller</p>
            <p className={styles.alertText}>
              Le climat humide du Bocage favorise les pathologies du bois. Envoyez vos photos pour savoir
              rapidement si votre charpente est atteinte, gratuitement et sous 24h.
            </p>
          </div>

          <h2>Pathologies frequentes a Vire</h2>
          <ul>
            <li><strong>Le capricorne des maisons</strong> dans les charpentes resineuses</li>
            <li><strong>Les vrillettes</strong> dans les boiseries et poutres anciennes</li>
            <li><strong>La merule</strong> dans les caves et pieces mal ventilees</li>
            <li><strong>L&apos;humidite</strong> liee au climat et aux murs epais en granit</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/poutre-galeries-xylophages.jpg" alt="Galeries de xylophages dans une poutre a Vire" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Galeries de xylophages</strong>
                Bois creuse par les larves d&apos;insectes
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/vrillettes-trous-poutre.jpg" alt="Trous de vrillettes dans une poutre a Vire" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Trous de vrillettes</strong>
                Petits orifices de sortie caracteristiques
              </figcaption>
            </figure>
          </div>

          <h2>Notre intervention a Vire et dans le Bocage</h2>
          <p>
            Nous couvrons Vire Normandie et les communes voisines : Vaudry, Roullours, Saint-Sever-Calvados,
            Coulonces et tout le Bocage. Diagnostic sur place apres pre-analyse et preconisations de traitement.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour Vire Normandie</h3>
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
            <li><Link href="/guide/vrillettes" style={{ color: "#059669" }}>Guide sur les vrillettes &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-conde-en-normandie" style={{ color: "#059669" }}>Diagnostic bois a Conde-en-Normandie &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
