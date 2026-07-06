"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to process request");
        return;
      }

      setSuccess(data.message || "Reset link has been sent to your email!");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-[1600px] mx-auto my-0 sm:my-2 px-0 sm:px-6 lg:px-8">
      <div className="rounded-none sm:rounded-[32px] overflow-hidden bg-[#0a1929] grid grid-cols-1 xl:grid-cols-2 min-h-screen sm:min-h-0">
        {/* LEFT IMAGE */}
        <div className="relative w-full h-40 sm:h-56 xl:h-auto xl:min-h-full overflow-hidden">
          <Image
            src="/travel.jpg"
            alt="Travel"
            fill
            className="object-cover animate-kenburns"
            priority
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-4 sm:px-6 xl:pl-12 xl:pr-8 py-8 sm:py-12">
          <div className="w-full max-w-[560px] sm:px-4 lg:px-8">
            <div className="mb-6 sm:mb-8 text-center">
              <div className="text-white font-semibold text-xl sm:text-2xl">
                ✈️ travellersmeet
              </div>

              <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-bold text-white">
                Forgot Password
              </h1>

              <p className="mt-2 text-white/70 text-sm">
                Enter your email address and we will send you a reset link.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between">
              {success ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Check your inbox</h3>
                  <p className="text-white/70 text-sm mb-6">{success}</p>
                  <Link
                    href="/signin"
                    className="inline-block px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition"
                  >
                    Back to Sign In
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white/80">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1 h-11 sm:h-10 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-base sm:text-sm text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                    />
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition disabled:opacity-60"
                  >
                    {loading ? "Sending link..." : "Send reset link"}
                  </button>

                  <div className="text-center mt-4">
                    <Link
                      href="/signin"
                      className="text-sm text-blue-300 hover:text-blue-200"
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
