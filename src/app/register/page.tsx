"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const BiometricScanner = dynamic(() => import("@/components/BiometricScanner"), {
  ssr: false,
  loading: () => <p>Loading camera...</p>,
});

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "scan">("details");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleNext = () => {
    if (!email || !fullName) {
      setStatusMsg("Please fill in all fields.");
      return;
    }

    // Email validation: Firstname.sirname@*students.sau.ac.in
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@[a-zA-Z0-9]+students\.sau\.ac\.in$/i;
    if (!emailRegex.test(email)) {
      setStatusMsg("Use college email (e.g. John.Doe@X0XXstudents.sau.ac.in)");
      return;
    }

    setStep("scan");
    setStatusMsg("");
  };

  const handleScanSuccess = async (embedding: Float32Array) => {
    setStatusMsg("Registering face in database...");
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          full_name: fullName,
          embedding: Array.from(embedding),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMsg("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setStatusMsg(`Failed: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg("Network error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        
        {step === "details" && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full border rounded-lg p-3 dark:bg-zinc-800 dark:border-zinc-700" 
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border rounded-lg p-3 dark:bg-zinc-800 dark:border-zinc-700" 
                placeholder="john@college.edu"
              />
            </div>
            {statusMsg && <p className="text-red-500 text-sm">{statusMsg}</p>}
            <button 
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Next: Scan Face
            </button>
          </div>
        )}

        {step === "scan" && (
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-4 text-center">Look at the camera and blink once to register your biometric profile securely.</p>
            {statusMsg && <p className="text-blue-500 font-semibold mb-4">{statusMsg}</p>}
            <BiometricScanner onSuccess={handleScanSuccess} />
          </div>
        )}
      </div>
    </main>
  );
}
