# 🌐 Santiago's Portfolio

> Mi portfolio personal y blog técnico construido con React + Node.js

[![Frontend Deploy](https://github.com/USERNAME/portfolio/actions/workflows/frontend-deploy.yml/badge.svg)](https://github.com/USERNAME/portfolio/actions/workflows/frontend-deploy.yml)
[![Backend Deploy](https://github.com/USERNAME/portfolio/actions/workflows/backend-deploy.yml/badge.svg)](https://github.com/USERNAME/portfolio/actions/workflows/backend-deploy.yml)

## 🚀 Demo

- **Frontend:** [https://santiagopalma.me](https://santiagopalma.me)
- **API:** [https://api.santiagopalma.me](https://api.santiagopalma.me)

## 📋 Descripción

Portfolio web profesional con:
- ✨ Diseño moderno y responsive
- 🌙 Modo oscuro/claro
- 📝 Blog técnico integrado
- 📬 Formulario de contacto funcional
- 📊 Analytics de visitas

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Query

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- Docker

## 📁 Estructura del Proyecto

```
├── frontend/          # React app → GitHub Pages
├── backend/           # Node.js API → DigitalOcean
├── infrastructure/    # Docker, Nginx configs
└── .github/workflows/ # CI/CD pipelines
```

## 🏃‍♂️ Desarrollo Local

### Requisitos
- Node.js 20+
- Docker & Docker Compose
- Git

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

### Backend

```bash
cd backend
npm install
docker compose up -d  # PostgreSQL + Redis
npm run db:migrate    # Ejecutar migraciones
npm run dev
```

API en [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Frontend (GitHub Pages)
Push a `main` → GitHub Actions despliega automáticamente

### Backend (DigitalOcean)
Push a `main` → GitHub Actions despliega via SSH

## 📄 Licencia

MIT © Santiago

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
