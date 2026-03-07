import { auth } from "@/lib/auth";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">You need to sign in</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Access your dashboard to upload a ticket and find matches.</p>
        <Link className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 font-medium text-white" href="/signin">Sign in</Link>
      </main>
    );
  }

  const tickets = await prisma.ticket.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } });

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your trips</h1>
        <Link className="rounded-lg border border-slate-300 dark:text-white dark:border-transparent dark:bg-slate-800 transition duration-150 px-4 py-2" href="/upload">Upload ticket</Link>
      </div>

      <div className="mt-8 grid gap-4">
        {tickets.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">No trips yet. Upload a ticket to get verified and see matches.</p>
        ) : (
          tickets.map((t: any) => (
            <div key={t.id} className="rounded-lg shadow-sm dark:border-slate-800 dark:bg-slate-900 transition duration-150 border bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t.destination}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Departure: {new Date(t.departureDate).toDateString()}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-sm dark:border-slate-600">{t.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
