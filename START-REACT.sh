#!/bin/bash

echo "🌍 =========================================="
echo "   À LA CONQUÊTE DU MONDE - React Edition"
echo "=========================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo ""

# ============================================
# BACKEND
# ============================================
echo -e "${BLUE}📦 Configuration du Backend...${NC}"
cd server

# Installation des dépendances
if [ ! -d "node_modules" ]; then
    echo "   📥 Installation des dépendances backend..."
    npm install
    echo -e "${GREEN}   ✅ Dépendances backend installées${NC}"
else
    echo -e "${GREEN}   ✅ Dépendances backend déjà installées${NC}"
fi

# Prisma
if [ ! -f "dev.db" ]; then
    echo "   🗄️  Configuration de Prisma..."
    npx prisma generate
    echo -e "${GREEN}   ✅ Prisma client généré${NC}"
    
    echo "   🗄️  Création de la base de données..."
    npx prisma migrate dev --name init
    echo -e "${GREEN}   ✅ Base de données créée${NC}"
    
    echo "   🌱 Remplissage de la base de données..."
    node seed.js
    echo -e "${GREEN}   ✅ Articles ajoutés à la BDD${NC}"
else
    echo -e "${GREEN}   ✅ Base de données déjà configurée${NC}"
fi

echo ""

# ============================================
# FRONTEND
# ============================================
echo -e "${BLUE}🎨 Configuration du Frontend React...${NC}"
cd ../client

# Installation des dépendances
if [ ! -d "node_modules" ]; then
    echo "   📥 Installation des dépendances React..."
    npm install
    echo -e "${GREEN}   ✅ Dépendances React installées${NC}"
else
    echo -e "${GREEN}   ✅ Dépendances React déjà installées${NC}"
fi

# Copier les assets
if [ ! -d "public/assets" ]; then
    echo "   📸 Copie des images..."
    mkdir -p public
    cp -r ../assets public/
    echo -e "${GREEN}   ✅ Images copiées${NC}"
else
    echo -e "${GREEN}   ✅ Images déjà copiées${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}=========================================="
echo "   ✅ INSTALLATION TERMINÉE !"
echo "==========================================${NC}"
echo ""
echo -e "${YELLOW}🚀 Pour démarrer l'application, ouvrez 2 terminaux :${NC}"
echo ""
echo -e "${BLUE}📍 Terminal 1 - Backend :${NC}"
echo "   cd /root/Conquete/a-la-conquete-du-monde/server"
echo "   npm run dev"
echo ""
echo -e "${BLUE}📍 Terminal 2 - Frontend React :${NC}"
echo "   cd /root/Conquete/a-la-conquete-du-monde/client"
echo "   npm run dev"
echo ""
echo -e "${GREEN}Puis ouvrez : http://localhost:3000${NC}"
echo ""
echo "=========================================="
