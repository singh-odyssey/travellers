import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share feedback or report an issue with travellersmeet.",
};

export default function FeedbackLayout({ children }: { children: ReactNode }) {
  return children;
}
