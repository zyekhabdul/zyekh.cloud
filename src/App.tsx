/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { TabType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Code-split view components for optimal initial bundle size & fast loading
const HomeView = lazy(() => import('./components/HomeView'));
const AboutView = lazy(() => import('./components/AboutView'));
const ServicesView = lazy(() => import('./components/ServicesView'));
const ArchiveView = lazy(() => import('./components/ArchiveView'));
const ContactView = lazy(() => import('./components/ContactView'));
const TerminalView = lazy(() => import('./components/TerminalView'));

function TabFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px] font-mono text-xs text-[#c4c7c8]">
      <span className="animate-pulse">[ LOADING_TAB_MODULE... ]</span>
    </div>
  );
}

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

      {/* Main viewport segment with lazy suspense boundary */}
      <main className="flex-grow w-full">
        <Suspense fallback={<TabFallback />}>{renderActiveView()}</Suspense>
      </main>

      {/* Footer copyright segment */}
      <Footer onTabChange={setCurrentTab} />
    </div>
  );
}
