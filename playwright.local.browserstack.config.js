import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.ts';

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: process.env.BASE_URL || 'https://trade-demo-frontend.dev.cdp-int.defra.cloud',
  },
});
