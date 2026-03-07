"use client";
import { usePathname } from "next/navigation";
import { useTheme } from "@/state/theme";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Toggle from "./toggle";

export default function SiteHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isRouteActive = (path: string) => pathname === path;

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = ["features", "how-it-works", "testimonials", "faq"];

    const handleScroll = () => {
      let currentSection: string | null = null;

        <nav className="hidden items-center text-sm font-medium text-white/95 gap-8 md:flex">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors">Stories</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link href="/upload" className="hover:text-white transition-colors">Upload</Link>
        </nav>
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">

        {/* LEFT SIDE */}
        <Link
          href={session?.user ? "/dashboard/profile" : "/"}
          className="flex items-center gap-3 group"
        >
          <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-transform duration-300 group-hover:scale-110 shadow-sm overflow-hidden">
            <Plane className="h-5 w-5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" />
          </div>

          <span className="bg-white/90 text-black px-4 py-1.5 rounded-full text-lg font-semibold tracking-tight transition-all duration-300 hover:scale-105 shadow-sm dark:bg-slate-800 dark:text-white">
            travellersmeet
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden items-center text-sm font-medium text-slate-600 dark:text-slate-300 gap-8 md:flex">
          <Link
            href="/#features"
            className={`transition-colors ${
              activeSection === "features"
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className={`transition-colors ${
              activeSection === "how-it-works"
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            How it works
          </Link>
          <Link
            href="/#testimonials"
            className={`transition-colors ${
              activeSection === "testimonials"
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Stories
          </Link>
          <Link
            href="/#faq"
            className={`transition-colors ${
              activeSection === "faq"
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            FAQ
          </Link>
          <Link
            href="/upload"
            className={`transition-colors ${
              isRouteActive("/upload")
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Upload
          </Link>
          <Link
            href="/routes"
            className={`transition-colors ${
              isRouteActive("/routes")
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Routes
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {session?.user?.id ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90 transition-all shadow-sm"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90 shadow-sm"
              >
                Get started
              </Link>
            </>
          )}

          <button onClick={changeTheme} className="p-2">
            {theme === "dark" ? (
              <HiOutlineMoon size={22} />
            ) : (
              <HiOutlineSun size={22} />
            )}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden z-20 absolute left-0 right-0 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 md:hidden transition duration-150">
            <div className="mx-auto max-w-6xl px-6 py-3">
              <div className="grid gap-2 dark:*:text-slate-200">
                <Link href="#features" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Features</Link>
                <Link href="#how-it-works" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>How it works</Link>
                <Link href="#testimonials" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Stories</Link>
                <Link href="#faq" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>FAQ</Link>
                <Link href="/upload" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Upload</Link>
                <Link href="/#features" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Features</Link>
                <Link href="/#how-it-works" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>How it works</Link>
                <Link href="/#testimonials" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>Stories</Link>
                <Link href="/#faq" className="rounded px-2 py-2 text-slate-800 hover:opacity-80" onClick={() => setOpen(false)}>FAQ</Link>
                <Link
                  href="/upload"
                  className={`rounded px-2 py-2 ${
                    isRouteActive("/upload")
                      ? "bg-slate-100 dark:bg-slate-800 font-semibold"
                      : "text-slate-800 hover:opacity-80"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Upload
                </Link>
                  <Link
                    href="/routes"
                    className={`rounded px-2 py-2 ${
                      isRouteActive("/routes")
                        ? "bg-slate-100 dark:bg-slate-800 font-semibold"
                        : "text-slate-800 hover:opacity-80"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Routes
                  </Link>
                <div className="flex pl-2 pr-8 py-2 justify-between">
                  <p>Dark Theme</p>
                  <Toggle theme={theme} changeTheme={changeTheme} />
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {session?.user?.id ? (
                    <Link className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-center text-sm font-semibold text-white dark:text-slate-900 shadow-sm" href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                  ) : (
                    <>
                      <Link href="/signin" className="text-center py-2 text-sm font-medium text-slate-600 dark:text-slate-300" onClick={() => setOpen(false)}>Sign in</Link>
                      <Link href="/signup" className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-center text-sm font-semibold text-white dark:text-slate-900 shadow-sm" onClick={() => setOpen(false)}>Get started</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}