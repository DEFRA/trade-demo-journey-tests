import { defineConfig, devices } from '@playwright/test';

const baseURL = `https://trade-demo-frontend.dev.cdp-int.defra.cloud`;

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined, // Adjust based on parallel execution needs (default: number of CPU cores, adjusted to 4 in CI for stability)
  reporter: process.env.CI ? [['junit', { outputFile: 'test-results/junit.xml' }], ['html'], ['allure-playwright']] : 'html',
  timeout: 5 * 60 * 1000, // Adjust based on E2E test duration (default: 30s, adjusted to 5m)
  expect: {
    timeout: 5 * 1000, // Adjust based on element appearance speed (default: 5s)
  },
  use: {
    baseURL,
    headless: true,
    trace: 'on-first-retry', // Adjust based on trace recording needs (default: 'off', adjusted to 'on-first-retry')
    screenshot: 'only-on-failure', // Adjust based on screenshot needs (default: 'off', adjusted to 'only-on-failure')
    video: 'off', // Adjust based on video recording needs (default: 'off')
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30 * 1000, // Adjust based on action response times (default: 30s)
    navigationTimeout: 30 * 1000, // Adjust based on page load times (default: 30s)
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
