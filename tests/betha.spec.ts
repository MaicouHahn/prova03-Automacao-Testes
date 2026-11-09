import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Betha Sistemas - testes de tela', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('CT01 - página inicial carrega com título, logo e menu', async ({ page }) => {
    await expect(page).toHaveTitle(/Betha Sistemas/);
    await expect(home.logo).toBeVisible();
    await expect(home.mainHeading).toHaveText('Especialista em software para gestão pública');
    await expect(home.menu.getByRole('link', { name: 'Soluções', exact: true })).toBeVisible();
    await expect(home.menu.getByRole('link', { name: 'Contato', exact: true })).toBeVisible();
  });

  test('CT02 - menu "Soluções" abre a página de soluções', async ({ page }) => {
    await home.openMenuItem('Soluções');

    await expect(page).toHaveURL(/\/solucoes$/);
    await expect(page).toHaveTitle(/Soluções/);
    await expect(page.getByRole('heading', { level: 1, name: 'SOLUÇÕES BETHA' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quem usa as nossas soluções?' })).toBeVisible();
  });

  test('CT03 - busca por "Saúde" exibe a página de resultados', async ({ page }) => {
    await home.search('Saúde');

    await expect(page).toHaveURL(/\/busca\/Sa%C3%BAde/);
    await expect(page.getByRole('heading', { level: 1, name: 'Resultado da busca' })).toBeVisible();
    await expect(page.getByText(/Sua busca por "Saúde" encontrou \d+ resultados/)).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: 'Saúde' }).first()).toBeVisible();
  });
});
