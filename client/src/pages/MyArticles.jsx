import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { useToast } from '../context/ToastContext';
import { FaTrash, FaArrowLeft, FaEdit, FaCompass, FaBook } from 'react-icons/fa';

export default function MyArticles() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        loadArticles(parsedUser.id);
      } catch (e) {
        console.error('Erreur parsing user:', e);
        localStorage.removeItem('user');
        showToast('Vous devez être connecté pour voir vos articles', 'warning');
        navigate('/login');
      }
    } else {
      showToast('Vous devez être connecté pour voir vos articles', 'warning');
      navigate('/login');
    }
  }, []);

  const loadArticles = async userId => {
    try {
      if (!userId) {
        showToast('Erreur: Identifiant utilisateur manquant', 'error');
        return;
      }

      const { data } = await api.get(`/articles?userId=${userId}`);

      // Double vérification côté client : ne garder que les articles de l'utilisateur
      const userArticles = data.filter(article => article.userId === userId);
      setArticles(userArticles);
    } catch (error) {
      console.error('Erreur chargement articles:', error);
      showToast(
        error.response?.data?.error || 'Erreur lors du chargement de vos articles',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async articleId => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await api.delete(`/articles/${articleId}`);
      showToast('Article supprimé avec succès', 'success');
      loadArticles(user.id);
    } catch (error) {
      showToast(error.response?.data?.error || 'Erreur lors de la suppression', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de vos articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Hero Section - Design Organique */}
      <section className="relative min-h-[30vh] sm:min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Background avec effet de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Formes organiques flottantes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-white/30 shadow-lg">
              <FaEdit className="text-yellow-300" />
              <span>Vos créations</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            <span className="block">Mes Articles</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-lg">
            {articles.length === 0
              ? "Vous n'avez pas encore créé d'articles"
              : `${articles.length} article${articles.length > 1 ? 's' : ''} publié${articles.length > 1 ? 's' : ''}`}
          </p>

          <Link
            to="/create-article"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full hover:scale-105 transition-all duration-300 text-base sm:text-lg shadow-2xl"
          >
            <FaEdit />
            <span>Créer un nouvel article</span>
          </Link>
        </div>

        {/* Vague de séparation organique */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 sm:h-20 lg:h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path
              d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
              className="text-sky-50 dark:text-gray-900"
            ></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-6 sm:-mt-8 lg:-mt-12 relative z-10">
        {/* Liste des articles */}
        {articles.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-12 sm:p-16 text-center shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden">
            {/* Effet de lumière */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <FaBook className="text-6xl sm:text-8xl text-gray-300 dark:text-gray-600 mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Aucun article pour le moment
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Commencez à partager vos expériences de voyage avec la communauté !
              </p>
              <Link
                to="/create-article"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-4 px-8 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                <FaCompass />
                <span>Créer mon premier article</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* En-tête avec statistiques */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 mb-8 shadow-xl border border-white/50 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Vos articles publiés
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {articles.length} article{articles.length > 1 ? 's' : ''} au total
                  </p>
                </div>
                <Link
                  to="/create-article"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                >
                  <FaEdit />
                  <span>Nouvel article</span>
                </Link>
              </div>
            </div>

            {/* Grille d'articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {articles.map((article, index) => (
                <div
                  key={article.id}
                  className="relative transform transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArticleCard article={article} />
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-article/${article.id}`)}
                      className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-all hover:scale-110 flex items-center gap-2 shadow-lg"
                      title="Modifier"
                    >
                      <FaEdit />
                      <span className="hidden sm:inline">Modifier</span>
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-all hover:scale-110 flex items-center gap-2 shadow-lg"
                      title="Supprimer"
                    >
                      <FaTrash />
                      <span className="hidden sm:inline">Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bouton retour */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-all hover:translate-x-[-4px]"
          >
            <FaArrowLeft />
            <span>Retour</span>
          </button>
        </div>
      </div>
    </div>
  );
}
