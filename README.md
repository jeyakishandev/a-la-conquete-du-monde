# 🌍 À la Conquête du Monde

> **Fullstack Travel Blog Application** - React + Node.js + Express + Prisma

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Application en ligne

🌐 **Site déployé** : [https://conquete-frontend.onrender.com](https://conquete-frontend.onrender.com)

## 🎯 Aperçu

Application web fullstack moderne de blog de voyage. Ce projet démontre la mise en place d'une architecture complète frontend/backend avec déploiement en production, gestion de base de données, et bonnes pratiques de développement.

**Focus technique** : Architecture scalable, sécurité renforcée, gestion optimisée des connexions base de données, et déploiement cloud.

### 🚀 Déployé et en ligne

- **Site web** : [https://conquete-frontend.onrender.com](https://conquete-frontend.onrender.com)
- **Frontend** : Déployé sur Render
- **Backend API** : Déployé sur Render  
- **Base de données** : PostgreSQL via Supabase

## ✨ Fonctionnalités principales

### 🔐 Authentification & Sécurité
- Inscription/Connexion avec JWT
- Hashage des mots de passe (bcrypt)
- Validation et sanitisation des données
- Rate limiting contre les attaques
- Headers de sécurité (XSS, clickjacking, etc.)

### 📝 Gestion des Articles
- CRUD complet des articles
- Recherche et filtres par catégorie
- Système de catégories (destinations, aventure, culture, conseils)
- Gestion des images

### 💬 Interactions Sociales
- Système de likes et favoris
- Commentaires sur les articles
- Partage social (Facebook, Twitter, WhatsApp)
- Compteur de vues

### 👤 Profil Utilisateur
- Gestion du profil
- Statistiques personnelles
- Mes articles créés
- Mes favoris

### 🌍 Destinations
- Catalogue de destinations par continent
- **Carte interactive** avec Leaflet et OpenStreetMap
- Marqueurs cliquables avec informations des destinations
- Filtres interactifs
- Liens vers articles associés

### 🎨 Design
- Interface moderne avec Tailwind CSS
- Mode sombre/clair avec persistance
- Design responsive mobile-first
- Animations fluides

### 📱 Progressive Web App (PWA)
- Installation sur mobile et desktop
- Mode offline avec Service Worker
- Manifest.json configuré
- Notification d'installation automatique

### ⚡ Performance & SEO
- Lazy loading des pages et images
- Code splitting optimisé
- Meta tags SEO (Open Graph, Twitter Cards)
- Optimisation du build (minification, compression)

## 🛠️ Technologies

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - Client HTTP
- **Leaflet** - Cartes interactives
- **React Leaflet** - Intégration Leaflet avec React

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Gestion base de données
- **JWT** - Authentification
- **bcryptjs** - Hashage mots de passe

### Base de données
- **PostgreSQL** via Supabase
- **Prisma Migrate** - Migrations

### Déploiement
- **Render** - Hosting (Frontend + Backend)
- **Supabase** - Base de données PostgreSQL
- **Docker** - Containerisation (développement)

## 🏆 Points forts techniques

- ✅ **Architecture modulaire** : Monorepo bien structuré (client/server séparés)
- ✅ **API RESTful** : Routes modulaires avec middleware personnalisés
- ✅ **Gestion optimisée des connexions** : Instance PrismaClient singleton pour Supabase
- ✅ **Sécurité renforcée** : Validation double (client/serveur), rate limiting, sanitisation
- ✅ **Performance** : Lazy loading, code splitting, optimisation des images, PWA
- ✅ **SEO optimisé** : Meta tags, Open Graph, Twitter Cards, robots.txt
- ✅ **Cartes interactives** : Intégration Leaflet pour visualisation des destinations
- ✅ **UX optimale** : Mode sombre/clair, animations, feedback utilisateur, notifications backend
- ✅ **Qualité du code** : Tests unitaires, ESLint, Prettier, validation à 99% de couverture

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- PostgreSQL (ou utiliser Supabase)

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/jeyakishandev/a-la-conquete-du-monde.git
cd a-la-conquete-du-monde

# Installation des dépendances
npm run install:all

# Configuration de la base de données
cd server
npx prisma migrate dev
npx prisma db seed

# Démarrage en développement
npm run dev
```

### Compte de test

Un compte utilisateur est créé automatiquement lors du seed :
- **Email** : `test@example.com`
- **Username** : `testuser`
- **Password** : `test123`

## 🐳 Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Services disponibles
# Frontend : http://localhost:3000
# Backend : http://localhost:3001
# Database : localhost:5432
```

## 📱 API Principale

```
GET    /api/articles          # Liste des articles
POST   /api/articles          # Créer un article
GET    /api/articles/:id      # Détail d'un article
PUT    /api/articles/:id      # Modifier un article
DELETE /api/articles/:id      # Supprimer un article

POST   /api/auth/register     # Inscription
POST   /api/auth/login        # Connexion

POST   /api/likes/toggle/:id  # Toggle like
POST   /api/favorites/toggle/:id # Toggle favori
GET    /api/comments/article/:id # Commentaires
POST   /api/comments          # Ajouter commentaire

GET    /api/users/profile     # Profil utilisateur
GET    /api/users/stats       # Statistiques utilisateur
```

## 🏗️ Architecture

```
a-la-conquete-du-monde/
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── services/    # Services API
│   │   └── context/     # Context providers
│   └── public/          # Assets statiques
├── server/              # Backend Node.js
│   ├── routes/          # Routes API
│   ├── middleware/      # Middlewares (auth, validation)
│   ├── prisma/         # Schéma Prisma
│   └── db.js           # Instance PrismaClient singleton
├── docker-compose.yml   # Configuration Docker
└── render.yaml         # Configuration Render
```

## 📦 Variables d'environnement

### Backend
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://...
```

### Frontend
```env
VITE_API_URL=https://api-url.com/api
```

## 🧪 Tests et Qualité du Code

### Tests Backend
- **Jest** : Framework de test unitaire
- **Supertest** : Tests d'intégration des routes API
- **Couverture** : 99% pour les utilitaires de validation
- **Scripts disponibles** :
  ```bash
  npm test              # Exécuter tous les tests avec couverture
  npm test:watch        # Mode watch pour développement
  ```

### Tests Frontend
- **Vitest** : Framework de test moderne et rapide
- **Testing Library** : Tests de composants React
- **Scripts disponibles** :
  ```bash
  npm test              # Exécuter tous les tests
  npm test:ui           # Interface graphique pour les tests
  npm test:coverage     # Tests avec rapport de couverture
  ```

### Outils de qualité
- **ESLint** : Linting du code (backend et frontend)
- **Prettier** : Formatage automatique du code
- **Scripts disponibles** :
  ```bash
  npm run lint          # Vérifier le code
  npm run lint:fix      # Corriger automatiquement
  npm run format        # Formater le code
  ```

## 🔧 Défis techniques résolus

1. **Gestion des connexions Prisma avec Supabase** : Implémentation d'une instance singleton avec support du connection pooler (PGBouncer)
2. **Synchronisation frontend/backend** : Configuration des variables d'environnement pour communication fluide + notification utilisateur pendant le démarrage du backend
3. **Seed automatique** : Système qui exécute automatiquement le seed au premier démarrage si la base est vide
4. **PWA et Performance** : Implémentation complète d'une PWA avec Service Worker, lazy loading, et optimisations de build
5. **Cartes interactives** : Intégration Leaflet avec gestion des coordonnées et popups interactives
6. **Tests et qualité** : Mise en place de tests unitaires complets et outils de linting/formatage pour maintenir la qualité du code

## 📄 Licence

MIT License

## 👨‍💻 Auteur

**Jeya Kishan Karunanithy**
- GitHub: [@jeyakishandev](https://github.com/jeyakishandev)
- LinkedIn: [Jeya Kishan Karunanithy](https://www.linkedin.com/in/jeya-kishan-karunanithy)
- Email: k.jeyakishan@gmail.com

---

<div align="center">

**Fait avec ❤️**

[⬆ Retour en haut](#-à-la-conquête-du-monde)

</div>
