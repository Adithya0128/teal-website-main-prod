"use client";

import { motion } from "framer-motion";

// OPTION 1: Smooth Fade with Scale (Elegant & Simple)
export const Option1_SmoothFade = () => (
  <>
    <motion.span
      className="text-gray-400 inline-block"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      Don't rewrite,
    </motion.span>
    <br />
    <motion.span
      className="text-gray-900 inline-block"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      just enhance
    </motion.span>
  </>
);

// OPTION 2: Slide In from Sides (Dynamic)
export const Option2_SlideIn = () => (
  <>
    <motion.span
      className="text-gray-400 inline-block"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      Don't rewrite,
    </motion.span>
    <br />
    <motion.span
      className="text-gray-900 inline-block"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      just enhance
    </motion.span>
  </>
);

// OPTION 3: Typewriter Effect (Classic)
export const Option3_Typewriter = () => {
  const text1 = "Don't rewrite,";
  const text2 = "just enhance";
  
  return (
    <>
      <div className="inline-block">
        {text1.split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-gray-400 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.3 + index * 0.05 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <br />
      <div className="inline-block">
        {text2.split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-gray-900 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.0 + index * 0.05 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </>
  );
};

// OPTION 4: Gradient Wave Animation (Modern & Eye-catching)
export const Option4_GradientWave = () => (
  <>
    <motion.span
      className="text-gray-400 inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Don't rewrite,
    </motion.span>
    <br />
    <motion.span
      className="inline-block relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <motion.span
        className="text-gray-900 inline-block"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, #111827, #4b5563, #9333ea, #4b5563, #111827)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        just enhance
      </motion.span>
    </motion.span>
  </>
);

// OPTION 5: Bounce In (Playful & Energetic)
export const Option5_BounceIn = () => (
  <>
    <motion.span
      className="text-gray-400 inline-block"
      initial={{ opacity: 0, y: -50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      }}
    >
      Don't rewrite,
    </motion.span>
    <br />
    <motion.span
      className="text-gray-900 inline-block"
      initial={{ opacity: 0, y: -50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.6,
      }}
    >
      just enhance
    </motion.span>
  </>
);

// OPTION 6: Glitch Effect (Bold & Tech-forward)
export const Option6_Glitch = () => (
  <>
    <motion.span
      className="text-gray-400 inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Don't rewrite,
    </motion.span>
    <br />
    <motion.span
      className="text-gray-900 inline-block relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <motion.span
        className="inline-block"
        animate={{
          x: [0, -2, 2, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          delay: 1.2,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        just enhance
      </motion.span>
      {/* Glitch shadow effects */}
      <motion.span
        className="absolute inset-0 text-purple-500 opacity-0"
        animate={{
          opacity: [0, 0.5, 0],
          x: [0, -3, 0],
        }}
        transition={{
          duration: 0.3,
          delay: 1.2,
          times: [0, 0.5, 1],
        }}
      >
        just enhance
      </motion.span>
      <motion.span
        className="absolute inset-0 text-blue-500 opacity-0"
        animate={{
          opacity: [0, 0.5, 0],
          x: [0, 3, 0],
        }}
        transition={{
          duration: 0.3,
          delay: 1.2,
          times: [0, 0.5, 1],
        }}
      >
        just enhance
      </motion.span>
    </motion.span>
  </>
);

// OPTION 7: Rotate & Reveal (3D Effect)
export const Option7_RotateReveal = () => (
  <>
    <motion.span
      className="text-gray-400 inline-block"
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      Don't rewrite,
    </motion.span>
    <br />
    <motion.span
      className="text-gray-900 inline-block"
      initial={{ opacity: 0, rotateX: 90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      just enhance
    </motion.span>
  </>
);

// OPTION 8: Word Pop (Each word pops in)
export const Option8_WordPop = () => {
  const words1 = "Don't rewrite,".split(" ");
  const words2 = "just enhance".split(" ");
  
  return (
    <>
      <div className="inline-block">
        {words1.map((word, index) => (
          <motion.span
            key={index}
            className="text-gray-400 inline-block mr-2"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.2 + index * 0.2,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
      <br />
      <div className="inline-block">
        {words2.map((word, index) => (
          <motion.span
            key={index}
            className="text-gray-900 inline-block mr-2"
            initial={{ opacity: 0, scale: 0, rotate: 180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.8 + index * 0.2,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </>
  );
};

