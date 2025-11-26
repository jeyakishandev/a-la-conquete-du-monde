-- Créer les tables dans le schéma public

-- Table User
CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table Article
CREATE TABLE IF NOT EXISTS "Article" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE SET NULL
);

-- Table Comment
CREATE TABLE IF NOT EXISTS "Comment" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"(id) ON DELETE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE SET NULL
);

-- Table Like
CREATE TABLE IF NOT EXISTS "Like" (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"(id) ON DELETE CASCADE,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE SET NULL,
    CONSTRAINT "Like_articleId_userId_key" UNIQUE ("articleId", "userId")
);

-- Table Favorite
CREATE TABLE IF NOT EXISTS "Favorite" (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Favorite_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"(id) ON DELETE CASCADE,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE SET NULL,
    CONSTRAINT "Favorite_articleId_userId_key" UNIQUE ("articleId", "userId")
);

-- Créer les index
CREATE INDEX IF NOT EXISTS "Article_userId_idx" ON "Article"("userId");
CREATE INDEX IF NOT EXISTS "Comment_articleId_idx" ON "Comment"("articleId");
CREATE INDEX IF NOT EXISTS "Comment_userId_idx" ON "Comment"("userId");
CREATE INDEX IF NOT EXISTS "Like_articleId_idx" ON "Like"("articleId");
CREATE INDEX IF NOT EXISTS "Like_userId_idx" ON "Like"("userId");
CREATE INDEX IF NOT EXISTS "Favorite_articleId_idx" ON "Favorite"("articleId");
CREATE INDEX IF NOT EXISTS "Favorite_userId_idx" ON "Favorite"("userId");

