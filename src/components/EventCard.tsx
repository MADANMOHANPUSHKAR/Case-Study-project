"use client";

import { useState } from "react";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  currentUserId: string;
}

export default function EventCard({ event, currentUserId }: EventCardProps) {
  const [statusMsg, setStatusMsg] = useState("");
  const [rsvped, setRsvped] = useState(false);

  const handleRSVP = async () => {
    setStatusMsg("Registering...");
    try {
      const res = await fetch("/api/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: event.id,
          user_id: currentUserId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRsvped(true);
        setStatusMsg("RSVP Successful!");
      } else {
        setStatusMsg(data.error || "Failed to RSVP");
      }
    } catch (err) {
      setStatusMsg("Network error");
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${event.is_workshop ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
            {event.is_workshop ? "Workshop" : "Event"}
          </span>
          <h3 className="text-xl font-bold mt-2">{event.title}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
          <p className="text-xs text-gray-400">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{event.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm text-gray-500">Capacity: {event.capacity}</span>
        
        {rsvped ? (
          <span className="text-green-500 font-semibold">✓ Going</span>
        ) : (
          <button 
            onClick={handleRSVP}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!!statusMsg}
          >
            {statusMsg || "RSVP Now"}
          </button>
        )}
      </div>
    </div>
  );
}
