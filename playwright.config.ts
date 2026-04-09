import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321',
    port: 4321,
    reuseExistingServer: false,
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
  },
});
