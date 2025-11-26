# 🚀 Guide Étape par Étape - Déploiement sur Render

## 📋 Étape 0 : Préparation

### ✅ Vérifications avant de commencer

1. **Votre code est-il sur GitHub/GitLab/Bitbucket ?**
   - ✅ Oui → Passez à l'Étape 1
   - ❌ Non → Poussez d'abord votre code :
     ```bash
     git add .
     git commit -m "Préparation déploiement Render"
     git push origin main
     ```

2. **Avez-vous un compte Render ?**
   - ✅ Oui → Passez à l'Étape 1
   - ❌ Non → Créez un compte sur [render.com](https://render.com) (gratuit)

---

## 🗄️ ÉTAPE 1 : Créer la Base de Données PostgreSQL

### Actions à faire :

1. **Ouvrez votre navigateur** et allez sur [dashboard.render.com](https://dashboard.render.com)

2. **Connectez-vous** à votre compte Render

3. **Cliquez sur le bouton bleu "New +"** (en haut à droite)

4. **Sélectionnez "PostgreSQL"** dans le menu déroulant

5. **Remplissez le formulaire** :
   ```
   Name: conquete-db
   Database: conquete
   User: conquete_user
   Region: (choisissez la région la plus proche de vous)
   PostgreSQL Version: 15 (ou la dernière version)
   Plan: Free (pour tester) ou Starter (recommandé pour production)
   ```

6. **Cliquez sur "Create Database"**

7. **⏳ Attendez 2-3 minutes** que la base de données soit créée

8. **📝 IMPORTANT : Notez ces informations** :
   - **Internal Database URL** : Vous la trouverez dans l'onglet "Info" de votre base de données
   - Elle ressemble à : `postgresql://conquete_user:XXXXX@dpg-xxxxx-a/conquete`
   - ⚠️ **Utilisez l'URL INTERNE, pas l'URL externe !**

### ✅ Vérification :
- [ ] Base de données créée
- [ ] Internal Database URL notée

**⏸️ PAUSE : Une fois la base de données créée, passez à l'Étape 2**

---

## 🔧 ÉTAPE 2 : Déployer le Backend

### Actions à faire :

1. **Dans le dashboard Render**, cliquez sur **"New +"** → **"Web Service"**

2. **Connectez votre dépôt Git** :
   - Si c'est la première fois : Cliquez sur "Connect account" et autorisez Render
   - Sélectionnez votre dépôt (ex: `a-la-conquete-du-monde`)
   - Cliquez sur "Connect"

3. **Configurez le service** :
   ```
   Name: conquete-backend
   Region: (même région que la base de données)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install && npx prisma generate && npx prisma db push --accept-data-loss && npm run prisma:db:seed || npx prisma db seed || true
   Start Command: npm start
   Instance Type: Free (pour tester) ou Starter (recommandé)
   ```

4. **Ajoutez les Variables d'Environnement** :
   Cliquez sur "Advanced" → "Add Environment Variable" et ajoutez :

   | Clé | Valeur |
   |-----|--------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `DATABASE_URL` | *(Collez l'Internal Database URL notée à l'Étape 1)* |
   | `JWT_SECRET` | *(Générez une clé secrète - voir ci-dessous)* |
   | `FRONTEND_URL` | *(Laissez vide pour l'instant, on l'ajoutera après)* |

   **Pour générer JWT_SECRET** :
   - Ouvrez un terminal et exécutez : `openssl rand -base64 32`
   - Ou utilisez un générateur en ligne : [randomkeygen.com](https://randomkeygen.com)
   - Copiez la clé générée et collez-la dans `JWT_SECRET`

5. **Cliquez sur "Create Web Service"**

6. **⏳ Attendez 5-10 minutes** que le build se termine
   - Vous pouvez suivre les logs en temps réel
   - Le build va :
     - Installer les dépendances
     - Générer le client Prisma
     - Créer les tables dans la base de données
     - Seeder la base de données avec les articles de démonstration

7. **📝 Notez l'URL de votre backend** :
   - Elle apparaîtra en haut de la page (ex: `https://conquete-backend.onrender.com`)
   - L'URL de l'API sera : `https://conquete-backend.onrender.com/api`

8. **✅ Vérifiez que le backend fonctionne** :
   - Ouvrez dans votre navigateur : `https://votre-backend.onrender.com/api/health`
   - Vous devriez voir : `{"status":"OK",...}`

### ✅ Vérification :
- [ ] Backend déployé
- [ ] Build réussi (pas d'erreurs dans les logs)
- [ ] Health check fonctionne
- [ ] URL du backend notée

**⏸️ PAUSE : Une fois le backend déployé et fonctionnel, passez à l'Étape 3**

---

## 🎨 ÉTAPE 3 : Déployer le Frontend

### Actions à faire :

1. **Dans le dashboard Render**, cliquez sur **"New +"** → **"Static Site"**

2. **Connectez votre dépôt Git** (si pas déjà fait) :
   - Sélectionnez votre dépôt
   - Cliquez sur "Connect"

3. **Configurez le site** :
   ```
   Name: conquete-frontend
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   Plan: Free
   ```

4. **Ajoutez la Variable d'Environnement** :
   Cliquez sur "Advanced" → "Add Environment Variable" :

   | Clé | Valeur |
   |-----|--------|
   | `VITE_API_URL` | `https://votre-backend.onrender.com/api` |
   
   ⚠️ **Remplacez `votre-backend` par le nom réel de votre backend !**

5. **Cliquez sur "Create Static Site"**

6. **⏳ Attendez 3-5 minutes** que le build se termine

7. **📝 Notez l'URL de votre frontend** :
   - Elle apparaîtra en haut de la page (ex: `https://conquete-frontend.onrender.com`)

### ✅ Vérification :
- [ ] Frontend déployé
- [ ] Build réussi
- [ ] URL du frontend notée

**⏸️ PAUSE : Une fois le frontend déployé, passez à l'Étape 4**

---

## 🔄 ÉTAPE 4 : Configuration Finale (CORS)

### Actions à faire :

1. **Retournez dans les paramètres de votre backend** :
   - Dans le dashboard, cliquez sur `conquete-backend`
   - Allez dans l'onglet "Environment"

2. **Mettez à jour la variable `FRONTEND_URL`** :
   - Cliquez sur "Edit" à côté de `FRONTEND_URL`
   - Remplacez la valeur par l'URL de votre frontend (ex: `https://conquete-frontend.onrender.com`)
   - Cliquez sur "Save Changes"

3. **Redéployez le backend** :
   - Cliquez sur "Manual Deploy" → "Deploy latest commit"
   - ⏳ Attendez 2-3 minutes

### ✅ Vérification :
- [ ] Variable `FRONTEND_URL` mise à jour
- [ ] Backend redéployé

---

## 🎉 ÉTAPE 5 : Test Final

### Actions à faire :

1. **Ouvrez votre frontend** dans le navigateur :
   - URL : `https://votre-frontend.onrender.com`

2. **Testez les fonctionnalités** :
   - [ ] La page d'accueil s'affiche
   - [ ] Vous pouvez voir les articles
   - [ ] Vous pouvez vous inscrire / vous connecter
   - [ ] Vous pouvez créer un article
   - [ ] Les images s'affichent correctement

3. **Si tout fonctionne** : 🎉 **Félicitations, votre application est en ligne !**

---

## 🐛 Problèmes Courants et Solutions

### ❌ Le backend ne démarre pas

**Symptômes** : Erreur dans les logs, service ne démarre pas

**Solutions** :
1. Vérifiez que `DATABASE_URL` est l'URL **INTERNE** (pas externe)
2. Vérifiez que `PORT` est bien `10000`
3. Regardez les logs détaillés dans Render
4. Vérifiez que Prisma a bien généré le client

### ❌ Le frontend ne peut pas se connecter au backend

**Symptômes** : Erreurs CORS, 404, ou "Network Error"

**Solutions** :
1. Vérifiez que `VITE_API_URL` est l'URL complète : `https://backend.onrender.com/api`
2. Vérifiez que `FRONTEND_URL` dans le backend correspond à l'URL du frontend
3. Vérifiez que le backend est bien démarré (health check)

### ❌ Erreurs de base de données

**Symptômes** : "Connection refused", "Database does not exist"

**Solutions** :
1. Vérifiez que la base de données est bien créée et active
2. Vérifiez que `DATABASE_URL` utilise l'URL interne
3. Vérifiez que le backend et la base de données sont dans la même région

### ❌ Le build échoue

**Symptômes** : Build failed, erreurs dans les logs

**Solutions** :
1. Vérifiez que tous les fichiers sont bien commités et poussés sur Git
2. Vérifiez que `Root Directory` est correct (`server` pour backend, `client` pour frontend)
3. Regardez les logs détaillés pour identifier l'erreur exacte

---

## 📞 Besoin d'aide ?

Si vous rencontrez un problème :

1. **Consultez les logs** dans le dashboard Render
2. **Vérifiez ce guide** étape par étape
3. **Consultez la documentation Render** : [render.com/docs](https://render.com/docs)

---

**Bon déploiement ! 🌍✨**

