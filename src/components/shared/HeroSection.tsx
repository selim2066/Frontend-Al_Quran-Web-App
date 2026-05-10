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
  1: "Al-Fatiha", 2: "Al-Baqarah", 3: "Ali Imran", 4: "An-Nisa",
  5: "Al-Maidah", 6: "Al-Anam", 7: "Al-Araf", 8: "Al-Anfal",
  9: "At-Tawbah", 10: "Yunus", 11: "Hud", 12: "Yusuf",
  13: "Ar-Rad", 14: "Ibrahim", 15: "Al-Hijr", 16: "An-Nahl",
  17: "Al-Isra", 18: "Al-Kahf", 19: "Maryam", 20: "Ta-Ha",
  21: "Al-Anbya", 22: "Al-Hajj", 23: "Al-Muminun", 24: "An-Nur",
  25: "Al-Furqan", 26: "Ash-Shuara", 27: "An-Naml", 28: "Al-Qasas",
  29: "Al-Ankabut", 30: "Ar-Rum", 31: "Luqman", 32: "As-Sajdah",
  33: "Al-Ahzab", 34: "Saba", 35: "Fatir", 36: "Ya-Sin",
  37: "As-Saffat", 38: "Sad", 39: "Az-Zumar", 40: "Ghafir",
  41: "Fussilat", 42: "Ash-Shuraa", 43: "Az-Zukhruf", 44: "Ad-Dukhan",
  45: "Al-Jathiyah", 46: "Al-Ahqaf", 47: "Muhammad", 48: "Al-Fath",
  49: "Al-Hujurat", 50: "Qaf", 51: "Adh-Dhariyat", 52: "At-Tur",
  53: "An-Najm", 54: "Al-Qamar", 55: "Ar-Rahman", 56: "Al-Waqiah",
  57: "Al-Hadid", 58: "Al-Mujadila", 59: "Al-Hashr", 60: "Al-Mumtahanah",
  61: "As-Saf", 62: "Al-Jumuah", 63: "Al-Munafiqun", 64: "At-Taghabun",
  65: "At-Talaq", 66: "At-Tahrim", 67: "Al-Mulk", 68: "Al-Qalam",
  69: "Al-Haqqah", 70: "Al-Maarij", 71: "Nuh", 72: "Al-Jinn",
  73: "Al-Muzzammil", 74: "Al-Muddaththir", 75: "Al-Qiyamah", 76: "Al-Insan",
  77: "Al-Mursalat", 78: "An-Naba", 79: "An-Naziat", 80: "Abasa",
  81: "At-Takwir", 82: "Al-Infitar", 83: "Al-Mutaffifin", 84: "Al-Inshiqaq",
  85: "Al-Buruj", 86: "At-Tariq", 87: "Al-Ala", 88: "Al-Ghashiyah",
  89: "Al-Fajr", 90: "Al-Balad", 91: "Ash-Shams", 92: "Al-Layl",
  93: "Ad-Duhaa", 94: "Ash-Sharh", 95: "At-Tin", 96: "Al-Alaq",
  97: "Al-Qadr", 98: "Al-Bayyinah", 99: "Az-Zalzalah", 100: "Al-Adiyat",
  101: "Al-Qariah", 102: "At-Takathur", 103: "Al-Asr", 104: "Al-Humazah",
  105: "Al-Fil", 106: "Quraysh", 107: "Al-Maun", 108: "Al-Kawthar",
  109: "Al-Kafirun", 110: "An-Nasr", 111: "Al-Masad", 112: "Al-Ikhlas",
  113: "Al-Falaq", 114: "An-Nas",
};

function LanternLeft() {
  return (
    <svg width="60" height="140" viewBox="0 0 60 140" fill="none" className="absolute left-4 top-0 opacity-40 dark:opacity-20 pointer-events-none select-none">
      <line x1="30" y1="0" x2="30" y2="30" stroke="#4caf50" strokeWidth="1.5"/>
      <ellipse cx="30" cy="32" rx="12" ry="5" fill="#4caf50"/>
      <path d="M16,36 Q10,70 16,104 L44,104 Q50,70 44,36 Z" fill="#81c784" stroke="#4caf50" strokeWidth="1"/>
      <line x1="14" y1="58" x2="46" y2="58" stroke="#4caf50" strokeWidth="0.8"/>
      <line x1="13" y1="76" x2="47" y2="76" stroke="#4caf50" strokeWidth="0.8"/>
      <line x1="14" y1="93" x2="46" y2="93" stroke="#4caf50" strokeWidth="0.8"/>
      <ellipse cx="30" cy="104" rx="12" ry="5" fill="#4caf50"/>
      <line x1="30" y1="109" x2="30" y2="125" stroke="#4caf50" strokeWidth="1.2"/>
      <ellipse cx="30" cy="127" rx="4" ry="4" fill="#4caf50"/>
      <ellipse cx="30" cy="70" rx="8" ry="10" fill="#fff9c4" opacity="0.4"/>
    </svg>
  );
}

