import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Comment se déroule un traitement du bois ? Les étapes | DIAGNOSTIC-BOIS.COM",
  description:
    "Découvrez comment ACO-HABITAT traite les charpentes, poutres et bois attaqués : diagnostic, bûchage, pulvérisation, injection et protection. 20 ans d'expertise terrain depuis 2006.",
  keywords: [
    "traitement du bois",
    "traitement charpente",
    "traitement curatif bois",
    "traitement préventif charpente",
    "pulvérisation traitement bois",
    "injection poutre",
    "traitement mérule capricorne",
  ],
};

const etapes = [
  {
    num: "1",
    title: "Diagnostic et repérage",
    text: "Identification précise de la pathologie (insectes xylophages, champignons lignivores, humidité) et de son étendue. Chaque intervention commence par ce constat, souvent amorcé par notre pré-analyse en ligne.",
  },
  {
    num: "2",
    title: "Préparation et bûchage",
    text: "Brossage et bûchage des parties altérées pour retirer le bois dégradé et atteindre le bois sain. Cette étape est indispensable pour que le traitement pénètre efficacement.",
  },
  {
    num: "3",
    title: "Traitement curatif",
    text: "Application du produit adapté par pulvérisation, injection sous pression dans les bois de forte section, ou badigeon. Le technicien intervient toujours en équipement de protection complet.",
  },
  {
    num: "4",
    title: "Traitement préventif",
    text: "Protection durable de l'ensemble de la structure pour empêcher toute nouvelle attaque d'insectes ou de champignons, y compris sur les bois sains.",
  },
  {
    num: "5",
    title: "Renforcement si nécessaire",
    text: "Consolidation, moisage ou remplacement des éléments de charpente trop atteints pour garantir la solidité de la structure.",
  },
  {
    num: "6",
    title: "Contrôle final",
    text: "Vérification de la bonne réalisation et conseils d'entretien pour préserver durablement vos bois.",
  },
];

const avant = [
  {
    src: "/realisations/merule-mur.jpeg",
    alt: "Mérule (Serpula lacrymans), champignon lignivore brun à bordure blanche s'étalant sur un mur",
    title: "Mérule sur un mur",
    desc: "Champignon lignivore parmi les plus destructeurs pour le bâti.",
  },
  {
    src: "/realisations/poutre-degradee-insectes.jpeg",
    alt: "Poutre en bois fortement dégradée en surface par des insectes xylophages",
    title: "Poutre attaquée",
    desc: "Surface qui s'effrite, signe d'une infestation avancée.",
  },
  {
    src: "/realisations/bois-galeries-insectes.jpeg",
    alt: "Bois criblé de galeries et de trous de sortie d'insectes xylophages près d'un mur en brique",
    title: "Galeries d'insectes",
    desc: "Trous de sortie et galeries typiques du capricorne ou de la vrillette.",
  },
];

export default function TraitementDuBoisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Comment se déroule un traitement du bois",
            description:
              "Les étapes d'un traitement curatif et préventif du bois par ACO-HABITAT : diagnostic, bûchage, pulvérisation, injection, protection et renforcement.",
            step: etapes.map((e) => ({
              "@type": "HowToStep",
              position: Number(e.num),
              name: e.title,
              text: e.text,
            })),
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Le traitement du bois
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag}>Nos interventions</span>
          <h1 className={styles.articleTitle}>Comment se déroule un traitement du bois ?</h1>
          <p className={styles.articleMeta}>
            ACO-HABITAT · Traitement curatif et préventif du bois depuis 2006 · Alençon (61)
          </p>
        </header>

        <Image
          src="/realisations/pulverisation-charpente.jpeg"
          alt="Technicien ACO-HABITAT pulvérisant un produit de traitement sur une charpente, en combinaison et masque de protection"
          width={1200}
          height={500}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Un traitement, pourquoi ?</h2>
          <p>
            Quand la charpente ou les planchers d&apos;une maison sont attaqués par des{" "}
            <strong>insectes xylophages</strong> (capricorne, vrillette, lyctus) ou des{" "}
            <strong>champignons lignivores</strong> (mérule, coniophore), le bois perd peu à peu sa résistance. Sans
            intervention, les dégâts s&apos;aggravent et peuvent menacer la solidité du bâtiment.
          </p>
          <p>
            Chez ACO-HABITAT, nous traitons ces pathologies sur le terrain{" "}
            <strong>depuis 2006</strong>. Voici concrètement comment se déroule une intervention.
          </p>

          <h2>Ce que nous traitons</h2>
          <p>Quelques exemples de pathologies rencontrées sur nos chantiers, avant traitement :</p>

          <div className={styles.imageGallery}>
            {avant.map((r) => (
              <figure key={r.src} className={styles.imageCard}>
                <Image src={r.src} alt={r.alt} width={600} height={400} />
                <figcaption className={styles.imageCaption}>
                  <strong>{r.title}</strong>
                  {r.desc}
                </figcaption>
              </figure>
            ))}
          </div>

          <h2>Les étapes d&apos;un traitement</h2>
          <ul>
            {etapes.map((e) => (
              <li key={e.num}>
                <strong>
                  Étape {e.num} — {e.title}
                </strong>{" "}
                — {e.text}
              </li>
            ))}
          </ul>

          <div className={`${styles.alertBox} ${styles.success}`}>
            <p className={styles.alertTitle}>Une intervention toujours sécurisée</p>
            <p className={styles.alertText}>
              Nos techniciens interviennent en équipement de protection complet (combinaison, masque respiratoire à
              filtration). Les produits utilisés sont appliqués dans le respect des normes de sécurité pour les
              occupants comme pour l&apos;intervenant.
            </p>
          </div>

          <h2>Commencez par une pré-analyse gratuite</h2>
          <p>
            Avant même de nous déplacer, notre <strong>pré-analyse en ligne par intelligence artificielle</strong> vous
            aide à savoir en quelques minutes si vos bois nécessitent un traitement. Vous envoyez vos photos, l&apos;IA
            les compare aux pathologies que nous traitons au quotidien, et vous obtenez une première évaluation.
          </p>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vos bois sont-ils attaqués ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez une pré-analyse par IA, appuyée sur 20 ans d&apos;expertise terrain.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li>
              <Link href="/guide/notre-savoir-faire" style={{ color: "#059669" }}>
                Notre savoir-faire et nos réalisations →
              </Link>
            </li>
            <li>
              <Link href="/guide/merule" style={{ color: "#059669" }}>
                Guide complet sur la mérule →
              </Link>
            </li>
            <li>
              <Link href="/guide/capricorne" style={{ color: "#059669" }}>
                Guide sur le capricorne des maisons →
              </Link>
            </li>
          </ul>

          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
            ACO-HABITAT · Marque déposée à l&apos;INPI n° 5266768 · Méthode et format de rapport protégés (dépôt
            e-Soleau INPI).
          </p>
        </div>
      </article>
    </>
  );
}
