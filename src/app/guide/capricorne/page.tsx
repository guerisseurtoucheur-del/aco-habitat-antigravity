import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Le Capricorne des maisons : identification et traitement | DIAGNOSTIC-BOIS.COM",
  description: "Guide complet sur le capricorne des maisons (Hylotrupes bajulus). Identifier les degats, reconnaitre les signes d'infestation et les solutions de traitement. Expert bois depuis 2006.",
  keywords: ["capricorne des maisons", "hylotrupes bajulus", "insecte xylophage", "traitement capricorne", "charpente", "larve capricorne", "bois attaque"],
  openGraph: {
    title: "Le Capricorne des maisons : identification et traitement",
    description: "Guide complet sur le capricorne des maisons. Identifier les degats et solutions de traitement.",
    type: "article",
    images: [
      {
        url: "https://diagnostic-bois.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Expert en traitement du bois - DIAGNOSTIC-BOIS.COM",
      },
    ],
  },
};

export default function CapricornePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Le Capricorne des maisons : identification et traitement",
            "description": "Guide complet sur le capricorne, l'insecte xylophage qui s'attaque aux charpentes",
            "author": { "@type": "Organization", "name": "ACO-HABITAT" },
            "publisher": { "@type": "Organization", "name": "DIAGNOSTIC-BOIS.COM" },
            "datePublished": "2024-01-15",
            "dateModified": "2026-05-26"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Capricorne
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#f59e0b" }}>Insecte xylophage</span>
          <h1 className={styles.articleTitle}>Le Capricorne des maisons : l&apos;ennemi des charpentes</h1>
          <p className={styles.articleMeta}>Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006</p>
        </header>

        <Image 
          src="/images/pathologies/poutre-capricorne-degat.jpg" 
          alt="Poutre de charpente detruite par le capricorne des maisons - vermoulure et galeries visibles" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <div className={styles.toc}>
            <p className={styles.tocTitle}>Sommaire</p>
            <ol className={styles.tocList}>
              <li><a href="#presentation">Presentation du capricorne</a></li>
              <li><a href="#cycle">Cycle de vie</a></li>
              <li><a href="#identifier">Reconnaitre une infestation</a></li>
              <li><a href="#degats">Les degats causes</a></li>
              <li><a href="#traitement">Solutions de traitement</a></li>
              <li><a href="#prevention">Prevention</a></li>
            </ol>
          </div>

          <h2 id="presentation">Qu&apos;est-ce que le capricorne des maisons ?</h2>
          <p>
            Le <strong>capricorne des maisons</strong> (Hylotrupes bajulus) est l&apos;insecte xylophage le plus repandu 
            et le plus destructeur en France. Cet insecte s&apos;attaque exclusivement aux <strong>bois resineux</strong> 
            (pin, sapin, epicea) qui composent la majorite des charpentes traditionnelles.
          </p>
          <p>
            L&apos;adulte est un coleoptere brun-noir de 10 a 25 mm, mais ce sont les <strong>larves</strong> qui causent 
            les degats. Elles peuvent vivre dans le bois pendant 3 a 10 ans, creusant des galeries et fragilisant 
            progressivement la structure.
          </p>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Insecte a degradation obligatoire</p>
            <p className={styles.alertText}>
              Le capricorne figure sur la liste des insectes a degradation obligatoire. Un diagnostic termites/insectes 
              xylophages est obligatoire lors de la vente d&apos;un bien dans les zones declarees a risque.
            </p>
          </div>

          <h2 id="cycle">Cycle de vie du capricorne</h2>
          <p>Le cycle de vie du capricorne est particulierement long :</p>
          <ul>
            <li><strong>Ponte</strong> — La femelle pond 20 a 80 oeufs dans les fissures du bois</li>
            <li><strong>Eclosion</strong> — Les oeufs eclosent en 2 a 3 semaines</li>
            <li><strong>Phase larvaire</strong> — Les larves se developpent pendant 3 a 10 ans (!), creusant des galeries</li>
            <li><strong>Nymphose</strong> — La larve se transforme en nymphe pres de la surface</li>
            <li><strong>Emergence</strong> — L&apos;adulte perce un trou ovale de 6 a 10 mm pour sortir (juin a aout)</li>
          </ul>
          <p>
            Cette longue phase larvaire explique pourquoi les degats peuvent etre considerables avant qu&apos;on ne 
            detecte l&apos;infestation.
          </p>

          <h2 id="identifier">Reconnaitre une infestation de capricorne</h2>
          <h3>Signes visuels</h3>
          <ul>
            <li><strong>Trous de sortie ovales</strong> — Orifices de 6 a 10 mm de forme ovale a la surface du bois</li>
            <li><strong>Galeries</strong> — Si le bois est ouvert, galeries paralleles aux fibres, remplies de sciure compactee (vermoulure)</li>
            <li><strong>Vermoulure</strong> — Fine sciure de bois en forme de petits tonnelets</li>
            <li><strong>Surface ondulee</strong> — Deformations sous la surface du bois</li>
          </ul>

          <h3>Signes sonores</h3>
          <ul>
            <li><strong>Bruit de grignotement</strong> — Dans le silence, on peut entendre les larves ronger le bois (cri-cri caracteristique)</li>
          </ul>

          <h3>A ne pas confondre avec</h3>
          <p>
            Les vrillettes laissent des trous ronds plus petits (1 a 4 mm). Les termites ne laissent pas de trous 
            de sortie visibles.
          </p>

          <h2 id="degats">Les degats causes par le capricorne</h2>
          <p>
            Le capricorne s&apos;attaque principalement aux :
          </p>
          <ul>
            <li>Charpentes (poutres, chevrons, pannes)</li>
            <li>Planchers en bois resineux</li>
            <li>Escaliers</li>
            <li>Huisseries (portes, fenetres)</li>
          </ul>
          <p>
            Les larves peuvent <strong>detruire jusqu&apos;a 80% de la section d&apos;une poutre</strong> tout en 
            laissant une fine pellicule de bois intact en surface, donnant une fausse impression de solidite.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Risque d&apos;effondrement</p>
            <p className={styles.alertText}>
              Une charpente gravement infestee peut s&apos;effondrer sans signe avant-coureur apparent. 
              C&apos;est pourquoi un diagnostic preventif regulier est essentiel.
            </p>
          </div>

          <h2 id="traitement">Solutions de traitement</h2>
          
          <h3>Traitement curatif par injection</h3>
          <p>
            Pour les bois en place, le traitement consiste a injecter un produit insecticide dans le bois :
          </p>
          <ul>
            <li>Percage de trous tous les 30-40 cm</li>
            <li>Injection sous pression d&apos;un produit certifie CTB-P+</li>
            <li>Pulverisation de surface</li>
          </ul>

          <h3>Traitement par gel</h3>
          <p>
            Application d&apos;un gel insecticide qui penetre progressivement dans le bois. Moins intrusif que l&apos;injection.
          </p>

          <h3>Traitement thermique</h3>
          <p>
            Elevation de la temperature du bois a plus de 56°C pour tuer les larves. Technique sans produit chimique 
            mais necessitant un equipement specialise.
          </p>

          <h3>Remplacement</h3>
          <p>
            Si le bois est trop degrade (perte de section superieure a 30-50%), le remplacement ou le renforcement 
            de la piece est necessaire.
          </p>

          <h2 id="prevention">Prevention contre le capricorne</h2>
          <ul>
            <li><strong>Bois traite</strong> — Utiliser des bois traites classe 2 minimum pour les charpentes</li>
            <li><strong>Ventilation</strong> — Assurer une bonne ventilation des combles</li>
            <li><strong>Inspection reguliere</strong> — Faire controler la charpente tous les 5 a 10 ans</li>
            <li><strong>Traitement preventif</strong> — Appliquer un traitement preventif sur les bois neufs</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Suspicion d&apos;infestation de capricorne ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez des photos de votre charpente ou des degats constates. Notre IA analyse les indices 
              et vous oriente vers les bonnes solutions.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/vrillettes" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Les vrillettes</p>
                <p className={styles.relatedCardDesc}>Autre insecte xylophage frequent, les vrillettes s&apos;attaquent a tous types de bois.</p>
              </Link>
              <Link href="/guide/termites" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Les termites</p>
                <p className={styles.relatedCardDesc}>Insectes souterrains qui attaquent le bois de l&apos;interieur sans trace visible.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
