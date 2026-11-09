# Playwright + GitHub Actions + SonarCloud

Testes de tela (E2E) com [Playwright](https://playwright.dev) no site de testes https://www.saucedemo.com.

## Casos de teste
- **CT01** – Login válido leva para a tela de produtos
- **CT02** – Login com senha inválida mostra mensagem de erro
- **CT03** – Adicionar produto ao carrinho atualiza contador e carrinho

## Rodar localmente
```bash
npm ci
npx playwright install chromium
npx playwright test
npx playwright show-report
```

## Pipeline
`.github/workflows/ci.yml` roda os testes a cada push e, se passarem, faz a análise no SonarCloud.
