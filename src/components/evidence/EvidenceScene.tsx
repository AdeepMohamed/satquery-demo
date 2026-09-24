'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileDown, Sparkles, Check, ArrowRight } from 'lucide-react';
import { demoScenes } from '@/data/demoData';
import ConfidenceRing from '@/components/visualization/ConfidenceRing';
import { generateReport, downloadReport } from '@/services/reportService';

type Props = {
  autoPlayProgress?: number;
};

export default function EvidenceScene({ autoPlayProgress }: Props) {
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const data = demoScenes.change; // Using change analysis as example

  // Automated progression during video auto-play
  useEffect(() => {
    if (autoPlayProgress !== undefined && autoPlayProgress > 0) {
      if (autoPlayProgress < 0.35) {
        setGenerating(false);
        setReportReady(false);
      } else if (autoPlayProgress < 0.65) {
        setGenerating(true);
        setReportReady(false);
      } else {
        setGenerating(false);
        setReportReady(true);
      }
    }
  }, [autoPlayProgress]);

  const handleGenerateReport = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setReportReady(true);
    setGenerating(false);
  };

  const handleDownload = async () => {
    const blob = await generateReport({
      title: 'SatQuery AI - Remote Sensing Analysis Report',
      input: 'Bi-temporal satellite imagery',
      query: data.query,
      analysisType: 'Change Detection',
      result: 'Built-up expansion detected in highlighted region.',
      evidence: 'Visual change map with temporal difference analysis',
      confidence: data.confidence,
      executionSteps: [
        'Validated',
        'Change Detection',
        'Grounding',
        'Validation',
      ],
      timestamp: new Date().toISOString(),
    });
    downloadReport(blob, 'satquery-analysis-report.txt');
  };

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-green" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-white">EVIDENCE & CONFIDENCE</h2>
            <p className="text-[10px] text-zinc-500 tracking-wide">Validated results with supporting evidence</p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex gap-6 max-w-5xl mx-auto w-full">
        {/* Left column - Answer & Evidence */}
        <div className="flex-1 space-y-4">
          {/* Answer card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-glow p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple" />
              <h3 className="text-sm font-bold tracking-wider text-white">ANSWER</h3>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed">
              Built-up area increased significantly in the highlighted region. Agricultural land has been converted to urban development, with an estimated 15% increase in impervious surface area between 2022 and 2025.
            </p>
          </motion.div>

          {/* Visual Evidence */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6"
          >
            <h3 className="text-sm font-bold tracking-wider text-white mb-4">VISUAL EVIDENCE & CORROBORATION</h3>
            
            {/* Satellite Evidence Thumbnails */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg overflow-hidden border border-border/60 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/demo/before.jpg" alt="Evidence: Before 2022" className="w-full h-24 object-cover transition-transform group-hover:scale-105 duration-300" />
                <div className="absolute bottom-1.5 left-1.5 glass-panel px-1.5 py-0.5 z-10">
                  <span className="text-[9px] font-mono text-zinc-300 font-semibold">T1: 2022-03</span>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-border/60 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/demo/after.jpg" alt="Evidence: After 2025" className="w-full h-24 object-cover transition-transform group-hover:scale-105 duration-300" />
                <div className="absolute bottom-1.5 left-1.5 glass-panel px-1.5 py-0.5 z-10">
                  <span className="text-[9px] font-mono text-cyan font-semibold">T2: 2025-02</span>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-border/60 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/demo/change-map.jpg" alt="Evidence: Change Map" className="w-full h-24 object-cover transition-transform group-hover:scale-105 duration-300" />
                <div className="absolute bottom-1.5 left-1.5 glass-panel px-1.5 py-0.5 z-10">
                  <span className="text-[9px] font-mono text-red-400 font-semibold">Δ Change Mask</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { text: 'Temporal difference detected between 2022 and 2025', color: '#22c55e' },
                { text: 'Spatial region highlighted with change mask', color: '#06d6f2' },
                { text: 'Grounding evidence attached with bounding coordinates', color: '#8b5cf6' },
                { text: 'Cross-validated with spectral analysis', color: '#f59e0b' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 px-3 py-2 rounded-lg bg-white/[0.02]"
                >
                  <div className="mt-0.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  <span className="text-xs text-zinc-300">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Execution Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h3 className="text-sm font-bold tracking-wider text-white mb-4">EXECUTION SUMMARY</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {['Validated', 'Change Detection', 'Grounding', 'Validation'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green/5 border border-green/10">
                    <Check className="w-3 h-3 text-green" />
                    <span className="text-[10px] text-green tracking-wider font-medium">{step}</span>
                  </div>
                  {i < 3 && <ArrowRight className="w-3 h-3 text-zinc-600" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column - Confidence & Report */}
        <div className="w-64 space-y-4 flex-shrink-0">
          {/* Confidence */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel-glow p-6 flex flex-col items-center"
          >
            <ConfidenceRing value={88} size={120} />
          </motion.div>

          {/* Report Generation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 space-y-3"
          >
            <h3 className="text-sm font-bold tracking-wider text-white">REPORT</h3>

            {reportReady ? (
              <>
                {/* Report preview */}
                <div className="bg-surface-light rounded-lg p-4 border border-border">
                  <div className="text-center mb-3">
                    <p className="text-[10px] text-cyan tracking-[0.2em] font-bold">SATQUERY AI</p>
                    <p className="text-[9px] text-zinc-500 tracking-wider">Remote Sensing Analysis Report</p>
                  </div>
                  <div className="space-y-2 text-[9px] text-zinc-500">
                    <div>
                      <span className="text-zinc-600">Input:</span> Bi-temporal imagery
                    </div>
                    <div>
                      <span className="text-zinc-600">Analysis:</span> Change Detection
                    </div>
                    <div>
                      <span className="text-zinc-600">Confidence:</span> 88% (Demo)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full btn-primary flex items-center justify-center gap-2 text-xs tracking-wider py-2.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  DOWNLOAD REPORT
                </button>
                <button className="w-full btn-secondary flex items-center justify-center gap-2 text-xs tracking-wider py-2.5">
                  <FileDown className="w-3.5 h-3.5" />
                  EXPORT PDF
                </button>
              </>
            ) : (
              <button
                onClick={handleGenerateReport}
                disabled={generating}
                className="w-full btn-primary flex items-center justify-center gap-2 text-xs tracking-wider py-2.5 disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    GENERATING...
                  </>
                ) : (
                  <>
                    <FileDown className="w-3.5 h-3.5" />
                    GENERATE REPORT
                  </>
                )}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
