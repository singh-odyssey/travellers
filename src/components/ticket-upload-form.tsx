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
      (e.currentTarget as HTMLFormElement).reset();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      method="post"
      encType="multipart/form-data"
      aria-describedby={error ? "ticket-error" : undefined}
    >
      <div>
        <label className="block text-sm font-medium" htmlFor="destination">Destination city</label>
        <input
          id="destination"
          name="destination"
            required
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="Paris"
          autoComplete="off"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="departureDate">Departure date</label>
        <input
          id="departureDate"
          type="date"
          name="departureDate"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="ticketFile">Ticket (PDF or image)</label>
        <input
          id="ticketFile"
          type="file"
          name="file"
          accept=".pdf,image/*"
          required
          className="mt-1 block w-full"
        />
        <p className="mt-1 text-xs text-slate-500">Your ticket is stored securely. Sensitive info can be blurred by our team during review.</p>
      </div>
      <div aria-live="polite" className="space-y-1 min-h-[1.25rem]">
        {error && <p id="ticket-error" className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">Uploaded. We'll notify you after verification.</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload ticket"}
      </button>
    </form>
  );
}
