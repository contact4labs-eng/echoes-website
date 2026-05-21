// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://echoesbistrot.gr',

  i18n: {
    defaultLocale: 'el',
    locales: ['el', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'el',
        locales: { el: 'el-GR', en: 'en-US' },
      },
    }),
  ],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-heading',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'greek'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'greek'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
