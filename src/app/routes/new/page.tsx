import SignInForm from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Route",
  description: "Create a new travel route on travellersmeet.",
};

export default async function NewRoutePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="flex flex-col items-center py-6">
        <div className="mx-auto max-w-md text-center px-6 mb-6">
          <span className="inline-block rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-1 text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Routes
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            Sign in to create a route
          </h1>
        </div>

        <SignInForm />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Route creation is coming soon
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        We&apos;re still building the route-creation flow. Check back soon to plan your next trip.
      </p>
      <Link
        href="/routes"
        className="inline-block px-6 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
      >
        Back to Routes
      </Link>
    </main>
  );
}
