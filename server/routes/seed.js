import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint temporaire pour exécuter le seed
// PROTECTION: Nécessite un secret key dans les variables d'environnement
router.post('/seed', async (req, res) => {
  try {
    // Vérifier le secret key (à définir dans Render)
    const secretKey = req.body.secretKey || req.headers['x-secret-key'];
    const expectedKey = process.env.SEED_SECRET_KEY || 'CHANGEZ_MOI_EN_PRODUCTION';
    
    if (secretKey !== expectedKey) {
      return res.status(403).json({ 
        error: 'Accès refusé',
        message: 'Secret key manquante ou incorrecte'
      });
    }

    console.log('🌱 Début du seed de la base de données...');

    // Supprimer les données existantes
    await prisma.favorite.deleteMany();
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();

    // Articles à créer
    const articles = [
      {
        title: "Les 5 destinations incontournables en 2024",
        description: "Découvrez les destinations qui vont marquer cette année : du Japon aux Maldives, en passant par l'Islande et le Costa Rica. Nos sélections basées sur les tendances voyage, l'accessibilité et l'expérience unique que chaque destination offre.",
        content: "2024 s'annonce comme une année exceptionnelle pour les voyageurs. Après des années de restrictions, le monde s'ouvre à nouveau et certaines destinations émergent comme des incontournables. Le Japon, avec sa culture millénaire et sa modernité, attire toujours plus de visiteurs. Les Maldives offrent un paradis tropical parfait pour se ressourcer. L'Islande continue de fasciner avec ses paysages volcaniques et ses aurores boréales. Le Costa Rica séduit par sa biodiversité exceptionnelle et son engagement écologique. Enfin, la Nouvelle-Zélande reste une destination de rêve pour les amateurs d'aventure.",
        category: "destinations",
        image: "assets/images/voyage.jpg"
      },
      {
        title: "Bali : le paradis entre plages et rizières",
        description: "Bali, l'île des dieux, offre un mélange unique de culture hindoue, de plages paradisiaques et de rizières en terrasses. Découvrez nos conseils pour un séjour inoubliable sur cette île indonésienne magique.",
        content: "Bali séduit par sa diversité : des plages de sable blanc de Nusa Dua aux rizières en terrasses d'Ubud, en passant par les temples sacrés de Besakih. L'île offre une expérience culturelle riche avec ses cérémonies hindoues, ses danses traditionnelles et son artisanat local. Les amateurs de surf trouveront leur bonheur à Canggu, tandis que les amoureux de la nature pourront explorer les volcans et les forêts tropicales. La cuisine balinaise, avec ses saveurs épicées et ses ingrédients frais, est un véritable régal pour les papilles.",
        category: "destinations",
        image: "assets/images/plage.jpg"
      },
      {
        title: "New York : Que voir en 3 jours ?",
        description: "Visiter New York en 3 jours, c'est possible ! Découvrez notre itinéraire optimisé pour ne rien manquer des incontournables de la Big Apple : Times Square, Central Park, la Statue de la Liberté et bien plus encore.",
        content: "New York en 3 jours nécessite une organisation parfaite. Jour 1 : commencez par Times Square et Broadway, puis direction Central Park pour une pause nature. Le soir, montez au sommet de l'Empire State Building pour une vue imprenable. Jour 2 : prenez le ferry vers la Statue de la Liberté et Ellis Island, puis explorez le Financial District et le 9/11 Memorial. Jour 3 : consacrez la matinée à Brooklyn Bridge et DUMBO, puis passez l'après-midi à SoHo et Greenwich Village. Le soir, profitez de l'ambiance de Times Square illuminée.",
        category: "culture",
        image: "assets/images/New-york.jpg"
      },
      {
        title: "Road-trip en Islande",
        description: "L'Islande, terre de feu et de glace, se découvre idéalement en road-trip. Découvrez notre itinéraire de 10 jours pour explorer les plus beaux sites de cette île nordique unique au monde.",
        content: "Un road-trip en Islande est une aventure inoubliable. La Route 1 (Ring Road) fait le tour de l'île et permet de découvrir les principaux sites : les chutes d'eau spectaculaires de Gullfoss, le geyser Geysir, le Cercle d'Or, les glaciers de Vatnajökull, les plages de sable noir de Vik, les fjords de l'Est, les sources chaudes naturelles, et bien sûr les aurores boréales si vous voyagez en hiver. Prévoyez au moins 10 jours pour profiter pleinement de ce voyage épique.",
        category: "aventure",
        image: "assets/images/voyage.jpg"
      },
      {
        title: "Tokyo : Guide complet pour votre première visite",
        description: "Tokyo, la mégapole japonaise, peut être intimidante pour un premier voyage. Notre guide complet vous aide à organiser votre séjour et à découvrir les quartiers incontournables de cette ville fascinante.",
        content: "Tokyo est une ville aux multiples facettes. Commencez par Shibuya et son célèbre carrefour, puis explorez Harajuku pour la culture kawaii et la mode alternative. Le quartier de Shinjuku abrite des gratte-ciels impressionnants et des bars à cocktails sur les toits. Asakusa et son temple Senso-ji offrent un aperçu du Tokyo traditionnel. Ne manquez pas le marché aux poissons de Tsukiji, même s'il a déménagé. Pour une vue panoramique, montez à la Tokyo Skytree ou à la Tokyo Tower. La cuisine japonaise est un régal : sushis, ramen, yakitori, et bien plus encore.",
        category: "culture",
        image: "assets/images/voyage.jpg"
      },
      {
        title: "10 conseils pour voyager léger",
        description: "Apprendre à voyager léger est un art. Découvrez nos 10 conseils pratiques pour alléger votre valise et profiter pleinement de votre voyage sans le stress des bagages trop lourds.",
        content: "Voyager léger transforme votre expérience de voyage. 1) Choisissez une valise cabine plutôt qu'une grande valise. 2) Faites une liste et ne prenez que l'essentiel. 3) Optez pour des vêtements polyvalents qui se mélangent facilement. 4) Utilisez la technique du roulage pour optimiser l'espace. 5) Préférez les objets multi-usages. 6) Laissez vos produits de toilette volumineux à la maison et achetez sur place. 7) Privilégiez les matières légères et qui sèchent rapidement. 8) Limitez-vous à deux paires de chaussures maximum. 9) Utilisez des sacs de compression pour les vêtements. 10) Souvenez-vous : vous pouvez laver vos vêtements en voyage !",
        category: "conseils",
        image: "assets/images/voyage.jpg"
      }
    ];

    // Créer un utilisateur système pour les articles de démonstration
    const hashedPasswordSystem = await bcrypt.hash('system123', 10);
    const systemUser = await prisma.user.create({
      data: {
        email: 'system@example.com',
        username: 'system',
        password: hashedPasswordSystem,
        name: 'Utilisateur Système'
      }
    });

    // Créer un utilisateur de test
    const hashedPasswordTest = await bcrypt.hash('test123', 10);
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        username: 'testuser',
        password: hashedPasswordTest,
        name: 'Utilisateur Test'
      }
    });

    // Créer les articles
    const createdArticles = [];
    for (const article of articles) {
      const created = await prisma.article.create({
        data: {
          ...article,
          userId: systemUser.id
        }
      });
      createdArticles.push(created);
    }

    // Ajouter quelques commentaires
    if (createdArticles.length > 0) {
      await prisma.comment.create({
        data: {
          name: 'Test User',
          content: 'Excellent article ! Merci pour ces conseils.',
          articleId: createdArticles[0].id,
          userId: testUser.id
        }
      });
    }

    console.log(`✅ Seed terminé : ${createdArticles.length} articles créés`);

    res.json({
      success: true,
      message: `Seed terminé avec succès : ${createdArticles.length} articles créés`,
      articlesCreated: createdArticles.length,
      usersCreated: 2
    });

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    res.status(500).json({
      error: 'Erreur lors du seed',
      message: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;

