import Link from "next/link";
import styles from "./not-found.module.css";

const links = [
  { href: "/guide/capricorne", label: "Capricorne" },
  { href: "/guide/merule", label: "Mérule" },
  { href: "/guide/termites", label: "Termites" },
  { href: "/guide/vrillettes", label: "Vrillettes" },
  { href: "/guide/humidite", label: "Humidité" },
  { href: "/guide/traitement-du-bois", label: "Traitement du bois" },
  { href: "/guide/faq", label: "FAQ" },
  { href: "/guide/qui-sommes-nous", label: "Qui sommes-nous" },
];

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Cette page a déménagé</h1>
        <p className={styles.text}>
          La page que vous cherchez n&apos;existe plus à cette adresse. Retrouvez nos guides ci-dessous ou faites
          analyser gratuitement les photos de votre bois.
        </p>
        <Link href="/#formulaire" className={styles.primary}>
          Faire analyser mes photos
        </Link>
        <nav aria-label="Pages principales" className={styles.links}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className={styles.home}>
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
