"use client";

import Image from "next/image";
import React from "react";

export default function MatchesIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center group">
      <div
        className="
          relative
          w-[96px] h-[96px]
          md:w-[120px] md:h-[120px]

          /* hover motion */
          transition-transform duration-300 ease-out
          group-hover:scale-110
          group-hover:-translate-y-1

          /* subtle glow (matching / discovery tone) */
          group-hover:drop-shadow-[0_12px_28px_rgba(168,85,247,0.35)]

          /* gentle floating */
          animate-float
        "
      >
        <Image
          src="/matching.png"
          alt="Smart matching illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .animate-float {
          animation: float 5.2s ease-in-out infinite;
        }

        /* accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
