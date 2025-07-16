// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://jolly-pond-009156110.6.azurestaticapps.net',
  
  integrations: [
    react(), 
    sitemap(),
    mdx(),
    tailwind()
  ],
  vite: {
    plugins: [
      {
        name: 'copy-blog-images',
        apply: 'build',
        async closeBundle() {
          const fs = await import('fs/promises');
          const path = await import('path');
          const glob = (await import('glob')).glob;
          const srcDir = path.resolve('src/content/blog');
          const outDir = path.resolve('dist/blog');
          const files = await glob('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: srcDir });
          for (const file of files) {
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(outDir, file);
            await fs.mkdir(path.dirname(destFile), { recursive: true });
            await fs.copyFile(srcFile, destFile);
          }
        }
      }
    ]
  }
});