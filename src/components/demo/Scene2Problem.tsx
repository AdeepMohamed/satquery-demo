'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, ArrowRight, Layers, MessageSquare, FileText,
  Target, GitCompare, Radio, Unlink, CheckCircle2, User, RefreshCw
} from 'lucide-react';

type Props = {
  autoPlayProgress?: number;
};

export default function Scene2Problem({ autoPlayProgress = 0 }: Props) {
  // Staged progression over 25 seconds:
  // 0-10s: Show isolated fragmented tools and manual switching
  // 10-18s: Highlight complexity and friction
  // 18-25s: Transition reveal: "SatQuery AI brings them together"
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (autoPlayProgress > 0) {
      if (autoPlayProgress < 0.45) setActiveStep(0);
      else if (autoPlayProgress < 0.75) setActiveStep(1);
      else setActiveStep(2);
    }
  }, [autoPlayProgress]);

  const tools = [
    {
      id: 'vqa',
      title: 'VQA Model',
      icon: MessageSquare,
      color: '#38bdf8',
      format: 'JSON / Custom QA Weights',
      issue: 'Isolated QA reasoning',
    },
    {
      id: 'caption',
      title: 'Image Captioner',
      icon: FileText,
      color: '#a855f7',
      format: 'Text-only predictions',
      issue: 'Lacks spatial coordinates',
    },
    {
      id: 'grounding',
      title: 'Object Grounding',
      icon: Target,
      color: '#06d6f2',
      format: 'Bounding box arrays',
      issue: 'No natural conversation',
    },
    {
      id: 'change',
      title: 'Change Detector',
      icon: GitCompare,
      color: '#22c55e',
      format: 'Bi-temporal Rasters',
      issue: 'Separate pairwise pipeline',
    },
    {
      id: 'sar',
      title: 'SAR Specialist',
      icon: Radio,
      color: '#f59e0b',
      format: 'Complex backscatter .SAFE',
      issue: 'Incompatible sensor format',
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col justify-between p-4 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-border/50 pb-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-red-400 tracking-widest font-bold">SCENE 02 • THE PROBLEM</span>
              <span className="text-[10px] text-zinc-600 font-mono">0:20 – 0:45</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Remote Sensing Analysis is Complex & Fragmented
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400">
            CURRENT INDUSTRY STATUS
          </span>
        </div>
      </motion.div>

      {/* Main Comparative Diagram */}
      <div className="flex-1 flex flex-col justify-center my-4">
        {/* Central visual: Traditional Fragmented Workflow */}
        <div className="relative rounded-2xl glass-panel p-6 border-red-500/20 mb-6 overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-500/10 border-b border-l border-red-500/20 rounded-bl-lg text-[10px] font-mono text-red-400 font-bold flex items-center gap-1.5">
            <Unlink className="w-3 h-3 text-red-400" />
            <span>DISCONNECTED TRADITIONAL WORKFLOW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Input imagery */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
              <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-border/80 shadow-lg group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/demo/single-image.jpg" alt="Input Satellite Data" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-white font-bold bg-black/70 px-2 py-1 rounded">
                    SATELLITE DATA
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[11px] font-mono text-zinc-400">GeoTIFF / Sentinel / Landsat</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                <User className="w-3.5 h-3.5" />
                <span>Expert Human In Loop</span>
              </div>
            </div>

            {/* Fragmentation arrows */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-zinc-500 gap-2">
              <RefreshCw className="w-5 h-5 text-red-400/60 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-[9px] font-mono text-red-400/80 text-center uppercase tracking-wider">
                Manual Tool Switching & Re-formatting
              </span>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            </div>

            {/* Fragmented Specialist Models */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {tools.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    className="p-3 rounded-lg border border-white/5 bg-surface-lighter/60 hover:border-red-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${t.color}15`, border: `1px solid ${t.color}30` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: t.color }} />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">{t.title}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 mb-1">{t.format}</div>
                    <div className="text-[9px] font-mono text-red-400 bg-red-500/5 px-1.5 py-0.5 rounded border border-red-500/15">
                      ⚠ {t.issue}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The SatQuery AI Solution Banner */}
        <motion.div
          animate={{
            scale: activeStep === 2 ? 1.02 : 1,
            borderColor: activeStep === 2 ? 'rgba(6,214,242,0.6)' : 'rgba(6,214,242,0.2)',
          }}
          className="rounded-2xl glass-panel-glow p-5 border border-cyan/30 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-cyan" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan tracking-wider font-bold">THE SATQUERY AI BREAKTHROUGH</div>
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                One Unified Vision-Language Assistant Brings Them Together
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                No manual model switching • No script writing • Natural language queries resolve into automated multi-specialist pipelines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-cyan/10 border border-cyan/30 text-xs font-mono text-cyan font-bold whitespace-nowrap">
              MULTIPLE MODELS → ONE INTERFACE
            </span>
          </div>
        </motion.div>
      </div>

      {/* On-Screen Badges & Script Sync Bar */}
      <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-border/40">
        <div className="glass-panel p-2">
          <div className="text-[10px] text-zinc-500 font-mono">CHALLENGE 01</div>
          <div className="text-xs font-bold text-red-400">Multiple Separate Models</div>
        </div>
        <div className="glass-panel p-2">
          <div className="text-[10px] text-zinc-500 font-mono">CHALLENGE 02</div>
          <div className="text-xs font-bold text-red-400">Fragmented Complex Tools</div>
        </div>
        <div className="glass-panel p-2 border-cyan/30">
          <div className="text-[10px] text-cyan font-mono">SATQUERY AI SOLUTION</div>
          <div className="text-xs font-bold text-cyan">Unified Agentic Assistant</div>
        </div>
      </div>
    </div>
  );
}
