// Test direct de l'API Claude pour identifier l'erreur exacte de prod
import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic_api_key || process.env.ANTHROPIC_AUTH_TOKEN;

if (!apiKey) {
  console.error("[test] AUCUNE clé API trouvée dans l'environnement.");
  console.error("[test] Variables vues:", Object.keys(process.env).filter((k) => k.toLowerCase().includes("anthropic")));
  process.exit(1);
}

console.info("[test] Clé trouvée, longueur:", apiKey.length, "préfixe:", apiKey.slice(0, 10));

const anthropic = new Anthropic({ apiKey });

// 1) Lister les modèles disponibles
try {
  const models = await anthropic.models.list();
  console.info("[test] Modèles disponibles:");
  for (const m of models.data.slice(0, 15)) {
    console.info("  -", m.id);
  }
} catch (e) {
  console.error("[test] Erreur lister modèles:", e?.status, e?.message);
}

// 2) Test d'appel simple sans image avec Sonnet 4.5
const candidates = [
  "claude-sonnet-4-5-20250929",
  "claude-sonnet-4-5",
  "claude-3-5-sonnet-20241022",
];

for (const model of candidates) {
  try {
    console.info(`\n[test] Test avec ${model}...`);
    const res = await anthropic.messages.create({
      model,
      max_tokens: 50,
      messages: [{ role: "user", content: "Réponds 'OK'." }],
    });
    console.info(`[test] ${model} OK ->`, res.content[0]?.text);
    break;
  } catch (e) {
    console.error(`[test] ${model} FAIL:`, e?.status, e?.message);
  }
}
