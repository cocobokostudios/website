import { test, expect } from '@playwright/test';

const routes = ['/', '/privacy-policy/', '/code-of-conduct/'];

for (const route of routes) {
  test(`${route} returns a complete page`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();

    const html = await response.text();
    expect(html).toContain('<nav aria-label="Primary"');
    expect(html).toContain('<main');
    expect(html).toContain('<footer');
    expect(html).toContain('src="/assets/alpine.js"');
    expect(html).toContain('href="/assets/site.css"');
  });
}

test('production HTML ships third-party fallback behaviour for analytics and MailerLite', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();

  const html = await response.text();

  expect(html).toContain("const MAILERLITE_SCRIPT_URLS = [");
  expect(html).toContain("const MAILERLITE_STUB_MARKER = '__MAILERLITE_VENDOR_STUB__';");
  expect(html).toContain('delete window[MAILERLITE_STUB_MARKER];');
  expect(html).toContain('/vendor/mailerlite/universal.js');
  expect(html).toContain('https://assets.mailerlite.com/js/universal.js');
  expect(html).toContain('mailerlite:unavailable');
  expect(html).toContain('data-mailerlite-fallback');
  expect(html).toContain('Newsletter is coming soon!');
  expect(html).toContain('https://bsky.app/profile/cocobokostudios.bsky.social');
  expect(html).toContain('https://www.youtube.com/@cocobokostudios');
  expect(html).toContain('target="_blank"');

  expect(html).toContain("const ANALYTICS_URLS = [");
  expect(html).toContain("'/vendor/simple-analytics/latest.js'");
  expect(html).toContain("'https://scripts.simpleanalyticscdn.com/latest.js'");
  expect(html).toContain("await fetch(scriptUrl, { mode: 'no-cors'");
});

test('MailerLite is only loaded on the page that contains its form', async ({ request }) => {
  for (const route of ['/privacy-policy/', '/code-of-conduct/']) {
    const response = await request.get(route);
    const html = await response.text();

    expect(html).not.toContain('const MAILERLITE_SCRIPT_URLS = [');
    expect(html).not.toContain('data-mailerlite-root');
    expect(html).toContain('const ANALYTICS_URLS = [');
  }
});

test('compiled assets and generated images are available', async ({ request }) => {
  for (const asset of [
    '/assets/site.css',
    '/assets/alpine.js',
    '/images/generated/agent_website_banner-640.webp',
    '/images/generated/agent_website_banner-960.webp',
    '/images/generated/studio-desk-480.webp',
    '/images/generated/studio-desk-960.webp',
    '/images/generated/studio-desk-1440.webp',
  ]) {
    const response = await request.get(asset);
    expect(response.ok(), `${asset} should be available`).toBeTruthy();
  }
});

test('primary navigation links resolve', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  for (const href of ['/', '/#get-notified', '/#about', '/#games']) {
    expect(html).toContain(`href="${href}"`);
  }
});
