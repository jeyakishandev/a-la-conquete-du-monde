# 🚀 Guide Complet Supabase - Étape par Étape

## ✅ Étape 1 : Créer le Projet Supabase (DÉJÀ FAIT)

Vous avez déjà créé votre projet : `exexrygvlfrunugddwyw.supabase.co` ✅

---

## 📋 Étape 2 : Récupérer l'URL de Connexion PostgreSQL

### Méthode 1 : Via Settings → Database

1. Dans Supabase, cliquez sur **Settings** (icône engrenage en bas à gauche)
2. Cliquez sur **"Database"** dans le menu
3. Faites défiler jusqu'à trouver **"Connection string"** ou **"Connection pooling"**
4. Vous verrez plusieurs onglets :
   - **URI** (connexion directe)
   - **Session mode** (pooler)
   - **Transaction mode** (pooler)

### Pour Prisma, utilisez l'URL "URI" (connexion directe)

L'URL devrait ressembler à :
```
postgresql://postgres:[YOUR-PASSWORD]@db.exexrygvlfrunugddwyw.supabase.co:5432/postgres
```

**Important** : Remplacez `[YOUR-PASSWORD]` par le mot de passe que vous avez choisi lors de la création du projet.

### Si vous ne trouvez pas "Connection string"

1. Allez dans **Settings** → **API**
2. Cherchez la section **"Database"** ou **"Connection string"**
3. Ou utilisez cette URL en remplaçant le mot de passe :
   ```
   postgresql://postgres:[VOTRE-MOT-DE-PASSE]@db.exexrygvlfrunugddwyw.supabase.co:5432/postgres
   ```

---

## 🗄️ Étape 3 : Créer le Schéma "conquete"

1. Dans Supabase, cliquez sur **"SQL Editor"** (icône SQL dans le menu de gauche)
2. Cliquez sur **"New query"**
3. Collez cette commande :
   ```sql
   CREATE SCHEMA IF NOT EXISTS conquete;
   ```
4. Cliquez sur **"Run"** (ou appuyez sur Ctrl+Enter)
5. Vous devriez voir : **"Success. No rows returned"** ✅

---

## 🔧 Étape 4 : Configurer Prisma

Le schéma Prisma est déjà configuré avec :
- ✅ Schéma "conquete" défini
- ✅ Fonctionnalité preview "multiSchema" activée

---

## 🧪 Étape 5 : Tester la Connexion

### Option A : Tester depuis Render (Recommandé)

Au lieu de tester en local (qui peut avoir des problèmes de réseau), déployons directement sur Render qui aura accès à Supabase.

### Option B : Tester en Local (si vous voulez)

1. Créez/modifiez le fichier `.env` dans `server/` :
   ```bash
   DATABASE_URL="postgresql://postgres:votre_mot_de_passe@db.exexrygvlfrunugddwyw.supabase.co:5432/postgres?sslmode=require"
   ```

2. Testez :
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

---

## 🚀 Étape 6 : Déployer sur Render

### 6.1 : Créer le Service Backend

1. Allez sur [dashboard.render.com](https://dashboard.render.com)
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre dépôt Git (si pas déjà fait)
4. Sélectionnez le dépôt `a-la-conquete-du-monde`

### 6.2 : Configuration du Service

Remplissez comme ça :
```
Name: conquete-backend
Region: (choisissez la région la plus proche)
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install && npx prisma generate && npx prisma db push --accept-data-loss && npm run prisma:db:seed || npx prisma db seed || true
Start Command: npm start
Instance Type: Free (ou Starter)
```

### 6.3 : Variables d'Environnement

Cliquez sur **"Advanced"** → **"Add Environment Variable"** et ajoutez :

| Clé | Valeur |
|-----|--------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `DATABASE_URL` | `postgresql://postgres:votre_mot_de_passe@db.exexrygvlfrunugddwyw.supabase.co:5432/postgres?sslmode=require` |
| `JWT_SECRET` | *(Générez : `openssl rand -base64 32`)* |
| `FRONTEND_URL` | *(Laissez vide pour l'instant)* |

**Important** : Remplacez `votre_mot_de_passe` par votre vrai mot de passe Supabase !

### 6.4 : Créer le Service

Cliquez sur **"Create Web Service"** et attendez 5-10 minutes.

---

## ✅ Étape 7 : Vérification

1. Une fois déployé, notez l'URL de votre backend (ex: `https://conquete-backend.onrender.com`)
2. Testez : `https://votre-backend.onrender.com/api/health`
3. Vous devriez voir : `{"status":"OK",...}`

---

## 🎨 Étape 8 : Déployer le Frontend

1. Dans Render, créez un **"Static Site"**
2. Configurez :
   - **Root Directory** : `client`
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`
3. Variable d'environnement :
   - `VITE_API_URL` = `https://votre-backend.onrender.com/api`

---

## 🐛 Problèmes Courants

### Erreur de connexion à la base de données
- Vérifiez que le mot de passe est correct dans `DATABASE_URL`
- Ajoutez `?sslmode=require` à la fin de l'URL
- Vérifiez que le schéma "conquete" est créé dans Supabase

### Erreur Prisma "multiSchema"
- Le schéma est déjà configuré avec `previewFeatures = ["multiSchema"]` ✅

---

**C'est tout ! Suivez ces étapes dans l'ordre. 🎉**

