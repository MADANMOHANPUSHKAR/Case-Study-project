"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

interface ScannerProps {
  onSuccess: (embedding: Float32Array) => void;
}

export default function BiometricScanner({ onSuccess }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("Loading Models...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [blinkDetected, setBlinkDetected] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        setStatus("Requesting Camera Access...");
        startVideo();
      } catch (e) {
        console.error(e);
        setStatus("Error loading face models.");
      }
    };
    loadModels();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setStatus("Camera access denied or unavailable.");
      });
  };

  const handleVideoPlay = async () => {
    if (!modelsLoaded) return;
    setStatus("Scanning... Please blink to verify liveness.");
    let scanActive = true;

    const scan = async () => {
      if (!scanActive || !videoRef.current || videoRef.current.paused || videoRef.current.ended) return;

      const detection = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        // Calculate Eye Aspect Ratio (EAR) for blink detection
        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        // Very basic EAR calc: height / width
        const getEAR = (eye: faceapi.Point[]) => {
          const w = Math.hypot(eye[3].x - eye[0].x, eye[3].y - eye[0].y);
          const h1 = Math.hypot(eye[5].x - eye[1].x, eye[5].y - eye[1].y);
          const h2 = Math.hypot(eye[4].x - eye[2].x, eye[4].y - eye[2].y);
          return (h1 + h2) / (2.0 * w);
        };

        const earThreshold = 0.25; // standard blink threshold
        const leftEAR = getEAR(leftEye);
        const rightEAR = getEAR(rightEye);
        const avgEAR = (leftEAR + rightEAR) / 2;

        if (avgEAR < earThreshold) {
          if (!blinkDetected) {
            setBlinkDetected(true);
            setStatus("Blink detected! Logging you in...");
            scanActive = false;
            onSuccess(detection.descriptor);
          }
        }
      }

      if (scanActive) {
        requestAnimationFrame(scan);
      }
    };

    scan();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-lg font-semibold mb-4">{status}</div>
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoPlay}
          className="w-[400px] h-[300px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-xl pointer-events-none opacity-50" />
      </div>
    </div>
  );
}