function LanternRight() {
  return (
    <svg width="50" height="115" viewBox="0 0 50 115" fill="none" className="absolute right-6 top-0 opacity-40 dark:opacity-20 pointer-events-none select-none">
      <line x1="25" y1="0" x2="25" y2="24" stroke="#4caf50" strokeWidth="1.5"/>
      <ellipse cx="25" cy="26" rx="10" ry="4" fill="#4caf50"/>
      <path d="M13,30 Q8,58 13,84 L37,84 Q42,58 37,30 Z" fill="#81c784" stroke="#4caf50" strokeWidth="1"/>
      <line x1="12" y1="48" x2="38" y2="48" stroke="#4caf50" strokeWidth="0.8"/>
      <line x1="11" y1="63" x2="39" y2="63" stroke="#4caf50" strokeWidth="0.8"/>
      <line x1="12" y1="77" x2="38" y2="77" stroke="#4caf50" strokeWidth="0.8"/>
      <ellipse cx="25" cy="84" rx="10" ry="4" fill="#4caf50"/>
      <line x1="25" y1="88" x2="25" y2="100" stroke="#4caf50" strokeWidth="1.2"/>
      <ellipse cx="25" cy="102" rx="3" ry="3" fill="#4caf50"/>
      <ellipse cx="25" cy="57" rx="6" ry="8" fill="#fff9c4" opacity="0.4"/>
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

  // Load initial 3 slides
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

  // Auto-advance + fetch next random ayah in background
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
    <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center pt-16 pb-28  bg-gradient-to-b from-green-50 to-white dark:from-background dark:to-background border-b border-border/10">

      {/* Arabic bg watermark */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-0 text-[18rem] font-serif -translate-x-1/3 -translate-y-1/3 text-green-900 dark:text-foreground">قرآن</div>
        <div className="absolute bottom-0 right-0 text-[18rem] font-serif translate-x-1/3 translate-y-1/3 text-green-900 dark:text-foreground">مجيد</div>
      </div>

      {/* Lanterns */}
      <LanternLeft />
      <LanternRight />

      <div className="container mx-auto px-6 relative z-10 space-y-10">

        {/* Main heading */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-[0.15em] text-green-900 dark:text-foreground uppercase">
            Quran Mazid
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-green-400 dark:bg-primary/40"/>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-primary"/>
            <div className="h-px w-16 bg-green-400 dark:bg-primary/40"/>
          </div>
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
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-primary/60">
                    ⏸ paused
                  </span>
                )}
                <p className="text-base md:text-lg text-green-900/70 dark:text-muted-foreground font-medium italic leading-relaxed line-clamp-2">
                  "{slides[currentSlide].translation_text?.replace(/<[^>]*>?/gm, "") || ""}"
                </p>
                <p className="text-[11px] font-bold text-green-600 dark:text-primary uppercase tracking-[0.3em]">
                  [ {slides[currentSlide].surahName} : {slides[currentSlide].verse_key?.split(":")[1]} ]
                </p>

                {/* Windowed dots */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const i = currentSlide + offset;
                    if (i < 0 || i >= slides.length) return null;
                    return (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                        className={`rounded-full transition-all ${
                          i === currentSlide
                            ? "w-4 h-1.5 bg-green-500 dark:bg-primary"
                            : "w-1.5 h-1.5 bg-green-300 dark:bg-primary/30"
                        }`}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="h-16 w-56 bg-green-100 dark:bg-primary/5 rounded-full animate-pulse" />
            )}
          </AnimatePresence>
        </div>

        {/* Search & Quick Links */}
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <HeroSearch />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-green-700/50 dark:text-muted-foreground uppercase tracking-widest mr-1">
              Quick Links:
            </span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.id}
                href={`/surah/${link.id}`}
                className="px-4 py-1.5 bg-white dark:bg-secondary/50 hover:bg-green-500 dark:hover:bg-primary hover:text-white text-green-800 dark:text-foreground/70 text-xs font-bold rounded-full transition-all border border-green-200 dark:border-border/40 shadow-sm active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mosque Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path
            d="M0,160 L0,120 L40,105 L80,120 L110,88 L140,120 L170,100
               L200,80 L230,100 L255,82 L280,120
               L320,82 L340,100 L360,78 L380,100 L400,120
               L430,100 L460,78 L490,100 L520,120
               L560,100 L590,75 L620,100 L650,88 L680,120
               L720,88 L750,75 L780,100 L810,88 L840,120
               L880,100 L910,78 L940,100 L970,120
               L1000,100 L1030,82 L1060,100 L1080,120
               L1110,100 L1140,80 L1170,100 L1200,88 L1230,120
               L1260,100 L1300,88 L1330,120 L1360,105 L1400,120 L1440,160 Z"
            className="fill-green-200 dark:fill-primary/10"
            opacity="0.6"
          />
          <path
            d="M0,160 L0,132 L50,118 L100,132 L130,108 L160,132 L200,115
               L230,95 L260,115 L290,100 L310,132
               L350,100 L380,118 L410,132
               L450,115 L480,95 L510,115 L540,132
               L580,115 L610,92 L640,115 L670,108 L700,132
               L740,108 L770,92 L800,115 L830,108 L860,132
               L900,115 L930,95 L960,115 L990,132
               L1030,115 L1060,100 L1090,115 L1110,132
               L1150,115 L1180,95 L1210,115 L1240,108 L1270,132
               L1310,118 L1360,132 L1400,118 L1440,132 L1440,160 Z"
            className="fill-green-300 dark:fill-primary/20"
            opacity="0.4"
          />
        </svg>
      </div>
    </section>
  );
}