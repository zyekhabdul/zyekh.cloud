# Project Maintenance & Handoff Guide

This file explains what future maintainers (humans or AI agents) must know to safely maintain, debug, and deploy this project. Keep this repo's `src/` as the single source of truth — never edit built files in `assets/` directly.

**Quick summary**
- Dev server: `npm run dev` (Vite). Default local URL: `http://localhost:5173/`.
- Build: `npm run build` → production bundles in `dist/` (or `assets/` in this repo layout).
- Preview: `npm run preview` (or `npx vite preview`).
- Important branches:
  - `main` — primary development branch.
  - `gh-pages` — production site history (do not edit built assets manually).
  - `backup-before-recovery-7c25e29` — backup snapshot (kept as safety).
  - `restore-to-53a19ab` — local restore branch created during recovery.

---

## Files & locations (where to edit)
- Source entry: `src/main.tsx` — app bootstrap for development.
- App components: `src/components/` — canonical components (may be locked on Windows due to ACL issues). If locked, a safe fallback exists at `src/components_fixed/` used for development and quick testing.
- Terminal component (primary): `src/components/TerminalView.tsx` (preferred). Fallback path: `src/components_fixed/TerminalView.tsx`.
- ASCII art used by terminal: `src/assets/ascii-art.txt` (import with `?raw`).
- Terminal styles: `src/styles/terminal.css` (and `src/styles/terminal-fixed.css` used by fallback).
- Favicon / icons: `public/` and `src/assets/images/favicon/` — put favicons and browserconfig/manifest files in `public/` for predictable deployment.
- Static JSON used by the site (pre-generated during CI): `github-stats.json`, `github-repos.json` (location: root or `public/` depending on CI config). Do NOT embed PATs in client code — use `VITE_GITHUB_TOKEN` and CI to prefetch.

---

## How to run locally (clean start)
1. Restore package files if missing: `git restore --source backup-before-recovery-7c25e29 -- package.json package-lock.json` (only if needed).
2. Install deps: `npm install`.
3. Start dev: `npm run dev`.
4. Open `http://localhost:5173/`.

If ports are in use, Vite will try other ports. Use `npx kill-port 5173` to free a port.

---

## Common maintenance tasks
- Replacing neofetch ASCII: update `src/assets/ascii-art.txt` and modify `src/components/TerminalView.tsx` so the ascii is shown only when `neofetch` is run. Import the file with `import ascii from '../assets/ascii-art.txt?raw'`.
- Avoid editing files in `assets/` or other built bundles. Make changes in `src/` and run `npm run build` to regenerate production assets.
- If you need to revert to a stable state, restore from `backup-before-recovery-7c25e29` or checkout commit `53a19ab` (example):

```bash
git fetch --all
git checkout backup-before-recovery-7c25e29
```

---

## Windows permission (EPERM) recovery
If Git cannot stat `src/components` or you get EPERM errors on Windows, run PowerShell as Administrator and execute:

```powershell
takeown /F "C:\path\to\repo\src\components" /R /D Y
icacls "C:\path\to\repo\src\components" /reset /T
icacls "C:\path\to\repo\src\components" /grant "%USERNAME%":F /T
```

If you do not want to change ACLs, use the `src/components_fixed/` fallback to continue development.

---

## CI / Deployment notes
- Do not store `VITE_GITHUB_TOKEN` in client code. Configure it as a secret in your CI provider and use a CI step to fetch and pre-generate `github-stats.json` and `github-repos.json` before publishing.
- To publish to GitHub Pages with a custom domain (`zyekh.cloud`):
  - Add a `CNAME` file in `public/` containing `zyekh.cloud`.
  - Ensure assets use relative paths (no absolute URLs) so the site works from `gh-pages` root.
  - Build artifacts using `npm run build` in CI, then deploy the contents of `dist/` (or generated `assets/`) to `gh-pages` branch.

---

## For the next AI agent or maintainer (checklist)
- Ensure tests (if added) and `npm run build` complete without parse errors — esbuild/Vite will fail dev server if any referenced JS has syntax errors.
- Verify `index.html` points to source entry (`/src/main.tsx`) during development and to built bundle in production.
- When updating UI assets (icons, favicon), place them in `public/` and reference in HTML head or manifest.
- If you see a black screen on deploy: check `index.html` for accidental edits to built bundle references and revert to source-based entry for local debugging.
- If changing branches: create a safety branch first:

```bash
git branch backup-before-some-change
git push origin backup-before-some-change
```

---

## Useful commands quick reference
- Start dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Commit and push current safe state:

```bash
git add -A
git commit -m "chore: snapshot before risky change"
git push origin HEAD:backup-before-my-change
```

- Restore files from a commit (example `53a19ab`):

```bash
git restore --source 53a19ab --worktree -- <file1> <file2>
```

---

If anything in this guide is unclear or you want me to generate a short script (PowerShell/Bash) to automate common recovery steps, tell me what OS you will use and I will add it.

File location: root `MAINTENANCE.md`.
