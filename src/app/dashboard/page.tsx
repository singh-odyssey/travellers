"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";

type Ticket = {
  id: string;
  destination: string;
  departureDate: string;
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetch('/api/tickets')
        .then(res => res.json())
        .then(data => {
          setTickets(data.tickets || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <LoadingSpinner />
      </main>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">You need to sign in to access your dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Access your dashboard to upload a ticket and find matches.</p>
        <Link className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 font-medium text-white" href="/signin">Sign in</Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your trips</h1>
        <Link className="rounded-lg border border-slate-300 dark:text-white dark:border-transparent dark:bg-slate-800 transition duration-150 px-4 py-2" href="/upload">Upload ticket</Link>
      </div>

      <div className="mt-8 grid gap-4">
        {tickets.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">No trips yet. Upload a ticket to get verified and see matches.</p>
        ) : (
          tickets.map((t: Ticket) => (
            <div key={t.id} className="rounded-lg shadow-sm dark:border-slate-800 dark:bg-slate-900 transition duration-150 border bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t.destination}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Departure: {new Date(t.departureDate).toDateString()}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-sm dark:border-slate-600">{t.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
