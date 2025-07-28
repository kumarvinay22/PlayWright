import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './features', // Ensure this path is correct
  retries: 2,
  timeout: 60000,
  workers: process.env.CI ? 2 : undefined, // Use 2 workers in CI, otherwise default to available CPUs
  reporter: [['html', { outputFolder: './reports/playwright-html', open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

