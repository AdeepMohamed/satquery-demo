'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Satellite, Sprout, AlertTriangle, Building2,
  TreePine, Droplets, Globe
} from 'lucide-react';
import { impactAreas } from '@/data/demoData';

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  AlertTriangle,
  Building2,
  Trees: TreePine,
  Droplets,
  Globe,
};

type Props = {
  autoPlayProgress?: number;
};

export default function ImpactScene({ autoPlayProgress }: Props) {
  // Active spotlight index across 6 domains during auto-play (0 to 5)
  const spotlightIndex =
    autoPlayProgress !== undefined && autoPlayProgress > 0
      ? Math.min(5, Math.floor(autoPlayProgress * 7))
      : -1;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,214,242,0.04) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-20" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          className="mx-auto mb-6 w-16 h-16 rounded-2xl glass-panel-glow flex items-center justify-center"
        >
          <Satellite className="w-8 h-8 text-cyan" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold tracking-[0.08em] mb-3"
        >
          <span className="bg-gradient-to-r from-cyan via-electric to-purple bg-clip-text text-transparent">
            SATQUERY AI
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg font-medium text-zinc-300 tracking-wide mb-12"
        >
          Ask the Image. <span className="text-cyan">Understand the Earth.</span>
        </motion.p>

        {/* Application cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {impactAreas.map((area, i) => {
            const Icon = iconMap[area.icon] || Globe;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="glass-panel p-5 hover:border-cyan/20 transition-all duration-500 group cursor-default"
              >
                <Icon className="w-6 h-6 text-cyan mb-3 group-hover:text-purple transition-colors duration-500" />
                <h3 className="text-[11px] font-bold tracking-[0.15em] text-white mb-1">
                  {area.title}
                </h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="space-y-4"
        >
          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan/30" />
            <Satellite className="w-4 h-4 text-cyan/30" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan/30" />
          </div>

          {/* Info badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: 'SIH 2026', glow: false },
              { label: 'SIH26167', glow: false },
              { label: 'Space Technology', glow: true },
              { label: 'Code for Nation', glow: true },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`px-4 py-1.5 rounded-md text-[10px] tracking-[0.15em] font-semibold ${
                  badge.glow
                    ? 'bg-cyan/10 text-cyan border border-cyan/20'
                    : 'bg-surface-lighter text-zinc-400 border border-border'
                }`}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
