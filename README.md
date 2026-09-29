# Task Manager API

Backend profesional construido con **TypeScript + Node.js**, siguiendo buenas prácticas de desarrollo, calidad de código, testing, Git, CI/CD y contenedores.

Este proyecto se está construyendo progresivamente desde una base sencilla hasta una arquitectura backend profesional y preparada para producción.

---

## 🚧 Estado actual

> **Checkpoint actual: 14 — Docker Compose**

Hasta este punto el proyecto cuenta con:

- TypeScript configurado
- ESLint
- Prettier
- Scripts de calidad
- Git
- GitHub
- Conventional Commits
- Vitest
- Arquitectura inicial
- Variables de entorno
- GitHub Actions
- Husky
- lint-staged
- Scripts de seguridad/dependencias
- Docker
- Docker Compose
- PostgreSQL ejecutándose mediante Docker Compose

### Próximo checkpoint

**Checkpoint 15 — Conexión TypeScript → PostgreSQL**

---

# 🛠️ Stack tecnológico

## Lenguaje

- TypeScript 5.9

## Runtime

- Node.js

## Package Manager

- npm

## Calidad de código

- ESLint
- Prettier
- EditorConfig

## Testing

- Vitest

## Control de versiones

- Git
- GitHub
- Conventional Commits

## Automatización

- Husky
- lint-staged

## CI/CD

- GitHub Actions

## Contenedores

- Docker
- Docker Compose

## Base de datos

- PostgreSQL 16

---

# 📁 Estructura del proyecto

```text
task-manager/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .husky/
│   └── pre-commit
│
├── .vscode/
│   ├── extensions.json
│   └── settings.json
│
├── src/
│   ├── domain/
│   │   └── task.ts
│   │
│   ├── services/
│   │   └── task.service.ts
│   │
│   └── index.ts
│
├── test/
│   └── task.test.ts
│
├── .dockerignore
├── .editorconfig
├── .env
├── .env.example
├── .gitignore
├── compose.yaml
├── Dockerfile
├── eslint.config.mts
├── package.json
├── package-lock.json
├── prettier.config.js
├── README.md
└── tsconfig.json
```
