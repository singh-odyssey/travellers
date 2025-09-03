import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Meet verified travellers. Make real connections.</h1>
          <p className="mt-4 text-lg text-slate-600">Upload your ticket, get verified, and see others going to the same destination and dates.</p>
          <div className="mt-8 flex gap-4">
            <Link href="/signup" className="rounded-lg bg-slate-900 text-white px-5 py-3 font-medium hover:bg-slate-800">Get started</Link>
            <Link href="#how-it-works" className="rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-50">How it works</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-slate-200">
          <Image src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop" alt="Travellers" fill className="object-cover" />
        </div>
      </section>

      <section id="how-it-works" className="mt-24 grid gap-6 md:grid-cols-3">
        {[
          { title: "Create account", desc: "Sign up with email and password." },
          { title: "Upload ticket", desc: "Submit your destination ticket for verification." },
          { title: "Find matches", desc: "See verified travellers going to the same place and dates." },
        ].map((s) => (
          <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="mt-1 text-slate-600">{s.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
