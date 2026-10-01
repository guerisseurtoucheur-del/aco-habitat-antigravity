'use client'

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckEmailsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleCheck() {
    setIsLoading(true);
    try {
      await fetch('/api/cron/check-emails');
      router.refresh();
    } catch (error) {
      console.error("Erreur de scan des emails:", error);
    }
    setIsLoading(false);
  }

  return (
    <button 
      onClick={handleCheck}
      disabled={isLoading}
      className="w-14 h-14 bg-emerald-600 border border-emerald-500 shadow-lg shadow-emerald-500/20 text-white hover:scale-105 active:scale-95 transition-all rounded-full flex items-center justify-center disabled:opacity-50"
      title="Scanner la boîte mail immédiatement"
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <Mail className="w-6 h-6" />
      )}
    </button>
  )
}
