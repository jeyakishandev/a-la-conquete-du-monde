import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Envoyer un message de contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Ici tu pourrais sauvegarder dans une table Contact si tu veux
    // Pour l'instant, on simule juste l'envoi
    
    // Log pour debug (en production, tu enverrais un email)
    console.log('Nouveau message de contact:', { name, email, message });

    res.status(200).json({
      message: 'Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.',
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

export default router;

