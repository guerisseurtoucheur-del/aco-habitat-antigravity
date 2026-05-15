import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateDiagnosticPdfBuffer } from "@/lib/pdf/diagnostic-report-template";
import { diagnosticReportSchema } from "@/types/diagnostic";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { sessionId } = await context.params;

  const session = await prisma.diagnosticSession.findUnique({
    where: { id: sessionId },
    include: { images: true },
  });

  if (!session) {
    return NextResponse.json(
      { error: "Session introuvable." },
      { status: 404 },
    );
  }

  if (session.status !== "completed" || !session.result) {
    return NextResponse.json(
      { error: "L'analyse n'est pas encore terminée." },
      { status: 400 },
    );
  }

  const parsed = diagnosticReportSchema.safeParse(session.result);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Rapport invalide, impossible de générer le PDF." },
      { status: 500 },
    );
  }

  try {
    const pdfBuffer = await generateDiagnosticPdfBuffer(session, parsed.data);
    const ref = sessionId.slice(0, 12).toUpperCase();
    const filename = `Rapport_ACO-HABITAT_${ref}.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("[pdf] PDF generation failed:", message);
    return NextResponse.json(
      { error: `Génération du PDF impossible : ${message}` },
      { status: 500 },
    );
  }
}
