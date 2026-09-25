'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Satellite, Globe2, Sparkles, ArrowRight, ShieldCheck, Radio } from 'lucide-react';

type Props = {
  onStartDemo?: () => void;
  autoPlayProgress?: number; // 0 to 1 over 20 seconds
};

export default function Scene1Hook({ onStartDemo, autoPlayProgress = 0 }: Props) {
  // Staged reveals over the 20 seconds:
  // 0-5s: Earth & satellite orbit
  // 5-10s: Zoom towards Earth surface & satellite image
  // 10-15s: "Ask your satellite image anything"
  // 15-20s: SatQuery AI logo & SIH26167 team banner
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (autoPlayProgress > 0) {
      if (autoPlayProgress < 0.25) setStage(1);
      else if (autoPlayProgress < 0.5) setStage(2);
      else if (autoPlayProgress < 0.75) setStage(3);
      else setStage(4);
    }
  }, [autoPlayProgress]);

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden px-4 py-8">
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 geo-grid opacity-25" />

      {/* Orbit paths */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="w-[700px] h-[700px] rounded-full border border-cyan/10 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/30 text-[9px] font-mono text-cyan">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>SENTINEL-2A • LEO 786KM</span>
          </div>
        </motion.div>
      </div>

      {/* Main Visual Staging Area */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <div className="glass-panel px-3 py-1 flex items-center gap-2 text-cyan border-cyan/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan" />
            <span className="text-[11px] font-mono tracking-widest font-bold">SMART INDIA HACKATHON 2026</span>
          </div>
          <div className="glass-panel px-3 py-1 text-purple border-purple/30 text-[11px] font-mono tracking-wider">
            ID: SIH26167 • SPACE TECHNOLOGY
          </div>
          <div className="glass-panel px-3 py-1 text-zinc-400 text-[11px] font-mono tracking-wider">
            TEAM: CODE FOR NATION
          </div>
        </motion.div>

        {/* Central Dynamic Visual */}
        <div className="relative w-full max-w-2xl h-72 md:h-84 rounded-2xl glass-panel-glow overflow-hidden mb-6 flex items-center justify-center">
          {/* Stage 1: Photorealistic Earth & Orbiting Satellite */}
          <motion.div
            animate={{
              opacity: stage === 1 ? 1 : stage === 2 ? 0.35 : 0.12,
              scale: stage >= 2 ? 1.15 : 1,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Photorealistic Earth Globe */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_0_90px_rgba(6,214,242,0.45),0_0_30px_rgba(59,130,246,0.3)] border border-cyan/40 flex items-center justify-center bg-black">
              {/* Real NASA Blue Marble Earth Image with Continuous Slow Axial Spin */}
              <motion.img
                src="/demo/real-earth.jpg"
                alt="Photorealistic Planet Earth"
                animate={{ rotate: 360 }}
                transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full object-cover scale-105"
              />

              {/* Spherical Atmospheric Rim & Dark Side Shadow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, transparent 55%, rgba(6,214,242,0.25) 85%, rgba(6,214,242,0.6) 100%), linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.85) 90%)',
                }}
              />

              {/* Animated Atmospheric Scan Laser Beam */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent animate-scan opacity-70" />
            </div>

            {/* Orbiting Satellite on Inclined 3D Orbital Plane */}
            <div className="absolute w-72 h-72 md:w-80 md:h-80 pointer-events-none flex items-center justify-center">
              {/* Orbital Ellipse Ring */}
              <svg className="absolute w-full h-full" viewBox="0 0 320 320">
                <ellipse
                  cx="160"
                  cy="160"
                  rx="150"
                  ry="65"
                  fill="none"
                  stroke="rgba(6,214,242,0.25)"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                  transform="rotate(-25 160 160)"
                />
              </svg>

              {/* Rotating Satellite Node */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute w-full h-full flex items-center justify-center"
                style={{ transform: 'rotate(-25deg)' }}
              >
                {/* Satellite Body positioned along orbit perimeter */}
                <div
                  className="absolute"
                  style={{ top: '5px', left: '50%', transform: 'translateX(-50%) rotate(25deg)' }}
                >
                  <div className="flex flex-col items-center">
                    {/* Realistic Satellite Construction */}
                    <div className="relative flex items-center gap-1 p-1.5 rounded-lg bg-surface/90 border border-cyan/60 shadow-[0_0_20px_rgba(6,214,242,0.5)] backdrop-blur-md">
                      {/* Left Solar Array */}
                      <div className="w-4 h-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-sm border border-cyan/50 flex flex-col justify-between">
                        <div className="w-full h-px bg-white/40" />
                      </div>

                      {/* Main Avionics Body */}
                      <div className="w-3.5 h-3.5 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-sm border border-amber-300 flex items-center justify-center shadow-inner">
                        <div className="w-1 h-1 rounded-full bg-cyan animate-ping" />
                      </div>

                      {/* Right Solar Array */}
                      <div className="w-4 h-2 bg-gradient-to-l from-cyan-400 to-blue-600 rounded-sm border border-cyan/50 flex flex-col justify-between">
                        <div className="w-full h-px bg-white/40" />
                      </div>
                    </div>

                    {/* Sensor Beam fanning down towards Earth */}
                    <div className="w-0.5 h-6 bg-gradient-to-b from-cyan to-transparent animate-pulse" />
                    <span className="text-[8px] font-mono text-cyan bg-black/80 px-1.5 py-0.5 rounded border border-cyan/30 mt-0.5">
                      SENTINEL-2A
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 2 & 3: High-Res Satellite Surface Ingestion */}
          <motion.div
            animate={{
              opacity: stage >= 2 ? (stage >= 3 ? 0.35 : 0.9) : 0,
              scale: stage >= 2 ? 1 : 0.9,
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demo/single-image.jpg"
              alt="High-resolution Sentinel-2 satellite capture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 glass-panel px-2.5 py-1 text-[10px] font-mono text-cyan">
              LAT: 23°15&apos;35&quot;N | LON: 77°24&apos;45&quot;E • 10m/px
            </div>
            <div className="absolute bottom-3 right-3 glass-panel px-2.5 py-1 text-[10px] font-mono text-green flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green" />
              <span>SENSOR ACQUISITION VERIFIED</span>
            </div>
          </motion.div>

          {/* Stage 3 & 4: Holographic Prompt & Answer Overlay */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="relative z-20 max-w-lg w-full px-6 py-5 rounded-xl glass-panel-glow border-cyan/40 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 mb-2 text-cyan">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold tracking-wider">NATURAL LANGUAGE PROMPT</span>
                </div>
                <div className="p-3 rounded-lg bg-surface/80 border border-white/10 text-sm font-mono text-white text-left shadow-inner flex items-center justify-between">
                  <span>&ldquo;Ask your satellite image anything.&rdquo;</span>
                  <span className="w-2 h-4 bg-cyan animate-pulse inline-block" />
                </div>
                <div className="mt-2 text-[10px] text-zinc-400 font-mono text-left">
                  → Multimodal Vision-Language reasoning across Optical, SAR & Temporal remote sensing.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-3"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-cyan via-electric to-purple bg-clip-text text-transparent">
              SATQUERY AI
            </span>
          </h1>
          <p className="text-base md:text-lg text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
            An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries
          </p>
        </motion.div>

        {/* Narrative Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="p-3.5 rounded-lg glass-panel max-w-2xl mb-6 text-xs text-zinc-400 italic leading-relaxed border-border/60"
        >
          &ldquo;Every day, satellites capture enormous amounts of information about our planet.
          What if we could simply ask the satellite image a question?&rdquo;
        </motion.div>

        {/* Interactive Staging Controls */}
        <div className="flex items-center gap-2">
          {([1, 2, 3, 4] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${
                stage === s
                  ? 'bg-cyan text-black font-bold shadow-md shadow-cyan/30'
                  : 'text-zinc-500 hover:text-white glass-panel'
              }`}
            >
              {s === 1 ? '1. Orbit' : s === 2 ? '2. Capture' : s === 3 ? '3. Prompt' : '4. Reveal'}
            </button>
          ))}
          {onStartDemo && (
            <button
              onClick={onStartDemo}
              className="ml-3 btn-primary flex items-center gap-2 text-xs py-2 px-4"
            >
              <span>EXPLORE WORKFLOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
