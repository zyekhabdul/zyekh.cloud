/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

// Sub-component for dynamic Jakarta UTC+7 clock to prevent re-renders of the parent form
function JakartaClock() {
  const [localTime, setLocalTime] = useState('--:--:-- UTC+7');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const jktTime = new Date(utc + 3600000 * 7);

      const timeStr =
        jktTime.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' UTC+7';

      setLocalTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{localTime}</span>;
}

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [buttonText, setButtonText] = useState('Send_Message');
  const [isSending, setIsSending] = useState(false);
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setButtonText('[SENDING...]');
    setFormFeedback(null);

    setTimeout(() => {
      setButtonText('[SENT_SUCCESSFULLY]');
      setFormFeedback('Uplink established. Connection logged successfully.');

      setTimeout(() => {
        setButtonText('Send_Message');
        setIsSending(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setFormFeedback(null);
      }, 2000);
    }, 1500);
  };

  const handleDownloadKey = () => {
    alert('[SYSTEM_ENGAGED] starting download of PGP Public Key binary armory shield...');
  };

  return (
    <div className="flex flex-col gap-12 font-mono max-w-[1280px] mx-auto px-4 md:px-6 py-8 animate-fade-in text-[#e3e1ec]">
      {/* Contact Screen Header Section */}
      <section className="text-left select-none">
        <div className="flex items-center gap-2 mb-4 text-[#c4c7c8]">
          <span className="font-mono text-xs uppercase px-2 py-0.5 border border-[#8e9192] rounded-none">
            [CONTACT_ACTIVE]
          </span>
          <span className="flex-grow h-px bg-[#444748] max-w-[120px] md:max-w-[200px]" />
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase mb-6 leading-none">
          Let&apos;s Collaborate.
          <span className="cursor-block" />
        </h1>

        <p className="font-mono text-sm md:text-base text-[#c4c7c8] max-w-2xl leading-relaxed">
          Available for software development projects, technical consulting, and security audits.
        </p>
      </section>

      {/* Grid body layout splits form vs sidebar metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Side: Minimal Contact Form Box */}
        <div className="lg:col-span-7">
          <div className="terminal-border border-[#444748] p-6 md:p-8 bg-[#0d0e15] rounded-none select-none">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 01. Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-[#8e9192]">
                    01. Your Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#444748] py-2 text-white focus:border-white transition-all rounded-none placeholder-[#8e9192]/40 font-mono text-xs md:text-sm focus:outline-none"
                    placeholder="GUEST_USER"
                    required
                    type="text"
                    disabled={isSending}
                  />
                </div>

                {/* 02. Email Address Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-[#8e9192]">
                    02. Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#444748] py-2 text-white focus:border-white transition-all rounded-none placeholder-[#8e9192]/40 font-mono text-xs md:text-sm focus:outline-none"
                    placeholder="USER@DOMAIN.TLD"
                    required
                    type="email"
                    disabled={isSending}
                  />
                </div>
              </div>

              {/* 03. Subject Field */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-[#8e9192]">
                  03. Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#444748] py-2 text-white focus:border-white transition-all rounded-none placeholder-[#8e9192]/40 font-mono text-xs md:text-sm focus:outline-none"
                  placeholder="PROJECT_INQUIRY / CONSULTATION"
                  required
                  type="text"
                  disabled={isSending}
                />
              </div>

              {/* 04. Message Textarea field */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-[#8e9192]">
                  04. Message Content
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#444748] p-4 text-white focus:border-white transition-all rounded-none placeholder-[#8e9192]/40 resize-none font-mono text-xs md:text-sm focus:outline-none focus:ring-0"
                  placeholder="How can we work together?"
                  required
                  rows={6}
                  disabled={isSending}
                />
              </div>

              {/* Success validation notifier logs */}
              {formFeedback && (
                <div className="text-zinc-400 font-mono text-xs p-3 border border-zinc-700 bg-zinc-900/40 rounded-none w-full flex items-center gap-1.5 animate-pulse">
                  <span className="material-symbols-outlined text-white text-[14px]">
                    done_all
                  </span>
                  {formFeedback}
                </div>
              )}

              {/* Form submit button */}
              <button
                className="w-full bg-white text-[#2f3131] py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#12131a] hover:text-white border border-white transition-all cursor-pointer rounded-none disabled:bg-zinc-800 disabled:border-zinc-700 disabled:text-zinc-500"
                type="submit"
                disabled={isSending}
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Metadata grid coordinates and public keys info */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8 text-left select-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. UTC Clock */}
            <div className="terminal-border border-[#444748] p-4 bg-[#0d0e15] rounded-none">
              <span className="font-sans font-semibold text-[10px] text-[#8e9192] block mb-2 tracking-widest uppercase">
                LOCAL_TIME
              </span>
              <div className="font-mono text-xs text-white uppercase" id="clock">
                <JakartaClock />
              </div>
            </div>

            {/* 2. Coordinates indicator */}
            <div className="terminal-border border-[#444748] p-4 bg-[#0d0e15] rounded-none">
              <span className="font-sans font-semibold text-[10px] text-[#8e9192] block mb-2 tracking-widest uppercase">
                COORDINATES
              </span>
              <div className="font-mono text-xs text-white">6.2088° S, 106.8456° E</div>
            </div>

            {/* 3. Location indicator */}
            <div className="terminal-border border-[#444748] p-4 bg-[#0d0e15] rounded-none">
              <span className="font-sans font-semibold text-[10px] text-[#8e9192] block mb-2 tracking-widest uppercase">
                LOCATION
              </span>
              <div className="font-mono text-xs text-white">JAKARTA, IDN</div>
            </div>

            {/* 4. Availability indicator */}
            <div className="terminal-border border-[#444748] p-4 bg-[#0d0e15] rounded-none">
              <span className="font-sans font-semibold text-[10px] text-[#8e9192] block mb-2 tracking-widest uppercase">
                AVAILABILITY
              </span>
              <div className="font-mono text-sm text-white font-bold">[OPEN_FOR_COLLAB]</div>
            </div>
          </div>

          {/* Technical Signature Verified wrapper */}
          <div className="terminal-border border-[#444748] p-5 space-y-4 bg-[#1a1b22] rounded-none">
            <div className="flex items-center justify-between border-b border-[#444748] pb-2">
              <span className="font-sans font-extrabold text-[10px] uppercase text-[#8e9192] tracking-widest">
                Technical_Signature
              </span>
              <span className="material-symbols-outlined text-[18px] text-white">
                verified_user
              </span>
            </div>

            <code className="block font-mono text-[10px] md:text-xs text-white break-all leading-normal p-4 bg-[#12131a] border border-[#444748] rounded-none select-all">
              9F2E 4D5B 7A1C 8E3D 6B2F 0A4E 5D1C 9F3B 8A7E 6D4C
            </code>

            <button
              onClick={handleDownloadKey}
              className="font-sans font-bold text-[9px] text-[#c4c7c8] hover:text-white underline flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Download_Public_Key
            </button>
          </div>

          {/* Atmospheric Feed Image Preview */}
          <div className="relative w-full aspect-[4/3] md:aspect-video border border-[#444748] overflow-hidden rounded-none">
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay z-10 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 bg-[#12131a] px-2 py-1 z-20 font-mono text-[9px] font-bold border border-[#444748] rounded-none select-none">
              OFFICE_FEED
            </div>
            <img
              alt="Atmospheric Lab Workspace"
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-80"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoq-D5Vh5SRiTkDcqv02Vl7WBiobv0ugZsUK8q_ejqI-xEj7c_81jT0Y5uaAIHARVHS45vRqWtq0PiG-uAQ99UpNCnR1P9ar_T5GXFjAUCAnHgF4QGQT3imYFN7K5nZh_AGPu9IAaTf6YCch5W3ggU7sWgf6QPBHzqd0y3w1g5IPPgAYsRKZDv2X-naIy_wR7l5XIEj4ZnFUDjIWNGp_GseC1MY8_B5vKIiX4Qyh2oCYI2DK_03qcKRirnx4MiMGv7FxyJTAVQvSms"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
