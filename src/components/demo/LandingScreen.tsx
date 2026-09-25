'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, ArrowRight, Workflow } from 'lucide-react';

type Props = {
  onStartDemo: () => void;
  onExploreWorkflow: () => void;
  presentationMode: boolean;
};

export default function LandingScreen({ onStartDemo, onExploreWorkflow, presentationMode }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Geo grid overlay */}
      <div className="absolute inset-0 geo-grid opacity-30" />

      {/* Orbital ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbital" style={{ width: '600px', height: '600px' }}>
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <ellipse
              cx="300"
              cy="300"
              rx="280"
              ry="120"
              fill="none"
              stroke="rgba(6,214,242,0.08)"
              strokeWidth="1"
              strokeDasharray="8 8"
            />
            <circle cx="580" cy="300" r="4" fill="rgba(6,214,242,0.4)" />
          </svg>
        </div>
      </div>

      {/* Second orbital ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbital" style={{ width: '800px', height: '800px', animationDuration: '90s', animationDirection: 'reverse' }}>
          <svg viewBox="0 0 800 800" className="w-full h-full">
            <ellipse
              cx="400"
              cy="400"
              rx="380"
              ry="160"
              fill="none"
              stroke="rgba(139,92,246,0.06)"
              strokeWidth="1"
              strokeDasharray="4 12"
            />
            <circle cx="780" cy="400" r="3" fill="rgba(139,92,246,0.3)" />
          </svg>
        </div>
      </div>

      {/* Scanline effect */}
      <div className="scanline" />

      {/* Earth glow (background circle) */}
      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,214,242,0.06) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        {/* Satellite icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', damping: 15 }}
          className="mx-auto mb-8 w-20 h-20 rounded-2xl glass-panel-glow flex items-center justify-center"
        >
          <Satellite className="w-10 h-10 text-cyan" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-[0.08em] mb-4"
        >
          <span className="bg-gradient-to-r from-cyan via-electric to-purple bg-clip-text text-transparent">
            SATQUERY AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-base md:text-lg text-zinc-400 tracking-wide mb-2 font-light"
        >
          An Interactive Vision-Language Assistant
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-base md:text-lg text-zinc-400 tracking-wide mb-10 font-light"
        >
          for Multimodal Remote Sensing
        </motion.p>

        {/* Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl font-semibold tracking-wide">
            <span className="text-white">Ask the Image.</span>
            <span className="text-cyan ml-3">Understand the Earth.</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={onStartDemo}
            className="btn-primary flex items-center gap-2 text-sm tracking-wider px-8 py-3"
          >
            START DEMO
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreWorkflow}
            className="btn-secondary flex items-center gap-2 text-sm tracking-wider px-8 py-3"
          >
            <Workflow className="w-4 h-4" />
            EXPLORE WORKFLOW
          </button>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-6 text-[10px] tracking-[0.2em] text-zinc-600"
        >
          <span>SIH 2026</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span>SIH26167</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span>SPACE TECHNOLOGY</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span>CODE FOR NATION</span>
        </motion.div>
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan/30 rounded-full"
            initial={{
              x: `${20 + i * 15}%`,
              y: '110%',
            }}
            animate={{
              y: '-10%',
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear',
            }}
            style={{ left: `${10 + i * 15}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}
