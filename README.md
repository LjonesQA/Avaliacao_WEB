## AutomacaoWEB

Projeto de automação E2E usando Cypress.

Este repositório contém testes Cypress para o site https://automationexercise.com e está configurado para gerar relatórios mochawesome e executar em um pipeline GitHub Actions.

## Pré-requisitos

- Node.js 18+ (recomendado)
- npm

## Instalação

No PowerShell, na raiz do projeto:

```powershell
npm ci
# ou, se você não usar lockfile
npm install
```

> Observação: o projeto já declara `@faker-js/faker` em `devDependencies`.

## Scripts npm úteis

- `npm run cy:run:report` — roda o Cypress com o reporter mochawesome e salva jsons em `cypress/reports`.
- `npm run merge:report` — mescla os JSONs em `cypress/reports/mochawesome.json`.
- `npm run generate:report` — gera o relatório HTML final a partir do JSON mesclado.
- `npm run test:ci` — executa os três passos acima em sequência (usado pelo CI).

## Como rodar os testes localmente

1. Instale dependências (`npm ci`).
2. Rode os testes e gere o relatório:

```powershell
npm run test:ci
```

Os relatórios gerados ficarão em `cypress/reports`. O HTML final normalmente será `cypress/reports/mochawesome.html` (dependendo da versão e opções do generator).

## Uso do Faker

O projeto já possui `@faker-js/faker` nas devDependencies. Se necessário instalar manualmente:

```powershell
npm install @faker-js/faker --save-dev
```

Exemplo de uso em um teste Cypress (arquivo `.cy.js`):

```javascript
import { faker } from '@faker-js/faker';

describe('Exemplo usando faker', () => {
  it('gera dados aleatórios', () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();

    cy.log('Nome:', nome);
    cy.log('Email:', email);
    // cy.get('input[name="name"]').type(nome)
  });
});
```

API comum: `faker.person`, `faker.internet`, `faker.address`, etc.

## CI (GitHub Actions)

O workflow criado em `.github/workflows/ci.yml` faz:

1. Checkout do repositório
2. Setup Node.js 18
3. `npm ci`
4. `npm run test:ci` (executa Cypress com `mochawesome`, faz merge e gera o HTML)
5. Faz upload da pasta `cypress/reports` como artefato chamado `mochawesome-reports`.

Você poderá baixar o relatório HTML a partir da página do run na aba `Artifacts`.

## Onde encontrar os relatórios

- Localmente: `cypress/reports`
- No GitHub Actions: aba `Artifacts` do run (artifact name: `mochawesome-reports`).

## Dicas e troubleshooting

- Se faltar pacotes: rode `npm ci` ou `npm install`.
- Se o CI falhar por timeout, valide se os testes dependem de recursos externos ou aumente timeouts.
- Para acelerar CI: adicionar cache de npm no workflow.

## Próximos passos sugeridos

- Adicionar cache de dependências no workflow para acelerar builds.
- Incluir screenshots e vídeos como artefatos (Cypress já pode gravar com `cypress run --record` ou configurando `video`/`screenshotOnRunFailure`).
- Publicar relatórios em um servidor (S3, Pages) automaticamente.

---

Se quiser, eu posso:

- Executar `npm ci` e `npm run test:ci` aqui para validar (vai rodar testes e levar tempo), ou
- Ajustar o workflow para cache, matrix ou runner Windows.
