'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Circle } from 'lucide-react';
import { ProcessingStage } from '@/types';
import { processingPipeline } from '@/data/demoData';

type Props = {
  active: boolean;
  onComplete: () => void;
  taskLabel?: string;
};

export default function ProcessingAnimation({ active, onComplete, taskLabel }: Props) {
  const [stages, setStages] = useState<ProcessingStage[]>(
    processingPipeline.map((s) => ({ ...s, status: 'pending' }))
  );
  const [currentIdx, setCurrentIdx] = useState(-1);

  const runPipeline = useCallback(async () => {
    const newStages: ProcessingStage[] = processingPipeline.map((s) => ({ ...s, status: 'pending' }));
    setStages(newStages);

    for (let i = 0; i < newStages.length; i++) {
      setCurrentIdx(i);
      newStages[i] = { ...newStages[i], status: 'processing' as const };
      setStages([...newStages]);
      await new Promise((r) => setTimeout(r, newStages[i].duration || 500));
      newStages[i] = { ...newStages[i], status: 'complete' as const };
      setStages([...newStages]);
      await new Promise((r) => setTimeout(r, 80));
    }

    setTimeout(() => onComplete(), 300);
  }, [onComplete]);

  useEffect(() => {
    if (active) {
      runPipeline();
    }
  }, [active, runPipeline]);

  if (!active && currentIdx === -1) return null;

  const completedCount = stages.filter((s) => s.status === 'complete').length;
  const progress = (completedCount / stages.length) * 100;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-panel-glow p-6 max-w-md mx-auto"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-purple animate-spin" />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white">
                AI PROCESSING PIPELINE
              </h3>
              {taskLabel && (
                <p className="text-[10px] text-zinc-500 tracking-wide mt-0.5">{taskLabel}</p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-surface-lighter rounded-full mb-5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan to-purple"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Stages */}
          <div className="space-y-2">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                  stage.status === 'processing'
                    ? 'bg-cyan/5 border border-cyan/10'
                    : stage.status === 'complete'
                    ? 'bg-green/5'
                    : 'opacity-40'
                }`}
              >
                {/* Status icon */}
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {stage.status === 'complete' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <Check className="w-4 h-4 text-green" />
                    </motion.div>
                  ) : stage.status === 'processing' ? (
                    <Loader2 className="w-4 h-4 text-cyan animate-spin" />
                  ) : (
                    <Circle className="w-3 h-3 text-zinc-600" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs tracking-wide font-medium ${
                    stage.status === 'complete'
                      ? 'text-green'
                      : stage.status === 'processing'
                      ? 'text-cyan'
                      : 'text-zinc-600'
                  }`}
                >
                  {stage.label}
                </span>

                {/* Connection line */}
                {i < stages.length - 1 && stage.status === 'complete' && (
                  <div className="ml-auto text-zinc-700 text-[10px]">✓</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
