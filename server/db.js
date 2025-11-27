// Instance PrismaClient partagée avec configuration pour Supabase
import { PrismaClient } from '@prisma/client';

// Utiliser une instance singleton pour éviter les problèmes de connexion
const globalForPrisma = globalThis;

const prismaClientSingleton = () => {
  // Pour Supabase avec connection pooler
  // Note: La configuration __internal n'est plus nécessaire avec les versions récentes de Prisma
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Configuration spécifique pour Supabase pooler
// Désactiver l'utilisation des prepared statements en utilisant queryRaw quand nécessaire
// Note: Prisma utilise automatiquement des requêtes directes si nécessaire

export default prisma;
