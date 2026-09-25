'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Sparkles, Send, CheckCircle2,
  FileCheck, Cpu, ArrowRight, ShieldCheck
} from 'lucide-react';

type Props = {
  autoPlayProgress?: number;
};

export default function Scene3Overview({ autoPlayProgress = 0 }: Props) {
  // Staged progression over 25 seconds:
  // 0-6s: GeoTIFF upload & ingestion
  // 6-13s: Natural language query typing ("What land cover is visible in this image?")
  // 13-19s: Analysis pipeline execution
  // 19-25s: Grounded answer & semantic highlighted regions
  const [phase, setPhase] = useState<'upload' | 'query' | 'processing' | 'result'>('upload');
  const [typedQuery, setTypedQuery] = useState('');
  const fullQuery = 'What land cover is visible in this image?';

  useEffect(() => {
    if (autoPlayProgress > 0) {
      if (autoPlayProgress < 0.25) {
        setPhase('upload');
        setTypedQuery('');
      } else if (autoPlayProgress < 0.55) {
        setPhase('query');
        const charProgress = Math.min(1, (autoPlayProgress - 0.25) / 0.25);
        const chars = Math.floor(charProgress * fullQuery.length);
        setTypedQuery(fullQuery.substring(0, chars));
      } else if (autoPlayProgress < 0.75) {
        setPhase('processing');
        setTypedQuery(fullQuery);
      } else {
        setPhase('result');
        setTypedQuery(fullQuery);
      }
    }
  }, [autoPlayProgress]);

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col justify-between p-4 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-border/50 pb-4 mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan tracking-widest font-bold">SCENE 03 • WHAT IS SATQUERY AI?</span>
              <span className="text-[10px] text-zinc-600 font-mono">0:45 – 1:10</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Ask in Natural Language — Unified Remote Sensing VLA
            </h2>
          </div>
        </div>

        {/* Pipeline 4-Stage Pill Indicator */}
        <div className="flex items-center gap-1.5 glass-panel p-1">
          {[
            { id: 'upload', label: '1. UPLOAD' },
            { id: 'query', label: '2. ASK' },
            { id: 'processing', label: '3. ANALYZE' },
            { id: 'result', label: '4. EXPLAIN' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                setPhase(st.id as typeof phase);
                if (st.id === 'upload') setTypedQuery('');
                else setTypedQuery(fullQuery);
              }}
              className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${
                phase === st.id
                  ? 'bg-cyan text-black font-bold shadow-sm shadow-cyan/30'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Interactive Demo Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2">
        {/* Left: Satellite Image Canvas with Dynamic Highlights */}
        <div className="lg:col-span-7 flex flex-col h-[380px] md:h-[420px] rounded-2xl glass-panel-glow overflow-hidden relative border-border/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demo/single-image.jpg"
            alt="Sentinel-2 Satellite Image"
            className="w-full h-full object-cover"
          />

          {/* GeoTIFF Ingestion overlay */}
          <div className="absolute top-3 left-3 z-10 glass-panel px-3 py-1.5 flex items-center gap-2 border-border/70">
            <FileCheck className="w-3.5 h-3.5 text-cyan" />
            <span className="text-[10px] font-mono text-zinc-200">SENTINEL2A_MSI_L2A.TIF (EPSG:4326)</span>
          </div>

          <div className="absolute top-3 right-3 z-10 glass-panel px-2.5 py-1 text-[10px] font-mono text-zinc-400">
            Resolution: 10m • Bands: RGB + NIR
          </div>

          {/* Semantic Segmentation Highlights (revealed in result phase) */}
          <AnimatePresence>
            {phase === 'result' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Agricultural Land (Green) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  transition={{ duration: 0.5 }}
                  className="absolute rounded-lg border-2 border-green"
                  style={{
                    left: '5%',
                    top: '8%',
                    width: '45%',
                    height: '50%',
                    backgroundColor: 'rgba(34,197,94,0.2)',
                  }}
                >
                  <span className="absolute top-1 left-2 text-[9px] font-mono font-bold text-green bg-black/70 px-1.5 py-0.5 rounded">
                    AGRICULTURAL LAND (52%)
                  </span>
                </motion.div>

                {/* Built-up Region (Amber) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute rounded-lg border-2 border-amber-400"
                  style={{
                    left: '52%',
                    top: '45%',
                    width: '42%',
                    height: '48%',
                    backgroundColor: 'rgba(245,158,11,0.2)',
                  }}
                >
                  <span className="absolute top-1 left-2 text-[9px] font-mono font-bold text-amber-300 bg-black/70 px-1.5 py-0.5 rounded">
                    BUILT-UP REGION (18%)
                  </span>
                </motion.div>

                {/* Vegetation / Forest (Emerald) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute rounded-lg border-2 border-emerald-400"
                  style={{
                    left: '52%',
                    top: '8%',
                    width: '42%',
                    height: '34%',
                    backgroundColor: 'rgba(16,185,129,0.2)',
                  }}
                >
                  <span className="absolute top-1 left-2 text-[9px] font-mono font-bold text-emerald-300 bg-black/70 px-1.5 py-0.5 rounded">
                    VEGETATION (28%)
                  </span>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Processing Laser Beam */}
          {phase === 'processing' && (
            <div className="absolute inset-0 bg-cyan/10 pointer-events-none flex flex-col items-center justify-center">
              <div className="w-full h-1 bg-cyan shadow-[0_0_20px_#06d6f2] animate-scan" />
              <div className="glass-panel px-4 py-2 mt-4 flex items-center gap-2 text-cyan font-mono text-xs">
                <Cpu className="w-4 h-4 animate-spin" />
                <span>UNDERSTANDING QUERY & ROUTING AGENTS...</span>
              </div>
            </div>
          )}

          <div className="scanline" />
        </div>

        {/* Right: Natural Language Interaction & Live Intelligence Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Query Bar */}
          <div className="glass-panel p-4 border-cyan/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-cyan tracking-wider font-bold">USER NATURAL LANGUAGE QUERY</span>
              <span className="text-[9px] font-mono text-zinc-500">Multimodal VLA Prompt</span>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={typedQuery || (phase === 'upload' ? 'Upload GeoTIFF image to begin...' : '')}
                placeholder="Ask anything about this satellite image..."
                className="w-full bg-surface-light border border-cyan/30 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none shadow-inner"
              />
              <div className="absolute right-3 flex items-center gap-1.5">
                {phase === 'processing' ? (
                  <div className="w-4 h-4 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                ) : (
                  <button className="p-1.5 rounded-lg bg-cyan text-black hover:bg-cyan-light transition-all">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* AI Response Card */}
          <div className="glass-panel-glow p-5 rounded-xl border-purple/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple" />
                <span className="text-xs font-bold font-mono tracking-wider text-white">AI EXPLANATION & INTERPRETATION</span>
              </div>
              {phase === 'result' && (
                <span className="px-2 py-0.5 rounded bg-green/10 border border-green/20 text-[10px] font-mono text-green font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  CONFIDENCE: 92%
                </span>
              )}
            </div>

            {phase === 'result' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="text-sm text-zinc-200 leading-relaxed font-mono">
                  &ldquo;The scene contains <span className="text-green font-semibold">agricultural land</span>,{' '}
                  <span className="text-emerald-400 font-semibold">vegetation</span>, and{' '}
                  <span className="text-amber-400 font-semibold">built-up regions</span>.
                  The majority of the plot consists of managed crop fields, with high-density settlements concentrated in the southeastern quadrant.&rdquo;
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                  <div className="p-2 rounded bg-green/10 border border-green/20 text-center">
                    <div className="text-[9px] font-mono text-green">Agriculture</div>
                    <div className="text-xs font-bold font-mono text-white">52% Area</div>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <div className="text-[9px] font-mono text-emerald-400">Vegetation</div>
                    <div className="text-xs font-bold font-mono text-white">28% Area</div>
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-center">
                    <div className="text-[9px] font-mono text-amber-400">Built-Up</div>
                    <div className="text-xs font-bold font-mono text-white">18% Area</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                {phase === 'upload' && 'Waiting for image upload...'}
                {phase === 'query' && 'User entering natural language prompt...'}
                {phase === 'processing' && 'Synthesizing visual-linguistic remote sensing tokens...'}
              </div>
            )}
          </div>

          {/* Core Value Proposition pill */}
          <div className="glass-panel p-3 text-[11px] font-mono text-zinc-300 flex items-center justify-between border-cyan/20">
            <span className="text-cyan font-bold">AUTOMATIC MODEL ROUTING</span>
            <span>Zero manual code • Direct natural language response</span>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <Upload className="w-3.5 h-3.5 text-cyan" />
          <span>Upload Image</span>
          <ArrowRight className="w-3 h-3" />
          <span>Ask in Natural Language</span>
          <ArrowRight className="w-3 h-3" />
          <span>Analyze Multimodal Sensors</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-cyan font-bold">Explain with Evidence</span>
        </div>
        <div className="hidden sm:block text-zinc-400">
          SIH26167 • Software • Code for Nation
        </div>
      </div>
    </div>
  );
}
