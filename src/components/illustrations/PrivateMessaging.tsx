"use client";

import React from "react";

export default function PrivateMessaging() {
    return (
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden p-6 group">
            <svg
                viewBox="0 0 200 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[180px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            >
                {/* Chat Bubble 1 (Bottom Left) */}
                <g className="group-hover:animate-float-chat">
                    <rect x="40" y="80" width="60" height="30" rx="10" fill="white" stroke="currentColor" strokeWidth="2" className="dark:fill-slate-800 text-slate-200 dark:text-slate-700" />
                    <path d="M40 100 L30 110 L45 105" fill="white" stroke="currentColor" strokeWidth="2" className="dark:fill-slate-800 text-slate-200 dark:text-slate-700" />
                    <rect x="50" y="90" width="30" height="4" rx="2" fill="currentColor" className="text-slate-100 dark:text-slate-700" />
                    <rect x="50" y="98" width="40" height="4" rx="2" fill="currentColor" className="text-slate-50 dark:text-slate-700/50" />
                </g>

                {/* Chat Bubble 2 (Top Right) */}
                <g className="group-hover:animate-float-chat-delayed">
                    <rect x="100" y="40" width="60" height="30" rx="10" fill="#a855f7" stroke="#a855f7" strokeWidth="2" opacity="0.9" />
                    <path d="M160 55 L170 65 L155 60" fill="#a855f7" stroke="#a855f7" strokeWidth="2" />
                    <rect x="110" y="50" width="40" height="4" rx="2" fill="white" opacity="0.8" />
                    <rect x="110" y="58" width="30" height="4" rx="2" fill="white" opacity="0.5" />
                </g>

                {/* Lock Icon */}
                <g className="transition-transform duration-500 origin-center group-hover:scale-110">
                    <rect x="90" y="90" width="20" height="15" rx="3" fill="#a855f7" />
                    <path d="M94 90 V85 C94 82 96 80 100 80 C104 80 106 82 106 85 V90" stroke="#a855f7" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="97" r="2" fill="white" />
                </g>

                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                    </filter>
                </defs>
            </svg>

            <style jsx>{`
        @keyframes float-chat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, -5px); }
        }
        @keyframes float-chat-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, -5px); }
        }
        .group-hover\:animate-float-chat {
          animation: float-chat 3s ease-in-out infinite;
        }
        .group-hover\:animate-float-chat-delayed {
          animation: float-chat-delayed 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
        </div>
    );
}
