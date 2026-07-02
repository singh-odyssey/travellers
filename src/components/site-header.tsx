"use client";

import { useTheme } from "@/state/theme";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plane, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import Toggle from "./toggle";

// --- Constants ---
const MARKETING_LINKS = [
  { href: "/#features", key: "features", label: "Features" },
  { href: "/#how-it-works", key: "how-it-works", label: "How it works" },
  { href: "/#testimonials", key: "testimonials", label: "Stories" },
  { href: "/#faq", key: "faq", label: "FAQ" },
  { href: "/upload", key: "upload", label: "Upload" },
  { href: "/routes", key: "routes", label: "Routes" },
];

const APP_LINKS = [
  { href: "/upload", label: "Upload" },
  { href: "/routes", label: "Routes" },
];

const SECTIONS = ["features", "how-it-works", "testimonials", "faq"];

// --- Helper Styles ---
const getLinkClasses = (isActive: boolean) =>
  `text-sm pb-0.5 border-b-2 transition-colors duration-200 ${
    isActive
      ? "text-slate-900 dark:text-white font-semibold border-slate-900 dark:border-white"
      : "text-slate-600 dark:text-slate-300 font-medium border-transparent hover:text-slate-900 dark:hover:text-white"
  }`;

export default function SiteHeader() {
  const { data: session } = useSession();
  const { theme, changeTheme } = useTheme();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isRouteActive = useCallback((path: string) => pathname === path, [pathname]);

  // Handle active section highlighting on scroll
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const handleScroll = () => {
      let currentSection: string | null = null;

      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3 gap-6">
        
        {/* BRAND */}
        <Link
          href={session?.user ? "/dashboard/profile" : "/"}
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-transform duration-300 group-hover:scale-105 shadow-sm overflow-hidden">
            <Plane className="h-5 w-5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
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
            href="/stories"
            className={`transition-colors ${
              activeSection === "stories"
                ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-white"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Stories
          </Link>
          <Link
            href="/faq"
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
        {/* CENTER: Navigation Links */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <nav className="flex items-center gap-6">
            {MARKETING_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={getLinkClasses(activeSection === link.key)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

          <nav className="flex items-center gap-6">
            {APP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClasses(isRouteActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* RIGHT: Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {session?.user?.id ? (
            <Link
              href="/dashboard"
              className="flex items-center rounded-lg bg-slate-900 dark:bg-white h-10 px-4 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90 transition-all shadow-sm"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="flex items-center rounded-lg bg-slate-900 dark:bg-white h-10 px-4 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90 shadow-sm transition-opacity"
              >
                Get started
              </Link>
            </>
          )}

          <button
            onClick={changeTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {theme === "dark" ? <HiOutlineMoon size={20} /> : <HiOutlineSun size={20} />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden absolute left-0 right-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:hidden z-50"
          >
            <div className="mx-auto max-w-6xl px-6 py-4">
              <div className="grid gap-1">
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Explore
                </p>
                {MARKETING_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="rounded px-2 py-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <p className="px-2 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Your account
                </p>
                {APP_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded px-2 py-2 transition-colors ${
                      isRouteActive(link.href)
                        ? "bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex px-2 py-3 mt-2 justify-between items-center border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-300">Dark theme</p>
                  <Toggle theme={theme} changeTheme={changeTheme} />
                </div>
                
                <div className="flex flex-col gap-2 pt-2">
                  {session?.user?.id ? (
                    <Link
                      className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-center text-sm font-semibold text-white dark:text-slate-900 shadow-sm"
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="text-center py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/signup"
                        className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-center text-sm font-semibold text-white dark:text-slate-900 shadow-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Get started
                      </Link>
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