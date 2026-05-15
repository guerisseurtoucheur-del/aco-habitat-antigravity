"use client";

import Image from "next/image";
import { useState } from "react";

const MAX_PHOTOS_PER_CONSTAT = 4;

type ConstatPhoto = {
  id: string;
  file: File | null;
  previewUrl: string | null;
  legendeTechnique: string;
};

type PathologyRow = {
  id: string;
  famillePathologie: "INSECTE_XYLOPHAGE" | "CHAMPIGNON_LIGNIVORE" | "HUMIDITE";
  typePathologie: string;
  activiteDiagnostic: "VIVANT" | "MORT" | "INDETERMINE";
  degreInfestationSondage: "POSITIF" | "NEGATIF" | "INDETERMINE";
  localisationStructurelle: string;
  elementsBoisTouches: string;
  releveDegradationsStructurelles: string;
  preuveMaterielle: string;
  hypothesesDifferentielles: string;
  photos: ConstatPhoto[];
};

const PATHOLOGY_OPTIONS: {
  family: PathologyRow["famillePathologie"];
  value: string;
  label: string;
}[] = [
  { family: "INSECTE_XYLOPHAGE", value: "CAPRICORNE_DES_MAISONS", label: "Capricorne des maisons" },
  { family: "INSECTE_XYLOPHAGE", value: "PETITE_VRILLETTE", label: "Petite vrillette" },
  { family: "INSECTE_XYLOPHAGE", value: "GROSSE_VRILLETTE", label: "Grosse vrillette" },
  { family: "INSECTE_XYLOPHAGE", value: "LYCTUS_BRUNNEUS", label: "Lyctus brunneus" },
  { family: "INSECTE_XYLOPHAGE", value: "TERMITES", label: "Termites" },
  { family: "CHAMPIGNON_LIGNIVORE", value: "MERULE_PLEUREUSE", label: "Mérule pleureuse" },
  { family: "CHAMPIGNON_LIGNIVORE", value: "CONIOPHORE_DES_CAVES", label: "Coniophore des caves" },
  { family: "CHAMPIGNON_LIGNIVORE", value: "LENZITE_DES_CLOTURES", label: "Lenzite des clôtures" },
  { family: "HUMIDITE", value: "REMONTEES_CAPILLAIRES", label: "Remontées capillaires" },
  { family: "HUMIDITE", value: "INFILTRATIONS_PARIETALES", label: "Infiltrations pariétales" },
  { family: "HUMIDITE", value: "CONDENSATION_STRUCTURELLE", label: "Condensation structurelle" },
  { family: "HUMIDITE", value: "HUMIDITE_BOIS", label: "Humidité des bois de structure" },
  { family: "INSECTE_XYLOPHAGE", value: "AUTRE", label: "Autre pathologie" },
];

const emptyPhoto = (): ConstatPhoto => ({
  id: crypto.randomUUID(),
  file: null,
  previewUrl: null,
  legendeTechnique: "",
});

const emptyRow = (): PathologyRow => ({
  id: crypto.randomUUID(),
  famillePathologie: PATHOLOGY_OPTIONS[0].family,
  typePathologie: PATHOLOGY_OPTIONS[0].value,
  activiteDiagnostic: "INDETERMINE",
  degreInfestationSondage: "INDETERMINE",
  localisationStructurelle: "",
  elementsBoisTouches: "",
  releveDegradationsStructurelles: "",
  preuveMaterielle: "",
  hypothesesDifferentielles: "",
  photos: [emptyPhoto()],
});

function buildAutoFilledConstat(row: PathologyRow): PathologyRow {
  const firstConfiguredType = PATHOLOGY_OPTIONS[0];
  return {
    ...row,
    famillePathologie: row.famillePathologie || firstConfiguredType.family,
    typePathologie: row.typePathologie || firstConfiguredType.value,
    activiteDiagnostic: row.activiteDiagnostic || "INDETERMINE",
    degreInfestationSondage: row.degreInfestationSondage || "INDETERMINE",
    localisationStructurelle: row.localisationStructurelle.trim() || "Localisation à confirmer par IA",
    elementsBoisTouches: row.elementsBoisTouches.trim() || "Éléments à confirmer par IA",
    releveDegradationsStructurelles:
      row.releveDegradationsStructurelles.trim() || "Relevé initial renseigné automatiquement — validation IA attendue",
    preuveMaterielle: row.preuveMaterielle.trim() || "Preuve matérielle en cours de qualification par IA",
    hypothesesDifferentielles: row.hypothesesDifferentielles.trim() || "À préciser après analyse IA",
  };
}

