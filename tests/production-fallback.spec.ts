import { test, expect } from '@playwright/test';

test('production HTML uses the first-party newsletter API without MailerLite browser scripts', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();

  const html = await response.text();

  expect(html).toContain('data-newsletter-form');
  expect(html).toContain('action="/api/newsletter-subscribe"');
  expect(html).not.toContain('assets.mailerlite.com');
  expect(html).not.toContain('data-mailerlite-embed');

  expect(html).toContain("const ANALYTICS_URLS = [");
  expect(html).toContain("'/vendor/simple-analytics/latest.js'");
  expect(html).toContain("'https://scripts.simpleanalyticscdn.com/latest.js'");
  expect(html).toContain("await fetch(scriptUrl, { mode: 'no-cors'");
});
