'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DemoScene } from '@/types';
import { demoChapters } from '@/data/demoData';
import StarField from '@/components/layout/StarField';
import TopNav from '@/components/layout/TopNav';
import LandingScreen from '@/components/demo/LandingScreen';
import DashboardView from '@/components/dashboard/DashboardView';
import DemoControlBar from '@/components/demo/DemoControlBar';

export default function Home() {
  const [currentScene, setCurrentScene] = useState<DemoScene>('intro');
  const [presentationMode, setPresentationMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sceneOrder: DemoScene[] = ['intro', 'single', 'grounding', 'change', 'fusion', 'agent', 'evidence', 'impact'];

  const goToScene = useCallback((scene: DemoScene) => {
    setCurrentScene(scene);
  }, []);

  const nextScene = useCallback(() => {
    const idx = sceneOrder.indexOf(currentScene);
    if (idx < sceneOrder.length - 1) {
      setCurrentScene(sceneOrder[idx + 1]);
    } else {
      setAutoPlay(false);
    }
  }, [currentScene]);

  const prevScene = useCallback(() => {
    const idx = sceneOrder.indexOf(currentScene);
    if (idx > 0) {
      setCurrentScene(sceneOrder[idx - 1]);
    }
  }, [currentScene]);

  // Auto-play logic
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        nextScene();
      }, 12000); // 12 seconds per scene for ~96s total through 8 scenes
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [autoPlay, nextScene]);

  // Elapsed timer for presentation mode
  useEffect(() => {
    if (presentationMode) {
      setElapsedSeconds(0);
      elapsedTimerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, [presentationMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const num = parseInt(e.key);
      if (num >= 1 && num <= 8) {
        const scene = sceneOrder[num - 1];
        if (scene) goToScene(scene);
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          setAutoPlay((prev) => !prev);
          break;
        case 'ArrowRight':
          nextScene();
          break;
        case 'ArrowLeft':
          prevScene();
          break;
        case 'Escape':
          setPresentationMode(false);
          break;
        case 'p':
        case 'P':
          setPresentationMode((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goToScene, nextScene, prevScene]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <main className="relative min-h-screen bg-[#050510] text-white overflow-hidden">
      <StarField />

      {/* Top Navigation - hidden in presentation mode during intro */}
      {!(presentationMode && currentScene === 'intro') && currentScene !== 'intro' && (
        <TopNav
          currentScene={currentScene}
          presentationMode={presentationMode}
          onTogglePresentation={() => setPresentationMode(!presentationMode)}
        />
      )}

      {/* Presentation mode timer */}
      {presentationMode && (
        <div className="fixed top-4 right-4 z-[100] glass-panel px-4 py-2 text-sm font-mono flex items-center gap-3">
          <span className="text-zinc-500">{formatTime(elapsedSeconds)}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">05:00</span>
          <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan to-electric rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((elapsedSeconds / 300) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentScene === 'intro' ? (
          <LandingScreen
            key="landing"
            onStartDemo={() => goToScene('single')}
            onExploreWorkflow={() => goToScene('agent')}
            presentationMode={presentationMode}
          />
        ) : (
          <DashboardView
            key="dashboard"
            currentScene={currentScene}
            onSceneChange={goToScene}
            presentationMode={presentationMode}
          />
        )}
      </AnimatePresence>

      {/* Demo Control Bar */}
      {!presentationMode && (
        <DemoControlBar
          currentScene={currentScene}
          onSceneChange={goToScene}
          onPrev={prevScene}
          onNext={nextScene}
          autoPlay={autoPlay}
          onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
          chapters={demoChapters as unknown as typeof demoChapters}
        />
      )}
    </main>
  );
}
