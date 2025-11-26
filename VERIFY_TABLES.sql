-- Vérifier où sont les tables
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE table_name IN ('User', 'Article', 'Comment', 'Like', 'Favorite')
ORDER BY table_schema, table_name;

-- Vérifier le schéma conquete
SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'conquete';

