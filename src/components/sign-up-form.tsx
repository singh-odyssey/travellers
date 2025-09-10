"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: form,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Failed to sign up");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" required className="mt-1 w-full bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-800 transition duration-150 rounded-lg border px-3 py-2 " placeholder="Alex Traveller" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" name="email" required className="mt-1 w-full bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-800 transition duration-150 rounded-lg border px-3 py-2" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input type="password" name="password" required minLength={8} className="mt-1 w-full bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-800 transition duration-150 rounded-lg border px-3 py-2" placeholder="••••••••" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-lg bg-slate-900 dark:bg-white dark:text-slate-900 transition duration-150 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50">
        {loading ? "Creating..." : "Create account"}
      </button>
      <p className="text-sm text-slate-600 dark:text-slate-400">Already have an account? <Link className="underline" href="/signin">Sign in</Link></p>
    </form>
  );
}
