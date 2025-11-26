import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import favoriteRoutes from './routes/favorites.js';
import contactRoutes from './routes/contact.js';
import userRoutes from './routes/users.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',') // Support plusieurs URLs séparées par virgule
    : process.env.NODE_ENV === 'production'
      ? false // En production sans FRONTEND_URL, refuser toutes les origines
      : true, // En développement, autoriser toutes les origines
  credentials: true,
  optionsSuccessStatus: 200,
};

// Trust proxy pour obtenir la vraie IP (important pour le rate limiting)
app.set('trust proxy', 1);

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers améliorés
app.use((req, res, next) => {
  // Protection contre le sniffing de type de contenu
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Protection contre le clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Protection XSS (ancien navigateurs)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Politique de référent
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Content Security Policy basique
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
  }
  // Désactiver la mise en cache pour les réponses sensibles
  if (req.path.startsWith('/api/auth')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

// Servir les fichiers statiques (images, CSS, JS)
// Les assets sont servis depuis server/assets pour les images des articles en BDD
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes API
app.get('/api', (req, res) => {
  res.json({
    message: '🌍 API À la Conquête du Monde',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      articles: '/api/articles',
      comments: '/api/comments',
      likes: '/api/likes',
      favorites: '/api/favorites',
      users: '/api/users',
    },
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

// Route par défaut pour l'API (404 si route API non trouvée)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'Route API non trouvée' });
  } else {
    // En production, le frontend est servi par Nginx
    // Cette route ne devrait pas être atteinte
    res.status(404).json({ error: 'Route non trouvée' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Fonction pour vérifier et exécuter le seed si nécessaire
async function checkAndSeed() {
  try {
    const prisma = (await import('./db.js')).default;

    // Vérifier si des articles existent
    const articleCount = await prisma.article.count();

    if (articleCount === 0) {
      console.log('🌱 Aucun article trouvé. Exécution du seed...');
      try {
        // Importer et exécuter la fonction seed
        const { seedDatabase } = await import('./seed.js');
        await seedDatabase();
        console.log('✅ Seed exécuté avec succès');
      } catch (error) {
        console.error('❌ Erreur lors du seed automatique:', error.message);
        // On continue - le serveur démarrera quand même
      }
    } else {
      console.log(`✅ Base de données déjà initialisée (${articleCount} articles)`);
    }
  } catch (error) {
    console.error('⚠️ Erreur lors de la vérification du seed:', error.message);
    // On continue quand même - le serveur démarrera
  }
}

// Démarrer le serveur
app.listen(PORT, async () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);

  // Vérifier la connexion à la base de données
  try {
    const prisma = (await import('./db.js')).default;
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
  }

  // Vérifier et exécuter le seed si nécessaire (en arrière-plan)
  checkAndSeed().catch(err => {
    console.error('Erreur lors du check seed:', err);
  });
});
