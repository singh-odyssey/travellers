import SignUpForm from "@/components/sign-up-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your travellersmeet account to connect with verified solo travellers.",
};

export default async function SignUpPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
      <main className="flex justify-center py-6">
      <SignUpForm />
    </main>
  );
}
