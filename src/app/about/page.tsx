import Link from "next/link";
import { Users, ShieldCheck, Globe2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">About travellersmeet</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          travellersmeet helps solo travellers safely connect with others going
          to the same destination and dates — verified through real tickets.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Users,
            title: "Real travellers only",
            desc: "Profiles are created around verified trips, not random browsing.",
          },
          {
            icon: ShieldCheck,
            title: "Safety first",
            desc: "Verification, reporting tools, and opt-in messaging keep you in control.",
          },
          {
            icon: Globe2,
            title: "Built for explorers",
            desc: "Designed specifically for solo and small-group travellers.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 bg-white p-8 shadow-sm hover:shadow-md transition">
            <item.icon className="h-8 w-8 text-slate-500" />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/signup" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800">
          Join travellersmeet
        </Link>
      </div>
    </main>
  );
}
