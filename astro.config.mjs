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

  // R4 magazine direction: Cormorant Garamond Italic (Latin wordmark only),
  // Old Standard TT Italic (Greek display — overlay title + spread titles),
  // Crimson Pro (cover line + body italic, Greek subset), IBM Plex Mono
  // (masthead, colophon, page numbers — Greek subset).
  // Fraunces + Inter retained for the still-untouched Footer (Phase 1 scope).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-wordmark',
      weights: [500],
      styles: ['italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Old Standard TT',
      cssVariable: '--font-greek-display',
      weights: [400],
      styles: ['italic'],
      subsets: ['latin', 'greek'],
    },
    {
      provider: fontProviders.google(),
      name: 'Crimson Pro',
      cssVariable: '--font-italic',
      weights: [400, 500],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'greek'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'greek'],
    },
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
