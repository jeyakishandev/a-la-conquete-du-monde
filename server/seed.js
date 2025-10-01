import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    title: "Les 5 destinations incontournables en 2024",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt reprehenderit et necessitatibus corrupti aliquid nemo est repellat soluta iusto ea, quia iure, iste, tempore dolorem. Veritatis vero minima sunt repellat.",
    content: "Contenu complet de l'article sur les destinations incontournables...",
    category: "destinations",
    image: "assets/images/voyage.jpg"
  },
  {
    title: "Bali : le paradis entre plages et rizières",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt reprehenderit et necessitatibus corrupti aliquid nemo est repellat soluta iusto ea, quia iure, iste, tempore dolorem. Veritatis vero minima sunt repellat.",
    content: "Découvrez Bali, ses plages paradisiaques et ses rizières verdoyantes...",
    category: "destinations",
    image: "assets/images/plage.jpg"
  },
  {
    title: "New York : Que voir en 3 jours ?",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repudiandae expedita magnam voluptate pariatur labore, animi modi rem. Animi consequuntur magni odio pariatur modi sint aut quibusdam molestiae dolorem dolorum!",
    content: "Guide complet pour visiter New York en 3 jours...",
    category: "culture",
    image: "assets/images/New-york.jpg"
  },
  {
    title: "Road-trip en Islande",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim architecto omnis iusto excepturi ex quis libero rem? Magni animi expedita quod harum aliquam earum iste sunt quam? Beatae, veritatis quam.",
    content: "Partez à l'aventure en Islande avec notre guide de road-trip...",
    category: "aventure",
    image: "assets/images/paysage.jpg"
  },
  {
    title: "Safari en Afrique",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam error tenetur possimus deserunt nesciunt culpa voluptate sunt similique et explicabo, qui est aspernatur fugiat molestias at atque, earum iste praesentium!",
    content: "Vivez une expérience unique avec un safari en Afrique...",
    category: "aventure",
    image: "assets/images/Safari.jpg"
  },
  {
    title: "Chicago, États-Unis",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quidem doloremque culpa nihil vitae nobis reprehenderit possimus in dolorem, iusto illo nemo voluptates expedita minima quam cupiditate, animi, laboriosam accusamus.",
    content: "Explorez Chicago, la ville des vents et son architecture remarquable...",
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

