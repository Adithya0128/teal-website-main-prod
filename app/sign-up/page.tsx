"use client";

import { AuthComponent } from "@/components/ui/sign-up";
import { Gem } from "lucide-react";
import TubesCursor from "@/components/ui/tubes-cursor";

// Custom logo matching the site's branding
const CustomLogo = () => (
  <div className="bg-purple-600 text-white rounded-md p-1.5">
    <Gem className="h-4 w-4" />
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

