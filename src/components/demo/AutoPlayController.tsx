'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight,
  Maximize2, Minimize2, Mic, Volume2, FastForward,
  Clock, Sparkles, Check
} from 'lucide-react';
import { videoScriptTimeline, TOTAL_VIDEO_DURATION_SECONDS } from '@/data/videoScriptData';
import { DemoScene } from '@/types';

type Props = {
  currentScene: DemoScene;
  elapsedSeconds: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onSceneSelect: (scene: DemoScene) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

export default function AutoPlayController({
  currentScene,
  elapsedSeconds,
  isPlaying,
  onTogglePlay,
  onSeek,
  onSceneSelect,
  playbackSpeed,
  onSpeedChange,
  onReset,
  isFullscreen,
  onToggleFullscreen,
}: Props) {
  const [showTeleprompter, setShowTeleprompter] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Find active scene config
  const activeSceneConfig =
    videoScriptTimeline.find(
      (s) => elapsedSeconds >= s.startTime && elapsedSeconds < s.endTime
    ) || videoScriptTimeline[0];

  const progressPercent = Math.min(100, (elapsedSeconds / TOTAL_VIDEO_DURATION_SECONDS) * 100);

  return (
    <>
      {/* Floating Live Voiceover Teleprompter / Subtitles Banner */}
      <AnimatePresence>
        {showTeleprompter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 pointer-events-auto"
          >
            <div className="glass-panel-glow p-4 rounded-2xl border-cyan/30 backdrop-blur-xl shadow-2xl relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan pulse-dot" />
                  <span className="text-[10px] font-mono tracking-widest text-cyan font-bold flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-cyan" />
                    SCENE {activeSceneConfig.sceneNumber}/10 VOICEOVER SCRIPT • {activeSceneConfig.timeRange}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 bg-surface px-2 py-0.5 rounded border border-border/40">
                    {activeSceneConfig.badge}
                  </span>
                  <button
                    onClick={() => setShowTeleprompter(false)}
                    className="text-[10px] font-mono text-zinc-500 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/5"
                    title="Hide Teleprompter (V)"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Spoken Narration Script */}
              <p className="text-xs md:text-sm font-medium text-white/95 leading-relaxed tracking-wide font-sans">
                &ldquo;{activeSceneConfig.voiceOver}&rdquo;
              </p>

              {/* On Screen Visual Cue */}
              <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-purple font-semibold">ON-SCREEN:</span>
                  <span className="truncate text-zinc-300">{activeSceneConfig.onScreenText}</span>
                </div>
                <span className="text-cyan font-bold flex-shrink-0 ml-2">
                  {formatTime(elapsedSeconds)} / 05:00
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Master Director Control Bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-3"
      >
        <div className="glass-panel p-2.5 rounded-2xl border-cyan/25 shadow-2xl backdrop-blur-xl flex flex-col gap-2">
          {/* Progress Timeline Slider with 10 Scene Markers */}
          <div className="relative w-full">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                onSeek(pos * TOTAL_VIDEO_DURATION_SECONDS);
              }}
              className="relative w-full h-3 bg-surface-lighter rounded-full cursor-pointer overflow-hidden border border-border/60 hover:h-4 transition-all group"
            >
              {/* Completed track */}
              <div
                className="h-full bg-gradient-to-r from-cyan via-electric to-purple transition-all duration-300 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_#fff]" />
              </div>

              {/* Scene Cut Markers */}
              {videoScriptTimeline.map((s) => {
                const markPercent = (s.startTime / TOTAL_VIDEO_DURATION_SECONDS) * 100;
                return (
                  <div
                    key={s.id}
                    className="absolute top-0 bottom-0 w-0.5 bg-black/60 pointer-events-none"
                    style={{ left: `${markPercent}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Primary Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Play / Pause & Timecode */}
            <div className="flex items-center gap-2">
              <button
                onClick={onTogglePlay}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
                  isPlaying
                    ? 'bg-amber-400 text-black shadow-amber-400/30'
                    : 'bg-cyan text-black hover:bg-cyan-light shadow-cyan/30'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-black" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>PLAY 5-MIN DEMO</span>
                  </>
                )}
              </button>

              <button
                onClick={onReset}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                title="Restart from beginning (R)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 font-mono text-xs pl-1">
                <span className="text-cyan font-bold">{formatTime(elapsedSeconds)}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">05:00</span>
              </div>
            </div>

            {/* Center: Current Scene Title Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-surface/80 border border-border/60">
              <span className="text-[10px] font-mono text-cyan font-bold">
                SCENE {activeSceneConfig.sceneNumber}/10
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs font-mono font-medium text-white truncate max-w-[200px] md:max-w-xs">
                {activeSceneConfig.title}
              </span>
            </div>

            {/* Right: Quick Controls */}
            <div className="flex items-center gap-1.5">
              {/* Speed toggle */}
              <button
                onClick={() => {
                  const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
                  onSpeedChange(nextSpeed);
                }}
                className="px-2 py-1 rounded-md text-[10px] font-mono text-zinc-300 hover:bg-white/5 transition-all border border-border/40"
                title="Playback Speed"
              >
                <span className="text-cyan font-bold">{playbackSpeed}x</span>
              </button>

              {/* Teleprompter toggle */}
              <button
                onClick={() => setShowTeleprompter(!showTeleprompter)}
                className={`p-1.5 rounded-lg text-xs font-mono transition-all border ${
                  showTeleprompter
                    ? 'bg-purple/15 text-purple border-purple/30'
                    : 'text-zinc-500 hover:text-white border-border/40'
                }`}
                title="Toggle Voiceover Subtitles (V)"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>

              {/* Scene list expander */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`px-2 py-1 rounded-md text-[10px] font-mono transition-all border ${
                  isExpanded
                    ? 'bg-cyan/15 text-cyan border-cyan/30'
                    : 'text-zinc-400 hover:text-white border-border/40'
                }`}
              >
                10 SCENES
              </button>

              {/* Fullscreen */}
              <button
                onClick={onToggleFullscreen}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Expanded 10-Scene Selector Grid */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 border-t border-border/40 grid grid-cols-2 sm:grid-cols-5 gap-1.5 overflow-hidden"
              >
                {videoScriptTimeline.map((s) => {
                  const isActive = currentScene === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSeek(s.startTime);
                        onSceneSelect(s.id);
                      }}
                      className={`p-1.5 rounded-lg text-left transition-all border ${
                        isActive
                          ? 'bg-cyan/15 border-cyan/40 text-cyan'
                          : 'bg-surface-lighter/40 border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[8px] font-mono opacity-60">
                        <span>#{s.sceneNumber}</span>
                        <span>{s.timeRange}</span>
                      </div>
                      <div className="text-[10px] font-bold font-mono truncate">{s.title}</div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
