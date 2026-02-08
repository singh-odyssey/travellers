import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Plane } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-white transition duration-150 dark:border-slate-900 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-slate-600">

        {/* Top Grid */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand + Logo */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">

              {/* Logo icon (same style as header) */}
              <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-transform duration-300 group-hover:scale-110 shadow-sm overflow-hidden">
                <Plane className="h-5 w-5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Brand text */}
              <span className="bg-slate-100 dark:bg-white px-4 py-1.5 rounded-full text-base font-semibold tracking-tight transition group-hover:scale-105">
                travellersmeet
              </span>
            </Link>

            <p className="text-slate-600 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-400 [transition:none]">
              Connect with verified travellers, discover shared journeys,
              and explore the world together — safely and socially.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <p className="font-semibold text-slate-800 dark:text-slate-300">
              Product
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Link
                  href="/#faq"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  FAQ
                </Link>

                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  Contact
                </Link>

                <Link
                  href="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  About
                </Link>

                <Link
                  href="/signin"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  Sign in
                </Link>

                <Link
                  href="/signup"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  Get started
                </Link>
              </div>


            </div>
          </div>





          {/* Support */}
          <div className="space-y-3">
            <p className="font-semibold text-slate-800 dark:text-slate-300">
              Support
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="/#faq"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                FAQ
              </Link>

              <Link
                href="/contact"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                Contact
              </Link>

              <Link
                href="/about"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                About
              </Link>

              <Link
                href="/signin"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                Get started
              </Link>
            </div>
          </div>


          {/* Legal */}
          <div className="space-y-3">
            <p className="font-semibold text-slate-800 dark:text-slate-300">
              Legal
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-200 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-200 dark:border-slate-800"></div>

        {/* Social + Bottom */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-6 text-slate-700 dark:text-slate-300">
            <a href="https://github.com/singh-odyssey/travellers" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <FaGithub size={22} />
            </a>

            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
                <path d="M459.37 151.716c.325 4.548 0 9.097 0 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.83-17.219-161.137-46.779 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c14.182 7.873 30.355 12.67 47.431 13.319-28.264-18.843-46.78-51.005-46.78-87.391 0-19.492 5.197-37.36 14.182-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.872-2.599-15.743-2.599-23.615 0-57.828 46.782-104.934 104.934-104.934 30.355 0 57.828 12.995 77.07 33.832 24.04-4.548 46.78-13.645 67.095-25.791-7.873 24.366-24.366 44.833-46.132 57.827 21.366-2.273 41.834-8.122 60.665-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>

            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <FaInstagram size={22} />
            </a>

            <a href="https://linkedin.com/in/aditya-singh-6297242a5" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <FaLinkedin size={22} />
            </a>
          </div>
          {/*Made by */}
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-400">
              Made with love <span className="text-red-500">❤️</span> by the community
            </p></div>
          {/* Copyright */}
          <div className="text-center md:text-right space-y-1">
            <p className="font-medium text-slate-700 dark:text-slate-400">
              Travel better. Meet smarter.
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} travellersmeet. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
