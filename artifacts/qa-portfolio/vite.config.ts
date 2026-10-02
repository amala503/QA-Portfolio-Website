import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import { generateCvPdf } from './generate-cv';

try {
  const uploadsDir = 'C:/Users/amala/.gemini/antigravity-ide/brain/a1b1699d-1b34-4568-a939-0ece53f9bbe5/.user_uploaded';
  const destDir = path.resolve(import.meta.dirname, 'public');
  const msibSrc = path.join(uploadsDir, 'media_1790819747544.jpg');
  const officeSrc = path.join(uploadsDir, 'media_1790819747586.jpg');
  const gftSrc = path.join(uploadsDir, 'media_1790824766909.jpg');

  if (fs.existsSync(msibSrc)) {
    fs.copyFileSync(msibSrc, path.join(destDir, 'certificate-msib-batch-6.jpg'));
  }
  if (fs.existsSync(officeSrc)) {
    fs.copyFileSync(officeSrc, path.join(destDir, 'certificate-microsoft-office.jpg'));
  }
  if (fs.existsSync(gftSrc)) {
    fs.copyFileSync(gftSrc, path.join(destDir, 'certificate-gft.jpg'));
  }

  const currentUploadsDir = 'C:/Users/amala/.gemini/antigravity-ide/brain/016ef962-b7f3-4d2d-9177-1ffd1fb5066b/.user_uploaded';
  const partnerhubKatalon = path.join(currentUploadsDir, 'media_1790842654148.png');
  const partnerhubBugReport = path.join(currentUploadsDir, 'media_1790842492183.png');
  const partnerhubUat = path.join(currentUploadsDir, 'media_1790842474412.png');

  if (fs.existsSync(partnerhubKatalon)) {
    fs.copyFileSync(partnerhubKatalon, path.join(destDir, 'partnerhub-katalon.png'));
  }
  if (fs.existsSync(partnerhubBugReport)) {
    fs.copyFileSync(partnerhubBugReport, path.join(destDir, 'partnerhub-bug-report.png'));
  }
  if (fs.existsSync(partnerhubUat)) {
    fs.copyFileSync(partnerhubUat, path.join(destDir, 'partnerhub-uat.png'));
  }

  const uploadsDirConvo = 'C:/Users/amala/.gemini/antigravity-ide/brain/8363a8d7-58a3-4db5-aa79-7c32c858259c/.user_uploaded';
  const marvelClickup = path.join(uploadsDirConvo, 'media_1790859551279.png');
  const marvelBugReport = path.join(uploadsDirConvo, 'media_1790859665841.png');
  const marvelUat = path.join(uploadsDirConvo, 'media_1790927034097.png');
  const marvelKatalon = path.join(uploadsDirConvo, 'media_1790927676881.png');
  const tsatgoApiPostman = path.join(uploadsDirConvo, 'media_1790910340869.png');

  if (fs.existsSync(marvelClickup)) {
    fs.copyFileSync(marvelClickup, path.join(destDir, 'marvel-clickup.png'));
  }
  if (fs.existsSync(marvelBugReport)) {
    fs.copyFileSync(marvelBugReport, path.join(destDir, 'marvel-bug-report.png'));
  }
  if (fs.existsSync(marvelUat)) {
    fs.copyFileSync(marvelUat, path.join(destDir, 'marvel-uat.png'));
  }
  if (fs.existsSync(marvelKatalon)) {
    fs.copyFileSync(marvelKatalon, path.join(destDir, 'marvel-katalon.png'));
  }
  if (fs.existsSync(tsatgoApiPostman)) {
    fs.copyFileSync(tsatgoApiPostman, path.join(destDir, 'tsatgo-api-postman.png'));
  }

  const assetCv = path.resolve(import.meta.dirname, 'assets', 'CV_Amala Zakira - QA.pdf');
  if (fs.existsSync(assetCv)) {
    // Copy the original docx format
    fs.copyFileSync(assetCv, path.join(destDir, 'CV_Amala Zakira - QA.docx'));
  }

  // Generate genuine, valid PDF CVs for both file names
  generateCvPdf(destDir);
} catch (err) {
  console.error('Failed to copy uploaded assets:', err);
}

const rawPort = process.env.PORT || '3000';
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@portfolio-assets': path.resolve(import.meta.dirname, 'assets'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
