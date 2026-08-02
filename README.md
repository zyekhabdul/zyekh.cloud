# 🎨 ZYEKH ABDUL — Terminal & Security Portfolio (`zyekh.cloud`)

<p align="center">
  <a href="https://github.com/zyekhabdul/zyekh.cloud/actions/workflows/ci.yml">
    <img src="https://github.com/zyekhabdul/zyekh.cloud/actions/workflows/ci.yml/badge.svg" alt="CI Build Status">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black" alt="React 19">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript 5.8">
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-6.2-646CFF.svg?logo=vite&logoColor=white" alt="Vite 6.2">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-CSS-38BDF8.svg?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  </a>
</p>

A terminal-themed, interactive single-page portfolio application focused on Digital Forensics & Incident Response (DFIR), Linux Kernel Security, and Full-Stack Web Development. Built with **React 19**, **Vite 6**, **TypeScript 5**, and **Tailwind CSS**.

---

## 🏗️ Architecture & Component Overview

```mermaid
graph TD
    A["Single Page App Entry (index.html)"] --> B["React App Root (src/App.tsx)"]
    
    B --> C["Interactive Terminal View (src/components/TerminalView.tsx)"]
    B --> D["Portfolio Archive Grid (src/components/ArchiveView.tsx)"]
    B --> E["About & Certificates Showcase (src/components/AboutView.tsx)"]
    B --> F["Contact Form UI (src/components/ContactView.tsx)"]
    
    C --> G["Command Parser: archive, about, contact, help, clear"]
    D --> H["GitHub API & Open-Source Projects Synchronization"]
```

---

## 🚀 Key Features

- 🖥️ **Interactive Cyber Terminal**: Custom command-line interface supporting shell-like navigation (`archive`, `about`, `contact`, `help`, `clear`, `cat`).
- 📁 **Repository Archive Showcase**: Grid view displaying top open-source projects, badges, tech tags, and direct GitHub links.
- 🎨 **Modern Dark Mode Aesthetic**: Sleek, high-contrast dark theme with glassmorphism and subtle glowing micro-animations.
- ⚡ **Lightning Fast Vite Build**: Zero-delay HMR and optimized static production bundle.

---

## 💻 Development & Quick Start

```bash
# Clone repository
git clone https://github.com/zyekhabdul/zyekh.cloud.git
cd zyekh.cloud

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production distribution (dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 License

MIT License © 2026 Zyekh Abdul Qadir Jailani. Designed for Security Engineers & Developers.
