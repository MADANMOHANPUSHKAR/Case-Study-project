"use client";

import { useEffect, useState } from "react";
import type { Event } from "@/lib/types";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  // Mock logged in user for Phase 2 UI test
  const MOCK_USER_ID = "00000000-0000-0000-0000-000000000000";

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Events & Workshops</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Discover and register for upcoming activities.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} currentUserId={MOCK_USER_ID} />
          ))}

          {events.length === 0 && (
            <p className="text-gray-500 col-span-full">No events found. Ensure migrations are run and seeded.</p>
          )}
        </div>
      </div>
    </main>
  );
}
