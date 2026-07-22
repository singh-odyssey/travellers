"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  content: string;
  read: boolean;
  link: string | null;
};

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch("/api/notifications");

        if (!res.ok) return;

        const data = await res.json();

        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } catch (err) {
        console.error(err);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

   return (
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <Bell size={20} />

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
          {unreadCount}
        </span>
      )}
    </button>

    {open && (
      <div className="absolute right-0 mt-2 w-96 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Notifications
          </h3>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={async () => {
                  try {
                    await fetch(
                      `/api/notifications/${notification.id}/read`,
                      {
                        method: "PATCH",
                      }
                    );

                    setNotifications((prev) =>
                      prev.map((n) =>
                        n.id === notification.id
                          ? { ...n, read: true }
                          : n
                      )
                    );

                    setUnreadCount((prev) =>
                      notification.read ? prev : Math.max(prev - 1, 0)
                    );

                    setOpen(false);

                    if (notification.link) {
                      router.push(notification.link);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className={`w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
                  notification.read
                    ? ""
                    : "bg-blue-50 dark:bg-slate-800"
                }`}
              >
                <div className="font-medium text-slate-900 dark:text-white">
                  {notification.title}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {notification.content}
                </p>

                {!notification.read && (
                  <span className="inline-block mt-2 text-xs text-blue-600 font-semibold">
                    New
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    )}
  </div>
);
}