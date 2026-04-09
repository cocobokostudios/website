import { test, expect } from '@playwright/test';

test('production HTML ships third-party fallback behaviour for analytics and MailerLite', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();

  const html = await response.text();

  expect(html).toContain("const MAILERLITE_SCRIPT_URL = 'https://assets.mailerlite.com/js/universal.js';");
  expect(html).toContain('mailerlite:unavailable');
  expect(html).toContain('data-mailerlite-fallback');
  expect(html).toContain('Join Discord');

  expect(html).toContain("const ANALYTICS_URL = 'https://scripts.simpleanalyticscdn.com/latest.js';");
  expect(html).toContain("await fetch(ANALYTICS_URL, { mode: 'no-cors'");
});
