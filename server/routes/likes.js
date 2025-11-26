import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Toggle like sur un article
router.post('/toggle/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const { userId } = req.body;
    const finalUserId = userId ? parseInt(userId) : null;

    // Vérifier si le like existe déjà
    // Utiliser findFirst au lieu de findUnique car Prisma a des problèmes avec null dans les clés composites
    let existingLike;
    if (finalUserId !== null) {
      existingLike = await prisma.like.findUnique({
        where: {
          articleId_userId: {
            articleId,
            userId: finalUserId
          }
        }
      });
    } else {
      // Pour les likes anonymes (userId null), utiliser findFirst
      existingLike = await prisma.like.findFirst({
        where: {
          articleId,
          userId: null
        }
      });
    }

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
          userId: finalUserId
        }
      });

      const count = await prisma.like.count({
        where: { articleId }
      });

      res.json({ liked: true, count });
    }
  } catch (error) {
    console.error('Erreur lors du like:', error);
    res.status(500).json({ error: 'Erreur lors du like', details: error.message });
  }
});

// Obtenir le nombre de likes d'un article
router.get('/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const userId = req.query.userId ? parseInt(req.query.userId) : null;

    const count = await prisma.like.count({
      where: { articleId }
    });

    // Vérifier si l'utilisateur a liké cet article
    let liked = false;
    if (userId) {
      const userLike = await prisma.like.findUnique({
        where: {
          articleId_userId: {
            articleId,
            userId: parseInt(userId)
          }
        }
      });
      liked = !!userLike;
    }

    res.json({ count, liked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des likes' });
  }
});

export default router;

