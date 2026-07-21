"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ShieldAlert, Flag, User, AlertCircle } from "lucide-react";
import Image from "next/image";
import TravelerChatModal from "./TravelerChatModal";
import BlockUserModal from "./modals/BlockUserModal";
import ReportUserModal from "./modals/ReportUserModal";

interface TripMatchesProps {
  destination: string;
  departureDate: string;
}

interface MatchItem {
  id: string;
  destination: string;
  departureDate: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

export default function TripMatches({ destination, departureDate }: TripMatchesProps) {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<MatchItem | null>(null);
  const [reportingMatch, setReportingMatch] = useState<MatchItem | null>(null);
  const [blockingMatch, setBlockingMatch] = useState<MatchItem | null>(null);
  
  const [reportReason, setReportReason] = useState("Inappropriate behavior");
  const [reportDetails, setReportDetails] = useState("");
  const [submittingModeration, setSubmittingModeration] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        const formattedDate = new Date(departureDate).toISOString().split("T")[0];
        const res = await fetch(`/api/matches?destination=${encodeURIComponent(destination)}&date=${formattedDate}`);
        if (res.ok) {
          const data = await res.json();
          setMatches(data.matches || []);
        }
      } catch (err) {
        console.error("Failed to load matches:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, [destination, departureDate]);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleBlock(match: MatchItem) {
    setSubmittingModeration(true);
    try {
      const res = await fetch("/api/user/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedId: match.user.id }),
      });

      if (res.ok) {
        showToast("success", `${match.user.name} has been blocked.`);
        // Remove blocked user immediately from local list
        setMatches((prev) => prev.filter((m) => m.user.id !== match.user.id));
      } else {
        const errData = await res.json();
        showToast("error", errData.error || "Failed to block user.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Error blocking user.");
    } finally {
      setSubmittingModeration(false);
      setBlockingMatch(null);
    }
  }

  async function handleReport(e: React.FormEvent) {
    e.preventDefault();
    if (!reportingMatch) return;
    setSubmittingModeration(true);
    try {
      const res = await fetch("/api/user/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportedId: reportingMatch.user.id,
          reason: reportReason,
          details: reportDetails,
        }),
      });

      if (res.ok) {
        showToast("success", "Profile reported successfully.");
        setReportDetails("");
        setReportingMatch(null);
      } else {
        const errData = await res.json();
        showToast("error", errData.error || "Failed to submit report.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Error submitting report.");
    } finally {
      setSubmittingModeration(false);
    }
  }

  if (loading) {
    return (
      <div className="mt-4 space-y-2">
        <p className="text-xs text-slate-400 animate-pulse">Finding matching verified travellers...</p>
        <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (matches.length === 0) {
    return null; // Don't show anything if there are no matches
  }

  return (
    <div className="mt-6 border-t border-slate-100 dark:border-slate-800/80 pt-6 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
        }`}>
          {toast.message}
        </div>
      )}

      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-350 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <User size={16} className="text-emerald-500" />
        Verified Matches ({matches.length})
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {matches.map((match) => (
          <div
            key={match.id}
            className="group relative flex items-center justify-between gap-4 p-4 rounded-2xl border border-emerald-100/50 bg-[#F7F9F6] hover:bg-[#F2F6F1] dark:border-slate-800/50 dark:bg-[#11132B] dark:hover:bg-[#131737] transition duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                {match.user.image ? (
                  <Image src={match.user.image} alt={match.user.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400 uppercase text-base">
                    {match.user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  {match.user.name}
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" title="Verified traveller" />
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Departure: {new Date(match.departureDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveChat(match)}
                className="flex items-center gap-1 text-xs font-semibold rounded-xl bg-[#1A4D2E] hover:opacity-90 text-white px-3.5 py-2 transition"
              >
                <MessageCircle size={14} /> Chat
              </button>
              <button
                onClick={() => setReportingMatch(match)}
                title="Report User Profile"
                className="p-2 rounded-xl text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition"
              >
                <Flag size={15} />
              </button>
              <button
                onClick={() => setBlockingMatch(match)}
                title="Block User"
                className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
              >
                <ShieldAlert size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Traveler Chat Modal */}
      {activeChat && (
        <TravelerChatModal
          isOpen={true}
          onClose={() => setActiveChat(null)}
          travelerId={activeChat.user.id}
          travelerName={activeChat.user.name}
          travelerImage={activeChat.user.image}
          onBlockCompleted={() => {
            setMatches((prev) => prev.filter((m) => m.user.id !== activeChat.user.id));
            showToast("success", `${activeChat.user.name} has been blocked.`);
          }}
        />
      )}

      {/* Global Block Confirmation Overlay */}
      <BlockUserModal
        isOpen={Boolean(blockingMatch)}
        userName={blockingMatch?.user.name || ""}
        onConfirm={() => blockingMatch && handleBlock(blockingMatch)}
        onCancel={() => setBlockingMatch(null)}
        isLoading={submittingModeration}
      />

      {/* Global Report Profile Overlay */}
      <ReportUserModal
        isOpen={Boolean(reportingMatch)}
        userName={reportingMatch?.user.name || ""}
        reason={reportReason}
        setReason={setReportReason}
        details={reportDetails}
        setDetails={setReportDetails}
        onSubmit={handleReport}
        onCancel={() => setReportingMatch(null)}
        isLoading={submittingModeration}
      />
    </div>
  );
}
