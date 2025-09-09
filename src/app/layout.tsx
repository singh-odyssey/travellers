import "@/styles/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

import { ThemeProvider } from "@/state/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "travellersmeet — Meet verified travellers",
  description: "Connect with fellow solo travellers going to the same destination. Verified by ticket uploads.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased">
        <SiteHeader />
        <div className="pb-16 pt-2">{children}</div>
        <SiteFooter />
      </body>
    </html>
    </ThemeProvider>
  );
}
