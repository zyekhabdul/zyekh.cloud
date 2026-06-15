import React, { useEffect, useRef, useState } from 'react';
import ascii from '../assets/ascii-art.txt?raw';

type Line = { text: string; type?: 'output' | 'success' | 'warn' };

export default function TerminalView(): JSX.Element {
  const [lines, setLines] = useState<Line[]>([
    ...ascii.split('\n').map(l => ({ text: l, type: 'success' as const })),
    { text: '' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const outRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  function submitCommand(cmd: string) {
    if (!cmd && cmd !== '') return;
    const prompt = { text: `guest_user@sec-studio:~$ ${cmd}`, type: 'output' as const };
    if (cmd.trim() === 'neofetch') {
      const info: Line[] = [
        { text: '=== SYSTEM OVERVIEW ===', type: 'success' },
        { text: 'OS: ZYEKH_ABDUL Onyx v4.1.0-Onyx x86_64', type: 'output' },
        { text: 'Host: Client-Node Virtual Terminal v2.4', type: 'output' },
        { text: 'Kernel: 5.15.0-88-generic-security', type: 'output' },
        { text: '', type: 'output' }
      ];
      setLines(prev => [...prev, prompt, ...ascii.split('\n').map(l => ({ text: l, type: 'success' })), ...info, { text: '' }]);
      return;
    }
    setLines(prev => [...prev, prompt]);
    setTimeout(() => setLines(prev => [...prev, { text: `executed: ${cmd}`, type: 'output' }, { text: '' }]), 150);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = input.trimEnd();
      submitCommand(value);
      setInput('');
      inputRef.current?.focus();
    }
  }

  return (
    <div className="terminal-wrapper" style={{ padding: 12 }}>
      <div ref={outRef} className="terminal-output fixed" aria-live="polite">
        <div className="terminal-contents">
          {lines.map((l, i) => (
            <div key={i} className={`terminal-line ${l.type ?? 'output'}`}>
              {l.text}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type command here... (Enter to run, Shift+Enter for newline)"
          className="terminal-input"
        />
      </div>
    </div>
  );
}
