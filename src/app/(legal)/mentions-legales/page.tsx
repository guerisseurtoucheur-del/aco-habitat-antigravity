import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Mentions légales — ACO-HABITAT",
  description:
    "Mentions légales du service ACO-HABITAT : éditeur, hébergeur, propriété intellectuelle, contact.",
};

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.placeholder}>{children}</span>
);

export default function MentionsLegalesPage() {
  return (
    <article>
      <div className={styles.titleBlock}>
        <span className={styles.kicker}>Informations légales</span>
        <h1 className={styles.title}>Mentions légales</h1>
        <p className={styles.lastUpdate}>Dernière mise à jour : 5 mai 2026</p>
      </div>

      <p className={styles.lead}>
        Conformément aux dispositions de l&apos;article 6-III de la loi n° 2004-575 du
        21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), il est
        précisé aux utilisateurs du site <strong>ACO-HABITAT</strong> l&apos;identité
        des différents intervenants dans le cadre de sa réalisation et de son suivi.
      </p>

      <div className={styles.warning}>
        <strong>Note pour l&apos;administrateur :</strong> certains champs marqués{" "}
        <Placeholder>À COMPLÉTER</Placeholder> restent à renseigner (forme
        juridique, capital, RCS, directeur de la publication, hébergeur) avant la
        mise en production. Sans ces informations, le site n&apos;est pas
        intégralement conforme à la LCEN et expose à des sanctions (jusqu&apos;à
        75 000 € d&apos;amende pour une personne physique, 375 000 € pour une
        personne morale).
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Éditeur du site</h2>
        <p>
          Le service <strong>ACO-HABITAT</strong> est édité dans le cadre de
          l&apos;activité de <strong>Traitement-bois.fr</strong>, spécialiste du
          traitement du bois et de l&apos;humidité depuis 2006.
        </p>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <td>Nom commercial</td>
              <td>ACO-HABITAT (service de Traitement-bois.fr)</td>
            </tr>
            <tr>
              <td>Forme juridique</td>
              <td>
                <Placeholder>À COMPLÉTER</Placeholder> (SAS, SARL, EURL,
                Auto-entrepreneur, etc.)
              </td>
            </tr>
            <tr>
              <td>Capital social</td>
              <td>
                <Placeholder>À COMPLÉTER</Placeholder> (le cas échéant)
              </td>
            </tr>
            <tr>
              <td>Siège social</td>
              <td>18 rue Bernard Palissy, 61000 Alençon, France</td>
            </tr>
            <tr>
              <td>SIREN</td>
              <td>344 616 412</td>
            </tr>
            <tr>
              <td>SIRET</td>
              <td>344 616 412 00062</td>
            </tr>
            <tr>
              <td>RCS</td>
              <td>
                <Placeholder>RCS Ville À COMPLÉTER</Placeholder> (le cas échéant)
              </td>
            </tr>
            <tr>
              <td>N° TVA intracommunautaire</td>
              <td>FR65 344 616 412</td>
            </tr>
            <tr>
              <td>Directeur de la publication</td>
              <td>
                <Placeholder>Nom du dirigeant À COMPLÉTER</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Email de contact</td>
              <td>
                <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>
              </td>
            </tr>
            <tr>
              <td>Téléphone</td>
              <td>
                <a href="tel:+33233311979">02 33 31 19 79</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Hébergement</h2>
        <p>
          Le site <strong>ACO-HABITAT</strong> est hébergé par :
        </p>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <td>Hébergeur</td>
              <td>
                <Placeholder>Vercel Inc. / OVH SAS / autre — À COMPLÉTER</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Adresse</td>
              <td>
                <Placeholder>Adresse de l&apos;hébergeur À COMPLÉTER</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Site web</td>
              <td>
                <Placeholder>URL de l&apos;hébergeur À COMPLÉTER</Placeholder>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.callout}>
          <span className={styles.calloutTitle}>Si vous hébergez sur Vercel</span>
          Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —
          https://vercel.com. Indiquez ce sous-traitant et son rôle dans la politique
          de confidentialité.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des éléments composant le site (architecture, textes, mise
          en page, logos, photographies, illustrations, signes distinctifs, marques,
          noms de domaine, code source, base de données, modèles d&apos;intelligence
          artificielle utilisés et rapports générés) est la propriété exclusive
          d&apos;ACO-HABITAT ou de ses partenaires et est protégé par le Code de la
          propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, transmission,
          totale ou partielle, du site ou de son contenu, par quelque procédé que ce
          soit, est strictement interdite sans autorisation écrite préalable de
          l&apos;éditeur, sous peine de poursuites civiles et pénales (articles
          L.335-2 et suivants du Code de la propriété intellectuelle).
        </p>
        <p>
          Les marques et logos figurant sur le site sont des marques déposées
          d&apos;ACO-HABITAT ou de ses partenaires. Toute utilisation non autorisée
          de ces marques constitue une contrefaçon engageant la responsabilité de son
          auteur.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Crédits et technologies</h2>
        <p>
          Le service ACO-HABITAT s&apos;appuie sur les technologies suivantes :
        </p>
        <ul>
          <li>
            <strong>Anthropic Claude (Anthropic, PBC, USA)</strong> — modèle
            d&apos;intelligence artificielle utilisé pour l&apos;analyse multimodale
            des photographies. Sous-traitant au sens du RGPD.
          </li>
          <li>
            <strong>Stripe Payments Europe Limited</strong> — prestataire de paiement
            par carte bancaire lorsqu&apos;une offre payante avec paiement en ligne est
            proposée (Union européenne — Irlande). Dans la phase actuelle du service
            gratuit, aucun règlement en ligne n&apos;est traité via Stripe.
            Sous-traitant au sens du RGPD le cas échéant.{" "}
            <a
              href="https://stripe.com/fr/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              stripe.com/fr/legal
            </a>
          </li>
          <li>
            <strong>Next.js / React</strong> — framework applicatif (Vercel Inc.).
          </li>
          <li>
            <strong>Prisma ORM / SQLite</strong> — couche de persistance des données.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Limitation de responsabilité</h2>
        <p>
          Le site et son contenu sont proposés à titre informatif. ACO-HABITAT
          s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude
          et la mise à jour des informations diffusées, mais ne peut garantir
          l&apos;exhaustivité, la précision ou l&apos;exhaustive actualité des
          informations sur son site.
        </p>
        <p>
          Les rapports de pré-analyse générés par le service{" "}
          <strong>n&apos;ont pas valeur de diagnostic immobilier réglementé</strong>{" "}
          au sens du Code de la construction et de l&apos;habitation et ne se
          substituent en aucun cas à l&apos;avis d&apos;un spécialiste certifié
          intervenant sur place. ACO-HABITAT décline toute responsabilité quant à
          l&apos;usage qui pourrait être fait de ces rapports dans le cadre
          d&apos;une transaction immobilière, d&apos;un sinistre ou d&apos;un
          contentieux.
        </p>
        <p>
          Pour le détail des conditions d&apos;utilisation et de vente, consultez les{" "}
          <a href="/cgv">conditions générales de vente</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Données personnelles</h2>
        <p>
          Les conditions de collecte, de traitement et de conservation des données
          personnelles sont décrites dans la{" "}
          <a href="/confidentialite">politique de confidentialité</a>. Les conditions
          relatives aux cookies sont décrites dans la{" "}
          <a href="/cookies">politique cookies</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de
          litige et après échec de toute tentative de résolution amiable, les
          tribunaux français sont seuls compétents pour en connaître.
        </p>
      </section>
    </article>
  );
}
