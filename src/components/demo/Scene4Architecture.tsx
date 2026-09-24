'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, ArrowDown, User, Layers, ShieldCheck, CheckCircle2,
  FileCheck, Sparkles, MessageSquare, FileText, Target, GitCompare, Radio,
  CornerDownRight, Check
} from 'lucide-react';

type Props = {
  autoPlayProgress?: number;
};

export default function Scene4Architecture({ autoPlayProgress = 0 }: Props) {
  // Staged progression over 35 seconds (1:10 to 1:45):
  // 0-7s: Stage 1 (User Input & Validation)
  // 7-14s: Stage 2 (Query Understanding)
  // 14-22s: Stage 3 (Agentic Router Dispatch to Specialists)
  // 22-29s: Stage 4 (Evidence Generation & Validation)
  // 29-35s: Stage 5 (Final Grounded Response & Metrics)
  const [activeStage, setActiveStage] = useState<number>(1);

  useEffect(() => {
    if (autoPlayProgress > 0) {
      if (autoPlayProgress < 0.2) setActiveStage(1);
      else if (autoPlayProgress < 0.4) setActiveStage(2);
      else if (autoPlayProgress < 0.65) setActiveStage(3);
      else if (autoPlayProgress < 0.85) setActiveStage(4);
      else setActiveStage(5);
    }
  }, [autoPlayProgress]);

  const specialistModels = [
    { id: 'vqa', name: 'VQA Specialist', icon: MessageSquare, color: '#38bdf8', desc: 'Remote sensing visual question answering' },
    { id: 'caption', name: 'Captioning Specialist', icon: FileText, color: '#a855f7', desc: 'Dense scene description & summary' },
    { id: 'grounding', name: 'Object Grounding', icon: Target, color: '#06d6f2', desc: 'Spatial bounding box localization' },
    { id: 'change', name: 'Change Detection', icon: GitCompare, color: '#22c55e', desc: 'Bi-temporal difference & mask generation' },
    { id: 'fusion', name: 'Optical-SAR Fusion', icon: Layers, color: '#f59e0b', desc: 'Multimodal radar & spectral consensus' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col justify-between p-4 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-border/50 pb-4 mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple/15 border border-purple/30 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-purple" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-purple tracking-widest font-bold">SCENE 04 • CORE ARCHITECTURE</span>
              <span className="text-[10px] text-zinc-600 font-mono">1:10 – 1:45</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              End-to-End Multimodal Vision-Language Architecture
            </h2>
          </div>
        </div>

        {/* Dynamic Step indicator */}
        <div className="hidden sm:flex items-center gap-1.5 glass-panel p-1">
          {['1. Input', '2. Understand', '3. Route', '4. Validate', '5. Explain'].map((label, idx) => (
            <button
              key={label}
              onClick={() => setActiveStage(idx + 1)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                activeStage === idx + 1
                  ? 'bg-purple text-white font-bold shadow-md shadow-purple/30'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Architecture Diagram Container */}
      <div className="flex-1 flex flex-col justify-center my-2 max-w-4xl mx-auto w-full">
        {/* Tier 1: User & Input Stage */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              scale: activeStage === 1 ? 1.03 : 1,
              borderColor: activeStage === 1 ? '#06d6f2' : 'rgba(255,255,255,0.1)',
            }}
            onClick={() => setActiveStage(1)}
            className="cursor-pointer w-full max-w-md p-3.5 rounded-xl glass-panel flex items-center justify-between border transition-all shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan/15 border border-cyan/30 flex items-center justify-center">
                <User className="w-4 h-4 text-cyan" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">1. USER: IMAGE + NATURAL LANGUAGE QUERY</div>
                <div className="text-[10px] text-zinc-400 font-mono">&ldquo;What changed in the built-up area and show me where?&rdquo;</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">INPUT</span>
          </motion.div>

          <ArrowDown className={`w-4 h-4 my-1 transition-colors ${activeStage >= 2 ? 'text-cyan animate-pulse' : 'text-zinc-700'}`} />

          {/* Tier 2: Validation & Query Understanding */}
          <motion.div
            animate={{
              scale: activeStage === 2 ? 1.03 : 1,
              borderColor: activeStage === 2 ? '#a855f7' : 'rgba(255,255,255,0.1)',
            }}
            onClick={() => setActiveStage(2)}
            className="cursor-pointer w-full max-w-md p-3.5 rounded-xl glass-panel flex items-center justify-between border transition-all shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple/15 border border-purple/30 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-purple" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">2. INPUT VALIDATION & QUERY UNDERSTANDING</div>
                <div className="text-[10px] text-zinc-400 font-mono">Sensor calibration, GeoTIFF CRS check, intent decomposition</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-purple bg-purple/10 px-2 py-0.5 rounded border border-purple/20">VALIDATE</span>
          </motion.div>

          <ArrowDown className={`w-4 h-4 my-1 transition-colors ${activeStage >= 3 ? 'text-purple animate-pulse' : 'text-zinc-700'}`} />

          {/* Tier 3: The Central Agentic Router Brain */}
          <motion.div
            animate={{
              scale: activeStage === 3 ? 1.05 : 1,
              borderColor: activeStage === 3 ? '#ec4899' : 'rgba(255,255,255,0.15)',
              boxShadow: activeStage === 3 ? '0 0 30px rgba(236,72,153,0.3)' : 'none',
            }}
            onClick={() => setActiveStage(3)}
            className="cursor-pointer w-full max-w-lg p-4 rounded-2xl glass-panel-glow border-2 transition-all flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-extrabold text-white font-mono tracking-wider">3. AGENTIC ROUTER ORCHESTRATION ENGINE</span>
            </div>
            <p className="text-[10px] text-zinc-300 font-mono">
              Dynamically maps intent to specialized vision-language tools & manages multi-turn execution trace
            </p>
          </motion.div>

          {/* Conduit lines fanning out to 5 Specialists */}
          <div className="w-full my-2 relative flex items-center justify-center">
            <div className="w-3/4 h-0.5 bg-gradient-to-r from-cyan via-purple to-amber-500 opacity-40" />
          </div>

          {/* Tier 4: Specialist Models (5 Nodes) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full my-1">
            {specialistModels.map((m, idx) => {
              const Icon = m.icon;
              const isSelected = activeStage === 3 || activeStage === 4;
              return (
                <motion.div
                  key={m.id}
                  animate={{
                    y: isSelected ? [0, -2, 0] : 0,
                    borderColor: isSelected ? `${m.color}80` : 'rgba(255,255,255,0.06)',
                  }}
                  transition={{ delay: idx * 0.08, duration: 0.8, repeat: isSelected ? Infinity : 0 }}
                  className="p-2.5 rounded-xl glass-panel flex flex-col items-center text-center border transition-all"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5"
                    style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}40` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                  </div>
                  <span className="text-[11px] font-bold text-white font-mono leading-tight">{m.name}</span>
                  <span className="text-[8px] text-zinc-400 font-mono mt-1 leading-snug">{m.desc}</span>
                </motion.div>
              );
            })}
          </div>

          <ArrowDown className={`w-4 h-4 my-1 transition-colors ${activeStage >= 4 ? 'text-green animate-pulse' : 'text-zinc-700'}`} />

          {/* Tier 5: Evidence + Validation Stage */}
          <motion.div
            animate={{
              scale: activeStage === 4 ? 1.03 : 1,
              borderColor: activeStage === 4 ? '#22c55e' : 'rgba(255,255,255,0.1)',
            }}
            onClick={() => setActiveStage(4)}
            className="cursor-pointer w-full max-w-md p-3.5 rounded-xl glass-panel flex items-center justify-between border transition-all shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green/15 border border-green/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-green" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">4. EVIDENCE GENERATION & CONFIDENCE SCORING</div>
                <div className="text-[10px] text-zinc-400 font-mono">Spatial masks, bounding coordinates, confidence consensus (0-100%)</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-green bg-green/10 px-2 py-0.5 rounded border border-green/20">VERIFY</span>
          </motion.div>

          <ArrowDown className={`w-4 h-4 my-1 transition-colors ${activeStage >= 5 ? 'text-cyan animate-pulse' : 'text-zinc-700'}`} />

          {/* Tier 6: Final Grounded Output */}
          <motion.div
            animate={{
              scale: activeStage === 5 ? 1.04 : 1,
              borderColor: activeStage === 5 ? '#06d6f2' : 'rgba(255,255,255,0.1)',
              boxShadow: activeStage === 5 ? '0 0 25px rgba(6,214,242,0.3)' : 'none',
            }}
            onClick={() => setActiveStage(5)}
            className="cursor-pointer w-full max-w-md p-3.5 rounded-xl glass-panel-glow flex items-center justify-between border transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan/15 border border-cyan/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-cyan" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-mono">5. FINAL RESPONSE & EXPLANATION SUMMARY</div>
                <div className="text-[10px] text-zinc-300 font-mono">Natural text answer + Visual masks + Report export</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-cyan bg-cyan/15 px-2 py-0.5 rounded border border-cyan/40 font-bold">OUTPUT</span>
          </motion.div>
        </div>
      </div>

      {/* Summary Footer Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-cyan font-bold">Understand</span>
          <span>↓</span>
          <span className="text-purple font-bold">Select</span>
          <span>↓</span>
          <span className="text-pink-400 font-bold">Execute</span>
          <span>↓</span>
          <span className="text-green font-bold">Validate</span>
          <span>↓</span>
          <span className="text-amber-400 font-bold">Explain</span>
        </div>
        <div className="hidden sm:block text-zinc-500">
          FastAPI / PyTorch Service Ready Architecture
        </div>
      </div>
    </div>
  );
}
