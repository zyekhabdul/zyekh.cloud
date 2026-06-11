/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from '../types';

interface ServicesViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function ServicesView({ onTabChange }: ServicesViewProps) {
  // Setup reactive state arrays to support individual card hover triggers
  const [phaseTexts, setPhaseTexts] = useState<Record<number, string>>({
    1: '[INITIATED]',
    2: '[IN_PROGRESS]',
    3: '[ACTIVE]',
    4: '[FINALIZING]',
  });

  const originalStates: Record<number, string> = {
    1: '[INITIATED]',
    2: '[IN_PROGRESS]',
    3: '[ACTIVE]',
    4: '[FINALIZING]',
  };

  const handleMouseEnter = (phaseNum: number) => {
    setPhaseTexts((prev) => ({
      ...prev,
      [phaseNum]: '[SCANNING_VULNS...]',
    }));
  };

  const handleMouseLeave = (phaseNum: number) => {
    setPhaseTexts((prev) => ({
      ...prev,
      [phaseNum]: originalStates[phaseNum],
    }));
  };

  const stackManifest = [
    'RUST',
    'GOLANG',
    'TYPESCRIPT',
    'KALI LINUX',
    'DOCKER',
    'UNREAL ENGINE',
    'POSTGRESQL',
    'KUBERNETES',
  ];

