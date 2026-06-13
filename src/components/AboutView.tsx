/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from '../types';

interface AboutViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function AboutView({ onTabChange }: AboutViewProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const capabilities = [
    { name: 'BASH', value: 40 },
    { name: 'PYTHON', value: 10 },
    { name: 'LUA', value: 56 },
    { name: 'LARAVEL/PHP', value: 56 },
  ];

  const timeline = [
    {
      year: '2024 — 2027',
      institution: 'SMK Skill Village',
      description: 'Advanced Software Engineering and System Administration.',
      url: 'https://skillageislamic.sch.id/',
    },
    {
      year: '2022 — 2024',
      institution: 'SMPIT Daarul Ijabah',
      description: 'Foundational technical studies and logic development.',
    },
    {
      year: '2016 — 2021',
      institution: 'MI Al-Husein',
      description: 'Early education and introduction to computing.',
      url: 'https://mis.alhusein.sch.id/',
    },
  ];

  const collaborators = [
    { initials: 'AI', name: 'Claude AI', role: 'Development Assistant' },
    { initials: 'AI', name: 'ChatGPT', role: 'Research & Analysis' },
    { initials: 'CV', name: 'CV Framework', role: 'Code Review' },
  ];

  const certifications = [
    {
      id: 'CERT_02',
      type: 'WEBINAR_HOST',
      title: 'Webinar Episode 2 - Skillage Academy',
      img: '/certificates/cert-webinar.png',
    },
    {
      id: 'CERT_03',
      type: 'MS_WORD_COMP',
      title: 'MS Word Operation - Skillage',
      img: '/certificates/cert-msword.jpg',
    },
    {
      id: 'CERT_04',
      type: 'PROJA_DUTIF',
      title: 'Proja Dutif - PT. Intitama',
      img: '/certificates/cert-projadutif-sesi-1.jpg',
    },
    {
      id: 'CERT_05',
      type: 'WEB_BROWSER',
      title: 'Web Browser Operation - Skillage',
      img: '/certificates/cert-browser.jpg',
    },
    {
      id: 'CERT_06',
      type: 'WIN_BEGINNER',
      title: 'Windows Beginner - Skillage',
      img: '/certificates/cert-skillage-window.jpg',
    },
    {
      id: 'CERT_07',
      type: 'HABITUASI_F',
      title: 'DUDI Habituasi (Front) - Skillage',
      img: '/certificates/cert-habituasi-front.png',
    },
    {
      id: 'CERT_08',
      type: 'HABITUASI_B',
      title: 'DUDI Habituasi (Back) - Skillage',
      img: '/certificates/cert-habituasi-back.png',
    },
  ];

  const handleDownloadCV = () => {
    // Elegant client feedback indicating download process initialized
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1l_ZhNoTn2TlekKWCkB9y2aEh6ZdsY11v';
    link.setAttribute('download', 'CV_Zyekh_Abdul_Qadir_Jailani.pdf');
    alert('[SYSTEM_INFO] CV binary payload download requested. Starting secure file stream...');
  };

  return (
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 py-8 animate-fade-in text-[#e3e1ec]">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left Content */}
        <div className="w-full md:flex-1 flex flex-col">
          <div className="mb-4 flex items-center gap-4 select-none">
            <span className="px-2 py-0.5 border border-[#8e9192] font-mono text-xs uppercase text-[#c4c7c8]">
              [ IDENTITY_VERIFIED ]
            </span>
            <span className="text-[#8e9192] text-xs">v2.0.24</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-white uppercase leading-none">
            Full Stack
            <br />
            Developer &amp;
            <br />
            Security Enthusiast
            <span className="cursor-blink" />
          </h1>

          <p className="font-mono text-sm md:text-base text-[#c4c7c8] leading-relaxed">
            SMK software development student with deep interest in security research. Hands-on
            experience with Windows hardening, Linux system administration, and Android custom ROM
            development. Building secure, scalable web applications with focus on defensive
            practices.
          </p>
        </div>

        {/* Profile photo block */}
        <div className="w-full md:w-auto flex justify-center md:justify-end flex-shrink-0">
          <div className="w-56 h-56 md:w-64 md:h-64 border border-[#444748] relative overflow-hidden rounded-none group select-none shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-[#0d0e15] flex items-center justify-center">
            <img
              alt="Developer Profile"
              className="w-full h-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              referrerPolicy="no-referrer"
              src="src/assets/images/pp-aqz220309-gmail-gumball-watterson.jpg"
            />
            <div className="absolute bottom-0 left-0 px-2 py-0.5 bg-[#12131a] border-t border-r border-[#444748] text-xs text-white">
              SEC_USR_01
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scroll Philosophy Banner */}
      <section className="border-y border-[#444748] py-8 overflow-hidden select-none">
        <div className="flex gap-16 animate-infinite-scroll">
          <span className="font-sans text-2xl font-black text-[#e3e1ec] opacity-15 italic uppercase shrink-0">
            &quot;CODE IS TEMPORARY, SECURITY IS PERMANENT&quot;
          </span>
          <span className="font-sans text-2xl font-black text-[#e3e1ec] opacity-15 italic uppercase shrink-0">
            &quot;CODE IS TEMPORARY, SECURITY IS PERMANENT&quot;
          </span>
          <span className="font-sans text-2xl font-black text-[#e3e1ec] opacity-15 italic uppercase shrink-0">
            &quot;CODE IS TEMPORARY, SECURITY IS PERMANENT&quot;
          </span>
          <span className="font-sans text-2xl font-black text-[#e3e1ec] opacity-15 italic uppercase shrink-0">
            &quot;CODE IS TEMPORARY, SECURITY IS PERMANENT&quot;
          </span>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-4 border-b border-[#444748] pb-4">
          <span className="material-symbols-outlined text-white text-3xl font-light">terminal</span>
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            CORE_CAPABILITIES
          </h2>
          <div className="flex-grow h-[1px] bg-[#444748]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#444748] bg-[#0d0e15] rounded-none">
          {/* Software Dev stack */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#444748] text-left">
            <span className="font-sans font-bold text-xs uppercase text-[#8e9192] block mb-6 tracking-widest">
              01. Software Dev
            </span>
            <ul className="space-y-6">
              {capabilities.map((tech) => (
                <li key={tech.name} className="group cursor-default">
                  <div className="flex justify-between items-center mb-1.5 gap-2">
                    <span className="font-sans font-extrabold text-xs md:text-sm tracking-wide text-white group-hover:text-amber-300 transition-colors break-words">
                      {tech.name}
                    </span>
                    <span className="text-xs text-[#8e9192] flex-shrink-0">[ {tech.value}% ]</span>
                  </div>
                  <div className="h-1 bg-[#444748] w-full rounded-none">
                    <div
                      className="h-full bg-white transition-all duration-500 rounded-none group-hover:bg-amber-300"
                      style={{ width: `${tech.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Hardening Section */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#444748] text-left">
            <span className="font-sans font-bold text-xs uppercase text-[#8e9192] block mb-6 tracking-widest">
              02. Security &amp; Hardening
            </span>
            <div className="space-y-4">
              <div className="group p-4 border border-[#444748] invert-on-hover transition-all duration-0 rounded-none cursor-default">
                <div className="flex items-start gap-3 mb-2 min-w-0">
                  <span className="material-symbols-outlined text-lg md:text-xl flex-shrink-0">
                    terminal
                  </span>
                  <h3 className="font-sans font-bold text-xs md:text-sm tracking-wide text-white group-hover:text-[#12131a] break-words min-w-0">
                    REMOTE_AGENT_RESEARCH
                  </h3>
                </div>
                <p className="text-xs leading-normal opacity-70">
                  Remote administration tooling for research and defensive analysis across
                  platforms.
                </p>
              </div>

              <div className="group p-4 border border-[#444748] invert-on-hover transition-all duration-0 rounded-none cursor-default">
                <div className="flex items-start gap-3 mb-2 min-w-0">
                  <span className="material-symbols-outlined text-lg md:text-xl font-light flex-shrink-0">
                    extension
                  </span>
                  <h3 className="font-sans font-bold text-xs md:text-sm tracking-wide text-white group-hover:text-[#12131a] break-words min-w-0">
                    GAME_PATCHING
                  </h3>
                </div>
                <p className="text-xs leading-normal opacity-70">
                  Binary modification and runtime memory patching for security research.
                </p>
              </div>
            </div>
          </div>

          {/* Infrastructure Section */}
          <div className="p-6 md:p-8 text-left bg-[#12131a]">
            <span className="font-sans font-bold text-xs uppercase text-[#8e9192] block mb-6 tracking-widest">
              03. System Hardening
            </span>
            <h3 className="font-sans font-extrabold text-sm tracking-wide text-white mb-4 uppercase">
              HANDS_ON_SKILLS
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Custom Android ROMs', value: '68%' },
                { name: 'Windows Debloating', value: '88%' },
                { name: 'Linux Hardening', value: '74%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white shrink-0 rounded-none" />
                    <span>{item.name}</span>
                  </div>
                  {item.value && (
                    <span className="text-[#8e9192] font-semibold">[ {item.value} ]</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dual Row: Academic Timeline path & Contributors list */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 text-left">
        <div>
          <h2 className="font-sans text-md font-extrabold mb-6 border-b border-[#444748] pb-2 inline-block">
            ACADEMIC_PATH
          </h2>
          <div className="relative pl-6 border-l border-[#444748] py-2">
            {timeline.map((item, index) => (
              <div key={index} className="relative mb-8 last:mb-2">
                {/* Node indicator */}
                <div className="absolute w-2.5 h-2.5 bg-white -left-[31px] top-1.5 border border-[#12131a]" />

                <div className="mb-1 font-mono text-[11px] text-[#8e9192]">{item.year}</div>

                <h3 className="font-sans font-bold text-sm text-white mb-1">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-white hover:text-amber-300 transition-colors"
                    >
                      {item.institution}
                    </a>
                  ) : (
                    item.institution
                  )}
                </h3>

                <p className="text-xs text-[#c4c7c8]/85 leading-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Collaborators selection */}
        <div>
          <h2 className="font-sans text-md font-extrabold mb-6 border-b border-[#444748] pb-2 inline-block">
            TECHNICAL_COLLABORATORS
          </h2>
          <div className="space-y-4">
            {collaborators.map((user) => (
              <div
                key={user.name}
                className="flex items-center justify-between p-4 border border-[#444748] hover:bg-[#1a1b22] transition-colors duration-0 group rounded-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#1a1b22] border border-[#444748] flex items-center justify-center font-bold text-white uppercase text-xs shrink-0 rounded-none group-hover:bg-white group-hover:text-[#12131a] transition-all">
                    {user.initials}
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">{user.name}</h4>
                    <p className="font-sans font-semibold text-[10px] text-[#8e9192] uppercase tracking-wider">
                      {user.role}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-sm text-[#8e9192]">
                  arrow_outward
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials visual image block */}
      <section className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-4 border-b border-[#444748] pb-4">
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            PROF_CERTIFICATIONS
          </h2>
          <div className="flex-grow h-[1px] bg-[#444748]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setLightboxImage(cert.img)}
              className="border border-[#444748] bg-[#0d0e15] p-2.5 group cursor-pointer hover:border-white transition-all duration-300 rounded-none text-left flex flex-col h-full"
            >
              <div className="aspect-[16/10] overflow-hidden mb-3 border border-[#444748] relative">
                <img
                  alt={cert.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300 object-top"
                  referrerPolicy="no-referrer"
                  src={cert.img}
                />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl font-light">
                    zoom_in
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center px-1 py-1 mt-auto select-none">
                <span className="font-mono text-[10px] text-[#8e9192] font-semibold">
                  {cert.id}
                </span>
                <span className="font-sans font-bold text-[9px] text-[#e3e1ec] tracking-wider uppercase">
                  {cert.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Lightbox modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-[#0d0e15]/95 z-[100] flex flex-col justify-center items-center p-4 transition-opacity duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-4">
            <span className="font-mono text-xs text-[#c4c7c8]/80 select-none">
              CLICK ANYWHERE TO CLOSE
            </span>
            <button className="text-white hover:text-amber-300 text-3xl font-bold cursor-pointer transition-colors">
              &times;
            </button>
          </div>
          <div
            className="max-w-4xl max-h-[85vh] border border-[#444748] bg-[#12131a] p-1 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Verification target document"
              className="max-w-full max-h-[80vh] object-contain block select-all"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* CTA section container block */}
      <section className="border border-[#444748] p-8 md:p-14 text-center bg-[#0d0e15] rounded-none mt-4 font-mono select-none">
        <h2 className="font-sans text-2xl font-black mb-4 uppercase text-white tracking-widest">
          INITIATE_CONTACT
        </h2>

        <p className="text-[#c4c7c8] mb-8 max-w-lg mx-auto text-xs md:text-sm font-medium leading-relaxed">
          Available for software engineering, architectural consulting, and security hardening
          projects.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleDownloadCV}
            className="bg-white text-[#12131a] px-8 py-3.5 font-sans font-semibold text-xs uppercase tracking-wider hover:bg-transparent hover:text-white border border-white transition-all cursor-pointer rounded-none"
          >
            Download_CV
          </button>
          <button
            onClick={() => onTabChange('contact')}
            className="border border-[#8e9192] text-white px-8 py-3.5 font-sans font-semibold text-xs uppercase tracking-wider hover:border-white hover:bg-white hover:text-[#12131a] transition-all cursor-pointer rounded-none"
          >
            Secure_Channel
          </button>
        </div>
      </section>
    </div>
  );
}
