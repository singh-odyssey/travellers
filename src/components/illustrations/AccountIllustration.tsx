"use client";

import Image from "next/image";
import React from "react";

export default function AccountIllustration() {
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

          /* subtle glow (account / onboarding tone) */
          group-hover:drop-shadow-[0_12px_28px_rgba(16,185,129,0.35)]

          /* gentle floating */
          animate-float
        "
            >
                <Image
                    src="/create-account.png"
                    alt="Create account illustration"
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
          animation: float 4.2s ease-in-out infinite;
        }

        /* accessibility: reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
}
