import MatchSearchClient from "./match-search-client";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Suspense } from "react";

function MatchSearchFallback() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="h-10 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-8 h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
    </main>
  );
}

export default async function MatchesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Sign in to find matches</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Traveller matching is available to signed-in users with verified
          travel tickets.
        </p>
        <Link
          href="/signin"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 font-medium text-white dark:bg-white dark:text-slate-900"
        >
          Sign in
        </Link>
      </main>
    );
  }

  return (
    <Suspense fallback={<MatchSearchFallback />}>
      <MatchSearchClient />
    </Suspense>
  );
}
