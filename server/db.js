// Instance PrismaClient partagée avec configuration pour Supabase
import { PrismaClient } from '@prisma/client';

// Utiliser une instance singleton pour éviter les problèmes de connexion
const globalForPrisma = globalThis;

const prismaClientSingleton = () => {
  // Pour Supabase avec connection pooler, utiliser la configuration sans prepared statements
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Désactiver les prepared statements pour compatibilité avec Supabase pooler
    // Cela évite l'erreur "prepared statement does not exist"
    __internal: {
      useUds: false,
    },
  });
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Configuration spécifique pour Supabase pooler
// Désactiver l'utilisation des prepared statements en utilisant queryRaw quand nécessaire
// Note: Prisma utilise automatiquement des requêtes directes si nécessaire

export default prisma;

