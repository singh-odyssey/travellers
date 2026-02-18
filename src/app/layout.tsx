import "@/styles/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/chatbot";
import { PWAProvider } from "@/components/pwa-provider";
import AuthSessionProvider from "@/components/session-provider";
import { auth } from "@/lib/auth";
import { ThemeProvider } from "@/state/theme";
import { Wrapper } from "@/components/theme-wrapper";

const inter = Inter({ subsets: ["latin"] });

/* ✅ MUST be at top level */
export const dynamic = "force-dynamic";

export const viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: "travellersmeet — Meet verified travellers",
  description:
    "Connect with fellow solo travellers going to the same destination. Verified by ticket uploads.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "travellersmeet",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth(); // ✅ restored

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Wrapper>
            <AuthSessionProvider session={session}>
              <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 dark:text-white transition-colors duration-150">

                <SiteHeader session={session} />

                <main className="flex-1 pt-2 pb-16">
                  {children}
                </main>

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
