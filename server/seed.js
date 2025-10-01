import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    content: "Un road-trip en Islande est une aventure inoubliable. Commencez par Reykjavik, la capitale colorée, puis partez explorer le Cercle d'Or avec ses geysers, cascades et parcs nationaux. La côte sud offre des paysages spectaculaires : glaciers, lagunes glaciaires et plages de sable noir. L'Est du pays révèle des fjords majestueux et des villages de pêcheurs authentiques. Le Nord abrite les plus belles aurores boréales et des sources chaudes naturelles. N'oubliez pas de goûter au fameux hot dog islandais et de vous baigner dans les eaux chaudes du Blue Lagoon.",
    category: "aventure",
    image: "assets/images/paysage.jpg"
  },
  {
    title: "Safari en Afrique",
    description: "Vivez une expérience unique avec un safari en Afrique. Découvrez les Big Five dans leur habitat naturel et partagez des moments magiques avec les animaux sauvages les plus emblématiques du continent africain.",
    content: "Un safari en Afrique est l'expérience d'une vie. Le Kenya et la Tanzanie offrent les meilleures opportunités d'observer les Big Five : lions, éléphants, buffles, léopards et rhinocéros. Le parc national du Serengeti, en Tanzanie, est réputé pour la grande migration des gnous. Au Kenya, la réserve de Masai Mara permet d'observer les prédateurs en action. L'Afrique du Sud propose des safaris plus accessibles dans le parc Kruger. Les lodges de luxe offrent un confort exceptionnel tout en respectant l'environnement. Les guides locaux partagent leurs connaissances sur la faune et la flore, rendant chaque sortie éducative et passionnante.",
    category: "aventure",
    image: "assets/images/Safari.jpg"
  },
  {
    title: "Chicago, États-Unis",
    description: "Chicago, la ville des vents, séduit par son architecture remarquable, sa scène culturelle dynamique et sa gastronomie réputée. Découvrez les incontournables de cette métropole du Midwest américain.",
    content: "Chicago surprend par sa richesse culturelle et architecturale. La Willis Tower (ex-Sears Tower) offre une vue panoramique exceptionnelle sur la ville et le lac Michigan. L'Art Institute of Chicago abrite l'une des plus belles collections d'art au monde. Le Millennium Park, avec sa Cloud Gate (The Bean), est un lieu de rencontre incontournable. La Navy Pier propose des attractions familiales et une vue magnifique sur le lac. La gastronomie chicagoane est réputée : deep-dish pizza, hot dogs et steaks de qualité. Les quartiers comme Wicker Park et Lincoln Park offrent une ambiance bohème et des boutiques uniques.",
    category: "culture",
    image: "assets/images/Grandetours.jpg"
  }
];

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Supprimer les données existantes
  await prisma.favorite.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Données existantes supprimées');

  // Créer les articles
  for (const article of articles) {
    await prisma.article.create({
      data: article
    });
  }

  console.log(`✅ ${articles.length} articles créés`);

  // Ajouter quelques commentaires de test
  const allArticles = await prisma.article.findMany();
  
  await prisma.comment.create({
    data: {
      name: "Marie Dupont",
      content: "Article très intéressant ! Merci pour ces conseils.",
      articleId: allArticles[0].id
    }
  });

  await prisma.comment.create({
    data: {
      name: "Jean Martin",
      content: "J'ai hâte de visiter cette destination !",
      articleId: allArticles[0].id
    }
  });

  console.log('✅ Commentaires de test ajoutés');
  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

