"use client";

import { useEffect, useState } from "react";
import { RouteViewer } from "./route-viewer";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TripBoardProps {
  meetupPlanId: string;

  title: string;
  location: string;
  meetupTime: string;
  notes?: string;

  routeId?: string;
}

export default function TripBoard({
  meetupPlanId,
  title,
  location,
  meetupTime,
  notes,
  routeId,
}: TripBoardProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  useEffect(() => {
  async function loadChecklist() {
    const res = await fetch(
      `/api/meetup-checklist?meetupPlanId=${meetupPlanId}`
    );

    if (!res.ok) return;

    const data = await res.json();

    setItems(data);
  }

  loadChecklist();
}, [meetupPlanId]);
  const [text, setText] = useState("");

  async function addItem() {
  if (!text.trim()) return;

  const res = await fetch("/api/meetup-checklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meetupPlanId,
      text,
    }),
  });

  if (!res.ok) return;

  const item = await res.json();

  setItems((prev) => [...prev, item]);

  setText("");
}

  async function toggle(id: string) {
  const item = items.find((i) => i.id === id);

  if (!item) return;

  const completed = !item.completed;

  const res = await fetch("/api/meetup-checklist", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      completed,
    }),
  });

  if (!res.ok) return;

  setItems((prev) => {
    const updated = prev.map((i) =>
      i.id === id
        ? { ...i, completed }
        : i
    );

    return updated.sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  });
}

  return (
    <div className="space-y-6 max-h-[320px] overflow-y-auto pr-2">

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-2 text-slate-700 dark:text-slate-300">
          📍 {location}
        </p>

        <p className="text-slate-700 dark:text-slate-300">
          🕒 {new Date(meetupTime).toLocaleString()}
        </p>

        {notes && (
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {notes}
          </p>
        )}

      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">

        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
          Shared Checklist
        </h3>

        <div className="flex gap-2">

          <input
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add checklist item..."
          />

          <button
            onClick={addItem}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Add
          </button>

        </div>

        <div className="mt-4 space-y-2">

          {items.length === 0 && (
  <p className="text-sm text-slate-500 italic">
    No checklist items yet.
  </p>
)}

          {items.map((item) => (

            <label
              key={item.id}
              className="flex items-center gap-3 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >

              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggle(item.id)}
              />

              <span
  className={
    item.completed
      ? "line-through text-slate-400"
      : "text-slate-900 dark:text-white"
  }
>
                {item.text}
              </span>

            </label>

          ))}

        </div>

      </div>

      {routeId && (

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">

          <RouteViewer
            routeId={routeId}
            allowCaching
            showControls
          />

        </div>

      )}

    </div>
  );
  }