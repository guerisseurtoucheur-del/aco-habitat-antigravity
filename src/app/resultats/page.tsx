import { redirect } from "next/navigation";

type ResultatsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResultatsPage({ searchParams }: ResultatsPageProps) {
  const params = await searchParams;
  const rawSessionId = params.sessionId;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;

  // Rediriger vers l'accueil si pas de sessionId
  if (!sessionId) {
    redirect("/");
  }

  // Rediriger vers la vraie page de resultats avec sessionId
  redirect(`/resultats/${sessionId}`);
}
