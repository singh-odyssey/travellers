import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication Error",
  description: "There was a problem signing you in to travellersmeet.",
};

interface AuthErrorPageProps {
  searchParams?: {
    error?: string;
    callbackUrl?: string;
  };
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const error = typeof searchParams?.error === "string" ? searchParams.error : "Authentication failed";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Sign in could not be completed
        </h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {error === "Configuration"
            ? "Google authentication is not configured correctly on this server."
            : "Something went wrong while finishing your sign-in. Please try again."}
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
