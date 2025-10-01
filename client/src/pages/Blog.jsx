import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Tous', emoji: '📰' },
    { id: 'destinations', name: 'Destinations', emoji: '🌍' },
    { id: 'conseils', name: 'Conseils', emoji: '💡' },
    { id: 'aventures', name: 'Aventures', emoji: '🏔️' },
    { id: 'culture', name: 'Culture', emoji: '🎭' }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Héro */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-16 rounded-2xl mb-12 text-center mx-6 mt-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">📚 Notre Blog</h1>
        <p className="text-xl md:text-2xl opacity-90">Découvrez tous nos articles, récits de voyage et conseils pratiques</p>
        <div className="mt-6 text-sm opacity-80">
          {articles.length} articles disponibles • Mise à jour régulière
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  {category.emoji} {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{filteredArticles.length} article(s) trouvé(s)</span>
            <span>Total: {articles.length} articles</span>
          </div>
        </div>

        {/* Articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Aucun article disponible pour le moment'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}

        {/* Section Newsletter */}
        <section className="mt-16 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl mb-6 opacity-90">
            Recevez nos derniers articles directement dans votre boîte mail
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-orange-500 font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform">
              S'abonner
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
