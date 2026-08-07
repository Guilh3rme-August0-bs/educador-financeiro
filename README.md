# Educador Financeiro

![React](https://img.shields.io/badge/React-%5E18-blue)
![Vite](https://img.shields.io/badge/Vite-%5E5-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-blue)
![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-yellowgreen)

## Sobre

Este projeto foi desenvolvido com base nas atividades do bootcamp da DIO focado em React. Ele funciona como um pequeno educador financeiro, com simulações, histórico de resultados e integração com IA para responder perguntas.

A aplicação salva dados no `localStorage` do navegador e utiliza uma chave de API do Google Gemini para gerar respostas de IA.

## Funcionalidades

- Formulário de simulação financeira
- Histórico de simulações salvas
- Chat de perguntas e respostas com IA
- Persistência dos dados no navegador via `localStorage`
- Interface em React + TypeScript

## Tecnologias

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Requisitos

- Node.js 18+ instalado
- npm ou yarn

## Instalação

No diretório do projeto:

```bash
npm install
```

ou

```bash
yarn install
```

## Configuração da API

Crie um arquivo `.env` na raiz do projeto e adicione a sua chave do Google Gemini:

```env
VITE_GEMINI_API_KEY=SuaChaveAqui
```

A aplicação depende dessa chave para funcionar corretamente na parte de integração com IA.

## Executando localmente

```bash
npm run dev
```

ou

```bash
yarn dev
```

Abra o endereço que aparecer no terminal, geralmente `http://localhost:5173`.

## Build

Para gerar a versão de produção:

```bash
npm run build
```

Para pré-visualizar o build:

```bash
npm run preview
```

## Estrutura do projeto

- components - componentes da interface
- `src/hooks` - hooks personalizados
- services - integração com API
- pages - páginas do app
- utils - utilitários
- data - prompts e dados iniciais

## Observações

- O histórico de chat e as simulações ficam armazenados no `localStorage`. Limpar o cache ou usar outro navegador apaga esses dados.
- Projeto inspirado nas atividades do bootcamp DIO para React.
