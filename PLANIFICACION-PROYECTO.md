# 🚀 Plan de Proyecto: Portfolio Web Personal

> **Autor:** Santiago  
> **Fecha de inicio:** 1 de Diciembre, 2025  
> **Estado:** En planificación  
> **Última actualización:** 1 de Diciembre, 2025

---

## 📋 Tabla de Contenidos

1. [Visión General](#-visión-general)
2. [Arquitectura Híbrida](#-arquitectura-híbrida)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Configuración de Hosting](#-configuración-de-hosting)
6. [Dominio y SSL](#-dominio-y-ssl)
7. [Backend y Base de Datos](#-backend-y-base-de-datos)
8. [CI/CD y Despliegue](#-cicd-y-despliegue)
9. [Roadmap de Desarrollo](#-roadmap-de-desarrollo)
10. [Estimación de Costos](#-estimación-de-costos)
11. [Recursos y Referencias](#-recursos-y-referencias)

---

## 🎯 Visión General

### Objetivo del Proyecto
Crear un portfolio web profesional y moderno que sirva como carta de presentación digital, showcasing de proyectos, y plataforma para demostrar habilidades técnicas.

### Características Principales
- ✅ Diseño responsive y moderno
- ✅ Sección de proyectos con demos interactivas
- ✅ Blog técnico integrado
- ✅ Formulario de contacto funcional
- ✅ API propia para funcionalidades dinámicas
- ✅ Panel de administración para gestionar contenido
- ✅ Analíticas de visitas
- ✅ Modo oscuro/claro

### Público Objetivo
- Reclutadores y empresas de tecnología
- Otros desarrolladores y comunidad tech
- Clientes potenciales para proyectos freelance

---

## 🏗 Arquitectura Híbrida

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIOS                                  │
│                     santiago.me                                  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌───────────────────────────────────┐
│   GITHUB PAGES        │   │      DIGITALOCEAN DROPLET         │
│   (Frontend)          │   │      (Backend)                    │
│                       │   │                                   │
│ ┌───────────────────┐ │   │ ┌───────────────────────────────┐ │
│ │  React SPA        │ │   │ │         NGINX                 │ │
│ │  (Build estático) │ │   │ │    (Reverse Proxy + SSL)      │ │
│ └───────────────────┘ │   │ └───────────────┬───────────────┘ │
│                       │   │                 │                 │
│ Dominio:              │   │ ┌───────────────▼───────────────┐ │
│ santiago.me           │   │ │      DOCKER CONTAINERS        │ │
│                       │   │ │                               │ │
│ Costo: $0             │   │ │ ┌───────────┐ ┌─────────────┐ │ │
│                       │   │ │ │  Node.js  │ │  PostgreSQL │ │ │
│ CDN: GitHub's CDN     │   │ │ │  API      │ │  Database   │ │ │
│                       │   │ │ └───────────┘ └─────────────┘ │ │
└───────────────────────┘   │ │                               │ │
                            │ │ ┌───────────┐ ┌─────────────┐ │ │
                            │ │ │  Redis    │ │  Adminer    │ │ │
                            │ │ │  Cache    │ │  (DB Admin) │ │ │
                            │ │ └───────────┘ └─────────────┘ │ │
                            │ └───────────────────────────────┘ │
                            │                                   │
                            │ Subdominio: api.santiago.me       │
                            │ Costo: ~$12/mes (créditos gratis) │
                            └───────────────────────────────────┘
```

### ¿Por qué esta arquitectura?

| Aspecto | GitHub Pages | DigitalOcean |
|---------|--------------|--------------|
| **Uso** | Frontend estático | Backend dinámico |
| **Costo** | $0 siempre | $12/mes (cubierto por créditos) |
| **Escalabilidad** | Automática (CDN global) | Manual (upgrade droplet) |
| **Mantenimiento** | Ninguno | Aprender Linux/Docker |
| **Si se acaba crédito** | Sigue funcionando | Se apaga, web estática sigue |

---

## 💻 Stack Tecnológico

### Frontend (GitHub Pages)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Framework principal |
| **TypeScript** | 5.x | Tipado estático |
| **Vite** | 5.x | Build tool (más rápido que CRA) |
| **TailwindCSS** | 3.x | Estilos utility-first |
| **Framer Motion** | 10.x | Animaciones fluidas |
| **React Router** | 6.x | Navegación SPA |
| **React Query** | 5.x | Fetching y cache de datos |
| **React Hook Form** | 7.x | Manejo de formularios |
| **Zustand** | 4.x | Estado global (más simple que Redux) |

### Backend (DigitalOcean)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 20.x LTS | Runtime de JavaScript |
| **Express.js** | 4.x | Framework web minimalista |
| **TypeScript** | 5.x | Tipado estático |
| **Prisma** | 5.x | ORM moderno para PostgreSQL |
| **PostgreSQL** | 16.x | Base de datos relacional |
| **Redis** | 7.x | Cache y sesiones |
| **JWT** | - | Autenticación |
| **Zod** | 3.x | Validación de schemas |
| **Docker** | 24.x | Containerización |
| **Nginx** | latest | Reverse proxy y SSL |

### DevOps y Herramientas

| Tecnología | Propósito |
|------------|-----------|
| **Git** | Control de versiones |
| **GitHub Actions** | CI/CD automatizado |
| **ESLint + Prettier** | Linting y formateo |
| **Vitest** | Testing unitario |
| **Playwright** | Testing E2E |
| **Docker Compose** | Orquestación local |

---

## 📁 Estructura del Proyecto

```
My webpage/
│
├── 📄 PLANIFICACION-PROYECTO.md    # Este documento
├── 📄 README.md                     # Documentación principal
├── 📄 .gitignore                    # Archivos ignorados por Git
│
├── 📁 frontend/                     # React App → GitHub Pages
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 vite.config.ts
│   ├── 📄 tailwind.config.js
│   ├── 📄 index.html
│   │
│   ├── 📁 public/
│   │   ├── 📄 favicon.ico
│   │   ├── 📄 robots.txt
│   │   ├── 📄 sitemap.xml
│   │   └── 📁 assets/
│   │       ├── 📁 images/
│   │       └── 📁 documents/        # CV, certificados, etc.
│   │
│   └── 📁 src/
│       ├── 📄 main.tsx              # Entry point
│       ├── 📄 App.tsx               # Componente raíz
│       ├── 📄 index.css             # Estilos globales + Tailwind
│       │
│       ├── 📁 components/           # Componentes reutilizables
│       │   ├── 📁 ui/               # Botones, inputs, cards, etc.
│       │   │   ├── Button.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Input.tsx
│       │   │   └── Modal.tsx
│       │   │
│       │   ├── 📁 layout/           # Estructura de página
│       │   │   ├── Header.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Navbar.tsx
│       │   │   └── Layout.tsx
│       │   │
│       │   └── 📁 sections/         # Secciones del portfolio
│       │       ├── Hero.tsx
│       │       ├── About.tsx
│       │       ├── Projects.tsx
│       │       ├── Skills.tsx
│       │       ├── Experience.tsx
│       │       ├── Blog.tsx
│       │       └── Contact.tsx
│       │
│       ├── 📁 pages/                # Páginas/rutas
│       │   ├── Home.tsx
│       │   ├── ProjectDetail.tsx
│       │   ├── BlogPost.tsx
│       │   └── NotFound.tsx
│       │
│       ├── 📁 hooks/                # Custom hooks
│       │   ├── useTheme.ts
│       │   ├── useScrollPosition.ts
│       │   └── useMediaQuery.ts
│       │
│       ├── 📁 services/             # Llamadas a la API
│       │   ├── api.ts               # Configuración de axios/fetch
│       │   ├── projects.ts
│       │   ├── blog.ts
│       │   └── contact.ts
│       │
│       ├── 📁 stores/               # Estado global (Zustand)
│       │   ├── themeStore.ts
│       │   └── userStore.ts
│       │
│       ├── 📁 types/                # TypeScript types/interfaces
│       │   ├── project.ts
│       │   ├── blog.ts
│       │   └── api.ts
│       │
│       ├── 📁 utils/                # Funciones utilitarias
│       │   ├── formatDate.ts
│       │   ├── classNames.ts
│       │   └── constants.ts
│       │
│       └── 📁 assets/               # Assets importados en código
│           ├── 📁 icons/
│           └── 📁 images/
│
├── 📁 backend/                      # Node.js API → DigitalOcean
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 Dockerfile
│   ├── 📄 docker-compose.yml
│   ├── 📄 .env.example
│   │
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma         # Esquema de base de datos
│   │   └── 📁 migrations/           # Migraciones de DB
│   │
│   └── 📁 src/
│       ├── 📄 index.ts              # Entry point
│       ├── 📄 app.ts                # Configuración de Express
│       │
│       ├── 📁 config/               # Configuraciones
│       │   ├── database.ts
│       │   ├── redis.ts
│       │   └── env.ts
│       │
│       ├── 📁 routes/               # Rutas de la API
│       │   ├── index.ts
│       │   ├── projects.ts
│       │   ├── blog.ts
│       │   ├── contact.ts
│       │   └── auth.ts
│       │
│       ├── 📁 controllers/          # Lógica de controladores
│       │   ├── projectController.ts
│       │   ├── blogController.ts
│       │   ├── contactController.ts
│       │   └── authController.ts
│       │
│       ├── 📁 services/             # Lógica de negocio
│       │   ├── projectService.ts
│       │   ├── blogService.ts
│       │   ├── emailService.ts
│       │   └── authService.ts
│       │
│       ├── 📁 middleware/           # Middlewares
│       │   ├── auth.ts
│       │   ├── errorHandler.ts
│       │   ├── rateLimiter.ts
│       │   └── validation.ts
│       │
│       ├── 📁 types/                # TypeScript types
│       │   └── index.ts
│       │
│       └── 📁 utils/                # Utilidades
│           ├── logger.ts
│           └── helpers.ts
│
├── 📁 infrastructure/               # Configuración de servidor
│   ├── 📁 nginx/
│   │   └── 📄 nginx.conf            # Configuración de Nginx
│   │
│   ├── 📁 docker/
│   │   └── 📄 docker-compose.prod.yml
│   │
│   └── 📁 scripts/
│       ├── 📄 setup-server.sh       # Script de configuración inicial
│       ├── 📄 deploy.sh             # Script de despliegue
│       └── 📄 backup-db.sh          # Script de backup
│
└── 📁 .github/
    └── 📁 workflows/
        ├── 📄 frontend-deploy.yml   # Deploy frontend a GitHub Pages
        └── 📄 backend-deploy.yml    # Deploy backend a DigitalOcean
```

---

## 🌐 Configuración de Hosting

### GitHub Pages (Frontend)

#### Paso 1: Crear repositorio en GitHub
```bash
# En la carpeta frontend/
git init
git remote add origin https://github.com/TU_USUARIO/portfolio.git
```

#### Paso 2: Configurar Vite para GitHub Pages
```typescript
// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Cambia a '/portfolio/' si no usas dominio custom
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

#### Paso 3: GitHub Action para deploy automático
```yaml
# .github/workflows/frontend-deploy.yml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build
        working-directory: ./frontend
        run: npm run build
        env:
          VITE_API_URL: https://api.santiago.me

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
          cname: santiago.me  # Tu dominio de Namecheap
```

#### Paso 4: Configurar GitHub Pages en repositorio
1. Ir a **Settings** → **Pages**
2. Source: **GitHub Actions**
3. El dominio custom se configura después con Namecheap

---

### DigitalOcean Droplet (Backend)

#### Paso 1: Crear Droplet
1. Ir a [DigitalOcean](https://cloud.digitalocean.com)
2. Aplicar créditos del GitHub Student Pack
3. Crear Droplet:
   - **Imagen:** Ubuntu 24.04 LTS
   - **Plan:** Basic - Regular - $12/mes (2GB RAM, 1 vCPU, 50GB SSD)
   - **Región:** NYC1 o la más cercana a tu audiencia
   - **Authentication:** SSH Key (más seguro)
   - **Hostname:** `santiago-api`

#### Paso 2: Script de configuración inicial
```bash
#!/bin/bash
# infrastructure/scripts/setup-server.sh

# Actualizar sistema
apt update && apt upgrade -y

# Instalar dependencias básicas
apt install -y curl git ufw fail2ban

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $USER

# Instalar Docker Compose
apt install -y docker-compose-plugin

# Configurar Firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Instalar Certbot para SSL
apt install -y certbot python3-certbot-nginx

# Crear usuario para deploy (no usar root)
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
usermod -aG sudo deploy

echo "✅ Servidor configurado correctamente"
```

#### Paso 3: Docker Compose para producción
```yaml
# infrastructure/docker/docker-compose.prod.yml
version: '3.8'

services:
  api:
    build:
      context: ../../backend
      dockerfile: Dockerfile
    container_name: portfolio-api
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/portfolio
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis
    networks:
      - portfolio-network

  db:
    image: postgres:16-alpine
    container_name: portfolio-db
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=portfolio
    networks:
      - portfolio-network

  redis:
    image: redis:7-alpine
    container_name: portfolio-redis
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - portfolio-network

  nginx:
    image: nginx:alpine
    container_name: portfolio-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - api
    networks:
      - portfolio-network

  adminer:
    image: adminer
    container_name: portfolio-adminer
    restart: always
    ports:
      - "8080:8080"  # Solo accesible via SSH tunnel
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

#### Paso 4: Configuración de Nginx
```nginx
# infrastructure/nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    # Upstream para la API
    upstream api_backend {
        server api:3000;
    }

    # Redirect HTTP a HTTPS
    server {
        listen 80;
        server_name api.santiago.me;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name api.santiago.me;

        # Certificados SSL (Let's Encrypt)
        ssl_certificate /etc/letsencrypt/live/api.santiago.me/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/api.santiago.me/privkey.pem;

        # Configuración SSL moderna
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

        # Headers de seguridad
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # CORS para frontend
        add_header Access-Control-Allow-Origin "https://santiago.me" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

        location / {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://api_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Health check endpoint
        location /health {
            proxy_pass http://api_backend/health;
        }
    }
}
```

---

## 🔐 Dominio y SSL

### Namecheap - Registro de Dominio

#### Paso 1: Obtener dominio .me gratis
1. Ir a [Namecheap Education](https://nc.me/) con tu correo .edu
2. Registrar `santiago.me` (o el nombre que prefieras)
3. Verificar correo y completar registro

#### Paso 2: Configurar DNS

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | `185.199.108.153` | Automatic |
| A | @ | `185.199.109.153` | Automatic |
| A | @ | `185.199.110.153` | Automatic |
| A | @ | `185.199.111.153` | Automatic |
| CNAME | www | `TU_USUARIO.github.io` | Automatic |
| A | api | `IP_DE_TU_DROPLET` | Automatic |

> **Nota:** Las IPs `185.199.x.x` son de GitHub Pages. La IP del Droplet la obtienes al crearlo.

### SSL Certificates

#### Para GitHub Pages (automático)
- GitHub Pages provee SSL automático con Let's Encrypt
- Solo activar "Enforce HTTPS" en Settings → Pages

#### Para DigitalOcean (Let's Encrypt)
```bash
# En el servidor, generar certificado SSL
sudo certbot certonly --standalone -d api.santiago.me

# Renovación automática (ya configurada por certbot)
sudo systemctl status certbot.timer
```

#### Certificado Namecheap (Bonus)
El certificado SSL gratuito de Namecheap lo puedes usar como backup o para otros subdominios:
1. Ir a Dashboard → SSL Certificates
2. Activar el certificado gratuito
3. Generar CSR y completar validación

---

## 🗄 Backend y Base de Datos

### Esquema de Base de Datos (Prisma)

```prisma
// backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== MODELOS ====================

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posts     BlogPost[]
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String   @db.Text
  imageUrl    String?
  demoUrl     String?
  repoUrl     String?
  technologies String[]
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tags        ProjectTag[]
}

model Tag {
  id       String       @id @default(cuid())
  name     String       @unique
  color    String       @default("#3B82F6")
  
  projects ProjectTag[]
  posts    PostTag[]
}

model ProjectTag {
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)
  tagId     String
  
  @@id([projectId, tagId])
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   @db.Text
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  views       Int      @default(0)
  readTime    Int      @default(5) // minutos
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  tags        PostTag[]
}

model PostTag {
  post   BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId String
  tag    Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)
  tagId  String
  
  @@id([postId, tagId])
}

model Contact {
  id        String        @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String        @db.Text
  status    ContactStatus @default(UNREAD)
  createdAt DateTime      @default(now())
}

model Analytics {
  id        String   @id @default(cuid())
  path      String
  referrer  String?
  userAgent String?
  country   String?
  createdAt DateTime @default(now())
  
  @@index([path])
  @@index([createdAt])
}

// ==================== ENUMS ====================

enum Role {
  ADMIN
  EDITOR
}

enum ContactStatus {
  UNREAD
  READ
  REPLIED
  ARCHIVED
}
```

### API Endpoints

```
Base URL: https://api.santiago.me/v1

📁 PROJECTS
├── GET    /projects              → Lista proyectos públicos
├── GET    /projects/:slug        → Detalle de proyecto
├── POST   /projects              → Crear proyecto (auth)
├── PUT    /projects/:id          → Actualizar proyecto (auth)
└── DELETE /projects/:id          → Eliminar proyecto (auth)

📁 BLOG
├── GET    /posts                 → Lista posts publicados
├── GET    /posts/:slug           → Detalle de post
├── POST   /posts                 → Crear post (auth)
├── PUT    /posts/:id             → Actualizar post (auth)
└── DELETE /posts/:id             → Eliminar post (auth)

📁 CONTACT
├── POST   /contact               → Enviar mensaje
└── GET    /contact               → Lista mensajes (auth)

📁 AUTH
├── POST   /auth/login            → Iniciar sesión
├── POST   /auth/refresh          → Renovar token
└── POST   /auth/logout           → Cerrar sesión

📁 ANALYTICS
├── POST   /analytics/pageview    → Registrar visita
└── GET    /analytics/stats       → Estadísticas (auth)

📁 HEALTH
└── GET    /health                → Estado del servidor
```

### Dockerfile para Backend

```dockerfile
# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar cliente Prisma y compilar TypeScript
RUN npx prisma generate
RUN npm run build

# ==================== PRODUCTION ====================
FROM node:20-alpine AS production

WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

---

## 🔄 CI/CD y Despliegue

### GitHub Action - Deploy Backend

```yaml
# .github/workflows/backend-deploy.yml
name: Deploy Backend to DigitalOcean

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'infrastructure/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.DROPLET_SSH_KEY }}

      - name: Add host to known_hosts
        run: |
          ssh-keyscan -H ${{ secrets.DROPLET_IP }} >> ~/.ssh/known_hosts

      - name: Deploy to server
        run: |
          ssh deploy@${{ secrets.DROPLET_IP }} << 'EOF'
            cd /home/deploy/portfolio
            git pull origin main
            cd backend
            docker compose -f ../infrastructure/docker/docker-compose.prod.yml up -d --build
            docker compose exec api npx prisma migrate deploy
            echo "✅ Deploy completado"
          EOF
```

### Secrets necesarios en GitHub

| Secret Name | Descripción |
|-------------|-------------|
| `DROPLET_IP` | IP pública de tu Droplet |
| `DROPLET_SSH_KEY` | Llave SSH privada para conectar |
| `DB_PASSWORD` | Contraseña de PostgreSQL |
| `JWT_SECRET` | Secret para tokens JWT |

### Script de deploy manual

```bash
#!/bin/bash
# infrastructure/scripts/deploy.sh

set -e

echo "🚀 Iniciando deploy..."

# Pull últimos cambios
git pull origin main

# Build y restart containers
cd infrastructure/docker
docker compose -f docker-compose.prod.yml up -d --build

# Ejecutar migraciones
docker compose exec api npx prisma migrate deploy

# Limpiar imágenes antiguas
docker image prune -f

echo "✅ Deploy completado exitosamente!"
```

---

## 📅 Roadmap de Desarrollo

### Fase 1: Setup Inicial (Semana 1)
- [ ] Inicializar repositorio Git
- [ ] Crear estructura de carpetas
- [ ] Configurar ESLint, Prettier, TypeScript
- [ ] Setup frontend con Vite + React + TailwindCSS
- [ ] Setup backend con Express + Prisma
- [ ] Crear docker-compose para desarrollo local

### Fase 2: Frontend Base (Semanas 2-3)
- [ ] Diseñar sistema de diseño (colores, tipografía, espaciados)
- [ ] Crear componentes UI base (Button, Card, Input, etc.)
- [ ] Implementar layout (Header, Footer, Navbar)
- [ ] Crear página Home con Hero section
- [ ] Implementar sección About
- [ ] Implementar sección Skills
- [ ] Añadir modo oscuro/claro
- [ ] Configurar animaciones con Framer Motion

### Fase 3: Backend API (Semana 4)
- [ ] Configurar rutas y controladores
- [ ] Implementar autenticación JWT
- [ ] Crear CRUD de proyectos
- [ ] Crear CRUD de blog posts
- [ ] Implementar endpoint de contacto
- [ ] Añadir validación con Zod
- [ ] Configurar rate limiting y seguridad

### Fase 4: Integración Frontend-Backend (Semana 5)
- [ ] Conectar frontend con API usando React Query
- [ ] Implementar sección de proyectos dinámica
- [ ] Implementar blog con posts desde API
- [ ] Crear formulario de contacto funcional
- [ ] Añadir analytics básicos

### Fase 5: Deployment (Semana 6)
- [ ] Registrar dominio en Namecheap
- [ ] Crear Droplet en DigitalOcean
- [ ] Configurar servidor (Docker, Nginx, SSL)
- [ ] Deploy frontend a GitHub Pages
- [ ] Deploy backend a DigitalOcean
- [ ] Configurar DNS
- [ ] Configurar GitHub Actions para CI/CD

### Fase 6: Polish y Launch (Semana 7)
- [ ] Testing completo E2E
- [ ] Optimización de performance (Lighthouse 90+)
- [ ] SEO (meta tags, sitemap, robots.txt)
- [ ] Crear contenido real (proyectos, about, etc.)
- [ ] 🎉 **LAUNCH**

### Fase 7: Post-Launch (Continuo)
- [ ] Añadir más proyectos
- [ ] Escribir blog posts
- [ ] Implementar comentarios en blog
- [ ] Añadir newsletter
- [ ] Internacionalización (i18n)
- [ ] Panel de administración

---

## 💰 Estimación de Costos

### Año 1 (Con beneficios estudiantiles)

| Servicio | Costo Normal | Con Student Pack | Total Año 1 |
|----------|--------------|------------------|-------------|
| Dominio `.me` | $18.98/año | **GRATIS** | $0 |
| SSL Certificate | $9/año | **GRATIS** | $0 |
| GitHub Pages | $0 | $0 | $0 |
| DigitalOcean | $12/mes = $144/año | **$200 crédito** | $0 |
| **TOTAL** | **$171.98** | | **$0** |

### Año 2+ (Sin beneficios)

| Servicio | Costo Mensual | Costo Anual |
|----------|---------------|-------------|
| Dominio `.me` | - | ~$20 |
| SSL (Let's Encrypt) | $0 | $0 |
| GitHub Pages | $0 | $0 |
| DigitalOcean Droplet | $12 | $144 |
| **TOTAL** | | **~$164/año** |

### Alternativas si se acaba el crédito

| Alternativa | Costo | Limitaciones |
|-------------|-------|--------------|
| **Opción A:** Mantener solo frontend | $20/año (dominio) | Sin backend, solo contenido estático |
| **Opción B:** Backend en Railway/Render | $0-5/mes | Limitado en recursos gratuitos |
| **Opción C:** Backend en Vercel Serverless | $0 | Sin PostgreSQL persistente gratis |
| **Opción D:** Migrar a VPS más barato (Hetzner) | €4/mes (~$5) | Mismo setup, diferente proveedor |

---

## 📚 Recursos y Referencias

### Documentación Oficial
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)

### Tutoriales Recomendados
- [Deploy React to GitHub Pages](https://github.com/gitname/react-gh-pages)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Docker for Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)

### Herramientas Útiles
- [Figma](https://figma.com) - Diseño de interfaces
- [Coolors](https://coolors.co) - Paletas de colores
- [Heroicons](https://heroicons.com) - Iconos SVG
- [Unsplash](https://unsplash.com) - Imágenes gratuitas
- [Excalidraw](https://excalidraw.com) - Diagramas

### Inspiración de Portfolios
- [Brittany Chiang](https://brittanychiang.com)
- [Josh Comeau](https://joshwcomeau.com)
- [Lee Robinson](https://leerob.io)
- [Tania Rascia](https://taniarascia.com)

---

## ✅ Checklist Pre-Launch

```
□ Dominio configurado y funcionando
□ SSL activo en frontend y backend  
□ Todas las páginas cargan correctamente
□ Formulario de contacto envía emails
□ Responsive en móvil, tablet y desktop
□ Lighthouse Performance > 90
□ Lighthouse Accessibility > 90
□ Lighthouse SEO > 90
□ Meta tags configurados para redes sociales
□ Favicon y manifest.json configurados
□ Google Analytics o alternativa instalada
□ Sitemap.xml generado
□ robots.txt configurado
□ 404 page personalizada
□ Backup de base de datos configurado
□ Monitoreo básico activado
```

---

## 📝 Notas y Decisiones de Diseño

### ¿Por qué React + Vite en lugar de Next.js?
- GitHub Pages solo soporta archivos estáticos
- Vite genera builds estáticos perfectos para GitHub Pages
- Next.js requiere servidor Node.js (más complejo para hosting gratuito)
- React puro es suficiente para un portfolio SPA

### ¿Por qué Express en lugar de Nest.js?
- Más ligero y simple de aprender
- Menor overhead en servidor pequeño
- Comunidad enorme y muchos recursos
- Suficiente para las necesidades del proyecto

### ¿Por qué PostgreSQL en lugar de MongoDB?
- Datos relacionales (proyectos ↔ tags)
- Prisma tiene mejor soporte para PostgreSQL
- Más fácil de hacer queries complejas
- Mejor para datos estructurados como blog y proyectos

### ¿Por qué TypeScript en todo?
- Mismo lenguaje en frontend y backend
- Detecta errores antes de ejecutar
- Mejor autocompletado en VS Code
- Código más mantenible a largo plazo

---

> **💡 Tip:** Este documento es un "living document". Actualízalo conforme avances en el proyecto, añade notas, tacha items completados, y documenta decisiones importantes.

---

**¡Buena suerte con tu portfolio, Santiago! 🚀**
