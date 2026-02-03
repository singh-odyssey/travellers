"use client";

import { useState, FormEvent } from "react";
import { CloudUpload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function TicketUploadForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/tickets", { method: "POST", body: form });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Failed to upload");
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 transition duration-300">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4 animate-bounce" />
        <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">Ticket Uploaded!</h3>
        <p className="mt-2 text-emerald-700 dark:text-emerald-300 max-w-sm">
          We've received your ticket. Our team will verify it within 24 hours and notify you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Destination city</label>
          <input name="destination" required className="mt-1 dark:bg-slate-900 dark:border-slate-800 bg-white border-neutral-300 transition duration-150 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none" placeholder="Paris" />
        </div>
        <div>
          <label className="block text-sm font-medium">Departure date</label>
          <input type="date" name="departureDate" required className="mt-1 transition duration-150 dark:bg-slate-900 dark:border-slate-800 bg-white border-neutral-300 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium">Ticket (PDF or image)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer relative group">
            <div className="space-y-1 text-center">
              <CloudUpload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-slate-500 transition-colors" />
              <div className="flex text-sm text-slate-600 dark:text-slate-400">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-slate-900 dark:text-white hover:underline focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file" type="file" accept=".pdf,image/*" required className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PDF, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
            Your ticket is stored securely. Sensitive info can be redacted by our team.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center rounded-lg bg-slate-900 dark:bg-white dark:text-slate-900 transition duration-150 px-4 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload ticket"
        )}
      </button>
    </form>
  );
}
