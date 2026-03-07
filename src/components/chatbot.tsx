"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi 👋 Ask me about ticket uploads, matching, dashboard or messaging!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close on outside click + ESC key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  async function sendMessage() {
    if (!input.trim() || input.length > 500) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.reply || "Sorry, I couldn't respond.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Server error occurred." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="
h-14 w-14 rounded-full
bg-blue-600 text-white shadow-lg
flex items-center justify-center
transition-all duration-300
hover:scale-110
"
      >
        <MessageCircle size={22} />
      </button>


      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="
            fixed bottom-24 right-6 w-80 h-[420px]
            rounded-2xl flex flex-col z-50 shadow-2xl border

            bg-[#f0fdf4] border-green-200
            dark:bg-[#111111] dark:border-gray-800
          "
        >
          {/* Header */}
          <div
            className="
              p-3 font-semibold border-b rounded-t-2xl text-center

              bg-green-100 border-green-200 text-green-900
              dark:bg-[#1a1a1a] dark:border-gray-800 dark:text-gray-200
            "
          >
            TravelBox
          </div>

          {/* Messages */}
          <div
            className="
              flex-1 overflow-y-auto p-3 space-y-3 text-sm

              bg-green-50
              dark:bg-[#0f0f0f]
            "
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-2xl max-w-[80%] ${msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-white border border-green-200 text-gray-800 dark:bg-[#1c1c1c] dark:border-gray-700 dark:text-gray-200"
                  }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                Typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="
              p-3 border-t

              bg-green-50 border-green-200
              dark:bg-[#111111] dark:border-gray-800
            "
          >
            <div
              className="
                flex items-center gap-2 rounded-full px-4 py-2 transition

                bg-white focus-within:ring-2 focus-within:ring-green-500
                dark:bg-[#1a1a1a] dark:focus-within:ring-blue-500
              "
            >
              <input
                type="text"
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Ask anything about Travellers..."
                className="
  flex-1 bg-transparent border-none text-sm

  text-gray-800 placeholder-gray-500
  dark:text-gray-200 dark:placeholder-gray-400

  outline-none focus:outline-none focus:ring-0"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110">              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
