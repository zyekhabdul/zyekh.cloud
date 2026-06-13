import React from 'react';
import { TerminalLogLine } from '../types';

interface TerminalShellProps {
  lines: TerminalLogLine[];
  className?: string;
  height?: string | number;
}

export default function TerminalShell({ lines, className = '', height = '100%' }: TerminalShellProps) {
  return (
    <div
      className={`terminal-shell ${className} font-mono text-[10px] md:text-[11px] leading-relaxed text-[#c4c7c8]/60 overflow-hidden select-text p-4 md:p-6 pt-16 md:pt-20`}
      style={{ height }}
    >
      {lines.map((line, idx) => {
        let styleClass = 'text-[#c4c7c8]';
        if (line.type === 'input') styleClass = 'text-white font-bold leading-relaxed';
        if (line.type === 'success') styleClass = 'text-cyan-400 font-semibold';
        if (line.type === 'error') styleClass = 'text-red-400 font-semibold';
        if (line.type === 'warn') styleClass = 'text-yellow-500 font-regular';

        return (
          <div key={idx} className={`${styleClass} leading-relaxed break-all whitespace-pre-wrap`}> 
            {line.text}
          </div>
        );
      })}
    </div>
  );
}
