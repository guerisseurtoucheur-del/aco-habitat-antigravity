-- CreateTable
CREATE TABLE "Dossier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'BROUILLON',
    "inspecteLe" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hashRapportSha256" TEXT,
    "signeLe" DATETIME
);

-- CreateTable
CREATE TABLE "PhotoDossier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dossierId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tailleBytes" BIGINT NOT NULL,
    "largeurPx" INTEGER NOT NULL,
    "hauteurPx" INTEGER NOT NULL,
    "hashSha256Original" TEXT NOT NULL,
    "capturedAt" DATETIME,
    "exifBrutJson" JSONB NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PhotoDossier_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConstatInsecteXylophage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dossierId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "typeInsecte" TEXT NOT NULL,
    "activiteDiagnostic" TEXT NOT NULL,
    "localisationStructurelle" TEXT NOT NULL,
    "elementsBoisTouches" TEXT NOT NULL,
    "releveDegradationsStructurelles" TEXT NOT NULL,
    "profondeurAtteinteMm" DECIMAL,
    "sectionResiduellePct" DECIMAL,
    "indiceConfiancePct" INTEGER NOT NULL,
    "preuveMaterielle" TEXT NOT NULL,
    "hypothesesDifferentielles" TEXT,
    "saisiLe" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verrouille" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ConstatInsecteXylophage_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_reference_key" ON "Dossier"("reference");

-- CreateIndex
CREATE INDEX "Dossier_statut_inspecteLe_idx" ON "Dossier"("statut", "inspecteLe");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoDossier_storageKey_key" ON "PhotoDossier"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoDossier_hashSha256Original_key" ON "PhotoDossier"("hashSha256Original");

-- CreateIndex
CREATE INDEX "PhotoDossier_dossierId_idx" ON "PhotoDossier"("dossierId");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoDossier_dossierId_ordre_key" ON "PhotoDossier"("dossierId", "ordre");

-- CreateIndex
CREATE INDEX "ConstatInsecteXylophage_dossierId_typeInsecte_activiteDiagnostic_idx" ON "ConstatInsecteXylophage"("dossierId", "typeInsecte", "activiteDiagnostic");

-- CreateIndex
CREATE UNIQUE INDEX "ConstatInsecteXylophage_dossierId_ordre_key" ON "ConstatInsecteXylophage"("dossierId", "ordre");
