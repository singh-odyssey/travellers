import Link from "next/link";
import Image from "next/image";

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
                Get started free
              </Link>
              <Link href="#how-it-works" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-50">
                See how it works
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-500">No spam. Private by default. Cancel anytime.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
              alt="Travellers connecting at an airport"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="dark:bg-slate-900 transition duration-150 dark:text-slate-300 dark:border-slate-800 grid items-center gap-6 rounded-xl border border-slate-200 bg-white px-6 py-4 text-xs text-slate-600 shadow-sm sm:grid-cols-3">
          <p>Ticket-verified profiles</p>
          <p>Zero ads. No selling your data</p>
          <p>Report + block controls</p>
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
              img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop",
            },
            {
              title: "Smart matching",
              desc: "We surface people overlapping your city and dates.",
              img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Private messaging",
              desc: "Chat only after both sides opt in. Report anytime.",
              img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
            },
          ].map((f) => (
            <div key={f.title} className="overflow-hidden transition duration-150 rounded-xl border dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 text-black  border-slate-200  bg-white shadow-sm">
              <div className="relative h-40 w-full">
                <Image src={f.img} alt="" fill className="object-cover" />
              </div>
              <div className="p-5">
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
            { title: "Create account", desc: "Sign up with email and password." },
            { title: "Upload ticket", desc: "Submit your ticket for a quick verification." },
            { title: "Find matches", desc: "See people in your destination window and say hello." },
          ].map((s, i) => (
            <div key={s.title} className="rounded-xl border transition duration-150 dark:border-slate-800 dark:bg-slate-900  border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 dark:bg-slate-600 text-sm font-semibold text-white">{i + 1}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
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

        <div className="mt-10 rounded-xl border border-slate-200 transition duration-150 dark:border-slate-900 dark:bg-slate-950 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Met two other solo travellers for a Louvre day and dinner—felt safe and easy.",
                name: "Ana, 27",
                trip: "Paris in May",
              },
              {
                quote: "Loved the verification. Real people going when I was.",
                name: "Dev, 31",
                trip: "Tokyo in March",
              },
              {
                quote: "Ended up sharing rides to hikes with folks on the same dates.",
                name: "Sara, 24",
                trip: "Reykjavík in July",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-lg transition duration-150 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-5">
                <blockquote className="text-slate-800 dark:text-slate-200">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-slate-600 dark:text-slate-400">{t.name} · {t.trip}</figcaption>
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
            <div key={f.q} className="rounded-lg border border-slate-200 transition duration-150 dark:border-slate-800 dark:bg-slate-900 bg-white p-5 shadow-sm">
              <p className="font-medium text-slate-900 dark:text-slate-200">{f.q}</p>
              <p className="mt-1 text-slate-600 dark:text-slate-400">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/upload" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-50">Already booked? Upload your ticket</Link>
        </div>
      </section>
    </main>
  );
}
