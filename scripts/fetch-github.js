#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const GITHUB_USER = 'zyekhabdul';
const TOKEN = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '';
const outDir = path.resolve(process.cwd(), 'public');

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  try {
    if (!TOKEN) {
      console.warn('[fetch-github] No token provided in environment; continuing with unauthenticated requests (may be rate-limited).');
    }

    const headers = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (TOKEN) headers.Authorization = `token ${TOKEN}`;

    console.log('[fetch-github] Fetching repos...');
    const repos = await fetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, headers);

    // Compute basic stats
    let totalCommits = 0;
    let totalStars = 0;
    let totalForks = 0;

    const commitCounts = await Promise.all(
      repos.map(async (repo) => {
        try {
          const r = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=1`, { headers });
          if (r.ok) {
            const link = r.headers.get('link');
            if (link) {
              const m = link.match(/page=(\d+)>; rel="last"/);
              return m ? Number(m[1]) : 1;
            }
          }
        } catch (e) {
          console.warn('[fetch-github] commit fetch error for', repo.name, e.message);
        }
        return 1;
      })
    );

    totalCommits = commitCounts.reduce((a, b) => a + b, 0);
    repos.forEach((r) => {
      totalStars += r.stargazers_count || 0;
      totalForks += r.forks_count || 0;
    });

    const stats = {
      repoCount: repos.length,
      totalCommits: Math.max(180, totalCommits),
      totalStars,
      totalForks,
      lastUpdated: Date.now(),
      repoHealth: Math.min(100, Math.round((totalStars / Math.max(1, repos.length)) * 2 + 20)),
    };

    const transformed = repos
      .filter((r) => !r.fork && r.name !== GITHUB_USER)
      .slice(0, 12)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description || 'No description',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Unknown',
        updatedAt: repo.updated_at,
      }));

    // Ensure public directory exists
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(path.join(outDir, 'github-stats.json'), JSON.stringify(stats, null, 2));
    fs.writeFileSync(path.join(outDir, 'github-repos.json'), JSON.stringify(transformed, null, 2));

    console.log('[fetch-github] Wrote github-stats.json and github-repos.json to public/');
  } catch (error) {
    console.warn('[fetch-github] API fetch failed (continuing build with existing/fallback data):', error.message);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const statsFile = path.join(outDir, 'github-stats.json');
    const reposFile = path.join(outDir, 'github-repos.json');
    if (!fs.existsSync(statsFile)) {
      fs.writeFileSync(
        statsFile,
        JSON.stringify({ repoCount: 11, totalCommits: 755, totalStars: 0, totalForks: 0, lastUpdated: Date.now(), repoHealth: 72 }, null, 2)
      );
    }
    if (!fs.existsSync(reposFile)) {
      fs.writeFileSync(
        reposFile,
        JSON.stringify(
          [
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
          ],
          null,
          2
        )
      );
    }
  }
}

main();
