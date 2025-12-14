import Header from "@/components/Header";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import TubesCursor from "@/components/ui/tubes-cursor";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen relative" style={{ background: '#0a0a0a' }}>
      {/* TubesCursor animation background */}
      <TubesCursor />
      
      {/* Content sections with higher z-index to appear above the cursor animation */}
      <div className="relative z-20">
        <Header />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
