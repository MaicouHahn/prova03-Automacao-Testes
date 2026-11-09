import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object da página inicial da Betha.
 * https://playwright.dev/docs/pom
 */
export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly mainHeading: Locator;
  readonly menu: Locator;
  readonly searchToggle: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const header = page.getByRole('banner');
    this.logo = header.getByRole('img', { name: 'Betha Sistemas' });
    this.mainHeading = page.getByRole('heading', { level: 1 });
    this.menu = header.getByRole('navigation');
    this.searchToggle = header.getByRole('button', { name: 'Realize uma busca' });
    this.searchInput = header.getByRole('textbox', { name: 'O que você procura?' });
    this.searchButton = header.getByRole('button', { name: 'Buscar', exact: true });
  }

  async goto() {
    await this.page.goto('/');
  }

  async openMenuItem(name: string) {
    await this.menu.getByRole('link', { name, exact: true }).click();
  }

  async search(term: string) {
    await this.searchToggle.click();
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}
