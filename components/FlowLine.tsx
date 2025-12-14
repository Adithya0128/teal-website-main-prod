"use client";

import { useEffect, useRef } from "react";

const MESSY_TEXTS = [
  "bro idk the update is kinda messy but let's just send it lol...",
  "i think the report is fine? maybe… not sure tho haha...",
  "deadline might change again but who knows man...",
  "im not totally sure whats happening but lets just go with it...",
  "the client said something but i forgot lol...",
];

const PROFESSIONAL_TEXTS = [
  "The project update is incomplete; let's refine it before sending.",
  "The report looks acceptable, but requires clarity and structure.",
  "The deadline may shift again; confirming the final timeline soon.",
  "I'm reviewing the current status and will share a clear update.",
  "The client provided feedback, which I will summarize professionally.",
];

export default function FlowLine() {
  const messyTextRef = useRef<SVGTextPathElement>(null);
  const professionalTextRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    // Ensure refs are available
    if (!messyTextRef.current || !professionalTextRef.current) return;

    // Animation function using direct attribute manipulation for reliability
    const animateTextPath = (
      element: SVGTextPathElement,
      startPercent: number,
      endPercent: number,
      durationMs: number,
      delayMs: number = 0
    ) => {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp + delayMs;
          return (animationFrame = requestAnimationFrame(animate));
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        
        const currentPercent = startPercent + (endPercent - startPercent) * progress;
        element.setAttribute("startOffset", `${currentPercent}%`);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          // Reset for seamless loop
          element.setAttribute("startOffset", `${startPercent}%`);
          startTime = null;
          animationFrame = requestAnimationFrame(animate);
        }
      };

      // Initialize
      element.setAttribute("startOffset", `${startPercent}%`);
      animationFrame = requestAnimationFrame(animate);

      // Return cleanup function
      return () => cancelAnimationFrame(animationFrame);
    };

    // Animate messy text: flows from -5% to 100% (into logo)
    const cleanup1 = animateTextPath(messyTextRef.current, -5, 100, 18000, 0);

    // Animate professional text: flows from -5% to 110% (out from logo) with delay
    const cleanup2 = animateTextPath(professionalTextRef.current, -5, 110, 18000, 2500);

    // Cleanup on unmount
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  // Combine texts with separators for seamless looping
  const messyTextString = Array(6).fill(MESSY_TEXTS.join(" • ") + " • ").join("");
  const professionalTextString = Array(6).fill(PROFESSIONAL_TEXTS.join(" • ") + " • ").join("");

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
      {/* Messy text flowing from left to logo */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1920 1200"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for messy text - softer, more transcript-like */}
          <linearGradient id="messyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#D1D5DB" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.65" />
          </linearGradient>

          {/* Curved path from left side flowing down into bottom center logo */}
          <path
            id="messyPath"
            d="M 200 850
               C 400 920, 600 980, 800 1050
               C 850 1070, 900 1085, 960 1100"
            fill="none"
          />
        </defs>

        {/* Messy text - transcript style */}
        <text
          fontSize="18"
          fill="url(#messyGradient)"
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          style={{ 
            letterSpacing: "0.02em",
            fontFeatureSettings: "'liga' off, 'kern' 1"
          }}
        >
          <textPath
            href="#messyPath"
            ref={messyTextRef}
            id="messy-text-path"
          >
            {messyTextString}
          </textPath>
        </text>
      </svg>

      {/* Logo/Transformation point - bottom center */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: "10%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="relative">
          {/* Logo placeholder with purple glow */}
          <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/60 border-2 border-purple-400/60 backdrop-blur-sm">
            <span className="text-white font-bold text-base xl:text-lg">E</span>
          </div>
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-purple-500/40 blur-2xl -z-10 animate-pulse-slow" />
        </div>
      </div>

      {/* Professional text flowing out from logo */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1920 1200"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for professional text - cleaner, brighter */}
          <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#E5E7EB" stopOpacity="0.85" />
          </linearGradient>

          {/* Path from bottom center logo flowing out and curving up to the right */}
          <path
            id="professionalPath"
            d="M 960 1100
               C 1020 1085, 1070 1070, 1120 1050
               C 1320 980, 1520 920, 1720 850"
            fill="none"
          />
        </defs>

        {/* Professional text - cleaner transcript style */}
        <text
          fontSize="18"
          fill="url(#professionalGradient)"
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="500"
          style={{ 
            letterSpacing: "0.01em",
            fontFeatureSettings: "'liga' 1, 'kern' 1"
          }}
        >
          <textPath
            href="#professionalPath"
            ref={professionalTextRef}
            id="professional-text-path"
          >
            {professionalTextString}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
