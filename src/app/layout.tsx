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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/* ✅ Force dynamic rendering */
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
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-950 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <Wrapper>
            <AuthSessionProvider session={session}>
              <div className="flex min-h-screen flex-col">
                {/* Header */}
                <SiteHeader session={session} />

                {/* Main Content */}
                <main className="flex-1 pt-6 pb-20">
                  {children}
                </main>

                {/* Footer and Utilities */}
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
