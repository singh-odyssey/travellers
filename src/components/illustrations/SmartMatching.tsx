"use client";

import React from "react";

export default function SmartMatching() {
    return (
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden p-6 group">
            <svg
                viewBox="0 0 200 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[180px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            >
                {/* Connection Line */}
                <path
                    d="M60 75C60 75 100 40 140 75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="text-slate-200 dark:text-slate-700 animate-dash"
                />

                {/* Profile 1 */}
                <g className="animate-float-slow">
                    <circle cx="60" cy="75" r="20" fill="white" stroke="currentColor" strokeWidth="2" className="dark:fill-slate-800 text-slate-200 dark:text-slate-700" />
                    <circle cx="60" cy="70" r="6" fill="currentColor" className="text-slate-200 dark:text-slate-600" />
                    <path d="M48 85C48 80 52 78 60 78C68 78 72 80 72 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-200 dark:text-slate-600" />
                </g>

                {/* Profile 2 */}
                <g className="animate-float-slower" style={{ animationDelay: '0.5s' }}>
                    <circle cx="140" cy="75" r="20" fill="white" stroke="currentColor" strokeWidth="2" className="dark:fill-slate-800 text-slate-200 dark:text-slate-700" />
                    <circle cx="140" cy="70" r="6" fill="currentColor" className="text-slate-200 dark:text-slate-600" />
                    <path d="M128 85C128 80 132 78 140 78C148 78 152 80 152 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-200 dark:text-slate-600" />
                </g>

                {/* Match Heart/Star */}
                <g className="opacity-0 group-hover:animate-pop-in" style={{ transformOrigin: '100px 50px' }}>
                    <path d="M100 45 L103 52 L110 52 L105 57 L107 64 L100 60 L93 64 L95 57 L90 52 L97 52 Z" fill="#3b82f6" />
                </g>

                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-dash {
          stroke-dashoffset: 0;
          animation: dash 2s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float-slow {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .group-hover\:animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.3s;
        }
      `}</style>
        </div>
    );
}
