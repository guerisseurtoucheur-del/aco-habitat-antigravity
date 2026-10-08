import { redirect } from "next/navigation";

// Cette page redirige vers le formulaire principal de la page d'accueil
export default function NouveauDiagnosticPage() {
  redirect("/#formulaire");
}
