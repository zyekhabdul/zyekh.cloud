/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  onTabChange: (tab: TabType) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="w-full bg-[#12131a] border-t border-[#444748] mt-12 md:mt-24 font-mono">
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-6 max-w-[1280px] mx-auto gap-4 md:gap-0">
        <div className="font-sans font-semibold text-xs tracking-wider text-white uppercase text-center md:text-left">
          © 2026 ZYEKH_ABDUL [PPLG_DEV]
        </div>
        <div className="flex gap-6 md:gap-8 justify-center items-center">
          <a
            className="font-mono text-xs text-[#c4c7c8] transition-all hover:text-white underline"
            href="https://github.com/yakunzizhex"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="font-mono text-xs text-[#c4c7c8] transition-all hover:text-white underline"
            href="https://linkedin.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <button
            onClick={() => {
              onTabChange('terminal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-xs text-[#c4c7c8] hover:text-white underline cursor-pointer hover:underline transition-all"
          >
            Terminal
          </button>
        </div>
      </div>
    </footer>
  );
}
