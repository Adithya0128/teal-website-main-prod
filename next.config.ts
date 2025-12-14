import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Uncomment the line below to export as static site
  // output: 'export',
  // Allow importing from CDN URLs (for TubesCursor)
  experimental: {
    // Note: URL imports are handled client-side, so this may not be needed
    // but we'll keep the config structure for future use
  },
};

export default nextConfig;
