import { auth } from "@/lib/auth";
import TicketUploadForm from "@/components/ticket-upload-form";
import SignInForm from "@/components/sign-in-form";

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main className="min-h-screen py-16 px-6 ">
        
        <div className="mx-auto max-w-[1800px]">  
        <h1 className="text-2xl font-semibold">Sign in to upload</h1>
        <p className="mt-2 text-slate-600 ">You need an account to upload and verify tickets.</p>
          <div className="mt-6">
              <SignInForm />
              </div>
          </div>
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
