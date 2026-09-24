'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Eye, Radio, Sparkles, ArrowRight } from 'lucide-react';
import { demoScenes } from '@/data/demoData';
import { analyzeImage, simulateProcessingPipeline } from '@/services/analysisService';
import ProcessingAnimation from '@/components/visualization/ProcessingAnimation';
import ConfidenceRing from '@/components/visualization/ConfidenceRing';
import { AnalysisResult } from '@/types';

type EvidenceView = 'optical' | 'sar' | 'fused';

type Props = {
  autoPlayProgress?: number;
};

export default function FusionScene({ autoPlayProgress }: Props) {
  const [query, setQuery] = useState(demoScenes.fusion.query);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [evidenceView, setEvidenceView] = useState<EvidenceView>('fused');
  const data = demoScenes.fusion;

  // Automated progression during video auto-play
  useEffect(() => {
    if (autoPlayProgress !== undefined && autoPlayProgress > 0) {
      if (autoPlayProgress < 0.25) {
        // 3:00 - 3:10: Initial side-by-side view
        setEvidenceView('optical');
        setResult(null);
      } else if (autoPlayProgress < 0.5) {
        // 3:10 - 3:20: SAR focus
        setEvidenceView('sar');
        setResult(null);
      } else {
        // 3:20 - 3:40: Fused Multimodal Consensus
        setEvidenceView('fused');
        setResult({
          answer:
            'Multimodal fusion combines Sentinel-2 optical reflectance and Sentinel-1 SAR backscatter. Low radar return isolates calm water bodies in the northwest, while strong double-bounce backscatter isolates built-up clusters in the southeast.',
          confidence: 89,
          features: data.detectedRegions,
          executionSteps: [
            'Optical & SAR Coregistration',
            'Cross-Modal Feature Alignment',
            'Dual-Sensor Consensus Voting',
          ],
          evidence: [
            'Water: Low SAR return + dark optical signature',
            'Built-up: High SAR return + high optical reflectance',
          ],
        });
      }
    }
  }, [autoPlayProgress, data.detectedRegions]);

  const handleAnalyze = useCallback(async () => {
    setProcessing(true);
    setResult(null);

    await simulateProcessingPipeline(() => {});
    const res = await analyzeImage('fusion', query);
    setResult(res);
    setProcessing(false);
  }, [query]);

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-purple" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-white">OPTICAL + SAR MULTIMODAL FUSION</h2>
            <p className="text-[10px] text-zinc-500 tracking-wide">Cross-modal sensor fusion analysis</p>
          </div>
        </div>

        {result && (
          <div className="flex items-center gap-1 glass-panel p-1">
            {([
              { id: 'optical', label: 'Optical Evidence', icon: Eye },
              { id: 'sar', label: 'SAR Evidence', icon: Radio },
              { id: 'fused', label: 'Fused', icon: Layers },
            ] as const).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEvidenceView(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] tracking-wider font-medium transition-all
                    ${evidenceView === tab.id
                      ? 'bg-purple/15 text-purple border border-purple/20'
                      : 'text-zinc-500 hover:text-white'
                    }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 flex flex-col">
          {/* Split screen images */}
          <div className="flex-1 flex gap-3 relative">
            {/* Optical image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex-1 glass-panel overflow-hidden relative transition-opacity duration-300
                ${evidenceView === 'sar' ? 'opacity-40' : ''}`}
            >
              <div className="absolute top-3 left-3 z-10 glass-panel px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-green" />
                  <span className="text-[10px] font-bold tracking-wider text-white">OPTICAL</span>
                </div>
              </div>
              <OpticalImage />
              {/* Optical evidence overlay */}
              {result && (evidenceView === 'optical' || evidenceView === 'fused') && (
                <div className="absolute inset-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="absolute rounded-lg border border-blue-400"
                    style={{
                      left: '8%', top: '12%', width: '35%', height: '30%',
                      backgroundColor: 'rgba(59,130,246,0.15)',
                    }}
                  >
                    <span className="absolute -top-5 left-0 text-[9px] text-blue-400 font-bold tracking-wider">WATER</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.3 }}
                    className="absolute rounded-lg border border-amber-400"
                    style={{
                      left: '45%', top: '40%', width: '45%', height: '45%',
                      backgroundColor: 'rgba(245,158,11,0.15)',
                    }}
                  >
                    <span className="absolute -top-5 left-0 text-[9px] text-amber-400 font-bold tracking-wider">BUILT-UP</span>
                  </motion.div>
                </div>
              )}
              <div className="scanline" />
            </motion.div>

            {/* Fusion connector */}
            <div className="flex flex-col items-center justify-center gap-2 w-16 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-px h-12 bg-gradient-to-b from-green/30 to-purple/30" />
                <div className="w-10 h-10 rounded-full bg-purple/10 border border-purple/30 flex items-center justify-center my-2">
                  <Layers className="w-4 h-4 text-purple" />
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-purple/30 to-amber-500/30" />
              </motion.div>
              <span className="text-[8px] text-zinc-600 tracking-wider text-center leading-tight">
                FUSION<br />MODULE
              </span>
            </div>

            {/* SAR image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex-1 glass-panel overflow-hidden relative transition-opacity duration-300
                ${evidenceView === 'optical' ? 'opacity-40' : ''}`}
            >
              <div className="absolute top-3 left-3 z-10 glass-panel px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <Radio className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-bold tracking-wider text-white">SAR</span>
                </div>
              </div>
              <SARImage />
              {/* SAR evidence overlay */}
              {result && (evidenceView === 'sar' || evidenceView === 'fused') && (
                <div className="absolute inset-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="absolute rounded-lg border border-blue-400"
                    style={{
                      left: '8%', top: '10%', width: '30%', height: '28%',
                      backgroundColor: 'rgba(59,130,246,0.12)',
                    }}
                  >
                    <span className="absolute -top-5 left-0 text-[9px] text-blue-400 font-bold tracking-wider">LOW RETURN</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.3 }}
                    className="absolute rounded-lg border border-amber-400"
                    style={{
                      left: '48%', top: '38%', width: '42%', height: '48%',
                      backgroundColor: 'rgba(245,158,11,0.12)',
                    }}
                  >
                    <span className="absolute -top-5 left-0 text-[9px] text-amber-400 font-bold tracking-wider">HIGH RETURN</span>
                  </motion.div>
                </div>
              )}
              <div className="scanline" />
            </motion.div>
          </div>

          {/* Query input */}
          <div className="glass-panel p-4 mt-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about multimodal fusion..."
                className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple/40 transition-colors"
              />
              <button
                onClick={handleAnalyze}
                disabled={processing}
                className="btn-primary flex items-center gap-2 text-xs tracking-wider py-3 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
              >
                <Layers className="w-3.5 h-3.5" />
                FUSE & ANALYZE
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
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
                  <h3 className="text-xs font-bold tracking-wider">FUSED INTERPRETATION</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{result.answer}</p>
              </div>

              <div className="glass-panel p-4">
                <h3 className="text-xs font-bold tracking-wider mb-3">DETECTED REGIONS</h3>
                {data.detectedRegions.map((region) => (
                  <div key={region.name} className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="text-xs text-zinc-300">{region.name}</span>
                  </div>
                ))}
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
            taskLabel="Optical + SAR Fusion"
          />
        </div>
      )}
    </div>
  );
}

// Real Optical satellite image
function OpticalImage() {
  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/optical.jpg"
        alt="Optical Multispectral Imagery (RGB)"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2 glass-panel px-2 py-0.5 z-10">
        <span className="text-[9px] font-mono text-emerald-400">Sentinel-2 L2A • RGB (B4,B3,B2)</span>
      </div>
    </div>
  );
}

// Real SAR image (grayscale radar)
function SARImage() {
  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/sar.jpg"
        alt="Synthetic Aperture Radar (SAR) Imagery"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2 glass-panel px-2 py-0.5 z-10">
        <span className="text-[9px] font-mono text-amber-300">Sentinel-1 C-Band • VV/VH Backscatter</span>
      </div>
    </div>
  );
}
