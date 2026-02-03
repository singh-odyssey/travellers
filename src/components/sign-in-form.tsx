"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    if (result?.ok) {
      window.location.href = callbackUrl;
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
          className="mt-1 w-full bg-white border-neutral-300 transition duration-150 dark:bg-slate-900 dark:border-slate-800 rounded-lg border px-3 py-2" 
          placeholder="you@example.com" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input 
          type="password" 
          name="password" 
          required 
          className="mt-1 w-full bg-white border-neutral-300 transition duration-150 dark:bg-slate-900 dark:border-slate-800 rounded-lg border px-3 py-2" 
          placeholder="••••••••" 
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button 
        type="submit" 
        disabled={loading} 
        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition duration-150 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        No account yet? <Link className="underline" href="/signup">Sign up</Link>
      </p>
    </form>
  );
}
