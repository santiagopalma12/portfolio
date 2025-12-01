#!/bin/bash
# ============================================================
# Script de despliegue
# Ejecutar desde /home/deploy/portfolio
# ============================================================

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando deploy...${NC}"

# Verificar que estamos en el directorio correcto
if [ ! -f "infrastructure/docker/docker-compose.prod.yml" ]; then
    echo -e "${RED}❌ Error: Ejecutar este script desde la raíz del proyecto${NC}"
    exit 1
fi

# Verificar que existe el archivo .env
if [ ! -f "infrastructure/docker/.env" ]; then
    echo -e "${RED}❌ Error: No se encontró infrastructure/docker/.env${NC}"
    echo -e "${YELLOW}Crea el archivo con las siguientes variables:${NC}"
    echo "  DB_PASSWORD=tu_password_seguro"
    echo "  JWT_SECRET=tu_jwt_secret_muy_largo"
    exit 1
fi

# Pull últimos cambios
echo -e "${YELLOW}📥 Obteniendo últimos cambios...${NC}"
git pull origin main

# Cargar variables de entorno
export $(cat infrastructure/docker/.env | xargs)

# Build y deploy
echo -e "${YELLOW}🐳 Construyendo y desplegando contenedores...${NC}"
cd infrastructure/docker
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --build

# Esperar a que la base de datos esté lista
echo -e "${YELLOW}⏳ Esperando a que la base de datos esté lista...${NC}"
sleep 10

# Ejecutar migraciones
echo -e "${YELLOW}🗄️ Ejecutando migraciones de base de datos...${NC}"
docker compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy

# Limpiar imágenes antiguas
echo -e "${YELLOW}🧹 Limpiando imágenes antiguas...${NC}"
docker image prune -f

# Verificar estado
echo -e "${YELLOW}📊 Estado de los contenedores:${NC}"
docker compose -f docker-compose.prod.yml ps

# Health check
echo -e "${YELLOW}🏥 Verificando health check...${NC}"
sleep 5
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ API respondiendo correctamente${NC}"
else
    echo -e "${RED}⚠️ API no responde, revisar logs:${NC}"
    docker compose -f docker-compose.prod.yml logs --tail=50 api
fi

echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}✅ DEPLOY COMPLETADO EXITOSAMENTE${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo -e "📌 Comandos útiles:"
echo -e "   Ver logs: docker compose -f docker-compose.prod.yml logs -f"
echo -e "   Reiniciar: docker compose -f docker-compose.prod.yml restart"
echo -e "   Detener: docker compose -f docker-compose.prod.yml down"
echo ""
