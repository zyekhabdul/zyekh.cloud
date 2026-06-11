/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType } from '../types';

interface HomeViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  const [logLines, setLogLines] = useState<string[]>([]);
  const [statusOnline] = useState(true);

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

  return (
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 relative py-8 animate-fade-in text-[#e3e1ec]">
      {/* Hero Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative min-h-[500px]">
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
              SOFTWARE ENGINEER &amp; SECURITY RESEARCHER
            </span>
          </h1>

          <p className="font-mono text-sm md:text-base text-[#c4c7c8] max-w-2xl leading-relaxed">
            Architecting resilient systems and dissecting vulnerabilities. Specializing in advanced
            backend logic, penetration testing, and infrastructure automation.
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
        <div className="lg:col-span-5 h-[380px] lg:h-[450px] relative terminal-border bg-[#12131a] overflow-hidden">
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
          <div className="absolute top-4 left-4 z-20 font-mono text-xs text-white bg-[#12131a] border border-white px-3 py-1 uppercase shadow-[0_0_8px_rgba(255,255,255,0.2)] flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-sm">radar</span>
            NETWORK_TAP_ACTIVE
          </div>

          <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] md:text-xs text-white text-right bg-[#12131a]/85 px-2 py-1 terminal-border border-[#444748] leading-tight">
            LAT: 40.7128
            <br />
            LON: -74.0060
            <br />
            SEC_LVL: OMEGA
          </div>

          <div className="absolute inset-0 flex flex-col p-6 pt-16 font-mono text-[11px] leading-tight text-[#c4c7c8]/60 mix-blend-screen overflow-hidden break-all select-none">
            <div className="text-white mb-4">[SYSTEM.SCAN.INIT] ... ACTIVE</div>

            {logLines.map((line, idx) => {
              if (!line) return null;
              return (
                <div key={idx} className="whitespace-nowrap transition-all duration-300">
                  {line.slice(0, 10)}{' '}
                  <span className="text-white font-medium">{line.slice(10, 58)}</span>{' '}
                  <span className="text-[#c4c7c8]/40">{line.slice(58)}</span>
                </div>
              );
            })}

            {logLines.length === hexDump.length && (
              <div className="mt-4 text-[#c4c7c8] opacity-80">
                <br />
                {startupMsgs.map((msg, i) => (
                  <div key={i} className="leading-5">
                    &gt; {msg}
                    {i === startupMsgs.length - 1 && <span className="cursor-block" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

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
          {/* Card items supporting total mouse-over black-white inversions */}
          <div className="terminal-border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 hover:bg-white hover:text-[#12131a] group transition-all duration-0 cursor-default select-none">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider group-hover:text-[#12131a]">
              [UPTIME]
            </div>
            <div className="font-sans text-3xl font-black text-white group-hover:text-[#12131a]">
              99.99%
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] border-t border-[#444748] group-hover:border-[#12131a] pt-2 mt-auto">
              Node Stability
            </div>
          </div>

          <div className="terminal-border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 hover:bg-white hover:text-[#12131a] group transition-all duration-0 cursor-default select-none">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider group-hover:text-[#12131a]">
              [REPOSITORIES]
            </div>
            <div className="font-sans text-3xl font-black text-white group-hover:text-[#12131a]">
              42
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] border-t border-[#444748] group-hover:border-[#12131a] pt-2 mt-auto">
              Active Projects
            </div>
          </div>

          <div className="terminal-border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 hover:bg-white hover:text-[#12131a] group transition-all duration-0 cursor-default select-none">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider group-hover:text-[#12131a]">
              [VULNERABILITIES_PATCHED]
            </div>
            <div className="font-sans text-3xl font-black text-white group-hover:text-[#12131a]">
              128
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] border-t border-[#444748] group-hover:border-[#12131a] pt-2 mt-auto">
              Critical Issues Resolved
            </div>
          </div>

          <div className="terminal-border border-[#444748] bg-[#12131a] p-6 flex flex-col gap-2 hover:bg-red-500 hover:text-white group transition-all duration-0 cursor-default select-none">
            <div className="text-[#c4c7c8] font-sans font-semibold text-xs uppercase tracking-wider group-hover:text-white">
              [THREAT_LEVEL]
            </div>
            <div className="font-sans text-3xl font-black text-red-400 group-hover:text-white">
              ELEVATED
            </div>
            <div className="font-mono text-xs text-[#c4c7c8] group-hover:text-white border-t border-[#444748] group-hover:border-red-600 pt-2 mt-auto">
              Continuous Monitoring Active
            </div>
          </div>
        </div>
      </section>

      {/* CORE REPOSITORIES SECTION */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex items-center justify-between border-b border-[#444748] pb-4">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-white text-3xl">folder_data</span>
            <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              CORE_REPOSITORIES
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-[#444748] mx-4" />
          <button
            onClick={() => onTabChange('archive')}
            className="font-sans font-semibold text-xs uppercase text-[#c4c7c8] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            View Archive <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Repo item 1 */}
          <div className="terminal-border border-[#444748] bg-[#12131a] flex flex-col h-full hover:border-white transition-colors duration-200">
            <div className="p-6 flex-grow flex flex-col gap-4 text-left">
              <div className="flex justify-between items-start">
                <h3 className="font-sans font-bold text-lg text-white">Laravel_12_Microservices</h3>
                <span className="border border-[#8e9192] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                  PUBLIC
                </span>
              </div>
              <p className="font-mono text-xs md:text-sm text-[#c4c7c8] leading-relaxed">
                A highly scalable microservices architecture built on the upcoming Laravel 12
                release. Features aggressive caching strategies and custom RPC protocols.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 select-none">
                <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                  PHP
                </span>
                <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                  Redis
                </span>
                <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                  Docker
                </span>
              </div>
            </div>
            <div className="border-t border-[#444748] bg-[#1a1b22] px-6 py-4 flex justify-between items-center text-xs text-[#c4c7c8]">
              <div className="flex items-center gap-4 select-none">
                <span className="flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[14px]">star</span> 1.2k
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[14px]">fork_right</span> 340
                </span>
              </div>
              <span className="font-mono text-[11px]">Updated 2h ago</span>
            </div>
          </div>

          {/* Repo item 2 - Restricted threat card container */}
          <div className="terminal-border border-red-900 bg-[#12131a] flex flex-col h-full hover:border-red-500 transition-colors duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-[#12131a] font-sans font-black text-[9px] px-3 py-1 select-none">
              RESTRICTED
            </div>
            <div className="p-6 flex-grow flex flex-col gap-4 text-left">
              <div className="flex justify-between items-start">
                <h3 className="font-sans font-bold text-lg text-white">
                  Kernel_Level_Backdoor_Analysis
                </h3>
              </div>
              <p className="font-mono text-xs md:text-sm text-[#c4c7c8] leading-relaxed">
                Deep-dive research into persistent threats utilizing advanced rootkit techniques in
                Unix environments. Includes POCs and mitigation strategies.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 select-none">
                <span className="border border-red-900/60 px-2 py-0.5 text-[10px] text-red-200/70">
                  C
                </span>
                <span className="border border-red-900/60 px-2 py-0.5 text-[10px] text-red-200/70">
                  Assembly
                </span>
                <span className="border border-red-900/60 px-2 py-0.5 text-[10px] text-red-200/70">
                  Bash
                </span>
              </div>
            </div>
            <div className="border-t border-red-900/60 bg-[#1a1b22] px-6 py-4 flex justify-between items-center text-xs text-[#c4c7c8]">
              <div className="flex items-center gap-4">
                <span className="text-red-400 font-bold select-none">[CLASSIFIED]</span>
              </div>
              <span className="font-mono text-[11px] select-none">Updated 1d ago</span>
            </div>
          </div>
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
                <td className="p-4 text-green-400 font-medium">[EXPERT]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Infrastructure automation, CI/CD pipelines, system-level task orchestration.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Python</td>
                <td className="p-4 text-green-300 font-medium">[ADVANCED]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Exploit development, data analysis, custom tooling, backend scripting.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Lua</td>
                <td className="p-4 text-[#c4c7c8] font-medium">[INTERMEDIATE]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Embedded scripting, Nginx configuration, rapid prototyping in constrained
                  environments.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">Laravel (PHP)</td>
                <td className="p-4 text-green-400 font-medium">[EXPERT]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Enterprise web application architecture, API development, complex data routing.
                </td>
              </tr>
              <tr className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4 font-bold text-white">C / C++</td>
                <td className="p-4 text-[#c4c7c8] font-medium">[INTERMEDIATE]</td>
                <td className="p-4 text-[#c4c7c8]">
                  Low-level memory management, reverse engineering, kernel module analysis.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
