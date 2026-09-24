'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { DemoScene } from '@/types';

type Chapter = {
  id: string;
  label: string;
  number: string;
  shortcut: string;
};

type Props = {
  currentScene: DemoScene;
  onSceneChange: (scene: DemoScene) => void;
  onPrev: () => void;
  onNext: () => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
  chapters: readonly Chapter[];
};

export default function DemoControlBar({
  currentScene,
  onSceneChange,
  onPrev,
  onNext,
  autoPlay,
  onToggleAutoPlay,
  chapters,
}: Props) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel-glow flex items-center gap-1 px-2 py-2">
        {/* Previous */}
        <button
          onClick={onPrev}
          className="p-2 rounded-md hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
          title="Previous (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scene buttons */}
        <div className="flex items-center gap-0.5">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSceneChange(ch.id as DemoScene)}
              className={`px-3 py-1.5 rounded-md text-[10px] tracking-wider font-medium transition-all duration-300
                ${currentScene === ch.id
                  ? 'bg-cyan/15 text-cyan border border-cyan/30'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              title={`${ch.label} (${ch.shortcut})`}
            >
              <span className="text-[8px] opacity-50 mr-1">{ch.number}</span>
              {ch.label}
            </button>
          ))}
        </div>

        {/* Auto play */}
        <button
          onClick={onToggleAutoPlay}
          className={`p-2 rounded-md transition-all ${
            autoPlay
              ? 'bg-cyan/15 text-cyan'
              : 'hover:bg-white/5 text-zinc-400 hover:text-white'
          }`}
          title="Auto Play (Space)"
        >
          {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          className="p-2 rounded-md hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
          title="Next (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
