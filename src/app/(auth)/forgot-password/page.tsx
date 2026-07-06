import ForgotPasswordForm from "@/components/forgot-password-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex justify-center py-6">
      <ForgotPasswordForm />
    </main>
  );
}
