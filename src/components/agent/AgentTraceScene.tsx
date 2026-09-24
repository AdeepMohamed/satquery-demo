'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit, MessageSquare, FileText, Target,
  GitCompare, Layers, Check, Loader2, Circle, Send
} from 'lucide-react';
import { agentTools } from '@/data/demoData';

type ToolStatus = 'idle' | 'selected' | 'active' | 'complete';

const toolIcons: Record<string, React.ElementType> = {
  MessageSquare,
  FileText,
  Target,
  GitCompare,
  Layers,
};

const demoQuery = 'What changed in the built-up area, and show me where?';
const demoToolSelection = ['change', 'grounding', 'vqa'];
const demoTrace = [
  { id: 1, label: 'Input validated', tool: null },
  { id: 2, label: 'Change detector selected', tool: 'change' },
  { id: 3, label: 'Grounding model executed', tool: 'grounding' },
  { id: 4, label: 'VQA generated', tool: 'vqa' },
  { id: 5, label: 'Evidence validated', tool: null },
  { id: 6, label: 'Final answer generated', tool: null },
];

type Props = {
  autoPlayProgress?: number;
};

export default function AgentTraceScene({ autoPlayProgress }: Props) {
  const [query, setQuery] = useState(demoQuery);
  const [running, setRunning] = useState(false);
  const [toolStatuses, setToolStatuses] = useState<Record<string, ToolStatus>>({});
  const [traceSteps, setTraceSteps] = useState<Array<{ id: number; label: string; status: 'pending' | 'processing' | 'complete' }>>([]);
  const [routerPhase, setRouterPhase] = useState<string>('');

  // Automated progression during video auto-play
  useEffect(() => {
    if (autoPlayProgress !== undefined && autoPlayProgress > 0) {
      setQuery(demoQuery);
      const totalSteps = demoTrace.length;
      const completedCount = Math.floor(autoPlayProgress * (totalSteps + 1));

      // Calculate tool states
      const statuses: Record<string, ToolStatus> = {
        vqa: autoPlayProgress > 0.5 ? 'complete' : autoPlayProgress > 0.35 ? 'active' : 'idle',
        caption: 'idle',
        grounding: autoPlayProgress > 0.4 ? 'complete' : autoPlayProgress > 0.25 ? 'active' : 'idle',
        change: autoPlayProgress > 0.3 ? 'complete' : autoPlayProgress > 0.15 ? 'active' : 'idle',
        fusion: 'idle',
      };
      setToolStatuses(statuses);

      if (autoPlayProgress < 0.2) {
        setRouterPhase('ANALYZING INTENT');
      } else if (autoPlayProgress < 0.7) {
        setRouterPhase('DISPATCHING SPECIALISTS: CHANGE + GROUNDING + VQA');
      } else {
        setRouterPhase('FUSED CONSENSUS GENERATED');
      }

      setTraceSteps(
        demoTrace.map((step, idx) => ({
          ...step,
          status: idx < completedCount ? 'complete' : idx === completedCount ? 'processing' : 'pending',
        }))
      );
    }
  }, [autoPlayProgress]);

  const runDemo = useCallback(async () => {
    setRunning(true);
    setTraceSteps(demoTrace.map((t) => ({ ...t, status: 'pending' })));

    // Reset tools
    const initStatuses: Record<string, ToolStatus> = {};
    agentTools.forEach((t) => { initStatuses[t.id] = 'idle'; });
    setToolStatuses(initStatuses);

    // Phase 1: Query understanding
    setRouterPhase('ANALYZING QUERY');
    await delay(800);

    // Phase 2: Process each trace step
    for (let i = 0; i < demoTrace.length; i++) {
      setTraceSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'processing' } : s))
      );

      if (demoTrace[i].tool) {
        setToolStatuses((prev) => ({ ...prev, [demoTrace[i].tool!]: 'selected' }));
        await delay(300);
        setToolStatuses((prev) => ({ ...prev, [demoTrace[i].tool!]: 'active' }));
      }

      if (i === 2) {
        setRouterPhase('SELECTING TOOLS');
        demoToolSelection.forEach((toolId) => {
          setToolStatuses((prev) => ({ ...prev, [toolId]: 'selected' }));
        });
      }

      await delay(600 + Math.floor((i % 3) * 200));

      if (demoTrace[i].tool) {
        setToolStatuses((prev) => ({ ...prev, [demoTrace[i].tool!]: 'complete' }));
      }

      setTraceSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'complete' } : s))
      );
    }

    setRouterPhase('COMPLETE');
    await delay(500);
    setRunning(false);
  }, []);

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-8 h-8 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center">
          <BrainCircuit className="w-4 h-4 text-purple" />
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-wider text-white">AGENTIC ROUTER</h2>
          <p className="text-[10px] text-zinc-500 tracking-wide">Intelligent task routing and execution</p>
        </div>
      </motion.div>

      <div className="flex-1 flex gap-6">
        {/* Center - Router Visualization */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            {/* Central node */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-32 h-32 rounded-full glass-panel-glow flex flex-col items-center justify-center"
                style={{
                  boxShadow: running
                    ? '0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)'
                    : '0 0 20px rgba(139,92,246,0.1)',
                }}
              >
                <BrainCircuit className="w-8 h-8 text-purple mb-1" />
                <span className="text-[9px] font-bold tracking-wider text-white">SATQUERY AI</span>
                <span className="text-[8px] text-purple tracking-wider">AGENTIC ROUTER</span>
              </div>

              {/* Router phase label */}
              {routerPhase && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                  <span className="text-[9px] text-cyan tracking-wider font-medium">{routerPhase}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Tool nodes arranged in circle */}
            <svg viewBox="0 0 500 400" className="w-full" style={{ minHeight: '350px' }}>
              <defs>
                <filter id="glowFilter">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connection lines from center to tools */}
              {agentTools.map((tool, i) => {
                const angle = ((i - 2) * (360 / agentTools.length) - 90) * (Math.PI / 180);
                const cx = 250;
                const cy = 200;
                const radius = 150;
                const tx = cx + radius * Math.cos(angle);
                const ty = cy + radius * Math.sin(angle);
                const status = toolStatuses[tool.id] || 'idle';
                const isActive = status === 'active' || status === 'selected' || status === 'complete';

                return (
                  <g key={tool.id}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={tx}
                      y2={ty}
                      stroke={
                        status === 'complete'
                          ? '#22c55e'
                          : status === 'active'
                          ? '#06d6f2'
                          : status === 'selected'
                          ? '#8b5cf6'
                          : '#1e1e3a'
                      }
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={isActive ? 'none' : '4 4'}
                      className={isActive ? 'flow-line' : ''}
                      opacity={isActive ? 0.8 : 0.3}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tool nodes (positioned with CSS) */}
            {agentTools.map((tool, i) => {
              const angle = ((i - 2) * (360 / agentTools.length) - 90) * (Math.PI / 180);
              const radius = 42;
              const left = 50 + radius * Math.cos(angle);
              const top = 50 + radius * Math.sin(angle);
              const status = toolStatuses[tool.id] || 'idle';
              const Icon = toolIcons[tool.icon] || Circle;

              return (
                <motion.div
                  key={tool.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1, type: 'spring', damping: 15 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <div
                    className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-500 border
                      ${status === 'complete'
                        ? 'bg-green/10 border-green/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                        : status === 'active'
                        ? 'bg-cyan/10 border-cyan/30 shadow-[0_0_20px_rgba(6,214,242,0.2)]'
                        : status === 'selected'
                        ? 'bg-purple/10 border-purple/30'
                        : 'bg-surface-light/50 border-border/50 opacity-40'
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        status === 'complete'
                          ? 'text-green'
                          : status === 'active'
                          ? 'text-cyan'
                          : status === 'selected'
                          ? 'text-purple'
                          : 'text-zinc-600'
                      }`}
                    />
                    <span className={`text-[8px] font-bold tracking-wider ${
                      status !== 'idle' ? 'text-white' : 'text-zinc-600'
                    }`}>
                      {tool.name}
                    </span>
                    {status === 'complete' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green rounded-full flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 text-black" />
                      </motion.div>
                    )}
                    {status === 'active' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-cyan rounded-full flex items-center justify-center"
                      >
                        <Loader2 className="w-2.5 h-2.5 text-black animate-spin" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right - Execution Trace */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-80 space-y-4 flex-shrink-0"
        >
          {/* Query input */}
          <div className="glass-panel p-4">
            <span className="text-[10px] text-zinc-500 tracking-wider block mb-2">USER QUERY</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-surface-light border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple/40 transition-colors"
              />
              <button
                onClick={runDemo}
                disabled={running}
                className="p-2 rounded-lg bg-purple/15 border border-purple/30 text-purple hover:bg-purple/25 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Execution trace */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-bold tracking-wider text-white mb-4">EXECUTION TRACE</h3>
            <div className="space-y-2">
              {(traceSteps.length > 0 ? traceSteps : demoTrace.map((t) => ({ ...t, status: 'pending' as const }))).map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: step.id * 0.05 }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
                    ${step.status === 'processing'
                      ? 'bg-cyan/5 border border-cyan/10'
                      : step.status === 'complete'
                      ? 'bg-green/5'
                      : 'opacity-40'
                    }`}
                >
                  <span className="text-[10px] text-zinc-600 font-mono w-5">
                    {String(step.id).padStart(2, '0')}
                  </span>
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    {step.status === 'complete' ? (
                      <Check className="w-3.5 h-3.5 text-green" />
                    ) : step.status === 'processing' ? (
                      <Loader2 className="w-3.5 h-3.5 text-cyan animate-spin" />
                    ) : (
                      <Circle className="w-2.5 h-2.5 text-zinc-700" />
                    )}
                  </div>
                  <span className={`text-xs tracking-wide ${
                    step.status === 'complete'
                      ? 'text-green'
                      : step.status === 'processing'
                      ? 'text-cyan'
                      : 'text-zinc-600'
                  }`}>
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info note */}
          <div className="glass-panel p-3">
            <p className="text-[10px] text-zinc-600 leading-relaxed">
              Only the observable execution trace is shown. Internal reasoning and chain-of-thought are not exposed.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
