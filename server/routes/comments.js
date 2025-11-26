import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Obtenir les commentaires d'un article
router.get('/article/:articleId', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { articleId: parseInt(req.params.articleId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
});

// Créer un commentaire
router.post('/', async (req, res) => {
  try {
    const { name, content, articleId, userId } = req.body;

    if (!content || !articleId) {
      return res.status(400).json({ error: 'Le contenu du commentaire est requis' });
    }

    if (!name && !userId) {
      return res
        .status(400)
        .json({ error: 'Le nom est requis pour les utilisateurs non connectés' });
    }

    // Validation de la longueur
    if (content.trim().length < 3) {
      return res.status(400).json({ error: 'Le commentaire doit contenir au moins 3 caractères' });
    }

    if (content.trim().length > 1000) {
      return res.status(400).json({ error: 'Le commentaire ne peut pas dépasser 1000 caractères' });
    }

    const comment = await prisma.comment.create({
      data: {
        name: name?.trim() || null,
        content: content.trim(),
        articleId: parseInt(articleId),
        userId: userId ? parseInt(userId) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Erreur création commentaire:', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la création du commentaire', details: error.message });
  }
});

// Supprimer un commentaire
router.delete('/:id', async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);

    // Vérifier si le commentaire existe
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Commentaire non trouvé' });
    }

    // Note: La vérification de propriété est gérée côté client

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression commentaire:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
});

export default router;
