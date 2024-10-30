import { defineConfig, UserConfig, InlineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

import manifest from './manifest.json';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  test: { globals: true, assetsInclude: ['__test__/*.spec.ts?(x)'] },
  plugins: [
    react(),
    pwa({
      strategies: 'injectManifest',
      srcDir: '',
      filename: 'service-worker.js',
      manifest,
    }),
  ],
} as VitestConfigExport);
