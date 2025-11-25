# 🌍 À la Conquête du Monde

> **Fullstack Travel Blog Application** - React + Node.js + Express + Prisma

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://docker.com/)

## 📋 Table des matières

- [🎯 Aperçu](#-aperçu)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies](#️-technologies)
- [🚀 Installation](#-installation)
- [🐳 Docker](#-docker)
- [📱 API Documentation](#-api-documentation)
- [🎨 Screenshots](#-screenshots)
- [🧪 Tests](#-tests)
- [📦 Déploiement](#-déploiement)
- [🤝 Contribution](#-contribution)

## 🎯 Aperçu

**À la Conquête du Monde** est une application web fullstack moderne qui permet aux utilisateurs de découvrir et partager des récits de voyage. 

*J'ai développé cette application pour mettre en pratique mes compétences en React, Node.js et les technologies modernes. L'objectif était de créer une expérience utilisateur fluide avec un design responsive et un mode sombre/clair qui s'adapte aux préférences de chaque utilisateur.*

### 🎨 Design Features
- **Interface moderne** avec Tailwind CSS
- **Mode sombre/clair** avec transitions fluides
- **Design responsive** mobile-first
- **Animations** et micro-interactions
- **Glass-morphism** et effets de flou

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- [x] Inscription/Connexion utilisateur sécurisée
- [x] JWT Authentication avec expiration
- [x] Hashage des mots de passe (bcrypt, 12 rounds)
- [x] Validation stricte des données (email, username, password)
- [x] Sanitisation de toutes les entrées
- [x] Rate limiting contre les attaques par force brute
- [x] Protection contre les attaques par timing
- [x] Headers de sécurité (XSS, clickjacking, etc.)
- [x] Middleware d'authentification pour protéger les routes
- [x] Validation côté client et serveur (double validation)

### 📝 Gestion des Articles
- [x] CRUD complet des articles
- [x] Système de catégories
- [x] Recherche et filtres
- [x] Pagination
- [x] Images et médias

### 💬 Interactions Sociales
- [x] Système de likes
- [x] Favoris utilisateur
- [x] Commentaires
- [x] Partage social (Facebook, Twitter, WhatsApp)

### 🌍 Destinations
- [x] Catalogue de destinations
- [x] Filtres par continent
- [x] Guides détaillés
- [x] Points d'intérêt

### 📊 Analytics
- [x] Compteur de vues
- [x] Statistiques d'engagement
- [x] Métriques de performance

## 🧠 Défis techniques rencontrés

### Gestion de l'état global
*Le plus gros défi a été de gérer l'état entre les composants React sans utiliser Redux. J'ai opté pour une approche avec des hooks personnalisés et du localStorage pour persister certaines données.*

### Optimisation des performances
*L'implémentation de la pagination côté client et serveur a nécessité plusieurs itérations pour trouver le bon équilibre entre performance et expérience utilisateur.*

### Mode sombre/clair
*La transition entre les modes a été complexe à implémenter proprement. J'ai dû créer un système de classes CSS dynamiques avec Tailwind pour gérer les transitions fluides.*

## 📈 Apprentissages et améliorations futures

### Ce que j'ai appris
- **Prisma ORM** : Excellente alternative à Sequelize, plus moderne et type-safe
- **Docker** : Containerisation qui simplifie énormément le déploiement
- **Tailwind CSS** : Framework CSS qui accélère le développement une fois maîtrisé
- **React Router v6** : Nouvelle API plus intuitive que la v5

### Améliorations prévues
- [ ] **Tests E2E** avec Playwright pour une couverture complète
- [ ] **PWA** pour une expérience mobile native
- [ ] **WebSockets** pour les notifications en temps réel
- [ ] **Microservices** pour une architecture plus scalable

## 🛠️ Technologies

### Frontend
- **React 18** - Bibliothèque UI moderne
- **Vite** - Build tool rapide
- **React Router** - Navigation SPA
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Client HTTP
- **Zustand** - Gestion d'état légère

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Base de données moderne
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **express-validator** - Validation des données

### Base de données
- **SQLite** (développement)
- **PostgreSQL** (production)
- **Prisma Migrate** - Migrations
- **Prisma Studio** - Interface admin

### DevOps & Déploiement
- **Docker** - Containerisation
- **Docker Compose** - Orchestration
- **Nginx** - Reverse proxy
- **Redis** - Cache et sessions

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Git

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/username/a-la-conquete-du-monde.git
cd a-la-conquete-du-monde

# Installation des dépendances
npm run install:all

# Configuration de la base de données
cd server
npx prisma migrate dev
npx prisma db seed

# Démarrage en mode développement
npm run dev
```

### Scripts disponibles

```bash
# Installation complète
npm run install:all

# Démarrage backend
npm run dev:backend

# Démarrage frontend
npm run dev:frontend

# Démarrage complet
npm run dev

# Build production
npm run build

# Tests
npm run test
```

## 🔑 Compte de test

Pour tester l'application, un compte utilisateur est créé automatiquement lors du seed de la base de données :

- **Email :** `test@example.com`
- **Username :** `testuser`
- **Password :** `test123`

> ⚠️ **Note :** Ce compte est uniquement destiné au développement et aux tests. Ne l'utilisez pas en production.

## 🐳 Docker

### Démarrage rapide avec Docker

```bash
# Cloner le repository
git clone https://github.com/username/a-la-conquete-du-monde.git
cd a-la-conquete-du-monde

# Démarrer tous les services
docker-compose up -d

# Vérifier les services
docker-compose ps

# Voir les logs
docker-compose logs -f
```

### Services Docker

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:3001
- **Database** : localhost:5432
- **Redis** : localhost:6379

### Commandes Docker utiles

```bash
# Rebuild les images
docker-compose build --no-cache

# Redémarrer un service
docker-compose restart backend

# Voir les logs d'un service
docker-compose logs -f frontend

# Arrêter tous les services
docker-compose down

# Nettoyer les volumes
docker-compose down -v
```

## 📱 API Documentation

### Endpoints principaux

#### Articles
```http
GET    /api/articles          # Liste des articles
POST   /api/articles          # Créer un article
GET    /api/articles/:id      # Détail d'un article
PUT    /api/articles/:id      # Modifier un article
DELETE /api/articles/:id      # Supprimer un article
```

#### Authentification
```http
POST   /api/auth/register     # Inscription
POST   /api/auth/login        # Connexion
GET    /api/auth/profile      # Profil utilisateur
```

#### Interactions
```http
POST   /api/likes/toggle/:id  # Toggle like
POST   /api/favorites/toggle/:id # Toggle favori
GET    /api/comments/article/:id # Commentaires
POST   /api/comments          # Ajouter commentaire
```

### Exemple de réponse API

```json
{
  "id": 1,
  "title": "Les 5 destinations incontournables en 2024",
  "description": "Découvrez les destinations qui vont marquer cette année...",
  "content": "2024 s'annonce comme une année exceptionnelle...",
  "category": "destinations",
  "image": "assets/images/voyage.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "_count": {
    "likes": 42,
    "comments": 8
  }
}
```

## 🎨 Screenshots

### 🏠 Page d'accueil - Landing Page
![Homepage](screenshots/homepage.png)
*Interface moderne avec hero section, statistiques et articles récents*

### 🌙 Mode sombre
![Dark Mode](screenshots/dark-mode.png)
*Thème sombre avec transitions fluides et couleurs cohérentes*

### 📚 Page Blog
![Blog](screenshots/blog.png)
*Interface complète avec recherche, filtres et pagination*

### 🌍 Destinations
![Destinations](screenshots/destinations.png)
*Catalogue interactif avec filtres par continent*

### 📱 Version Mobile
![Mobile](screenshots/mobile.png)
*Design responsive optimisé pour mobile*

## 🧪 Tests

### Tests unitaires
```bash
# Tests frontend
cd client
npm test

# Tests backend
cd server
npm test

# Tests avec coverage
npm run test:coverage
```

### Tests d'intégration
```bash
# Tests API
npm run test:api

# Tests E2E
npm run test:e2e
```

## 📦 Déploiement

### Variables d'environnement

#### Backend

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

#### Frontend

```env
# URL de l'API backend
VITE_API_URL=http://localhost:3001/api
# En production : VITE_API_URL=https://api.votre-domaine.com/api
```

#### Configuration Docker

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

#### 🔐 Sécurité

Cette application implémente plusieurs mesures de sécurité pour protéger les utilisateurs et les données :

##### ✅ Mesures de sécurité implémentées

**Authentification & Autorisation**
- ✅ **JWT (JSON Web Tokens)** pour l'authentification sécurisée
- ✅ **Middleware d'authentification** pour protéger les routes
- ✅ **Validation des tokens** avec gestion des erreurs (expiration, invalide)
- ✅ **Hashage des mots de passe** avec bcrypt (12 rounds)
- ✅ **Tokens avec expiration** (7 jours au lieu de 30 pour plus de sécurité)

**Validation & Sanitisation**
- ✅ **Validation stricte des emails** avec regex
- ✅ **Validation des noms d'utilisateur** (3-20 caractères alphanumériques)
- ✅ **Validation des mots de passe forts** (minimum 8 caractères, majuscule, minuscule, chiffre, caractère spécial)
- ✅ **Sanitisation de toutes les entrées** utilisateur
- ✅ **Validation côté client ET serveur** (double validation)

**Protection contre les attaques**
- ✅ **Rate limiting** personnalisé pour protéger contre les attaques par force brute
  - 5 tentatives de connexion par 15 minutes
  - 3 inscriptions par heure par IP
- ✅ **Protection contre les attaques par timing** (délai aléatoire même en cas d'échec)
- ✅ **Messages d'erreur génériques** pour ne pas révéler si un email existe

**Headers de sécurité**
- ✅ **X-Content-Type-Options: nosniff** - Protection contre le sniffing
- ✅ **X-Frame-Options: DENY** - Protection contre le clickjacking
- ✅ **X-XSS-Protection** - Protection XSS
- ✅ **Referrer-Policy** - Contrôle des informations de référent
- ✅ **Content-Security-Policy** (en production)
- ✅ **Désactivation du cache** pour les routes d'authentification

**CORS & Proxy**
- ✅ **Configuration CORS** stricte avec origines autorisées
- ✅ **Trust proxy** configuré pour obtenir les vraies IPs (important pour le rate limiting)

##### ⚠️ Configuration de production

**IMPORTANT** :
- Ne jamais commiter le fichier `.env` avec de vraies valeurs
- Utilisez des mots de passe forts (minimum 12 caractères avec complexité)
- Générez un JWT_SECRET aléatoire avec : `openssl rand -base64 32` (minimum 32 caractères)
- En production, utilisez un gestionnaire de secrets (AWS Secrets Manager, HashiCorp Vault, etc.)
- Configurez des variables d'environnement différentes pour chaque environnement

##### 📋 Variables d'environnement requises

```bash
# Base de données
DATABASE_URL=postgresql://user:password@host:port/database

# Sécurité
JWT_SECRET=<générez-une-clé-aléatoire-forte-minimum-32-caractères>

# Configuration
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://votre-domaine.com
```

##### 🔒 Bonnes pratiques

1. **Mots de passe** : Utilisez un gestionnaire de mots de passe et des mots de passe uniques
2. **JWT_SECRET** : Changez-le régulièrement et ne le partagez jamais
3. **HTTPS** : Utilisez toujours HTTPS en production
4. **Rate limiting** : Surveillez les tentatives d'attaque dans les logs
5. **Logs** : Ne loguez jamais les mots de passe ou tokens en clair

#### 📝 Génération de Clés

```bash
# Générer un JWT_SECRET sécurisé
openssl rand -base64 32

# Générer un mot de passe PostgreSQL
openssl rand -base64 24
```

### Déploiement avec Docker

```bash
# Build production
docker-compose -f docker-compose.prod.yml up -d

# Vérifier le déploiement
curl http://localhost:3000/api/health
```

### Déploiement sur Vercel/Netlify

```bash
# Build frontend
cd client
npm run build

# Déployer
vercel --prod
```

### Déploiement Cloud Simple (Recommandé)

#### Railway.app (Gratuit pour commencer)
1. Créer un compte sur [Railway.app](https://railway.app)
2. Connecter ton repo GitHub
3. Railway détecte automatiquement Node.js
4. Ajouter une base PostgreSQL
5. Configurer les variables d'environnement
6. Déployer automatiquement !

#### Render.com (Gratuit)
1. Créer un compte sur [Render.com](https://render.com)
2. Créer un "Web Service" pour le backend
3. Créer un "Static Site" pour le frontend
4. Ajouter une base PostgreSQL
5. Configurer les variables d'environnement

#### Vercel (Frontend) + Railway (Backend)
- **Frontend** : Déployer sur Vercel (gratuit, très rapide)
- **Backend** : Déployer sur Railway ou Render

## 🏗️ Architecture

```
a-la-conquete-du-monde/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── hooks/         # Hooks personnalisés
│   │   └── utils/         # Utilitaires
│   ├── public/            # Assets statiques
│   └── Dockerfile         # Container frontend
├── server/                 # Backend Node.js
│   ├── routes/            # Routes API
│   ├── middleware/        # Middlewares
│   ├── prisma/           # Schéma et migrations
│   └── Dockerfile        # Container backend
├── docker-compose.yml     # Orchestration
└── README.md             # Documentation
```

## 🤝 Contribution

### Workflow de développement

1. **Fork** le repository
2. **Clone** votre fork
3. **Créer** une branche feature
4. **Commiter** vos changements
5. **Pusher** vers votre fork
6. **Créer** une Pull Request

### Standards de code

- **ESLint** pour le linting
- **Prettier** pour le formatting
- **Conventional Commits** pour les messages
- **Tests** obligatoires pour les nouvelles fonctionnalités

### Guidelines

- Code en français pour les commentaires
- Documentation en français
- Tests en anglais
- Messages de commit en français

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Développeur Fullstack passionné par les technologies web**
- GitHub: [@jeyakishandev](https://github.com/jeyakishandev)
- LinkedIn: [Jeya Kishan Karunanithy](https://www.linkedin.com/in/jeya-kishan-karunanithy)
- Email: k.jeyakishan@gmail.com

*Ce projet a été développé avec passion pour explorer les dernières technologies web et créer une expérience utilisateur moderne.*

---

<div align="center">

**Fait avec ❤️ en France**

[⬆ Retour en haut](#-à-la-conquête-du-monde)

</div>
