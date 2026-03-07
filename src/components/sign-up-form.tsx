"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";
import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");

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
    setLoading(true);
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
      setLoading(false);
    }
  }

  const passwordRules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    special: /[!@#$%^&*(){}]/.test(password),
  };

  const passwordValid = Object.values(passwordRules).every(Boolean);

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

          <div className="mb-8 text-center text-white font-semibold text-2xl">
            ✈️ travellersmeet
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-8">

            {step === "signup" ? (
              <>
                {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">{error}</div>}
                {success && <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">{success}</div>}

                <form onSubmit={onSignup} className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80">Name</label>
                    <input name="name" required className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white" />
                  </div>

                  <div>
                    <label className="text-sm text-white/80">Email</label>
                    <input name="email" type="email" required className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white" />
                  </div>

                  <div className="relative">
                    <label className="text-sm text-white/80">Password</label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 pr-10 text-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-white/60"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>

                  <button
                    disabled={loading || !passwordValid}
                    className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold transition"
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                </form>
              </>
            ) : (
              <>
                {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">{error}</div>}
                {success && <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">{success}</div>}

                <form onSubmit={onVerifyOTP} className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                      maxLength={6}
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white text-center text-2xl tracking-widest"
                    />
                  </div>

                  <button
                    disabled={loading || otp.length !== 6}
                    className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold transition"
                  >
                    {loading ? "Verifying..." : "Verify & Create account"}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}