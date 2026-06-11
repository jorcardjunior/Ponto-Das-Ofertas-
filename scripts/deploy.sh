#!/bin/bash
set -euo pipefail

# ============================================
# Deploy Script - Ponto das Ofertas
# ============================================
# Usage: bash scripts/deploy.sh
# Run this on a fresh Ubuntu 22.04/24.04 VPS
# ============================================

echo "🚀 Ponto das Ofertas - Deploy Script"
echo "======================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_DIR="/opt/ponto-ofertas"
DOMAIN=""

# --- Step 1: System Update & Docker Install ---
echo -e "\n${YELLOW}[1/8] Atualizando sistema e instalando Docker...${NC}"

sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw openssl

# Install Docker
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sudo sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}✅ Docker instalado${NC}"
else
    echo -e "${GREEN}✅ Docker já instalado${NC}"
fi

# Install Docker Compose
if ! docker compose version &> /dev/null; then
    sudo apt install -y docker-compose-plugin
fi

# --- Step 2: Firewall ---
echo -e "\n${YELLOW}[2/8] Configurando firewall...${NC}"

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
echo -e "${GREEN}✅ Firewall configurado (SSH + HTTP + HTTPS)${NC}"

# --- Step 3: Clone Repository ---
echo -e "\n${YELLOW}[3/8] Clonando repositório...${NC}"

if [ -d "$DEPLOY_DIR" ]; then
    cd "$DEPLOY_DIR"
    git pull origin main
    echo -e "${GREEN}✅ Repositório atualizado${NC}"
else
    sudo mkdir -p "$DEPLOY_DIR"
    sudo chown $USER:$USER "$DEPLOY_DIR"
    git clone https://github.com/jorcardjunior/Ponto-Das-Ofertas-.git "$DEPLOY_DIR"
    cd "$DEPLOY_DIR"
    echo -e "${GREEN}✅ Repositório clonado${NC}"
fi

# --- Step 4: Environment Variables ---
echo -e "\n${YELLOW}[4/8] Configurando variáveis de ambiente...${NC}"

