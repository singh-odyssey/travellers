import ResetPasswordForm from "@/components/reset-password-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your travellersmeet account.",
};

export default async function ResetPasswordPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex justify-center py-6">
      <ResetPasswordForm />
    </main>
  );
}
