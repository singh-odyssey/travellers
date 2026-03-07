import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  MessageSquare,
  UserPlus,
  Quote
} from "lucide-react";

import VerifiedTicket from "@/components/illustrations/VerifiedTicket";
import SmartMatching from "@/components/illustrations/SmartMatching";
import PrivateMessaging from "@/components/illustrations/PrivateMessaging";

export default function HomePage() {
  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-30"
          style={{ backgroundImage: "url('/worldMap.png')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent dark:from-slate-950/90 dark:via-slate-950/80 dark:to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
          <div className="grid items-center gap-16 md:grid-cols-2">

            <div className="text-slate-900 dark:text-white">

              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/10 px-4 py-1 text-sm text-slate-600 dark:text-gray-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Now verifying tickets for fall trips
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                Meet verified travellers. <br />
                Make real connections.
              </h1>

              <p className="mt-6 text-lg text-slate-600 dark:text-gray-300 max-w-xl">
                travellersmeet helps solo travellers find others headed to the
                same city and dates — verified with a real ticket.
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
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/40 px-6 py-3 font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition"
                >
                  See how it works
                </Link>
              </div>

            </div>

            <div className="relative flex justify-center md:justify-end overflow-visible">
              <div className="absolute -right-40 top-1/2 -translate-y-1/2">
                <Image
                  src="/newhero.png"
                  alt="Travellers connecting"
                  width={2000}
                  height={1500}
                  priority
                  className="w-[1000px] md:w-[1400px] max-w-none drop-shadow-2xl"
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
      <section className="mx-auto max-w-7xl px-6 mt-28">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything you need
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
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
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 mt-28">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Process
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
              <div className="p-8">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            What people say
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
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
            <div key={t.name} className="relative rounded-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-8 shadow-sm">
              <Quote className="absolute top-6 right-8 h-8 w-8 text-slate-100 dark:text-slate-800" />
              <blockquote className="italic text-slate-800 dark:text-slate-200">
                “{t.quote}”
              </blockquote>
              <p className="mt-4 font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

{/* ================= FAQ ================= */}
<section
  id="faq"
  className="mx-auto max-w-4xl px-6 mt-28 mb-28 scroll-mt-20"
>
  <div className="text-center">
    <h2 className="text-3xl font-semibold tracking-tight">
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
        a: "After verification, you’ll see travellers going to the same city on overlapping dates. You can send a connection request to start chatting.",
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
        className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
      >
        <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-slate-900 dark:text-white">
          {faq.q}
          <span className="ml-4 transition-transform group-open:rotate-180">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          {faq.a}
        </p>
      </details>
    ))}
  </div>
</section>

</main>
  );
}