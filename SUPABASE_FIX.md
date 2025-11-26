# 🔧 Fix: Erreur "prepared statement does not exist" avec Supabase

## Problème

L'erreur `prepared statement "s6" does not exist` survient lorsque Prisma utilise des prepared statements avec le connection pooler de Supabase (PGBouncer).

## Solution dans Render

Dans Render → `conquete-backend` → Environment, modifiez la variable `DATABASE_URL` :

### Option 1 : Utiliser le port direct (recommandé)

Si votre DATABASE_URL utilise le port `6543` (pooler), changez-le pour `5432` (direct) :

**Avant :**
```
postgresql://postgres:xxx@db.xxx.supabase.co:6543/postgres?sslmode=require
```

**Après :**
```
postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres?sslmode=require
```

### Option 2 : Ajouter le paramètre pgbouncer

Si vous devez garder le port 6543, ajoutez `&pgbouncer=true` à la fin :

```
postgresql://postgres:xxx@db.xxx.supabase.co:6543/postgres?sslmode=require&pgbouncer=true
```

## Après modification

1. Sauvegardez la variable d'environnement dans Render
2. Render redéploiera automatiquement
3. L'erreur devrait disparaître

