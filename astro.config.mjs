// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://jolly-pond-009156110.6.azurestaticapps.net',
  base: '/',
  trailingSlash: 'always',
  
  integrations: [
    react(), 
    sitemap(),
    mdx()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});