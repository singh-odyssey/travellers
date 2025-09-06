"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">✈️</span>
            <span className="text-lg font-semibold tracking-tight">travellersmeet</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm text-slate-700 hover:text-slate-900">Features</Link>
          <Link href="#how-it-works" className="text-sm text-slate-700 hover:text-slate-900">How it works</Link>
          <Link href="#testimonials" className="text-sm text-slate-700 hover:text-slate-900">Stories</Link>
          <Link href="#faq" className="text-sm text-slate-700 hover:text-slate-900">FAQ</Link>
          <Link href="/upload" className="text-sm text-slate-700 hover:text-slate-900">Upload</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/signin" className="text-sm font-medium text-slate-700 hover:text-slate-900">Sign in</Link>
          <Link href="/signup" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Get started</Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {open ? (
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 5.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/60 bg-white md:hidden">
          <nav className="mx-auto max-w-6xl px-6 py-3">
            <div className="grid gap-2">
              <Link href="#features" className="rounded px-2 py-2 text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>Features</Link>
              <Link href="#how-it-works" className="rounded px-2 py-2 text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>How it works</Link>
              <Link href="#testimonials" className="rounded px-2 py-2 text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>Stories</Link>
              <Link href="#faq" className="rounded px-2 py-2 text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>FAQ</Link>
              <Link href="/upload" className="rounded px-2 py-2 text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>Upload</Link>
              <div className="mt-2 flex items-center gap-3">
                <Link href="/signin" className="rounded px-2 py-2 text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>Sign in</Link>
                <Link href="/signup" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800" onClick={() => setOpen(false)}>Get started</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
