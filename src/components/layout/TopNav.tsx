'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, User, Monitor } from 'lucide-react';
import { DemoScene } from '@/types';

type Props = {
  currentScene: DemoScene;
  presentationMode: boolean;
  onTogglePresentation: () => void;
  autoPlay?: boolean;
  onToggleAutoPlay?: () => void;
  elapsedSeconds?: number;
};

export default function TopNav({
  currentScene,
  presentationMode,
  onTogglePresentation,
  autoPlay = false,
  onToggleAutoPlay,
  elapsedSeconds = 0,
}: Props) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6"
      style={{
        background: 'linear-gradient(180deg, rgba(5,5,16,0.95) 0%, rgba(5,5,16,0.8) 100%)',
        borderBottom: '1px solid rgba(30,30,58,0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left - Brand */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Satellite className="w-6 h-6 text-cyan" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green rounded-full pulse-dot" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-[0.15em] text-white leading-none">
            SATQUERY AI
          </h1>
          <p className="text-[10px] text-zinc-500 tracking-[0.1em] leading-none mt-0.5">
            Earth Observation Intelligence • SIH26167
          </p>
        </div>
      </div>

      {/* Center - Quick Launch 5-Min Run Button */}
      {onToggleAutoPlay && (
        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all shadow-lg ${
            autoPlay
              ? 'bg-amber-400 text-black shadow-amber-400/30 animate-pulse'
              : 'bg-gradient-to-r from-cyan to-electric text-black hover:opacity-90 shadow-cyan/30'
          }`}
          title="Auto-Run 5-Minute Video Script (Space)"
        >
          <span className="w-2 h-2 rounded-full bg-black/80" />
          <span>{autoPlay ? `AUTO-RUNNING (${formatTime(elapsedSeconds)} / 05:00)` : '▶ RUN 5-MIN DEMO'}</span>
        </button>
      )}

      {/* Right - Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={onTogglePresentation}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs tracking-wider font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          title="Toggle Presentation Mode (P)"
        >
          <Monitor className="w-3.5 h-3.5" />
          {presentationMode ? 'EXIT' : 'PRESENT'}
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="w-2 h-2 bg-green rounded-full pulse-dot" />
          <span className="text-green tracking-wider font-medium">SYSTEM ONLINE</span>
        </div>

        <div className="px-2.5 py-1 rounded-md bg-purple/10 border border-purple/20">
          <span className="text-[10px] text-purple tracking-wider font-semibold">SIH26167</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-surface-lighter border border-border flex items-center justify-center">
          <User className="w-4 h-4 text-zinc-500" />
        </div>
      </div>
    </motion.header>
  );
}
