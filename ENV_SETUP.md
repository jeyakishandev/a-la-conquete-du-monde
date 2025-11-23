# 🔧 Configuration des Variables d'Environnement

Ce fichier documente toutes les variables d'environnement nécessaires pour déployer l'application.

## 📋 Variables Requises

### Backend

```env
# Environnement
NODE_ENV=production

# Port du serveur
PORT=3001

# Base de données PostgreSQL
POSTGRES_DB=conquete
POSTGRES_USER=conquete_user
POSTGRES_PASSWORD=votre-mot-de-passe-securise
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}

# JWT Secret (Générez une clé sécurisée)
JWT_SECRET=votre-cle-secrete-super-longue-et-aleatoire

# URL du frontend (pour CORS)
FRONTEND_URL=https://votre-domaine.com
```

### Frontend

```env
# URL de l'API backend
VITE_API_URL=http://localhost:3001/api
# En production : VITE_API_URL=https://api.votre-domaine.com/api
```

## 🐳 Configuration Docker

Pour Docker Compose, créez un fichier `.env` à la racine du projet avec :

```env
# Database
POSTGRES_DB=conquete
POSTGRES_USER=conquete_user
POSTGRES_PASSWORD=votre-mot-de-passe-securise

# Backend
JWT_SECRET=votre-cle-secrete-super-longue-et-aleatoire
NODE_ENV=production

# Frontend
VITE_API_URL=http://backend:3001/api
```

## 🔐 Sécurité

⚠️ **IMPORTANT** :
- Ne jamais commiter le fichier `.env` avec de vraies valeurs
- Utilisez des mots de passe forts (minimum 16 caractères)
- Générez un JWT_SECRET aléatoire avec : `openssl rand -base64 32`
- En production, utilisez un gestionnaire de secrets (AWS Secrets Manager, HashiCorp Vault, etc.)

## 📝 Exemple de Génération de Clés

```bash
# Générer un JWT_SECRET sécurisé
openssl rand -base64 32

# Générer un mot de passe PostgreSQL
openssl rand -base64 24
```

