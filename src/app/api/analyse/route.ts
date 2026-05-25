import { NextResponse } from "next/server";
import {
  analyseRequestSchema,
  analyseResponseSchema,
  diagnosticErrorSchema,
  extractAnalyseRequestFromFormData,
  extractConsentTraceFromFormData,
} from "@/types/diagnostic";
import { createAnalysisSession } from "@/lib/analysis-store";

export const runtime = "nodejs";
export const maxDuration = 300;

function extractClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

function detectMediaType(buffer: Buffer, fallback: string): string {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46
  ) {
    return "image/webp";
  }
  if (
    buffer.length >= 6 &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61
  ) {
    return "image/gif";
  }
  return fallback;
}

async function toStoredImage(file: File): Promise<{ mediaType: string; base64: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return {
    mediaType: detectMediaType(buffer, file.type || "image/jpeg"),
    base64: buffer.toString("base64"),
  };
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const analysePayload = extractAnalyseRequestFromFormData(
      formData,
      userAgent,
    );

    const parsedRequest = analyseRequestSchema.safeParse(analysePayload);
    if (!parsedRequest.success) {
      const errorBody = diagnosticErrorSchema.parse({
        errorCode: "INVALID_REQUEST",
        message: "Les données envoyées sont invalides.",
        details: parsedRequest.error.flatten(),
      });

      return NextResponse.json(errorBody, { status: 400 });
    }

    const sessionId = crypto.randomUUID();
    const files = [
      parsedRequest.data.photo_1,
      parsedRequest.data.photo_2,
      parsedRequest.data.photo_3,
      parsedRequest.data.photo_4,
    ].filter((file): file is File => Boolean(file));
    const images = await Promise.all(files.map((file) => toStoredImage(file)));

    const clientIp = extractClientIp(request);
    const consent = extractConsentTraceFromFormData(formData, clientIp, userAgent);
    if (!consent.termsAcceptedAt || !consent.nonOpposableAcknowledgedAt) {
      const errorBody = diagnosticErrorSchema.parse({
        errorCode: "CONSENT_MISSING",
        message:
          "Les consentements CGV et reconnaissance du caractère non-réglementé sont obligatoires.",
        details: {
          termsAcceptedAt: consent.termsAcceptedAt,
          nonOpposableAcknowledgedAt: consent.nonOpposableAcknowledgedAt,
        },
      });
      return NextResponse.json(errorBody, { status: 400 });
    }

    const session = await createAnalysisSession(
      sessionId,
      images,
      userAgent,
      parsedRequest.data.timestamp,
      {
        name: parsedRequest.data.clientName,
        email: parsedRequest.data.clientEmail,
        phone: parsedRequest.data.clientPhone,
        address: parsedRequest.data.clientAddress,
      },
      consent,
    );

    const responseBody = analyseResponseSchema.parse({
      sessionId: session.sessionId,
      status: session.status,
    });

    return NextResponse.json(responseBody, { status: 202 });
  } catch (error) {
    console.error("[api/analyse] Detailed failure:", error);
    const errorBody = diagnosticErrorSchema.parse({
      errorCode: "ANALYSE_CREATION_FAILED",
      message: "Impossible d'initialiser la session d'analyse.",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
    });

    return NextResponse.json(errorBody, { status: 500 });
  }
}
