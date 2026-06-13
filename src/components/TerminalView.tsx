/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { TerminalLogLine } from '../types';

export default function TerminalView() {
  const [history, setHistory] = useState<TerminalLogLine[]>([
    { text: 'ZYEKH_ABDUL CORE OS [Version 4.1.0-Onyx]', type: 'success' },
    { text: 'Initial handshake complete. System localized Jakarta, IDN.', type: 'output' },
    { text: 'Type "help" to view list of available diagnostic commands.', type: 'output' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queueRef = useRef<TerminalLogLine[]>([]);
  const processingRef = useRef(false);

  // Typewriter/timing configuration
  const baseCharDelay = 20; // ms per character
  const baseLinePause = 60; // ms pause after each line
  const TYPEWRITER = false; // set false to make lines appear instantly

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const enqueueLines = (lines: TerminalLogLine[]) => {
    queueRef.current.push(...lines);
    processQueue();
  };

  const processQueue = async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    while (queueRef.current.length > 0) {
      const line = queueRef.current.shift()!;
      // For input lines, append immediately (user typed)
      if (line.type === 'input') {
        setHistory((prev) => [...prev, line]);
        // small pause after command input
        await sleep(120);
        continue;
      }

      // For output lines, either typewriter per-character or appear instantly
      if (!TYPEWRITER) {
        setHistory((prev) => [...prev, line]);
        // small pause to preserve ordering rhythm
        await sleep(baseLinePause + Math.floor(Math.random() * 40));
        continue;
      }

      let current = '';
      // Add an empty line first so container reserves the node for smooth scrolling
      setHistory((prev) => [...prev, { text: '', type: line.type }] );

      for (let i = 0; i < line.text.length; i++) {
        current += line.text[i];
        setHistory((prev) => {
          const copy = prev.slice(0, -1);
          copy.push({ text: current, type: line.type });
          return copy;
        });
        // Vary speed slightly for realism
        const jitter = Math.floor(Math.random() * 12) - 6; // -6..+5
        let charDelay = baseCharDelay + jitter;
        if (line.type === 'success' || line.type === 'error') charDelay += 8;
        if (charDelay < 6) charDelay = 6;
        await sleep(charDelay);
      }

      // Small pause after the line completes
      const linePause = baseLinePause + Math.floor(Math.random() * 80);
      await sleep(linePause);
    }
    processingRef.current = false;
  };

  useEffect(() => {
    // Keep console scrolled to the bottom
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    // Focus terminal input automatically
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append user input line (enqueue — input lines render immediately)
    enqueueLines([{ text: `guest_user@sec-studio:~$ ${rawCmd}`, type: 'input' }]);

    // Save to historical queue
    setCommandHistory((prev) => [rawCmd, ...prev]);
    setHistoryIndex(-1);

    const match = cmd.split(' ')[0];

    switch (match) {
      case 'help':
        enqueueLines([
          { text: '---------------------------------------------------------', type: 'output' },
          { text: 'AVAILABLE INTEGRITY CORE COMMANDS:', type: 'success' },
          {
            text: '  about        Show identity profile information of Zyekh Abdul Qadir Jailani.',
            type: 'output',
          },
          {
            text: '  skills       Report technical domain proficiencies and progress.',
            type: 'output',
          },
          { text: '  archive      Print localized portfolio index with URLs.', type: 'output' },
          {
            text: '  contact      Provide secure transmission coordinates and channels.',
            type: 'output',
          },
          {
            text: '  neofetch     Ascii banner overview of core system specifications.',
            type: 'output',
          },
          {
            text: '  vuln-scan    Run diagnostic penetration testing simulations.',
            type: 'success',
          },
          { text: '  matrix       Trigger digital code stream buffer overlay.', type: 'success' },
          { text: '  clear        Wipe log history stack.', type: 'output' },
          { text: '---------------------------------------------------------', type: 'output' },
        ]);
        break;

      case 'about':
        enqueueLines([
          { text: '=== ZYEKH ABDUL QADIR JAILANI ID REPORT ===', type: 'success' },
          { text: 'ROLE: Software Engineer & Systems Architect', type: 'output' },
          { text: 'HQ: Jakarta, IDN (6.2088° S, 106.8456° E)', type: 'output' },
          {
            text: 'FOCUS: Enterprise Backend Architecture, Android modding, Network Security hardening.',
            type: 'output',
          },
          {
            text: 'ACADEMICS: SMK Skill Village, SMPIT Daarul Ijabah, MI Al-Husein.',
            type: 'output',
          },
        ]);
        break;

      case 'skills':
        enqueueLines([
          { text: '=== CAPABILITY DEPLOYMENT MATRIX ===', type: 'success' },
          {
            text: '  BASH/SHELL      [ 40% ] — Expert automation frameworks & deployment controls.',
            type: 'output',
          },
          {
            text: '  PYTHON          [ BEGINNER ] — Custom automated pentest scripts & payloads development.',
            type: 'output',
          },
          {
            text: '  LUA             [ 56% ] — Embedded network setups (Wireshark scripting / Nginx).',
            type: 'output',
          },
          {
            text: '  LARAVEL/JS      [ BEGINNER ] — Hardened enterprise RESTful secure APIs & interfaces.',
            type: 'output',
          },
        ]);
        break;

      case 'archive':
        enqueueLines([
          { text: '=== LOCAL REPOSITORY ARCHIVE ===', type: 'success' },
          {
            text: '1. Laravel_12_Microservices [PUBLIC] — Stars: 1.2k | PHP, Redis, Docker',
            type: 'output',
          },
          { text: '   -> https://github.com/yakunzizhex', type: 'success' },
          {
            text: '2. Kernel_Level_Research [RESTRICTED] — Stars: [CLASSIFIED] | C, Assembly, Bash',
            type: 'error',
          },
          { text: '   -> https://github.com/yakunzizhex', type: 'success' },
          { text: '3. Remote Agent Research [PUBLIC] | JS, Remote_Agent', type: 'output' },
          { text: '   -> https://github.com/yakunzizhex', type: 'success' },
          { text: '4. OS Debloat & Modding Scripts [PUBLIC] | Bash, PowerShell', type: 'output' },
          { text: '   -> https://github.com/yakunzizhex', type: 'success' },
        ]);
        break;

      case 'contact':
        enqueueLines([
          { text: '=== SECURE TRANSMISSION UPLINK ===', type: 'success' },
          { text: 'Coordinates: Jakarta, IDN (6.2088° S, 106.8456° E)', type: 'output' },
          {
            text: 'PGP Fingerprint: 9F2E 4D5B 7A1C 8E3D 6B2F 0A4E 5D1C 9F3B 8A7E 6D4C',
            type: 'warn',
          },
          {
            text: 'Available Channels: Web Contact UI Form or Secure Signal payload CV.',
            type: 'output',
          },
        ]);
        break;

      case 'neofetch':
        enqueueLines([
          { text: '             ,gg,                     guest_user@zyekh_abdul', type: 'success' },
          { text: '            i8""8i                    ---------------------', type: 'success' },
          {
            text: '            d8  8b                    OS: ZYEKH_ABDUL Onyx v4.1.0-Onyx x86_64',
            type: 'success',
          },
          {
            text: '           ,8P  ,8P                   Host: Client-Node Virtual Terminal v2.4',
            type: 'output',
          },
          {
            text: "          ,8P'  ,8P'                  Kernel: 5.15.0-88-generic-security",
            type: 'output',
          },
          {
            text: "         ,8P' _ ,8P'                  Uptime: 45 days, 12 hours, 4 minutes",
            type: 'output',
          },
          { text: "        ,8P' i8 ,8P'                  Shell: bash 5.1.16", type: 'output' },
          {
            text: "       ,8P' ,8P,8P'                   Resolution: Responsive Vector-GRID",
            type: 'output',
          },
          {
            text: "     ,8P'  ,8P,8P'                    CPU: Antigravity AI Engine",
            type: 'output',
          },
          {
            text: "    ,8P'  ,8P'8P                      Memory: Optimized Client State Buffer",
            type: 'output',
          },
          {
            text: '"Y88P"   "Y8" "Y8"                    Theme: Cosmic Slate Minimalist Dark Mode',
            type: 'output',
          },
        ]);
        break;

      case 'clear':
        setHistory([]);
        queueRef.current = [];
        break;

      case 'matrix':
        setShowMatrix(true);
        setTimeout(() => {
          setShowMatrix(false);
          enqueueLines([{ text: '[SYSTEM_INFO] Matrix binary fallback buffer completed.', type: 'success' }]);
        }, 4000);
        break;

      case 'vuln-scan':
        if (isScanning) {
          enqueueLines([
            { text: '[ERROR] Scan process already active.', type: 'error' },
          ]);
          return;
        }
        setIsScanning(true);
        enqueueLines([
          {
            text: '[SYSTEM] Initializing complete security audits in current modules...',
            type: 'warn',
          },
        ]);

        await sleep(600);
        enqueueLines([{ text: '[SCAN] Probing localhost:3000 web frameworks (Laravel v12)...', type: 'output' }]);

        await sleep(800);
        enqueueLines([{ text: '[SCAN] 0 vulnerabilities detected in routing structures.', type: 'success' }]);

        await sleep(700);
        enqueueLines([
          {
            text: '[PROBE] Scanning low-level service ports... [OPEN PORT 22 / SSH]',
            type: 'warn',
          },
        ]);

        await sleep(900);
        enqueueLines([
          {
            text: '[SUCCESS] Audit finished. Core layers verified. System Integrity is at 100%.',
            type: 'success',
          },
        ]);
        setIsScanning(false);
        break;

      default:
        enqueueLines([
          {
            text: `bash: ${match}: command not found. Type "help" to view diagnostic manuals.`,
            type: 'error',
          },
        ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="no-animations flex flex-col gap-8 font-mono max-w-[1280px] mx-auto px-4 md:px-6 py-8 text-[#e3e1ec] min-h-[50vh]">
      {/* Header index tag indicators */}
      <section className="border-l-4 border-white pl-4 md:pl-6 text-left select-none">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-2 py-0.5 border border-[#444748] text-xs font-semibold text-[#c4c7c8]">
            [ CORE_SHELL_INTERFACE ]
          </span>
          <span className="text-[#8e9192] text-xs">ONLINE</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
          TERMINAL_CONSOLE
        </h1>
        <p className="font-mono text-sm md:text-base text-[#c4c7c8] max-w-2xl leading-relaxed">
          Interactive client-authoritative execution terminal. Query local attributes, explore
          portfolio structures, or start live diagnostics probing directly!
        </p>
      </section>

      {/* Terminal Board Console */}
      <div
        onClick={handleTerminalClick}
        className="w-full bg-black border border-[#444748] shadow-2xl relative min-h-[450px] flex flex-col overflow-hidden cursor-text"
      >
        {/* Scanning raster line overlay */}
        <div className="scanline" />

        {/* Matrix Rain overlays */}
        {showMatrix && (
          <div className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center text-green-500 font-bold overflow-hidden select-none">
            <div className="text-center font-mono text-[10px] md:text-sm animate-pulse flex flex-col gap-2 px-4">
              <span className="text-white bg-green-900 border border-green-500 px-4 py-2 font-bold">
                [BUFFER_DUMPING_STARTING]
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 tracking-wider opacity-60">
                <span>01011001</span>
                <span>11001010</span>
                <span>00110110</span>
                <span>10101111</span>
                <span>01110010</span>
                <span>10110101</span>
                <span>00101010</span>
                <span>11100100</span>
              </div>
            </div>
          </div>
        )}

        {/* Console title line header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1b22] border-b border-[#444748] select-none">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-none inline-block" />
            <span className="w-2.5 h-2.5 bg-yellow-500 rounded-none inline-block" />
            <span className="w-2.5 h-2.5 bg-green-500 rounded-none inline-block" />
          </div>
          <span className="text-[10px] md:text-xs text-[#c4c7c8]/60 uppercase font-semibold">
            ZYEKH_ABDUL://guest_user@virtualbox-tty1
          </span>
          <div className="w-10" />
        </div>

        {/* Simulated Command prompt stream list */}
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-2.5 overflow-y-auto text-left text-xs md:text-sm select-text selection:bg-white selection:text-black">
          {history.map((line, idx) => {
            let styleClass = 'text-[#c4c7c8]';
            if (line.type === 'input') styleClass = 'text-white font-bold leading-relaxed';
            if (line.type === 'success') styleClass = 'text-cyan-400 font-semibold';
            if (line.type === 'error') styleClass = 'text-red-400 font-semibold';
            if (line.type === 'warn') styleClass = 'text-yellow-500 font-regular';

            return (
              <div
                key={idx}
                className={`${styleClass} leading-tight break-all whitespace-pre-wrap`}
              >
                {line.text}
              </div>
            );
          })}

          {/* Interactive input row block */}
          {!isScanning && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white font-bold shrink-0">guest_user@sec-studio:~$</span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent text-white border-none outline-none ring-0 p-0 m-0 font-mono text-xs md:text-sm focus:ring-0 focus:outline-none"
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                maxLength={100}
                placeholder="Type command here..."
              />
            </div>
          )}

          {isScanning && (
            <div className="flex items-center gap-2 text-yellow-500 font-bold animate-pulse">
              <span>SCANNING_AND_COMPILING_LOCAL_REPOS...</span>
            </div>
          )}

          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
}
