import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { FaSave, FaTimes, FaEdit, FaGlobe, FaBook, FaMountain, FaLightbulb, FaImage } from 'react-icons/fa'

export default function EditArticle() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [loadingArticle, setLoadingArticle] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'destinations',
    image: ''
  })

  const categories = [
    { value: 'destinations', label: 'Destinations', icon: FaGlobe },
    { value: 'culture', label: 'Culture', icon: FaBook },
    { value: 'aventure', label: 'Aventure', icon: FaMountain },
    { value: 'conseils', label: 'Conseils', icon: FaLightbulb }
  ]

  useEffect(() => {
    loadArticle()
  }, [id])

  const loadArticle = async () => {
    try {
      const { data } = await api.get(`/articles/${id}`)
      
      // Vérifier que l'utilisateur est le propriétaire
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (data.userId !== user.id) {
        showToast('Vous n\'êtes pas autorisé à modifier cet article', 'error')
        navigate('/my-articles')
        return
      }

      setFormData({
        title: data.title || '',
        description: data.description || '',
        content: data.content || '',
        category: data.category || 'destinations',
        image: data.image || ''
      })
    } catch (error) {
      showToast('Erreur lors du chargement de l\'article', 'error')
      navigate('/my-articles')
    } finally {
      setLoadingArticle(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Compteurs de caractères
  const titleLength = formData.title.length
  const descriptionLength = formData.description.length
  const contentLength = formData.content.length

  // Validation des longueurs
  const titleMaxLength = 100
  const descriptionMaxLength = 200
  const contentMinLength = 50

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.title || !formData.description || !formData.content) {
      showToast('Veuillez remplir tous les champs obligatoires', 'warning')
      setLoading(false)
      return
    }

    if (formData.title.length > titleMaxLength) {
      showToast(`Le titre ne peut pas dépasser ${titleMaxLength} caractères`, 'warning')
      setLoading(false)
      return
    }

    if (formData.description.length > descriptionMaxLength) {
      showToast(`La description ne peut pas dépasser ${descriptionMaxLength} caractères`, 'warning')
      setLoading(false)
      return
    }

    if (formData.content.length < contentMinLength) {
      showToast(`Le contenu doit contenir au moins ${contentMinLength} caractères`, 'warning')
      setLoading(false)
      return
    }

    try {
      await api.put(`/articles/${id}`, formData)
      showToast('Article modifié avec succès !', 'success')
      setTimeout(() => {
        navigate(`/article/${id}`)
      }, 1000)
    } catch (error) {
      if (error.response?.status === 401) {
        showToast('Votre session a expiré. Veuillez vous reconnecter.', 'warning')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setTimeout(() => {
          navigate('/login')
        }, 1500)
        return
      }
      
      if (error.response?.status === 403) {
        showToast('Vous n\'êtes pas autorisé à modifier cet article', 'error')
      } else if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.error || 'Données invalides'
        showToast(errorMessage, 'error')
      } else {
        showToast('Erreur lors de la modification de l\'article', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  const isAbsoluteUrl = (url) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'))
  }

  if (loadingArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Hero Section - Design Organique */}
      <section className="relative min-h-[30vh] sm:min-h-[35vh] flex items-center justify-center overflow-hidden">
        {/* Background avec effet de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Formes organiques flottantes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-white/30 shadow-lg">
              <FaEdit className="animate-pulse" />
              <span>Modification d'article</span>
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight text-white drop-shadow-2xl">
            Modifier votre article
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
            Mettez à jour votre récit de voyage
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="relative -mt-8 sm:-mt-12 z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20 dark:border-gray-700/50">

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                Titre de l'article *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={titleMaxLength}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Ex: Mon voyage à Bali"
                required
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400"></span>
                <span className={`text-xs ${titleLength > titleMaxLength * 0.9 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {titleLength}/{titleMaxLength}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                Description *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={descriptionMaxLength}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Une brève description de votre article"
                required
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Résumé court de votre article</span>
                <span className={`text-xs ${descriptionLength > descriptionMaxLength * 0.9 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {descriptionLength}/{descriptionMaxLength}
                </span>
              </div>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                Catégorie *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map(cat => {
                  const Icon = cat.icon
                  const isSelected = formData.category === cat.value
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-lg'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-900/10'
                      }`}
                    >
                      <Icon className="text-xl" />
                      <span className="text-xs sm:text-sm font-medium">{cat.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                <FaImage className="inline mr-2" />
                URL de l'image
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Ex: /assets/images/voyage.jpg"
              />
              {formData.image && (
                <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img 
                    src={isAbsoluteUrl(formData.image) ? formData.image : `/${formData.image}`}
                    alt="Aperçu" 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'block'
                      }
                    }}
                  />
                  <div className="hidden p-4 bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-400">
                    Image non disponible
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Laissez vide pour utiliser une image par défaut
              </p>
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                Contenu de l'article *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                minLength={contentMinLength}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                placeholder="Racontez votre expérience de voyage en détail..."
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${contentLength < contentMinLength ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  Minimum {contentMinLength} caractères requis
                </span>
                <span className={`text-xs ${contentLength < contentMinLength ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {contentLength} caractères
                </span>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || contentLength < contentMinLength || titleLength > titleMaxLength || descriptionLength > descriptionMaxLength}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 sm:py-4 px-6 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                <FaSave />
                <span>{loading ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 sm:py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FaTimes />
                <span>Annuler</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

