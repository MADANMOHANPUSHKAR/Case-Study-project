"use client";

import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";
import BookingModal from "@/components/BookingModal";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  useEffect(() => {
    fetch("/api/facilities")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Facilities</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="h-40 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-4xl">{facility.type === "gym" ? "🏋️" : "🏊"}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Max Capacity: {facility.max_capacity}</p>
                <button 
                  onClick={() => setSelectedFacility(facility)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}

          {facilities.length === 0 && (
            <p className="text-gray-500 col-span-full">No facilities found. Ensure migrations are run and seeded.</p>
          )}
        </div>
      </div>

      {selectedFacility && (
        <BookingModal facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
      )}
    </main>
  );
}
