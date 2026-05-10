"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchAyahs } from "../../features/surah/services/quranApi";
import { HeroSearch } from "./HeroSearch";

const QUICK_LINKS = [
  { id: 36, name: "Yasin" },
  { id: 67, name: "Mulk" },
  { id: 56, name: "Waqiah" },
  { id: 112, name: "Ikhlas" },
  { id: 18, name: "Kahf" },
];

const SURAH_NAMES: Record<number, string> = {
  1: "Al-Fatiha",
  2: "Al-Baqarah",
  3: "Ali Imran",
  4: "An-Nisa",
  5: "Al-Maidah",
  6: "Al-Anam",
  7: "Al-Araf",
  8: "Al-Anfal",
  9: "At-Tawbah",
  10: "Yunus",
  11: "Hud",
  12: "Yusuf",
  13: "Ar-Rad",
  14: "Ibrahim",
  15: "Al-Hijr",
  16: "An-Nahl",
  17: "Al-Isra",
  18: "Al-Kahf",
  19: "Maryam",
  20: "Ta-Ha",
  21: "Al-Anbya",
  22: "Al-Hajj",
  23: "Al-Muminun",
  24: "An-Nur",
  25: "Al-Furqan",
  26: "Ash-Shuara",
  27: "An-Naml",
  28: "Al-Qasas",
  29: "Al-Ankabut",
  30: "Ar-Rum",
  31: "Luqman",
  32: "As-Sajdah",
  33: "Al-Ahzab",
  34: "Saba",
  35: "Fatir",
  36: "Ya-Sin",
  37: "As-Saffat",
  38: "Sad",
  39: "Az-Zumar",
  40: "Ghafir",
  41: "Fussilat",
  42: "Ash-Shuraa",
  43: "Az-Zukhruf",
  44: "Ad-Dukhan",
  45: "Al-Jathiyah",
  46: "Al-Ahqaf",
  47: "Muhammad",
  48: "Al-Fath",
  49: "Al-Hujurat",
  50: "Qaf",
  51: "Adh-Dhariyat",
  52: "At-Tur",
  53: "An-Najm",
  54: "Al-Qamar",
  55: "Ar-Rahman",
  56: "Al-Waqiah",
  57: "Al-Hadid",
  58: "Al-Mujadila",
  59: "Al-Hashr",
  60: "Al-Mumtahanah",
  61: "As-Saf",
  62: "Al-Jumuah",
  63: "Al-Munafiqun",
  64: "At-Taghabun",
  65: "At-Talaq",
  66: "At-Tahrim",
  67: "Al-Mulk",
  68: "Al-Qalam",
  69: "Al-Haqqah",
  70: "Al-Maarij",
  71: "Nuh",
  72: "Al-Jinn",
  73: "Al-Muzzammil",
  74: "Al-Muddaththir",
  75: "Al-Qiyamah",
  76: "Al-Insan",
  77: "Al-Mursalat",
  78: "An-Naba",
  79: "An-Naziat",
  80: "Abasa",
  81: "At-Takwir",
  82: "Al-Infitar",
  83: "Al-Mutaffifin",
  84: "Al-Inshiqaq",
  85: "Al-Buruj",
  86: "At-Tariq",
  87: "Al-Ala",
  88: "Al-Ghashiyah",
  89: "Al-Fajr",
  90: "Al-Balad",
  91: "Ash-Shams",
  92: "Al-Layl",
  93: "Ad-Duhaa",
  94: "Ash-Sharh",
  95: "At-Tin",
  96: "Al-Alaq",
  97: "Al-Qadr",
  98: "Al-Bayyinah",
  99: "Az-Zalzalah",
  100: "Al-Adiyat",
  101: "Al-Qariah",
  102: "At-Takathur",
  103: "Al-Asr",
  104: "Al-Humazah",
  105: "Al-Fil",
  106: "Quraysh",
  107: "Al-Maun",
  108: "Al-Kawthar",
  109: "Al-Kafirun",
  110: "An-Nasr",
  111: "Al-Masad",
  112: "Al-Ikhlas",
  113: "Al-Falaq",
  114: "An-Nas",
};

