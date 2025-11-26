#!/bin/bash
# Script de build pour Render

set -e

echo "🔨 Installation des dépendances..."
npm install

echo "📦 Génération du client Prisma..."
npx prisma generate

echo "🗄️  Application des migrations..."
npx prisma db push --accept-data-loss || true

echo "🌱 Seeding de la base de données..."
npm run prisma:db:seed || npx prisma db seed || true

echo "✅ Build terminé !"

