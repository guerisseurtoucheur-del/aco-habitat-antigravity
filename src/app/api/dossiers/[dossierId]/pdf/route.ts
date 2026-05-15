import { generateDossierPdfBuffer } from "@/lib/pdf/generate-dossier-pdf";

type RouteContext = {
  params: Promise<{ dossierId: string }>;
};

export async function GET(_request: Request, context: RouteContext): Promise<Response> {
  const { dossierId } = await context.params;
  const pdfBuffer = await generateDossierPdfBuffer(dossierId);

  return new Response(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="rapport-${dossierId}.pdf"`,
    },
  });
}
