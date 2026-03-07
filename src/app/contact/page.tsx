import React from 'react';
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20 pb-10 bg-white dark:bg-[#0B1120]">
      <section id="contact" className="mx-auto mt-10 max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-white">
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
            <h3 className="mt-4 font-semibold dark:text-white">Email support</h3>
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
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm dark:text-white"
            />
            <input
              placeholder="Subject"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm dark:text-white"
            />
            <textarea
              rows={4}
              placeholder="Message"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm dark:text-white"
            />

            <button className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 transition duration-150">
              Send message <Send className="ml-2 h-4 w-4" />
            </button>
          </form>

        </div>
      </section>
    </main>
  );
}