import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import { useToast } from '../context/ToastContext'
import { FaArrowLeft } from 'react-icons/fa'

export default function Favorites() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      loadFavorites()
    } else {
      showToast('Vous devez être connecté pour voir vos favoris', 'warning')
      navigate('/login')
    }
  }, [])

  const loadFavorites = async () => {
    try {
      const userData = localStorage.getItem('user')
      const user = userData ? JSON.parse(userData) : null
      
      const url = user?.id 
        ? `/api/favorites/user?userId=${user.id}`
        : '/api/favorites/user'
      
      const { data } = await axios.get(url)
      setFavorites(data)
    } catch (error) {
      console.error('Erreur chargement favoris:', error)
      showToast('Erreur lors du chargement des favoris', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de vos favoris...</p>
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
            Mes Favoris
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {favorites.length === 0 
              ? "Vous n'avez pas encore d'articles favoris"
              : `${favorites.length} article${favorites.length > 1 ? 's' : ''} sauvegardé${favorites.length > 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* Liste des favoris */}
        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Aucun favori pour le moment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explorez nos articles et ajoutez ceux qui vous intéressent à vos favoris !
            </p>
            <Link
              to="/blog"
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
            >
              Découvrir les articles →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((article) => (
              <ArticleCard key={article.id} article={article} />
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

