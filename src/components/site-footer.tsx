"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Instagram, Plane } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">

      {/* Background with theme-aware gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-[#06132a] dark:via-[#071a3d] dark:to-[#06132a] transition-colors duration-500" />

      {/* World Map with theme-aware opacity */}
      <div className="absolute inset-0 opacity-10 dark:opacity-25 pointer-events-none">
        <Image
          src="/worldMap.png"
          alt="World Map"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-16 py-16">
        {/* Logo + Tagline */}
        <div className="text-center -mt-2 mb-8">
          <div className="flex justify-center items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={38}
              height={38}
            />
            <h2 className="text-3xl tracking-tight transition-colors duration-300">
              <span className="font-semibold">travellersmeet</span>
            </h2>
          </div>

          <p className="mt-4 text-slate-600 dark:text-gray-300 max-w-2xl mx-auto text-base leading-relaxed transition-colors duration-300">
            Connect with verified travellers, discover shared journeys,
            and explore the world together.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-base">

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-3 transition-colors duration-300">Explore</h3>
            <ul className="space-y-2 text-slate-600 dark:text-gray-300 transition-colors duration-300">
              <li>
                <Link href="/demo-routes" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Find Travellers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Safety Center
                </Link>
              </li>
              <Link
  href="/feedback"
  className="hover:text-slate-900 dark:hover:text-white transition-colors"
>
  Feedback
</Link>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-3 transition-colors duration-300">Community</h3>
            <ul className="space-y-2 text-slate-600 dark:text-gray-300 transition-colors duration-300">
              <li>
                <a
                  href="https://github.com/singh-odyssey/travellers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  GitHub Repo ⭐
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/singh-odyssey/travellers/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Contributors
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 transition-colors duration-300">Legal</h3>
            <ul className="space-y-2 text-slate-600 dark:text-gray-300 transition-colors duration-300">
              <li>
                <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-3 transition-colors duration-300">Newsletter</h3>
            <p className="text-slate-600 dark:text-gray-300 mb-3 transition-colors duration-300">Email Address</p>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg bg-slate-200/50 dark:bg-white/10 border border-slate-300 dark:border-white/20 px-4 py-2 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-slate-400 dark:focus:border-white/40 transition-all duration-300"
              />
              <button className="bg-slate-900 dark:bg-white text-white dark:text-black px-5 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors duration-300">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 relative flex items-center justify-center">
          <div className="absolute w-full border-t border-dashed border-slate-300 dark:border-white/30" />
          <div className="relative bg-slate-50 dark:bg-[#071a3d] px-2 transition-colors duration-500">
            <Plane size={16} className="text-slate-400 dark:text-white" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-slate-500 dark:text-gray-300 text-sm gap-6 transition-colors duration-300">
          <div>
            © 2026 TravellersMeet.{" "}
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
          </div>

          <div>
            Made with <span className="text-red-500">❤️</span> by a community with 🛂 passports ready.
          </div>

          <div className="relative z-30 flex gap-8 items-center">
            <a
              href="https://github.com/singh-odyssey/travellers"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="hover:scale-110 transition-transform duration-200"
            >
              <Github className="w-5 h-5 text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-300 cursor-pointer" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:scale-110 transition-transform duration-200"
            >
              <Twitter className="w-5 h-5 text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-300 cursor-pointer" />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform duration-200"
            >
              <Instagram className="w-5 h-5 text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-300 cursor-pointer" />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-110 transition-transform duration-200"
            >
              <FaLinkedin className="w-5 h-5 text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-300 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}