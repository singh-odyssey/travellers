"use client";

import { useState, useRef, useEffect } from "react";
import { knowledge } from "@/lib/chatbot-data";

type Message = { from: "user" | "bot"; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm the Travellers help bot. Ask me about the site or how to use it." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function appendMessage(m: Message) {
    setMessages((s) => [...s, m]);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    appendMessage({ from: "user", text });
    setInput("");
    // very small local QA: find best knowledge match
    const lower = text.toLowerCase();
    // exact keyword match on titles or text
    let reply = "Sorry, I don't know that yet. Try asking about signing up, uploading tickets, the dashboard, or the tech stack.";
    for (const k of knowledge) {
      if (k.title.toLowerCase().includes(lower) || k.text.toLowerCase().includes(lower)) {
        reply = k.text;
        break;
      }
    }
    // fallback: keyword search
    if (reply.startsWith("Sorry")) {
      const hits = knowledge.filter((k) => {
        const words = lower.split(/\W+/).filter(Boolean);
        return words.some((w) => k.text.toLowerCase().includes(w) || k.title.toLowerCase().includes(w));
      });
      if (hits.length) reply = hits[0].text;
    }

    setTimeout(() => appendMessage({ from: "bot", text: reply }), 300);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label="Open chat"
          onClick={() => setOpen((s) => !s)}
          className="rounded-full bg-blue-600 text-white w-14 h-14 shadow-lg flex items-center justify-center hover:bg-blue-700"
        >
          {open ? "×" : "💬"}
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="px-4 py-2 bg-blue-600 text-white font-medium">Help Chat</div>
          <div className="p-3 flex-1 overflow-auto h-64">
            <div className="space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
                  <div className={`inline-block px-3 py-1 rounded ${m.from === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about the site..."
                className="flex-1 rounded px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
              <button onClick={handleSend} className="bg-blue-600 text-white px-3 py-2 rounded">Send</button>
            </div>
            <div className="text-xs text-gray-500 mt-2">Try: &quot;How do I upload a ticket?&quot;</div>
          </div>
        </div>
      )}
    </div>
  );
}
