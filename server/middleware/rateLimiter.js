/**
 * Rate limiter personnalisé pour protéger contre les attaques par force brute
 * Utilise un Map en mémoire (pourrait être remplacé par Redis en production)
 */

// Stockage en mémoire des tentatives (Map: ip -> { count, resetTime })
const attempts = new Map();

// Nettoyage périodique des entrées expirées (toutes les 5 minutes)
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, data] of attempts.entries()) {
      if (data.resetTime < now) {
        attempts.delete(ip);
      }
    }
  },
  5 * 60 * 1000
);

/**
 * Crée un middleware de rate limiting
 * @param {Object} options - Options de configuration
 * @param {number} options.windowMs - Fenêtre de temps en ms (défaut: 15 minutes)
 * @param {number} options.maxAttempts - Nombre maximum de tentatives (défaut: 5)
 * @param {string} options.message - Message d'erreur personnalisé
 */
export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxAttempts = 5,
    message = 'Trop de tentatives. Veuillez réessayer plus tard.',
  } = options;

  return (req, res, next) => {
    // Récupérer l'IP réelle (prendre en compte les proxies)
    const ip =
      req.ip ||
      req.connection.remoteAddress ||
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      'unknown';

    const now = Date.now();
    const attempt = attempts.get(ip);

    // Si aucune tentative enregistrée ou si la fenêtre est expirée
    if (!attempt || attempt.resetTime < now) {
      attempts.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    // Si la limite est atteinte
    if (attempt.count >= maxAttempts) {
      const retryAfter = Math.ceil((attempt.resetTime - now) / 1000);
      return res.status(429).json({
        error: message,
        retryAfter,
        resetTime: new Date(attempt.resetTime).toISOString(),
      });
    }

    // Incrémenter le compteur
    attempt.count++;
    attempts.set(ip, attempt);

    // Ajouter des headers pour informer le client
    const remaining = maxAttempts - attempt.count;
    res.setHeader('X-RateLimit-Limit', maxAttempts);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', new Date(attempt.resetTime).toISOString());

    next();
  };
};

/**
 * Rate limiter spécifique pour les routes d'authentification
 * Plus strict : 5 tentatives par 15 minutes
 */
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 5,
  message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.',
});

/**
 * Rate limiter pour les routes d'inscription
 * Limite à 3 inscriptions par heure par IP
 */
export const registerRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 heure
  maxAttempts: 3,
  message: "Trop de tentatives d'inscription. Veuillez réessayer plus tard.",
});

/**
 * Rate limiter général pour les routes API
 * 100 requêtes par 15 minutes
 */
export const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxAttempts: 100,
  message: 'Trop de requêtes. Veuillez ralentir.',
});
