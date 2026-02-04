"use client";

import React from "react";

export default function UploadIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-2 group">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
            >
                <rect x="25" y="20" width="50" height="60" rx="4" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />
                <path d="M35 35H65M35 45H55M35 55H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-200 dark:text-slate-700" />

                {/* Upload Arrow */}
                <g className="group-hover:animate-bounce">
                    <path d="M50 85V60M40 70L50 60L60 70" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        </div>
    );
}
