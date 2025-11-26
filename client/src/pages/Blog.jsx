import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { FaCompass, FaSearch, FaBook } from 'react-icons/fa';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    fetchArticles();
  }, []);

  // Mettre à jour les paramètres d'URL quand les filtres changent (mais pas au premier chargement)
  useEffect(() => {
    // Ne pas mettre à jour l'URL au premier rendu pour éviter les conflits
    if (articles.length === 0) return;
    
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCategory, setSearchParams, articles.length]);

  const fetchArticles = async () => {
    try {
      const { data } = await api.get('/articles');
      setArticles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'destinations', name: 'Destinations' },
    { id: 'conseils', name: 'Conseils' },
    { id: 'aventure', name: 'Aventure' },
    { id: 'culture', name: 'Culture' }
  ];

  const filteredArticles = articles.filter(article => {
    if (!article) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      article.title?.toLowerCase().includes(searchLower) ||
      article.description?.toLowerCase().includes(searchLower) ||
      article.content?.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Hero Section - Design Organique */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background avec effet de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Formes organiques flottantes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-white/30 shadow-lg">
              <FaCompass className="animate-spin-slow" />
              <span>Notre blog de voyage</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            <span className="block">Notre Blog</span>
            <span className="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Découvrez nos aventures
            </span>
          </h1>
          
              <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-lg">
                Découvrez tous les récits de voyage, guides pratiques et expériences partagés par notre communauté de voyageurs passionnés.
              </p>

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm">
            <FaBook />
            <span>{articles.length} articles disponibles • Mise à jour régulière</span>
          </div>
        </div>

        {/* Vague de séparation organique */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-20 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" className="text-sky-50 dark:text-gray-900"></path>
          </svg>
        </div>
      </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-6 sm:-mt-8 lg:-mt-12 relative z-10">
            {/* Section explicative */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FaBook className="text-blue-500 text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Qu'est-ce que le Blog ?</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Le <strong>Blog</strong> contient tous les articles créés par notre communauté : récits de voyage personnels, guides pratiques, conseils d'aventure, et bien plus encore. C'est l'endroit où vous pouvez lire et partager vos expériences de voyage !
                  </p>
                </div>
              </div>
            </div>

            {/* Barre de recherche et filtres - Design Organique */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden mb-8 sm:mb-12">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{filteredArticles.length} article(s) trouvé(s)</span>
              <span>Total: {articles.length} articles</span>
            </div>
          </div>
        </div>

        {/* Articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filteredArticles.map((article, index) => (
              <div key={article.id} className="transform transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl">
            <FaCompass className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4 animate-spin-slow" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
