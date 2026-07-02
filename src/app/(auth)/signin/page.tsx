import SignInForm from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
  <main className="flex justify-center py-6">
  <SignInForm />
</main>
  );
}

