// GitHub API Types
export interface GitHubReleaseAsset {
  url: string;
  id: number;
  name: string;
  label: string | null;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface GitHubRelease {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: {
    login: string;
    id: number;
    avatar_url: string;
    [key: string]: unknown;
  };
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: GitHubReleaseAsset[];
  tarball_url: string;
  zipball_url: string;
  body: string;
  [key: string]: unknown;
}

export interface ReleaseData {
  url: string;
  filename: string;
  version: string;
}

// API Route Response Types
export interface ApiSuccessResponse {
  success: true;
  url: string;
  filename: string;
  version: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

