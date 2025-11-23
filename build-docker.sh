#!/bin/bash

echo "🚀 Construction des images Docker..."
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build Backend
echo -e "${YELLOW}📦 Construction du backend...${NC}"
cd server
docker build -t conquete-backend:latest . 2>&1 | while IFS= read -r line; do
    if [[ $line == *"Step"* ]]; then
        echo -e "${GREEN}$line${NC}"
    elif [[ $line == *"RUN"* ]] || [[ $line == *"COPY"* ]]; then
        echo "  → $line"
    else
        echo "$line"
    fi
done
cd ..

echo ""
echo -e "${YELLOW}📦 Construction du frontend...${NC}"
cd client
docker build -t conquete-frontend:latest . 2>&1 | while IFS= read -r line; do
    if [[ $line == *"Step"* ]]; then
        echo -e "${GREEN}$line${NC}"
    elif [[ $line == *"RUN"* ]] || [[ $line == *"COPY"* ]]; then
        echo "  → $line"
    else
        echo "$line"
    fi
done
cd ..

echo ""
echo -e "${GREEN}✅ Build terminé !${NC}"
echo ""
echo "Pour démarrer les conteneurs:"
echo "  docker compose up -d"

