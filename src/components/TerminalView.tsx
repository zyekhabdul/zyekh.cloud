import React, { useEffect, useRef, useState } from 'react';
import ascii from '../assets/ascii-art.txt?raw';

export default function TerminalView(): JSX.Element {
  const [lines, setLines] = useState<string[]>([ascii, '']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const outRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outRef.current) {
      outRef.current.scrollTop = outRef.current.scrollHeight;
    }
  }, [lines]);

  function submitCommand(cmd: string) {
    if (!cmd && cmd !== '') return;
    setLines(prev => [...prev, `guest_user@sec-studio:~$ ${cmd}`]);
    // fake response for demo
    setTimeout(() => {
      setLines(prev => [...prev, `executed: ${cmd}`, '']);
    }, 150);
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
      <div
        ref={outRef}
        className="terminal-output"
        style={{
          background: 'var(--terminal-bg, #0b0b0d)',
          color: 'var(--terminal-text, #e3e1ec)',
          padding: 16,
          borderRadius: 6,
          border: '1px solid var(--terminal-border, rgba(80,80,80,0.6))',
          minHeight: 240,
          maxHeight: '60vh',
          overflow: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--terminal-muted, #c4c7c8)' }}>
          {lines.join('\n')}
        </pre>
      </div>

      <div style={{ marginTop: 8 }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type command here... (Enter to run, Shift+Enter for newline)"
          style={{
            width: '100%',
            resize: 'none',
            background: 'transparent',
            color: 'var(--terminal-text, #e3e1ec)',
            border: '1px solid rgba(0,0,0,0)',
            outline: 'none',
            padding: '10px 12px',
            boxSizing: 'border-box',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 14,
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            wordBreak: 'break-word'
          }}
        />
      </div>
    </div>
  );
}
