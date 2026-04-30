"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Facility } from "@/lib/types";

// Dynamically import BiometricScanner with ssr false
const BiometricScanner = dynamic(() => import("@/components/BiometricScanner"), {
  ssr: false,
  loading: () => <p>Loading camera...</p>,
});

interface BookingModalProps {
  facility: Facility;
  onClose: () => void;
}

export default function BookingModal({ facility, onClose }: BookingModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [step, setStep] = useState<"details" | "scan" | "success">("details");
  const [statusMsg, setStatusMsg] = useState("");

  const handleBooking = () => {
    if (!date || !time) {
      setStatusMsg("Please select a date and time");
      return;
    }
    setStep("scan");
  };

  const handleScanSuccess = async (embedding: Float32Array) => {
    setStatusMsg("Verifying face...");
    try {
      const authRes = await fetch("/api/auth/face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embedding: Array.from(embedding) }),
      });

      const authData = await authRes.json();

      if (!authRes.ok) {
        setStatusMsg(`Auth failed: ${authData.error}`);
        return;
      }

      const userId = authData.userId;

      // Mock start_time calculation
      const start_time = new Date(`${date}T${time}`).toISOString();
      const end_time = new Date(new Date(start_time).getTime() + 60 * 60 * 1000).toISOString();

      const bookRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facility_id: facility.id,
          user_id: userId,
          start_time,
          end_time,
        }),
      });

      const bookData = await bookRes.json();

      if (bookRes.ok) {
        setStep("success");
      } else {
        setStatusMsg(`Booking failed: ${bookData.error}`);
      }
    } catch (err: any) {
      setStatusMsg("Network error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-bold text-gray-500">X</button>
        
        {step === "details" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Book {facility.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Capacity: {facility.max_capacity}</p>
            
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Date</label>
              <input type="date" className="w-full border rounded-lg p-2 dark:bg-zinc-800 dark:border-zinc-700" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-semibold">Time Slot (1 hour)</label>
              <select className="w-full border rounded-lg p-2 dark:bg-zinc-800 dark:border-zinc-700" value={time} onChange={e => setTime(e.target.value)}>
                <option value="">Select a time</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>

            {statusMsg && <p className="text-red-500 mb-4">{statusMsg}</p>}

            <button onClick={handleBooking} className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition">
              Continue to Face Verification
            </button>
          </div>
        )}

        {step === "scan" && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Verify Identity to Book</h2>
            <p className="text-gray-500 mb-4">{statusMsg}</p>
            <BiometricScanner onSuccess={handleScanSuccess} />
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-8">
            <div className="text-5xl text-green-500 mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400">Your slot for {facility.name} has been secured.</p>
          </div>
        )}
      </div>
    </div>
  );
}
