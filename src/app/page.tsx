import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  MessageSquare,
  UserPlus,
  Upload,
  Search,
  CheckCircle2,
  Users,
  Quote,
  HelpCircle,
  Mail, 
  Send
} from "lucide-react";
import TravelHero from "@/components/illustrations/TravelHero";
import VerifiedTicket from "@/components/illustrations/VerifiedTicket";
import SmartMatching from "@/components/illustrations/SmartMatching";
import PrivateMessaging from "@/components/illustrations/PrivateMessaging";
import AccountIllustration from "@/components/illustrations/AccountIllustration";
import UploadIllustration from "@/components/illustrations/UploadIllustration";
import MatchesIllustration from "@/components/illustrations/MatchesIllustration";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 transition duration-150 dark:bg-slate-800 dark:border-slate-800 dark:text-gray-400 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Now verifying tickets for fall trips
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Meet verified travellers. Make real connections.
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-600 dark:text-slate-400">
              travellersmeet helps solo travellers find others headed to the same city and dates — verified with a real ticket, not just vibes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center transition duration-150 justify-center rounded-lg bg-slate-900 px-5 py-3 font-medium text-white shadow hover:bg-slate-800">
                Get started free <UserPlus className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#how-it-works" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-50">
                See how it works
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-500">No spam. Private by default. Cancel anytime.</p>
          </div>
          <div className="flex justify-center w-full overflow-hidden">
            <Image
              src="/hero.png"
              alt="Travellers connecting at an airport"
              width={1200}
              height={800}
              className="max-w-full h-auto"
              priority
            />
          </div>

        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="dark:bg-slate-900 transition duration-150 dark:text-slate-300 dark:border-slate-800 grid items-center gap-6 rounded-xl border border-slate-200 bg-white px-8 py-6 text-sm text-slate-600 shadow-sm sm:grid-cols-3">
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

      {/* Features */}
      <section id="features" className="mx-auto mt-24 max-w-6xl px-6 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Everything you need to find your crew</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Built for safety and ease. Upload a ticket once and we do the rest.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
            <div key={f.title} className="overflow-hidden transition duration-150 rounded-xl border dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 text-black border-slate-200 bg-white shadow-sm hover:shadow-md group">
              <div className="h-[220px] border-b dark:border-slate-800 border-slate-50 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-center">

                {f.illustration}
              </div>
              <div className="p-8">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 dark:text-slate-400 text-slate-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto mt-24 max-w-6xl px-6 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Process</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Create account", desc: "Sign up with email and password.", illustration: <AccountIllustration /> },
            { title: "Upload ticket", desc: "Submit your ticket for a quick verification.", illustration: <UploadIllustration /> },
            { title: "Find matches", desc: "See people in your destination window and say hello.", illustration: <MatchesIllustration /> },
          ].map((s, i) => (
            <div key={s.title} className="rounded-xl border transition duration-150 dark:border-slate-800 dark:bg-slate-900 border-slate-200 bg-white p-6 shadow-sm hover:shadow-md group">
              <div className="inline-flex h-16 w-16 mb-2 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800/50 text-white shadow-inner group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                {s.illustration}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/signup" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:opacity-90 transition duration-150 dark:bg-white dark:text-slate-900">Create your account</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto mt-24 max-w-6xl px-6 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What people say about us</h2>
        </div>

        <div className="mt-10">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Met two other solo travellers for a Louvre day and dinner—felt safe and easy.",
                name: "Ana, 27",
                trip: "Paris in May",
                color: "bg-emerald-100 text-emerald-700"
              },
              {
                quote: "Loved the verification. Real people going when I was.",
                name: "Dev, 31",
                trip: "Tokyo in March",
                color: "bg-blue-100 text-blue-700"
              },
              {
                quote: "Ended up sharing rides to hikes with folks on the same dates.",
                name: "Sara, 24",
                trip: "Reykjavík in July",
                color: "bg-purple-100 text-purple-700"
              },
            ].map((t) => (
              <div key={t.name} className="relative rounded-2xl transition duration-150 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-8 shadow-sm hover:shadow-md">
                <Quote className="absolute top-6 right-8 h-8 w-8 text-slate-100 dark:text-slate-800" />
                <blockquote className="relative text-slate-800 dark:text-slate-200 leading-relaxed italic">“{t.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${t.color}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <figcaption className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</figcaption>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-24 max-w-6xl px-6 pb-24 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              q: "How do you verify tickets?",
              a: "Upload a PDF or image. We check dates, destination, and name; sensitive details can be blurred before or during review.",
            },
            { q: "Is my data sold?", a: "No. We don't run ads or sell personal data. You control what others see." },
            {
              q: "Can I delete my account?",
              a: "Yes, you can delete your account and data from settings at any time.",
            },
            {
              q: "Is it free?",
              a: "Getting started and basic matching are free while we're in beta.",
            },
          ].map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-200 transition duration-150 dark:border-slate-800 dark:bg-slate-900 bg-white p-6 shadow-sm flex gap-4">
              <HelpCircle className="h-6 w-6 text-slate-400 shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-200">{f.q}</p>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/upload" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-50">Already booked? Upload your ticket</Link>
        </div>
      </section>
      {/* Contact */}
<section id="contact" className="mx-auto mt-24 max-w-6xl px-6 scroll-mt-20">
  <div className="text-center">
    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
      Contact us
    </h2>
    <p className="mt-2 text-slate-600 dark:text-slate-400">
      Questions, safety concerns, or partnership ideas — we’d love to hear from you.
    </p>
  </div>

  <div className="mt-10 grid gap-8 md:grid-cols-2">

    {/* Info Card */}
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 bg-white p-8 shadow-sm">
      <Mail className="h-8 w-8 text-slate-500" />
      <h3 className="mt-4 font-semibold">Email support</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        support@travellersmeet.com
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Typical reply within 24–48 hours.
      </p>
    </div>

    {/* Form Card */}
    <form className="rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 bg-white p-8 shadow-sm space-y-4">
      <input
        placeholder="Your email"
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm"
      />
      <input
        placeholder="Subject"
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm"
      />
      <textarea
        rows={4}
        placeholder="Message"
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm"
      />

      <button className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800">
        Send message <Send className="ml-2 h-4 w-4" />
      </button>
    </form>

  </div>
</section>

    </main>
  );
}
