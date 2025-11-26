import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../db.js';
import {
  isValidEmail,
  isValidUsername,
  validatePassword,
  sanitizeString,
  isValidName,
  passwordsMatch,
} from '../utils/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { authRateLimiter, registerRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Inscription avec rate limiting
router.post('/register', registerRateLimiter, async (req, res) => {
  try {
    let { email, username, password, confirmPassword, name } = req.body;

    // Sanitisation des entrées
    email = sanitizeString(email?.toLowerCase(), 255);
    username = sanitizeString(username, 20);
    name = sanitizeString(name, 50);

    // Validation de l'email
    if (!email) {
      return res.status(400).json({
        error: "L'email est requis",
        field: 'email',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Format d'email invalide",
        field: 'email',
      });
    }

    // Validation du nom d'utilisateur
    if (!username) {
      return res.status(400).json({
        error: "Le nom d'utilisateur est requis",
        field: 'username',
      });
    }

    if (!isValidUsername(username)) {
      return res.status(400).json({
        error:
          "Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques ou underscore",
        field: 'username',
      });
    }

    // Validation du mot de passe
    if (!password) {
      return res.status(400).json({
        error: 'Le mot de passe est requis',
        field: 'password',
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'Le mot de passe ne respecte pas les critères de sécurité',
        field: 'password',
        details: passwordValidation.errors,
      });
    }

    // Vérifier la confirmation du mot de passe
    if (confirmPassword && !passwordsMatch(password, confirmPassword)) {
      return res.status(400).json({
        error: 'Les mots de passe ne correspondent pas',
        field: 'confirmPassword',
      });
    }

    // Validation du nom (optionnel mais doit être valide si fourni)
    if (name && !isValidName(name)) {
      return res.status(400).json({
        error: 'Le nom contient des caractères invalides',
        field: 'name',
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          error: 'Cet email est déjà utilisé',
          field: 'email',
        });
      }
      if (existingUser.username === username) {
        return res.status(400).json({
          error: "Ce nom d'utilisateur est déjà utilisé",
          field: 'username',
        });
      }
    }

    // Hasher le mot de passe avec un salt de 12 rounds (plus sécurisé)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name: name || username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
      },
    });

    // Générer le token avec un secret sécurisé
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET || JWT_SECRET === 'secret') {
      console.error(
        "⚠️  ATTENTION: JWT_SECRET utilise la valeur par défaut ! Configurer une variable d'environnement."
      );
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET || 'secret',
      { expiresIn: '7d' } // Réduit de 30d à 7d pour plus de sécurité
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Erreur inscription:', error);

    // Erreurs Prisma spécifiques
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: "Cet email ou nom d'utilisateur est déjà utilisé",
        field: error.meta?.target?.[0] || 'unknown',
      });
    }

    res.status(500).json({
      error: "Erreur lors de l'inscription",
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Connexion avec rate limiting
router.post('/login', authRateLimiter, async (req, res) => {
  try {
    let { email, password } = req.body;

    // Sanitisation
    email = sanitizeString(email?.toLowerCase(), 255);

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email et mot de passe requis',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Format d'email invalide",
        field: 'email',
      });
    }

    // Rechercher l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        password: true,
        createdAt: true,
      },
    });

    // Message d'erreur générique pour ne pas révéler si l'email existe
    const genericError = 'Email ou mot de passe incorrect';

    if (!user) {
      // Attendre un peu pour éviter les attaques par timing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 100));
      return res.status(401).json({ error: genericError });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Attendre un peu même en cas d'échec pour éviter les attaques par timing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 100));
      return res.status(401).json({ error: genericError });
    }

    // Générer le token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET || JWT_SECRET === 'secret') {
      console.error('⚠️  ATTENTION: JWT_SECRET utilise la valeur par défaut !');
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET || 'secret',
      { expiresIn: '7d' } // Réduit de 30d à 7d pour plus de sécurité
    );

    // Retirer le mot de passe de la réponse
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Connexion réussie',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      error: 'Erreur lors de la connexion',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Route pour vérifier le token actuel et obtenir les infos de l'utilisateur
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
});

// Route pour déconnecter (côté serveur, le token est simplement invalidé côté client)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
});

export default router;
