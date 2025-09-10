import { auth } from "@/lib/auth";
import TicketUploadForm from "@/components/ticket-upload-form";

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Sign in to upload</h1>
        <p className="mt-2 text-slate-600">You need an account to upload and verify tickets.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Upload your ticket</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">We only show verified users who uploaded a destination ticket.</p>
      <div className="mt-8">
        <TicketUploadForm />
      </div>
    </main>
  );
}
