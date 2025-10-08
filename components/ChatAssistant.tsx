"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, history }),
      });
      const data = await res.json().catch(() => ({}));
      const answer =
        (typeof data?.answer === "string" && data.answer.trim()) ||
        (typeof data?.error === "string" && ` ${data.error}`) ||
        " Pas de réponse du serveur.";

      setMessages(prev => [...prev, { role: "assistant", content: answer }]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: ` Erreur réseau: ${e?.message || e}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="h-64 overflow-y-auto rounded-md border p-3 bg-white">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">
            Bonjour! Posez-moi une question sur nos services (IA, BI, ERP, cybersécurité)
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 max-w-[90%] ${m.role === "user" ? "ml-auto text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-md ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">L’IA rédige</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2"
          placeholder="Écrivez votre message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button className="btn-primary" onClick={send} disabled={loading}>
          {loading ? "Envoi" : "Envoyer"}
        </button>
      </div>
    </div>
  );
}
