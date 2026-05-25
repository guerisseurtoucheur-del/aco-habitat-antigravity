"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./LandingProductDemo.module.css";

/** Illustrations fixes pour la démo (photos terrain fournies par l'équipe). */
const DEMO_CHARPENTE = "/demo/charpente.png";
const DEMO_DEGRADATION_MUR = "/demo/degradation-mur.png";

const AUTO_MS = 4200;

const STEPS = [
  {
    key: "photo",
    caption: "1. Photographiez la zone",
    hint: "Plusieurs angles améliorent la lecture des indices visuels (humidité, déformation du bois, traces).",
    ariaLabel: "Étape 1 — photographier la zone",
  },
  {
    key: "analyse",
    caption: "2. Analyse assistée par IA",
    hint: "Les zones d’intérêt sont mises en évidence à titre illustratif — sans mesure métrique réelle ni équivalence terrain.",
    ariaLabel: "Étape 2 — analyse en cours",
  },
  {
    key: "result",
    caption: "3. Synthèse à valeur informative",
    hint: "Les formulations restent des hypothèses à confirmer par inspection physique ou analyses complémentaires.",
    ariaLabel: "Étape 3 — synthèse illustrative",
  },
  {
    key: "pdf",
    caption: "4. Rapport PDF",
    hint: "Export structuré avec vignettes et jalons — prêt à être partagé avec un artisan, une assurance ou un spécialiste.",
    ariaLabel: "Étape 4 — rapport PDF",
  },
] as const;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (): void => setReduced(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

export function LandingProductDemo() {
  const [index, setIndex] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const total = STEPS.length;

  const clearResumeTimer = (): void => {
    if (resumeTimeoutRef.current !== null) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const n = i + delta;
        if (n < 0) return total - 1;
        if (n >= total) return 0;
        return n;
      });
    },
    [total],
  );

  const jumpTo = useCallback((i: number): void => {
    setIndex(Math.min(Math.max(0, i), total - 1));
  }, [total]);

  const scheduleResumeAuto = (): void => {
    clearResumeTimer();
    resumeTimeoutRef.current = setTimeout(() => setAutoPaused(false), 12000);
  };

  const handleManualNav = (fn: () => void): void => {
    fn();
    setAutoPaused(true);
    scheduleResumeAuto();
  };

  useEffect(() => {
    return () => clearResumeTimer();
  }, []);

  useEffect(() => {
    if (reducedMotion || autoPaused || hoverPaused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, autoPaused, hoverPaused, total]);

  const step = STEPS[index];
  const autoPlaying = !reducedMotion && !autoPaused && !hoverPaused;

  return (
    <section className={styles.section} aria-labelledby="demo-heading">
      <div className={styles.inner}>
        <div className={styles.segmentRow} aria-hidden="true">
          <span className={styles.segment}>Acheteurs</span>
          <span className={styles.segmentAccent}>Vendeurs</span>
          <span className={styles.segment}>Agents immobiliers</span>
          <span className={styles.segment}>Notaires</span>
        </div>

        <span className={styles.kicker}>Parcours type</span>
        <h2 id="demo-heading" className={styles.title}>
          Pathologie structurelle ou infiltration suspectée&nbsp;?
          <br />
          <span style={{ color: "#966b3d", fontSize: "0.92em" }}>
            Découvrez notre processus d&apos;analyse en temps réel.
          </span>
        </h2>
        <p className={styles.subtitle}>
          Démonstration <strong>interactive</strong> illustrant le parcours de pré-analyse assistée par IA.{" "}
          Cas d&apos;usage fictif à but explicatif.{" "}
          <strong style={{ color: "#0a2540" }}>
            Ne se substitue en aucun cas à une expertise physique ou un diagnostic immobilier réglementaire.
          </strong>
        </p>

        <div
          className={styles.demoWrap}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onFocusCapture={() => setHoverPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setHoverPaused(false);
            }
          }}
          onKeyDownCapture={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            const target = e.target as HTMLElement | null;
            if (target?.closest("input, textarea, select, [contenteditable=true]")) {
              return;
            }
            e.preventDefault();
            if (e.key === "ArrowRight") handleManualNav(() => go(1));
            else handleManualNav(() => go(-1));
          }}
        >
          <span
            className={`${styles.demoBadge} ${autoPlaying ? styles.demoBadgePulse : ""}`}
            title="Illustration uniquement"
          >
            Démo{" "}
            {reducedMotion
              ? "• sans défilement auto"
              : autoPlaying
                ? "• lecture"
                : "• pause"}
          </span>

          <div
            className={styles.viewport}
            role="region"
            aria-roledescription="carousel"
            aria-label="Démonstration du parcours en quatre étapes"
            aria-live="polite"
          >
            <div className={styles.phone} aria-hidden={false}>
              <div className={styles.phoneInner}>
                <div className={styles.phoneBar}>DIAGNOSTIC-BOIS</div>
                <div className={styles.phoneScreen}>
                  {step.key === "photo" ? (
                    <div className={styles.photoBgWrap}>
                      <Image
                        src={DEMO_CHARPENTE}
                        alt="Illustration démo — exemple de bois de charpente très dégradé"
                        fill
                        sizes="280px"
                        className={styles.photoImage}
                        priority
                      />
                      <div className={styles.scanFrame} aria-hidden />
                      <div className={`${styles.annotationLayer} ${styles.annotationLayerPhoto}`}>
                        <div className={`${styles.annoBox} ${styles.charpenteBox1}`}>
                          <span className={styles.annoLabel}>Trous de vol · 1-2 mm</span>
                          <span className={styles.annoMeta}>Anobium punctatum · illus.</span>
                        </div>
                        <div className={`${styles.annoBox} ${styles.charpenteBox2}`}>
                          <span className={styles.annoLabel}>Sciure farineuse visible</span>
                        </div>
                      </div>
                      <div className={styles.cornerLabel}>Cadrez la zone à analyser</div>
                    </div>
                  ) : null}

                  {step.key === "analyse" ? (
                    <div className={styles.analyseBg}>
                      <Image
                        src={DEMO_DEGRADATION_MUR}
                        alt="Illustration démo — exemple de dégradations murales et fongiques"
                        fill
                        sizes="280px"
                        className={styles.analysePhoto}
                      />
                      <div className={`${styles.annotationLayer} ${styles.annotationLayerDetect}`}>
                        <div className={`${styles.annoBox} ${styles.wallBox1} ${styles.annoBoxScan}`}>
                          <span className={styles.annoLabel}>Serpula lacrymans · ROUGE</span>
                          <span className={styles.annoConf}>Confiance 82% · illustration</span>
                        </div>
                        <div className={`${styles.annoBox} ${styles.wallBox2} ${styles.annoBoxScan}`}>
                          <span className={styles.annoLabel}>Infiltration capillaire · BLEU</span>
                          <span className={styles.annoConf}>Efflorescences salines</span>
                        </div>
                      </div>
                      <div className={styles.scanLine} aria-hidden />
                      <div className={styles.analyseOverlay}>
                        <div className={styles.progressTrack}>
                          <div className={styles.progressFill} />
                        </div>
                        <p className={styles.analyseLabel}>
                          Analyse mycologique et hygrométrique…
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {step.key === "result" ? (
                    <div className={styles.resultBg}>
                      <div className={styles.resultImageWrap}>
                        <Image
                          src={DEMO_DEGRADATION_MUR}
                          alt=""
                          fill
                          sizes="280px"
                          className={styles.resultPhoto}
                          aria-hidden
                        />
                        <div className={`${styles.annotationLayer} ${styles.annotationLayerFinal}`}>
                          <div className={`${styles.annoBox} ${styles.wallBox1} ${styles.annoBoxSolid}`}>
                            <span className={styles.annoLabel}>Mérule pleureuse · CRITIQUE</span>
                            <span className={styles.annoConf}>Loi 8 juil. 1999 applicable</span>
                          </div>
                          <div className={`${styles.annoBox} ${styles.wallBox2} ${styles.annoBoxSolid}`}>
                            <span className={styles.annoLabel}>Remontées capillaires · BLEU</span>
                            <span className={styles.annoConf}>Salpêtre · HR &gt; 75%</span>
                          </div>
                        </div>
                        <div className={styles.resultGradient} aria-hidden />
                      </div>
                      <div className={styles.resultBanner}>
                        <div className={styles.resultBannerTitle}>
                          Urgence critique · Serpula lacrymans identifiée
                        </div>
                        <p className={styles.resultBannerText}>
                          Suspicion forte de mérule pleureuse. Déclaration en mairie obligatoire
                          (loi du 8 juillet 1999). Spécialiste COFRAC requis sous 7 jours.
                        </p>
                      </div>
                      <div className={styles.tagRow}>
                        <span className={styles.miniTag}>Pourriture brune cubique</span>
                        <span className={styles.miniTag}>HR &gt; 75%</span>
                        <span className={styles.miniTag}>Urgence · NF P 03-200</span>
                      </div>
                    </div>
                  ) : null}

                  {step.key === "pdf" ? (
                    <div className={styles.pdfBg}>
                      <div className={styles.pdfStage}>
                        <div className={styles.pdfFlyIn}>
                          <div className={styles.pdfSheet}>
                            <span className={styles.pdfRibbon}>PDF</span>
                            <div className={styles.pdfSheetHeader}>
                              <span className={styles.pdfBrand}>DIAGNOSTIC-BOIS</span>
                              <span className={styles.pdfDocTitle}>Pré-analyse technique</span>
                            </div>
                            <p className={styles.pdfHorodate}>
                              Horodaté · rapport fictif démo
                            </p>
                            <div className={styles.pdfThumbStrip}>
                              <span className={styles.pdfThumb} aria-hidden>
                                <span className={styles.pdfThumbAnn} />
                              </span>
                              <span className={styles.pdfThumb} aria-hidden>
                                <span className={`${styles.pdfThumbAnn} ${styles.pdfThumbAnn2}`} />
                              </span>
                            </div>
                            <div className={styles.pdfSkeleton}>
                              <span className={styles.pdfLine} />
                              <span className={styles.pdfLine} />
                              <span className={`${styles.pdfLine} ${styles.pdfLineShort}`} />
                            </div>
                            <div className={styles.pdfFooterMock}>
                              <span className={styles.pdfCheck}>✓</span>
                              Document structuré prêt à partager
                            </div>
                          </div>
                        </div>
                        <p className={styles.pdfArrival}>Rapport PDF assemblé</p>
                      </div>
                      <button
                        type="button"
                        className={styles.pdfBtn}
                        onClick={() => {
                          document.getElementById("diagnostic-upload")?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                      >
                        Lancer une vraie analyse
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <p className={styles.stepCaption}>{step.caption}</p>
            <p className={styles.stepHint}>{step.hint}</p>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Étape précédente"
              onClick={() => handleManualNav(() => go(-1))}
            >
              ‹
            </button>
            <div className={styles.dots} role="tablist" aria-label="Choix de l’étape">
              {STEPS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.ariaLabel}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => {
                    handleManualNav(() => jumpTo(i));
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Étape suivante"
              onClick={() => handleManualNav(() => go(1))}
            >
              ›
            </button>
          </div>

          <div className={styles.autoRow}>
            <button
              type="button"
              className={styles.autoToggle}
              aria-pressed={autoPaused}
              disabled={reducedMotion}
              onClick={() => {
                clearResumeTimer();
                setAutoPaused((p) => !p);
              }}
            >
              {reducedMotion
                ? "Lecture auto désactivée (réduit les animations)"
                : autoPaused
                  ? "▶ Relancer la lecture auto"
                  : "⏸ Pause lecture auto"}
            </button>
          </div>

          <p className={styles.disclaimer}>
            <strong>Rappel légal.</strong> Cette démo est une simulation graphique : les
            photos sont des exemples d&apos;illustration et ne constituent pas une analyse
            de votre dossier. Elle ne remplace pas une inspection physique ni un
            diagnostic immobilier réglementé lorsque la loi l&apos;exige.
          </p>

          <div className={styles.ctaRow}>
            <a href="#diagnostic-upload" className={styles.ctaLink}>
              Passer au formulaire réel →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
