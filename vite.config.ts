import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

export default defineConfig(async ({ mode }) => {
  // ✅ Load environment variables from .env files
  const env = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...env };

  // ✅ Base plugin list
  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  // ✅ Dynamically import Replit plugins if in development and REPL_ID is set
  if (mode !== 'production' && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import('@replit/vite-plugin-cartographer');
    const { devBanner } = await import('@replit/vite-plugin-dev-banner');
    plugins.push(cartographer(), devBanner());
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client', 'src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(__dirname, 'attached_assets'),
      },
    },
    root: path.resolve(__dirname, 'client'),
     build: {
    outDir: 'dist',  // Ensure this is correctly set
  },
    server: {
      fs: {
        strict: true,
        deny: ['**/.*'],
      },
    },
  };
});
