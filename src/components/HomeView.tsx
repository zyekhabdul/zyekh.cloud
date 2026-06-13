/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

  // Hex dump data to output in the terminal component
  const hexDump = [
    '0x00000000 45 78 65 63 75 74 69 6e 67 20 63 6f 72 65 20 62  Executing core b',
    '0x00000010 69 6e 61 72 79 2e 2e 2e 0a 4c 6f 61 64 69 6e 67  inary....Loading',
    '0x00000020 20 6d 6f 64 75 6c 65 73 3a 20 5b 4f 4b 5d 0a 41   modules: [OK].A',
    '0x00000030 6e 61 6c 79 7a 69 6e 67 20 74 72 61 66 66 69 63  nalyzing traffic',
    '0x00000040 20 70 61 74 74 65 72 6e 73 2e 2e 2e 20 5b 57 41  patterns... [WA',
    '0x00000050 52 4e 49 4e 47 5d 0a 44 65 63 72 79 70 74 69 6f  RNING].Decryptio',
    '0x00000060 6e 20 6b 65 79 20 67 65 6e 65 72 61 74 65 64 2e  n key generated.',
  ];

  const startupMsgs = [
    'CONNECTING TO SECURE NODE...',
    'BYPASSING FIREWALL... [SUCCESS]',
    'ESTABLISHING UPLINK...',
    'AWAITING_COMMAND',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < hexDump.length) {
        const currentLine = hexDump[index];
        setLogLines((prev) => [...prev, currentLine]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
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
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 relative py-8 animate-fade-in text-[#e3e1ec] overflow-hidden">
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
                statusOnline ? 'bg-white animate-pulse' : 'bg-red-500'
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
        <div className="no-animations lg:col-span-5 h-[320px] sm:h-[380px] lg:h-[450px] relative terminal-border bg-[#12131a] overflow-hidden flex flex-col">
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
          <div className="absolute top-4 left-4 z-20 font-mono text-[9px] md:text-xs text-white bg-[#12131a] border border-white px-2 md:px-3 py-1 uppercase shadow-[0_0_8px_rgba(255,255,255,0.2)] flex items-center gap-1 md:gap-1.5 font-bold whitespace-nowrap">
            <span className="material-symbols-outlined text-xs md:text-sm">radar</span>
            <span className="hidden sm:inline">NETWORK_TAP_ACTIVE</span>
            <span className="sm:hidden">NET_TAP</span>
          </div>

          {/* System Status Indicators - Only on desktop */}
          <div className="hidden lg:flex absolute bottom-4 right-4 z-20 font-mono text-white text-right space-y-3 flex-col items-end">
            {/* Status Badge */}
            <div className="terminal-border border-[#444748] bg-[#12131a]/90 px-3 py-2 inline-block">
              <div className="text-[9px] md:text-[10px] text-[#8e9192] font-bold tracking-widest mb-2">
                LOCATION
              </div>
              <div className="text-[10px] md:text-xs leading-relaxed space-y-1">
                <div>
                  LAT: <span className="text-white font-mono">6.2088°S</span>
                </div>
                <div>
                  LON: <span className="text-white font-mono">106.8456°E</span>
                </div>
              </div>
            </div>

            {/* Security Level */}
            <div className="terminal-border border-[#444748] bg-[#12131a]/90 px-3 py-2 inline-block">
              <div className="text-[9px] md:text-[10px] text-green-400 font-bold tracking-widest mb-1">
                SEC_LVL
              </div>
              <div className="text-xs md:text-sm text-white font-bold">OMEGA</div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col p-4 md:p-6 pt-16 md:pt-20 font-mono text-[10px] md:text-[11px] leading-relaxed text-[#c4c7c8]/60 mix-blend-screen overflow-hidden select-none">
            <div className="text-white mb-3 md:mb-4 terminal-line" style={{ animationDelay: '0s' }}>
              [SYSTEM.SCAN.INIT] ... ACTIVE
            </div>

            {logLines.map((line, idx) => {
              if (!line) return null;
              return (
                <div
                  key={idx}
                  className="terminal-line whitespace-nowrap truncate md:truncate-none"
                  style={{ animationDelay: `${(idx + 1) * 0.05}s` }}
                >
                  <span className="text-[#8e9192]">{line.slice(0, 10)}</span>{' '}
                  <span className="text-white font-medium">{line.slice(10, 58)}</span>{' '}
                  <span className="text-[#c4c7c8]/40">{line.slice(58)}</span>
                </div>
              );
            })}

            {logLines.length === hexDump.length && (
              <div className="mt-4 text-[#c4c7c8] space-y-0">
                <br />
                {startupMsgs.map((msg, i) => (
                  <div
                    key={i}
                    className="leading-5 terminal-startup"
                    style={{
                      animationDelay: `${(hexDump.length + 2 + i) * 0.05}s, ${
                        (hexDump.length + 2 + i) * 0.05 + 0.3
                      }s`,
                    }}
                  >
                    &gt; {msg}
                    {i === startupMsgs.length - 1 && <span className="cursor-block" />}
                  </div>
                ))}
              </div>
            )}
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
          <div className="text-[9px] text-green-400 font-bold tracking-widest mb-2">SEC_LVL</div>
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
            <div className="font-sans text-3xl font-black text-green-400">
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
                    <h3 className="font-sans font-bold text-sm md:text-base text-white hover:text-amber-300 transition-colors line-clamp-2 break-words">
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
