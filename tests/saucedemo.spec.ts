import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const SENHA_VALIDA = 'secret_sauce';

test.describe('Sauce Demo - testes de tela', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('CT01 - login com credenciais válidas exibe a tela de produtos', async ({ page }) => {
    await loginPage.login('standard_user', SENHA_VALIDA);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('CT02 - login com senha inválida exibe mensagem de erro', async ({ page }) => {
    await loginPage.login('standard_user', 'senha_errada');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('CT03 - adicionar produto ao carrinho atualiza o contador e o carrinho', async ({ page }) => {
    await loginPage.login('standard_user', SENHA_VALIDA);

    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  });
});
