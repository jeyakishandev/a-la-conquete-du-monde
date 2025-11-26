import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import {
  validateArticleTitle,
  validateArticleDescription,
  validateArticleContent,
  isValidCategory,
  isValidImageUrl
} from '../utils/validation.js';

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir tous les articles
router.get('/', async (req, res) => {
  try {
    const { category, search, userId } = req.query;
    
    const where = {};
    
    // Filtre par userId (prioritaire - si présent, on filtre strictement)
    if (userId) {
      const parsedUserId = parseInt(userId);
      if (!isNaN(parsedUserId)) {
        where.userId = parsedUserId;
      }
    }
    
    // Filtre par catégorie (uniquement si userId n'est pas spécifié ou en combinaison)
    if (category && category !== 'all') {
      where.category = category;
    }
    
    // Filtre par recherche (uniquement si userId n'est pas spécifié ou en combinaison)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
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

// Créer un article (nécessite authentification)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, content, category, image } = req.body;
    const userId = req.userId; // Récupéré depuis le middleware d'authentification

    console.log('📝 Création article - Données extraites:', { title, description: description?.substring(0, 50), content: content?.substring(0, 50), category, image });

    // Validation du titre
    const titleValidation = validateArticleTitle(title);
    if (!titleValidation.isValid) {
      console.log('❌ Validation titre échouée:', titleValidation.error);
      return res.status(400).json({ error: titleValidation.error });
    }

    // Validation de la description
    const descriptionValidation = validateArticleDescription(description);
    if (!descriptionValidation.isValid) {
      return res.status(400).json({ error: descriptionValidation.error });
    }

    // Validation du contenu
    const contentValidation = validateArticleContent(content);
    if (!contentValidation.isValid) {
      return res.status(400).json({ error: contentValidation.error });
    }

    // Validation de la catégorie
    if (!category || !isValidCategory(category)) {
      return res.status(400).json({ error: 'Catégorie invalide. Catégories valides: destinations, culture, aventure, conseils' });
    }

    // Validation de l'URL d'image
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({ error: 'URL d\'image invalide' });
    }

    // Image par défaut si non fournie
    const articleImage = image && image.trim() !== '' ? image.trim() : '/assets/images/voyage.jpg';

    const article = await prisma.article.create({
      data: {
        title: titleValidation.sanitized,
        description: descriptionValidation.sanitized,
        content: contentValidation.sanitized,
        category,
        image: articleImage,
        userId: parseInt(userId)
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
    console.error('Erreur création article:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
  }
});

// Mettre à jour un article (nécessite authentification)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, content, category, image } = req.body;
    const userId = req.userId;
    const articleId = parseInt(req.params.id);

    // Vérifier que l'article existe et appartient à l'utilisateur
    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId }
    });

    if (!existingArticle) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    if (existingArticle.userId !== userId) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier cet article' });
    }

    // Validation des champs
    if (title !== undefined) {
      const titleValidation = validateArticleTitle(title);
      if (!titleValidation.isValid) {
        return res.status(400).json({ error: titleValidation.error });
      }
    }

    if (description !== undefined) {
      const descriptionValidation = validateArticleDescription(description);
      if (!descriptionValidation.isValid) {
        return res.status(400).json({ error: descriptionValidation.error });
      }
    }

    if (content !== undefined) {
      const contentValidation = validateArticleContent(content);
      if (!contentValidation.isValid) {
        return res.status(400).json({ error: contentValidation.error });
      }
    }

    if (category && !isValidCategory(category)) {
      return res.status(400).json({ error: 'Catégorie invalide' });
    }

    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({ error: 'URL d\'image invalide' });
    }

    // Sanitisation
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (category) updateData.category = category;
    if (image !== undefined) updateData.image = image ? image.trim() : '/assets/images/voyage.jpg';

    const article = await prisma.article.update({
      where: { id: articleId },
      data: updateData,
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

    res.json(article);
  } catch (error) {
    console.error('Erreur mise à jour article:', error);
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

