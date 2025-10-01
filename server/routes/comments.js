import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir les commentaires d'un article
router.get('/article/:articleId', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { articleId: parseInt(req.params.articleId) },
      orderBy: { createdAt: 'desc' }
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
    const { name, content, articleId } = req.body;

    if (!name || !content || !articleId) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const comment = await prisma.comment.create({
      data: {
        name,
        content,
        articleId: parseInt(articleId)
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
  }
});

// Supprimer un commentaire
router.delete('/:id', async (req, res) => {
  try {
    await prisma.comment.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
});

export default router;

