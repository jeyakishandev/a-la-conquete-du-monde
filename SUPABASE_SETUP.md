# 🚀 Configuration Supabase pour Conquête du Monde

## Étape 1 : Créer le Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous / Créez un compte
3. Cliquez sur "New Project"
4. Remplissez :
   - **Name** : `conquete-du-monde`
   - **Database Password** : *(choisissez un mot de passe fort, notez-le !)*
   - **Region** : *(choisissez la région la plus proche)*
   - **Plan** : Free
5. Cliquez sur "Create new project"
6. ⏳ Attendez 2-3 minutes

## Étape 2 : Récupérer l'URL de Connexion

1. Dans votre projet Supabase → **Settings** (icône engrenage)
2. **Database** → **Connection string**
3. Sélectionnez **"URI"** (pas Session mode)
4. Copiez l'URL et remplacez `[YOUR-PASSWORD]` par votre mot de passe

**Exemple** :
```
postgresql://postgres:votre_mot_de_passe@db.xxxxx.supabase.co:5432/postgres
```

## Étape 3 : Créer le Schéma "conquete"

1. Dans Supabase, allez dans **SQL Editor** (icône SQL dans le menu de gauche)
2. Exécutez cette commande SQL :

```sql
CREATE SCHEMA IF NOT EXISTS conquete;
```

3. Cliquez sur "Run" (ou Ctrl+Enter)

## Étape 4 : Tester la Connexion en Local

1. Créez un fichier `.env` dans le dossier `server` :
```bash
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@db.xxxxx.supabase.co:5432/postgres"
```

2. Testez la connexion :
```bash
cd server
npx prisma generate
npx prisma db push
```

3. Si ça fonctionne, vous verrez les tables créées dans Supabase :
   - Allez dans **Table Editor** dans Supabase
   - Vous devriez voir les tables : `User`, `Article`, `Comment`, `Like`, `Favorite`

## Étape 5 : Déployer le Backend (Render ou Railway)

### Option A : Render

1. Créez un nouveau **Web Service** sur Render
2. Configurez :
   - **Root Directory** : `server`
   - **Build Command** : `npm install && npx prisma generate && npx prisma db push --accept-data-loss && npm run prisma:db:seed || npx prisma db seed || true`
   - **Start Command** : `npm start`
3. Variables d'environnement :
   - `DATABASE_URL` = *(l'URL Supabase que vous avez copiée)*
   - `JWT_SECRET` = *(générez une clé : `openssl rand -base64 32`)*
   - `NODE_ENV` = `production`
   - `PORT` = `10000`

### Option B : Railway

1. Créez un nouveau **Service** sur Railway
2. Connectez votre dépôt Git
3. Configurez :
   - **Root Directory** : `server`
   - **Build Command** : `npm install && npx prisma generate && npx prisma db push --accept-data-loss && npm run prisma:db:seed || npx prisma db seed || true`
   - **Start Command** : `npm start`
4. Variables d'environnement :
   - `DATABASE_URL` = *(l'URL Supabase)*
   - `JWT_SECRET` = *(générez une clé)*
   - `NODE_ENV` = `production`
   - `PORT` = *(Railway définit automatiquement)*

## Étape 6 : Déployer le Frontend

1. Créez un **Static Site** sur Render ou Railway
2. Configurez :
   - **Root Directory** : `client`
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`
3. Variable d'environnement :
   - `VITE_API_URL` = `https://votre-backend.onrender.com/api` (ou votre URL Railway)

## ✅ Vérification

1. Backend : `https://votre-backend.onrender.com/api/health`
2. Frontend : `https://votre-frontend.onrender.com`
3. Base de données : Vérifiez dans Supabase → Table Editor

---

**C'est tout ! Votre application est déployée avec Supabase ! 🎉**

