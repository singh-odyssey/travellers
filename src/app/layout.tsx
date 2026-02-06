import "@/styles/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollToTop from "../components/ScrollToTop";
import Chatbot from "@/components/chatbot";
import { PWAProvider } from "@/components/pwa-provider";

import { auth } from "@/lib/auth";

import { ThemeProvider } from "@/state/theme";
import { Wrapper } from "@/components/theme-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "travellersmeet — Meet verified travellers",
  description: "Connect with fellow solo travellers going to the same destination. Verified by ticket uploads.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Travellers",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  themeColor: "#3b82f6",
};



export default async function RootLayout({ children }: { children: ReactNode }) {

  const session = await auth()

  return (
    <ThemeProvider>
      <Wrapper>
        <div className="flex min-h-screen flex-col 
bg-gradient-to-br from-[#ecfaf4] via-[#dff3ea] to-[#cfeee0] 
dark:!bg-gray-950 dark:!bg-none 
dark:text-white transition duration-150">

          <SiteHeader session={session} />
          <main className="flex-1 pb-16 pt-2">{children}</main>
          <SiteFooter />
          <ScrollToTop />
          <Chatbot />
          <PWAProvider />
        </div>
      </Wrapper>
    </ThemeProvider>
  );
}
