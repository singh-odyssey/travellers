"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInForm() {
  const router = useRouter();

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

  if (!res?.ok || res.error) {
    const isCredentialsError =
      res?.error === "CredentialsSignin" ||
      res?.code === "credentials";

    setError(
      isCredentialsError
        ? "Invalid email or password"
        : "Failed to sign in. Please try again.",
    );

    return;
  }

  router.replace("/dashboard");
  router.refresh();
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
        max-w-[1600px]
        mx-auto
        my-0
        sm:my-2
        px-0
        sm:px-6
        lg:px-8
      "
    >
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
                Welcome Back
              </h1>

              <p className="mt-2 text-white/70 text-sm">
                Sign in to continue your travel journey.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between">
              {/* Social Buttons */}
              <div className="space-y-2 mb-4">
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold text-sm sm:text-base"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
                  className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold text-sm sm:text-base"
                >
                  <FaApple size={18} />
                  Continue with Apple
                </button>
              </div>

              <div className="relative my-6 sm:my-7">
                <div className="border-t border-white/10"></div>

                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#122b45] px-3 text-xs text-white/50">
                  OR
                </span>
              </div>

              {/* Form */}
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

                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-white/80">
                    Password
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
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-300 hover:text-blue-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>

            <p className="mt-6 sm:mt-8 text-center text-sm text-white/70">
              No account yet?{" "}
              <Link
                href="/signup"
                className="font-semibold text-white hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
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
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
      </g>
    </svg>
  );
}