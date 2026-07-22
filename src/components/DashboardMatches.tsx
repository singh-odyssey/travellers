"use client";

import { useState, useEffect, useCallback } from "react";
import { Compass, UserPlus, Check, X, MessageSquare, MapPin, Calendar, RefreshCw, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Match {
  id: string;
  userId: string;
  destination: string;
  departureDate: string;
  ticketUrl: string;
  status: string;
  user: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    location: string | null;
  };
}

interface Connection {
  requestId: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  connectedAt: string;
}

interface Request {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  sender?: {
    id: string;
    name: string;
    image: string | null;
  };
  receiver?: {
    id: string;
    name: string;
    image: string | null;
  };
}

export default function DashboardMatches({
  destination,
  departureDate,
}: {
  destination: string;
  departureDate: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<Request[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<Request[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMatchesAndConnections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch matches
      const dateStr = new Date(departureDate).toISOString().split("T")[0];
      const matchRes = await fetch(`/api/matches?destination=${encodeURIComponent(destination)}&date=${dateStr}`);
      const matchData = await matchRes.json();

      if (!matchRes.ok) throw new Error(matchData.error || "Failed to load matches");

      // Fetch connections
      const connRes = await fetch("/api/connections");
      const connData = await connRes.json();

      if (!connRes.ok) throw new Error(connData.error || "Failed to load connections");

      setMatches(matchData.matches || []);
      setConnections(connData.connections || []);
      setIncomingRequests(connData.incoming || []);
      setOutgoingRequests(connData.outgoing || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching matches.");
    } finally {
      setLoading(false);
    }
  }, [departureDate, destination]);

  useEffect(() => {
    if (isOpen) {
      fetchMatchesAndConnections();
    }
  }, [isOpen, fetchMatchesAndConnections]);

  const handleConnect = async (targetUserId: string) => {
    setActionLoading(targetUserId);
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", userId: targetUserId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send request");

      // Refresh data
      await fetchMatchesAndConnections();
    } catch (err: any) {
      alert(err.message || "Failed to send request.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAccept = async (targetUserId: string) => {
    setActionLoading(targetUserId);
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept", userId: targetUserId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to accept connection");

      // Refresh data
      await fetchMatchesAndConnections();
    } catch (err: any) {
      alert(err.message || "Failed to accept request.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (targetUserId: string) => {
    setActionLoading(targetUserId);
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "decline", userId: targetUserId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to decline connection");

      // Refresh data
      await fetchMatchesAndConnections();
    } catch (err: any) {
      alert(err.message || "Failed to decline request.");
    } finally {
      setActionLoading(null);
    }
  };

  // Helper to determine the connection state of a matched traveler
  const getConnectionState = (targetUserId: string) => {
    const isAccepted = connections.some((c) => c.user.id === targetUserId);
    if (isAccepted) return "ACCEPTED";

    const isIncoming = incomingRequests.some((r) => r.senderId === targetUserId);
    if (isIncoming) return "INCOMING";

    const isOutgoing = outgoingRequests.some((r) => r.receiverId === targetUserId);
    if (isOutgoing) return "OUTGOING";

    return "NONE";
  };

  return (
    <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
      >
        <Compass size={16} className={loading ? "animate-spin text-blue-500" : "text-blue-500"} />
        {isOpen ? "Hide Matches" : "Find Matches"}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 p-4 transition-all duration-300">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-blue-500 mr-2" size={20} />
              <span className="text-sm text-slate-500">Searching matching verified itineraries...</span>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={fetchMatchesAndConnections}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-500 hover:underline"
              >
                <RefreshCw size={12} /> Try Again
              </button>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No matching verified travelers found within 3 days of your trip.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                We will update you when a traveler uploads a matching ticket.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {matches.map((match) => {
                const connState = getConnectionState(match.userId);
                const isUserActionLoading = actionLoading === match.userId;

                return (
                  <div
                    key={match.id}
                    className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#0F1129] border border-slate-150 dark:border-slate-800 p-4 shadow-sm transition hover:shadow-md hover:translate-y-[-2px] duration-200"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        {match.user.image ? (
                          <Image
                            src={match.user.image}
                            alt={match.user.name}
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full object-cover border-2 border-blue-500/20"
                            unoptimized
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                            {match.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate dark:text-white">{match.user.name}</h4>
                          {match.user.location && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={12} /> {match.user.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {match.user.bio && (
                        <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic bg-slate-50/80 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-100/50 dark:border-slate-800/40">
                          &quot;{match.user.bio}&quot;
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
                          <Compass size={12} /> {match.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {new Date(match.departureDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/60 flex justify-end">
                      {isUserActionLoading ? (
                        <button
                          disabled
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-400 dark:bg-slate-800"
                        >
                          <Loader2 size={13} className="animate-spin" /> Processing...
                        </button>
                      ) : connState === "NONE" ? (
                        <button
                          onClick={() => handleConnect(match.userId)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition"
                        >
                          <UserPlus size={13} /> Connect
                        </button>
                      ) : connState === "OUTGOING" ? (
                        <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30">
                          Request Sent
                        </span>
                      ) : connState === "INCOMING" ? (
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleDecline(match.userId)}
                            className="inline-flex items-center justify-center p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-red-500 transition dark:border-slate-800 dark:hover:bg-slate-850"
                            title="Decline"
                          >
                            <X size={14} />
                          </button>
                          <button
                            onClick={() => handleAccept(match.userId)}
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
                          >
                            <Check size={13} /> Accept
                          </button>
                        </div>
                      ) : (
                        <Link
                          href="/dashboard/messages"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-sm transition"
                        >
                          <MessageSquare size={13} /> Message
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
