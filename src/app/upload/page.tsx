import SignInForm from "@/components/sign-in-form";
import TicketUploadForm from "@/components/ticket-upload-form";
import { auth } from "@/lib/auth";

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main className="flex flex-col items-center py-6">
        <div className="mx-auto max-w-md text-center px-6 mb-6">
          <span className="inline-block rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-1 text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Upload
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            Sign in to upload
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            You need an account to upload and verify tickets.
          </p>
        </div>

        <SignInForm />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Upload your ticket
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        We only show verified users who uploaded a destination ticket.
      </p>
      <div className="mt-8">
        <TicketUploadForm />
      </div>
    </main>
  );
}