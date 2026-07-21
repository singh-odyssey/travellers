"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ShieldAlert, Flag, X, ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import Image from "next/image";

interface TravelerChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelerId: string;
  travelerName: string;
  travelerImage?: string | null;
  onBlockCompleted: () => void;
}

type Message = {
  id: string;
  sender: "user" | "traveler";
  text: string;
  time: string;
};

export default function TravelerChatModal({
  isOpen,
  onClose,
  travelerId,
  travelerName,
  travelerImage,
  onBlockCompleted,
}: TravelerChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("Inappropriate behavior");
  const [reportDetails, setReportDetails] = useState("");
  const [moderationLoading, setModerationLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showBlockConfirm, showReportForm]);

  // Set default initial messages
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: "1",
          sender: "traveler",
          text: `Hey! I saw that you are also heading to this destination around the same dates! Do you want to plan something together?`,
          time: new Date(Date.now() - 60000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleBlock() {
    setModerationLoading(true);
    try {
      const res = await fetch("/api/user/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedId: travelerId }),
      });

      if (res.ok) {
        showToast("success", `${travelerName} has been blocked.`);
        setTimeout(() => {
          onBlockCompleted();
          onClose();
        }, 1500);
      } else {
        const errorData = await res.json();
        showToast("error", errorData.error || "Failed to block user.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Network error. Failed to block user.");
    } finally {
      setModerationLoading(false);
      setShowBlockConfirm(false);
    }
  }

  async function handleReport(e: React.FormEvent) {
    e.preventDefault();
    setModerationLoading(true);
    try {
      const res = await fetch("/api/user/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportedId: travelerId,
          reason: reportReason,
          details: reportDetails,
        }),
      });

      if (res.ok) {
        showToast("success", "Thank you. The profile has been reported for review.");
        setShowReportForm(false);
        setReportDetails("");
      } else {
        const errorData = await res.json();
        showToast("error", errorData.error || "Failed to submit report.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Network error. Failed to report profile.");
    } finally {
      setModerationLoading(false);
    }
  }

  function handleSendMessage() {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate traveler reply
    setTimeout(() => {
      const travelerReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "traveler",
        text: `That sounds great! I'm planning to check out the local sights and grab some street food. What about you?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, travelerReply]);
    }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-lg h-[500px] rounded-3xl bg-white dark:bg-[#0F1129] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
        
        {/* Toast Notification */}
        {toast && (
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg transition-all duration-300 ${
            toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}>
            {toast.message}
          </div>
        )}

        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-[#FBFBFA] dark:bg-[#12142E]/50 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition">
              <ArrowLeft size={18} />
            </button>
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-[#1A1C3D]">
              {travelerImage ? (
                <Image src={travelerImage} alt={travelerName} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 uppercase text-sm">
                  {travelerName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{travelerName}</h4>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setShowReportForm(true); setShowBlockConfirm(false); }}
              title="Report Profile"
              className="p-2 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition"
            >
              <Flag size={18} />
            </button>
            <button
              onClick={() => { setShowBlockConfirm(true); setShowReportForm(false); }}
              title="Block User"
              className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
            >
              <ShieldAlert size={18} />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Normal Chat Body */}
        {!showBlockConfirm && !showReportForm ? (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-[#0A0B1E]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-[#1A4D2E] text-white rounded-tr-none"
                        : "bg-white dark:bg-[#131535] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0F1129] shrink-0 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message safely..."
                className="flex-1 bg-gray-50 dark:bg-[#1A1C3D] border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2 text-sm text-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="rounded-xl bg-[#1A4D2E] text-white p-2.5 flex items-center justify-center hover:opacity-90 transition disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : showBlockConfirm ? (
          /* Block Confirmation Dialog overlay */
          <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50/50 dark:bg-[#0A0B1E] text-center">
            <div className="rounded-full bg-rose-50 dark:bg-rose-500/10 p-4 text-rose-500 mb-4 animate-bounce">
              <Shield size={36} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Block {travelerName}?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
              Blocking this traveler will hide your profile from each other. They won&apos;t be able to search, match, or message you again.
            </p>
            <div className="flex gap-3 mt-6 w-full max-w-xs">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                disabled={moderationLoading}
                className="flex-1 rounded-xl bg-rose-500 text-white px-4 py-2.5 text-xs font-semibold hover:bg-rose-600 transition disabled:opacity-50"
              >
                {moderationLoading ? "Blocking..." : "Yes, Block"}
              </button>
            </div>
          </div>
        ) : (
          /* Report Form overlay */
          <form onSubmit={handleReport} className="flex-1 flex flex-col p-6 bg-gray-50/50 dark:bg-[#0A0B1E] overflow-y-auto">
            <div className="flex items-center gap-2 text-amber-500 mb-4">
              <AlertTriangle size={24} />
              <h3 className="font-bold text-gray-900 dark:text-white">Report {travelerName}</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Submit a report if you suspect fake identity, spam, harassment, or inappropriate conduct. Our admin team will investigate immediately.
            </p>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-[#1A1C3D] border border-gray-100 dark:border-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Inappropriate behavior">Inappropriate behavior</option>
                  <option value="Spam / Commercial advertising">Spam / Advertising</option>
                  <option value="Fake profile / Not a traveler">Fake profile / Impersonation</option>
                  <option value="Harassment or abusive speech">Harassment or abusive speech</option>
                  <option value="Other / Safety concern">Other / Safety concern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Details (Optional)</label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Provide additional details or screenshots link..."
                  rows={4}
                  className="w-full rounded-xl bg-white dark:bg-[#1A1C3D] border border-gray-100 dark:border-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
              <button
                type="button"
                onClick={() => setShowReportForm(false)}
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={moderationLoading}
                className="flex-1 rounded-xl bg-amber-500 text-white px-4 py-2.5 text-xs font-semibold hover:bg-amber-600 transition disabled:opacity-50"
              >
                {moderationLoading ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
