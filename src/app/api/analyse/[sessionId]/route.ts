import { NextResponse } from "next/server";
import {
  analyseStatusWithResultResponseSchema,
  diagnosticErrorSchema,
} from "@/types/diagnostic";
import { getAnalysisSession } from "@/lib/analysis-store";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { sessionId } = await context.params;
  const session = await getAnalysisSession(sessionId);

  if (!session) {
    const errorBody = diagnosticErrorSchema.parse({
      errorCode: "SESSION_NOT_FOUND",
      message: "Aucune session d'analyse trouvée pour cet identifiant.",
    });

    return NextResponse.json(errorBody, { status: 404 });
  }

  const responseBody = analyseStatusWithResultResponseSchema.parse({
    sessionId: session.sessionId,
    status: session.status,
    result: session.result,
    error: session.error,
  });

  return NextResponse.json(responseBody, { status: 200 });
}
