"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState, useCallback, DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./DiagnosticUpload.module.css";
import {
  analyseRequestSchema,
  analyseStatusSchema,
  type AnalyseResponse,
  type AnalyseStatus,
  type AnalyseStatusWithResultResponse,
} from "@/types/diagnostic";

type UploadUiState = "IDLE" | "UPLOADING" | "ANALYZING" | "SUCCESS" | "ERROR";
const MAX_IMAGE_SIZE_MB = 1.5;
const TARGET_MAX_DIMENSION = 1600;

type PhotoSlot = {
  key: "photo_1" | "photo_2" | "photo_3" | "photo_4";
  label: string;
  hint: string;
  file: File | null;
  previewUrl: string | null;
};

const initialSlots: PhotoSlot[] = [
  { key: "photo_1", label: "Contexte global", hint: "Vue d'ensemble de la zone", file: null, previewUrl: null },
  { key: "photo_2", label: "Détail de la zone", hint: "Gros plan sur l'anomalie", file: null, previewUrl: null },
  { key: "photo_3", label: "Structure porteuse", hint: "Charpente, solives, murs", file: null, previewUrl: null },
  { key: "photo_4", label: "Indices annexes", hint: "Traces, taches, dégâts", file: null, previewUrl: null },
];

const STEPS = ["Upload", "Validation", "Analyse", "Rapport"] as const;

