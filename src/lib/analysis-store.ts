import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import {
  type AnalyseStatus,
  type ConsentTrace,
  type DiagnosticReport,
} from "@/types/diagnostic";
import { runClaudeDiagnostic } from "@/lib/claude-diagnostic";
import { sendLeadEmail } from "@/lib/mailer";

export type SessionRecord = {
  sessionId: string;
  status: AnalyseStatus;
  createdAt: Date;
  updatedAt: Date;
  result: DiagnosticReport | null;
  error: string | null;
  images: StoredImage[];
  clientName?: string | null;
  clientEmail?: string | null;
  clientPhone?: string | null;
  clientAddress?: string | null;
  isPaid: boolean;
};

type StoredImage = {
  mediaType: string;
  base64: string;
};

export async function createAnalysisSession(
  sessionId: string,
  images: StoredImage[],
  userAgent?: string,
  timestamp?: Date,
  clientInfo?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  },
  consent?: ConsentTrace,
): Promise<SessionRecord> {
  // 1. Créer la session en base de données
  const session = await prisma.diagnosticSession.create({
    data: {
      id: sessionId,
      status: "queued",
      userAgent,
      timestamp,
      clientName: clientInfo?.name,
      clientEmail: clientInfo?.email,
      clientPhone: clientInfo?.phone,
      clientAddress: clientInfo?.address,
      consentTermsAcceptedAt: consent?.termsAcceptedAt ?? null,
      consentNonOpposableAcknowledgedAt: consent?.nonOpposableAcknowledgedAt ?? null,
      consentIp: consent?.ip ?? null,
      consentUserAgent: consent?.userAgent ?? null,
      images: {
        create: images.map((img) => ({
          mediaType: img.mediaType,
          base64: img.base64,
        })),
      },
    },
  });

  // 2. Lancer l'analyse en arriere-plan via after() pour garantir
  // l'execution post-reponse meme en serverless (Vercel).
  after(async () => {
    try {
      console.info(`[analyse] Starting Claude analysis for session ${sessionId}`);
      await prisma.diagnosticSession.update({
        where: { id: sessionId },
        data: { status: "processing" },
      });

      const result = await runClaudeDiagnostic(images);

      await prisma.diagnosticSession.update({
        where: { id: sessionId },
        data: {
          status: "completed",
          result: result as Prisma.InputJsonValue,
        },
      });
      console.info(`[analyse] Claude analysis completed for session ${sessionId}`);

      // Envoyer l'email au proprietaire du site
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const reportUrl = `${baseUrl}/resultats/${sessionId}`;
      try {
        await sendLeadEmail(session, reportUrl);
      } catch (mailError) {
        const mailMessage =
          mailError instanceof Error ? mailError.message : "Erreur mail inconnue.";
        console.error(`[analyse] Email send failed for ${sessionId}:`, mailMessage);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue lors de l'analyse.";
      const stack = error instanceof Error ? error.stack : undefined;
      console.error(
        `[analyse] Claude diagnostic failed for session ${sessionId}:`,
        message,
        stack,
      );

      try {
        await prisma.diagnosticSession.update({
          where: { id: sessionId },
          data: {
            status: "failed",
            error: message,
          },
        });
      } catch (dbError) {
        console.error(
          `[analyse] Failed to mark session ${sessionId} as failed:`,
          dbError instanceof Error ? dbError.message : dbError,
        );
      }
    }
  });

  return {
    sessionId: session.id,
    status: "queued",
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    result: null,
    error: null,
    images: images,
    clientName: session.clientName,
    clientEmail: session.clientEmail,
    clientPhone: session.clientPhone,
    clientAddress: session.clientAddress,
    isPaid: false,
  };
}

export async function getAnalysisSession(sessionId: string): Promise<SessionRecord | null> {
  try {
    const session = await prisma.diagnosticSession.findUnique({
      where: { id: sessionId },
      include: { images: true },
    });

    if (!session) return null;

    return {
      sessionId: session.id,
      status: session.status as AnalyseStatus,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      result: session.result as unknown as DiagnosticReport | null,
      error: session.error,
      clientName: session.clientName,
      clientEmail: session.clientEmail,
      clientPhone: session.clientPhone,
      clientAddress: session.clientAddress,
      isPaid: session.isPaid,
      images: session.images.map((img: any) => ({
        mediaType: img.mediaType,
        base64: img.base64,
      })),
    };
  } catch (error) {
    console.error(`[analyse] Error fetching session ${sessionId}:`, error);
    return null;
  }
}
