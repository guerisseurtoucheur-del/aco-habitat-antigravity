-- CreateTable
CREATE TABLE "DiagnosticSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userAgent" TEXT,
    "timestamp" DATETIME,
    "result" JSONB,
    "error" TEXT
);

-- CreateTable
CREATE TABLE "DiagnosticImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "base64" TEXT NOT NULL,
    CONSTRAINT "DiagnosticImage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "DiagnosticSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "DiagnosticSession_status_idx" ON "DiagnosticSession"("status");

-- CreateIndex
CREATE INDEX "DiagnosticImage_sessionId_idx" ON "DiagnosticImage"("sessionId");
