'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { demoScenes } from '@/data/demoData';
import { analyzeImage, simulateProcessingPipeline } from '@/services/analysisService';
import ProcessingAnimation from '@/components/visualization/ProcessingAnimation';
import ConfidenceRing from '@/components/visualization/ConfidenceRing';
import { AnalysisResult } from '@/types';

type ViewTab = 'before' | 'after' | 'difference' | 'changemap';

type Props = {
  autoPlayProgress?: number;
};

export default function ChangeScene({ autoPlayProgress }: Props) {
  const [query, setQuery] = useState(demoScenes.change.query);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [viewTab, setViewTab] = useState<ViewTab>('before');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const data = demoScenes.change;

  // Automated progression during video auto-play
  useEffect(() => {
    if (autoPlayProgress !== undefined && autoPlayProgress > 0) {
      if (autoPlayProgress < 0.3) {
        // Script (2:20 - 2:32): Before vs After
        setViewTab('before');
        setResult({
          answer: 'Bi-temporal pair loaded (2022 Baseline vs 2025 Current). Ready for change detection.',
          confidence: 88,
          features: [],
          executionSteps: ['Co-registration Verified', 'Radiometric Normalization'],
          evidence: ['Sentinel-2 2022-03-15', 'Sentinel-2 2025-02-28'],
        });
      } else if (autoPlayProgress < 0.65) {
        // Script (2:32 - 2:46): Difference Wipe Slider Sweep
        setViewTab('difference');
        const sub = (autoPlayProgress - 0.3) / 0.35;
        const wave = 50 + 35 * Math.sin(sub * Math.PI * 2);
        setSliderPos(wave);
        setResult({
          answer: 'Significant built-up expansion detected in the central-eastern region. Agricultural land converted to urban infrastructure.',
          confidence: 88,
          features: [],
          executionSteps: ['Bi-temporal Difference Map Computed', 'Threshold Segmentation'],
          evidence: ['Spatial expansion detected', 'Road network topology aligned'],
        });
      } else {
        // Script (2:46 - 3:00): Change Map
        setViewTab('changemap');
        setResult({
          answer: 'Built-up regions increased by approximately 15% in the highlighted zone between 2022 and 2025.',
          confidence: 88,
          features: [],
          executionSteps: ['Change Mask Generated', 'Area Quantification Complete'],
          evidence: ['+15% Impervious surface growth', 'High confidence in urban clusters'],
        });
      }
    }
  }, [autoPlayProgress]);

  const handleAnalyze = useCallback(async () => {
    setProcessing(true);
    setResult(null);

    await simulateProcessingPipeline(() => {});
    const res = await analyzeImage('change', query);
    setResult(res);
    setProcessing(false);
    setViewTab('difference');
  }, [query]);

  const handleSliderMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pos)));
  };

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <GitCompare className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-white">BI-TEMPORAL CHANGE ANALYSIS</h2>
            <p className="text-[10px] text-zinc-500 tracking-wide">Detect and analyze changes over time</p>
          </div>
        </div>

        {/* View tabs */}
        <div className="flex items-center gap-1 glass-panel p-1">
          {([
            { id: 'before', label: 'Before' },
            { id: 'after', label: 'After' },
            { id: 'difference', label: 'Difference' },
            { id: 'changemap', label: 'Change Map' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-[10px] tracking-wider font-medium transition-all
                ${viewTab === tab.id
                  ? 'bg-cyan/15 text-cyan border border-cyan/20'
                  : 'text-zinc-500 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Image area */}
        <div className="flex-1 flex flex-col">
          {viewTab === 'before' || viewTab === 'after' ? (
            /* Side by side or single view */
            <div className="flex-1 flex gap-3">
              {/* Before image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`glass-panel overflow-hidden relative ${viewTab === 'after' ? 'w-1/2 opacity-50' : 'flex-1'}`}
              >
                <div className="absolute top-3 left-3 z-10 glass-panel px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold tracking-wider text-white">BEFORE</span>
                    <span className="text-[10px] text-zinc-500">2022</span>
                  </div>
                </div>
                <BeforeImage />
              </motion.div>

              {/* After image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`glass-panel overflow-hidden relative ${viewTab === 'before' ? 'w-1/2 opacity-50' : 'flex-1'}`}
              >
                <div className="absolute top-3 left-3 z-10 glass-panel px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-cyan" />
                    <span className="text-[10px] font-bold tracking-wider text-white">AFTER</span>
                    <span className="text-[10px] text-cyan">2025</span>
                  </div>
                </div>
                <AfterImage />
              </motion.div>
            </div>
          ) : viewTab === 'difference' ? (
            /* Wipe slider comparison */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={sliderRef}
              className="flex-1 glass-panel overflow-hidden relative cursor-ew-resize"
              onMouseMove={handleSliderMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              {/* After image (full) */}
              <div className="absolute inset-0">
                <AfterImage />
              </div>

              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div style={{ width: sliderRef.current?.offsetWidth || '100%' }}>
                  <BeforeImage />
                </div>
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-cyan z-10 cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan/20 border-2 border-cyan flex items-center justify-center backdrop-blur-sm">
                  <ArrowRight className="w-3 h-3 text-cyan -rotate-180" />
                  <ArrowRight className="w-3 h-3 text-cyan" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-3 left-3 glass-panel px-3 py-1.5 z-10">
                <span className="text-[10px] font-bold tracking-wider">BEFORE 2022</span>
              </div>
              <div className="absolute top-3 right-3 glass-panel px-3 py-1.5 z-10">
                <span className="text-[10px] font-bold tracking-wider">AFTER 2025</span>
              </div>
            </motion.div>
          ) : (
            /* Change map */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 glass-panel overflow-hidden relative"
            >
              <ChangeMapImage />

              {/* Change overlay highlights */}
              {result && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute rounded-lg border-2 border-red-400"
                    style={{
                      left: '40%', top: '35%', width: '30%', height: '35%',
                      backgroundColor: 'rgba(239,68,68,0.15)',
                      boxShadow: '0 0 20px rgba(239,68,68,0.2)',
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-red-500/90 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm">
                      BUILT-UP EXPANSION
                    </div>
                  </motion.div>
                </>
              )}

              <div className="absolute top-3 left-3 glass-panel px-3 py-1.5 z-10">
                <span className="text-[10px] font-bold tracking-wider text-red-400">CHANGE MAP</span>
              </div>
              <div className="scanline" />
            </motion.div>
          )}

          {/* Query input */}
          <div className="glass-panel p-4 mt-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about temporal changes..."
                className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan/40 transition-colors"
              />
              <button
                onClick={handleAnalyze}
                disabled={processing}
                className="btn-primary flex items-center gap-2 text-xs tracking-wider py-3 disabled:opacity-50"
              >
                <GitCompare className="w-3.5 h-3.5" />
                DETECT CHANGES
              </button>
            </div>
          </div>
        </div>

        {/* Right panel - Stats */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              className="w-72 space-y-3 flex-shrink-0"
            >
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple" />
                  <h3 className="text-xs font-bold tracking-wider">CHANGE ANALYSIS</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{result.answer}</p>
              </div>

              {/* Stats */}
              <div className="glass-panel p-4 space-y-3">
                <div>
                  <span className="text-[10px] text-zinc-500 tracking-wider">DETECTED CHANGE</span>
                  <p className="text-sm font-semibold text-red-400 mt-1">{data.statistics.changeType}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 tracking-wider">AFFECTED REGION</span>
                  <p className="text-sm font-semibold text-amber-400 mt-1">{data.statistics.affectedRegion}</p>
                </div>
              </div>

              <div className="glass-panel p-4 flex justify-center">
                <ConfidenceRing value={result.confidence} size={80} />
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Processing overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ProcessingAnimation
            active={processing}
            onComplete={() => {}}
            taskLabel="Bi-Temporal Change Detection"
          />
        </div>
      )}
    </div>
  );
}

// Real satellite "Before" image (2022)
function BeforeImage() {
  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/before.jpg"
        alt="Sentinel-2 Satellite Image 2022"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2 glass-panel px-2 py-0.5 z-10">
        <span className="text-[9px] font-mono text-zinc-400">Sentinel-2 L2A • 2022-03-15</span>
      </div>
    </div>
  );
}

// Real satellite "After" image (2025 - urban expansion)
function AfterImage() {
  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/after.jpg"
        alt="Sentinel-2 Satellite Image 2025"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2 glass-panel px-2 py-0.5 z-10">
        <span className="text-[9px] font-mono text-cyan">Sentinel-2 L2A • 2025-02-28</span>
      </div>
    </div>
  );
}

// Real Change Map
function ChangeMapImage() {
  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/change-map.jpg"
        alt="Satellite Remote Sensing Change Detection Map"
        className="w-full h-full object-cover"
      />
      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 glass-panel px-3 py-1.5 z-10 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-red-500 shadow-sm shadow-red-500/50" />
          <span className="text-[10px] text-zinc-200 font-mono">Urban Expansion (+15%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-amber-500 shadow-sm shadow-amber-500/50" />
          <span className="text-[10px] text-zinc-300 font-mono">Infra/Roads</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-zinc-700" />
          <span className="text-[10px] text-zinc-400 font-mono">Unchanged</span>
        </div>
      </div>
    </div>
  );
}
