import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "./guide.module.css";

export const metadata: Metadata = {
  title: "Guide du diagnostic bois et humidite | DIAGNOSTIC-BOIS.COM",
  description: "Guides complets sur les pathologies du bois : merule, capricorne, termites, vrillettes, humidite. Apprenez a identifier les problemes et proteger votre habitation.",
  keywords: ["diagnostic bois", "merule", "capricorne", "termites", "vrillettes", "humidite", "champignon", "insecte xylophage", "traitement bois"],
  openGraph: {
    title: "Guide du diagnostic bois et humidite",
    description: "Guides complets sur les pathologies du bois : merule, capricorne, termites, vrillettes, humidite.",
    type: "website",
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

export default function GuidePage() {
  const guides = [
    {
      title: "La Merule : le champignon destructeur",
      description: "Tout savoir sur la merule pleureuse, le champignon le plus devastateur pour les habitations. Identification, prevention et traitement.",
      href: "/guide/merule",
      tag: "Champignon",
      tagColor: "#ef4444",
    },
    {
      title: "Le Capricorne des maisons",
      description: "Identifier et traiter les infestations de capricorne, l'insecte xylophage qui s'attaque aux charpentes et bois de structure.",
      href: "/guide/capricorne",
      tag: "Insecte",
      tagColor: "#f59e0b",
    },
    {
      title: "Les Termites : menace invisible",
      description: "Comment detecter une infestation de termites et proteger votre habitation contre ces insectes qui travaillent dans l'ombre.",
      href: "/guide/termites",
      tag: "Insecte",
      tagColor: "#f59e0b",
    },
    {
      title: "Les Vrillettes du bois",
      description: "Petites vrillettes et grosses vrillettes : identification des degats, cycle de vie et solutions de traitement efficaces.",
      href: "/guide/vrillettes",
      tag: "Insecte",
      tagColor: "#f59e0b",
    },
    {
      title: "Problemes d'humidite dans le bois",
      description: "Causes et consequences de l'humidite excessive sur les structures en bois. Diagnostic et solutions durables.",
      href: "/guide/humidite",
      tag: "Humidite",
      tagColor: "#3b82f6",
    },
    {
      title: "Pourriture cubique et champignons lignivores",
      description: "Coniophore, lenzite, polypore : reconnaitre la pourriture brune du bois, la differencier de la merule et la traiter.",
      href: "/guide/pourriture-cubique",
      tag: "Champignon",
      tagColor: "#b45309",
    },
    {
      title: "Le Lyctus : l'insecte du chene",
      description: "L'insecte xylophage qui devore les bois feuillus (chene, frene) : parquets, meubles et boiseries. Identification et traitement.",
      href: "/guide/lyctus",
      tag: "Insecte",
      tagColor: "#a16207",
    },
    {
      title: "Merule : obligations legales et vente",
      description: "Obligation d'information, zones a risque, vice cache : ce que dit la loi sur la merule lors d'une vente immobiliere.",
      href: "/guide/merule-obligations-legales",
      tag: "Reglementation",
      tagColor: "#dc2626",
    },
  ];

  const regions = [
    { name: "Normandie", href: "/guide/diagnostic-bois-normandie" },
    { name: "Bretagne", href: "/guide/diagnostic-bois-bretagne" },
    { name: "Ile-de-France", href: "/guide/diagnostic-bois-ile-de-france" },
    { name: "Pays de la Loire", href: "/guide/diagnostic-bois-pays-de-la-loire" },
    { name: "Nouvelle-Aquitaine", href: "/guide/diagnostic-bois-nouvelle-aquitaine" },
    { name: "Hauts-de-France", href: "/guide/diagnostic-bois-hauts-de-france" },
    { name: "Grand Est", href: "/guide/diagnostic-bois-grand-est" },
    { name: "PACA", href: "/guide/diagnostic-bois-paca" },
  ];

  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; Guide du diagnostic bois
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag}>Ressources</span>
          <h1 className={styles.articleTitle}>Guide complet du diagnostic bois et humidite</h1>
          <p className={styles.articleMeta}>
            Tout ce que vous devez savoir pour identifier et traiter les pathologies du bois dans votre habitation.
          </p>
        </header>

        <div className={styles.articleContent}>
          <h2>Pathologies du bois</h2>
          <p>
            Le bois est un materiau noble mais vulnerable. Champignons, insectes xylophages et humidite peuvent compromettre 
            l&apos;integrite structurelle de votre habitation. Apprenez a identifier ces menaces pour agir rapidement.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, margin: "24px 0" }}>
            {guides.map((guide) => (
              <Link 
                key={guide.href} 
                href={guide.href}
                style={{
                  display: "block",
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 20,
                  textDecoration: "none",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ 
                  display: "inline-block", 
                  background: guide.tagColor, 
                  color: "#fff", 
                  padding: "3px 10px", 
                  borderRadius: 20, 
                  fontSize: 10, 
                  fontWeight: 700,
                  marginBottom: 10,
                }}>
                  {guide.tag}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{guide.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>{guide.description}</p>
              </Link>
            ))}
          </div>

          <h2>Exemples de pathologies diagnostiquees</h2>

          <div className={styles.imageGallery} style={{ marginBottom: 32 }}>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/merule-mycelium-actif.jpg" 
                alt="Mycelium de merule actif - filaments blancs sur sol de cave" 
                width={400} 
                height={250}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Merule active</strong>
                Mycelium en pleine croissance
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/poutre-capricorne-degat.jpg" 
                alt="Degats de capricorne sur poutre de charpente" 
                width={400} 
                height={250}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Attaque de capricorne</strong>
                Poutre severement endommagee
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/merule-mur-cave-3.jpg" 
                alt="Taches de merule sur mur de cave en pierre" 
                width={400} 
                height={250}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Merule sur mur</strong>
                Taches orangees caracteristiques
              </figcaption>
            </figure>
          </div>

          <h2>Comprendre et traiter</h2>
          <p>
            Au-dela des pathologies, retrouvez nos ressources pratiques pour reconnaitre une attaque, comprendre le
            deroulement d&apos;un traitement et decouvrir notre expertise.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, margin: "24px 0" }}>
            {[
              { title: "Reconnaitre les pathologies", description: "Trous, sciure, galeries, champignon brun : les signes qui doivent vous alerter, en images.", href: "/guide/reconnaitre-les-pathologies", tag: "Prevention", tagColor: "#8b5cf6" },
              { title: "Comment se deroule un traitement", description: "Diagnostic, buchage, pulverisation, injection, protection : les etapes d'une intervention.", href: "/guide/traitement-du-bois", tag: "Interventions", tagColor: "#059669" },
              { title: "Notre savoir-faire", description: "20 ans d'expertise terrain depuis 2006, illustres par nos realisations.", href: "/guide/notre-savoir-faire", tag: "A propos", tagColor: "#0ea5e9" },
              { title: "Questions frequentes", description: "Merule, prix, obligations legales, deroulement : toutes les reponses.", href: "/guide/faq", tag: "FAQ", tagColor: "#64748b" },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                style={{
                  display: "block",
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 20,
                  textDecoration: "none",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.2s",
                }}
              >
                <span style={{
                  display: "inline-block",
                  background: guide.tagColor,
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  marginBottom: 10,
                }}>
                  {guide.tag}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{guide.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>{guide.description}</p>
              </Link>
            ))}
          </div>

          <h2>Diagnostic bois par region</h2>
          <p>
            Certaines regions de France sont plus exposees aux pathologies du bois en raison de leur climat. 
            La Bretagne et la Normandie, avec leur humidite elevee, sont particulierement touchees par la merule. 
            Le sud-ouest est une zone a risque termites.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "20px 0" }}>
            {regions.map((region) => (
              <Link
                key={region.href}
                href={region.href}
                style={{
                  background: "#0A2540",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                {region.name}
              </Link>
            ))}
          </div>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Un doute sur l&apos;etat de votre bois ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez un pre-diagnostic par IA en quelques minutes.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Lancer une analyse gratuite
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
