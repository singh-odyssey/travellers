"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Instagram, Plane } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06132a] via-[#071a3d] to-[#06132a]" />

      {/* World Map */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <Image
          src="/worldMap.png"
          alt="World Map"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-16 py-16">

        {/* Logo + Tagline */}
        <div className="text-center -mt-2 mb-8">
          <div className="flex justify-center items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={38}
              height={38}
            />
            <h2 className="text-3xl tracking-tight">
              <span className="font-semibold">travellersmeet</span>
            </h2>
          </div>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">
            Connect with verified travellers, discover shared journeys,
            and explore the world together.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-base">

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/demo-routes" className="hover:text-white transition">
                  Find Travellers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Safety Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://github.com/singh-odyssey/travellers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GitHub Repo ⭐
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/singh-odyssey/travellers/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Contributors
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-3">Newsletter</h3>
            <p className="text-gray-300 mb-3">Email Address</p>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
              />
              <button className="bg-white text-black px-5 rounded-lg font-medium hover:bg-gray-200 transition">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 relative flex items-center justify-center">
          <div className="absolute w-full border-t border-dashed border-white/30" />
          <div className="relative bg-[#071a3d] px-2">
            <Plane size={16} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-gray-300 text-sm gap-6">
          <div>
            © 2026 TravellersMeet.{" "}
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>

          <div>
            Made with <span className="text-red-500">❤️</span> by a community with 🛂 passports ready.
          </div>

          <div className="flex gap-8">
            <a
              href="https://github.com/singh-odyssey/travellers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="hover:text-white transition cursor-pointer" />
            </a>
            <Twitter className="hover:text-white transition cursor-pointer" />
            <Instagram className="hover:text-white transition cursor-pointer" />
          </div>
        </div>

      </div>
    </footer>
  );
}
