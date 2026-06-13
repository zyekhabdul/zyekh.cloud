/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
// TerminalShell removed per request
import { TabType } from '../types';
import {
  fetchGitHubStats,
  GitHubStats,
  fetchRepositories,
  GitHubRepository,
} from '../services/github';

interface HomeViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  const [logLines, setLogLines] = useState<string[]>([]);
  const [statusOnline] = useState(true);
  const [gitHubStats, setGitHubStats] = useState<GitHubStats | null>(null);
  const [isLoadingGitHub, setIsLoadingGitHub] = useState(true);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // System scan and diagnostics output for terminal
  const systemScan = [
    '$ ./security_audit.sh',
    'Initializing system diagnostics...',
    '[✓] Kernel: Linux 5.15.0-generic #1 SMP',
    '[✓] Architecture: x86_64 | Uptime: 247d 14h 32m',
    '[✓] Memory: 32GB | Available: 28.6GB (89%)',
    '[✓] Core binaries verified',
    '[✓] SSH configuration secure',
    '[✓] Firewall rules active',
    '[✓] Port 22/ssh - OpenSSH 8.2p1',
    '[✓] Port 80/http - nginx 1.18.0',
    '[✓] Port 443/https - active',
    '[✓] No suspicious connections',
    '[✓] DNS queries normal',
    '[✓] Intrusion detection: CLEAN',
  ];

  const startupMsgs = [
    'Initializing secure connection...',
    'Loading cryptographic modules... [OK]',
    'Authenticating credentials... [OK]',
    'Ready for commands.',
  ];

  // NOTE: auto-scroll intentionally disabled to avoid forcing viewport jump on reload.
  // If needed, re-enable only when user is at the bottom using a scroll handler.

  useEffect(() => {
    let index = 0;
    let startupIndex = 0;
    let pushScanInterval: any = null;
    let pushStartupInterval: any = null;

    // Increase timing between lines to 500ms (user requested 0.5s)
    pushScanInterval = setInterval(() => {
      if (index < systemScan.length) {
        const currentLine = systemScan[index];
        setLogLines((prev) => [...prev, currentLine]);
        index++;
      } else {
        clearInterval(pushScanInterval);
        // start pushing startup messages after scan completes
        pushStartupInterval = setInterval(() => {
          if (startupIndex < startupMsgs.length) {
            setLogLines((prev) => [...prev, startupMsgs[startupIndex]]);
            startupIndex++;
          } else {
            clearInterval(pushStartupInterval);
          }
        }, 500);
      }
    }, 500);

    return () => {
      if (pushScanInterval) clearInterval(pushScanInterval);
      if (pushStartupInterval) clearInterval(pushStartupInterval);
    };
  }, []);

  useEffect(() => {
    const loadGitHubStats = async () => {
      setIsLoadingGitHub(true);
      try {
        const stats = await fetchGitHubStats();
        setGitHubStats(stats);
      } catch (error) {
        console.error('Failed to load GitHub stats:', error);
      } finally {
        setIsLoadingGitHub(false);
      }
    };

    loadGitHubStats();
    // Refresh every 5 minutes
    const interval = setInterval(loadGitHubStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadRepositories = async () => {
      setIsLoadingRepos(true);
      try {
        const repos = await fetchRepositories();
        setRepositories(repos);
      } catch (error) {
        console.error('Failed to load repositories:', error);
      } finally {
        setIsLoadingRepos(false);
      }
    };

    loadRepositories();
    // Refresh every 5 minutes
    const interval = setInterval(loadRepositories, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 relative py-8 animate-fade-in text-[#e3e1ec] overflow-visible">
      {/* Hero Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start relative min-h-[400px] md:min-h-[500px]">
        {/* Background micro grid pattern absolute helper */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="lg:col-span-7 flex flex-col gap-6 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 border border-[#8e9192] px-3 py-1 self-start font-sans font-semibold text-xs text-[#c4c7c8] bg-[#12131a] select-none">
            <span
              className={`w-2 h-2 rounded-none ${
                statusOnline ? 'bg-white animate-pulse' : 'bg-white/30'
              }`}
            />
            <span>SYSTEM_STATUS: {statusOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tighter text-white uppercase leading-[1.05]">
            ZYEKH ABDUL QADIR JAILANI <br />
            <span className="font-mono text-base md:text-lg text-[#c4c7c8] block mt-4 tracking-normal lowercase font-normal">
              FULL STACK DEVELOPER &amp; SECURITY RESEARCHER
            </span>
          </h1>

          <p className="font-mono text-sm md:text-base text-[#c4c7c8] max-w-2xl leading-relaxed">
            Building secure web applications and exploring system-level security. Focus on backend
            architecture, secure coding practices, and defensive research across platforms.
          </p>

          <div className="flex flex-row flex-wrap gap-4 mt-4">
            <button
              onClick={() => onTabChange('contact')}
              className="bg-white text-[#2f3131] px-6 py-3 font-sans font-semibold text-xs tracking-wider uppercase hover:bg-transparent hover:text-white border border-white transition-all cursor-pointer rounded-none"
            >
              Initialize Contact
            </button>
            <button
              onClick={() => onTabChange('terminal')}
              className="bg-transparent text-white px-6 py-3 font-sans font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-[#12131a] border border-[#8e9192] transition-colors cursor-pointer rounded-none"
            >
              View Log (CLI)
            </button>
          </div>
        </div>

        {/* Diagnostic Simulator Column */}
        <div className="no-animations lg:col-span-5 h-[51vh] sm:h-[66vh] lg:h-[65vh] relative terminal-border bg-[#12131a] overflow-hidden flex flex-col">
          {/* Scanning lines */}
          <div className="scanline" />
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Active Hud overlay tag labels */}
          <div className="absolute top-4 left-4 md:top-4 z-40 font-mono text-[9px] md:text-xs text-white bg-[#12131a] border border-white px-2 md:px-3 py-2 sm:py-3 md:py-4 lg:py-3 uppercase shadow-[0_0_8px_rgba(255,255,255,0.2)] flex items-center gap-1 md:gap-1.5 font-bold whitespace-nowrap">
            <span className="material-symbols-outlined text-xs md:text-sm">radar</span>
            <span className="hidden sm:inline">NETWORK_TAP_ACTIVE</span>
            <span className="sm:hidden">NET_TAP</span>
          </div>

          {/* Terminal Log Display - Monochrome Professional */}
          <div className="absolute inset-0 flex flex-col p-4 pt-16 pb-0 sm:p-6 sm:pt-20 sm:pb-0 lg:pt-18 lg:pb-0 overflow-hidden bg-[#0d0e15]">
            <div className="flex-1 overflow-y-auto pb-0 font-mono text-[9px] sm:text-xs lg:text-xs text-[#c4c7c8] leading-relaxed space-y-0">
              {logLines.map((line, idx) => (
                <div key={idx} className="text-[#c4c7c8] font-mono whitespace-pre-wrap break-words overflow-hidden" style={{
                  animation: `terminal-line-fade 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                  animationDelay: `${idx * 500}ms`
                }}>
                  {line}
                </div>
              ))}
              {logLines.length === 0 && (
                <div className="text-[#8e9192] animate-pulse font-light">$ connecting...</div>
              )}
              <div ref={terminalEndRef} className="h-0" />
            </div>
          </div>

          {/* System Status Indicators - Floating boxes inside terminal */}
          <div className="hidden lg:flex absolute top-4 right-4 z-40 font-mono text-white text-right space-y-2 flex-col items-end">
            {/* Status Badge */}
            <div className="terminal-border border-[#444748] bg-[#12131a]/95 px-3 py-2 inline-block shadow-lg">
              <div className="text-[9px] md:text-[10px] text-[#8e9192] font-bold tracking-widest mb-2">
                LOCATION
              </div>
              <div className="text-[10px] md:text-xs leading-relaxed space-y-0.5">
                <div>
                  LAT: <span className="text-white font-mono">6.2088°S</span>
                </div>
                <div>
                  LON: <span className="text-white font-mono">106.8456°E</span>
                </div>
              </div>
            </div>

            {/* Security Level */}
            <div className="terminal-border border-[#444748] bg-[#12131a]/95 px-3 py-2 inline-block shadow-lg">
              <div className="text-[9px] md:text-[10px] text-white font-bold tracking-widest mb-1">
                SEC_LVL
              </div>
              <div className="text-xs md:text-sm text-white font-bold">OMEGA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Status Indicators - shown only on small/medium screens */}
      <div className="lg:hidden flex flex-col sm:flex-row gap-4 font-mono text-white">
        {/* Status Badge */}
        <div className="terminal-border border-[#444748] bg-[#12131a] px-4 py-3 flex-1">
          <div className="text-[9px] text-[#8e9192] font-bold tracking-widest mb-2">LOCATION</div>
          <div className="text-xs leading-relaxed space-y-1">
            <div>
              LAT: <span className="text-white font-mono">6.2088°S</span>
            </div>
            <div>
              LON: <span className="text-white font-mono">106.8456°E</span>
            </div>
          </div>
        </div>

        {/* Security Level */}
        <div className="terminal-border border-[#444748] bg-[#12131a] px-4 py-3 flex-1">
          <div className="text-[9px] text-white font-bold tracking-widest mb-2">SEC_LVL</div>
          <div className="text-sm text-white font-bold">OMEGA</div>
        </div>
      </div>

      {/* SYSTEM OVERVIEW: Security & Hardening stats */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-[#444748] pb-4">
          <span className="material-symbols-outlined text-white text-3xl">hub</span>
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            SYSTEM_OVERVIEW
          </h2>
          <div className="flex-grow h-[1px] bg-[#444748]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* UPTIME Card */}
          <div className="system-card border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 cursor-default select-none transition-all duration-200">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider">
              [UPTIME]
            </div>
            <div className="font-sans text-3xl font-black text-white">
              {isLoadingGitHub ? <span className="inline-block animate-pulse">●●●</span> : '99.99%'}
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] border-t border-[#444748] pt-2 mt-auto">
              Node Stability
            </div>
          </div>

          {/* REPOSITORIES Card */}
          <div className="system-card border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 cursor-default select-none transition-all duration-200">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider">
              [REPOSITORIES]
            </div>
            <div className="font-sans text-3xl font-black text-white">
              {isLoadingGitHub ? (
                <span className="inline-block animate-pulse">●●●</span>
              ) : (
                gitHubStats?.repoCount || 12
              )}
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] border-t border-[#444748] pt-2 mt-auto">
              Active Projects
            </div>
          </div>

          {/* REPO_HEALTH Card */}
          <div className="system-card border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 cursor-default select-none transition-all duration-200">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider">
              [REPO_HEALTH]
            </div>
            <div className="font-sans text-3xl font-black text-white">
              {isLoadingGitHub ? (
                <span className="inline-block animate-pulse">●●●</span>
              ) : (
                `${gitHubStats?.repoHealth || 72}%`
              )}
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] border-t border-[#444748] pt-2 mt-auto">
              Repository Quality
            </div>
          </div>

          {/* SECURITY_FOCUS Card (Green Theme) */}
          <div className="system-card system-card-security border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 cursor-default select-none transition-all duration-200">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider">
              [SECURITY_FOCUS]
            </div>
            <div className="font-sans text-3xl font-black text-white">
              {isLoadingGitHub ? <span className="inline-block animate-pulse">●●●</span> : 'ACTIVE'}
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] border-t border-[#444748] pt-2 mt-auto">
              Defensive Research Active
            </div>
          </div>
        </div>
      </section>

      {/* CORE REPOSITORIES SECTION */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#444748] pb-4 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="material-symbols-outlined text-white text-3xl flex-shrink-0">
              folder_data
            </span>
            <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              CORE_REPOSITORIES
            </h2>
          </div>
          <button
            onClick={() => onTabChange('archive')}
            className="font-sans font-semibold text-xs uppercase text-[#c4c7c8] hover:text-white flex items-center gap-1 cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            View Archive <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoadingRepos ? (
            <div className="col-span-full text-center py-12">
              <span className="inline-block animate-pulse text-lg">Loading repositories...</span>
            </div>
          ) : repositories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#c4c7c8]">
              No repositories found
            </div>
          ) : (
            repositories.slice(0, 2).map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-border border-[#444748] bg-[#12131a] flex flex-col h-full hover:border-white transition-colors duration-200 cursor-pointer"
              >
                <div className="p-6 flex-grow flex flex-col gap-4 text-left min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <h3 className="font-sans font-bold text-sm md:text-base text-white hover:text-white transition-colors line-clamp-2 break-words">
                      {repo.name.replace(/-/g, '_').toUpperCase()}
                    </h3>
                    <span className="border border-[#8e9192] px-2 py-0.5 text-[10px] text-[#c4c7c8] flex-shrink-0 whitespace-nowrap">
                      PUBLIC
                    </span>
                  </div>
                  <p className="font-mono text-xs md:text-sm text-[#c4c7c8] leading-relaxed">
                    {repo.description || 'No description provided'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 select-none">
                    {repo.language && (
                      <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                        {repo.language}
                      </span>
                    )}
                  </div>
                </div>
                <div className="border-t border-[#444748] bg-[#1a1b22] px-6 py-4 flex justify-between items-center text-xs text-[#c4c7c8]">
                  <div className="flex items-center gap-4 select-none">
                    <span className="flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      {repo.stars > 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : repo.stars}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-[14px]">fork_right</span>
                      {repo.forks}
                    </span>
                  </div>
                  <span className="font-mono text-[11px]">
                    {new Date(repo.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* TECHNICAL DOMAIN PROTOCOL TABLE */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex items-center gap-4 border-b border-[#444748] pb-4">
          <span className="material-symbols-outlined text-white text-3xl">account_tree</span>
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            TECHNICAL_DOMAIN
          </h2>
          <div className="flex-grow h-[1px] bg-[#444748]" />
        </div>

        <div className="terminal-border border-[#444748] bg-[#12131a] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs md:text-sm min-w-[650px] border-collapse">
            <thead>
              <tr className="bg-[#1a1b22] text-[#c4c7c8] border-b border-[#444748] uppercase font-sans font-bold text-[11px] tracking-wider">
                <th className="p-4 w-1/4">Protocol / Language</th>
                <th className="p-4 w-1/4">Proficiency Vector</th>
                <th className="p-4 w-1/2">Primary Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#444748]/50">
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Bash / Shell Scripting</td>
                <td className="p-4 text-[#c4c7c8] font-medium">[INTERMEDIATE]</td>
                <td className="p-4 text-[#c4c7c8]">
                  System automation, Linux workflow scripting, automation tooling.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Python</td>
                <td className="p-4 text-[#8e9192] font-medium">[BEGINNER]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Data analysis, utility scripts, learning backend fundamentals.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Lua</td>
                <td className="p-4 text-[#c4c7c8] font-medium">[INTERMEDIATE]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Game scripting, rapid prototyping, configuration automation.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Laravel (PHP)</td>
                <td className="p-4 text-[#c4c7c8] font-medium">[INTERMEDIATE]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Web application development, REST API design, backend architecture.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
