# Teste Técnico - Recomendador de Produtos RD Station

Este repositório contém uma solução para o desafio técnico da RD Station, implementando um **recomendador de produtos** a partir das preferências e funcionalidades selecionadas pelo usuário.

O projeto está organizado em formato de **monorepo**, com backend (json-server) e frontend (React + Tailwind).

> 🔍 Para detalhes da implementação do frontend (arquitetura, hooks, serviços e testes), veja também:  
> [`frontend/README.md`](./frontend/README.md)

## 📂 Estrutura do projeto

```bash
.
├── backend/          # API fake com json-server (db.json com os produtos)
├── frontend/         # Aplicação React (formulário + recomendações)
├── install.sh        # Script de preparação do ambiente (fornecido no desafio)
├── package.json      # Scripts da raiz (monorepo)
├── yarn.lock / package-lock.json
└── README.md         # Este arquivo
```

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias principais:

- React.js
- Node.js 18.3+
- Tailwind CSS: Para estilização e layout responsivo
- json-server: Para simular um servidor RESTful com dados de produtos
- Jest + React Testing Library (testes unitários)

## Requisitos de Ambiente

- Node.js >= 18.3
- Yarn ou npm instalados

Este projeto requer Node.js versão 18.3 ou superior. Se você não tem essa versão instalada, siga as instruções abaixo para instalá-la usando `n` ou `nvm`.

#### Usando `n` (Node Version Manager):

1. Instale `n` globalmente (caso ainda não tenha): npm install -g n

2. Instale e use a versão 18.3 do Node.js: n 18.3

#### Usando `nvm` (Node Version Manager):

1. Instale `nvm` (caso ainda não tenha) seguindo as instruções em: https://github.com/nvm-sh/nvm

2. Instale e use a versão 18.3 do Node.js: nvm install 18.3 & nvm use 18.3

Após instalar a versão correta do Node.js, você pode prosseguir com a instalação das dependências do projeto e iniciar o desenvolvimento.

## Como Executar

1. Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
2. Instale as dependências: `yarn install`
3. Para instalar o projeto, execute o script `./install.sh` 
4. Inicie a aplicação: `yarn start`

Por padrão:
frontend: http://localhost:3000
backend (json-server): http://localhost:3001/products

### Scripts Disponíveis

- `start`: Inicia a aplicação React em modo de desenvolvimento.
- `start:frontend`: Inicia apenas a parte frontend da aplicação em modo de desenvolvimento.
- `start:backend`: Inicia apenas a parte backend da aplicação em modo de desenvolvimento.
- `dev`: Inicia simultaneamente a parte frontend e backend da aplicação em modo de desenvolvimento.

## Testes

Os testes estão centralizados no pacote frontend.
Principais pontos cobertos:

- Lógica de recomendação:
    `recommendation.service`: SingleProduct, MultipleProducts, empate, ausência de match, ausência de produtos.
- Hooks:
    `useProducts`: integração com `product.service`, montagem de products, preferences e features.
    `useRecommendations`: ponte entre React e recommendation.service
- Integração de formulário:
    `Form`: chamada de getRecommendations, normalização do retorno e envio das recomendações

Mais detalhes estão descritos em frontend/README.md

## Visão geral da solução

A solução foi pensada com foco em:

### Separação de responsabilidades
- Regras de negócio concentradas em recommendation.service
- Hooks finos (useProducts, useRecommendations, useForm) conectando dados e UI
- Componentes de apresentação organizados (Form, RecommendationList etc.)

### Legibilidade do código
- Nomes descritivos
- Fluxos simples e previsíveis
- Código preparado para extensão (novos produtos e critérios)

### Experiência de uso
- Layout em cards com Tailwind
- Header com logo e contexto do desafio
- Estado vazio guiando o usuário a preencher o formulário
- Cards de recomendação com:
nome do produto,
categoria,
preferências/funcionalidades,
link “Saiba mais” para a página oficial do produto RD Station

## Requisitos cumpridos

- ✅ Implementar a lógica de recomendação de produtos com base nas preferências do usuário.
- ✅ Utilizar React.js para o desenvolvimento do front-end.
- ✅ Consumir a API fornecida pelo json-server para obter os dados dos produtos.
- ✅ Seguir as boas práticas de desenvolvimento e organização de código.
- ✅ Implementar testes unitários para as funcionalidades desenvolvidas.

## Critérios de Aceite

1. Receber preferências e funcionalidades via formulário
- O formulário (Form) coleta selectedPreferences, selectedFeatures e selectedRecommendationType.

2. Retornar recomendações baseadas nas seleções
- recommendation.service.getRecommendations(formData, products) aplica a lógica de scoring com base nas seleções.

3. Modo SingleProduct
- Retorna um único produto (objeto) com maior score.
- Em caso de empate, o critério escolhido foi “retornar o último produto entre os empatados”.

4. Modo MultipleProducts
- Retorna uma lista de produtos que atendem às preferências/funcionalidades.
- Em caso de nenhum match, retorna [].

5. Critério de empate
- Em caso de empate de score, o serviço seleciona o último produto válido, atendendo ao critério definido no enunciado.

6. Diferentes tipos de preferências/funcionalidades
- O serviço trabalha com arrays de strings (preferências e features) e calcula o score com pesos diferentes (preferências > features).

7. Modularidade e extensibilidade
- recommendation.service é um módulo independente, facilmente extensível para:
novos produtos, novos critérios de pontuação, novos tipos de recomendação.

## Autor

Desenvolvido por [Elane Alencar](https://linkedin.com/in/elanealencar/)

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
