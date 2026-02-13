import { auth } from "@/lib/auth";
import SignInForm from "@/components/sign-in-form";
import RoutesClient from "./routes-client";

export default async function RoutesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="min-h-screen py-16 px-6">
        <div className="mx-auto max-w-[1800px]">
          <h1 className="text-2xl font-semibold">Sign in to Create Routes</h1>
          <p className="mt-2 text-slate-600">
            You need an account to Create, View, and Manage Routes.
          </p>
          <div className="mt-6">
            <SignInForm />
          </div>
        </div>
      </main>
    );
  }

  return <RoutesClient />;
}
