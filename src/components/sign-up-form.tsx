"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);

  async function onSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;

    setEmail(emailValue);
    setPassword(passwordValue);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setSuccess(data.message || "OTP sent! Check your email.");
      setStep("verify");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyOTP(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      setSuccess("Email verified! Signing you in...");

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInRes?.ok) {
        setError("Verification successful, but sign-in failed.");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
        return;
      }

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    setResending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to resend OTP");
        return;
      }

      setSuccess(data.message || "New OTP sent!");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  }

  const passwordRules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One number", valid: /\d/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One special character", valid: /[!@#$%^&*(){}]/.test(password) },
  ];

  const passwordValid = passwordRules.every((r) => r.valid);

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
          <div className="w-full max-w-[560px] sm:px-4 lg:px-12">
            <div className="mb-6 sm:mb-8 text-center">
              <div className="text-white font-semibold text-xl sm:text-2xl">
                ✈️ travellersmeet
              </div>

              <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-bold text-white">
                {step === "signup" ? "Create your account" : "Verify your email"}
              </h1>

              <p className="mt-2 text-white/70 text-sm break-words">
                {step === "signup"
                  ? "Join travellers exploring the world together."
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-2xl">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
                  {success}
                </div>
              )}

              {step === "signup" ? (
                <form onSubmit={onSignup} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block mb-2.5 text-sm font-medium text-white/80">
                      Name
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="h-12 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-base text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2.5 text-sm font-medium text-white/80">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-base text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2.5 text-sm font-medium text-white/80">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full rounded-xl bg-white/5 border border-white/15 px-4 pr-12 text-base text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                    </div>
                  </div>

                  {password.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                      {passwordRules.map((rule) => (
                        <li
                          key={rule.label}
                          className={`flex items-center gap-2 text-xs transition-colors ${
                            rule.valid ? "text-green-400" : "text-white/40"
                          }`}
                        >
                          {rule.valid ? (
                            <FaCheck size={10} />
                          ) : (
                            <FaTimes size={10} />
                          )}
                          {rule.label}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    disabled={loading || !passwordValid}
                    className="mt-6 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition"
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                </form>
              ) : (
                <form onSubmit={onVerifyOTP} className="space-y-5">
                  <div>
                    <label className="block mb-2.5 text-sm font-medium text-white/80">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      required
                      maxLength={6}
                      placeholder="••••••"
                      className="h-14 w-full rounded-xl bg-white/5 border border-white/15 px-2 sm:px-4 text-white placeholder:text-white/20 outline-none focus:border-blue-400 transition text-center text-xl sm:text-2xl tracking-[0.4em] sm:tracking-[0.5em]"
                    />
                  </div>

                  <button
                    disabled={loading || otp.length !== 6}
                    className="mt-2 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition"
                  >
                    {loading ? "Verifying..." : "Verify & Create account"}
                  </button>

                  <div className="flex items-center justify-between pt-1 text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("signup")}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={resendOTP}
                      disabled={resending}
                      className="text-blue-300 hover:text-blue-200 disabled:opacity-50 transition-colors"
                    >
                      {resending ? "Sending..." : "Resend code"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {step === "signup" && (
              <p className="mt-6 sm:mt-8 text-center text-sm text-white/70">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-white hover:underline"
                >
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}