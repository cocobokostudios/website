import { test, expect } from '@playwright/test';

test('newsletter form validates email addresses before submitting', async ({ page }) => {
  await page.goto('/');

  const email = page.locator('[data-newsletter-email]');
  const submit = page.locator('[data-newsletter-submit]');
  const message = page.locator('[data-newsletter-message]');

  await submit.click();
  await expect(message).toContainText('Please enter your email address.');
  await expect(email).toBeFocused();

  await email.fill('not-an-email');
  await submit.click();
  await expect(message).toContainText('Please enter a valid email address.');
});

test('newsletter form shows success and friendly API failure messages', async ({ page }) => {
  await page.route('**/api/newsletter-subscribe', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'Thanks! Please check your inbox to confirm your subscription.',
      }),
    });
  });

  await page.goto('/');
  const email = page.locator('[data-newsletter-email]');
  const submit = page.locator('[data-newsletter-submit]');
  const message = page.locator('[data-newsletter-message]');

  await email.fill('fan@example.com');
  await submit.click();
  await expect(message).toContainText('Thanks! Please check your inbox');

  await page.unroute('**/api/newsletter-subscribe');
  await page.route('**/api/newsletter-subscribe', async (route) => {
    await route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'system_error' }),
    });
  });

  await email.fill('fan@example.com');
  await submit.click();
  await expect(message).toContainText('Sorry, we could not subscribe you right now.');
});
