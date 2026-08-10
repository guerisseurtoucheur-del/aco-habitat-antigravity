import { NextResponse } from "next/server"
import { sendLeadEmail } from "@/lib/mailer"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get("token") !== "acohabitat-test-2026") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const gmailConfigured = !!process.env.GMAIL_USER && !!process.env.GMAIL_APP_PASSWORD

  const makeSession = (name: string, address: string) => ({
    clientName: name,
    clientEmail: "prospect-demo@example.com",
    clientPhone: "06 12 34 56 78",
    clientAddress: address,
  })

  const result = {
    score_confiance_general: "85%",
    analyses: [
      { pathologie: "Capricorne des maisons", urgence: "moderee" },
      { pathologie: "Merule", urgence: "critique" },
    ],
  }

  const reportUrl = "https://diagnostic-bois.com/rapport/demo-test"

  const out: any = { gmailConfigured, sent: [] }

  try {
    // Lead dans la zone geree (departement 61 - Orne)
    await sendLeadEmail(makeSession("TEST Zone - M. Dupont", "12 rue des Tanneurs, 61000 Alencon"), reportUrl, result)
    out.sent.push("[ZONE 61] M. Dupont - 61000 Alencon")

    // Lead hors zone (a revendre - departement 75)
    await sendLeadEmail(makeSession("TEST Revente - Mme Martin", "5 avenue de la Republique, 75011 Paris"), reportUrl, result)
    out.sent.push("[REVENTE 75] Mme Martin - 75011 Paris")

    out.status = "ok"
  } catch (err: any) {
    out.status = "error"
    out.error = err?.message || String(err)
  }

  return NextResponse.json(out)
}
