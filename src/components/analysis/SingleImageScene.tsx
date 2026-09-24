'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Send, Sparkles, Eye, Layers, Target, X } from 'lucide-react';
import { demoScenes, querySuggestions } from '@/data/demoData';
import { analyzeImage, simulateProcessingPipeline } from '@/services/analysisService';
import ProcessingAnimation from '@/components/visualization/ProcessingAnimation';
import ConfidenceRing from '@/components/visualization/ConfidenceRing';
import { AnalysisResult, ProcessingStage } from '@/types';

type ViewMode = 'original' | 'semantic' | 'grounding';

type Props = {
  autoPlayProgress?: number;
};

export default function SingleImageScene({ autoPlayProgress }: Props) {
  const [query, setQuery] = useState(demoScenes.singleImage.query);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('original');
  const [imageLoaded, setImageLoaded] = useState(false);
  const data = demoScenes.singleImage;

  // Automated progression during video auto-play
  useEffect(() => {
    if (autoPlayProgress !== undefined && autoPlayProgress > 0) {
      if (autoPlayProgress < 0.45) {
        // Script Demo 1 (1:45 - 2:00): "Describe this image"
        setQuery('Describe this image');
        setViewMode('semantic');
        setResult({
          answer: 'The image shows predominantly agricultural and vegetated land with scattered built-up regions.',
          confidence: 94,
          features: demoScenes.singleImage.features,
          executionSteps: ['Input Validated', 'VQA & Captioning Engine', 'Semantic Consistency Verified'],
          evidence: ['52% Agricultural cover', '28% Vegetation', '18% Built-up Cluster'],
        });
      } else {
        // Script Demo 2 (2:00 - 2:20): "Where is the built-up area?"
        setQuery('Where is the built-up area?');
        setViewMode('grounding');
        setResult({
          answer: 'Built-up area localized in the southeastern quadrant, bounded at [50% X, 45% Y, 35% W, 40% H].',
          confidence: 91,
          features: demoScenes.singleImage.features,
          executionSteps: ['Spatial Grounding Model', 'Coordinate Telemetry Extraction', 'Bounding Verification'],
          evidence: ['Settlement cluster detected', 'Coordinate 23.2599°N 77.4126°E verified'],
        });
      }
    }
  }, [autoPlayProgress]);

  const handleAnalyze = useCallback(async () => {
    setProcessing(true);
    setResult(null);

    // Simulate pipeline then get result
    await simulateProcessingPipeline(() => {});
    const res = await analyzeImage('single', query);
    setResult(res);
    setProcessing(false);
  }, [query]);

  return (
    <div className="h-full flex">
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wider text-white">SINGLE IMAGE ANALYSIS</h2>
              <p className="text-[10px] text-zinc-500 tracking-wide">Vision-Language Query</p>
            </div>
          </div>

          {/* View toggles */}
          {result && (
            <div className="flex items-center gap-1 glass-panel p-1">
              {([
                { id: 'original', label: 'Original', icon: Eye },
                { id: 'semantic', label: 'Semantic Overlay', icon: Layers },
                { id: 'grounding', label: 'Grounding', icon: Target },
              ] as const).map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] tracking-wider font-medium transition-all
                      ${viewMode === mode.id
                        ? 'bg-cyan/15 text-cyan border border-cyan/20'
                        : 'text-zinc-500 hover:text-white'
                      }`}
                  >
                    <Icon className="w-3 h-3" />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Image Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex-1 glass-panel overflow-hidden mb-4 min-h-[300px] flex items-center justify-center"
        >
          {/* Placeholder satellite image using canvas-generated pattern */}
          <DemoSatelliteImage viewMode={viewMode} hasResult={!!result} />

          {/* Scanline overlay */}
          <div className="scanline" />

          {/* Bounding box overlay for grounding mode */}
          {result && viewMode === 'grounding' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute"
              style={{
                left: '50%',
                top: '45%',
                width: '35%',
                height: '40%',
              }}
            >
              <div className="w-full h-full border-2 border-cyan rounded-sm relative"
                style={{ boxShadow: '0 0 15px rgba(6,214,242,0.3), inset 0 0 15px rgba(6,214,242,0.05)' }}
              >
                <div className="absolute -top-6 left-0 bg-cyan/90 text-black text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm">
                  BUILT-UP REGION
                </div>
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan" />
              </div>
            </motion.div>
          )}

          {/* Semantic overlay */}
          {result && viewMode === 'semantic' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-transparent to-amber-500/15" />
              {data.features.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: i * 0.2 }}
                  className="absolute rounded-lg"
                  style={{
                    backgroundColor: feat.color + '33',
                    border: `1px solid ${feat.color}44`,
                    left: `${10 + i * 18}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    width: `${20 + (i % 2) * 10}%`,
                    height: `${20 + (i % 3) * 8}%`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Processing overlay */}
          {processing && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <ProcessingAnimation
                active={processing}
                onComplete={() => {}}
                taskLabel="Single Image Analysis"
              />
            </div>
          )}
        </motion.div>

        {/* Query Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about your satellite image..."
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan/40 transition-colors font-sans"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={processing}
              className="btn-primary flex items-center gap-2 text-xs tracking-wider py-3 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              ANALYZE
            </button>
          </div>

          {/* Query suggestions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-zinc-600 tracking-wider">SUGGESTIONS:</span>
            {querySuggestions.slice(0, 3).map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="text-[10px] text-zinc-500 hover:text-cyan px-2 py-1 rounded-md border border-border/50 hover:border-cyan/30 transition-all tracking-wide"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Results */}
      <AnimatePresence>
        {result && (
          <motion.aside
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-80 border-l border-border/50 flex flex-col overflow-y-auto"
            style={{ background: 'rgba(5,5,16,0.6)' }}
          >
            <div className="p-4 space-y-4">
              {/* AI Response */}
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple" />
                  <h3 className="text-xs font-bold tracking-wider text-white">AI RESPONSE</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{result.answer}</p>
              </div>

              {/* Detected Features */}
              <div className="glass-panel p-4">
                <h3 className="text-xs font-bold tracking-wider text-white mb-3">DETECTED FEATURES</h3>
                <div className="space-y-2">
                  {result.features.map((feat) => (
                    <div key={feat.name} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: feat.color }}
                      />
                      <span className="text-xs text-zinc-300 flex-1">{feat.name}</span>
                      {feat.percentage !== undefined && (
                        <span className="text-xs text-zinc-500 font-mono">{feat.percentage}%</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence */}
              <div className="glass-panel p-4 flex justify-center">
                <ConfidenceRing value={result.confidence} size={90} />
              </div>

              {/* Execution Summary */}
              <div className="glass-panel p-4">
                <h3 className="text-xs font-bold tracking-wider text-white mb-3">EXECUTION SUMMARY</h3>
                <div className="space-y-1.5">
                  {result.executionSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px]">
                      <span className="text-green">✓</span>
                      <span className="text-zinc-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

// Demo satellite image component
function DemoSatelliteImage({ viewMode, hasResult }: { viewMode: ViewMode; hasResult: boolean }) {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '300px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/single-image.jpg"
        alt="Satellite imagery - Agricultural and built-up regions"
        className="w-full h-full object-cover"
      />

      {/* Top-left coordinate info */}
      <div className="absolute top-3 left-3 glass-panel px-2 py-1">
        <span className="text-[9px] font-mono text-zinc-500">23.2599°N 77.4126°E</span>
      </div>

      {/* Scale bar */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <div className="w-16 h-0.5 bg-white/30" />
        <span className="text-[9px] font-mono text-zinc-500">500m</span>
      </div>
    </div>
  );
}
