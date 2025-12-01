#!/bin/bash
# ============================================================
# Script de configuración inicial del servidor
# Ejecutar como root en un nuevo Droplet Ubuntu 24.04 LTS
# ============================================================

set -e

echo "🚀 Iniciando configuración del servidor..."

# ==================== ACTUALIZAR SISTEMA ====================
echo "📦 Actualizando sistema..."
apt update && apt upgrade -y

# ==================== INSTALAR DEPENDENCIAS ====================
echo "📦 Instalando dependencias básicas..."
apt install -y \
    curl \
    git \
    ufw \
    fail2ban \
    htop \
    ncdu \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# ==================== INSTALAR DOCKER ====================
echo "🐳 Instalando Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Instalar Docker Compose plugin
apt install -y docker-compose-plugin

# ==================== CONFIGURAR FIREWALL ====================
echo "🔥 Configurando firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ==================== CONFIGURAR FAIL2BAN ====================
echo "🛡️ Configurando Fail2Ban..."
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
EOF

systemctl enable fail2ban
systemctl restart fail2ban

# ==================== CREAR USUARIO DEPLOY ====================
echo "👤 Creando usuario deploy..."
if ! id "deploy" &>/dev/null; then
    adduser --disabled-password --gecos "" deploy
    usermod -aG docker deploy
    usermod -aG sudo deploy
    
    # Permitir sudo sin password para deploy
    echo "deploy ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/deploy
    
    # Copiar SSH keys de root a deploy
    mkdir -p /home/deploy/.ssh
    cp /root/.ssh/authorized_keys /home/deploy/.ssh/
    chown -R deploy:deploy /home/deploy/.ssh
    chmod 700 /home/deploy/.ssh
    chmod 600 /home/deploy/.ssh/authorized_keys
fi

# ==================== CREAR DIRECTORIOS DEL PROYECTO ====================
echo "📁 Creando directorios del proyecto..."
mkdir -p /home/deploy/portfolio
mkdir -p /home/deploy/portfolio/infrastructure/docker/backups
chown -R deploy:deploy /home/deploy/portfolio

# ==================== INSTALAR CERTBOT ====================
echo "🔐 Instalando Certbot..."
apt install -y certbot python3-certbot-nginx

# ==================== CONFIGURAR SWAP (para Droplets pequeños) ====================
echo "💾 Configurando swap..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    
    # Optimizar uso de swap
    echo 'vm.swappiness=10' >> /etc/sysctl.conf
    echo 'vm.vfs_cache_pressure=50' >> /etc/sysctl.conf
    sysctl -p
fi

# ==================== CONFIGURAR TIMEZONE ====================
echo "🕐 Configurando timezone..."
timedatectl set-timezone America/Mexico_City

# ==================== LIMPIAR ====================
echo "🧹 Limpiando..."
apt autoremove -y
apt clean

# ==================== RESUMEN ====================
echo ""
echo "============================================================"
echo "✅ SERVIDOR CONFIGURADO CORRECTAMENTE"
echo "============================================================"
echo ""
echo "📋 Resumen:"
echo "   - Docker y Docker Compose instalados"
echo "   - Firewall configurado (SSH, HTTP, HTTPS)"
echo "   - Fail2Ban activo"
echo "   - Usuario 'deploy' creado"
echo "   - Certbot instalado"
echo "   - Swap de 2GB configurado"
echo ""
echo "📌 Próximos pasos:"
echo "   1. Cerrar sesión y conectar como usuario 'deploy'"
echo "   2. Clonar el repositorio en /home/deploy/portfolio"
echo "   3. Obtener certificado SSL:"
echo "      sudo certbot certonly --standalone -d api.santiagopalma.me"
echo "   4. Crear archivo .env con las variables de producción"
echo "   5. Ejecutar deploy.sh"
echo ""
echo "============================================================"
