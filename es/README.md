# Amonamarth Examples (Español)

![Field Control ♥](https://img.shields.io/badge/Field%20Control-♥-blue.svg)
[![GitHub Super-Linter](https://github.com/FieldControl/amonamarth-examples/workflows/Lint/badge.svg)](https://github.com/marketplace/actions/super-linter)


:volcano: Amon Amarth, la API pública de gestión de proveedores, es un servicio web REST que expone recursos para facilitar que las empresas integren sus otros sistemas.

Este es un repositorio auxiliar que contiene fragmentos de código y ejemplos de uso. Esta es la versión en **español** de los ejemplos. Para la versión en inglés, vea [en/README.md](../en/README.md). Para la versión en portugués, vea [pt/README.md](../pt/README.md).

## Requisitos previos para ejecutar el proyecto

- Gestor de versiones de Node.js. Si no tiene nvm, instálelo siguiendo estos pasos
  - [nvm para windows](https://github.com/coreybutler/nvm-windows)
  - [nvm para mac/linux](https://github.com/nvm-sh/nvm#installing-and-updating)

- Clone este repositorio localmente `git clone https://github.com/LeoFalco/amonamarth-examples.git`

- En la carpeta del proyecto ejecute los siguientes comandos

  ```sh
  nvm install # para instalar node
  nvm use # cambia a la versión de Node.js instalada
  npm install # instala las dependencias del proyecto
  ```

- El proyecto usa autenticación por API key. Puede declarar la suya dentro de un archivo llamado `.env`
como se muestra en la imagen:

  ![image](https://user-images.githubusercontent.com/25820906/178081437-c5939851-116e-44e1-8527-91dc6a63900c.png)

## Ejecutando archivos

Los archivos de ejemplo en español están en la carpeta `es/ejemplos`. Puede ejecutarlos directamente con Node.js

```sh
  node es/ejemplos/mantenimientos/crear-mantenimiento-con-adjunto.js
```

> El código compartido (cliente HTTP y utilidades) se encuentra en la carpeta `core` en la raíz del repositorio.
