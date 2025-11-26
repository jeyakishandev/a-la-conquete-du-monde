import jwt from 'jsonwebtoken';
import prisma from '../db.js';

/**
 * Middleware d'authentification JWT
 * Vérifie la présence et la validité du token
 */
export const authenticateToken = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({
        error: "Token d'authentification manquant",
        code: 'AUTH_TOKEN_MISSING',
      });
    }

    // Vérifier et décoder le token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET || JWT_SECRET === 'secret') {
      console.error('⚠️  JWT_SECRET non configuré ou utilise la valeur par défaut !');
    }

    const decoded = jwt.verify(token, JWT_SECRET || 'secret');

    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND',
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    req.userId = user.id;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token invalide',
        code: 'INVALID_TOKEN',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expiré',
        code: 'TOKEN_EXPIRED',
      });
    }

    console.error('Erreur authentification:', error);
    return res.status(500).json({
      error: "Erreur lors de l'authentification",
      code: 'AUTH_ERROR',
    });
  }
};

/**
 * Middleware optionnel pour vérifier l'authentification
 * Ne bloque pas la requête si non authentifié
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET || 'secret';
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      });

      if (user) {
        req.user = user;
        req.userId = user.id;
      }
    }

    next();
  } catch (error) {
    // Ignorer les erreurs pour l'auth optionnelle
    next();
  }
};

/**
 * Vérifie si l'utilisateur est le propriétaire de la ressource
 */
export const requireOwnership = (resourceIdField = 'userId') => {
  return (req, res, next) => {
    // Si aucune ressource n'est demandée, passer
    if (!req.params.id && !req.params[resourceIdField]) {
      return next();
    }

    const resourceId = req.params.id || req.params[resourceIdField];

    // Si l'utilisateur est authentifié et est le propriétaire
    if (req.userId && req.userId === resourceId) {
      return next();
    }

    return res.status(403).json({
      error: "Accès refusé : vous n'êtes pas autorisé à accéder à cette ressource",
      code: 'FORBIDDEN',
    });
  };
};
