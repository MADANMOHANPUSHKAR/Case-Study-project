"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ bookings: 0, rsvps: 0, events: 0, facilities: 0 });
  const [loading, setLoading] = useState(true);

  // Hardcoded check for v1
  const IS_ADMIN = true;

  useEffect(() => {
    async function fetchStats() {
      if (!IS_ADMIN) return;
      try {
        const [facRes, bookRes, evRes, rsvpRes] = await Promise.all([
          supabase.from("facilities").select("*", { count: "exact", head: true }),
          supabase.from("facility_bookings").select("*", { count: "exact", head: true }),
          supabase.from("events").select("*", { count: "exact", head: true }),
          supabase.from("event_rsvps").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          facilities: facRes.count || 0,
          bookings: bookRes.count || 0,
          events: evRes.count || 0,
          rsvps: rsvpRes.count || 0,
        });
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [IS_ADMIN]);

  if (!IS_ADMIN) {
    return <div className="p-8 text-center text-red-500">Access Denied</div>;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        {loading ? (
          <p className="text-gray-500">Loading metrics...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-blue-600 mb-2">{stats.bookings}</span>
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Total Bookings</span>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-green-600 mb-2">{stats.rsvps}</span>
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Total RSVPs</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-purple-600 mb-2">{stats.events}</span>
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Events Hosted</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-orange-600 mb-2">{stats.facilities}</span>
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Facilities</span>
            </div>
          </div>
        )}
        
        <div className="mt-12 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition font-medium">Add Facility</button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition font-medium">Create Event</button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition font-medium">View Logs</button>
          </div>
        </div>
      </div>
    </main>
  );
}
