import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois dans l'Orne (61) : merule, capricorne, traitement | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois dans l'Orne : Alencon, Flers, Argentan, L'Aigle, Mortagne-au-Perche. Expert local depuis 2006. Pre-analyse par photo sous 24h. Devis gratuit.",
  keywords: ["diagnostic bois orne", "merule orne", "capricorne orne", "traitement charpente alencon", "diagnostic bois flers", "expert bois argentan", "merule 61"],
};

export default function OrnePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Orne",
            "description": "Diagnostic bois et traitement des pathologies dans l'Orne (61)",
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
            "areaServed": ["Alencon", "Flers", "Argentan", "L'Aigle", "Mortagne-au-Perche", "La Ferte-Mace", "Domfront", "Sees"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; Orne (61)
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#059669" }}>Departement</span>
          <h1 className={styles.articleTitle}>Diagnostic bois dans l&apos;Orne (61)</h1>
          <p className={styles.articleMeta}>
            Alencon · Flers · Argentan · L&apos;Aigle · Mortagne-au-Perche — Expert local depuis 2006
          </p>
        </header>

        <Image 
          src="/images/pathologies/traitement-charpente-pulverisation.jpg" 
          alt="Traitement de charpente par pulverisation dans l'Orne - technicien ACO-HABITAT en intervention" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>L&apos;Orne : notre departement d&apos;implantation</h2>
          <p>
            Base a <strong>Alencon depuis 2006</strong>, nous intervenons sur l&apos;ensemble du departement de l&apos;Orne. 
            Ce departement normand, au climat oceanique humide, est particulierement touche par les pathologies du bois :
            merule, capricorne, vrillettes et problemes d&apos;humidite.
          </p>
          <p>
            Les maisons anciennes ornaises, souvent construites en pierre avec des charpentes en chene ou en pin, 
            necessitent une surveillance reguliere. Nous connaissons parfaitement les specificites locales et les 
            types de construction propres a notre departement.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Intervention rapide sur tout le departement</p>
            <p className={styles.alertText}>
              Etant bases a Alencon, nous pouvons intervenir rapidement sur l&apos;ensemble de l&apos;Orne. 
              Envoyez vos photos pour une pre-analyse gratuite sous 24h.
            </p>
          </div>

          <h2>Pathologies frequentes dans l&apos;Orne</h2>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/charpente-capricorne-severe.jpg" 
                alt="Charpente attaquee par le capricorne dans une maison de l'Orne" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Attaque de capricorne</strong>
                Charpente severement endommagee - intervention realisee dans l&apos;Orne
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/merule-mur-cave-1.jpg" 
                alt="Merule sur mur de cave dans une maison ornaise" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Merule en cave</strong>
                Taches orangees caracteristiques sur mur en pierre
              </figcaption>
            </figure>
          </div>

          <h3>La merule pleureuse</h3>
          <p>
            L&apos;Orne fait partie des departements normands ou la merule est endemique. Les maisons anciennes 
            d&apos;Alencon, Argentan ou Flers, souvent mal ventilees, sont particulierement exposees. 
            Le champignon se developpe dans les caves, derriere les doublages et sous les planchers.
          </p>

          <h3>Le capricorne des maisons</h3>
          <p>
            Les charpentes ornaises sont frequemment attaquees par le capricorne. Cet insecte xylophage 
            s&apos;attaque aux resineux (pin, sapin, epicea) et peut causer des degats structurels importants 
            si l&apos;infestation n&apos;est pas traitee.
          </p>

          <h3>Les vrillettes</h3>
          <p>
            Petite vrillette et grosse vrillette sont presentes dans tout le departement. Elles s&apos;attaquent 
            aussi bien aux charpentes qu&apos;aux meubles et boiseries interieures.
          </p>

          <h2>Villes principales de l&apos;Orne</h2>

          <div className={styles.regionGrid}>
            <div className={styles.regionCard}>
              <h4>Alencon (61000)</h4>
              <p>Prefecture de l&apos;Orne, ville historique avec un patrimoine bati ancien. Zone a risque merule dans le centre-ville.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Flers (61100)</h4>
              <p>Deuxieme ville du departement. Nombreuses maisons ouvrieres anciennes necessitant une surveillance.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Argentan (61200)</h4>
              <p>Ville historique au patrimoine medieval. Maisons a colombages et charpentes anciennes.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>L&apos;Aigle (61300)</h4>
              <p>Secteur bocager humide propice au developpement de la merule et des champignons lignivores.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>Mortagne-au-Perche (61400)</h4>
              <p>Cite de caractere du Perche. Maisons anciennes en pierre necessitant des diagnostics reguliers.</p>
            </div>
            <div className={styles.regionCard}>
              <h4>La Ferte-Mace (61600)</h4>
              <p>Secteur au climat humide. Problematiques d&apos;humidite et de champignons frequentes.</p>
            </div>
          </div>

          <h2>Notre expertise locale</h2>
          <p>
            En tant qu&apos;expert local base a Alencon, nous connaissons parfaitement les specificites du bati ornais :
          </p>
          <ul>
            <li>Maisons en pierre du Perche</li>
            <li>Constructions en brique de la campagne d&apos;Alencon</li>
            <li>Maisons a colombages d&apos;Argentan</li>
            <li>Pavillons des annees 60-80 avec charpentes industrielles</li>
          </ul>

          <Image 
            src="/images/pathologies/charpente-traditionnelle-saine.jpg" 
            alt="Charpente traditionnelle en bon etat dans l'Orne - exemple de bois sain" 
            width={1200} 
            height={400} 
            className={styles.heroImage}
            style={{ marginTop: 24 }}
          />

          <h2>Vous suspectez une infestation ?</h2>
          <p>
            Envoyez-nous vos photos pour une <strong>pre-analyse gratuite sous 24h</strong>. 
            Nous vous indiquerons s&apos;il y a lieu de s&apos;inquieter et quelles demarches entreprendre.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour l&apos;Orne</h3>
              <p>Envoyez vos photos et recevez un avis d&apos;expert sous 24h</p>
            </div>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li><Link href="/guide/merule" style={{ color: "#059669" }}>Guide complet sur la merule →</Link></li>
            <li><Link href="/guide/capricorne" style={{ color: "#059669" }}>Guide sur le capricorne des maisons →</Link></li>
            <li><Link href="/guide/vrillettes" style={{ color: "#059669" }}>Guide sur les vrillettes →</Link></li>
            <li><Link href="/guide/diagnostic-bois-normandie" style={{ color: "#059669" }}>Diagnostic bois en Normandie →</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
