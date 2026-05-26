import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Problemes d'humidite dans le bois : causes et solutions | DIAGNOSTIC-BOIS.COM",
  description: "Guide complet sur les problemes d'humidite affectant le bois : remontees capillaires, condensation, infiltrations. Diagnostic, consequences et traitements.",
  keywords: ["humidite bois", "remontees capillaires", "condensation", "infiltration eau", "bois pourri", "traitement humidite", "ventilation"],
};

export default function HumiditePage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Humidite
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#3b82f6" }}>Humidite</span>
          <h1 className={styles.articleTitle}>L&apos;humidite : l&apos;ennemi numero 1 du bois</h1>
          <p className={styles.articleMeta}>Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Pourquoi l&apos;humidite est si dangereuse</h2>
          <p>
            L&apos;humidite est a l&apos;origine de la plupart des pathologies du bois. Un bois avec un taux 
            d&apos;humidite superieur a 20% devient vulnerable aux :
          </p>
          <ul>
            <li><strong>Champignons</strong> — Merule, coniophore, lenzite (pourriture)</li>
            <li><strong>Insectes xylophages</strong> — Les vrillettes adorent le bois humide</li>
            <li><strong>Deformations</strong> — Gonflement, retrait, gauchissement</li>
            <li><strong>Perte de resistance</strong> — Affaiblissement des structures porteuses</li>
          </ul>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Le seuil critique : 20%</p>
            <p className={styles.alertText}>
              En dessous de 20% d&apos;humidite, le bois est protege des champignons. Au-dessus, la merule 
              et autres champignons lignivores peuvent se developper. Maintenir le bois sec est la 
              meilleure prevention.
            </p>
          </div>

          <h2>Les sources d&apos;humidite</h2>
          
          <h3>Remontees capillaires</h3>
          <p>
            L&apos;eau du sol remonte dans les murs par capillarite. Touche les murs enterres et les 
            rez-de-chaussee. Reconnaissable aux auréoles, salpetre, et peintures qui cloquent en 
            partie basse des murs.
          </p>

          <h3>Infiltrations</h3>
          <p>
            Penetration d&apos;eau depuis l&apos;exterieur : toiture defaillante, facade fissuree, joints 
            de fenetre deteriores, gouttiere bouchee. L&apos;eau s&apos;infiltre et touche les structures bois.
          </p>

          <h3>Condensation</h3>
          <p>
            L&apos;humidite de l&apos;air se condense sur les surfaces froides (ponts thermiques, murs mal 
            isoles). Frequente dans les logements mal ventiles avec une forte production de vapeur 
            d&apos;eau (cuisine, salle de bain, sechage du linge).
          </p>

          <h3>Fuites accidentelles</h3>
          <p>
            Fuite de canalisation, debordement, degat des eaux. Cause ponctuelle mais qui peut avoir 
            des consequences graves si l&apos;eau n&apos;est pas sechee rapidement.
          </p>

          <h2>Diagnostiquer un probleme d&apos;humidite</h2>
          <h3>Signes visuels</h3>
          <ul>
            <li>Taches sombres ou aureoles sur les murs et plafonds</li>
            <li>Peinture qui cloque ou s&apos;ecaille</li>
            <li>Papier peint qui se decolle</li>
            <li>Moisissures (points noirs ou taches verdatres)</li>
            <li>Salpetre (depot blanc cristallin)</li>
            <li>Bois qui noircit, se deforme ou ramollit</li>
          </ul>

          <h3>Signes olfactifs</h3>
          <ul>
            <li>Odeur de moisi, de cave</li>
            <li>Odeur de champignon</li>
          </ul>

          <h3>Mesure du taux d&apos;humidite</h3>
          <p>
            Un hygrometre a pointes permet de mesurer le taux d&apos;humidite du bois avec precision. 
            Valeurs de reference :
          </p>
          <ul>
            <li><strong>Moins de 15%</strong> — Bois sec, aucun risque</li>
            <li><strong>15-20%</strong> — Zone de vigilance</li>
            <li><strong>Plus de 20%</strong> — Risque de champignons</li>
            <li><strong>Plus de 30%</strong> — Danger imminent, conditions ideales pour la merule</li>
          </ul>

          <h2>Traitements de l&apos;humidite</h2>
          
          <h3>Traiter la source</h3>
          <p>
            Avant tout traitement du bois, il faut imperativement eliminer la source d&apos;humidite. 
            Un traitement fongicide sur du bois qui reste humide sera inefficace.
          </p>
          <ul>
            <li><strong>Remontees capillaires</strong> — Injection de resine hydrophobe, drainage peripherique</li>
            <li><strong>Infiltrations</strong> — Reparation de la toiture, des facades, des joints</li>
            <li><strong>Condensation</strong> — Installation d&apos;une VMC, amelioration de l&apos;isolation</li>
          </ul>

          <h3>Secher le bois</h3>
          <p>
            Apres elimination de la source, le bois doit secher. Cela peut prendre plusieurs mois 
            selon l&apos;epaisseur et le niveau d&apos;humidite. Favoriser la ventilation et le chauffage modere.
          </p>

          <h3>Traiter le bois</h3>
          <p>
            Une fois sec, le bois peut etre traite avec un fongicide pour eliminer les champignons 
            et prevenir une nouvelle infestation.
          </p>

          <h2>Prevention</h2>
          <ul>
            <li><strong>Ventiler</strong> — Assurer une ventilation permanente (VMC, grilles d&apos;aeration)</li>
            <li><strong>Chauffer</strong> — Maintenir une temperature minimale meme en absence</li>
            <li><strong>Isoler</strong> — Eliminer les ponts thermiques sources de condensation</li>
            <li><strong>Inspecter</strong> — Verifier regulierement toiture, gouttières, facades</li>
            <li><strong>Reagir vite</strong> — Traiter immediatement toute infiltration ou fuite</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Traces d&apos;humidite sur votre bois ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez des photos et notre IA analyse les risques : champignon, debut de pourriture, 
              ou simple tache superficielle.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/merule" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>La merule</p>
                <p className={styles.relatedCardDesc}>Le champignon le plus dangereux, favorise par l&apos;humidite.</p>
              </Link>
              <Link href="/guide/vrillettes" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Les vrillettes</p>
                <p className={styles.relatedCardDesc}>Ces insectes preferent le bois humide pour pondre.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
