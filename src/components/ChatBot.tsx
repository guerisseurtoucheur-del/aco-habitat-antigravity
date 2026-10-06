"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant ACO Habitat. Avez-vous une question sur la mérule, les termites, ou nos traitements de charpente ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Désolé, je rencontre un problème de connexion momentané." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton pour ouvrir/fermer le chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center overflow-hidden border-4 border-white ${
          isOpen ? "bg-slate-800 text-white w-14 h-14" : "w-16 h-16 bg-white"
        }`}
        aria-label="Discuter avec l'assistant"
      >
        {isOpen ? (
          <span className="text-xl font-bold leading-none">✕</span>
        ) : (
          <img src="/kemal.jpg" alt="Expert ACO Habitat" className="w-full h-full object-cover" />
        )}
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-slate-800 text-white p-4 flex items-center gap-3 shadow-md relative z-10">
            <img src="/kemal.jpg" alt="Expert ACO Habitat" className="w-12 h-12 rounded-full border-2 border-slate-600 object-cover" />
            <div>
              <h3 className="font-bold">Kémal Ousmani</h3>
              <p className="text-xs text-teal-400">Expertise Bois & Humidité</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-teal-600 text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-2 text-sm shadow-sm flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Raccourci vers le diagnostic (si jamais l'IA n'y pense pas, le bouton est là) */}
          <div className="bg-slate-100 p-2 border-t border-slate-200 text-center">
            <Link href="/#diagnostic-upload" onClick={() => setIsOpen(false)} className="text-xs font-bold text-teal-600 hover:text-teal-500 underline">
              Lancer une analyse photo gratuite 📸
            </Link>
          </div>

          {/* Formulaire d'entrée */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-slate-800 hover:bg-slate-700 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
