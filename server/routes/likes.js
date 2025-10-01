import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Toggle like sur un article
router.post('/toggle/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const { userId } = req.body;

    // Vérifier si le like existe déjà
    const existingLike = await prisma.like.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId: userId || null
        }
      }
    });

    if (existingLike) {
      // Supprimer le like
      await prisma.like.delete({
        where: { id: existingLike.id }
      });

      const count = await prisma.like.count({
        where: { articleId }
      });

      res.json({ liked: false, count });
    } else {
      // Créer le like
      await prisma.like.create({
        data: {
          articleId,
          userId: userId || null
        }
      });

      const count = await prisma.like.count({
        where: { articleId }
      });

      res.json({ liked: true, count });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du like' });
  }
});

// Obtenir le nombre de likes d'un article
router.get('/:articleId', async (req, res) => {
  try {
    const count = await prisma.like.count({
      where: { articleId: parseInt(req.params.articleId) }
    });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des likes' });
  }
});

export default router;

