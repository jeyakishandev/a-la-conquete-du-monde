#!/bin/bash
# Script pour reconstruire le frontend sans BuildKit (évite les problèmes de timeout TLS)

echo "🔨 Reconstruction du frontend..."
DOCKER_BUILDKIT=0 docker compose build frontend

if [ $? -eq 0 ]; then
    echo "✅ Build réussi ! Redémarrage du container..."
    docker compose up -d frontend
    echo "✅ Frontend redémarré avec succès !"
    echo "🌐 Accessible sur http://localhost:3000"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

