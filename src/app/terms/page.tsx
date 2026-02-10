export default function TermsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Terms & Conditions</h1>

      <div className="mt-10 space-y-6">
        {[
          {
            t: "Eligibility",
            d: "You must provide accurate information and valid travel proof when required.",
          },
          {
            t: "Acceptable use",
            d: "No harassment, impersonation, fraud, or misuse of verification systems.",
          },
          {
            t: "Verification",
            d: "Ticket verification may reject incomplete or manipulated uploads.",
          },
          {
            t: "Messaging",
            d: "Chats are opt-in. Abuse reports may result in account suspension.",
          },
          {
            t: "Service availability",
            d: "Features may change as the platform evolves.",
          },
        ].map((s) => (
          <section key={s.t} className="rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold">{s.t}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{s.d}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
