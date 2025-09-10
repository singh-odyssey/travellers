"use client";

import { useState, FormEvent } from "react";

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

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Destination city</label>
        <input name="destination" required className="mt-1 dark:bg-slate-900 dark:border-slate-800 bg-white border-neutral-300 transition duration-150 w-full rounded-lg border px-3 py-2" placeholder="Paris" />
      </div>
      <div>
        <label className="block text-sm font-medium">Departure date</label>
        <input type="date" name="departureDate" required className="mt-1 transition duration-150 dark:bg-slate-900 dark:border-slate-800 bg-white border-neutral-300 w-full rounded-lg border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Ticket (PDF or image)</label>
        <input type="file" name="file" accept=".pdf,image/*" required className="mt-1 block w-full" />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your ticket is stored securely. Sensitive info can be blurred by our team during review.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-700">Uploaded. Well notify you after verification.</p>}
      <button type="submit" disabled={loading} className="rounded-lg bg-slate-900 dark:bg-white dark:text-slate-900 transition duration-150 px-4 py-2 font-medium text-white hover:opacity-80 disabled:opacity-50">
        {loading ? "Uploading..." : "Upload ticket"}
      </button>
    </form>
  );
}
