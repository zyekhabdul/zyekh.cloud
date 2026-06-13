const GITHUB_USER = 'zyekhabdul';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const CACHE_KEY = 'github_stats_cache';
const REPOS_CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes (will be refreshed every 5 min from component)

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

  try {
    // Fetch user repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    // Calculate stats
    let totalCommits = 0;
    let totalStars = 0;
    let totalForks = 0;

    // Fetch commit count for each repo (all repos, but with optimization)
    const commitPromises = repos.map(async (repo: any) => {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=1`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );

        if (commitsResponse.ok) {
          const linkHeader = commitsResponse.headers.get('link');
          if (linkHeader) {
            // Parse last page number from Link header for total commit count
            const lastMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
            return lastMatch ? parseInt(lastMatch[1], 10) : 1;
          }
        }
        return 1;
      } catch (error) {
        console.warn(`Error fetching commits for ${repo.name}:`, error);
        return 0;
      }
    });

    const commitCounts = await Promise.all(commitPromises);
    totalCommits = commitCounts.reduce((a, b) => a + b, 0);

    // Sum stars and forks from all repos
    repos.forEach((repo: any) => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
    });

    const stats: GitHubStats = {
      repoCount: repos.length,
      totalCommits: Math.max(180, totalCommits),
      totalStars,
      totalForks,
      lastUpdated: Date.now(),
      repoHealth: Math.min(100, Math.round((totalStars / Math.max(1, repos.length)) * 2 + 20)), // Health score: stars per repo + base
    };

    setCachedData(stats);
    return stats;
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);

    // Return default values on error
    return {
      repoCount: 12,
      totalCommits: 180,
      totalStars: 0,
      totalForks: 0,
      lastUpdated: Date.now(),
      repoHealth: 72,
    };
  }
}

export async function fetchRepositories(): Promise<GitHubRepository[]> {
  // Check cache first
  const cached = getCachedRepos();
  if (cached) {
    return cached;
  }

  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=stars&direction=desc`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error('No repositories found');
    }

    // Filter and transform repos
    const transformedRepos: GitHubRepository[] = repos
      .filter((repo: any) => !repo.fork && repo.name !== 'zyekhabdul') // Exclude forks and profile repo
      .slice(0, 12) // Show top 12
      .map((repo: any) => ({
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

    // Return fallback data
    const fallbackRepos: GitHubRepository[] = [
      {
        id: 1,
        name: 'porto-sec-studio',
        url: `https://github.com/${GITHUB_USER}/porto-sec-studio`,
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
