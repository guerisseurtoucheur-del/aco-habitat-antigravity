import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Assurez-vous d'avoir la variable d'environnement ANTHROPIC_API_KEY
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `Tu es l'assistant virtuel officiel de ACO Habitat, spécialiste du traitement du bois, de la mérule, des insectes xylophages (capricorne, vrillettes, termites) et des problèmes d'humidité depuis 2006.
Ton but est d'accueillir les visiteurs, de répondre à leurs questions sur les pathologies du bois, et surtout de les rassurer.
Tu as une connaissance experte des traitements : recherche d'humidité, piquage, brûlage au chalumeau, injection de fongicide au cœur de la maçonnerie et des bois.

TRÈS IMPORTANT : ACO Habitat propose un outil gratuit d'analyse de photos par IA (Intelligence Artificielle) directement sur le site.
Dès qu'un client exprime un doute ou décrit un problème (taches, champignons, bois qui s'effrite, sciure), tu DOIS l'inciter fortement à utiliser notre outil de diagnostic photo en ligne gratuit pour obtenir une pré-analyse instantanée.

Reste professionnel, rassurant, poli et concis. Ne donne pas de devis, mais explique nos méthodes.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages invalides" }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    });

    // Extracting text from the Anthropic response block
    const textContent = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return NextResponse.json({ reply: textContent });
  } catch (error) {
    console.error("Erreur API Chatbot:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la communication avec l'assistant." },
      { status: 500 }
    );
  }
}
