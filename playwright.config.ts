import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright.
 * Documentação: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Falha o build no CI se algum test.only ficar esquecido no código
  forbidOnly: !!process.env.CI,
  // Re-tenta testes que falharem apenas no CI
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    // O site usa o atributo data-test em vez de data-testid
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
