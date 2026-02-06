import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' },
        },
        'spin-very-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        dash: 'dash 5s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 5s ease-in-out infinite',
        'pulse-slower': 'pulse 8s ease-in-out infinite',
        'spin-very-slow': 'spin-very-slow 40s linear infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
