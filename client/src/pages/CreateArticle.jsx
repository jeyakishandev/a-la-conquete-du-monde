import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '../context/ToastContext'
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa'

export default function CreateArticle() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'destinations',
    image: ''
  })

  const categories = [
    { value: 'destinations', label: '🌍 Destinations' },
    { value: 'culture', label: '🎭 Culture' },
    { value: 'aventure', label: '🏔️ Aventure' },
    { value: 'conseils', label: '💡 Conseils' }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.title || !formData.description || !formData.content) {
      showToast('Veuillez remplir tous les champs obligatoires', 'warning')
      setLoading(false)
      return
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user.id) {
        showToast('Vous devez être connecté pour créer un article', 'warning')
        navigate('/login')
        return
      }

      // Ajouter l'image par défaut si vide
      const articleData = {
        ...formData,
        image: formData.image || '/assets/images/voyage.jpg',
        userId: user.id
      }

      await axios.post('/api/articles', articleData)

      showToast('Article créé avec succès !', 'success')
      setTimeout(() => {
        navigate('/blog')
      }, 1000)
    } catch (error) {
      showToast(error.response?.data?.error || 'Erreur lors de la création de l\'article', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Créer un article
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Partagez votre expérience de voyage avec la communauté
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Titre de l'article *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: Mon voyage à Bali"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Description *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Une brève description de votre article"
                required
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                URL de l'image
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: /assets/images/voyage.jpg"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Laissez vide pour utiliser une image par défaut
              </p>
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Contenu de l'article *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="Racontez votre expérience de voyage..."
                required
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaSave />
                <span>{loading ? 'Publication...' : 'Publier l\'article'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <FaTimes />
                <span>Annuler</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

