"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
        setError(res?.error === "CredentialsSignin"
          ? "Invalid email or password"
          : res?.error || "Failed to sign in");
        setLoading(false);
        return;
      }

      // success — full reload so the server-rendered layout picks up the new session
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 transition duration-150 dark:border-slate-800 dark:bg-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••"
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 transition duration-150 dark:border-slate-800 dark:bg-slate-900"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition duration-150 hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-slate-900"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        No account yet?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
