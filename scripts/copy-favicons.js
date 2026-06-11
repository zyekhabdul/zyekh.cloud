import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'src', 'assets', 'images', 'favicon');
const destDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(srcDir)) {
  console.log('No favicon source folder found at', srcDir);
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir);
for (const file of files) {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  try {
    fs.copyFileSync(srcFile, destFile);
    console.log('Copied', file);
  } catch (err) {
    console.error('Failed to copy', file, err);
  }
}

console.log('Favicons copied to', destDir);
