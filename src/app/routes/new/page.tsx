import SignInForm from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import NewRouteClient from "./new-route-client";

export default async function NewRoutePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="flex flex-col items-center py-6">
        <div className="mx-auto max-w-md text-center px-6 mb-6">
          <span className="inline-block rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-1 text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Create Route
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            Sign in to create your route
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            You need an account to create, view, and manage routes.
          </p>
        </div>

        <SignInForm />
      </main>
    );
  }

  return <NewRouteClient userId={session.user.id} />;
}