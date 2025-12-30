"use client";

import { AuthComponent } from "@/components/ui/sign-up";
import Image from "next/image";
import TubesCursor from "@/components/ui/tubes-cursor";

// Custom logo matching the site's branding
const CustomLogo = () => (
  <div className="relative w-8 h-8">
    <Image
      src="/logo-square.png"
      alt="Teal.ai Logo"
      fill
      className="object-contain"
    />
  </div>
);

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* TubesCursor animation background */}
      <TubesCursor />
      
      {/* Content sections with higher z-index to appear above the cursor animation */}
      <div className="relative z-20" style={{ isolation: 'isolate' }}>
        <AuthComponent 
          logo={<CustomLogo />} 
          brandName="TextEnhancer" 
        />
      </div>
    </div>
  );
}

