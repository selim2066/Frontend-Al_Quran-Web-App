"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dhikrWords = [
  "SubhanAllah",
  "Alhamdulillah",
  "Allahu Akbar",
  "La ilaha illallah",
];

export default function NotFound() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % dhikrWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-[#050A07] text-center px-6 overflow-hidden">

      {/* Green Futuristic Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/20 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-400/10 blur-[140px] rounded-full animate-pulse" />
      </div>

      {/* 404 small label */}
      <p className="text-green-400/60 tracking-widest text-sm mb-6">
        ERROR 404 • PAGE NOT FOUND
      </p>

      {/* MAIN HERO WORD (FOCUS) */}
      <div className="relative h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={dhikrWords[index]}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-green-400 drop-shadow-[0_0_40px_rgba(34,197,94,0.6)] tracking-wide"
          >
            {dhikrWords[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Supporting text */}
      <div className="mt-6 max-w-md space-y-3">
        <h2 className="text-white text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="text-green-100/60 text-sm leading-relaxed">
          This page doesn’t exist or has been moved.  
          But remember —
          <span className="text-green-300 font-medium"> everything happens by the will of Allah.</span>
        </p>

        <p className="text-green-300/80 text-sm italic">
          “Indeed, with hardship comes ease.” (Qur’an 94:6)
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Link
          href="/"
          className="px-8 py-4 rounded-2xl bg-green-500/20 border border-green-400/30 text-green-300 hover:bg-green-500/30 transition flex items-center gap-2"
        >
          <Home size={18} />
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-8 py-4 rounded-2xl bg-black/40 border border-green-400/20 text-green-200 hover:bg-black/60 transition flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

      {/* subtle bottom spiritual note */}
      <p className="absolute bottom-6 text-xs text-green-500/40 tracking-wide">
        Remember Allah often • SubhanAllah
      </p>
    </div>
  );
}