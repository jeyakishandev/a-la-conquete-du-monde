import express from 'express';
import prisma from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  isValidEmail,
  isValidUsername,
  isValidName,
  validatePassword,
  sanitizeString,
} from '../utils/validation.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Obtenir le profil de l'utilisateur connecté
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

// Obtenir les statistiques de l'utilisateur
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Statistiques des articles
    const articles = await prisma.article.findMany({
      where: { userId },
      select: {
        id: true,
        views: true,
        _count: {
          select: {
            likes: true,
            favorites: true,
            comments: true,
          },
        },
      },
    });

    const totalArticles = articles.length;
    const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
    const totalLikes = articles.reduce((sum, article) => sum + article._count.likes, 0);
    const totalFavorites = articles.reduce((sum, article) => sum + article._count.favorites, 0);
    const totalComments = articles.reduce((sum, article) => sum + article._count.comments, 0);

    // Statistiques des commentaires de l'utilisateur
    const userComments = await prisma.comment.count({
      where: { userId },
    });

    // Favoris de l'utilisateur
    const userFavorites = await prisma.favorite.count({
      where: { userId },
    });

    // Likes de l'utilisateur
    const userLikes = await prisma.like.count({
      where: { userId },
    });

    res.json({
      articles: {
        total: totalArticles,
        totalViews,
        totalLikes,
        totalFavorites,
        totalComments,
      },
      engagement: {
        commentsWritten: userComments,
        articlesFavorited: userFavorites,
        articlesLiked: userLikes,
      },
      mostPopularArticle:
        articles.length > 0
          ? articles.reduce((max, article) =>
              article._count.likes > max._count.likes ? article : max
            )
          : null,
    });
  } catch (error) {
    console.error('Erreur statistiques utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

// Mettre à jour le profil de l'utilisateur
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, username, currentPassword, newPassword } = req.body;
    const userId = req.userId;

    // Récupérer l'utilisateur actuel
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const updateData = {};

    // Mise à jour du nom
    if (name !== undefined) {
      const sanitizedName = sanitizeString(name, 50);
      if (sanitizedName && isValidName(sanitizedName)) {
        updateData.name = sanitizedName;
      } else if (sanitizedName) {
        return res.status(400).json({ error: 'Le nom contient des caractères invalides' });
      }
    }

    // Mise à jour de l'email
    if (email !== undefined && email !== currentUser.email) {
      const sanitizedEmail = sanitizeString(email.toLowerCase(), 255);
      if (!isValidEmail(sanitizedEmail)) {
        return res.status(400).json({ error: "Format d'email invalide" });
      }

      // Vérifier si l'email est déjà utilisé
      const existingUser = await prisma.user.findUnique({
        where: { email: sanitizedEmail },
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      updateData.email = sanitizedEmail;
    }

    // Mise à jour du username
    if (username !== undefined && username !== currentUser.username) {
      const sanitizedUsername = sanitizeString(username, 20);
      if (!isValidUsername(sanitizedUsername)) {
        return res.status(400).json({ error: "Nom d'utilisateur invalide" });
      }

      // Vérifier si le username est déjà utilisé
      const existingUser = await prisma.user.findUnique({
        where: { username: sanitizedUsername },
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ error: "Ce nom d'utilisateur est déjà utilisé" });
      }

      updateData.username = sanitizedUsername;
    }

    // Mise à jour du mot de passe
    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ error: 'Le mot de passe actuel est requis pour changer le mot de passe' });
      }

      // Vérifier le mot de passe actuel
      const validPassword = await bcrypt.compare(currentPassword, currentUser.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
      }

      // Valider le nouveau mot de passe
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          error: 'Le nouveau mot de passe ne respecte pas les critères de sécurité',
          details: passwordValidation.errors,
        });
      }

      // Hasher le nouveau mot de passe
      updateData.password = await bcrypt.hash(newPassword, 12);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      message: 'Profil mis à jour avec succès',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
  }
});

export default router;
