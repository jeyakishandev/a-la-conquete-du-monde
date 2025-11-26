# 🔧 Fix : Prisma cherche dans public au lieu de conquete

## Problème
Prisma Client cherche les tables dans `public.Article` au lieu de `conquete.Article`

## Solution : Modifier DATABASE_URL dans Render

Dans Render → Environment Variables, modifiez `DATABASE_URL` pour ajouter le paramètre de schéma :

**Ancienne URL** :
```
postgresql://postgres.mexnjnztauvsedffuulw:lwOclufi2MH3QbM3@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Nouvelle URL** (ajoutez `&schema=conquete` ou `?search_path=conquete`) :
```
postgresql://postgres.mexnjnztauvsedffuulw:lwOclufi2MH3QbM3@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&schema=conquete
```

OU

```
postgresql://postgres.mexnjnztauvsedffuulw:lwOclufi2MH3QbM3@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&search_path=conquete
```

## Alternative : Vérifier dans Supabase

Vérifiez que les tables sont bien dans le schéma "conquete" :
1. Supabase → Table Editor
2. Vérifiez le schéma des tables (devrait être "conquete", pas "public")

## Après modification

1. Sauvegardez dans Render
2. Render redéploiera automatiquement
3. Testez : `https://conquete-backend.onrender.com/api/articles`

