"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
                className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <button className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold">
                <AppleIcon />
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

              <div>
                <label className="text-sm text-white/80">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 h-[46px] w-full rounded-xl bg-transparent border border-white/20 px-4 text-white outline-none focus:border-blue-400"
                />
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
