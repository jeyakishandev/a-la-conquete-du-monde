-- Script simple pour ajouter les articles de démonstration
-- Exécutez ce script dans Supabase SQL Editor
-- Note: Vous devrez créer un utilisateur d'abord via l'interface, puis remplacer USER_ID ci-dessous

-- Étape 1: Créer un utilisateur système d'abord (via l'interface ou SQL ci-dessous)
-- Puis récupérez son ID et remplacez USER_ID dans les INSERT ci-dessous

-- Pour créer l'utilisateur système, exécutez d'abord ceci (le mot de passe sera 'system123' hashé):
-- Vous pouvez aussi créer l'utilisateur via l'interface web de votre app

-- Insérer les articles (remplacez USER_ID par l'ID d'un utilisateur existant)
-- Si vous n'avez pas d'utilisateur, créez-en un via l'interface, puis notez son ID

INSERT INTO "Article" (title, description, content, category, image, views, "userId", "createdAt", "updatedAt")
SELECT 
  'Les 5 destinations incontournables en 2024',
  'Découvrez les destinations qui vont marquer cette année : du Japon aux Maldives, en passant par l''Islande et le Costa Rica. Nos sélections basées sur les tendances voyage, l''accessibilité et l''expérience unique que chaque destination offre.',
  '2024 s''annonce comme une année exceptionnelle pour les voyageurs. Après des années de restrictions, le monde s''ouvre à nouveau et certaines destinations émergent comme des incontournables. Le Japon, avec sa culture millénaire et sa modernité, attire toujours plus de visiteurs. Les Maldives offrent un paradis tropical parfait pour se ressourcer. L''Islande continue de fasciner avec ses paysages volcaniques et ses aurores boréales. Le Costa Rica séduit par sa biodiversité exceptionnelle et son engagement écologique. Enfin, la Nouvelle-Zélande reste une destination de rêve pour les amateurs d''aventure.',
  'destinations',
  'assets/images/voyage.jpg',
  0,
  (SELECT id FROM "User" LIMIT 1), -- Utilise le premier utilisateur trouvé
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Article" WHERE title = 'Les 5 destinations incontournables en 2024');

-- Répétez pour chaque article... (le fichier complet serait très long)
-- Solution plus simple: Utilisez le script seed.js via Render

