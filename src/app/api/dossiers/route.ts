import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  ActiviteInsecteXylophage,
  DegreInfestationSondage,
  FamillePathologie,
  TypePathologieConstat,
} from "@prisma/client";
import { z } from "zod";
import { runClaudeDiagnostic } from "@/lib/claude-diagnostic";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const payloadSchema = z.object({
  commanditaireNom: z.string().trim().min(1),
  commanditaireEmail: z.string().email(),
  commanditaireTelephone: z.string().trim().min(1),
  adresseBien: z.string().trim().min(1),
  constats: z
    .array(
      z.object({
        famillePathologie: z.nativeEnum(FamillePathologie),
        typePathologie: z.nativeEnum(TypePathologieConstat),
        activiteDiagnostic: z.nativeEnum(ActiviteInsecteXylophage),
        degreInfestationSondage: z.nativeEnum(DegreInfestationSondage),
        localisationStructurelle: z.string().trim().min(1),
        elementsBoisTouches: z.string().trim().min(1),
        releveDegradationsStructurelles: z.string().trim().min(1),
        preuveMaterielle: z.string().trim().min(1),
        hypothesesDifferentielles: z.string().optional(),
        photos: z
          .array(
            z.object({
              uploadKey: z.string().trim().min(1),
              legendeTechnique: z.string().trim().min(1),
            }),
          )
          .min(1)
          .max(4),
      }),
    )
    .min(1),
});

function buildReference(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = `${now.getMonth() + 1}`.padStart(2, "0");
  const d = `${now.getDate()}`.padStart(2, "0");
  return `ACO-${y}${m}${d}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const rawPayload = formData.get("payload");

    if (typeof rawPayload !== "string") {
      return NextResponse.json(
        { errorCode: "INVALID_PAYLOAD", message: "Payload manquant." },
        { status: 400 },
      );
    }

    const payload = payloadSchema.parse(JSON.parse(rawPayload));

    const dossier = await prisma.dossier.create({
      data: {
        reference: buildReference(),
        inspecteLe: new Date(),
        commanditaireNom: payload.commanditaireNom,
        commanditaireEmail: payload.commanditaireEmail,
        commanditaireTelephone: payload.commanditaireTelephone,
        adresseBien: payload.adresseBien,
      },
    });

    for (let i = 0; i < payload.constats.length; i += 1) {
      const constatPayload = payload.constats[i];
      const constat = await prisma.constatInsecteXylophage.create({
        data: {
          dossierId: dossier.id,
          ordre: i + 1,
          famillePathologie: constatPayload.famillePathologie,
          typePathologie: constatPayload.typePathologie,
          activiteDiagnostic: constatPayload.activiteDiagnostic,
          degreInfestationSondage: constatPayload.degreInfestationSondage,
          localisationStructurelle: constatPayload.localisationStructurelle,
          elementsBoisTouches: constatPayload.elementsBoisTouches,
          releveDegradationsStructurelles: constatPayload.releveDegradationsStructurelles,
          preuveMaterielle: constatPayload.preuveMaterielle,
          hypothesesDifferentielles: constatPayload.hypothesesDifferentielles || null,
          indiceConfiancePct: 0,
        },
      });

      for (let j = 0; j < constatPayload.photos.length; j += 1) {
        const photoPayload = constatPayload.photos[j];
        const file = formData.get(photoPayload.uploadKey);
        if (!(file instanceof File)) {
          return NextResponse.json(
            { errorCode: "MISSING_PHOTO", message: `Photo manquante pour le constat #${i + 1}.` },
            { status: 400 },
          );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const hashSha256 = createHash("sha256").update(buffer).digest("hex");
        const extension = file.name.includes(".")
          ? file.name.split(".").pop()?.toLowerCase() || "jpg"
          : "jpg";
        const fileName = `${j + 1}-${hashSha256.slice(0, 10)}.${extension}`;
        const relativePath = `/uploads/dossiers/${dossier.id}/${constat.id}/${fileName}`;
        const absolutePath = path.join(process.cwd(), "public", relativePath);
        await mkdir(path.dirname(absolutePath), { recursive: true });
        await writeFile(absolutePath, buffer);

        await prisma.photoConstatXylophage.create({
          data: {
            constatId: constat.id,
            ordre: j + 1,
            storageKey: relativePath,
            mimeType: file.type || "application/octet-stream",
            tailleBytes: BigInt(file.size),
            hashSha256,
            legendeTechnique: photoPayload.legendeTechnique,
          },
        });
      }
    }

    const photosForAi = await prisma.photoConstatXylophage.findMany({
      where: { constat: { dossierId: dossier.id } },
      orderBy: [{ constatId: "asc" }, { ordre: "asc" }],
    });

    try {
      const images = await Promise.all(
        photosForAi.map(async (photo) => {
          const absolutePath = path.join(process.cwd(), "public", photo.storageKey);
          const buffer = await import("node:fs/promises").then((fs) => fs.readFile(absolutePath));
          return {
            mediaType: photo.mimeType.startsWith("image/") ? photo.mimeType : "image/jpeg",
            base64: buffer.toString("base64"),
          };
        }),
      );

      const aiReport = await runClaudeDiagnostic(images);
      await prisma.dossier.update({
        where: { id: dossier.id },
        data: {
          diagnosticGlobalIa: aiReport.diagnostic_global,
          scoreConfianceIa: aiReport.score_confiance_general,
          conclusionJuridiqueIa: aiReport.conclusion_juridique,
          analysesIaJson: aiReport.analyses,
          preconisationsIaJson: aiReport.preconisations_techniques,
        },
      });
    } catch (error) {
      console.warn(
        "[dossiers] AI diagnostic failed:",
        error instanceof Error ? error.message : String(error),
      );
    }

    return NextResponse.json(
      {
        dossierId: dossier.id,
        reference: dossier.reference,
        status: dossier.statut,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json(
      {
        errorCode: "DOSSIER_CREATION_FAILED",
        message,
      },
      { status: 500 },
    );
  }
}