  return (
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 py-8 animate-fade-in text-[#e3e1ec]">
      {/* Hero Section */}
      <section className="py-8 border-b border-[#444748] text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 flex flex-col items-start gap-4">
            <div className="inline-block border border-[#8e9192] px-2 py-0.5 select-none text-[#c4c7c8]">
              <span className="text-xs uppercase font-semibold">[SYSTEM_STATUS: OPERATIONAL]</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-[1.05] tracking-tight">
              Technical Rigor.
              <br />
              Architectural Integrity.
            </h1>

            <p className="font-mono text-sm md:text-base text-[#c4c7c8] max-w-2xl leading-relaxed mt-2">
              A specialized multidisciplinary studio focused on Secure Software Development, Cyber
              Auditing, and Technical Design. We bridge the gap between high-performance engineering
              and defensive security.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end w-full select-none">
            <div className="w-full h-40 border border-[#444748] relative overflow-hidden bg-[#0d0e15] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #444748 1px, transparent 1px), linear-gradient(to bottom, #444748 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <span className="text-xs text-center text-white bg-[#12131a] p-2 border border-[#444748] font-bold tracking-wider relative z-10">
                ENCRYPTED_FLOW_01
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE EXPERTISE BENTO BLOCK */}
      <section className="flex flex-col gap-6">
        <div className="mb-4 text-left">
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            Core Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#444748] bg-[#0d0e15] rounded-none">
          {/* SECURE DEVELOPMENT */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#444748] hover:bg-[#1a1b22] transition-colors duration-300 group rounded-none flex flex-col text-left">
            <div className="flex items-center justify-between mb-8 md:mb-12 select-none">
              <span className="material-symbols-outlined text-4xl text-white group-hover:scale-110 transition-transform">
                shield_lock
              </span>
              <span className="font-mono text-xs opacity-40 font-bold">01</span>
            </div>
            <h3 className="font-sans font-bold text-base md:text-lg text-white mb-4">
              Secure Software Development
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#c4c7c8] mb-8 leading-relaxed">
              Building robust applications with security as a primary architectural pillar. We
              implement SDLC practices that neutralize threats before they reach production.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto select-none">
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                CWE/SANS
              </span>
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                DevSecOps
              </span>
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                Hardened APIs
              </span>
            </div>
          </div>

          {/* AUDITING DIVISION */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#444748] hover:bg-[#1a1b22] transition-colors duration-300 group rounded-none flex flex-col text-left">
            <div className="flex items-center justify-between mb-8 md:mb-12 select-none">
              <span className="material-symbols-outlined text-4xl text-white group-hover:scale-110 transition-transform">
                terminal
              </span>
              <span className="font-mono text-xs opacity-40 font-bold">02</span>
            </div>
            <h3 className="font-sans font-bold text-base md:text-lg text-white mb-4">
              Cyber Audit &amp; Analysis
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#c4c7c8] mb-8 leading-relaxed">
              Deep-dive vulnerability assessment and penetration testing. We analyze codebases and
              network architecture to identify critical failure points.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto select-none">
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                Static Analysis
              </span>
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                CVE Discovery
              </span>
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                Compliance
              </span>
            </div>
          </div>

          {/* PPLG DEVELOPMENT */}
          <div className="p-6 md:p-8 hover:bg-[#1a1b22] transition-colors duration-300 group rounded-none flex flex-col text-left">
            <div className="flex items-center justify-between mb-8 md:mb-12 select-none">
              <span className="material-symbols-outlined text-4xl text-white group-hover:scale-110 transition-transform">
                sports_esports
              </span>
              <span className="font-mono text-xs opacity-40 font-bold">03</span>
            </div>
            <h3 className="font-sans font-bold text-base md:text-lg text-white mb-4">
              Web &amp; Game Development
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#c4c7c8] mb-8 leading-relaxed">
              Core PPLG competencies. High-fidelity interactive experiences and scalable web
              platforms optimized for performance and security.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto select-none">
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                WebGL
              </span>
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                Architecture
              </span>
              <span className="border border-[#444748] px-2 py-0.5 text-[10px] text-[#c4c7c8]">
                Real-time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTION PROTOCOL METHODOLOGY */}
      <section className="py-12 border-t border-[#444748] bg-[#0d0e15] p-4 md:p-8 text-center select-none">
        <div className="mb-12">
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase inline-block border-b-2 border-white pb-1.5 tracking-wider">
            Execution Protocol
          </h2>
        </div>

        <div className="relative">
          {/* Desktop timeline backbone line overlay */}
          <div className="hidden md:block absolute top-[55%] left-0 w-full h-[1px] bg-[#444748] -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10 text-left">
            {/* Phase 1 */}
            <div
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={() => handleMouseLeave(1)}
              className="bg-[#12131a] border border-[#444748] p-5 hover:bg-white hover:text-[#12131a] transition-all duration-300 rounded-none cursor-default group"
            >
              <div className="font-mono text-[10px] text-[#8e9192] group-hover:text-[#474747] mb-2 font-bold tracking-widest">
                PHASE_01
              </div>
              <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#12131a] mb-3">
                Discovery &amp; Strategy
              </h4>
              <p className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] opacity-80 leading-relaxed font-light">
                We align technical requirements with business goals to ensure a reliable project
                roadmap from day one.
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-[#8e9192] group-hover:text-[#12131a]">
                <span className="material-symbols-outlined text-[18px]">radar</span>
                <span className="text-[10px] font-bold">{phaseTexts[1]}</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={() => handleMouseLeave(2)}
              className="bg-[#12131a] border border-[#444748] p-5 hover:bg-white hover:text-[#12131a] transition-all duration-300 rounded-none cursor-default group"
            >
              <div className="font-mono text-[10px] text-[#8e9192] group-hover:text-[#474747] mb-2 font-bold tracking-widest">
                PHASE_02
              </div>
              <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#12131a] mb-3">
                Technical Planning
              </h4>
              <p className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] opacity-80 leading-relaxed font-light">
                Defining system architecture and workflows to maximize performance and minimize
                future technical debt.
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-[#8e9192] group-hover:text-[#12131a]">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                <span className="text-[10px] font-bold">{phaseTexts[2]}</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={() => handleMouseLeave(3)}
              className="bg-[#12131a] border border-[#444748] p-5 hover:bg-white hover:text-[#12131a] transition-all duration-300 rounded-none cursor-default group"
            >
              <div className="font-mono text-[10px] text-[#8e9192] group-hover:text-[#474747] mb-2 font-bold tracking-widest">
                PHASE_03
              </div>
              <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#12131a] mb-3">
                Agile Implementation
              </h4>
              <p className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] opacity-80 leading-relaxed font-light">
                Rapid, iterative development focusing on functional excellence and robust codebase
                integrity.
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-[#8e9192] group-hover:text-[#12131a]">
                <span className="material-symbols-outlined text-[18px]">code</span>
                <span className="text-[10px] font-bold">{phaseTexts[3]}</span>
              </div>
            </div>

            {/* Phase 4 */}
            <div
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={() => handleMouseLeave(4)}
              className="bg-[#12131a] border border-[#444748] p-5 hover:bg-white hover:text-[#12131a] transition-all duration-300 rounded-none cursor-default group"
            >
              <div className="font-mono text-[10px] text-[#8e9192] group-hover:text-[#474747] mb-2 font-bold tracking-widest">
                PHASE_04
              </div>
              <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#12131a] mb-3">
                Security &amp; Optimization
              </h4>
              <p className="font-mono text-xs text-[#c4c7c8] group-hover:text-[#12131a] opacity-80 leading-relaxed font-light">
                Ensuring total data protection and peak speed through rigorous testing and system
                hardening.
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-[#8e9192] group-hover:text-[#12131a]">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="text-[10px] font-bold">{phaseTexts[4]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK MANIFEST CODES */}
      <section className="py-8 border-y border-[#444748] text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="w-full md:w-1/3">
            <h3 className="font-sans font-black text-lg text-white uppercase mb-2">
              Stack Manifest
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#c4c7c8] opacity-80 leading-relaxed">
              We utilize a restricted selection of high-performance tools to ensure stability and
              security.
            </p>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3 select-none">
            {stackManifest.map((tool) => (
              <div
                key={tool}
                className="border border-[#444748] p-4 flex flex-col items-center justify-center grayscale opacity-60 hover:opacity-100 transition-all cursor-default rounded-none bg-[#0a0b0e]"
              >
                <span className="font-mono font-bold text-[10px] md:text-xs tracking-wider text-white">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initialize Collaboration centered buttons CTA */}
      <section className="py-16 md:py-24 text-center select-none">
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black mb-8 uppercase text-white tracking-widest leading-none">
          Initialize Collaboration
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onTabChange('contact')}
            className="bg-white text-[#12131a] px-10 py-4 font-sans font-semibold text-xs uppercase tracking-wider hover:bg-transparent hover:text-white border border-white transition-all cursor-pointer rounded-none w-full sm:w-auto"
          >
            Request Audit
          </button>
          <button
            onClick={() => onTabChange('contact')}
            className="bg-transparent text-white border border-[#444748] px-10 py-4 font-sans font-semibold text-xs uppercase tracking-wider hover:border-white hover:bg-white hover:text-[#12131a] transition-all cursor-pointer rounded-none w-full sm:w-auto"
          >
            Project Inquiry
          </button>
        </div>
      </section>
    </div>
  );
}
