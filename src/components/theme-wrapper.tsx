'use client'
import { ReactNode } from "react";

/**
 * Wrapper component was previously responsible for rendering html/body tags.
 * This has been moved to RootLayout for better Next.js compatibility.
 * This component now just serves as a shell if needed, or can be removed later.
 */
export function Wrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
