import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  MessageSquare,
  UserPlus,
} from "lucide-react";

import VerifiedTicket from "@/components/illustrations/VerifiedTicket";
import SmartMatching from "@/components/illustrations/SmartMatching";
import PrivateMessaging from "@/components/illustrations/PrivateMessaging";
import AccountIllustration from "@/components/illustrations/AccountIllustration";
import UploadIllustration from "@/components/illustrations/UploadIllustration";
import MatchesIllustration from "@/components/illustrations/MatchesIllustration";

export default function HomePage() {
  return (
    <main>

      {/* ================= HERO (CINEMATIC VERSION) ================= */}
      <section className="relative w-full overflow-hidden">

        {/* Background world map */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/worldMap.png')" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
          <div className="grid items-center gap-16 md:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="text-white">

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm text-gray-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Now verifying tickets for fall trips
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                Meet verified travellers. <br />
                Make real connections.
              </h1>

              <p className="mt-6 text-lg text-gray-300 max-w-xl">
                travellersmeet helps solo travellers find others headed to the
                same city and dates — verified with a real ticket, not just vibes.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white shadow hover:bg-emerald-600 transition"
                >
                  Get started free <UserPlus className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 font-medium text-white hover:bg-white/10 transition"
                >
                  See how it works
                </Link>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                No spam. Private by default. Cancel anytime.
              </p>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center md:justify-end overflow-visible">

              <div className="absolute -right-40 top-1/2 -translate-y-1/2">

                <Image
                  src="/newhero.png"
                  alt="Travellers connecting"
                  width={2000}
                  height={1500}
                  priority
                  className="
        w-[1000px]
        md:w-[1400px]
        max-w-none
        drop-shadow-2xl
      "
                />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="mx-auto max-w-7xl px-6 -mt-16 relative z-20 pb-10">
        <div className="grid items-center gap-6 rounded-xl border border-slate-200 bg-white px-8 py-6 text-sm text-slate-600 shadow-xl sm:grid-cols-3 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <p>Ticket-verified profiles</p>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-blue-500" />
            <p>Zero ads. No selling your data</p>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <p>Report + block controls</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mx-auto max-w-7xl px-6 mt-28 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything you need to find your crew
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Built for safety and ease. Upload a ticket once and we do the rest.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Verified by ticket",
              desc: "Simple upload with sensitive details redacted by our team.",
              illustration: <VerifiedTicket />,
            },
            {
              title: "Smart matching",
              desc: "We surface people overlapping your city and dates.",
              illustration: <SmartMatching />,
            },
            {
              title: "Private messaging",
              desc: "Chat only after both sides opt in. Report anytime.",
              illustration: <PrivateMessaging />,
            },
          ].map((f) => (
            <div
              key={f.title}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-[220px] border-b border-slate-100 bg-slate-50 flex items-center justify-center dark:border-slate-800 dark:bg-slate-800/30">
                {f.illustration}
              </div>
              <div className="p-8">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 mt-28 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Process
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Create account",
              desc: "Sign up with email and password.",
              illustration: <AccountIllustration />,
            },
            {
              title: "Upload ticket",
              desc: "Submit your ticket for a quick verification.",
              illustration: <UploadIllustration />,
            },
            {
              title: "Find matches",
              desc: "See people in your destination window and say hello.",
              illustration: <MatchesIllustration />,
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800/50">
                {s.illustration}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 font-medium text-white hover:opacity-90 transition dark:bg-white dark:text-slate-900"
          >
            Create your account
          </Link>
        </div>
      </section>

    </main>
  );
}
