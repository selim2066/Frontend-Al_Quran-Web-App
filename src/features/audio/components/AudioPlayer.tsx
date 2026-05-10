"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, X, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuranStore } from "@/store/useQuranStore";
import { useQuery } from "@tanstack/react-query";
import { fetchSurahs, fetchAyahs } from "../../surah/services/quranApi";

export function AudioPlayer() {
  const { selectedSurah, currentAyah, setCurrentAyah, setIsAudioActive } = useQuranStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSurahMode, setIsSurahMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  const { data: ayahs } = useQuery({
    queryKey: ["ayahs", selectedSurah],
    queryFn: () => fetchAyahs(selectedSurah!),
    enabled: !!selectedSurah,
  });

  const currentSurah = surahs?.find(s => s.id === selectedSurah);

  const getAyahAudioUrl = (verseKey: string) => {
    const [s, a] = verseKey.split(":");
    return `https://www.everyayah.com/data/Alafasy_128kbps/${s.padStart(3, "0")}${a.padStart(3, "0")}.mp3`;
  };

  const getSurahAudioUrl = (surahId: number) =>
    `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surahId}.mp3`;

  const audioUrl = isSurahMode && selectedSurah
    ? getSurahAudioUrl(selectedSurah)
    : currentAyah
    ? getAyahAudioUrl(currentAyah)
    : "";

  // Step 1 — scroll to ayah in DOM
  const scrollToAyah = (verseKey: string) => {
    const el = document.getElementById(`ayah-${verseKey}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Activate when ayah is selected
  useEffect(() => {
    if (currentAyah) {
      setIsActive(true);
      setIsPlaying(true);
      setIsAudioActive(true);
      setIsSurahMode(false);
    }
  }, [currentAyah]);

  // Play audio when URL or active state changes
  useEffect(() => {
    if (audioRef.current && audioUrl && isActive) {
      audioRef.current.src = audioUrl;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  }, [audioUrl, isActive]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsActive(true);
      setIsAudioActive(true);
    }
    setIsPlaying(!isPlaying);
  };

  const playSurah = () => {
    setIsSurahMode(true);
    setCurrentAyah(null);
    setIsActive(true);
    setIsPlaying(true);
    setIsAudioActive(true);
  };

  const skipForward = () => {
    if (!ayahs || !currentAyah) return;
    const idx = ayahs.findIndex(a => a.verse_key === currentAyah);
    if (idx !== -1 && idx < ayahs.length - 1) {
      const nextVerse = ayahs[idx + 1].verse_key;
      setCurrentAyah(nextVerse);
      scrollToAyah(nextVerse);
    }
  };

  const skipBack = () => {
    if (!ayahs || !currentAyah) return;
    const idx = ayahs.findIndex(a => a.verse_key === currentAyah);
    if (idx > 0) {
      const prevVerse = ayahs[idx - 1].verse_key;
      setCurrentAyah(prevVerse);
      scrollToAyah(prevVerse);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(p) ? 0 : p);
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const val = parseFloat(e.target.value);
    audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    setProgress(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const handleClose = () => {
    setIsActive(false);
    setIsAudioActive(false);
    setCurrentAyah(null);
    setIsSurahMode(false);
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const ayahNumber = currentAyah?.split(":")[1];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-t border-border shadow-[0_-20px_50px_rgba(0,0,0,0.2)]"
        >

          {/* ── MOBILE BAR ── */}
          <div className="lg:hidden px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {isSurahMode ? <Music size={18}/> : (ayahNumber || selectedSurah)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {isSurahMode
                  ? `Full Surah — ${currentSurah?.name_complex}`
                  : currentAyah ? `Ayah ${currentAyah}` : currentSurah?.name_complex}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                {currentSurah?.name_arabic}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={playSurah}
                className={`p-2 transition-colors ${
                  isSurahMode ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Music size={18}/>
              </button>
              <button onClick={skipBack} className="text-muted-foreground hover:text-primary transition-colors p-2">
                <SkipBack size={18} fill="currentColor"/>
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                {isPlaying
                  ? <Pause size={18} fill="currentColor"/>
                  : <Play size={18} className="ml-0.5" fill="currentColor"/>}
              </button>
              <button onClick={skipForward} className="text-muted-foreground hover:text-primary transition-colors p-2">
                <SkipForward size={18} fill="currentColor"/>
              </button>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <X size={18}/>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }}/>
            </div>
          </div>

          {/* ── DESKTOP BAR ── */}
          <div className="hidden lg:block px-6 py-4">
            <div className="container max-w-7xl mx-auto flex items-center gap-8">

              {/* Left — track info */}
              <div className="flex items-center gap-4 w-64 shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold shrink-0">
                  {isSurahMode ? <Music size={20}/> : (ayahNumber || "♪")}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {isSurahMode
                      ? currentSurah?.name_complex
                      : currentAyah ? `Ayah ${currentAyah}` : currentSurah?.name_complex}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                    {isSurahMode ? "Full Surah" : currentSurah?.name_arabic}
                  </p>
                </div>
              </div>

              {/* Center — controls + progress */}
              <div className="flex-1 flex flex-col items-center gap-2">
                {/* Control buttons */}
                <div className="flex items-center gap-4">
                  {/* Full Surah button */}
                  <button
                    onClick={playSurah}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      isSurahMode
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "text-muted-foreground border-border hover:text-primary hover:border-primary"
                    }`}
                  >
                    <Music size={12}/>
                    Full Surah
                  </button>

                  <button
                    onClick={skipBack}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SkipBack size={22} fill="currentColor"/>
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying
                      ? <Pause size={22} fill="currentColor"/>
                      : <Play size={22} className="ml-0.5" fill="currentColor"/>}
                  </button>

                  <button
                    onClick={skipForward}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SkipForward size={22} fill="currentColor"/>
                  </button>

                  <button
                    onClick={handleClose}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={18}/>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-8 text-right tabular-nums">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={handleSeek}
                    className="flex-1 h-1 accent-primary cursor-pointer"
                  />
                  <span className="text-[10px] text-muted-foreground w-8 tabular-nums">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Right — volume */}
              <div className="flex items-center gap-3 w-40 shrink-0 justify-end">
                <Volume2 size={16} className="text-muted-foreground shrink-0"/>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  className="w-24 h-1 accent-primary cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Step 2 — updated onEnded with auto-advance + scroll */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              if (isSurahMode) {
                setIsPlaying(false);
                setIsAudioActive(false);
                return;
              }
              if (ayahs && currentAyah) {
                const idx = ayahs.findIndex(a => a.verse_key === currentAyah);
                if (idx !== -1 && idx < ayahs.length - 1) {
                  const nextVerse = ayahs[idx + 1].verse_key;
                  setCurrentAyah(nextVerse);
                  scrollToAyah(nextVerse);
                } else {
                  setIsPlaying(false);
                  setCurrentAyah(null);
                  setIsAudioActive(false);
                }
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}