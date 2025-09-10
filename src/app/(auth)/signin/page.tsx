import SignInForm from "@/components/sign-in-form";

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Welcome back. Enter your credentials to continue.</p>
      <div className="mt-8">
        <SignInForm />
      </div>
    </main>
  );
}
