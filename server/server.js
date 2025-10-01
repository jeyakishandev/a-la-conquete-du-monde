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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (images, CSS, JS)
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/pages', express.static(path.join(__dirname, '..', 'pages')));

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
      favorites: '/api/favorites'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/favorites', favoriteRoutes);

// Servir le frontend
app.use(express.static(path.join(__dirname, '..')));

// Route par défaut pour le frontend
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'index_backup.html'));
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
});

