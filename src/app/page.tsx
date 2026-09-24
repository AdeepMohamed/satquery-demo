'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DemoScene } from '@/types';
import {
  videoScriptTimeline,
  TOTAL_VIDEO_DURATION_SECONDS,
  getSceneConfigByTime,
} from '@/data/videoScriptData';
import StarField from '@/components/layout/StarField';
import TopNav from '@/components/layout/TopNav';
import DashboardView from '@/components/dashboard/DashboardView';
import AutoPlayController from '@/components/demo/AutoPlayController';

export default function Home() {
  const [currentScene, setCurrentScene] = useState<DemoScene>('intro');
  const [presentationMode, setPresentationMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sceneOrder: DemoScene[] = [
    'intro',
    'problem',
    'overview',
    'architecture',
    'single',
    'change',
    'fusion',
    'agent',
    'evidence',
    'impact',
  ];

  // Jump to specific scene
  const goToScene = useCallback((scene: DemoScene) => {
    setCurrentScene(scene);
    const config = videoScriptTimeline.find((s) => s.id === scene);
    if (config) {
      setElapsedSeconds(config.startTime);
    }
  }, []);

  // Jump to exact time
  const seekTo = useCallback((seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, TOTAL_VIDEO_DURATION_SECONDS));
    setElapsedSeconds(clamped);
    const config = getSceneConfigByTime(clamped);
    if (config) {
      setCurrentScene(config.id);
    }
  }, []);

  // Next / Previous Scene
  const nextScene = useCallback(() => {
    const activeConfig = getSceneConfigByTime(elapsedSeconds);
    const idx = videoScriptTimeline.findIndex((s) => s.id === activeConfig.id);
    if (idx < videoScriptTimeline.length - 1) {
      const nextConfig = videoScriptTimeline[idx + 1];
      seekTo(nextConfig.startTime);
    } else {
      setAutoPlay(false);
    }
  }, [elapsedSeconds, seekTo]);

  const prevScene = useCallback(() => {
    const activeConfig = getSceneConfigByTime(elapsedSeconds);
    const idx = videoScriptTimeline.findIndex((s) => s.id === activeConfig.id);
    if (idx > 0) {
      const prevConfig = videoScriptTimeline[idx - 1];
      seekTo(prevConfig.startTime);
    } else {
      seekTo(0);
    }
  }, [elapsedSeconds, seekTo]);

  // Restart demo run
  const resetDemo = useCallback(() => {
    seekTo(0);
    setAutoPlay(false);
  }, [seekTo]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Automated 5-minute video playback runner
  useEffect(() => {
    if (autoPlay) {
      const tickIntervalMs = 100;
      autoPlayTimerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + (tickIntervalMs / 1000) * playbackSpeed;
          if (next >= TOTAL_VIDEO_DURATION_SECONDS) {
            setAutoPlay(false);
            return TOTAL_VIDEO_DURATION_SECONDS;
          }
          const config = getSceneConfigByTime(next);
          if (config && config.id !== currentScene) {
            setCurrentScene(config.id);
          }
          return next;
        });
      }, tickIntervalMs);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [autoPlay, currentScene, playbackSpeed]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // 1 to 9, 0 jumps to Scene 1-10
      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (idx < videoScriptTimeline.length) {
          seekTo(videoScriptTimeline[idx].startTime);
        }
        return;
      }
      if (e.key === '0') {
        if (videoScriptTimeline.length >= 10) {
          seekTo(videoScriptTimeline[9].startTime);
        }
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          setAutoPlay((prev) => !prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextScene();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevScene();
          break;
        case 'r':
        case 'R':
          resetDemo();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'p':
        case 'P':
          setPresentationMode((prev) => !prev);
          break;
        case 'Escape':
          setPresentationMode(false);
          setAutoPlay(false);
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nextScene, prevScene, resetDemo, seekTo, toggleFullscreen]);

  // Compute current scene's sub-progress (0 to 1)
  const activeSceneConfig = getSceneConfigByTime(elapsedSeconds);
  const autoPlayProgress = Math.max(
    0,
    Math.min(1, (elapsedSeconds - activeSceneConfig.startTime) / activeSceneConfig.duration)
  );

  return (
    <main className="relative min-h-screen bg-[#050510] text-white overflow-hidden pb-20">
      <StarField />

      {/* Top Navigation */}
      <TopNav
        currentScene={currentScene}
        presentationMode={presentationMode}
        onTogglePresentation={() => setPresentationMode(!presentationMode)}
        autoPlay={autoPlay}
        onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
        elapsedSeconds={elapsedSeconds}
      />

      {/* Dashboard View displaying current scene */}
      <DashboardView
        key="dashboard"
        currentScene={currentScene}
        onSceneChange={goToScene}
        presentationMode={presentationMode}
        autoPlayProgress={autoPlayProgress}
      />

      {/* Master 5-Minute AutoPlay Controller */}
      <AutoPlayController
        currentScene={currentScene}
        elapsedSeconds={elapsedSeconds}
        isPlaying={autoPlay}
        onTogglePlay={() => setAutoPlay(!autoPlay)}
        onSeek={seekTo}
        onSceneSelect={goToScene}
        playbackSpeed={playbackSpeed}
        onSpeedChange={setPlaybackSpeed}
        onReset={resetDemo}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </main>
  );
}
