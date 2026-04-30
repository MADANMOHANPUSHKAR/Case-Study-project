"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BiometricScanner = dynamic(() => import("@/components/BiometricScanner"), {
  ssr: false,
  loading: () => <p>Loading scanner...</p>
});

export default function LoginPage() {
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  const handleFaceSuccess = async (embedding: Float32Array) => {
    try {
      const response = await fetch("/api/auth/face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ embedding: Array.from(embedding) }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthStatus("Login Successful! Redirecting to Dashboard...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setAuthStatus(`Login Failed: ${data.error}`);
      }
    } catch (err) {
      setAuthStatus("Network error occurred during login.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-2">Secure Face Login</h1>
      <p className="text-gray-500 mb-8">
        New here? <a href="/register" className="text-blue-500 hover:underline">Register your face</a>
      </p>
      
      {!authStatus ? (
        <BiometricScanner onSuccess={handleFaceSuccess} />
      ) : (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xl font-semibold mb-4">{authStatus}</p>
          <a href="/" className="text-blue-500 hover:underline">Return Home</a>
        </div>
      )}
    </main>
  );
}