export default function NouveauDiagnosticPage() {
  const [commanditaireNom, setCommanditaireNom] = useState("");
  const [commanditaireEmail, setCommanditaireEmail] = useState("");
  const [commanditaireTelephone, setCommanditaireTelephone] = useState("");
  const [adresseBien, setAdresseBien] = useState("");
  const [pathologies, setPathologies] = useState<PathologyRow[]>([emptyRow()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const updatePathology = <K extends keyof PathologyRow>(
    rowId: string,
    key: K,
    value: PathologyRow[K],
  ) => {
    setPathologies((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [key]: value } : row)),
    );
  };

  const updatePhoto = (rowId: string, photoId: string, updates: Partial<ConstatPhoto>): void => {
    setPathologies((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;
        return {
          ...row,
          photos: row.photos.map((photo) =>
            photo.id === photoId ? { ...photo, ...updates } : photo,
          ),
        };
      }),
    );
  };

  const addPhotoToConstat = (rowId: string): void => {
    setPathologies((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;
        if (row.photos.length >= MAX_PHOTOS_PER_CONSTAT) return row;
        return { ...row, photos: [...row.photos, emptyPhoto()] };
      }),
    );
  };

  const removePhotoFromConstat = (rowId: string, photoId: string): void => {
    setPathologies((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;
        if (row.photos.length <= 1) return row;
        const target = row.photos.find((photo) => photo.id === photoId);
        if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
        return { ...row, photos: row.photos.filter((photo) => photo.id !== photoId) };
      }),
    );
  };

  const submitDossier = async (): Promise<void> => {
    setFeedback(null);
    setFieldErrors([]);
    setIsSubmitting(true);
    try {
      const clientSideErrors: string[] = [];
      if (!commanditaireNom.trim()) clientSideErrors.push("Le nom du commanditaire est requis.");
      if (!commanditaireEmail.trim()) clientSideErrors.push("L'email du commanditaire est requis.");
      if (!commanditaireTelephone.trim()) {
        clientSideErrors.push("Le téléphone du commanditaire est requis.");
      }
      if (!adresseBien.trim()) clientSideErrors.push("L'adresse du bien est requise.");

      const selectedPathologies = pathologies.slice(0, 1);

      selectedPathologies.forEach((row, index) => {
        const rowLabel = `Constat #${index + 1}`;
        const validPhotos = row.photos.filter((photo) => photo.file);
        if (validPhotos.length === 0) {
          clientSideErrors.push(`${rowLabel}: au moins une photo est requise.`);
        }
        validPhotos.forEach((photo, photoIndex) => {
          if (!photo.legendeTechnique.trim()) {
            clientSideErrors.push(
              `${rowLabel} photo #${photoIndex + 1}: la légende technique est obligatoire.`,
            );
          }
        });
        if (validPhotos.length > MAX_PHOTOS_PER_CONSTAT) {
          clientSideErrors.push(
            `${rowLabel}: maximum ${MAX_PHOTOS_PER_CONSTAT} photos autorisées.`,
          );
        }
      });

      if (clientSideErrors.length > 0) {
        setFieldErrors(clientSideErrors);
        setFeedback("Le dossier contient des champs obligatoires manquants.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      const constatsPayload = selectedPathologies.map((rawRow) => {
        const row = buildAutoFilledConstat(rawRow);
        return {
        famillePathologie: row.famillePathologie,
        typePathologie: row.typePathologie,
        activiteDiagnostic: row.activiteDiagnostic,
        degreInfestationSondage: row.degreInfestationSondage,
        localisationStructurelle: row.localisationStructurelle,
        elementsBoisTouches: row.elementsBoisTouches,
        releveDegradationsStructurelles: row.releveDegradationsStructurelles,
        preuveMaterielle: row.preuveMaterielle,
        hypothesesDifferentielles: row.hypothesesDifferentielles,
        photos: row.photos
          .filter((photo) => photo.file)
          .map((photo) => {
            const uploadKey = `constat_${row.id}_photo_${photo.id}`;
            formData.append(uploadKey, photo.file as File);
            return {
              uploadKey,
              legendeTechnique: photo.legendeTechnique || "Légende non renseignée",
            };
          }),
      };
      });

      formData.append(
        "payload",
        JSON.stringify({
          commanditaireNom,
          commanditaireEmail,
          commanditaireTelephone,
          adresseBien,
          constats: constatsPayload,
        }),
      );

      const response = await fetch("/api/dossiers", { method: "POST", body: formData });
      const rawText = await response.text();
      let json: { message?: string; dossierId?: string; reference?: string } = {};
      try {
        json = JSON.parse(rawText) as typeof json;
      } catch {
        throw new Error("Réponse serveur invalide. Recharge la page puis réessaie.");
      }

      if (!response.ok) {
        const message = json.message ?? "Échec de création du dossier.";
        if (message.trim().startsWith("[")) {
          try {
            const parsed = JSON.parse(message) as Array<{
              path?: Array<string | number>;
              message?: string;
            }>;
            const humanized = parsed
              .map((issue) => {
                const path = issue.path?.join(".") ?? "champ";
                return `${path}: ${issue.message ?? "invalide"}`;
              })
              .slice(0, 8);
            if (humanized.length > 0) setFieldErrors(humanized);
          } catch {
            // keep default message
          }
        }
        throw new Error(message);
      }

      setFeedback(`Dossier ${json.reference} créé avec succès.`);
      if (json.dossierId) {
        window.open(`/api/dossiers/${json.dossierId}/pdf`, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Erreur inattendue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            ACO-HABITAT - Saisie Forensique
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Nouveau dossier de pré-analyse pathologique
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Formulaire chirurgical pour constituer un dossier exploitable en rapport de pré-analyse.
          </p>
        </header>

        <form className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Informations client</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Nom / Raison sociale</span>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                  placeholder="Ex: Cabinet Martin & Fils"
                  value={commanditaireNom}
                  onChange={(event) => setCommanditaireNom(event.target.value)}
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                  placeholder="client@exemple.fr"
                  value={commanditaireEmail}
                  onChange={(event) => setCommanditaireEmail(event.target.value)}
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Téléphone</span>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                  placeholder="+33 6 00 00 00 00"
                  value={commanditaireTelephone}
                  onChange={(event) => setCommanditaireTelephone(event.target.value)}
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Référence mission</span>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                  placeholder="ACO-2026-000321"
                />
              </label>
              <label className="space-y-1 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Adresse du bien</span>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                  placeholder="12 Rue des Charpentes, 75000 Paris"
                  value={adresseBien}
                  onChange={(event) => setAdresseBien(event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Photos client (analyse automatique IA)</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Le client charge 1 à 4 photos. Les détails techniques sont complétés automatiquement puis vérifiés par l&apos;IA.
            </p>

            <div className="mt-4 space-y-4">
              {pathologies.slice(0, 1).map((row, idx) => (
                <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      Dossier photo client
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Type de pathologie
                      </span>
                      <select
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        value={row.typePathologie}
                        onChange={(event) => {
                          const selected = PATHOLOGY_OPTIONS.find((option) => option.value === event.target.value);
                          updatePathology(row.id, "typePathologie", event.target.value);
                          if (selected) {
                            updatePathology(row.id, "famillePathologie", selected.family as PathologyRow["famillePathologie"]);
                          }
                        }}
                      >
                        {PATHOLOGY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Activité observée
                      </span>
                      <select
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        value={row.activiteDiagnostic}
                        onChange={(event) =>
                          updatePathology(
                            row.id,
                            "activiteDiagnostic",
                            event.target.value as PathologyRow["activiteDiagnostic"],
                          )
                        }
                      >
                        <option value="INDETERMINE">Indéterminé</option>
                        <option value="VIVANT">Vivant</option>
                        <option value="MORT">Mort</option>
                      </select>
                    </label>

                    <label className="space-y-1 md:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Sondage infestation
                      </span>
                      <select
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        value={row.degreInfestationSondage}
                        onChange={(event) =>
                          updatePathology(
                            row.id,
                            "degreInfestationSondage",
                            event.target.value as PathologyRow["degreInfestationSondage"],
                          )
                        }
                      >
                        <option value="INDETERMINE">Indéterminé</option>
                        <option value="POSITIF">Sondage positif</option>
                        <option value="NEGATIF">Sondage négatif</option>
                      </select>
                    </label>

                    <label className="space-y-1 md:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Localisation
                      </span>
                      <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        placeholder="Ex: Solive S3, cave nord, face inférieure"
                        value={row.localisationStructurelle}
                        onChange={(event) =>
                          updatePathology(row.id, "localisationStructurelle", event.target.value)
                        }
                      />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Eléments bois touchés
                      </span>
                      <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        placeholder="Poutres, solives, plancher..."
                        value={row.elementsBoisTouches}
                        onChange={(event) =>
                          updatePathology(row.id, "elementsBoisTouches", event.target.value)
                        }
                      />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Relevé des dégradations
                      </span>
                      <textarea
                        className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        placeholder="Galeries, vermoulure, perte de section..."
                        value={row.releveDegradationsStructurelles}
                        onChange={(event) =>
                          updatePathology(
                            row.id,
                            "releveDegradationsStructurelles",
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Preuve matérielle
                      </span>
                      <textarea
                        className="min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                        placeholder="Indices objectivables..."
                        value={row.preuveMaterielle}
                        onChange={(event) =>
                          updatePathology(row.id, "preuveMaterielle", event.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Photos du constat + légende technique
                      </p>
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        onClick={() => addPhotoToConstat(row.id)}
                        disabled={row.photos.length >= MAX_PHOTOS_PER_CONSTAT}
                      >
                        + Ajouter photo
                      </button>
                    </div>
                    <p className="mb-2 text-xs text-slate-500">
                      1 à {MAX_PHOTOS_PER_CONSTAT} photos par constat. L&apos;IA réalise l&apos;analyse automatiquement.
                    </p>

                    <div className="space-y-3">
                      {row.photos.map((photo, photoIndex) => (
                        <div key={photo.id} className="rounded-lg border border-slate-200 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-xs font-semibold text-slate-600">
                              Photo constat #{photoIndex + 1}
                            </p>
                            {row.photos.length > 1 ? (
                              <button
                                type="button"
                                className="text-xs font-semibold text-red-600"
                                onClick={() => removePhotoFromConstat(row.id, photo.id)}
                              >
                                Supprimer
                              </button>
                            ) : null}
                          </div>

                          {photo.previewUrl ? (
                            <Image
                              src={photo.previewUrl}
                              alt={`Constat ${idx + 1} photo ${photoIndex + 1}`}
                              width={720}
                              height={420}
                              unoptimized
                              className="h-40 w-full rounded-md object-cover"
                            />
                          ) : null}

                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700"
                            onChange={(event) => {
                              const file = event.target.files?.[0] ?? null;
                              if (photo.previewUrl) URL.revokeObjectURL(photo.previewUrl);
                              updatePhoto(row.id, photo.id, {
                                file,
                                previewUrl: file ? URL.createObjectURL(file) : null,
                              });
                            }}
                          />

                          <input
                            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-4"
                            placeholder="Légende technique de la photo"
                            value={photo.legendeTechnique}
                            onChange={(event) =>
                              updatePhoto(row.id, photo.id, {
                                legendeTechnique: event.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="sticky bottom-4 z-10 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
            <button
              type="button"
              className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              onClick={() => void submitDossier()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement du dossier..." : "Générer le rapport PDF"}
            </button>
            {feedback ? <p className="mt-2 text-sm text-slate-600">{feedback}</p> : null}
            {fieldErrors.length > 0 ? (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="mb-2 text-sm font-semibold text-red-700">Points à corriger :</p>
                <ul className="list-disc space-y-1 pl-5 text-xs text-red-700">
                  {fieldErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </main>
  );
}
