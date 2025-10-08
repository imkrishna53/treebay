import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

export default defineConfig(async ({ mode }) => {
  // ✅ Load env vars from the *project root*, even though Vite root is 'client/'
  const env = loadEnv(mode, __dirname);

  // Optional: log env to debug
  console.log('Loaded ENV:', env.VITE_API_BASE_URL);

  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  // Dynamically import Replit plugins if in development and REPL_ID is set
  if (mode !== 'production' && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import('@replit/vite-plugin-cartographer');
    const { devBanner } = await import('@replit/vite-plugin-dev-banner');
    plugins.push(cartographer(), devBanner());
  }

  return {
    root: path.resolve(__dirname, 'client'),

    // ✅ Manually define the env variables to make them available in frontend
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
    },

    plugins: plugins,

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client', 'src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(__dirname, 'attached_assets'),
      },
    },

    build: {
      outDir: path.resolve(__dirname, 'dist'),
    },

    server: {
      fs: {
        strict: true,
        deny: ['**/.*'],
      },
    },
  };
});
