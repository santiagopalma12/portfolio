#!/bin/bash
# ============================================================
# Script de backup de base de datos
# Configurar en cron para ejecutar diariamente
# ============================================================

set -e

# Configuración
BACKUP_DIR="/home/deploy/portfolio/infrastructure/docker/backups"
CONTAINER_NAME="portfolio-db"
DB_NAME="portfolio"
DB_USER="postgres"
RETENTION_DAYS=7

# Crear directorio si no existe
mkdir -p "$BACKUP_DIR"

# Nombre del archivo con fecha
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_${TIMESTAMP}.sql.gz"

echo "🗄️ Iniciando backup de base de datos..."

# Crear backup
docker exec $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME | gzip > "$BACKUP_FILE"

# Verificar que el backup se creó correctamente
if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "✅ Backup creado exitosamente: $BACKUP_FILE ($SIZE)"
else
    echo "❌ Error: El backup no se creó correctamente"
    exit 1
fi

# Eliminar backups antiguos
echo "🧹 Eliminando backups mayores a $RETENTION_DAYS días..."
find "$BACKUP_DIR" -name "backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

# Listar backups actuales
echo "📋 Backups disponibles:"
ls -lh "$BACKUP_DIR"/*.sql.gz 2>/dev/null || echo "   No hay backups"

echo ""
echo "============================================================"
echo "📌 Para restaurar un backup:"
echo "   gunzip -c backup_XXXXXX.sql.gz | docker exec -i $CONTAINER_NAME psql -U $DB_USER $DB_NAME"
echo "============================================================"
