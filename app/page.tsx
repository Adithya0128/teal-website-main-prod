"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import TubesCursor from "@/components/ui/tubes-cursor";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure components are rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  return (
    <main className="min-h-screen relative" style={{ background: '#0a0a0a' }}>
      {/* TubesCursor animation background - only visible on home page (Hero and Features sections) */}
      <TubesCursor />
      
      {/* Content sections with higher z-index to appear above the cursor animation */}
      <div className="relative z-20">
        <Header />
        <Hero />
        <Showcase />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
