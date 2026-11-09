# Playwright + GitHub Actions + SonarCloud

Testes de tela (E2E) com [Playwright](https://playwright.dev) no site https://www.betha.com.br.

## Casos de teste
- **CT01** – Página inicial carrega com título, logo, título principal e menu
- **CT02** – Menu "Soluções" abre a página de soluções
- **CT03** – Busca por "Saúde" exibe a página de resultados

## Rodar localmente
```bash
npm ci
npx playwright install chromium
npx playwright test
npx playwright show-report
```

## Pipeline
`.github/workflows/ci.yml` roda os testes a cada push e, se passarem, faz a análise no SonarCloud.
