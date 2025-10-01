import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Toggle favori sur un article
router.post('/toggle/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const { userId } = req.body;

    // Vérifier si le favori existe déjà
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId: userId || null
        }
      }
    });

    if (existingFavorite) {
      // Supprimer le favori
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      });

      res.json({ favorited: false });
    } else {
      // Créer le favori
      await prisma.favorite.create({
        data: {
          articleId,
          userId: userId || null
        }
      });

      res.json({ favorited: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout au favoris' });
  }
});

// Obtenir tous les favoris d'un utilisateur
router.get('/user', async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      include: {
        article: {
          include: {
            _count: {
              select: {
                comments: true,
                likes: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(favorites.map(f => f.article));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des favoris' });
  }
});

// Compter les favoris
router.get('/count', async (req, res) => {
  try {
    const count = await prisma.favorite.count();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du comptage des favoris' });
  }
});

export default router;

