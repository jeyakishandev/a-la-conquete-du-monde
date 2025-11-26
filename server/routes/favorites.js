import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Toggle favori sur un article
router.post('/toggle/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const { userId } = req.body;
    const finalUserId = userId ? parseInt(userId) : null;

    // Les favoris nécessitent un utilisateur connecté
    if (!finalUserId) {
      return res.status(401).json({ error: 'Vous devez être connecté pour ajouter aux favoris' });
    }

    // Vérifier si le favori existe déjà
    // Utiliser findUnique car userId ne sera jamais null ici
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId: finalUserId,
        },
      },
    });

    if (existingFavorite) {
      // Supprimer le favori
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });

      res.json({ favorited: false });
    } else {
      // Créer le favori
      await prisma.favorite.create({
        data: {
          articleId,
          userId: finalUserId,
        },
      });

      res.json({ favorited: true });
    }
  } catch (error) {
    console.error('Erreur lors du toggle favori:', error);
    res.status(500).json({ error: "Erreur lors de l'ajout au favoris", details: error.message });
  }
});

// Obtenir tous les favoris d'un utilisateur
router.get('/user', async (req, res) => {
  try {
    // Récupération des favoris avec filtre par userId
    const { userId } = req.query;

    const where = userId ? { userId: parseInt(userId) } : {};

    const favorites = await prisma.favorite.findMany({
      where,
      include: {
        article: {
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
                favorites: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites.map(f => f.article));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des favoris' });
  }
});

// Compter les favoris d'un utilisateur
router.get('/count', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.json({ count: 0 });
    }

    const count = await prisma.favorite.count({
      where: { userId: parseInt(userId) },
    });
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du comptage des favoris' });
  }
});

// Vérifier si un article est en favoris pour un utilisateur
router.get('/check/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const { userId } = req.query;

    if (!userId) {
      return res.json({ favorited: false });
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId: parseInt(userId),
        },
      },
    });

    res.json({ favorited: !!favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la vérification du favori' });
  }
});

export default router;
