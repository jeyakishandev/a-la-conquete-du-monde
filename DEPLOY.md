# 🚀 Guide de Déploiement sur Render

Ce guide vous explique comment déployer l'application **À la Conquête du Monde** sur Render.

## 📋 Prérequis

1. Un compte [Render](https://render.com) (gratuit ou payant)
2. Un dépôt Git (GitHub, GitLab, ou Bitbucket) avec votre code
3. Les fichiers de configuration sont déjà créés dans le projet

## 🗄️ Étape 1 : Créer la Base de Données PostgreSQL

1. Connectez-vous à votre [dashboard Render](https://dashboard.render.com)
2. Cliquez sur **"New +"** → **"PostgreSQL"**
3. Configurez :
   - **Name** : `conquete-db`
   - **Database** : `conquete`
   - **User** : `conquete_user`
   - **Plan** : `Free` (pour commencer) ou `Starter` (recommandé pour la production)
4. Cliquez sur **"Create Database"**
5. **Important** : Notez l'**Internal Database URL** qui sera utilisée par le backend

## 🔧 Étape 2 : Déployer le Backend

1. Dans le dashboard Render, cliquez sur **"New +"** → **"Web Service"**
2. Connectez votre dépôt Git
3. Configurez le service :
   - **Name** : `conquete-backend`
   - **Environment** : `Node`
   - **Region** : Choisissez la région la plus proche
   - **Branch** : `main` (ou votre branche principale)
   - **Root Directory** : `server`
   - **Build Command** : `npm install && npx prisma generate && npx prisma db push`
   - **Start Command** : `npm start`
   - **Plan** : `Free` (pour commencer) ou `Starter` (recommandé)

4. **Variables d'environnement** :
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render utilise ce port par défaut)
   - `DATABASE_URL` = L'URL interne de votre base de données PostgreSQL (copiez depuis la section "Internal Database URL")
   - `JWT_SECRET` = Générez une clé secrète aléatoire (ex: `openssl rand -base64 32`)
   - `FRONTEND_URL` = L'URL de votre frontend (vous l'ajouterez après avoir déployé le frontend)

5. Cliquez sur **"Create Web Service"**

6. **Après le déploiement** :
   - Notez l'URL de votre backend (ex: `https://conquete-backend.onrender.com`)
   - Le backend va automatiquement créer les tables et seeder la base de données

## 🎨 Étape 3 : Déployer le Frontend

1. Dans le dashboard Render, cliquez sur **"New +"** → **"Static Site"**
2. Connectez votre dépôt Git
3. Configurez le site :
   - **Name** : `conquete-frontend`
   - **Branch** : `main` (ou votre branche principale)
   - **Root Directory** : `client`
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`
   - **Plan** : `Free` (pour commencer)

4. **Variables d'environnement** :
   - `VITE_API_URL` = L'URL complète de votre backend + `/api` (ex: `https://conquete-backend.onrender.com/api`)

5. Cliquez sur **"Create Static Site"**

6. **Important** : Après le déploiement, mettez à jour la variable `FRONTEND_URL` dans le backend avec l'URL de votre frontend

## 🔄 Étape 4 : Configuration Finale

### Mettre à jour CORS dans le Backend

1. Retournez dans les paramètres de votre service backend
2. Modifiez la variable `FRONTEND_URL` :
   - Ajoutez l'URL de votre frontend (ex: `https://conquete-frontend.onrender.com`)
   - Vous pouvez ajouter plusieurs URLs séparées par des virgules

### Vérifier les Routes

- **Backend API** : `https://votre-backend.onrender.com/api`
- **Frontend** : `https://votre-frontend.onrender.com`
- **Health Check** : `https://votre-backend.onrender.com/api/health`

## 🐛 Dépannage

### Le backend ne démarre pas

- Vérifiez les logs dans le dashboard Render
- Assurez-vous que `DATABASE_URL` est correcte
- Vérifiez que `PORT` est défini à `10000`
- Vérifiez que Prisma a bien généré le client : `npx prisma generate`

### Le frontend ne peut pas se connecter au backend

- Vérifiez que `VITE_API_URL` est correcte (URL complète avec `/api`)
- Vérifiez que CORS est configuré correctement dans le backend
- Vérifiez que `FRONTEND_URL` dans le backend correspond à l'URL du frontend

### Erreurs de base de données

- Vérifiez que la base de données est bien créée et accessible
- Vérifiez que `DATABASE_URL` utilise l'URL interne (pas l'URL externe)
- Vérifiez les logs du backend pour les erreurs Prisma

## 📝 Notes Importantes

1. **Plan Free** : Les services gratuits s'endorment après 15 minutes d'inactivité. Le premier démarrage peut prendre 30-60 secondes.

2. **Variables d'environnement** : Ne commitez jamais vos fichiers `.env` dans Git. Utilisez les variables d'environnement de Render.

3. **Base de données** : Le plan Free de PostgreSQL a des limitations (90 jours, 1GB max). Pour la production, utilisez le plan Starter.

4. **Build** : Le premier build peut prendre plusieurs minutes. Les builds suivants seront plus rapides grâce au cache.

5. **HTTPS** : Render fournit automatiquement HTTPS pour tous les services.

## 🔐 Sécurité

- Utilisez des clés secrètes fortes pour `JWT_SECRET`
- Ne partagez jamais vos variables d'environnement
- Utilisez l'URL interne de la base de données (pas l'URL externe)
- Configurez correctement CORS pour limiter les origines autorisées

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Guide PostgreSQL sur Render](https://render.com/docs/databases)
- [Déploiement Node.js sur Render](https://render.com/docs/node)

---

**Bon déploiement ! 🌍**

