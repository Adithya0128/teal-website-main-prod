import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/github-api";
import { FALLBACK_DOWNLOAD_URL } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";

// In-memory cache for server-side caching
interface CacheEntry {
  data: ApiResponse;
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * GET handler for /api/releases/latest
 * Returns the latest DMG download URL from GitHub releases
 */
export async function GET(): Promise<NextResponse<ApiResponse>> {
  // Check cache first
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  // Fetch latest release from GitHub
  const releaseData = await getLatestRelease();

  let response: ApiResponse;

  if (releaseData) {
    // Verify we have a direct download URL (browser_download_url)
    if (releaseData.url && releaseData.url.includes("/releases/download/")) {
      response = {
        success: true,
        url: releaseData.url,
        filename: releaseData.filename,
        version: releaseData.version,
      };
    } else {
      // If URL is not a direct download, log and use fallback
      console.error("Invalid download URL format:", releaseData.url);
      response = {
        success: true,
        url: FALLBACK_DOWNLOAD_URL,
        filename: "latest.dmg",
        version: "latest",
      };
    }
  } else {
    // Fallback to static URL on error
    console.error("Failed to fetch release data, using fallback URL");
    response = {
      success: true,
      url: FALLBACK_DOWNLOAD_URL,
      filename: "latest.dmg",
      version: "latest",
    };
  }

  // Update cache
  cache = {
    data: response,
    timestamp: now,
  };

  return NextResponse.json(response);
}

