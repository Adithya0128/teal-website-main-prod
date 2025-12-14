"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ReelStyle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);

  // Generate waveform bars
  useEffect(() => {
    const bars = Array.from({ length: 50 }, () => Math.random() * 60 + 20);
    setWaveformHeights(bars);
  }, []);

  // Animate waveform
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setWaveformHeights(prev => 
        prev.map(() => Math.random() * 60 + 20)
      );
    }, 200);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-[#f5f5dc]"
    >
      <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Center Text - Available on platforms */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <p className="text-gray-600 text-sm md:text-base font-medium">
            Available on Mac, Windows and iPhone
          </p>
        </motion.div>

        {/* Curved Text Path - Left Side */}
        <motion.svg
          className="absolute top-32 left-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <defs>
            <path
              id="curveLeft"
              d="M 100 150 Q 300 300, 500 450"
              fill="none"
            />
          </defs>
          <text
            className="text-gray-500 text-sm md:text-base fill-current"
            fontSize="14"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            <textPath href="#curveLeft" startOffset="0%">
              ably going to slip. There&apos;s been a lot of back and forth an
            </textPath>
          </text>
        </motion.svg>

        {/* Center Waveform Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          {/* Waveform Box */}
          <div className="relative bg-transparent border-2 border-black rounded-2xl p-6 md:p-8">
            <div className="flex items-end justify-center space-x-1 md:space-x-1.5 h-32 md:h-40">
              {waveformHeights.map((height, index) => (
                <motion.div
                  key={index}
                  className="bg-black rounded-t-sm"
                  style={{
                    width: "4px",
                    minHeight: "8px",
                  }}
                  animate={{
                    height: `${height}%`,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Curved Black Band with Text - Right Side */}
        <motion.svg
          className="absolute top-1/2 right-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <defs>
            <path
              id="curveRight"
              d="M 700 400 Q 900 250, 1100 100"
              fill="none"
            />
            <linearGradient id="bandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
          </defs>
          
          {/* Curved Black Band */}
          <path
            d="M 700 400 Q 900 250, 1100 100"
            stroke="url(#bandGradient)"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
            className="opacity-90"
          />
          
          {/* Text on the band */}
          <text
            className="text-white text-sm md:text-base fill-current font-medium"
            fontSize="14"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            <textPath href="#curveRight" startOffset="5%">
              Idle the first part of the project, but I&apos;m not totally sure. I also told the
            </textPath>
          </text>
        </motion.svg>
      </div>
    </section>
  );
}

