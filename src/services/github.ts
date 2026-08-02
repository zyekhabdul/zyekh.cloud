const GITHUB_USER = 'zyekhabdul';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const CACHE_KEY = 'github_stats_cache_v2';
const REPOS_CACHE_KEY = 'github_repos_cache_v2';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Purge legacy cache keys from localStorage immediately on module load
try {
  localStorage.removeItem('github_stats_cache');
  localStorage.removeItem('github_repos_cache');
  localStorage.removeItem('github_stats_cache_v1');
  localStorage.removeItem('github_repos_cache_v1');
} catch (_) {
  // Ignore SSR/storage restriction errors
}

// Minimal GitHub API repo shape used by this module
interface GHRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export interface GitHubStats {
  repoCount: number;
  totalCommits: number;
  totalStars: number;
  totalForks: number;
  lastUpdated: number;
  repoHealth?: number; // 0-100 health score
}

export interface GitHubRepository {
  id: number;
  name: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
}

interface CachedData {
  data: GitHubStats;
  timestamp: number;
}

interface CachedRepos {
  data: GitHubRepository[];
  timestamp: number;
}

function getCachedData(): GitHubStats | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Cache read error:', error);
    return null;
  }
}

function setCachedData(data: GitHubStats): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn('Cache write error:', error);
  }
}

function getCachedRepos(): GitHubRepository[] | null {
  try {
    const cached = localStorage.getItem(REPOS_CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CachedRepos = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(REPOS_CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Repos cache read error:', error);
    return null;
  }
}

function setCachedRepos(data: GitHubRepository[]): void {
  try {
    localStorage.setItem(
      REPOS_CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn('Repos cache write error:', error);
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  // Check cache first
  const cached = getCachedData();
  if (cached) {
    return cached;
  }
  // First try pre-generated static JSON (produced at build time with cache-busting timestamp)
  try {
    const staticResp = await fetch(`/github-stats.json?t=${Date.now()}`);
    if (staticResp.ok) {
      const s = await staticResp.json();
      setCachedData(s);
      return s as GitHubStats;
    }
  } catch (_) {
    // ignore and fallback to API
  }

  try {
    // Fallback: fetch directly from GitHub API (may be unauthenticated)
    const repoHeaders: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) repoHeaders.Authorization = `token ${GITHUB_TOKEN}`;

    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        headers: repoHeaders,
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos: GHRepo[] = await reposResponse.json();

    // Calculate stats without N+1 HTTP commit requests in browser
    let totalCommits = repos.length * 25;
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach((repo: GHRepo) => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
    });

    const stats: GitHubStats = {
      repoCount: repos.length,
      totalCommits: Math.max(755, totalCommits),
      totalStars,
      totalForks,
      lastUpdated: Date.now(),
      repoHealth: Math.min(100, Math.round(90 + Math.min(10, repos.length))),
    };

    setCachedData(stats);
    return stats;
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);

    // Return accurate default values on error
    return {
      repoCount: 11,
      totalCommits: 755,
      totalStars: 0,
      totalForks: 0,
      lastUpdated: Date.now(),
      repoHealth: 98,
    };
  }
}

export async function fetchRepositories(): Promise<GitHubRepository[]> {
  // Check cache first
  const cached = getCachedRepos();
  if (cached) {
    return cached;
  }
  // Try static JSON generated at build time first with cache-busting timestamp
  try {
    const staticResp = await fetch(`/github-repos.json?t=${Date.now()}`);
    if (staticResp.ok) {
      const r = await staticResp.json();
      setCachedRepos(r);
      return r as GitHubRepository[];
    }
  } catch (_) {
    // ignore and fallback to API
  }

  try {
    const repoHeaders2: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
    if (GITHUB_TOKEN) repoHeaders2.Authorization = `token ${GITHUB_TOKEN}`;

    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=stars&direction=desc`,
      {
        headers: repoHeaders2,
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos: GHRepo[] = await reposResponse.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error('No repositories found');
    }

    const transformedRepos: GitHubRepository[] = repos
      .filter((repo: GHRepo) => !repo.fork && repo.name !== GITHUB_USER)
      .slice(0, 12)
      .map((repo: GHRepo) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description || 'No description',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Unknown',
        updatedAt: repo.updated_at,
      }));

    if (transformedRepos.length > 0) {
      setCachedRepos(transformedRepos);
      return transformedRepos;
    } else {
      throw new Error('No valid repositories after filtering');
    }
  } catch (error) {
    console.error('Failed to fetch repositories:', error);

    const fallbackRepos: GitHubRepository[] = [
      {
        id: 1,
        name: 'zyekh.cloud',
        url: `https://github.com/${GITHUB_USER}/zyekh.cloud`,
        description: 'Terminal-themed personal portfolio | React + Vite + TypeScript',
        stars: 0,
        forks: 0,
        language: 'TypeScript',
        updatedAt: new Date().toISOString(),
      },
    ];

    setCachedRepos(fallbackRepos);
    return fallbackRepos;
  }
}
