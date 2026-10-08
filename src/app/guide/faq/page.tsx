import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "FAQ : questions fréquentes sur le diagnostic et le traitement du bois | DIAGNOSTIC-BOIS.COM",
  description:
    "Mérule, capricorne, prix d'un traitement, obligations légales, déroulé d'une intervention : les réponses aux questions les plus fréquentes sur le diagnostic et le traitement du bois.",
  keywords: [
    "faq diagnostic bois",
    "prix traitement charpente",
    "mérule obligation légale",
    "reconnaître mérule",
    "différence capricorne vrillette",
    "traitement bois durée",
  ],
};

const faqs = [
  {
    q: "Comment reconnaître la mérule&nbsp;?",
    plain: "Comment reconnaître la mérule ?",
    a: "La mérule se présente sous forme d'une masse cotonneuse blanche puis d'une surface brun-orangé à bordure claire. Elle dégage une odeur de moisi et fait brunir le bois qui se fend en petits cubes (pourriture cubique). Elle se développe dans les zones humides et mal ventilées. Au moindre doute, faites vérifier vos bois rapidement, car elle peut se propager à travers les murs.",
  },
  {
    q: "Quelle est la différence entre le capricorne et la vrillette&nbsp;?",
    plain: "Quelle est la différence entre le capricorne et la vrillette ?",
    a: "Le capricorne des maisons s'attaque surtout aux bois résineux de charpente et creuse de grosses galeries ovales ; on entend parfois les larves grignoter. La vrillette, plus petite, laisse de nombreux trous ronds de 1 à 3 mm et une fine sciure. Dans les deux cas, une intervention est nécessaire pour stopper l'infestation.",
  },
  {
    q: "Combien coûte un traitement de charpente&nbsp;?",
    plain: "Combien coûte un traitement de charpente ?",
    a: "Le prix dépend de la surface à traiter, de l'accessibilité, de la pathologie et de l'état des bois (simple traitement ou renforcement). Chaque situation étant différente, le tarif se détermine après diagnostic. Notre pré-analyse en ligne gratuite vous donne déjà une première idée de la nature du problème avant tout devis.",
  },
  {
    q: "La mérule doit-elle être déclarée&nbsp;? Que dit la loi&nbsp;?",
    plain: "La mérule doit-elle être déclarée ? Que dit la loi ?",
    a: "Oui. En France, l'occupant ou le propriétaire qui a connaissance de la présence de mérule doit en faire la déclaration en mairie. Lors d'une vente immobilière dans une zone déclarée à risque par arrêté préfectoral, une information de l'acquéreur sur ce risque est obligatoire. Ces règles visent à limiter la propagation du champignon.",
  },
  {
    q: "Comment se déroule une intervention de traitement&nbsp;?",
    plain: "Comment se déroule une intervention de traitement ?",
    a: "L'intervention suit plusieurs étapes : diagnostic et repérage, bûchage des parties dégradées, traitement curatif (pulvérisation, injection ou badigeon), traitement préventif de la structure, renforcement des éléments trop atteints si nécessaire, puis contrôle final. Nos techniciens interviennent toujours en équipement de protection complet.",
  },
  {
    q: "La pré-analyse en ligne est-elle payante&nbsp;?",
    plain: "La pré-analyse en ligne est-elle payante ?",
    a: "Non, la pré-analyse par intelligence artificielle est gratuite. Vous envoyez vos photos et vous recevez une première évaluation de la pathologie. C'est un point de départ : elle ne remplace pas un diagnostic complet sur place, mais elle vous aide à savoir si une intervention est nécessaire.",
  },
  {
    q: "La pré-analyse par IA remplace-t-elle un diagnostic sur place&nbsp;?",
    plain: "La pré-analyse par IA remplace-t-elle un diagnostic sur place ?",
    a: "Non. La pré-analyse oriente et alerte, mais seul un examen sur site permet de confirmer la pathologie, d'en mesurer l'étendue et de définir le traitement adapté. Notre outil s'appuie sur 20 ans d'expertise terrain pour fiabiliser cette première étape.",
  },
  {
    q: "Dans quelles régions intervenez-vous&nbsp;?",
    plain: "Dans quelles régions intervenez-vous ?",
    a: "Basés à Alençon (61), nous intervenons en Normandie et dans les départements voisins (Orne, Sarthe, Mayenne, Eure, Eure-et-Loir), ainsi que plus largement en France. La pré-analyse en ligne, elle, est accessible partout.",
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.plain,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; FAQ
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag}>Questions fréquentes</span>
          <h1 className={styles.articleTitle}>Vos questions sur le diagnostic et le traitement du bois</h1>
          <p className={styles.articleMeta}>
            ACO-HABITAT · Expert en diagnostic et traitement du bois depuis 2006 · Alençon (61)
          </p>
        </header>

        <div className={styles.articleContent}>
          <p>
            Vous vous interrogez sur une pathologie du bois, un traitement ou nos services&nbsp;? Voici les réponses aux
            questions que l&apos;on nous pose le plus souvent.
          </p>

          {faqs.map((f) => (
            <div key={f.plain} style={{ marginTop: 8 }}>
              <h2 dangerouslySetInnerHTML={{ __html: f.q }} />
              <p>{f.a}</p>
            </div>
          ))}

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Une autre question sur vos bois&nbsp;?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez une pré-analyse gratuite par IA, appuyée sur 20 ans d&apos;expertise
              terrain.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li>
              <Link href="/guide/reconnaitre-les-pathologies" style={{ color: "#059669" }}>
                Reconnaître les pathologies du bois →
              </Link>
            </li>
            <li>
              <Link href="/guide/traitement-du-bois" style={{ color: "#059669" }}>
                Comment se déroule un traitement du bois →
              </Link>
            </li>
            <li>
              <Link href="/guide/merule" style={{ color: "#059669" }}>
                Guide complet sur la mérule →
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
