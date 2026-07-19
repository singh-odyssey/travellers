import "@/styles/globals.css";
import { ReactNode } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/chatbot";
import { PWAProvider } from "@/components/pwa-provider";
import AuthSessionProvider from "@/components/session-provider";
import { auth } from "@/lib/auth";
import { ThemeProvider } from "@/state/theme";
import { Wrapper } from "@/components/theme-wrapper";
import FloatingActions from "@/components/FloatingActions";
import CustomCursor from "@/components/CustomCursor";const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

/* ✅ Force dynamic rendering */
export const dynamic = "force-dynamic";

export const viewport = {
  themeColor: "#0B2447",
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
      <body
       className={`${playfair.variable} ${dmSans.variable} bg-[#F9F6F0] dark:bg-gray-950 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <Wrapper>
            <AuthSessionProvider session={session}>
              <div className="flex min-h-screen flex-col">
                {/* Header */}
                <SiteHeader />

                {/* Main Content */}
                <main className="flex-1 pt-6">
                  {children}
                </main>

                {/* Footer and Utilities */}
                <SiteFooter />
<FloatingActions />
                <CustomCursor />                 {/* <PWAProvider /> */}
              </div>
            </AuthSessionProvider>
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
