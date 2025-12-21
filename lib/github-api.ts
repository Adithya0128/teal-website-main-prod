import { GitHubRelease, ReleaseData } from "./types";
import { GITHUB_REPO_API } from "./constants";

/**
 * Fetches the latest release from GitHub API and extracts the DMG download URL
 * @returns Release data with DMG URL, filename, and version, or null on error
 */
export async function getLatestRelease(): Promise<ReleaseData | null> {
  try {
    const response = await fetch(GITHUB_REPO_API, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const release: GitHubRelease = await response.json();

    // Find DMG assets - prefer arm64, then x64, then any DMG
    const dmgAssets = release.assets.filter((asset) =>
      asset.name.toLowerCase().endsWith(".dmg")
    );

    if (dmgAssets.length === 0) {
      console.error("No DMG asset found in release");
      return null;
    }

    // Prefer arm64, then x64, then universal, then any
    let dmgAsset = dmgAssets.find((asset) =>
      asset.name.toLowerCase().includes("arm64")
    );
    if (!dmgAsset) {
      dmgAsset = dmgAssets.find((asset) =>
        asset.name.toLowerCase().includes("x64") || asset.name.toLowerCase().includes("intel")
      );
    }
    if (!dmgAsset) {
      dmgAsset = dmgAssets.find((asset) =>
        asset.name.toLowerCase().includes("universal")
      );
    }
    // Fallback to first DMG if no specific architecture found
    if (!dmgAsset) {
      dmgAsset = dmgAssets[0];
    }

    return {
      url: dmgAsset.browser_download_url,
      filename: dmgAsset.name,
      version: release.tag_name,
    };
  } catch (error) {
    console.error("Error fetching latest release:", error);
    return null;
  }
}

