/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const NAV_ITEMS: { label: string; value: TabType }[] = [
  { label: 'Home', value: 'home' },
  { label: 'About', value: 'about' },
  { label: 'Services', value: 'services' },
  { label: 'Archive', value: 'archive' },
  { label: 'Contact', value: 'contact' },
];

export default function Navbar({ currentTab, onTabChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full top-0 sticky bg-[#12131a] border-b border-[#444748] z-50 font-mono">
      <div className="flex justify-between items-center h-16 px-4 md:px-6 max-w-[1280px] mx-auto relative z-50 bg-[#12131a]">
        <button
          onClick={() => {
            onTabChange('home');
            setMobileMenuOpen(false);
          }}
          className="font-sans text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer z-50 hover:opacity-85 transition-opacity"
        >
          ZYEKH_ABDUL
        </button>

        <div className="flex items-center gap-8 z-50">
          <nav className="hidden md:flex items-center gap-6" id="desktop-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = currentTab === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => onTabChange(item.value)}
                  className={`font-mono text-sm tracking-tight cursor-pointer ${
                    isActive
                      ? 'text-white border-b border-white pb-1 font-medium'
                      : 'text-[#c4c7c8] hover:bg-white hover:text-[#12131a] transition-colors duration-0 px-2 py-0.5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center text-[#e3e1ec] hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <button
              onClick={() => onTabChange('contact')}
              className="hidden md:inline-block bg-white text-[#2f3131] px-4 py-2 font-sans font-semibold text-xs tracking-wider uppercase hover:bg-transparent hover:text-white border border-white transition-all cursor-pointer rounded-none"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Mobile menu block */}
        {mobileMenuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-[#12131a] border-b border-[#444748] flex flex-col items-center gap-6 p-6 md:hidden z-40">
            {NAV_ITEMS.map((item) => {
              const isActive = currentTab === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    onTabChange(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-center font-mono py-1 cursor-pointer ${
                    isActive
                      ? 'text-white border-b border-white pb-1 font-medium'
                      : 'text-[#c4c7c8] hover:bg-white hover:text-[#12131a] transition-colors duration-0'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                onTabChange('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-white text-[#2f3131] px-4 py-3 font-sans font-semibold text-xs tracking-wider uppercase hover:bg-transparent hover:text-white border border-white transition-all rounded-none cursor-pointer"
            >
              Connect
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
