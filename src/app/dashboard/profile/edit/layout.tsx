import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit your travellersmeet profile details.",
};

export default function EditProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
