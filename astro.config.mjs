// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://cocobokostudios.com',
  
  integrations: [
    react(), 
    sitemap(),
    mdx(),
    tailwind()
  ],
  vite: {
    plugins: [
      {
        name: 'copy-blog-images-dev',
        apply: 'serve',
        async configureServer(server) {
          const fs = await import('fs/promises');
          const path = await import('path');
          const glob = (await import('glob')).glob;
          const srcDir = path.resolve('src/content/blog');
          const outDir = path.resolve('public/images/blog');
          const files = await glob('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: srcDir });
          for (const file of files) {
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(outDir, file);
            await fs.mkdir(path.dirname(destFile), { recursive: true });
            await fs.copyFile(srcFile, destFile);
          }
          console.log('[copy-blog-images] Copied images for dev');
        }
      },
      {
        name: 'copy-blog-images-build',
        apply: 'build',
        async closeBundle() {
          const fs = await import('fs/promises');
          const path = await import('path');
          const glob = (await import('glob')).glob;
          const srcDir = path.resolve('src/content/blog');
          const outDir = path.resolve('dist/images/blog');
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