// Instance PrismaClient partagée avec configuration pour Supabase
import { PrismaClient } from '@prisma/client';

// Utiliser une instance singleton pour éviter les problèmes de connexion
const globalForPrisma = globalThis;

const prismaClientSingleton = () => {
  // Modifier la DATABASE_URL pour compatibilité avec Supabase pooler
  let databaseUrl = process.env.DATABASE_URL || '';
  
  // Si on utilise Supabase, ajouter le paramètre pour le pooler
  if (databaseUrl.includes('supabase.co')) {
    // Si on utilise le port 6543 (pooler), ajouter ?pgbouncer=true
    if (databaseUrl.includes(':6543') && !databaseUrl.includes('pgbouncer=true')) {
      const separator = databaseUrl.includes('?') ? '&' : '?';
      databaseUrl = `${databaseUrl}${separator}pgbouncer=true`;
    }
    // Si on utilise le port 5432 (direct), pas besoin de modifier
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