// SVG Icons
const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconAlertCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export function DiagnosticUpload() {
  const router = useRouter();
  const [slots, setSlots] = useState<PhotoSlot[]>(initialSlots);
  const [uiState, setUiState] = useState<UploadUiState>("IDLE");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<AnalyseStatus>(
    analyseStatusSchema.enum.queued,
  );
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "", address: "" });
  const [addressSuggestions, setAddressSuggestions] = useState<{ label: string; context: string }[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acknowledgedNonOpposable, setAcknowledgedNonOpposable] = useState(false);
  const [draggingSlot, setDraggingSlot] = useState<number | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const pollingIntervalRef = useRef<number | null>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const addressTimeoutRef = useRef<number | null>(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      slots.forEach((slot) => {
        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current !== null) window.clearInterval(pollingIntervalRef.current);
      if (redirectTimeoutRef.current !== null) window.clearTimeout(redirectTimeoutRef.current);
      if (addressTimeoutRef.current !== null) window.clearTimeout(addressTimeoutRef.current);
    };
  }, []);

  const completedSlots = useMemo(() => slots.filter((s) => s.file !== null).length, [slots]);
  const isReady = completedSlots >= 1;

  const statusLabel = useMemo((): string => {
    if (uiState === "UPLOADING") return "Envoi des images…";
    if (uiState === "ANALYZING") return `Analyse IA (${currentStatus})`;
    if (uiState === "SUCCESS") return "Analyse terminée";
    if (uiState === "ERROR") return "Erreur";
    return "Prêt";
  }, [uiState, currentStatus]);

  const activeStepIdx = useMemo(() => {
    if (uiState === "IDLE") return 0;
    if (uiState === "UPLOADING") return 1;
    if (uiState === "ANALYZING") return 2;
    return 3;
  }, [uiState]);

  // ── Image compression ──────────────────────────────────────────────────────
  const compressImageFile = useCallback(async (file: File): Promise<File> => {
    if (!file.type.startsWith("image/")) return file;
    if (file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024) return file;

    const imageBitmap = await createImageBitmap(file);
    const ratio = Math.min(1, TARGET_MAX_DIMENSION / Math.max(imageBitmap.width, imageBitmap.height));
    const targetWidth = Math.max(1, Math.round(imageBitmap.width * ratio));
    const targetHeight = Math.max(1, Math.round(imageBitmap.height * ratio));
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext("2d");
    if (!context) return file;

    context.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);
    imageBitmap.close();

    let quality = 0.9;
    const minimumQuality = 0.5;
    let outputBlob: Blob | null = null;
    const outputType = file.type === "image/png" ? "image/jpeg" : file.type;

    while (quality >= minimumQuality) {
      outputBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, outputType, quality);
      });
      if (!outputBlob) break;
      if (outputBlob.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024) break;
      quality -= 0.1;
    }

    if (!outputBlob) return file;
    return new File([outputBlob], file.name, { type: outputBlob.type || "image/jpeg", lastModified: Date.now() });
  }, []);

  // ── Slot management ────────────────────────────────────────────────────────
  const updateSlotFile = useCallback((index: number, file: File): void => {
    const nextPreview = URL.createObjectURL(file);
    setSlots((prev) =>
      prev.map((slot, i) => {
        if (i !== index) return slot;
        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
        return { ...slot, file, previewUrl: nextPreview };
      }),
    );
  }, []);

  const clearSlot = useCallback((index: number): void => {
    setSlots((prev) =>
      prev.map((slot, i) => {
        if (i !== index) return slot;
        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
        return { ...slot, file: null, previewUrl: null };
      }),
    );
    const input = inputRefs.current[index];
    if (input) input.value = "";
  }, []);

  const processFile = useCallback(async (index: number, file: File) => {
    try {
      const compressed = await compressImageFile(file);
      updateSlotFile(index, compressed);
    } catch {
      updateSlotFile(index, file);
    }
  }, [compressImageFile, updateSlotFile]);

  const handleFileSelected = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    void processFile(index, file);
  };

  // ── Drag & Drop ────────────────────────────────────────────────────────────
  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingSlot(index);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingSlot(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingSlot(null);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    void processFile(index, file);
  };

  // ── Address Autocomplete ───────────────────────────────────────────────────
  const fetchAddressSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
      if (!res.ok) throw new Error("API Data Gouv failed");
      const data = await res.json();
      const features = data.features || [];
      const suggestions = features.map((f: any) => ({
        label: f.properties.label,
        context: f.properties.context, // department/region
      }));
      setAddressSuggestions(suggestions);
      setShowAddressSuggestions(true);
    } catch (e) {
      console.error(e);
      setAddressSuggestions([]);
    }
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setClientInfo((p) => ({ ...p, address: val }));
    
    if (addressTimeoutRef.current) window.clearTimeout(addressTimeoutRef.current);
    addressTimeoutRef.current = window.setTimeout(() => {
      void fetchAddressSuggestions(val);
    }, 400);
  };

  const handleSelectAddress = (label: string) => {
    setClientInfo((p) => ({ ...p, address: label }));
    setShowAddressSuggestions(false);
  };

  // ── Submit logic ───────────────────────────────────────────────────────────
  const validatePayload = (): FormData | null => {
    const [photo_1, photo_2, photo_3, photo_4] = slots.map((s) => s.file ?? null);
    if (!photo_1 && !photo_2 && !photo_3 && !photo_4) {
      setErrorMessage("Ajoutez au moins une photo pour lancer l'analyse.");
      return null;
    }
    if (!acceptedTerms) {
      setErrorMessage("Vous devez accepter les CGV et la politique de confidentialité.");
      return null;
    }
    if (!acknowledgedNonOpposable) {
      setErrorMessage("Veuillez confirmer la nature informative de la pré-analyse.");
      return null;
    }

    const payload = {
      photo_1, photo_2, photo_3, photo_4,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      clientPhone: clientInfo.phone,
      clientAddress: clientInfo.address,
    };

    const parsed = analyseRequestSchema.safeParse(payload);
    if (!parsed.success) {
      // Find the first error message to display
      const firstError = parsed.error.errors[0]?.message || "Validation impossible: vérifiez les fichiers et coordonnées.";
      setErrorMessage(firstError);
      return null;
    }

    const formData = new FormData();
    if (parsed.data.photo_1) formData.append("photo_1", parsed.data.photo_1);
    if (parsed.data.photo_2) formData.append("photo_2", parsed.data.photo_2);
    if (parsed.data.photo_3) formData.append("photo_3", parsed.data.photo_3);
    if (parsed.data.photo_4) formData.append("photo_4", parsed.data.photo_4);
    formData.append("timestamp", parsed.data.timestamp.toISOString());
    formData.append("userAgent", parsed.data.userAgent);
    if (parsed.data.clientName) formData.append("clientName", parsed.data.clientName);
    if (parsed.data.clientEmail) formData.append("clientEmail", parsed.data.clientEmail);
    if (parsed.data.clientPhone) formData.append("clientPhone", parsed.data.clientPhone);
    if (parsed.data.clientAddress) formData.append("clientAddress", parsed.data.clientAddress);
    formData.append("consentAcceptedTermsAt", new Date().toISOString());
    formData.append("consentAcknowledgedNonOpposableAt", new Date().toISOString());
    return formData;
  };

  const pollAnalysisStatus = async (newSessionId: string): Promise<void> => {
    setUiState("ANALYZING");
    setCurrentStatus(analyseStatusSchema.enum.queued);

    pollingIntervalRef.current = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/analyse/${newSessionId}`);
        if (!response.ok) throw new Error("Impossible de récupérer le statut de l'analyse.");

        const payload = (await response.json()) as AnalyseStatusWithResultResponse;
        setCurrentStatus(payload.status);

        if (payload.status === analyseStatusSchema.enum.completed) {
          window.clearInterval(pollingIntervalRef.current!);
          pollingIntervalRef.current = null;
          setUiState("SUCCESS");
          redirectTimeoutRef.current = window.setTimeout(() => {
            router.push(`/resultats/${newSessionId}`);
          }, 1100);
        } else if (payload.status === analyseStatusSchema.enum.failed) {
          window.clearInterval(pollingIntervalRef.current!);
          pollingIntervalRef.current = null;
          setUiState("ERROR");
          setErrorMessage(payload.error ?? "L'analyse IA a échoué, merci de réessayer.");
        }
      } catch (error) {
        window.clearInterval(pollingIntervalRef.current!);
        pollingIntervalRef.current = null;
        setUiState("ERROR");
        setErrorMessage(error instanceof Error ? error.message : "Erreur inattendue lors du polling.");
      }
    }, 900);
  };

  const handleSubmit = async (): Promise<void> => {
    setErrorMessage(null);
    const formData = validatePayload();
    if (!formData) return;

    setUiState("UPLOADING");
    try {
      const response = await fetch("/api/analyse", { method: "POST", body: formData });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detailedError = errorData.details?.error || errorData.message || "La création de session a échoué.";
        throw new Error(detailedError);
      }
      const payload = (await response.json()) as AnalyseResponse;
      setSessionId(payload.sessionId);
      setCurrentStatus(payload.status);
      await pollAnalysisStatus(payload.sessionId);
    } catch (error) {
      setUiState("ERROR");
      setErrorMessage(error instanceof Error ? error.message : "Erreur inattendue pendant l'upload.");
    }
  };

  const handleViewResults = (): void => {
    if (!sessionId) return;
    router.push(`/resultats/${sessionId}`);
  };

  const isBusy = uiState === "UPLOADING" || uiState === "ANALYZING";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="diagnostic-upload" className={styles.wrapper}>

      {/* ── Header row ── */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.headerTitle}>Déposer vos photos</span>
          <span className={styles.headerCount}>
            {completedSlots} / 4 photo{completedSlots !== 1 ? "s" : ""} sélectionnée{completedSlots !== 1 ? "s" : ""}
          </span>
        </div>

        <span className={`${styles.statusPill} ${uiState === "ANALYZING" || uiState === "UPLOADING" ? styles.analyzing : ""} ${uiState === "SUCCESS" ? styles.success : ""} ${uiState === "ERROR" ? styles.error : ""}`}>
          {isBusy && <span className={styles.spinner} />}
          {statusLabel}
        </span>
      </div>

      {/* ── Progress stepper ── */}
      <div className={styles.stepper} role="list" aria-label="Étapes">
        {STEPS.map((step, idx) => {
          const isDone = idx < activeStepIdx;
          const isActive = idx === activeStepIdx;
          return (
            <div
              key={step}
              role="listitem"
              className={`${styles.stepItem} ${isDone ? styles.stepDone : ""} ${isActive ? styles.stepActive : ""}`}
            >
              <div className={styles.stepDot}>
                {isDone ? <IconCheck /> : idx + 1}
              </div>
              <span className={styles.stepLabel}>{step}</span>
            </div>
          );
        })}
      </div>

      {/* ── Client info form ── */}
      <div className={styles.formSection}>
        <span className={styles.formLabel}>Coordonnées du commanditaire</span>
        <div className={styles.formGrid}>
          <input
            id="client-name"
            type="text"
            placeholder="Nom complet"
            className={styles.input}
            value={clientInfo.name}
            onChange={(e) => setClientInfo((p) => ({ ...p, name: e.target.value }))}
            disabled={isBusy}
          />
          <input
            id="client-phone"
            type="tel"
            placeholder="Téléphone"
            className={styles.input}
            value={clientInfo.phone}
            onChange={(e) => setClientInfo((p) => ({ ...p, phone: e.target.value }))}
            disabled={isBusy}
          />
          <input
            id="client-email"
            type="email"
            placeholder="Adresse e-mail"
            className={`${styles.input} ${styles.fullWidth}`}
            value={clientInfo.email}
            onChange={(e) => setClientInfo((p) => ({ ...p, email: e.target.value }))}
            disabled={isBusy}
          />
          <div style={{ position: "relative" }} className={styles.fullWidth}>
            <textarea
              id="client-address"
              placeholder="Adresse du bien (domicile)"
              rows={2}
              className={`${styles.textarea} ${styles.fullWidth}`}
              value={clientInfo.address}
              onChange={handleAddressChange}
              onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
              disabled={isBusy}
            />
            {showAddressSuggestions && addressSuggestions.length > 0 && (
              <ul className={styles.addressDropdown}>
                {addressSuggestions.map((s, idx) => (
                  <li key={idx} className={styles.addressOption} onClick={() => handleSelectAddress(s.label)}>
                    <span style={{ fontWeight: "bold", display: "block", color: "#0f172a" }}>{s.label}</span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{s.context}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ── Photo slots ── */}
      <span className={styles.slotsLabel}>
        Photos de l&apos;anomalie · 1 min. recommandées · compression auto sous {MAX_IMAGE_SIZE_MB} Mo
      </span>
      <div className={styles.slots}>
        {slots.map((slot, index) => {
          const isDragging = draggingSlot === index;
          const isFilled = slot.previewUrl !== null;

          return (
            <div
              key={slot.key}
              id={`photo-slot-${index + 1}`}
              className={`${styles.slot} ${isFilled ? styles.slotFilled : ""} ${isDragging ? styles.slotDragging : ""}`}
              onClick={() => !isFilled && inputRefs.current[index]?.click()}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              role="button"
              tabIndex={isFilled ? -1 : 0}
              aria-label={`${slot.label} — Vue ${index + 1}`}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isFilled) {
                  inputRefs.current[index]?.click();
                }
              }}
            >
              {isFilled ? (
                /* Filled state */
                <div className={styles.preview}>
                  <img
                    src={slot.previewUrl!}
                    alt={`Photo ${index + 1} — ${slot.label}`}
                    className={styles.previewImg}
                  />
                  <div className={styles.slotCheck}>
                    <IconCheck />
                  </div>
                  <div className={styles.previewOverlay}>
                    <div className={styles.previewMeta}>
                      <span className={styles.previewLabel}>Vue {index + 1} · {slot.label}</span>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={(e) => { e.stopPropagation(); clearSlot(index); }}
                        aria-label={`Retirer la photo ${index + 1}`}
                      >
                        <IconTrash />
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty state */
                <div className={styles.slotEmpty}>
                  <div className={styles.slotIcon}>
                    <IconCamera />
                  </div>
                  <span className={styles.slotNumber}>Vue {index + 1}</span>
                  <span className={styles.slotLabel}>{slot.label}</span>
                  <span className={styles.slotHint}>{slot.hint}</span>
                </div>
              )}

              {isDragging && !isFilled && (
                <div className={styles.dragOverlay}>
                  <span className={styles.dragOverlayText}>Déposer l&apos;image ici</span>
                </div>
              )}

              <input
                ref={(el) => { inputRefs.current[index] = el; }}
                type="file"
                accept="image/*"
                capture="environment"
                className={styles.hiddenInput}
                onChange={(e) => handleFileSelected(index, e)}
                aria-label={`Sélectionner photo ${index + 1}`}
              />
            </div>
          );
        })}
      </div>

      {/* ── Consents OR success button ── */}
      {uiState === "SUCCESS" ? (
        <button
          type="button"
          id="btn-view-results"
          className={styles.successBtn}
          onClick={handleViewResults}
        >
          <span className={styles.btnInner}>
            Voir mon rapport
            <IconArrow />
          </span>
        </button>
      ) : (
        <>
          {/* Consent fieldset */}
          <div className={styles.consentBox} role="group" aria-labelledby="consent-legend">
            <span id="consent-legend" className={styles.consentTitle}>Consentements requis</span>

            <label className={styles.consentItem} htmlFor="consent-terms">
              <input
                id="consent-terms"
                type="checkbox"
                className={styles.consentCheckbox}
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={isBusy}
              />
              <span className={styles.consentText}>
                J&apos;ai lu et j&apos;accepte les{" "}
                <Link href="/cgv" target="_blank" className={styles.consentLink}>CGV</Link>
                {" "}et la{" "}
                <Link href="/confidentialite" target="_blank" className={styles.consentLink}>politique de confidentialité</Link>.
                {" "}Je consens au traitement de mes photos par l&apos;IA Anthropic Claude (transfert hors UE encadré).
              </span>
            </label>

            <label className={styles.consentItem} htmlFor="consent-nature">
              <input
                id="consent-nature"
                type="checkbox"
                className={styles.consentCheckbox}
                checked={acknowledgedNonOpposable}
                onChange={(e) => setAcknowledgedNonOpposable(e.target.checked)}
                disabled={isBusy}
              />
              <span className={styles.consentText}>
                Je comprends que ce rapport est une <strong>pré-analyse IA à valeur informative</strong>, qu&apos;il{" "}
                <strong>n&apos;est pas un diagnostic immobilier réglementé</strong> et ne se substitue pas à l&apos;intervention d&apos;un spécialiste certifié.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            id="btn-launch-analysis"
            type="button"
            className={`${styles.submitBtn} ${isBusy ? styles.analyzing : ""}`}
            onClick={handleSubmit}
            disabled={!isReady || !acceptedTerms || !acknowledgedNonOpposable || isBusy}
            aria-busy={isBusy}
          >
            <span className={styles.btnInner}>
              {isBusy && <span className={styles.btnSpinner} />}
              {uiState === "UPLOADING"
                ? "Envoi des images en cours…"
                : uiState === "ANALYZING"
                  ? "Analyse multimodale en cours…"
                  : "Lancer l'analyse multimodale"}
              {!isBusy && <IconArrow />}
            </span>
          </button>
        </>
      )}

      {/* ── Session hint ── */}
      {sessionId && (
        <p className={styles.sessionHint}>Session · {sessionId}</p>
      )}

      {/* ── Error ── */}
      {errorMessage && (
        <div className={styles.errorMessage} role="alert">
          <IconAlertCircle />
          {errorMessage}
        </div>
      )}
    </section>
  );
}