function LanternLeft() {
  return (
    <svg
      width="60"
      height="140"
      viewBox="0 0 60 140"
      fill="none"
      className="absolute left-4 top-0 opacity-30 dark:opacity-25 pointer-events-none select-none z-10"
    >
      <line x1="30" y1="0" x2="30" y2="30" stroke="#4caf50" strokeWidth="1.5" />
      <ellipse cx="30" cy="32" rx="12" ry="5" fill="#4caf50" />
      <path
        d="M16,36 Q10,70 16,104 L44,104 Q50,70 44,36 Z"
        fill="#81c784"
        stroke="#4caf50"
        strokeWidth="1"
      />
      <line
        x1="14"
        y1="58"
        x2="46"
        y2="58"
        stroke="#4caf50"
        strokeWidth="0.8"
      />
      <line
        x1="13"
        y1="76"
        x2="47"
        y2="76"
        stroke="#4caf50"
        strokeWidth="0.8"
      />
      <line
        x1="14"
        y1="93"
        x2="46"
        y2="93"
        stroke="#4caf50"
        strokeWidth="0.8"
      />
      <ellipse cx="30" cy="104" rx="12" ry="5" fill="#4caf50" />
      <line
        x1="30"
        y1="109"
        x2="30"
        y2="125"
        stroke="#4caf50"
        strokeWidth="1.2"
      />
      <ellipse cx="30" cy="127" rx="4" ry="4" fill="#4caf50" />
      <ellipse cx="30" cy="70" rx="8" ry="10" fill="#fff9c4" opacity="0.5" />
    </svg>
  );
}

function LanternRight() {
  return (
    <svg
      width="50"
      height="115"
      viewBox="0 0 50 115"
      fill="none"
      className="absolute right-6 top-0 opacity-30 dark:opacity-25 pointer-events-none select-none z-10"
    >
      <line x1="25" y1="0" x2="25" y2="24" stroke="#4caf50" strokeWidth="1.5" />
      <ellipse cx="25" cy="26" rx="10" ry="4" fill="#4caf50" />
      <path
        d="M13,30 Q8,58 13,84 L37,84 Q42,58 37,30 Z"
        fill="#81c784"
        stroke="#4caf50"
        strokeWidth="1"
      />
      <line
        x1="12"
        y1="48"
        x2="38"
        y2="48"
        stroke="#4caf50"
        strokeWidth="0.8"
      />
      <line
        x1="11"
        y1="63"
        x2="39"
        y2="63"
        stroke="#4caf50"
        strokeWidth="0.8"
      />
      <line
        x1="12"
        y1="77"
        x2="38"
        y2="77"
        stroke="#4caf50"
        strokeWidth="0.8"
      />
      <ellipse cx="25" cy="84" rx="10" ry="4" fill="#4caf50" />
      <line
        x1="25"
        y1="88"
        x2="25"
        y2="100"
        stroke="#4caf50"
        strokeWidth="1.2"
      />
      <ellipse cx="25" cy="102" rx="3" ry="3" fill="#4caf50" />
      <ellipse cx="25" cy="57" rx="6" ry="8" fill="#fff9c4" opacity="0.5" />
    </svg>
  );
}

