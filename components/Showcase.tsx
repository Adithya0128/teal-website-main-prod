"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeInUp, fadeIn } from "@/lib/animations";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { WindowsStoreButton } from "@/components/ui/windows-store-button";

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedFormat, setSelectedFormat] = useState<"professional" | "casual" | "summarized">("professional");

  const originalText = "Hey sir, I won't be coming to work tomorrow because I'm really not feeling like it and I have some random things to sort out. Honestly, I'm super tired and just need a break, so I'm taking the day off. I know I'm telling you late, but I just remembered everything now. I'll try to finish any pending work later when I'm back. Not sure when exactly I'll be online tomorrow, but I'll check in if possible. Please manage things for the day, sir, and let me know only if something very urgent comes up.";

  const enhancedTexts = {
    professional: "Hi Sir,\n\nI would like to request leave for tomorrow due to personal reasons. I apologise for the short notice. I will ensure all pending tasks are updated and will remain reachable for any urgent matters. Kindly grant me leave for the day.\n\nThank you for your understanding, sir.",
    casual: "Hi sir,\n\nJust wanted to let you know that I need to take leave tomorrow due to some personal work. I'll finish any pending tasks once I'm back. Please allow me the leave.\n\nThank you, sir.",
    summarized: "Sir, I need leave tomorrow due to personal reasons. I'll update pending tasks. Kindly approve.",
  };

  const formatOptions = [
    { id: "professional" as const, label: "Professional", icon: "✨" },
    { id: "casual" as const, label: "Casual", icon: "💬" },
    { id: "summarized" as const, label: "Summarized", icon: "📝" },
  ];

  return (
    <section
      id="product"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden z-10 bg-[#f5f5dc]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          {/* Left Side - 25% (1 column) */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="lg:col-span-1 space-y-6"
          >
            {/* App Store Buttons */}
            <motion.div variants={fadeInUp} className="mb-6">
              <p className="text-sm text-gray-600 mb-3 font-medium uppercase tracking-wider">
                Available On
              </p>
              <div className="flex gap-2">
                <AppStoreButton 
                  className="flex-1 bg-black text-white hover:bg-gray-800 justify-start" 
                  variant="default"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add your App Store link here
                  }}
                />
                <WindowsStoreButton 
                  className="flex-1 bg-[#0078D4] text-white hover:bg-[#0066B3] justify-start" 
                  variant="default"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add your Microsoft Store link here
                  }}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                Enhance Your Text
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Transform your message into professional, casual, or summarized formats instantly.
              </p>
            </motion.div>

            {/* Format Selection */}
            <motion.div variants={fadeInUp} className="space-y-3">
              {formatOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedFormat(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedFormat === option.id
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200 bg-gray-50 hover:border-purple-200 hover:bg-purple-50/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className={`font-semibold ${
                        selectedFormat === option.id ? "text-purple-700" : "text-gray-700"
                      }`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {option.id === "professional" && "Polished & formal"}
                        {option.id === "casual" && "Friendly & conversational"}
                        {option.id === "summarized" && "Concise & brief"}
                      </p>
                    </div>
                    {selectedFormat === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - 75% (3 columns) */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="lg:col-span-3 relative"
          >
            {/* Laptop Mockup */}
            <motion.div
              variants={fadeInUp}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Laptop Frame */}
              <div className="relative mx-auto max-w-5xl">
                {/* Top Bezel */}
                <div className="bg-gray-900 rounded-t-2xl px-8 py-3 flex items-center justify-center">
                  <div className="absolute top-2 right-4">
                    <div className="w-16 h-1 bg-gray-700 rounded"></div>
                  </div>
                </div>

                {/* Screen */}
                <div className="bg-gray-800 rounded-b-2xl overflow-hidden shadow-2xl border-8 border-gray-900">
                  <div className="bg-white min-h-[600px] p-8">
                    {/* Browser Bar */}
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex space-x-2 ml-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 mx-4">
                        <p className="text-xs text-gray-500 truncate">
                          https://textenhancer.app
                        </p>
                      </div>
                    </div>

                    {/* Enhancement Interface */}
                    <div className="max-w-3xl mx-auto space-y-6">
                      {/* Original Text */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200"
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <p className="text-sm font-medium text-gray-500">Original Text</p>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {originalText}
                        </p>
                      </motion.div>

                      {/* Arrow/Divider */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="h-px bg-gray-300 flex-1"></div>
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                      </motion.div>

                      {/* Enhanced Text */}
                      <motion.div
                        key={selectedFormat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border-2 border-purple-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <p className="text-sm font-semibold text-purple-700 uppercase">
                              {formatOptions.find(f => f.id === selectedFormat)?.label}
                            </p>
                            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded font-medium">
                              ENHANCED
                            </span>
                          </div>
                          <span className="text-2xl">
                            {formatOptions.find(f => f.id === selectedFormat)?.icon}
                          </span>
                        </div>
                        <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
                          {enhancedTexts[selectedFormat]}
                        </p>
                      </motion.div>

                      {/* Action Buttons */}
                      {/* <div className="flex items-center justify-center space-x-3 pt-4">
                        <motion.button
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy</span>
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Try Another Format
                        </motion.button>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Bottom Base */}
                <div className="mx-auto w-3/4 h-2 bg-gray-800 rounded-b-lg"></div>
                <div className="mx-auto w-1/2 h-1 bg-gray-700 rounded-b-lg"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
