"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    <div className="relative w-full max-w-[1800px] mx-auto rounded-[32px] overflow-hidden bg-[#0a1929] grid grid-cols-1 xl:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="relative w-full h-64 xl:h-auto xl:min-h-full overflow-hidden">
        <Image
          src="/travel.jpg"
          alt="Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">

          <div className="mb-8 text-center">
  <h1 className="text-2xl font-semibold text-white">
    ✈️ travellersmeet
  </h1>

  <p className="mt-2 text-sm text-white/60">
    Create your account to start exploring.
  </p>
</div>

<div className="rounded-3xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-8 min-h-[520px] flex flex-col">
            {step === "signup" ? (
              <>
                {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">{error}</div>}
                {success && <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">{success}</div>}
                <div className="space-y-3 mb-6">
  <button
    type="button"
    onClick={() =>
      signIn("google", {
        callbackUrl: "/dashboard",
      })
    }
    className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold hover:bg-gray-100 transition"
  >
    <GoogleIcon />
    Continue with Google
  </button>
</div>

<div className="relative mb-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-white/10" />
  </div>
  <div className="relative flex justify-center">
    <span className="bg-[#122b45]/70 px-3 text-sm text-white/60">
      OR
    </span>
  </div>
</div>
                <form onSubmit={onSignup} className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80">Name</label>
                    <input name="name" required className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400 transition" />
                  </div>

                  <div>
                    <label className="text-sm text-white/80">Email</label>
                    <input name="email" type="email" required className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400 transition" />
                  </div>

                  <div className="relative">
                    <label className="text-sm text-white/80">Password</label>
    <div className="relative w-full max-w-[1600px] mx-auto my-2 px-6 lg:px-8">
      <div className="rounded-[32px] overflow-hidden bg-[#0a1929] grid grid-cols-1 xl:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative w-full h-64 xl:h-auto xl:min-h-full overflow-hidden">
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
        <div className="flex items-center justify-center xl:pl-12 xl:pr-8 py-12">
          <div className="w-full max-w-[560px] px-8 lg:px-12">
            <div className="mb-8 text-center">
              <div className="text-white font-semibold text-2xl">
                ✈️ travellersmeet
              </div>

              <h1 className="mt-5 text-3xl font-bold text-white">
                {step === "signup" ? "Create your account" : "Verify your email"}
              </h1>

              <p className="mt-2 text-white/70 text-sm">
                {step === "signup"
                  ? "Join travellers exploring the world together."
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </div>

            <div className="mx-8 rounded-xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-10 shadow-2xl">
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
                <form onSubmit={onSignup} className="space-y-5">
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
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 pr-10 text-white outline-none focus:border-blue-400 transition"
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
                    className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99] disabled:bg-blue-500/50 text-white font-bold transition-all duration-200"
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
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      required
                      maxLength={6}
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400 transition"
                      placeholder="••••••"
                      className="h-14 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-white placeholder:text-white/20 outline-none focus:border-blue-400 transition text-center text-2xl tracking-[0.5em]"
                    />
                  </div>

                  <div className="flex justify-end">
  <button
    type="button"
    onClick={resendOTP}
    disabled={loading}
    className="text-sm text-blue-400 hover:text-blue-300 hover:underline disabled:opacity-50"
  >
    Resend OTP
  </button>
</div>

                  <button
                    disabled={loading || otp.length !== 6}
                    className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99] disabled:bg-blue-500/50 text-white font-bold transition-all duration-200"                  >
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
              <p className="mt-8 text-center text-sm text-white/70">
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
           <p className="mt-5 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-white hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <g>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      </g>
    </svg>
  );
}
