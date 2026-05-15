-- AlterTable
ALTER TABLE "Dossier" ADD COLUMN "adresseBien" TEXT;
ALTER TABLE "Dossier" ADD COLUMN "commanditaireEmail" TEXT;
ALTER TABLE "Dossier" ADD COLUMN "commanditaireNom" TEXT;
ALTER TABLE "Dossier" ADD COLUMN "commanditaireTelephone" TEXT;

-- CreateTable
CREATE TABLE "PhotoConstatXylophage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "constatId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tailleBytes" BIGINT NOT NULL,
    "hashSha256" TEXT NOT NULL,
    "legendeTechnique" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PhotoConstatXylophage_constatId_fkey" FOREIGN KEY ("constatId") REFERENCES "ConstatInsecteXylophage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConstatInsecteXylophage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dossierId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "typeInsecte" TEXT NOT NULL,
    "activiteDiagnostic" TEXT NOT NULL,
    "degreInfestationSondage" TEXT NOT NULL DEFAULT 'INDETERMINE',
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
INSERT INTO "new_ConstatInsecteXylophage" ("activiteDiagnostic", "dossierId", "elementsBoisTouches", "hypothesesDifferentielles", "id", "indiceConfiancePct", "localisationStructurelle", "ordre", "preuveMaterielle", "profondeurAtteinteMm", "releveDegradationsStructurelles", "saisiLe", "sectionResiduellePct", "typeInsecte", "verrouille") SELECT "activiteDiagnostic", "dossierId", "elementsBoisTouches", "hypothesesDifferentielles", "id", "indiceConfiancePct", "localisationStructurelle", "ordre", "preuveMaterielle", "profondeurAtteinteMm", "releveDegradationsStructurelles", "saisiLe", "sectionResiduellePct", "typeInsecte", "verrouille" FROM "ConstatInsecteXylophage";
DROP TABLE "ConstatInsecteXylophage";
ALTER TABLE "new_ConstatInsecteXylophage" RENAME TO "ConstatInsecteXylophage";
CREATE INDEX "ConstatInsecteXylophage_dossierId_typeInsecte_activiteDiagnostic_idx" ON "ConstatInsecteXylophage"("dossierId", "typeInsecte", "activiteDiagnostic");
CREATE UNIQUE INDEX "ConstatInsecteXylophage_dossierId_ordre_key" ON "ConstatInsecteXylophage"("dossierId", "ordre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PhotoConstatXylophage_storageKey_key" ON "PhotoConstatXylophage"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoConstatXylophage_hashSha256_key" ON "PhotoConstatXylophage"("hashSha256");

-- CreateIndex
CREATE INDEX "PhotoConstatXylophage_constatId_idx" ON "PhotoConstatXylophage"("constatId");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoConstatXylophage_constatId_ordre_key" ON "PhotoConstatXylophage"("constatId", "ordre");
