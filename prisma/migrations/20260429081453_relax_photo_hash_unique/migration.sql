-- DropIndex
DROP INDEX "PhotoConstatXylophage_hashSha256_key";

-- CreateIndex
CREATE INDEX "PhotoConstatXylophage_hashSha256_idx" ON "PhotoConstatXylophage"("hashSha256");
