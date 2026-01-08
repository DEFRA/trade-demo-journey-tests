import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  testMatch: '**/*.ts',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,

  reporter: [
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
      },
    ],
  ],
  use: {
    baseURL: 'https://trade-demo-frontend.dev.cdp-int.defra.cloud',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  timeout: 600000,
  expect: {
    timeout: 30000,
  },
});
