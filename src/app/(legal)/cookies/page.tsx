import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Politique cookies — ACO-HABITAT",
  description:
    "Politique relative aux cookies et traceurs utilisés par ACO-HABITAT : cookies fonctionnels, sécurité, absence de tracking publicitaire.",
};

export default function CookiesPage() {
  return (
    <article>
      <div className={styles.titleBlock}>
        <span className={styles.kicker}>Cookies & traceurs</span>
        <h1 className={styles.title}>Politique cookies</h1>
        <p className={styles.lastUpdate}>Dernière mise à jour : 5 mai 2026</p>
      </div>

      <p className={styles.lead}>
        La présente politique décrit l&apos;usage que nous faisons des cookies et
        autres traceurs sur le site <strong>ACO-HABITAT</strong>, conformément à
        l&apos;article 82 de la loi Informatique et Libertés et aux lignes
        directrices et recommandations de la CNIL relatives aux cookies et autres
        traceurs.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Qu&apos;est-ce qu&apos;un cookie&nbsp;?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal
          (ordinateur, tablette, smartphone) lors de la consultation d&apos;un site
          web. Il permet au site de mémoriser des informations sur votre visite,
          comme votre identifiant de session ou vos préférences linguistiques. Les
          traceurs incluent également d&apos;autres mécanismes équivalents
          (localStorage, sessionStorage, pixels, etc.).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Approche d&apos;ACO-HABITAT</h2>
        <div className={styles.callout}>
          <span className={styles.calloutTitle}>
            Pas de pistage publicitaire ni d&apos;analytics tiers
          </span>
          ACO-HABITAT n&apos;utilise <strong>aucun cookie publicitaire</strong>,{" "}
          <strong>aucun cookie de mesure d&apos;audience tiers</strong> (Google
          Analytics, Meta Pixel, etc.) et <strong>aucun traceur de réseaux
          sociaux</strong>. Aucun cookie nécessitant votre consentement n&apos;est
          déposé en l&apos;état actuel du service.
        </div>
        <p>
          Seuls des cookies <strong>strictement nécessaires</strong> au
          fonctionnement du service sont utilisés. Conformément à l&apos;article 82
          de la loi Informatique et Libertés, ces cookies ne nécessitent pas de
          consentement préalable.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Cookies utilisés</h2>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Nom / Type</th>
              <th>Finalité</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Cookie de session technique</strong>
              </td>
              <td>
                Maintien de la session utilisateur (suivi du dossier de pré-analyse en
                cours ; association à une commande ou à un paiement le cas échéant si une
                offre payante est activée)
              </td>
              <td>Session (fin à la fermeture du navigateur)</td>
            </tr>
            <tr>
              <td>
                <strong>Token CSRF / sécurité</strong>
              </td>
              <td>
                Protection contre les requêtes intersites malveillantes (sécurité
                des formulaires et du paiement)
              </td>
              <td>Session</td>
            </tr>
            <tr>
              <td>
                <strong>localStorage applicatif (le cas échéant)</strong>
              </td>
              <td>
                Mémorisation temporaire des photos en cours de chargement avant
                soumission, de manière à éviter une perte en cas de rafraîchissement
                accidentel
              </td>
              <td>Volatile, supprimé après envoi</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Cookies de tiers</h2>
        <p>
          Certaines fonctionnalités du service peuvent recourir à des cookies
          déposés par des tiers, exclusivement à des fins fonctionnelles ou de
          sécurité&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Stripe Payments Europe Limited</strong> — uniquement si une offre
            payante avec règlement par carte est activée&nbsp;: au moment du paiement,
            Stripe peut déposer des cookies ou traceurs strictement nécessaires à la
            sécurisation de la transaction et à la prévention de la fraude. Ces traceurs
            relèvent de la{" "}
            <a
              href="https://stripe.com/fr/legal/cookies-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique cookies de Stripe
            </a>
            .
          </li>
          <li>
            <strong>Hébergeur</strong> — l&apos;hébergeur peut déposer des cookies
            techniques nécessaires à la disponibilité du service (équilibrage de
            charge, sécurité).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          5. Gestion des cookies par votre navigateur
        </h2>
        <p>
          Vous pouvez à tout moment modifier vos préférences cookies et supprimer
          les cookies déposés depuis les paramètres de votre navigateur. La plupart
          des navigateurs permettent de bloquer ou de supprimer les cookies&nbsp;:
        </p>
        <ul>
          <li>
            Chrome —{" "}
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.google.com/chrome/answer/95647
            </a>
          </li>
          <li>
            Firefox —{" "}
            <a
              href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.mozilla.org
            </a>
          </li>
          <li>
            Safari —{" "}
            <a
              href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.apple.com
            </a>
          </li>
          <li>
            Edge —{" "}
            <a
              href="https://support.microsoft.com/fr-fr/microsoft-edge"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.microsoft.com
            </a>
          </li>
        </ul>
        <div className={styles.warning}>
          <strong>Attention.</strong> Si vous bloquez les cookies strictement
          nécessaires, certaines fonctionnalités du service (accès au dossier,
          téléchargement du rapport ; paiement en ligne le cas échéant) peuvent ne plus
          fonctionner correctement.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          6. Évolution future de la politique cookies
        </h2>
        <p>
          Si ACO-HABITAT décide à l&apos;avenir de mettre en place des outils de
          mesure d&apos;audience ou de marketing nécessitant un consentement
          (notamment audience non exemptée par la CNIL), un{" "}
          <strong>bandeau de consentement explicite</strong> sera déployé,
          permettant à l&apos;utilisateur d&apos;accepter, de refuser ou de paramétrer
          finement les cookies de manière granulaire avant tout dépôt.
        </p>
        <p>
          La présente politique sera alors mise à jour en conséquence et la date de
          mise à jour modifiée en haut du document.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Plus d&apos;informations</h2>
        <p>
          Pour aller plus loin sur la réglementation cookies, vous pouvez consulter
          le site de la CNIL&nbsp;:{" "}
          <a
            href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
            target="_blank"
            rel="noopener noreferrer"
          >
            cnil.fr/fr/cookies-et-autres-traceurs
          </a>
          .
        </p>
        <p>
          Pour toute question relative à la présente politique cookies, vous pouvez
          nous contacter à{" "}
          <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>.
        </p>
      </section>
    </article>
  );
}
