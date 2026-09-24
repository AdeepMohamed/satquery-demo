'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Send, Sparkles } from 'lucide-react';
import { demoScenes } from '@/data/demoData';
import { analyzeImage, simulateProcessingPipeline } from '@/services/analysisService';
import ProcessingAnimation from '@/components/visualization/ProcessingAnimation';
import ConfidenceRing from '@/components/visualization/ConfidenceRing';
import { AnalysisResult } from '@/types';

export default function GroundingScene() {
  const [query, setQuery] = useState(demoScenes.grounding.query);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showBox, setShowBox] = useState(false);
  const data = demoScenes.grounding;

  const handleAnalyze = useCallback(async () => {
    setProcessing(true);
    setResult(null);
    setShowBox(false);

    await simulateProcessingPipeline(() => {});
    const res = await analyzeImage('grounding', query);
    setResult(res);
    setProcessing(false);
    // Animate the bounding box appearance with a delay
    setTimeout(() => setShowBox(true), 300);
  }, [query]);

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-white">VISUAL GROUNDING</h2>
            <p className="text-[10px] text-zinc-500 tracking-wide">Locate and highlight specific regions</p>
          </div>
        </motion.div>

        {/* Image with grounding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex-1 glass-panel overflow-hidden mb-4 min-h-[300px]"
        >
          {/* Satellite image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demo/grounding.jpg"
            alt="Satellite imagery - Grounding analysis"
            className="w-full h-full object-cover"
          />

          {/* Coordinate tag overlay */}
          <div className="absolute top-3 left-3 glass-panel px-2.5 py-1 z-10">
            <span className="text-[10px] font-mono text-cyan">23°15'35"N 77°24'45"E • Sentinel-2 L2A</span>
          </div>

          {/* Scale bar overlay */}
          <div className="absolute bottom-3 right-3 glass-panel px-2 py-0.5 z-10 flex items-center gap-2">
            <div className="w-12 h-0.5 bg-cyan/60" />
            <span className="text-[9px] font-mono text-zinc-400">200m</span>
          </div>

          {/* Animated bounding box */}
          <AnimatePresence>
            {showBox && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15, duration: 0.8 }}
                className="absolute"
                style={{
                  left: `${data.boundingBox.x}%`,
                  top: `${data.boundingBox.y}%`,
                  width: `${data.boundingBox.w}%`,
                  height: `${data.boundingBox.h}%`,
                }}
              >
                {/* Pulsing border */}
                <div className="w-full h-full border-2 border-cyan rounded relative"
                  style={{ boxShadow: '0 0 20px rgba(6,214,242,0.3), inset 0 0 20px rgba(6,214,242,0.05)' }}
                >
                  {/* Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -top-7 left-0"
                  >
                    <div className="bg-cyan/90 text-black text-[11px] font-bold tracking-wider px-3 py-1 rounded-sm shadow-lg">
                      {data.label}
                    </div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -bottom-8 left-0"
                  >
                    <div className="bg-surface-lighter/90 text-zinc-400 text-[9px] tracking-wide px-2 py-0.5 rounded border border-border/50">
                      Demo grounding result
                    </div>
                  </motion.div>

                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan" />

                  {/* Radar pulse effect */}
                  <div className="absolute inset-0 border border-cyan/20 rounded radar-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing overlay */}
          {processing && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <ProcessingAnimation
                active={processing}
                onComplete={() => {}}
                taskLabel="Visual Grounding"
              />
            </div>
          )}

          <div className="scanline" />
        </motion.div>

        {/* Query */}
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask where something is..."
              className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan/40 transition-colors"
            />
            <button
              onClick={handleAnalyze}
              disabled={processing}
              className="btn-primary flex items-center gap-2 text-xs tracking-wider py-3 disabled:opacity-50"
            >
              <Target className="w-3.5 h-3.5" />
              LOCATE
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <AnimatePresence>
        {result && (
          <motion.aside
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            className="w-80 border-l border-border/50 overflow-y-auto p-4 space-y-4"
            style={{ background: 'rgba(5,5,16,0.6)' }}
          >
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple" />
                <h3 className="text-xs font-bold tracking-wider">GROUNDING RESULT</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{result.answer}</p>
            </div>

            <div className="glass-panel p-4 flex justify-center">
              <ConfidenceRing value={result.confidence} size={90} />
            </div>

            <div className="glass-panel p-4">
              <h3 className="text-xs font-bold tracking-wider mb-3">EXECUTION</h3>
              {result.executionSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] mb-1.5">
                  <span className="text-green">✓</span>
                  <span className="text-zinc-400">{step}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
