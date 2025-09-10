import "@/styles/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

import { auth } from "@/lib/auth";

import { ThemeProvider } from "@/state/theme";
import { Wrapper } from "@/components/theme-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "travellersmeet — Meet verified travellers",
  description: "Connect with fellow solo travellers going to the same destination. Verified by ticket uploads.",
};



export default async function RootLayout({ children }: { children: ReactNode }) {
  
  const session = await auth()

  return (
    <ThemeProvider>
      <Wrapper>
        <SiteHeader session={session} />
        <div className="pb-16 pt-2 transition duration-150 bg-white dark:bg-gray-950 dark:text-white">{children}</div>
        <SiteFooter />
      </Wrapper>
    </ThemeProvider>
  );
}
