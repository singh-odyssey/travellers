import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Your Profile",
  description: "View your travellersmeet profile details.",
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
