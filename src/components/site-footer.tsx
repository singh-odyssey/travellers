import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-white transition duration-150 dark:border-slate-900 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">

        {/* Top Section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand Info */}
          <div className="max-w-sm space-y-2 text-center md:text-left">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-400">
              travellersmeet
            </p>
            <p className="text-sm text-slate-500">
              Meet verified travellers and explore journeys together.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium md:justify-end">
            <Link href="/" className="hover:text-blue-500 transition">Home</Link>
            <Link href="/about" className="hover:text-blue-500 transition">About</Link>
            <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
            <Link href="#features" className="hover:text-blue-500 transition">Features</Link>
            <Link href="#how-it-works" className="hover:text-blue-500 transition">How it works</Link>
            <Link href="#faq" className="hover:text-blue-500 transition">FAQ</Link>
            <Link href="/signup" className="hover:text-blue-500 transition">Get started</Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-200 dark:border-slate-800"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 text-slate-700 dark:text-slate-300">
          <a href="https://github.com/singh-odyssey/travellers" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <FaGithub size={22} />
          </a>

          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
              <path d="M459.37 151.716c.325 4.548 0 9.097 0 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.83-17.219-161.137-46.779 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c14.182 7.873 30.355 12.67 47.431 13.319-28.264-18.843-46.78-51.005-46.78-87.391 0-19.492 5.197-37.36 14.182-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.872-2.599-15.743-2.599-23.615 0-57.828 46.782-104.934 104.934-104.934 30.355 0 57.828 12.995 77.07 33.832 24.04-4.548 46.78-13.645 67.095-25.791-7.873 24.366-24.366 44.833-46.132 57.827 21.366-2.273 41.834-8.122 60.665-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
            </svg>
          </a>

          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <FaInstagram size={22} />
          </a>

          <a href="https://linkedin.com/in/aditya-singh-6297242a5" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-400">
            Made with love <span className="text-red-500">❤️</span> by the community
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} travellersmeet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
