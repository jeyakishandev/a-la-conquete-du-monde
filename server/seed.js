import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
  },
  {
    title: "Paris : Guide complet de la ville lumière",
    description: "Découvrez Paris, la capitale française aux mille facettes. De la Tour Eiffel au Louvre, en passant par les Champs-Élysées et Montmartre, explorez tous les incontournables de la plus belle ville du monde.",
    content: "Paris, la ville lumière, est une destination qui ne cesse de fasciner. La Tour Eiffel, symbole emblématique, offre une vue panoramique exceptionnelle sur la capitale. Le musée du Louvre abrite des œuvres d'art parmi les plus prestigieuses au monde, dont la Joconde. Les Champs-Élysées vous mènent de la place de la Concorde à l'Arc de Triomphe. Montmartre, avec sa basilique du Sacré-Cœur, conserve son charme d'antan. Le quartier du Marais mêle histoire et modernité avec ses hôtels particuliers et boutiques tendance. Ne manquez pas Notre-Dame, même après l'incendie, son histoire continue de marquer la ville. Les croisières sur la Seine offrent un autre point de vue sur les monuments parisiens. La gastronomie parisienne, des boulangeries traditionnelles aux restaurants étoilés, est un véritable régal.",
    category: "destinations",
    image: "assets/images/cover.jpg"
  },
  {
    title: "Tokyo : Immersion dans la culture japonaise",
    description: "Tokyo, métropole futuriste où se mêlent tradition et modernité. Explorez Shibuya, les temples historiques, les marchés et découvrez l'incroyable effervescence de cette mégapole unique.",
    content: "Tokyo est une ville de contrastes saisissants. Shibuya Crossing, le carrefour le plus fréquenté au monde, symbolise le rythme effréné de la ville. Le temple Senso-ji à Asakusa offre un moment de sérénité dans le cœur historique. Le marché aux poissons de Tsukiji, bien que déménagé, reste une expérience culinaire inoubliable. Harajuku est le quartier de la mode alternative et de la culture kawaii. Shinjuku abrite le plus grand quartier de divertissement au monde. Les jardins impériaux offrent une oasis de verdure en plein cœur de la ville. La cuisine japonaise, des sushis aux ramens en passant par les izakayas, est une expérience gustative exceptionnelle. Les onsens, bains thermaux traditionnels, permettent de se détendre après une journée d'exploration. Ne manquez pas une visite au mont Fuji, visible depuis Tokyo par beau temps.",
    category: "destinations",
    image: "assets/images/New-york.jpg"
  },
  {
    title: "Rome : Voyage dans l'histoire italienne",
    description: "Rome, la cité éternelle, berceau de la civilisation occidentale. Découvrez le Colisée, le Vatican, le Forum Romain et tous les trésors de cette ville chargée d'histoire.",
    content: "Rome est un musée à ciel ouvert. Le Colisée, amphithéâtre emblématique, témoigne de la grandeur de l'Empire romain. Le Forum Romain permet de se promener parmi les ruines de la Rome antique. Le Vatican, État indépendant au cœur de Rome, abrite la basilique Saint-Pierre et les musées du Vatican, dont la chapelle Sixtine. Le Panthéon, remarquablement préservé, montre la maîtrise architecturale romaine. Le quartier de Trastevere conserve son charme authentique avec ses ruelles pavées et ses trattorias. La fontaine de Trevi, avec son rituel de la pièce, attire des millions de visiteurs. La place Navone, avec ses fontaines baroques, est un lieu de vie animé. La cuisine romaine, carbonara, amatriciana et supplì, est un délice pour les papilles. Les glaces artisanales romaines sont réputées dans le monde entier.",
    category: "destinations",
    image: "assets/images/Pitoresque.jpg"
  },
  {
    title: "Sydney : Perle de l'Océanie",
    description: "Sydney, ville cosmopolite entre océan Pacifique et culture aborigène. Explorez l'Opéra de Sydney, le Harbour Bridge, les plages légendaires et découvrez l'art de vivre australien.",
    content: "Sydney est une ville où la nature et l'urbanisme se rencontrent harmonieusement. L'Opéra de Sydney, chef-d'œuvre architectural, est un symbole mondial de l'Australie. Le Harbour Bridge offre une vue imprenable et la possibilité de grimper sur son arche. Bondi Beach est la plage la plus célèbre d'Australie, parfaite pour le surf et la détente. Les Blue Mountains, à quelques heures de Sydney, offrent des paysages naturels spectaculaires. Le quartier de The Rocks, berceau historique de Sydney, mêle histoire et modernité. Le Royal Botanic Garden permet de se promener avec vue sur l'opéra et la baie. La cuisine australienne, du fish and chips aux barbecues, reflète la diversité culturelle du pays. L'art aborigène est présent dans les galeries et musées. Ne manquez pas une croisière dans la baie pour admirer Sydney sous tous les angles.",
    category: "destinations",
    image: "assets/images/plage.jpg"
  },
  {
    title: "Rio de Janeiro : La ville merveilleuse",
    description: "Rio de Janeiro, ville vibrante entre montagnes, océan et samba. Découvrez le Corcovado, Copacabana, le Pain de Sucre et plongez dans l'ambiance brésilienne.",
    content: "Rio de Janeiro est une ville qui respire la joie de vivre. Le Christ Rédempteur au sommet du Corcovado domine la ville et offre une vue panoramique exceptionnelle. La plage de Copacabana, longue de 4 kilomètres, est le cœur battant de Rio. Le Pain de Sucre, accessible par téléphérique, offre un autre point de vue spectaculaire. Le quartier de Lapa, avec son escalier Selarón, est un lieu de vie nocturne animé. Le Sambadrome accueille le carnaval le plus célèbre au monde. Les favelas, malgré leur réputation, offrent une expérience culturelle unique avec des visites guidées responsables. Le Jardin botanique abrite une flore tropicale exceptionnelle. La cuisine brésilienne, feijoada, churrasco et caipirinhas, est un véritable régal. Les plages d'Ipanema et de Leblon sont des alternatives plus calmes à Copacabana.",
    category: "destinations",
    image: "assets/images/Pitoresque.jpg"
  },
  {
    title: "Marrakech : Perle du Maroc",
    description: "Marrakech, cité impériale aux souks animés et palais magnifiques. Explorez la place Jemaa el-Fna, la médina, les jardins majestueux et découvrez la magie orientale.",
    content: "Marrakech envoûte par son atmosphère unique. La place Jemaa el-Fna, classée au patrimoine de l'UNESCO, s'anime le soir avec ses conteurs, charmeurs de serpents et stands de nourriture. La médina, labyrinthe de ruelles étroites, abrite des souks colorés où l'artisanat marocain s'exprime. Le palais Bahia, avec ses cours ornées et jardins, montre la grandeur de l'architecture marocaine. Le Jardin Majorelle, créé par Yves Saint Laurent, est une oasis de paix et de couleurs. Les hammams traditionnels offrent un moment de détente et de purification. La cuisine marocaine, tagines, couscous et pastilla, est une explosion de saveurs. Les riads, maisons traditionnelles avec jardin intérieur, offrent un hébergement authentique. Le désert du Sahara, accessible depuis Marrakech, promet une aventure inoubliable.",
    category: "destinations",
    image: "assets/images/cover.jpg"
  },
  {
    title: "Londres : Capitale historique et moderne",
    description: "Londres, ville où histoire et modernité se rencontrent. Découvrez Big Ben, Tower Bridge, les musées prestigieux et plongez dans la culture britannique.",
    content: "Londres est une ville qui allie tradition et innovation. Big Ben et le Palais de Westminster symbolisent la grandeur britannique. Tower Bridge, pont basculant emblématique, offre une vue unique sur la Tamise. Le British Museum abrite des trésors du monde entier, dont les marbres d'Elgin. Hyde Park, l'un des plus grands parcs de Londres, est un lieu de détente prisé. Buckingham Palace, résidence de la reine, attire des millions de visiteurs. Covent Garden, avec ses artistes de rue et boutiques, est un quartier animé. Les pubs traditionnels offrent une ambiance chaleureuse et une cuisine britannique authentique. Camden Town est le quartier alternatif et créatif de Londres. Ne manquez pas une pièce de théâtre dans le West End, le quartier des théâtres le plus réputé au monde. Les marchés de Borough et Portobello sont des expériences culinaires et culturelles.",
    category: "destinations",
    image: "assets/images/New-york.jpg"
  },
  {
    title: "Barcelone : Art et Méditerranée",
    description: "Barcelone, ville moderne aux œuvres de Gaudí et plages méditerranéennes. Explorez la Sagrada Familia, Park Güell, Las Ramblas et découvrez l'art de vivre catalan.",
    content: "Barcelone séduit par son architecture unique et sa vie culturelle intense. La Sagrada Familia, œuvre inachevée de Gaudí, est un chef-d'œuvre architectural qui défie l'imagination. Park Güell, avec ses formes organiques et mosaïques colorées, est un joyau de l'art moderniste. Las Ramblas, artère principale, est le cœur animé de la ville avec ses marchands de fleurs et artistes. Le quartier gothique, avec ses ruelles médiévales, offre un voyage dans le temps. La plage de Barceloneta permet de se détendre après une journée de visite. La cuisine catalane, tapas, paella et crème catalane, est un délice. Le Camp Nou, stade du FC Barcelone, est un pèlerinage pour les amateurs de football. Montjuïc, colline surplombant la ville, offre des vues spectaculaires et des musées de qualité. Le marché de la Boqueria est une expérience sensorielle avec ses couleurs et saveurs.",
    category: "destinations",
    image: "assets/images/Pitoresque.jpg"
  },
  {
    title: "Dubai : Modernité et luxe au désert",
    description: "Dubai, ville ultramoderne aux gratte-ciels futuristes et îles artificielles. Découvrez Burj Khalifa, Palm Jumeirah, les centres commerciaux et l'opulence émiratie.",
    content: "Dubai impressionne par son audace architecturale. Burj Khalifa, plus haut gratte-ciel du monde, offre une vue à couper le souffle sur la ville et le désert. Palm Jumeirah, île artificielle en forme de palmier, abrite des hôtels de luxe et résidences prestigieuses. Dubai Mall, l'un des plus grands centres commerciaux au monde, combine shopping et divertissements. Burj Al Arab, hôtel en forme de voile, est un symbole du luxe dubaiote. Le désert offre des expériences inoubliables : safaris, dîners sous les étoiles et promenades à dos de chameau. Les souks traditionnels, comme le Souk de l'Or, contrastent avec la modernité de la ville. La cuisine émiratie et internationale est variée et raffinée. Les fontaines de Dubai, spectacle aquatique synchronisé, sont un régal pour les yeux. Les plages artificielles et clubs de plage offrent détente et divertissement.",
    category: "destinations",
    image: "assets/images/cover.jpg"
  }
];

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Supprimer les données existantes avec gestion d'erreur
  try {
    await prisma.favorite.deleteMany();
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Données existantes supprimées');
  } catch (error) {
    // Si erreur (ex: tables n'existent pas encore), on continue
    console.log('⚠️ Aucune donnée à supprimer, on continue...');
  }

  // Créer un utilisateur système pour les articles de démonstration
  const systemHashedPassword = await bcrypt.hash('system123', 10);
  const systemUser = await prisma.user.create({
    data: {
      email: 'system@example.com',
      username: 'system',
      password: systemHashedPassword,
      name: 'Système (Démonstration)'
    }
  });

  // Créer un utilisateur de test pour les tests
  const hashedPassword = await bcrypt.hash('test123', 10);
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'testuser',
      password: hashedPassword,
      name: 'Utilisateur Test'
    }
  });

  console.log('✅ Utilisateur système créé');
  console.log('   Email: system@example.com');
  console.log('   Username: system');
  console.log('   Password: system123');
  console.log('');
  console.log('✅ Utilisateur de test créé');
  console.log('   Email: test@example.com');
  console.log('   Username: testuser');
  console.log('   Password: test123');

  // Créer les articles avec l'utilisateur système (pas l'utilisateur de test)
  // Ainsi, l'utilisateur de test ne verra pas tous ces articles dans "Mes articles"
  for (const article of articles) {
    await prisma.article.create({
      data: {
        ...article,
        userId: systemUser.id
      }
    });
  }

  console.log(`✅ ${articles.length} articles créés`);

  // Ajouter quelques commentaires de test
  const allArticles = await prisma.article.findMany();
  
  await prisma.comment.create({
    data: {
      name: "Marie Dupont",
      content: "Article très intéressant ! Merci pour ces conseils.",
      articleId: allArticles[0].id,
      userId: testUser.id
    }
  });

  await prisma.comment.create({
    data: {
      name: "Jean Martin",
      content: "J'ai hâte de visiter cette destination !",
      articleId: allArticles[0].id,
      userId: testUser.id
    }
  });

  console.log('✅ Commentaires de test ajoutés');
  console.log('🎉 Seed terminé avec succès !');
}

// Si le script est exécuté directement (node seed.js), exécuter main
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
  .finally(async () => {
    // Ne pas fermer la connexion si appelé depuis server.js
    if (import.meta.url === `file://${process.argv[1]}`) {
      await prisma.$disconnect();
    }
  });
}

// Exporter la fonction main pour pouvoir l'utiliser ailleurs
export { main as seedDatabase };

