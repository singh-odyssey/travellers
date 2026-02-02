import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function SiteFooter() {
  return (
    <footer className="border-t transition duration-150 dark:border-slate-900 dark:bg-slate-950 border-slate-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-600">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p>
            <span className="font-semibold text-slate-800 dark:text-slate-400">
              travellersmeet
            </span>{" "}
            · Meet verified travellers.
          </p>
          <nav className="flex flex-wrap items-center dark:*:text-slate-500 gap-x-6 gap-y-2">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="/signup">Get started</Link>
          </nav>
        </div>

        {/* Social Icons */}
        <div className="mt-4 flex justify-center gap-6 text-slate-700 dark:text-slate-300">
          <a
            href="https://github.com/singh-odyssey/travellers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>

          {/* X Logo */}
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-6 h-6">
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M459.37 151.716c.325 4.548 0 9.097 0 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.83-17.219-161.137-46.779 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c14.182 7.873 30.355 12.67 47.431 13.319-28.264-18.843-46.78-51.005-46.78-87.391 0-19.492 5.197-37.36 14.182-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.872-2.599-15.743-2.599-23.615 0-57.828 46.782-104.934 104.934-104.934 30.355 0 57.828 12.995 77.07 33.832 24.04-4.548 46.78-13.645 67.095-25.791-7.873 24.366-24.366 44.833-46.132 57.827 21.366-2.273 41.834-8.122 60.665-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
            </svg>
          </a>

          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com/in/aditya-singh-6297242a5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <p className="text-center text-sm font-medium text-slate-700">
            Made with love <span className="text-red-500">❤️</span> By The Community
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} travellersmeet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
