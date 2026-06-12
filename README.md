# ZYEKH_ABDUL — Personal Portfolio

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node-%3E%3D18-brightgreen)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)

Terminal-themed personal portfolio built with React, Vite and TypeScript.

## Overview

This repository contains a single-page React portfolio focused on security engineering and system tooling. The site is built with Vite and styled with Tailwind CSS. It includes an interactive "terminal" view, portfolio archive, and contact UI.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Optional: Express (listed in package.json but not required for frontend deploy)

## Quick start (development)

Install dependencies:

```bash
npm install
```

Run dev server (Vite):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Notes:
- On Windows the `clean` script (`rm -rf dist server.js`) may fail; use `npx rimraf dist server.js` or update `package.json` to use `rimraf` for cross-platform removal.

## Deploy

This is a static frontend app. Deploy options:
- Vercel — connect the repo and set the build command to `npm run build` and output directory to `dist`.
- Netlify — same build command and publish directory `dist`.
- Any static host that serves files from the `dist` folder.

## Where to customize user data (replace with your real info)

Update these files to replace placeholders with your own data (names, links, images):

- About page profile photo and certificates: [src/components/AboutView.tsx](src/components/AboutView.tsx)
   - Profile image path: `/src/assets/images/gumball_profile_1781018320851.png` — replace with your photo or place your image under `src/assets/images/` and update the `src` value.
   - `certifications` array: each item has `img` (image URL) and `title` — replace with your certificate images or use local assets.

- Portfolio repos and project screenshots: [src/components/ArchiveView.tsx](src/components/ArchiveView.tsx)
   - `repositories` array contains `name`, `url`, `screenshot`, and `technologies` — update `url` to your GitHub repos and `screenshot` to local images if desired.

- Terminal command text and quick links (static strings): [src/components/TerminalView.tsx](src/components/TerminalView.tsx)
   - Commands like `archive`, `about`, `contact` contain hardcoded URLs and PGP/coordinates — modify or remove sensitive content.

- Footer social links: [src/components/Footer.tsx](src/components/Footer.tsx)
   - Replace the `href` values for GitHub and LinkedIn with your profiles.

- Hero/name and subtitle: [src/components/HomeView.tsx](src/components/HomeView.tsx) and [src/components/AboutView.tsx](src/components/AboutView.tsx)
   - Replace displayed full name, roles, and short bio.

- Static images folder: `src/assets/images/`
   - Place local assets (profile photo, project screenshots, certificate images) here and reference them via relative paths.

## Security & content notes

- The site contains references to security research and repository names that may appear sensitive (e.g., research into persistence/backdoors). If this content might be misinterpreted, revise wording to clarify "research / responsible disclosure" or remove sensitive project titles.
- If you enable a real contact form (currently simulated in `ContactView.tsx`), implement a secure backend endpoint with input validation, rate limiting, and spam protection.

## Recommended small improvements before hosting

- Replace external image hosting with local assets in `src/assets/images/` for reliability.
- Remove unused dependencies (e.g., `express` if unused) or add a simple server implementation if you plan to handle form submissions.
- Add linting/formatting (ESLint + Prettier) and a simple CI workflow to run `npm run build` on push.

## License

MIT License © 2024 Zyekh Abdul Qadir Jailani. See [LICENSE](LICENSE) file for details.

---

If you want, I can automatically:
- update `Footer` links to your GitHub/LinkedIn,
- replace the profile photo with a provided file, and
- move certificate images into `src/assets/images/` and update references.
Send the URLs or image files to proceed.
