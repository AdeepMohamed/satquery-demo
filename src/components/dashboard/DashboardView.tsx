'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ImageIcon, Target, GitCompare, Layers, BrainCircuit,
  ShieldCheck, FileBarChart, Sparkles, Plus
} from 'lucide-react';
import { DemoScene } from '@/types';
import Scene1Hook from '@/components/demo/Scene1Hook';
import Scene2Problem from '@/components/demo/Scene2Problem';
import Scene3Overview from '@/components/demo/Scene3Overview';
import Scene4Architecture from '@/components/demo/Scene4Architecture';
import SingleImageScene from '@/components/analysis/SingleImageScene';
import GroundingScene from '@/components/analysis/GroundingScene';
import ChangeScene from '@/components/analysis/ChangeScene';
import FusionScene from '@/components/analysis/FusionScene';
import AgentTraceScene from '@/components/agent/AgentTraceScene';
import EvidenceScene from '@/components/evidence/EvidenceScene';
import ImpactScene from '@/components/demo/ImpactScene';

type Props = {
  currentScene: DemoScene;
  onSceneChange: (scene: DemoScene) => void;
  presentationMode: boolean;
  autoPlayProgress?: number;
};

const sidebarItems = [
  { id: 'intro', label: '01. The Opening Hook', icon: Sparkles },
  { id: 'problem', label: '02. The Problem', icon: Target },
  { id: 'overview', label: '03. What is SatQuery?', icon: Sparkles },
  { id: 'architecture', label: '04. Core Architecture', icon: BrainCircuit },
  { id: 'single', label: '05. Single Image Analysis', icon: ImageIcon },
  { id: 'change', label: '06. Bi-Temporal Change', icon: GitCompare },
  { id: 'fusion', label: '07. Optical + SAR Fusion', icon: Layers },
  { id: 'agent', label: '08. Agentic AI Orchestration', icon: BrainCircuit },
  { id: 'evidence', label: '09. Trust + Evidence', icon: ShieldCheck },
  { id: 'impact', label: '10. Impact & Final Vision', icon: Sparkles },
];

export default function DashboardView({
  currentScene,
  onSceneChange,
  presentationMode,
  autoPlayProgress = 0,
}: Props) {
  const renderScene = () => {
    switch (currentScene) {
      case 'intro':
        return <Scene1Hook key="intro" autoPlayProgress={autoPlayProgress} onStartDemo={() => onSceneChange('problem')} />;
      case 'problem':
        return <Scene2Problem key="problem" autoPlayProgress={autoPlayProgress} />;
      case 'overview':
        return <Scene3Overview key="overview" autoPlayProgress={autoPlayProgress} />;
      case 'architecture':
        return <Scene4Architecture key="architecture" autoPlayProgress={autoPlayProgress} />;
      case 'single':
        return <SingleImageScene key="single" autoPlayProgress={autoPlayProgress} />;
      case 'grounding':
        return <GroundingScene key="grounding" />;
      case 'change':
        return <ChangeScene key="change" autoPlayProgress={autoPlayProgress} />;
      case 'fusion':
        return <FusionScene key="fusion" autoPlayProgress={autoPlayProgress} />;
      case 'agent':
        return <AgentTraceScene key="agent" autoPlayProgress={autoPlayProgress} />;
      case 'evidence':
        return <EvidenceScene key="evidence" autoPlayProgress={autoPlayProgress} />;
      case 'impact':
        return <ImpactScene key="impact" autoPlayProgress={autoPlayProgress} />;
      default:
        return <Scene1Hook key="default" autoPlayProgress={autoPlayProgress} onStartDemo={() => onSceneChange('problem')} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen pt-14"
    >
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Sidebar */}
        {!presentationMode && (
          <motion.aside
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-52 border-r border-border/50 flex flex-col py-3 px-2 flex-shrink-0"
            style={{ background: 'rgba(5,5,16,0.6)' }}
          >
            {/* New Analysis button */}
            <button
              onClick={() => onSceneChange('single')}
              className="flex items-center gap-2 px-3 py-2.5 mb-3 rounded-lg bg-gradient-to-r from-cyan/10 to-electric/10 border border-cyan/20 text-cyan text-xs tracking-wider font-medium hover:from-cyan/15 hover:to-electric/15 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              NEW ANALYSIS
            </button>

            {/* Navigation items */}
            <nav className="flex flex-col gap-0.5">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScene === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSceneChange(item.id as DemoScene)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs tracking-wide font-medium transition-all duration-300
                      ${isActive
                        ? 'bg-white/5 text-white border border-white/10'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan' : ''}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Bottom status */}
            <div className="mt-auto pt-4 border-t border-border/30 px-2">
              <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                <span className="w-1.5 h-1.5 bg-green rounded-full" />
                All models ready
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-600 mt-1">
                <span className="w-1.5 h-1.5 bg-cyan rounded-full" />
                Demo environment
              </div>
            </div>
          </motion.aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {renderScene()}
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
}
