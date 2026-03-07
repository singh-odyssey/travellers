"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";
import { FaEye, FaEyeSlash, FaApple } from "react-icons/fa";


export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setError(
          res?.error === "CredentialsSignin"
            ? "Invalid email or password"
            : res?.error || "Failed to sign in"
        );
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
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

          <div className="mb-8 text-center text-white font-semibold text-2xl">
            ✈️ travellersmeet
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-8 min-h-[420px] flex flex-col justify-between">


            {/* Social Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => signIn("google", {callbackUrl: "/dashboard"})}
                className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <button 
              type="button"
              onClick={() => signIn("apple", {callbackUrl: "/dashboard"})}
              className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold">
                <FaApple size={18} />
                Continue with Apple
              </button>


            </div>

            {/* Form */}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
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
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}

                    </button>
                  </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>

          <p className="mt-5 text-center text-sm text-white/70">
            No account yet?{" "}
            <Link href="/signup" className="font-semibold text-white hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

/* ---------- Google Icon ---------- */
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
