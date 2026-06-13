/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import ArchiveView from './components/ArchiveView';
import ContactView from './components/ContactView';
import TerminalView from './components/TerminalView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Trigger scroll-to-top whenever the navigation state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentTab]);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView onTabChange={setCurrentTab} />;
      case 'about':
        return <AboutView onTabChange={setCurrentTab} />;
      case 'services':
        return <ServicesView onTabChange={setCurrentTab} />;
      case 'archive':
        return <ArchiveView onTabChange={setCurrentTab} />;
      case 'contact':
        return <ContactView />;
      case 'terminal':
        return <TerminalView />;
      default:
        return <HomeView onTabChange={setCurrentTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#12131a] text-[#e3e1ec] font-mono select-none selection:bg-white selection:text-black">
      {/* Interactive sticky Navigation Header */}
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main viewport segment */}
      <main className="flex-grow w-full">{renderActiveView()}</main>

      {/* Footer copyright segment */}
      <Footer onTabChange={setCurrentTab} />
    </div>
  );
}
