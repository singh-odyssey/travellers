import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Our social media channels are on the way.",
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Coming Soon
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          We&apos;re still setting up our social media presence — check back soon to follow travellersmeet.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