if [ ! -f .env ]; then
    # Generate AUTH_SECRET
    AUTH_SECRET=$(openssl rand -base64 32)

    echo ""
    echo "Cole a URL do seu banco Neon PostgreSQL:"
    echo "Exemplo: postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require"
    read -p "DATABASE_URL: " DATABASE_URL

    # Basic validation
    if [[ ! "$DATABASE_URL" =~ ^postgresql:// ]]; then
        echo -e "${RED}❌ URL inválida. Deve começar com postgresql://${NC}"
        exit 1
    fi

    echo ""
    echo "Cole sua chave da xAI (deixe vazio para pular):"
    read -p "XAI_API_KEY: " XAI_API_KEY

    cat > .env << EOF
DATABASE_URL=${DATABASE_URL}
AUTH_SECRET=${AUTH_SECRET}
XAI_API_KEY=${XAI_API_KEY:-}
NODE_ENV=production
SKIP_ENV_VALIDATION=1
EOF

    echo -e "${GREEN}✅ Arquivo .env criado${NC}"
else
    echo -e "${GREEN}✅ Arquivo .env já existe${NC}"
fi

# --- Step 5: Domain & SSL ---
echo -e "\n${YELLOW}[5/8] Configurando domínio e SSL...${NC}"

echo "Digite seu domínio (ex: estoque.seudominio.com.br)"
echo "Deixe vazio para acessar via IP (sem SSL)"
read -p "Domínio: " DOMAIN

if [ -n "$DOMAIN" ]; then
    # Generate self-signed cert first so nginx can start
    mkdir -p nginx/certs
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/certs/privkey.pem \
        -out nginx/certs/fullchain.pem \
        -subj "/CN=${DOMAIN}" 2>/dev/null

    # Create nginx config with real domain
    cat > nginx/conf.d/default.conf << NGINX_EOF
# HTTP -> Redirect to HTTPS
server {
    listen 80;
    server_name ${DOMAIN};

    # For certbot challenge
    location /.well-known/acme-challenge/ {
        root /var/lib/letsencrypt;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

# HTTPS -> Reverse proxy to Next.js
server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    # SSL - self-signed first, replaced by certbot later
    ssl_certificate     /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    # Modern SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /_next/static/ {
        proxy_pass http://app:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /public/ {
        proxy_pass http://app:3000;
        add_header Cache-Control "public, max-age=2592000";
    }
}
NGINX_EOF

    # Update docker-compose to mount certs
    echo -e "${GREEN}✅ Configuração nginx criada para ${DOMAIN}${NC}"
else
    # No domain - use IP with self-signed cert
    mkdir -p nginx/certs
    IP=$(hostname -I | awk '{print $1}')
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/certs/privkey.pem \
        -out nginx/certs/fullchain.pem \
        -subj "/CN=${IP}" 2>/dev/null

    cat > nginx/conf.d/default.conf << NGINX_EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX_EOF
    echo -e "${GREEN}✅ Configuração HTTP criada para IP ${IP}${NC}"
    echo -e "${YELLOW}⚠️  Acesse via: http://${IP}${NC}"
fi

# --- Step 6: Build ---
echo -e "\n${YELLOW}[6/8] Buildando a imagem Docker...${NC}"

docker compose -f docker-compose.production.yml build
echo -e "${GREEN}✅ Imagem buildada${NC}"

# --- Step 7: Run Migrations & Start ---
echo -e "\n${YELLOW}[7/8] Executando migrações e iniciando containers...${NC}"

docker compose -f docker-compose.production.yml up -d
sleep 5

# Run migrations
docker compose -f docker-compose.production.yml exec -T app npx prisma migrate deploy
echo -e "${GREEN}✅ Migrações executadas e containers rodando${NC}"

# --- Step 8: Certbot SSL (only if domain provided) ---
if [ -n "$DOMAIN" ]; then
    echo -e "\n${YELLOW}[8/8] Obtendo certificado SSL com Let's Encrypt...${NC}"

    docker compose -f docker-compose.production.yml run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/lib/letsencrypt \
        --email "admin@${DOMAIN}" \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d "${DOMAIN}"

    # Update BOTH host-side and container-side config to use real cert
    sed -i "s|/etc/nginx/certs/fullchain.pem|/etc/letsencrypt/live/${DOMAIN}/fullchain.pem|g" nginx/conf.d/default.conf
    sed -i "s|/etc/nginx/certs/privkey.pem|/etc/letsencrypt/live/${DOMAIN}/privkey.pem|g" nginx/conf.d/default.conf

    # Reload nginx in the running container
    docker compose -f docker-compose.production.yml exec nginx nginx -s reload

    echo -e "${GREEN}✅ SSL configurado para https://${DOMAIN}${NC}"

    # Setup auto-reload for certbot renewal
    (crontab -l 2>/dev/null; echo "0 */12 * * * cd ${DEPLOY_DIR} && docker compose -f docker-compose.production.yml exec -T nginx nginx -s reload >> /var/log/nginx-reload.log 2>&1") | crontab -
    echo -e "${GREEN}✅ Cron de reload SSL configurado (a cada 12h)${NC}"
else
    echo -e "\n${YELLOW}[8/8] SSL não configurado (sem domínio)${NC}"
fi

# --- Done ---
echo ""
echo "======================================"
echo -e "${GREEN}🎉 Deploy concluído!${NC}"
echo "======================================"
echo ""
docker compose -f docker-compose.production.yml ps
echo ""
echo "📋 Comandos úteis:"
echo "  • Logs:     docker compose -f docker-compose.production.yml logs -f"
echo "  • Parar:    docker compose -f docker-compose.production.yml down"
echo "  • Atualizar: git pull && docker compose -f docker-compose.production.yml up -d --build"
echo "  • Migrar:   docker compose -f docker-compose.production.yml exec app npx prisma migrate deploy"
echo ""
if [ -n "$DOMAIN" ]; then
    echo "🔒 SSL: https://${DOMAIN}"
else
    echo "🌐 Acesse: http://$(hostname -I | awk '{print $1}')"
fi
echo ""
