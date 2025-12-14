"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CIRCULAR_TEXT } from "@/lib/constants";

export default function CircularText() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const radius = 100;
  const angleStep = (2 * Math.PI) / CIRCULAR_TEXT.length;
  const center = radius + 20;

  return (
    <div className="absolute bottom-20 left-10 hidden lg:block pointer-events-none">
      <motion.div
        className="relative"
        style={{ width: center * 2, height: center * 2 }}
        animate={{ rotate: rotation }}
        transition={{ duration: 0.016, ease: "linear", repeat: Infinity }}
      >
        {CIRCULAR_TEXT.map((text, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const rotationAngle = (angle * 180) / Math.PI + 90;

          return (
            <div
              key={index}
              className="absolute text-sm text-gray-400 font-sans whitespace-nowrap"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                transformOrigin: "center",
              }}
            >
              {text}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

