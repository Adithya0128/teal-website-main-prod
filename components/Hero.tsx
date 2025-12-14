"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn } from "@/lib/animations";
import CircularText from "./CircularText";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent pt-32 pb-20 overflow-hidden">
      {/* Subtle animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Circular Text Element */}
      <CircularText />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-8"
        >
          {/* Main Headline - Letter-by-letter animation with shimmer */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-sans font-black leading-tight tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {/* First line: "Don't Rewrite" with letter-by-letter animation */}
            <div className="inline-block">
              {"Don't Rewrite".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="text-gray-300 inline-block"
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.05,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <br />
            {/* Second line: "Just Enhance" with word-by-word reveal and shimmer */}
            <motion.div
              className="inline-block relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.2,
              }}
            >
              {"Just Enhance".split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-2">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className={wordIndex === 0 ? "text-gray-300 inline-block" : "text-purple-500 inline-block"}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 1.3 + wordIndex * 0.3 + charIndex * 0.03,
                        ease: [0.6, -0.05, 0.01, 0.99],
                      }}
                      whileHover={{
                        scale: 1.1,
                        color: wordIndex === 0 ? "#9333ea" : "#a855f7",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
              {/* Animated shimmer overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
                  width: "50%",
                }}
              />
            </motion.div>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-sans"
          >
            The text enhancement AI that transforms your writing into professional,
            casual, or summarized formats in every app.
          </motion.p>

          {/* Availability Text */}
          <motion.p
            variants={fadeInUp}
            className="text-sm text-gray-500 font-sans"
          >
            Available on Mac & Windows 
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

