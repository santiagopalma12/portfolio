# ==================== BUILD STAGE ====================
FROM node:20-alpine AS builder

# Instalar OpenSSL para Prisma
RUN apk add --no-cache openssl openssl-dev

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

# ==================== PRODUCTION STAGE ====================
FROM node:20-alpine AS production

WORKDIR /app

# Instalar dumb-init y OpenSSL para Prisma
RUN apk add --no-cache dumb-init openssl

# Copiar solo lo necesario desde builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Usar dumb-init como entrypoint
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
