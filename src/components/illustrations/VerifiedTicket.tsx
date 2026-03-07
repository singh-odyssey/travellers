"use client";

import Image from "next/image";
import React from "react";

export default function VerifiedTicket() {
  return (
    <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden p-6 rounded-xl group">

      <div
        className="
          relative
          w-full max-w-[280px]

          /* hover motion */
          transition-transform duration-300 ease-out
          group-hover:scale-105
          group-hover:-translate-y-1

          /* subtle glow */
          group-hover:drop-shadow-[0_12px_28px_rgba(16,185,129,0.35)]

          /* gentle floating */
          animate-float
        "
      >
        <Image
          src="/verified-ticket.png"
          alt="Verified by ticket illustration"
          width={650}
          height={650}
          className="w-full h-auto object-contain"
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
          animation: float 4.5s ease-in-out infinite;
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
