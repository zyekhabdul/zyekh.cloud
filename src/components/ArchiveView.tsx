/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Repository } from '../types';

interface ArchiveViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function ArchiveView({ onTabChange }: ArchiveViewProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [syncTime, setSyncTime] = useState('02:14:09');

  useEffect(() => {
    // Generate real-time updates for Last Sync simulation log
    const timer = setInterval(() => {
      const now = new Date();
      setSyncTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const repositories: Repository[] = [
    {
      year: 2026,
      name: 'Android Persistence Research',
      description:
        'Deep-dive research into Android persistence techniques and defensive mitigations.',
      technologies: ['PYTHON', 'ANDROID'],
      category: 'Security Research',
      categoryColor: 'bg-red-500',
      url: 'https://github.com/yakunzizhex',
    },
    {
      year: 2026,
      name: 'Remote Agent Orchestration Research',
      description:
        'Orchestration and secure command routing analysis for remote agent systems and defensive tooling.',
      technologies: ['JS', 'REMOTE_AGENT'],
      category: 'Network Tool',
      categoryColor: 'bg-white',
      url: 'https://github.com/yakunzizhex',
    },
    {
      year: 2025,
      name: 'Laravel 12 Enterprise Prototype',
      description:
        'Index of architectural routing components, multi-factor guards, and modular databases configuration.',
      technologies: ['PHP', 'LARAVEL 12'],
      category: 'Enterprise Prototype',
      categoryColor: 'bg-[#8e9192]',
      screenshot: 'src/assets/images/etc/ss-bukti-porto-2.png',
      url: 'https://github.com/yakunzizhex',
    },
    {
      year: 2026,
      name: 'OS Debloat & Modding Scripts',
      description:
        'Clean collection of PowerShell and Bash tasks automating bloat removal and kernel security tweaks.',
      technologies: ['BASH', 'POWERSHELL'],
      category: 'System Utility',
      categoryColor: 'bg-[#c6c6c6]',
      url: 'https://github.com/yakunzizhex',
    },
  ];

  const credentials = [
    {
      tag: 'Internship',
      title: 'Sertifikat Praktek Kerja - PT. Intitama',
      img: 'https://i.postimg.cc/fTF8WpWC/Sertifikat-Magang-Zyekh-Abdul-Qadir-Jailani.jpg',
    },
    {
      tag: 'Webinar',
      title: 'Webinar Episode 2 - Skillage Academy',
      img: 'https://i.postimg.cc/QxPfNwN4/Sertifikat-Webinar-Episode-2-Zyekh-Abdul-Qadir-Jailani.png',
    },
    {
      tag: 'Competency',
      title: 'MS Word Operation - Skillage',
      img: 'https://i.postimg.cc/ncMdJpx2/Sertifikat-Kompetensi-Operasi-MS-Word-Zyekh-Abdul-page-0001.jpg',
    },
    {
      tag: 'Project',
      title: 'Proja Dutif - PT. Intitama',
      img: 'https://i.postimg.cc/xT76jhjs/Sertifikat-Proja-Dutif-PT-Intitama-Berkah-Nusantara.jpg',
    },
    {
      tag: 'Competency',
      title: 'Web Browser Operation - Skillage',
      img: 'https://i.postimg.cc/BQth043N/Sertifikat-Kompetensi-Operasi-Web-Browser-Zyekh-Abdul-page-0001.jpg',
    },
    {
      tag: 'Competency',
      title: 'Windows Beginner - Skillage',
      img: 'https://i.postimg.cc/yYWfHsK2/Sertifikat-Kompetensi-Operasi-Windows-Beginner-Zyekh-Abdul-page-0001.jpg',
    },
    {
      tag: 'Habituation',
      title: 'DUDI Habituasi (Front) - Skillage',
      img: 'https://i.postimg.cc/jdC8btTQ/Sertifikat-Habituasi-DUDI-bagian-depan-Zyekh-Abdul.png',
    },
    {
      tag: 'Habituation',
      title: 'DUDI Habituasi (Back) - Skillage',
      img: 'https://i.postimg.cc/ncMdJpxv/Sertifikat-Habituasi-DUDI-bagian-belakang-Zyekh-Abdul.png',
    },
  ];

  return (
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 py-8 animate-fade-in text-[#e3e1ec]">
      {/* Header index tags */}
      <section className="border-l-4 border-white pl-4 md:pl-6 text-left">
        <div className="flex items-center gap-4 mb-4 select-none">
          <span className="px-2 py-0.5 border border-[#444748] text-xs font-semibold text-[#c4c7c8]">
            [ REPOSITORY_INDEX ]
          </span>
          <span className="text-[#8e9192] text-xs">v4.1.0</span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-normal md:tracking-tight mb-4">
          PROJECT_ARCHIVE
        </h1>
        <p className="font-mono text-sm md:text-base text-[#c4c7c8] max-w-2xl leading-relaxed">
          Index of technical repositories, security audits, and software prototypes. Curated
          selection of research projects and enterprise-grade security solutions.
        </p>
      </section>

      {/* Primary Mobile Portfolios List */}
      <section className="block md:hidden space-y-4">
        {repositories.map((repo, idx) => (
          <div
            key={idx}
            className="border border-[#444748] p-5 bg-[#1a1b22] hover:bg-[#1e1f26] transition-colors text-left"
          >
            <div className="flex justify-between items-start mb-3 select-none">
              <span className="text-xs text-[#8e9192] font-semibold">{repo.year}</span>
              <div className="flex items-center gap-1.5 text-xs text-[#c4c7c8]">
                <span className={`w-1.5 h-1.5 rounded-none ${repo.categoryColor}`} />
                <span>{repo.category}</span>
              </div>
            </div>

            <h3 className="font-sans font-bold text-base text-white mb-2">{repo.name}</h3>

            {repo.screenshot && (
              <div className="w-full border border-[#444748] overflow-hidden mb-4 aspect-[16/10] bg-black select-none">
                <img
                  alt={repo.name}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300 object-top"
                  referrerPolicy="no-referrer"
                  src={repo.screenshot}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-5 select-none">
              {repo.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-[#444748]/30 border border-[#444748]/50 text-white text-[9px] font-bold"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white border border-[#444748] px-3 py-1.5 hover:bg-white hover:text-[#12131a] transition-colors text-xs uppercase font-sans tracking-wide"
            >
              VIEW PROJECT{' '}
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </a>
          </div>
        ))}
      </section>

      {/* Primary Desktop Portfolio Table list */}
      <section className="hidden md:block border border-[#444748] bg-[#0d0e15] overflow-hidden">
        <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
          <thead>
            <tr className="border-b border-[#444748] bg-[#1a1b22] uppercase font-sans font-bold text-[11px] tracking-widest text-[#c4c7c8]">
              <th className="p-4 w-20">Year</th>
              <th className="p-4">Project Name</th>
              <th className="p-4 w-1/4">Technology</th>
              <th className="p-4 w-1/4">Category</th>
              <th className="p-4 w-40">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444748]/40">
            {repositories.map((repo, idx) => (
              <tr key={idx} className="hover:bg-[#1a1b22] transition-colors group">
                <td className="p-4 text-[#8e9192] italic">{repo.year}</td>
                <td className="p-4">
                  <div className="flex flex-col gap-2 align-middle text-left">
                    <span className="font-sans font-bold text-white text-base">{repo.name}</span>
                    {repo.screenshot && (
                      <div className="w-44 border border-[#444748] overflow-hidden bg-black select-none">
                        <img
                          alt={repo.name}
                          className="w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 object-top"
                          referrerPolicy="no-referrer"
                          src={repo.screenshot}
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1.5 select-none">
                    {repo.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 border border-[#444748] text-white text-[9px] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 select-none text-xs text-[#c4c7c8]">
                    <span className={`w-1.5 h-1.5 rounded-none ${repo.categoryColor}`} />
                    <span>{repo.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 border border-[#444748] px-3 py-1.5 group-hover:bg-white group-hover:text-[#12131a] transition-all text-xs font-sans tracking-wide uppercase group-hover:border-white"
                  >
                    VIEW PROJECT{' '}
                    <span className="material-symbols-outlined text-xs">arrow_outward</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CREDENTIAL VERIFICATION REGISTRY CONTAINER */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="border-l-4 border-white pl-4 md:pl-6 text-left">
          <div className="flex items-center gap-4 mb-4 select-none">
            <span className="px-2 py-0.5 border border-[#444748] text-xs font-semibold text-[#c4c7c8]">
              [ VERIFIED_CREDENTIALS ]
            </span>
            <span className="text-[#8e9192] text-xs">v1.0.2</span>
          </div>
          <h2 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4">
            CREDENTIAL_REGISTRY
          </h2>
          <p className="font-mono text-zinc-400 text-xs md:text-sm leading-normal">
            Authenticated record of technical certifications, industry assessments, and professional
            development milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImage(cred.img)}
              className="border border-[#444748] bg-[#1a1b22] hover:bg-[#1e1f26] p-4 flex flex-col justify-between text-left group cursor-pointer transition-colors"
            >
              <div className="text-[#8e9192] font-mono text-[9px] mb-2 uppercase tracking-widest select-none">
                {cred.tag}
              </div>

              <h3 className="font-sans font-extrabold text-sm text-white mb-6 leading-tight min-h-10 hover:text-white group-hover:text-amber-300 transition-colors">
                {cred.title}
              </h3>

              <div className="inline-flex items-center gap-2 text-white border-t border-[#444748] pt-3 group-hover:border-zinc-400 font-sans font-bold text-[9px] uppercase tracking-wider select-none mt-auto">
                VIEW_CREDENTIAL{' '}
                <span className="material-symbols-outlined text-[13px] text-green-400">
                  verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Trigger frame */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-center items-center p-4 transition-opacity duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-4">
            <span className="font-mono text-xs text-[#c4c7c8]/80 select-none">
              CLICK ANYWHERE TO CLOSE
            </span>
            <button className="text-white hover:text-red-400 text-3xl font-bold cursor-pointer transition-colors">
              &times;
            </button>
          </div>
          <div
            className="max-w-4xl max-h-[85vh] border border-[#444748] bg-[#12131a] p-1 shadow-2xl relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Sec_Credential"
              className="max-w-full max-h-[80vh] object-contain block select-all"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* GAUGE telemetry status dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 border border-[#444748] bg-[#0d0e15] rounded-none mt-6">
        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#444748] text-left">
          <div className="flex items-center justify-between mb-4 select-none">
            <span className="font-sans font-extrabold text-[#8e9192] text-xs uppercase tracking-wider">
              Active Nodes
            </span>
            <span className="material-symbols-outlined text-white text-[18px]">sensors</span>
          </div>
          <div className="font-sans text-2xl font-black text-white leading-none">42.08k</div>
          <div className="mt-6 h-1 w-full bg-[#444748] rounded-none overflow-hidden">
            <div className="h-full bg-white w-2/3 select-none rounded-none" />
          </div>
        </div>

        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#444748] text-left">
          <div className="flex items-center justify-between mb-4 select-none">
            <span className="font-sans font-extrabold text-[#8e9192] text-xs uppercase tracking-wider">
              Sec Protocols
            </span>
            <span className="material-symbols-outlined text-white text-[18px]">encrypted</span>
          </div>
          <div className="font-sans text-2xl font-black text-white leading-none">98.4%</div>
          <div className="mt-6 font-mono text-[11px] text-[#c4c7c8]">
            SHA-256 <span className="text-white font-bold">[ENFORCED]</span>
          </div>
        </div>

        <div className="p-6 md:p-8 text-left">
          <div className="flex items-center justify-between mb-4 select-none">
            <span className="font-sans font-extrabold text-[#8e9192] text-xs uppercase tracking-wider">
              Last Sync
            </span>
            <span className="material-symbols-outlined text-white text-[18px]">update</span>
          </div>
          <div className="font-sans text-2xl font-black text-white leading-none">{syncTime}</div>
          <div className="mt-6 font-mono text-[11px] text-[#c4c7c8] truncate">
            [UTC_TIME_SIGNAL]
          </div>
        </div>
      </section>

      {/* Terminal Visual Component container */}
      <section className="border border-[#444748] bg-black overflow-hidden relative">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#444748] bg-[#1a1b22] select-none">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 bg-[#444748] rounded-none" />
            <div className="w-2.5 h-2.5 bg-[#444748] rounded-none" />
            <div className="w-2.5 h-2.5 bg-[#444748] rounded-none" />
          </div>

          <div className="text-[10px] font-mono tracking-wider text-[#c4c7c8]/60 uppercase ml-2 select-none truncate">
            system_integrity_check — remote-access
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 font-mono text-[12px] md:text-sm text-[#c4c7c8]/80 space-y-2 overflow-x-auto text-left select-text">
          <p className="whitespace-nowrap leading-tight">
            <span className="text-white font-bold">&gt;</span> query portfolio_index --all
          </p>
          <p className="opacity-60 whitespace-nowrap leading-tight">
            Fetching repository metadata from secure clusters...
          </p>
          <p className="opacity-60 whitespace-nowrap leading-tight">
            Found 4 validated assets. Rendering presentation layer.
          </p>
          <p className="opacity-60 whitespace-nowrap leading-tight">
            Status: <span className="text-white font-bold">Ready</span> since Tue 2026-05-21
            04:20:11 UTC
          </p>
          <p className="whitespace-nowrap leading-tight">
            <span className="text-white font-bold">&gt;</span> verifying data integrity...
          </p>
          <p className="whitespace-nowrap leading-tight">
            <span className="text-white font-bold">&gt;</span> [SUCCESS] Index localized and
            verified. All links active.
          </p>
          <p className="whitespace-nowrap leading-tight">
            <span className="text-white font-bold">&gt;</span> <span className="cursor-block" />
          </p>
        </div>
      </section>

      {/* Contact CTA container consistent wrapper */}
      <section className="border border-[#444748] p-6 md:p-14 text-center bg-[#0d0e15] rounded-none select-none font-mono">
        <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-black mb-4 uppercase text-white tracking-wide md:tracking-widest leading-snug md:leading-none break-words">
          Initiate_Contact
        </h2>
        <p className="text-[#c4c7c8] mb-8 max-w-lg mx-auto text-xs md:text-sm font-medium leading-relaxed">
          Available for software engineering, architectural consulting, and security hardening
          projects.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => alert('[SYSTEM_INFO] Starting CV binary download...')}
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
