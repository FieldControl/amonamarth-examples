# Amonamarth Examples (English)

![Field Control ♥](https://img.shields.io/badge/Field%20Control-♥-blue.svg)
[![GitHub Super-Linter](https://github.com/FieldControl/amonamarth-examples/workflows/Lint/badge.svg)](https://github.com/marketplace/actions/super-linter)


:volcano: Amon Amarth, the public supplier management API, is a REST web service that exposes resources to make it easier for companies to integrate with their other systems.

This is an auxiliary repository containing code snippets and usage examples. This is the **English** version of the examples. For the Portuguese version, see [pt/README.md](../pt/README.md). For the Spanish version, see [es/README.md](../es/README.md).

## Prerequisites to run the project

- Node.js version manager. If you do not have nvm, install it following these steps
  - [nvm for windows](https://github.com/coreybutler/nvm-windows)
  - [nvm for mac/linux](https://github.com/nvm-sh/nvm#installing-and-updating)

- Clone this repository locally `git clone https://github.com/LeoFalco/amonamarth-examples.git`

- In the project folder run the following commands

  ```sh
  nvm install # to install node
  nvm use # switch to the installed Node.js version
  npm install # install the project dependencies
  ```

- The project uses API key authentication. You can declare yours inside a file called `.env`
as shown in the image:

  ![image](https://user-images.githubusercontent.com/25820906/178081437-c5939851-116e-44e1-8527-91dc6a63900c.png)

## Running files

The English example files are in the `en/examples` folder. You can run them directly with Node.js

```sh
  node en/examples/maintenances/create-maintenance-with-attachment.js
```

> The shared code (HTTP client and utilities) lives in the `core` folder at the root of the repository.
