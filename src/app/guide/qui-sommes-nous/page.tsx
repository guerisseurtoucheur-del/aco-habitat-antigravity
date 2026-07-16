import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Qui sommes-nous : ACO-HABITAT, expert du bois depuis 2006 | DIAGNOSTIC-BOIS.COM",
  description:
    "ACO-HABITAT, entreprise basée à Alençon (61), traite et restaure les bois du bâti depuis 2006. Découvrez notre expertise terrain, notre méthode et notre pré-analyse par IA. Marque déposée à l'INPI.",
  keywords: [
    "ACO-HABITAT",
    "expert traitement bois",
    "entreprise diagnostic bois Alençon",
    "traitement charpente Normandie",
    "restauration bois ancien",
  ],
};

const chiffres = [
  { num: "2006", label: "Année de création" },
  { num: "20 ans", label: "d'expertise terrain" },
  { num: "INPI", label: "Marque déposée n° 5266768" },
  { num: "Alençon", label: "Basés dans l'Orne (61)" },
];

export default function QuiSommesNousPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Qui sommes-nous — ACO-HABITAT",
            about: {
              "@type": "LocalBusiness",
              name: "ACO-HABITAT",
              foundingDate: "2006",
              address: {
                "@type": "PostalAddress",
                streetAddress: "18 Rue Bernard Palissy",
                postalCode: "61000",
                addressLocality: "Alençon",
                addressCountry: "FR",
              },
              telephone: "+33233311979",
              email: "aco.habitat@orange.fr",
            },
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Qui sommes-nous
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag}>À propos</span>
          <h1 className={styles.articleTitle}>ACO-HABITAT, expert du bois depuis 2006</h1>
          <p className={styles.articleMeta}>Traitement, restauration et diagnostic du bois · Alençon (61)</p>
        </header>

        <Image
          src="/realisations/traitement-maitresse-poutre.png"
          alt="Technicien ACO-HABITAT traitant une maîtresse-poutre en chêne au pinceau"
          width={1200}
          height={500}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 16,
              margin: "8px 0 32px",
            }}
          >
            {chiffres.map((c) => (
              <div
                key={c.label}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "18px 16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}>{c.num}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, lineHeight: 1.4 }}>{c.label}</div>
              </div>
            ))}
          </div>

          <h2>Notre histoire</h2>
          <p>
            Depuis <strong>2006</strong>, ACO-HABITAT accompagne les particuliers et les propriétaires de bâtisses
            anciennes dans le <strong>traitement et la restauration de leurs bois</strong>. De la charpente attaquée par
            les insectes à la poutre menacée par un champignon, nous intervenons sur le terrain, au plus près des
            pathologies réelles du bâti.
          </p>
          <p>
            Cette expérience de terrain, accumulée chantier après chantier, est aujourd&apos;hui au cœur de notre
            service en ligne&nbsp;: <strong>diagnostic-bois.com</strong>.
          </p>

          <h2>Notre expertise</h2>
          <p>Nous intervenons sur l&apos;ensemble des pathologies du bois de construction&nbsp;:</p>
          <ul>
            <li>
              <strong>Champignons lignivores</strong> — mérule, coniophore et autres pourritures.
            </li>
            <li>
              <strong>Insectes xylophages</strong> — capricorne, vrillettes, lyctus, termites.
            </li>
            <li>
              <strong>Humidité</strong> — diagnostic des causes et protection durable des structures.
            </li>
            <li>
              <strong>Restauration</strong> — consolidation, renforcement et remise en valeur des bois anciens.
            </li>
          </ul>

          <h2>De l&apos;expertise terrain à l&apos;intelligence artificielle</h2>
          <p>
            Nous avons conçu une <strong>pré-analyse en ligne par intelligence artificielle</strong> qui s&apos;appuie
            directement sur notre expérience. L&apos;IA compare vos photos aux pathologies que nous traitons au
            quotidien depuis près de 20 ans, pour vous donner une première évaluation fiable, gratuite et en quelques
            minutes. Ce n&apos;est pas un gadget&nbsp;: c&apos;est notre savoir-faire, mis à la portée de tous.
          </p>

          <div className={`${styles.alertBox} ${styles.success}`}>
            <p className={styles.alertTitle}>Une marque et une méthode protégées</p>
            <p className={styles.alertText}>
              ACO HABITAT est une marque déposée à l&apos;INPI (n° 5266768). Notre méthode de pré-analyse et le format de
              nos rapports sont protégés par un dépôt probatoire horodaté e-Soleau auprès de l&apos;INPI.
            </p>
          </div>

          <h2>Nous contacter</h2>
          <ul>
            <li>
              <strong>Adresse</strong> — 18 Rue Bernard Palissy, 61000 Alençon
            </li>
            <li>
              <strong>Téléphone</strong> — 02 33 31 19 79
            </li>
            <li>
              <strong>Email</strong> — aco.habitat@orange.fr
            </li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Un doute sur l&apos;état de vos bois&nbsp;?</h3>
            <p className={styles.ctaBoxText}>
              Profitez de 20 ans d&apos;expertise terrain avec notre pré-analyse gratuite par IA.
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
              <Link href="/guide/traitement-du-bois" style={{ color: "#059669" }}>
                Comment se déroule un traitement du bois →
              </Link>
            </li>
            <li>
              <Link href="/guide/faq" style={{ color: "#059669" }}>
                Questions fréquentes →
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
