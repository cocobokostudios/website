import { test, expect } from '@playwright/test';
import fs from 'fs';

const sitemapContent = fs.readFileSync('dist/sitemap-0.xml', 'utf-8');
const urls = Array.from(sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);

// Run tests serially to avoid overwhelming the server
test.describe('sitemap pages', () => {
  test.describe.configure({ mode: 'serial' });

  for (const url of urls) {
    test(`no broken links or images on ${url}`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.ok(), `Failed to load page ${url}`).toBeTruthy();

      const origin = new URL(url).origin;

      // Check for broken links
      const links = await page.$$eval('a[href]', anchors => anchors.map(a => (a as HTMLAnchorElement).href));
      for (const link of links) {
        if (!link || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('javascript:') || link.startsWith('#')) continue;
        const target = new URL(link, url);
        if (target.origin !== origin) continue;
        const res = await page.request.get(target.href);
        expect(res.ok(), `Broken link: ${target.href} on page ${url}`).toBeTruthy();
      }

      // Check for broken images
      const images = await page.$$eval('img[src]', imgs => imgs.map(img => (img as HTMLImageElement).src));
      for (const img of images) {
        if (!img || img.startsWith('data:')) continue;
        const target = new URL(img, url);
        if (target.origin !== origin) continue;
        const res = await page.request.get(target.href);
        expect(res.ok(), `Broken image: ${target.href} on page ${url}`).toBeTruthy();
      }
    });
  }
});
