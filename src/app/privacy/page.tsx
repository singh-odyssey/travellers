export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>

      <div className="mt-10 space-y-6">
        {[
          {
            t: "Information we collect",
            d: "Account details, uploaded tickets for verification, and basic usage data needed to run the service.",
          },
          {
            t: "How we use data",
            d: "To verify trips, enable matching, improve safety, and operate core features.",
          },
          {
            t: "No data selling",
            d: "We do not sell personal data and we do not run third-party ad networks.",
          },
          {
            t: "User control",
            d: "You can delete your account and associated data from settings at any time.",
          },
          {
            t: "Security",
            d: "We use reasonable safeguards to protect stored information.",
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
