import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir tous les articles
router.get('/', async (req, res) => {
  try {
    const { category, search, userId } = req.query;
    
    const where = {};
    if (category && category !== 'all') {
      where.category = category;
    }
    if (userId) {
      where.userId = parseInt(userId);
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
            favorites: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
});

// Obtenir un article spécifique
router.get('/:id', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            favorites: true
          }
        }
      }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    // Incrémenter les vues
    await prisma.article.update({
      where: { id: parseInt(req.params.id) },
      data: { views: { increment: 1 } }
    });

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
  }
});

// Créer un article
router.post('/', async (req, res) => {
  try {
    const { title, description, content, category, image, userId } = req.body;

    // Validation
    if (!title || !description || !content || !category) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Image par défaut si non fournie
    const articleImage = image || '/assets/images/voyage.jpg';

    const article = await prisma.article.create({
      data: {
        title,
        description,
        content,
        category,
        image: articleImage,
        userId: userId ? parseInt(userId) : null
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
            favorites: true
          }
        }
      }
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
  }
});

// Mettre à jour un article
router.put('/:id', async (req, res) => {
  try {
    const { title, description, content, category, image } = req.body;

    const article = await prisma.article.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(content && { content }),
        ...(category && { category }),
        ...(image && { image })
      }
    });

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article' });
  }
});

// Supprimer un article
router.delete('/:id', async (req, res) => {
  try {
    await prisma.article.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article' });
  }
});

// Statistiques globales
router.get('/stats/all', async (req, res) => {
  try {
    const totalArticles = await prisma.article.count();
    const totalViews = await prisma.article.aggregate({
      _sum: { views: true }
    });
    const totalComments = await prisma.comment.count();
    const totalLikes = await prisma.like.count();

    res.json({
      totalArticles,
      totalViews: totalViews._sum.views || 0,
      totalComments,
      totalLikes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

export default router;

