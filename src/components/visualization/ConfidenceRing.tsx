'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  animate?: boolean;
};

export default function ConfidenceRing({
  value,
  size = 100,
  strokeWidth = 6,
  label = 'Demo confidence',
  animate = true,
}: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplayValue(start);

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [value, animate]);

  const getColor = () => {
    if (value >= 90) return '#22c55e';
    if (value >= 80) return '#06d6f2';
    if (value >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Value ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${getColor()}44)` }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{displayValue}</span>
          <span className="text-[10px] text-zinc-500">%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold tracking-wider text-white">Confidence</p>
        <p className="text-[10px] text-zinc-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
