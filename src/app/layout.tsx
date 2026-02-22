import "@/styles/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollToTop from "../components/ScrollToTop";
import Chatbot from "@/components/chatbot";
import PWARegister from "@/components/pwa-register";
import { PWAProvider } from "@/components/pwa-provider";
import AuthSessionProvider from "@/components/session-provider";

import { auth } from "@/lib/auth";

import { ThemeProvider } from "@/state/theme";
import { Wrapper } from "@/components/theme-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: "travellersmeet — Meet verified travellers",
  description: "Connect with fellow solo travellers going to the same destination. Verified by ticket uploads.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "travellersmeet",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon-152x152.svg", sizes: "152x152", type: "image/svg+xml" },
      { url: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
};



export default async function RootLayout({ children }: { children: ReactNode }) {

  const session = await auth()

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-slate-950 transition-colors duration-300`}>
        <ThemeProvider>
          <PWARegister />
          <Wrapper>
            <AuthSessionProvider>
              <div className="flex min-h-screen flex-col dark:text-white transition-colors duration-300">
                <SiteHeader session={session} />
                <main className="flex-1 pb-16 pt-2">{children}</main>
                <SiteFooter />
                <ScrollToTop />
                <Chatbot />
                <PWAProvider />
              </div>
            </AuthSessionProvider>
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
