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

  const passwordRules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    special: /[!@#$%^&*(){}]/.test(password),
  };

  const passwordValid = Object.values(passwordRules).every(Boolean);


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
                  <button className="flex items-center justify-center gap-3 w-full h-[46px] rounded-7 bg-white text-gray-800 font-semibold">
                    <GoogleIcon />
                    Continue with Google
                  </button>

                  {/* APPLE */}
                  <button className="flex items-center justify-center gap-3 w-full h-[46px] rounded-7 bg-white text-gray-800 font-semibold">
                    <FaApple size={18} />
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
                      className="mt-1 h-[46px] w-full rounded-7 bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/80">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-1 h-[46px] w-full rounded-7 bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400"
                    />
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
                      placeholder="••••••••"
                      className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 pr-10 text-white outline-none focus:border-blue-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-white/60 mt-[5px]"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>

                  <div className="mt-3 text-xs space-y-1">
                    <p className="text-white/70">Password must contain:</p>

                    <PasswordRule valid={passwordRules.length} text="At least 8 characters" />
                    <PasswordRule valid={passwordRules.number} text="At least 1 number (0–9)" />
                    <PasswordRule valid={passwordRules.lower} text="At least 1 lowercase letter (a–z)" />
                    <PasswordRule valid={passwordRules.upper} text="At least 1 uppercase letter (A–Z)" />
                    <PasswordRule valid={passwordRules.special} text="At least 1 special symbol (!@#$%^&*)" />
                  </div>


                  <button
                    disabled={loading}
                    className="mt-5 w-full h-[46px] rounded-7 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold transition"
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
                      className="mt-1 h-[46px] w-full rounded-7 bg-transparent border border-white/20 px-4 text-white text-center text-2xl tracking-widest outline-none focus:border-blue-400"
                    />
                  </div>

                  <button
                    disabled={loading || !passwordValid}
                    className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold transition"
                  >
                    {loading ? "Creating..." : "Create account"}
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
      <g>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      </g>
    </svg>
  );
}

function PasswordRule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div
      className={`flex items-center gap-2 transition ${valid ? "text-emerald-400" : "text-red-400"
        }`}
    >
      <span>{valid ? "✅" : "❌"}</span>
      <span>{text}</span>
    </div>
  );
}

