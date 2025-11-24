import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import { useToast } from '../context/ToastContext'
import { FaTrash, FaArrowLeft } from 'react-icons/fa'

export default function MyArticles() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      loadArticles(parsedUser.id)
    } else {
      showToast('Vous devez être connecté pour voir vos articles', 'warning')
      navigate('/login')
    }
  }, [])

  const loadArticles = async (userId) => {
    try {
      const { data } = await axios.get(`/api/articles?userId=${userId}`)
      setArticles(data)
    } catch (error) {
      console.error('Erreur chargement articles:', error)
      showToast('Erreur lors du chargement de vos articles', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (articleId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return
    }

    try {
      await axios.delete(`/api/articles/${articleId}`)
      showToast('Article supprimé avec succès', 'success')
      loadArticles(user.id)
    } catch (error) {
      showToast('Erreur lors de la suppression', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de vos articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mes Articles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            {articles.length === 0 
              ? "Vous n'avez pas encore créé d'articles"
              : `${articles.length} article${articles.length > 1 ? 's' : ''} publié${articles.length > 1 ? 's' : ''}`
            }
          </p>
          <Link
            to="/create-article"
            className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
          >
            Créer un nouvel article
          </Link>
        </div>

        {/* Liste des articles */}
        {articles.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Aucun article pour le moment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Commencez à partager vos expériences de voyage avec la communauté !
            </p>
            <Link
              to="/create-article"
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
            >
              Créer mon premier article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="relative">
                <ArticleCard article={article} />
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-full text-sm hover:bg-red-600 transition-all hover:scale-110 flex items-center gap-2 shadow-lg"
                    title="Supprimer"
                  >
                    <FaTrash />
                    <span className="hidden sm:inline">Supprimer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-orange-500 hover:text-orange-600 flex items-center gap-2 mx-auto transition"
          >
            <FaArrowLeft />
            <span>Retour</span>
          </button>
        </div>
      </div>
    </div>
  )
}

