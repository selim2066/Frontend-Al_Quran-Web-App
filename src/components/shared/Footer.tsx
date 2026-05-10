"use client";

import React from "react";
import { BookOpen, Mail, Globe, MessageCircle, Share2, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
  { icon: Share2,        label: "Share",    href: "#" },
  { icon: Globe,         label: "Website",  href: "#" },
  { icon: Mail,          label: "Email",    href: "#" },
];

const pageLinks = [
  { label: "About Us",       href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Our Projects",   href: "#" },
  { label: "Read Quran",     href: "/surah/1" },
];

const importantLinks = [
  { label: "IRD Foundation",  href: "#" },
  { label: "Quranmazid.com",  href: "#" },
  { label: "Dua & Ruqyah",    href: "#" },
  { label: "IHadith",         href: "#" },
];

/* ─── Desert Landscape SVG ─────────────────────────────────── */
function DesertSVG({ isDark }: { isDark: boolean }) {
  const sky1   = isDark ? "#0a0f1a" : "#fdf6e3";
  const sky2   = isDark ? "#0d1a0f" : "#fce9c2";
  const dune1  = isDark ? "#1a2e18" : "#e8c97a";
  const dune2  = isDark ? "#132610" : "#d4a94a";
  const dune3  = isDark ? "#0e1e0c" : "#c4932e";
  const tree1  = isDark ? "#1e3b1a" : "#5a7a2e";
  const tree2  = isDark ? "#163014" : "#4a6626";
  const star   = isDark ? "#e8f4e8" : "transparent";

  return (
    <svg
      width="100%"
      viewBox="0 0 1440 340"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky1} />
          <stop offset="100%" stopColor={sky2} />
        </linearGradient>
      </defs>

      <rect width="1440" height="340" fill="url(#skyGrad)" />

      {/* Stars dark mode */}
      {isDark && (
        <g fill={star} opacity="0.7">
          {[[80,30],[200,18],[350,45],[490,22],[620,38],[750,15],[870,42],[1000,28],[1150,19],[1280,36],[1380,25],[140,58],[420,65],[560,50],[700,70],[830,55],[960,62],[1100,48],[1320,60]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r={i%3===0?1.5:1} />
          ))}
        </g>
      )}

      {/* Moon dark */}
      {isDark && <circle cx="1260" cy="55" r="28" fill="#c8e6c9" opacity="0.9" />}

      {/* Sun glow light */}
      {!isDark && <circle cx="180" cy="60" r="45" fill="#f9a825" opacity="0.18" />}
      {!isDark && <circle cx="180" cy="60" r="28" fill="#f9c74f" opacity="0.3" />}

      {/* Far dunes */}
      <path d="M0,200 C120,175 240,155 380,168 C520,180 640,195 760,180 C880,165 1000,150 1140,165 C1280,178 1360,192 1440,185 L1440,340 L0,340 Z" fill={dune1} opacity="0.5" />
      {/* Mid dunes */}
      <path d="M0,220 C100,200 220,185 360,195 C500,205 620,222 760,210 C900,198 1020,185 1160,200 C1300,215 1380,225 1440,218 L1440,340 L0,340 Z" fill={dune2} opacity="0.7" />
      {/* Foreground dune */}
      <path d="M0,260 C80,245 180,235 300,242 C420,250 520,268 660,258 C800,248 920,235 1060,248 C1200,261 1320,272 1440,265 L1440,340 L0,340 Z" fill={dune3} opacity="0.9" />
      <rect x="0" y="295" width="1440" height="45" fill={dune3} />

      {/* Palm left */}
      <g opacity="0.85">
        <path d="M95,295 Q92,265 88,238 Q86,218 90,200" stroke={tree2} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M90,200 Q70,185 48,178" stroke={tree1} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M90,200 Q72,190 55,195" stroke={tree1} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M90,200 Q85,180 82,162" stroke={tree1} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M90,200 Q100,180 112,172" stroke={tree1} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M90,200 Q108,188 125,186" stroke={tree1} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="83" cy="205" r="4" fill={tree2} />
        <circle cx="91" cy="208" r="3.5" fill={tree2} />
        <circle cx="96" cy="204" r="3" fill={tree2} />
      </g>

      {/* Palm right */}
      <g opacity="0.8">
        <path d="M1340,295 Q1343,268 1348,242 Q1352,222 1348,205" stroke={tree2} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M1348,205 Q1368,188 1390,180" stroke={tree1} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M1348,205 Q1366,195 1384,200" stroke={tree1} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1348,205 Q1352,185 1355,167" stroke={tree1} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1348,205 Q1332,185 1318,177" stroke={tree1} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M1348,205 Q1330,193 1312,190" stroke={tree1} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="1354" cy="210" r="4" fill={tree2} />
        <circle cx="1347" cy="212" r="3.5" fill={tree2} />
        <circle cx="1342" cy="208" r="3" fill={tree2} />
      </g>

      {/* Small mid-left shrub */}
      <g opacity="0.6">
        <path d="M280,270 L280,250" stroke={tree2} strokeWidth="4" strokeLinecap="round" />
        <path d="M280,260 L265,255" stroke={tree2} strokeWidth="3" strokeLinecap="round" />
        <path d="M280,263 L295,258" stroke={tree2} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Small mid-right tree */}
      <g opacity="0.55">
        <path d="M1150,272 Q1148,258 1146,245 Q1145,236 1147,230" stroke={tree2} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M1147,230 Q1138,222 1128,218" stroke={tree1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M1147,230 Q1148,220 1148,212" stroke={tree1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M1147,230 Q1156,222 1165,220" stroke={tree1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ─── Main Footer ───────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-green-200/30 dark:border-green-900/30 pt-16">

      {/* Desert background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 block dark:hidden">
          <DesertSVG isDark={false} />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/70 via-yellow-50/50 to-white/90" />
        </div>
        <div className="absolute inset-0 hidden dark:block">
          <DesertSVG isDark={true} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-green-950/60 to-gray-950/95" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-0">

        {/* Bismillah watermark */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <span className="text-8xl font-serif text-green-800/[0.04] dark:text-green-400/[0.05] tracking-widest whitespace-nowrap">
            ٱلۡحَمۡدُ لِلَّهِ
          </span>
        </div>

        {/* Main grid */}
        <div className="container max-w-7xl mx-auto px-6 lg:px-2 -bottom-12 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-lg shadow-green-600/25 ring-1 ring-green-500/30">
                  <BookOpen className="h-6 w-6 text-white" strokeWidth={1.8} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Quran Mazid
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-green-700/70 dark:text-green-400/60 font-semibold mt-0.5">
                    Read · Study · Learn
                  </p>
                </div>
              </div>

              <p className="text-[13.5px] leading-[1.75] text-gray-600/90 dark:text-gray-400/80 max-w-xs">
                IRD Foundation provides Islamic apps for the benefit of Mankind, seeking rewards from Allah alone and following the Manhaj of Salaf-e-Salehin.
              </p>

              <div className="flex items-center gap-2 pt-1">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group w-9 h-9 rounded-xl flex items-center justify-center bg-white/60 dark:bg-white/5 border border-green-200/60 dark:border-green-800/40 text-gray-500 dark:text-gray-400 hover:bg-green-600 hover:border-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:border-green-600 dark:hover:text-white transition-all duration-200 backdrop-blur-sm"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div className="space-y-5">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-green-700 dark:text-green-500">
                Pages
              </h4>
              <ul className="space-y-3">
                {pageLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-1.5 text-[13.5px] text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150"
                    >
                      <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
                        <ArrowUpRight size={11} className="text-green-500" />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div className="space-y-5">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-green-700 dark:text-green-500">
                Important Links
              </h4>
              <ul className="space-y-3">
                {importantLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-1.5 text-[13.5px] text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150"
                    >
                      <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
                        <ArrowUpRight size={11} className="text-green-500" />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stay Connected */}
            <div className="space-y-5">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-green-700 dark:text-green-500">
                Stay Connected
              </h4>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Get updates on new features, Quran tools, and Islamic content.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3.5 py-2.5 text-[13px] rounded-xl border border-green-200/70 dark:border-green-800/50 bg-white/70 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-green-400 transition-all"
                />
                <button className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors duration-150 shadow-sm shadow-green-600/20">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mt-16">
            <div className="w-full border-t border-green-200/40 dark:border-green-900/50" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="container max-w-7xl mx-auto px-6 lg:px-0 py-6  flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11.5px] text-gray-500/70 dark:text-gray-500/60">
            © 2026 Quran Mazid · MSR. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11.5px] text-gray-500/70 dark:text-gray-500/60 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Desert scene bottom */}
        <div className="relative w-full h-[120px] sm:h-[150px] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 dark:hidden">
            <svg width="100%" height="100%" viewBox="0 0 1440 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
              <path d="M0,60 C200,30 400,20 600,35 C800,50 1000,65 1200,45 C1300,35 1380,40 1440,38 L1440,150 L0,150 Z" fill="#c4932e" opacity="0.3" />
              <path d="M0,80 C180,55 380,45 580,58 C780,72 980,85 1200,68 C1320,58 1390,65 1440,62 L1440,150 L0,150 Z" fill="#d4a94a" opacity="0.45" />
              <path d="M0,100 C150,82 320,72 500,80 C680,88 860,102 1060,92 C1200,84 1340,90 1440,88 L1440,150 L0,150 Z" fill="#e8c97a" opacity="0.6" />
              <g opacity="0.35">
                <path d="M120,100 Q117,78 114,58 Q112,42 115,32" stroke="#a07828" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M115,32 Q100,19 85,13" stroke="#7a5a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M115,32 Q117,15 118,2" stroke="#7a5a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M115,32 Q128,17 140,12" stroke="#7a5a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
              <g opacity="0.3">
                <path d="M1320,100 Q1323,78 1326,58 Q1328,42 1325,32" stroke="#a07828" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M1325,32 Q1340,19 1355,13" stroke="#7a5a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M1325,32 Q1323,15 1322,2" stroke="#7a5a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M1325,32 Q1312,17 1300,12" stroke="#7a5a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
          <div className="absolute inset-0 hidden dark:block">
            <svg width="100%" height="100%" viewBox="0 0 1440 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
              <path d="M0,60 C200,30 400,20 600,35 C800,50 1000,65 1200,45 C1300,35 1380,40 1440,38 L1440,150 L0,150 Z" fill="#0a1a08" opacity="0.5" />
              <path d="M0,80 C180,55 380,45 580,58 C780,72 980,85 1200,68 C1320,58 1390,65 1440,62 L1440,150 L0,150 Z" fill="#0d2208" opacity="0.7" />
              <path d="M0,100 C150,82 320,72 500,80 C680,88 860,102 1060,92 C1200,84 1340,90 1440,88 L1440,150 L0,150 Z" fill="#0f2a0a" opacity="0.85" />
              <g opacity="0.5">
                <path d="M120,100 Q117,78 114,58 Q112,42 115,32" stroke="#1a3a14" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M115,32 Q100,19 85,13" stroke="#152e10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M115,32 Q117,15 118,2" stroke="#152e10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M115,32 Q128,17 140,12" stroke="#152e10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
              <g opacity="0.45">
                <path d="M1320,100 Q1323,78 1326,58 Q1328,42 1325,32" stroke="#1a3a14" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M1325,32 Q1340,19 1355,13" stroke="#152e10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M1325,32 Q1323,15 1322,2" stroke="#152e10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M1325,32 Q1312,17 1300,12" stroke="#152e10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}