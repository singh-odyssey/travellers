"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!token) {
      setError("Reset token is missing. Please check your email link again.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setSuccess("Your password has been reset successfully! Redirecting to sign in...");
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
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
                Reset Password
              </h1>

              <p className="mt-2 text-white/70 text-sm">
                Enter your new password below.
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
                  <p className="text-white/70 text-sm mb-6">{success}</p>
                </div>
              ) : !token ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Invalid Link</h3>
                  <p className="text-white/70 text-sm mb-6">
                    The password reset token is missing from the URL. Please request a new link.
                  </p>
                  <Link
                    href="/forgot-password"
                    className="inline-block px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition"
                  >
                    Request Reset Link
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-white/80">
                      New Password
                    </label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      className="mt-1 h-11 sm:h-10 w-full rounded-xl bg-white/5 border border-white/15 px-4 pr-10 text-base sm:text-sm text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 top-7 flex items-center text-white/60 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-white/80">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={8}
                      className="mt-1 h-11 sm:h-10 w-full rounded-xl bg-white/5 border border-white/15 px-4 pr-10 text-base sm:text-sm text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-3 top-7 flex items-center text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition disabled:opacity-60"
                  >
                    {loading ? "Resetting password..." : "Reset password"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="text-white text-center py-12">Loading...</div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}
