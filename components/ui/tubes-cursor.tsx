"use client";

import React, { useEffect, useRef } from 'react';

// Type definitions
interface TubesCursorInstance {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  dispose: () => void;
}

declare global {
  interface Window {
    TubesCursor?: (canvas: HTMLCanvasElement, options: any) => TubesCursorInstance;
  }
}

const randomColors = (count: number): string[] => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesCursorInstance | null>(null);
  const loadingAttemptedRef = useRef(false);

  useEffect(() => {
    if (loadingAttemptedRef.current) return;
    loadingAttemptedRef.current = true;

    const scriptUrl = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
    
    // Function to initialize the animation
    const initializeAnimation = (TubesCursorFn: any) => {
      if (!canvasRef.current) {
        console.log("⏳ Canvas ref not available");
        return false;
      }
      
      if (appRef.current) {
        console.log("✅ Already initialized");
        return true;
      }
      
      try {
        const canvas = canvasRef.current;
        
        // Ensure canvas has proper dimensions
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.log("⏳ Canvas has no dimensions, retrying...");
          setTimeout(() => initializeAnimation(TubesCursorFn), 300);
          return false;
        }
        
        // Set explicit canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Ensure canvas is visible and has proper styling
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.display = 'block';
        
        console.log("🎨 Initializing with canvas:", { 
          width: canvas.width, 
          height: canvas.height,
          clientWidth: canvas.clientWidth,
          clientHeight: canvas.clientHeight
        });
        
        // Initialize the tubes cursor with proper options
        const app = TubesCursorFn(canvas, {
          tubes: {
            colors: ["#5e72e4", "#8965e0", "#f5365c"],
            lights: {
              intensity: 200,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"]
            }
          }
        });
        
        appRef.current = app;
        console.log("✅ TubesCursor initialized successfully!");
        
        // Handle window resize
        const handleResize = () => {
          if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (app && typeof (app as any).resize === 'function') {
              (app as any).resize();
            }
          }
        };
        window.addEventListener('resize', handleResize);
        
        return true;
      } catch (err: any) {
        console.error("❌ Error initializing TubesCursor:", err);
        return false;
      }
    };

    // Load module using script tag (more reliable)
    const loadModule = () => {
      // Check if already loaded
      if ((window as any).TubesCursor && typeof (window as any).TubesCursor === 'function') {
        console.log("📦 TubesCursor already available, initializing...");
        setTimeout(() => initializeAnimation((window as any).TubesCursor), 500);
        return;
      }

      console.log("🚀 Loading TubesCursor module...");
      
      // Check if script already exists
      const existing = document.querySelector(`script[data-tubes-cursor]`);
      if (existing) {
        console.log("📦 Script already exists, waiting for load...");
        const checkInterval = setInterval(() => {
          if ((window as any).TubesCursor) {
            clearInterval(checkInterval);
            setTimeout(() => initializeAnimation((window as any).TubesCursor), 500);
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.type = 'module';
      script.setAttribute('data-tubes-cursor', 'true');
      script.innerHTML = `
        (async () => {
          try {
            const module = await import('${scriptUrl}');
            const TubesCursorFn = module.default || module.TubesCursor || module;
            window.TubesCursor = TubesCursorFn;
            window.dispatchEvent(new CustomEvent('tubesCursorReady'));
            console.log('✅ TubesCursor module loaded and exposed to window');
          } catch (e) {
            console.error('❌ Failed to load module:', e);
            window.dispatchEvent(new CustomEvent('tubesCursorError', { detail: e }));
          }
        })();
      `;
      
      const handleReady = () => {
        const TubesCursorFn = (window as any).TubesCursor;
        if (TubesCursorFn && typeof TubesCursorFn === 'function') {
          console.log("📦 TubesCursor ready from script tag");
          // Wait a bit longer to ensure canvas is fully ready
          setTimeout(() => {
            initializeAnimation(TubesCursorFn);
          }, 500);
        } else {
          console.error("❌ TubesCursor not found after script load");
        }
        window.removeEventListener('tubesCursorReady', handleReady);
        window.removeEventListener('tubesCursorError', handleError);
      };
      
      const handleError = (e: any) => {
        console.error("❌ Script tag error:", e.detail);
        window.removeEventListener('tubesCursorReady', handleReady);
        window.removeEventListener('tubesCursorError', handleError);
      };
      
      window.addEventListener('tubesCursorReady', handleReady, { once: true });
      window.addEventListener('tubesCursorError', handleError, { once: true });
      
      script.onerror = () => {
        console.error("❌ Script tag onerror fired");
      };
      
      document.head.appendChild(script);
    };

    // Wait for DOM and ensure canvas is ready
    const timer = setTimeout(() => {
      // Double check canvas is available
      if (canvasRef.current) {
        loadModule();
      } else {
        console.log("⏳ Waiting for canvas...");
        setTimeout(() => {
          if (canvasRef.current) {
            loadModule();
          }
        }, 500);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (appRef.current?.dispose) {
        try {
          appRef.current.dispose();
        } catch (e) {
          console.error("Error disposing:", e);
        }
      }
    };
  }, []);

  const handleClick = () => {
    if (appRef.current) {
      try {
        appRef.current.tubes.setColors(randomColors(3));
        appRef.current.tubes.setLightsColors(randomColors(4));
        console.log("🎨 Colors updated!");
      } catch (e) {
        console.error("Error updating colors:", e);
      }
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 0,
            display: 'block',
            pointerEvents: 'none'
          }}
        />
      </div>
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm border border-purple-300/30 transition-all opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Change colors"
        title="Click to change colors"
      >
        <svg className="w-6 h-6 mx-auto text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>
    </>
  );
}
