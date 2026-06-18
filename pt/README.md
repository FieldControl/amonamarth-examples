# Amonamarth Examples (Português)

![Field Control ♥](https://img.shields.io/badge/Field%20Control-♥-blue.svg)
[![GitHub Super-Linter](https://github.com/FieldControl/amonamarth-examples/workflows/Lint/badge.svg)](https://github.com/marketplace/actions/super-linter)


:volcano: Amon Amarth ou API publica do gestão de fornecedores é um web service rest que expõe os recursos afim de facilitar a que empresas façam integrações com seus outros sistemas.

Este é um repositório auxiliar contendo trechos de código e exemplos de uso. Esta é a versão em **português** dos exemplos. Para a versão em inglês, veja [en/README.md](../en/README.md). Para a versão em espanhol, veja [es/README.md](../es/README.md).

## Pré-requisitos para executar o projeto

- Node.js version manager, caso não tenha o nvm instale seguindo estes passos
  - [nvm para windows](https://github.com/coreybutler/nvm-windows)
  - [nvm pra mac/linux](https://github.com/nvm-sh/nvm#installing-and-updating)

- Clonar este repositório localmente `git clone https://github.com/LeoFalco/amonamarth-examples.git`

- Na pasta do projeto executar os seguintes comandos

  ```sh
  nvm install # para instalar o node
  nvm use # troca para a versão do Node.js instalada
  npm install # instala as dependências do projeto
  ```

- O projeto usa autenticação por de API key você pode declarar a sua dentro de um arquivo chamado `.env`
assim como na imagem:

  ![image](https://user-images.githubusercontent.com/25820906/178081437-c5939851-116e-44e1-8527-91dc6a63900c.png)

## Executando arquivos

Os arquivos de exemplos em português estão na pasta `pt/exemplos` é possível executa-los diretamente pelo Node.js

```sh
  node pt/exemplos/manutencoes/criar-manutencao-com-anexo.js
```

> O código compartilhado (cliente HTTP e utilitários) fica na pasta `core` na raiz do repositório.
