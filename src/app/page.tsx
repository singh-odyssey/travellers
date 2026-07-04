import {
  Lock,
  MessageSquare,
  Quote,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import TicketVerificationBanner from "@/components/ticket-verification-banner";
import VerifiedTicket from "@/components/illustrations/VerifiedTicket";
import SmartMatching from "@/components/illustrations/SmartMatching";
import PrivateMessaging from "@/components/illustrations/PrivateMessaging";
import SmartMatching from "@/components/illustrations/SmartMatching";
import VerifiedTicket from "@/components/illustrations/VerifiedTicket";

export default function HomePage() {
  return (
    <>
      <main>
        {/* ================= HERO ================= */}

        <section className="relative w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-30"
            style={{ backgroundImage: "url('/worldMap.png')" }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent dark:from-slate-950/90 dark:via-slate-950/80 dark:to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-5 py-14 md:px-6 md:py-28">
            <div className="grid items-center gap-10 md:gap-16 md:grid-cols-2">
              <div className="text-slate-900 dark:text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/10 px-4 py-1 text-xs sm:text-sm text-slate-600 dark:text-gray-200 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  Now verifying tickets for fall trips
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div className="relative z-10 text-slate-900 dark:text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/10 px-4 py-1 text-sm text-slate-600 dark:text-gray-200 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <TicketVerificationBanner />
                </div>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight text-center md:text-left md:text-6xl">
                  Meet verified travellers. <br />
                  Make real connections.
                </h1>

                <p className="mt-6 text-base sm:text-lg text-center md:text-left text-slate-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
                  travellersmeet helps solo travellers find others headed to the
                  same city and dates — verified with a real ticket.
                </p>

                <div className="mt-8 md:mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white shadow hover:bg-emerald-600 transition cursor-pointer"
                  >
                    Get started free <UserPlus className="ml-2 h-4 w-4" />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/40 px-6 py-3 font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
                  >
                    See how it works
                  </a>
                </div>
              </div>

              {/* Image: contained on mobile; large offset/absolute treatment kicks in from md: up */}
<div className="relative flex justify-center md:justify-end">
  <div className="relative md:absolute md:-right-40 md:top-1/2 md:-translate-y-1/2">
              <div className="relative flex justify-center md:justify-end overflow-visible">
  <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2">
    <Image
      src="/newhero.png"
      alt="Travellers connecting"
      width={2000}
      height={1500}
      priority
      className="
        w-full
        max-w-[780px]
        scale-150
        origin-center
        -translate-x-28
        md:scale-100
        md:w-[1400px]
        md:max-w-none
        drop-shadow-2xl
      "
      className="w-[1000px] md:w-[1400px] max-w-none drop-shadow-2xl"
    />
  </div>
</div>
            </div>
          </div>
        </section>

        {/* ================= TRUST STRIP ================= */}
        <section className="mx-auto max-w-7xl px-6 mt-6 md:-mt-16 relative z-20">
          <div className="grid items-center gap-6 rounded-xl border border-slate-200 bg-white px-6 py-6 md:px-8 text-sm text-slate-600 shadow-xl grid-cols-1 sm:grid-cols-3 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
              <p>Ticket-verified profiles</p>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-blue-500 shrink-0" />
              <p>Zero ads. No selling your data</p>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-purple-500 shrink-0" />
              <p>Report + block controls</p>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="mx-auto max-w-7xl px-4 mt-10 lg:mt-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Everything you need
            </h2>
          </div>

          <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3">
            {[
              {
                title: "Verified by ticket",
                desc: "Upload once and get verified.",
                illustration: <VerifiedTicket />,
              },
              {
                title: "Smart matching",
                desc: "We surface people overlapping your city and dates.",
                illustration: <SmartMatching />,
              },
              {
                title: "Private messaging",
                desc: "Chat only after both sides opt in.",
                illustration: <PrivateMessaging />,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-[180px] sm:h-[220px] border-b border-slate-100 bg-slate-50 flex items-center justify-center dark:border-slate-800 dark:bg-slate-800/30">
                  {f.illustration}
                </div>
                <div className="p-6 sm:p-8">
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
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-6 mt-10 lg:mt-10 scroll-mt-20"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Process</h2>
          </div>

          <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
            {[
              {
                title: "Create account",
                desc: "Sign up with email and password.",
                image: "/process-create-account.png",
              },
              {
                title: "Upload ticket",
                desc: "Submit your ticket for verification.",
                image: "/process-upload-ticket.png",
              },
              {
                title: "Find matches",
                desc: "See people in your destination window.",
                image: "/process-find-matches.png",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="px-4 pt-4">
                  <div className="relative h-[130px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={400}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white hover:bg-emerald-600 transition cursor-pointer"
            >
              Create your account
            </Link>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="mx-auto max-w-7xl px-6 mt-10 lg:mt-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              What people say
            </h2>
          </div>

          <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3">
            {[
              {
                quote: "Met two other solo travellers and felt safe.",
                name: "Ana",
              },
              {
                quote: "Loved the verification. Real people going when I was.",
                name: "Dev",
              },
              {
                quote: "Shared rides with folks on same dates.",
                name: "Sara",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 bg-white p-6 sm:p-8 shadow-sm"
              >
                <Quote className="absolute top-6 right-6 sm:right-8 h-8 w-8 text-slate-100 dark:text-slate-800" />
                <blockquote className="italic text-slate-800 dark:text-slate-200 pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-4 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section
          id="faq"
          className="mx-auto max-w-4xl px-6 mt-20 lg:mt-10 mb-20 lg:mb-10 scroll-mt-20"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Everything you need to know before joining travellersmeet.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                q: "How do I create a profile?",
                a: "Simply sign up using your email and password. Once registered, you can upload your ticket to verify your trip.",
              },
              {
                q: "How do I connect with other travellers?",
                a: "After verification, you'll see travellers going to the same city on overlapping dates. You can send a connection request to start chatting.",
              },
              {
                q: "Is the platform free to use?",
                a: "Yes. travellersmeet is currently free to join and use for verified travellers.",
              },
              {
                q: "How is my data protected?",
                a: "We never sell your data. Ticket details are reviewed securely and sensitive information is not displayed publicly.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
              >
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-medium text-slate-900 dark:text-white">
                  <span>{faq.q}</span>
                  <span className="shrink-0 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 hover:bg-slate-50 transition cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Already booked? Upload your ticket
            </Link>
          </div>
        </section>
      </main>

    </>
  );
}