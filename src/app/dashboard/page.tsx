"use client";

import { useEffect, useState } from "react";
import type { FacilityBooking, EventRSVP } from "@/lib/types";

// Mock user for phase 3 execution
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000000";

type UnifiedItem = {
  id: string;
  type: "booking" | "rsvp";
  title: string;
  date: Date;
  status: string;
};

export default function DashboardPage() {
  const [items, setItems] = useState<UnifiedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, rsvpsRes] = await Promise.all([
          fetch(`/api/bookings?user_id=${MOCK_USER_ID}`),
          fetch(`/api/rsvps?user_id=${MOCK_USER_ID}`),
        ]);

        const bookings: any[] = await bookingsRes.json();
        const rsvps: any[] = await rsvpsRes.json();

        const unified: UnifiedItem[] = [
          ...bookings.map((b) => ({
            id: b.id,
            type: "booking" as const,
            title: `Facility: ${b.facilities?.name || "Unknown"}`,
            date: new Date(b.start_time),
            status: b.status,
          })),
          ...rsvps.map((r) => ({
            id: r.id,
            type: "rsvp" as const,
            title: `Event: ${r.events?.title || "Unknown"}`,
            date: new Date(r.events?.date || Date.now()),
            status: r.status,
          })),
        ];

        // Sort by upcoming
        unified.sort((a, b) => a.date.getTime() - b.date.getTime());
        setItems(unified);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>
        
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Upcoming Schedule</h2>
          
          {loading ? (
            <p className="text-gray-500">Loading your schedule...</p>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You have no upcoming bookings or events.</p>
              <div className="flex justify-center gap-4">
                <a href="/facilities" className="text-blue-600 hover:underline font-medium">Book a facility</a>
                <a href="/events" className="text-blue-600 hover:underline font-medium">Find an event</a>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-2xl">
                      {item.type === "booking" ? "🏢" : "📅"}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.date.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300">
                      {item.status.toUpperCase()}
                    </span>
                    <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded transition text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
