import Header from "@/components/Header";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";
import TubesCursor from "@/components/ui/tubes-cursor";

export default function ProductPage() {
  return (
    <main className="min-h-screen relative bg-[#fefefb]">
      {/* TubesCursor animation background */}
      <TubesCursor />
      
      {/* Content sections with higher z-index to appear above the cursor animation */}
      <div className="relative z-20">
        <Header />
        <Showcase />
        <Footer />
      </div>
    </main>
  );
}
