"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail } from "lucide-react";


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
        setLoading(false);
        return;
      }

      setSuccess(data.message || "OTP sent! Check your email.");
      setStep("verify");
    } catch (err) {
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
        setLoading(false);
        return;
      }

      setSuccess("Email verified! Signing you in...");
      
      // Automatically sign in the user
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInRes?.ok) {
        setError("Verification successful, but sign-in failed. Please sign in manually.");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
        return;
      }

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError("Network error. Please try again.");
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
        setLoading(false);
        return;
      }

      setSuccess(data.message || "New OTP sent!");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
    relative
    w-full
    max-w-[1800px]
    mx-auto
    rounded-[32px]
    overflow-hidden
    bg-[#0a1929]
    grid
    grid-cols-1
    xl:grid-cols-2
  "
    >





      





      {/* LEFT IMAGE */}
      {/* Mobile: h-64 (banner), Desktop: h-full (side panel) */}
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
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">

          {/* NEW LOGO POSITION */}
          <div className="mb-8 text-center text-white font-semibold text-2xl">
            ✈️ travellersmeet
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-8">

            {step === "signup" ? (
              <>
                {/* Social Buttons */}
                <div className="space-y-3 mb-6">

                  {/* GOOGLE */}
                  <button className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold">
                    <GoogleIcon />
                    Continue with Google
                  </button>

                  {/* APPLE */}
                  <button className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold">
                    <AppleIcon />
                    Continue with Apple
                  </button>

                </div>

                {/* Errors/Success */}
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

                {/* Form */}
                <form onSubmit={onSignup} className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80">Name</label>
                    <input
                      name="name"
                      required
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/80">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm text-white/80">Password</label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 pr-10 text-white outline-none focus:border-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-white/60 mt-[5px]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <button
                    disabled={loading}
                    className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold transition"
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* OTP Verification Step */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Verify Your Email
                  </h2>
                  <p className="text-white/70 text-sm">
                    We sent a 6-digit code to<br />
                    <span className="font-semibold text-white">{email}</span>
                  </p>
                </div>

                {/* Errors/Success */}
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

                <form onSubmit={onVerifyOTP} className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                      placeholder="000000"
                      maxLength={6}
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white text-center text-2xl tracking-widest outline-none focus:border-blue-400"
                    />
                  </div>

                  <button
                    disabled={loading || otp.length !== 6}
                    className="w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold transition"
                  >
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={resendOTP}
                    disabled={loading}
                    className="text-sm text-white/70 hover:text-white disabled:text-white/40"
                  >
                     Didn&#39;t receive the code? <span className="font-semibold underline">Resend</span>
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setStep("signup")}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    ← Back to signup
                  </button>
                </div>
              </>
            )}

          </div>

          {step === "signup" && (
            <p className="mt-5 text-center text-sm text-white/70">
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-white hover:underline">
                Sign in
              </Link>
            </p>
          )}

        </div>
      </div>

    </div>
  );
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.2 0 6 1.1 8.3 3.2l6.2-6.2C34.4 2.6 29.6 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.4 5.8C12.2 13 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.7-.1-3-.4-4.4H24v8.4h12.6c-.6 3.2-2.4 5.9-5.1 7.7l7.8 6.1c4.6-4.2 7.3-10.4 7.3-17.8z" />
      <path fill="#FBBC05" d="M10.1 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.4-5.8C.9 17.3 0 20.6 0 24s.9 6.7 2.7 9.7l7.4-5.8z" />
      <path fill="#34A853" d="M24 48c5.6 0 10.4-1.9 13.9-5.2l-7.8-6.1c-2.1 1.4-4.8 2.2-8.1 2.2-6.4 0-11.8-3.5-14.5-8.6l-7.4 5.8C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.365 1.43c0 1.14-.467 2.257-1.293 3.04-.86.815-2.265 1.445-3.474 1.345-.146-1.117.37-2.29 1.156-3.14.826-.897 2.288-1.516 3.611-1.245z" />
      <path d="M20.36 17.73c-.455 1.013-.675 1.465-1.26 2.37-.82 1.24-1.98 2.79-3.41 2.8-1.27.01-1.6-.83-3.32-.83-1.72 0-2.1.81-3.34.85-1.43.05-2.53-1.41-3.35-2.65-2.29-3.5-2.53-7.6-1.12-9.76.99-1.53 2.56-2.43 4.01-2.43 1.53 0 2.49.84 3.76.84 1.23 0 1.98-.84 3.75-.84 1.3 0 2.67.71 3.66 1.94-3.21 1.76-2.69 6.34.64 7.54z" />
    </svg>
  );
}
