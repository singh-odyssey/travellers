"use client";

import { useTheme } from "@/state/theme";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function SiteHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        backdrop-blur-lg
        bg-white/70 dark:bg-black/40
        border-b border-black/10 dark:border-white/10
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* ================= LEFT SIDE ================= */}
        <Link href={session?.user ? "/dashboard/profile" : "/"} className="flex items-center gap-3 group">
          {/* LOGO IMAGE */}
          <Image
            src="/logo.png"
            alt="travellersmeet logo"
            width={38}
            height={38}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />

          {/* BRAND NAME */}
          <span className="text-base font-semibold tracking-tight text-black dark:text-white">
            travellersmeet
          </span>
        </Link>

        {/* ================= CENTER NAV ================= */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-black/70 dark:text-white/80">
          <Link href="/#features" className="hover:text-black dark:hover:text-white transition">
            Features
          </Link>
          <Link href="/#how-it-works" className="hover:text-black dark:hover:text-white transition">
            How it works
          </Link>
          <Link href="/#testimonials" className="hover:text-black dark:hover:text-white transition">
            Stories
          </Link>
          <Link href="/#faq" className="hover:text-black dark:hover:text-white transition">
            FAQ
          </Link>
          <Link href="/upload" className="hover:text-black dark:hover:text-white transition">
            Upload
          </Link>
          <Link href="/routes" className="hover:text-black dark:hover:text-white transition">
            Routes
          </Link>
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden md:flex items-center gap-5">

          {session?.user ? (
            <Link
              href="/dashboard/profile"
              className="
                bg-black text-white
                dark:bg-white dark:text-black
                px-5 py-2 rounded-md
                text-sm font-semibold
                hover:opacity-80 transition
              "
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm text-black/70 dark:text-white/80 hover:text-black dark:hover:text-white transition"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="
                  bg-black text-white
                  dark:bg-white dark:text-black
                  px-5 py-2 rounded-md
                  text-sm font-semibold
                  hover:opacity-80 transition
                "
              >
                Get started
              </Link>
            </>
          )}

          {/* THEME TOGGLE */}
          <button onClick={changeTheme}>
            {theme === "dark" ? (
              <HiOutlineMoon size={22} className="text-slate-400" />
            ) : (
              <HiOutlineSun size={22} className="text-black" />
            )}
          </button>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden p-2 text-black dark:text-white"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {open ? (
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 5.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              md:hidden
              bg-white dark:bg-black
              border-t border-black/10 dark:border-white/10
            "
          >
            <div className="px-6 py-4 space-y-4 text-sm text-black dark:text-white">
              <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
              <Link href="/#how-it-works" onClick={() => setOpen(false)}>How it works</Link>
              <Link href="/#testimonials" onClick={() => setOpen(false)}>Stories</Link>
              <Link href="/#faq" onClick={() => setOpen(false)}>FAQ</Link>
              <Link href="/upload" onClick={() => setOpen(false)}>Upload</Link>
              <Link href="/routes" onClick={() => setOpen(false)}>Routes</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
