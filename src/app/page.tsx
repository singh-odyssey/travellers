<ShieldCheck className="h-5 w-5 text-[#0B4B74] shrink-0" />
<p>Ticket-verified profiles</p>
</div>

<div className="flex items-center gap-3">
  <Lock className="h-5 w-5 text-[#0B4B74] shrink-0" />
  <p>Zero ads. No selling your data</p>
</div>

<div className="flex items-center gap-3">
  <MessageSquare className="h-5 w-5 text-[#C67A3D] shrink-0" />
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
                className="overflow-hidden rounded-xl border border-[#E7D5BF] bg-white shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
              >
<div className="h-[180px] sm:h-[220px] border-b border-[#E7D5BF] bg-[#F9F6F0] flex items-center justify-center dark:border-slate-800 dark:bg-slate-800/30">
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
              className="inline-flex items-center justify-center rounded-lg bg-[#0B4B74] px-6 py-3 font-medium text-white hover:bg-[#083B5B] transition cursor-pointer"
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
className="relative rounded-2xl border border-[#E7D5BF] dark:border-slate-800 dark:bg-slate-900 bg-white p-6 sm:p-8 shadow-sm"
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
className="group rounded-xl border border-[#E7D5BF] bg-white p-4 sm:p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
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
<div className="h-32 bg-gradient-to-b from-[#FFFCF8] to-[#F9F6F0] dark:from-slate-950 dark:to-[#06132a]" />
    </>
  );
}