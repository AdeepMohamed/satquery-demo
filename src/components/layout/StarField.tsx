'use client';

import React, { useMemo } from 'react';

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: `${(i * 7.3 + 13) % 100}%`,
      top: `${(i * 11.7 + 7) % 100}%`,
      size: (i % 3) + 1,
      duration: `${3 + (i % 5) * 1.2}s`,
      delay: `${(i % 7) * 0.5}s`,
      maxOpacity: 0.3 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: star.duration,
            animationDelay: star.delay,
            ['--max-opacity' as string]: star.maxOpacity,
          }}
        />
      ))}
    </div>
  );
}