function MosqueBackground() {
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Sky gradient ── */}
      <defs>
        <radialGradient id="glowLight" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowDark" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#064e3b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        {/* Islamic 8-point star pattern */}
        {/* <pattern id="islamicPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g opacity="0.07" fill="none" stroke="currentColor" strokeWidth="0.5">
            <polygon points="30,5 35,22 52,22 39,32 44,49 30,39 16,49 21,32 8,22 25,22"/>
            <circle cx="30" cy="30" r="12"/>
          </g>
        </pattern> */}
      </defs>

      {/* Pattern overlay */}
      <rect
        width="1440"
        height="520"
        fill="url(#islamicPattern)"
        className="text-emerald-800 dark:text-emerald-300"
      />

      {/* Atmospheric glow — light mode */}
      <ellipse
        cx="720"
        cy="380"
        rx="500"
        ry="200"
        className="fill-emerald-200 dark:fill-transparent"
        opacity="0.35"
      />

      {/* ── Far background: hazy city horizon ── */}
      <g opacity="0.12" className="fill-emerald-800 dark:fill-emerald-200">
        {/* distant minarets */}
        <rect x="60" y="300" width="8" height="120" />
        <polygon points="64,300 60,315 68,315" />
        <rect x="160" y="310" width="7" height="110" />
        <polygon points="163,310 159,324 167,324" />
        <rect x="1270" y="305" width="8" height="115" />
        <polygon points="1274,305 1270,319 1278,319" />
        <rect x="1370" y="298" width="7" height="122" />
        <polygon points="1373,298 1369,312 1377,312" />
        {/* distant domes */}
        <ellipse cx="240" cy="340" rx="40" ry="20" />
        <ellipse cx="1200" cy="335" rx="40" ry="20" />
      </g>

      {/* ── Mid layer: secondary mosque ── */}
      <g opacity="0.22" className="fill-emerald-700 dark:fill-emerald-300">
        {/* left minaret */}
        <rect x="280" y="250" width="16" height="170" />
        <polygon points="288,250 280,275 296,275" />
        <ellipse cx="288" cy="248" rx="5" ry="8" />
        {/* right minaret */}
        <rect x="1144" y="250" width="16" height="170" />
        <polygon points="1152,250 1144,275 1160,275" />
        <ellipse cx="1152" cy="248" rx="5" ry="8" />
        {/* main body */}
        <rect x="310" y="320" width="820" height="100" />
        {/* central dome */}
        <ellipse cx="720" cy="318" rx="110" ry="55" />
        <rect x="610" y="318" width="220" height="10" />
        {/* side domes */}
        <ellipse cx="460" cy="338" rx="70" ry="35" />
        <rect x="390" y="338" width="140" height="8" />
        <ellipse cx="980" cy="338" rx="70" ry="35" />
        <rect x="910" y="338" width="140" height="8" />
        {/* arched windows */}
        {[400, 460, 520, 680, 720, 760, 920, 980, 1040].map((x, i) => (
          <g key={i}>
            <rect x={x} y="350" width="22" height="40" rx="11" />
          </g>
        ))}
      </g>

      {/* ── Front layer: main grand mosque ── */}
      <g className="fill-emerald-900 dark:fill-emerald-950" opacity="0.85">
        {/* Far-left minaret */}
        <rect x="100" y="180" width="22" height="240" />
        <rect x="96" y="230" width="30" height="8" rx="2" />
        <rect x="96" y="290" width="30" height="8" rx="2" />
        <polygon points="111,180 100,212 122,212" />
        <ellipse cx="111" cy="176" rx="7" ry="11" />
        {/* crescent */}
        <path
          d="M111,162 Q118,169 111,176 Q106,168 111,162Z"
          fill="#10b981"
          opacity="0.8"
        />

        {/* Far-right minaret */}
        <rect x="1318" y="180" width="22" height="240" />
        <rect x="1314" y="230" width="30" height="8" rx="2" />
        <rect x="1314" y="290" width="30" height="8" rx="2" />
        <polygon points="1329,180 1318,212 1340,212" />
        <ellipse cx="1329" cy="176" rx="7" ry="11" />
        <path
          d="M1329,162 Q1336,169 1329,176 Q1324,168 1329,162Z"
          fill="#10b981"
          opacity="0.8"
        />

        {/* Inner-left minaret */}
        <rect x="370" y="220" width="18" height="200" />
        <rect x="367" y="265" width="24" height="6" rx="2" />
        <rect x="367" y="315" width="24" height="6" rx="2" />
        <polygon points="379,220 370,248 388,248" />
        <ellipse cx="379" cy="217" rx="6" ry="9" />
        <path
          d="M379,205 Q385,211 379,217 Q374,210 379,205Z"
          fill="#10b981"
          opacity="0.8"
        />

        {/* Inner-right minaret */}
        <rect x="1052" y="220" width="18" height="200" />
        <rect x="1049" y="265" width="24" height="6" rx="2" />
        <rect x="1049" y="315" width="24" height="6" rx="2" />
        <polygon points="1061,220 1052,248 1070,248" />
        <ellipse cx="1061" cy="217" rx="6" ry="9" />
        <path
          d="M1061,205 Q1067,211 1061,217 Q1056,210 1061,205Z"
          fill="#10b981"
          opacity="0.8"
        />

        {/* Main mosque body */}
        <rect x="130" y="370" width="1180" height="150" />

        {/* Side wings */}
        <rect x="130" y="340" width="260" height="30" />
        <rect x="1050" y="340" width="260" height="30" />

        {/* Left side dome */}
        <path d="M200,340 Q270,285 340,340Z" />
        <rect x="200" y="336" width="140" height="6" />

        {/* Right side dome */}
        <path d="M1100,340 Q1170,285 1240,340Z" />
        <rect x="1100" y="336" width="140" height="6" />

        {/* Central large dome */}
        <path d="M540,370 Q720,240 900,370Z" />
        <rect x="540" y="364" width="360" height="8" />
        {/* dome ribbing */}
        <line
          x1="720"
          y1="244"
          x2="620"
          y2="370"
          stroke="#059669"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="720"
          y1="244"
          x2="660"
          y2="370"
          stroke="#059669"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="720"
          y1="244"
          x2="700"
          y2="370"
          stroke="#059669"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="720"
          y1="244"
          x2="740"
          y2="370"
          stroke="#059669"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="720"
          y1="244"
          x2="780"
          y2="370"
          stroke="#059669"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="720"
          y1="244"
          x2="820"
          y2="370"
          stroke="#059669"
          strokeWidth="0.8"
          opacity="0.4"
        />
        {/* dome finial */}
        <line
          x1="720"
          y1="240"
          x2="720"
          y2="224"
          stroke="#10b981"
          strokeWidth="2"
        />
        <ellipse cx="720" cy="222" rx="5" ry="8" />
        <path
          d="M720,208 Q727,215 720,222 Q715,214 720,208Z"
          fill="#10b981"
          opacity="0.9"
        />

        {/* Arched gate - center */}
        <rect x="680" y="400" width="80" height="120" rx="40 40 0 0" />

        {/* Arched windows row */}
        {[160, 220, 280, 440, 500, 920, 980, 1100, 1160, 1220].map((x, i) => (
          <rect key={i} x={x} y="390" width="30" height="55" rx="15 15 0 0" />
        ))}
        {/* Second row smaller windows */}
        {[190, 350, 510, 870, 1030, 1190].map((x, i) => (
          <rect
            key={i}
            x={x}
            y="355"
            width="20"
            height="30"
            rx="10 10 0 0"
            opacity="0.6"
          />
        ))}

        {/* Decorative horizontal band */}
        <rect x="130" y="385" width="1180" height="4" opacity="0.4" />
        <rect x="130" y="350" width="1180" height="2" opacity="0.3" />

        {/* Courtyard wall extends to edges */}
        <rect x="0" y="410" width="130" height="110" />
        <rect x="1310" y="410" width="130" height="110" />
      </g>

      {/* ── Ground plane ── */}
      <rect
        x="0"
        y="490"
        width="1440"
        height="30"
        className="fill-emerald-900 dark:fill-emerald-950"
        opacity="0.9"
      />

      {/* ── Atmospheric overlay gradients ── */}
      {/* Bottom fade to page bg */}
      <rect
        x="0"
        y="380"
        width="1440"
        height="140"
        fill="url(#fadeBottom)"
        opacity="1"
      />
      <defs>
        <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop
            offset="100%"
            stopColor="white"
            className="[stop-color:white] dark:[stop-color:black]"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HeroSection() {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRandomAyah = async () => {
    const randomSurahId = Math.floor(Math.random() * 114) + 1;
    const ayahs = await fetchAyahs(randomSurahId);
    const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
    return {
      ...randomAyah,
      surahName: SURAH_NAMES[randomSurahId] || `Surah ${randomSurahId}`,
    };
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        const initial = await Promise.all([
          fetchRandomAyah(),
          fetchRandomAyah(),
          fetchRandomAyah(),
        ]);
        setSlides(initial);
      } catch (err) {
        console.error("Failed to load slides:", err);
      }
    };
    loadInitial();
  }, []);

  useEffect(() => {
    if (slides.length === 0 || isPaused) return;
    intervalRef.current = setInterval(async () => {
      try {
        const next = await fetchRandomAyah();
        setSlides((prev) => [...prev, next]);
        setCurrentSlide((prev) => prev + 1);
      } catch {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length, isPaused]);

  return (
    <section className="relative w-full min-h-[640px] flex flex-col items-center justify-center pt-16 pb-36 border-b border-emerald-100 dark:border-emerald-950 bg-gradient-to-b from-[#f0fdf4] via-[#ecfdf5] to-white dark:from-[#020c07] dark:via-[#021a0e] dark:to-[#000000]">
      {/* ── Layer 1: Islamic geometric pattern overlay ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23059669' stroke-width='0.5'%3E%3Cpolygon points='40,4 46,22 65,22 51,33 56,51 40,41 24,51 29,33 15,22 34,22'/%3E%3Ccircle cx='40' cy='40' r='18'/%3E%3Crect x='22' y='22' width='36' height='36' transform='rotate(45 40 40)'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* ── Layer 2: Radial atmospheric glow ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Light mode: warm sunrise glow from center-bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-emerald-200/40 dark:bg-transparent blur-[120px]" />
        {/* Dark mode: deep moon glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-transparent dark:bg-emerald-900/20 blur-[100px]" />
        {/* Top ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-emerald-100/30 dark:bg-emerald-950/40 blur-[80px]" />
      </div>

      {/* ── Layer 3: Grand mosque SVG illustration ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <MosqueBackground />
      </div>

      {/* ── Layer 4: Lanterns (above mosque, below content) ── */}
      <LanternLeft />
      <LanternRight />

      {/* ── Layer 5: Content ── */}
      <div className="container mx-auto px-6 relative z-20 space-y-10">
        {/* Main heading */}
        <div className="text-center space-y-3">
          {/* <img
    src="/arabic.png"
    alt="Bismillah ir-Rahman ir-Rahim"
    className="hidden dark:inline-block w-24 h-auto"
  /> */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-[0.15em] text-emerald-950 dark:text-white uppercase drop-shadow-sm">
            Quran Mazid
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400 dark:to-emerald-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400 dark:to-emerald-600" />
          </div>
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-700/60 dark:text-emerald-400/50 font-medium">
            Read · Study · Learn
          </p>
        </div>

        {/* Ayah Slider */}
        <div
          className="h-28 md:h-32 flex items-center justify-center cursor-pointer"
          onClick={() => setIsPaused((p) => !p)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title={isPaused ? "Click to resume" : "Click to pause"}
        >
          <AnimatePresence mode="wait">
            {slides.length > 0 ? (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-center space-y-3 max-w-3xl relative"
              >
                {isPaused && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/60">
                    ⏸ paused
                  </span>
                )}
                <p className="text-base md:text-lg text-emerald-900/80 dark:text-emerald-100/70 font-medium italic leading-relaxed line-clamp-2 px-4">
                  "
                  {slides[currentSlide].translation_text?.replace(
                    /<[^>]*>?/gm,
                    "",
                  ) || ""}
                  "
                </p>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">
                  [ {slides[currentSlide].surahName} :{" "}
                  {slides[currentSlide].verse_key?.split(":")[1]} ]
                </p>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const i = currentSlide + offset;
                    if (i < 0 || i >= slides.length) return null;
                    return (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(i);
                        }}
                        className={`rounded-full transition-all ${
                          i === currentSlide
                            ? "w-4 h-1.5 bg-emerald-500"
                            : "w-1.5 h-1.5 bg-emerald-300 dark:bg-emerald-700"
                        }`}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="h-16 w-56 bg-emerald-100 dark:bg-emerald-900/20 rounded-full animate-pulse" />
            )}
          </AnimatePresence>
        </div>

        {/* Search & Quick Links */}
        <div className="max-w-2xl mx-auto w-full space-y-5">
          <HeroSearch />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-emerald-700/40 dark:text-emerald-500/40 uppercase tracking-widest mr-1"></span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.id}
                href={`/surah/${link.id}`}
                className="px-4 py-1.5 bg-white/70 dark:bg-emerald-950/60 backdrop-blur-sm hover:bg-emerald-500 dark:hover:bg-emerald-700 hover:text-white text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-full transition-all border border-emerald-200 dark:border-emerald-800/60 shadow-sm active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
