'use client'
import { ReactNode } from "react";
import { useTheme } from "@/state/theme";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export function Wrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();



  return (
    <html lang="en" className={`${inter.className} scroll-smooth ${theme}`}>
      <body className="dark:bg-slate-950">{children}</body>
    </html>
  );
}
