"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: form,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Failed to sign in");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" name="email" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input type="password" name="password" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="••••••••" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 disabled:opacity-50">
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-sm text-slate-600">No account yet? <Link className="underline" href="/signup">Sign up</Link></p>
    </form>
  );
}
