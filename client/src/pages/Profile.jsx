import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { 
  FaUser, 
  FaEnvelope, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaBook, 
  FaEye, 
  FaHeart, 
  FaStar, 
  FaComment, 
  FaArrowLeft,
  FaCalendar,
  FaChartLine,
  FaLock,
  FaSync
} from 'react-icons/fa'

export default function Profile() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData || userData === 'undefined' || userData === 'null') {
      showToast('Vous devez être connecté pour accéder à votre profil', 'warning')
      navigate('/login')
      return
    }

    loadProfile()
    loadStats()
  }, [])

  const loadProfile = async () => {
    try {
      const { data } = await api.get('/users/profile')
      setUser(data.user)
      setFormData({
        name: data.user.name || '',
        email: data.user.email || '',
        username: data.user.username || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement profil:', error)
      if (error.response?.status === 401) {
        showToast('Session expirée. Veuillez vous reconnecter.', 'warning')
        navigate('/login')
      } else {
        showToast('Erreur lors du chargement du profil', 'error')
      }
      setLoading(false)
    }
  }

  const loadStats = async (showLoading = false) => {
    try {
      if (showLoading) setRefreshing(true)
      const { data } = await api.get('/users/stats')
      setStats(data)
    } catch (error) {
      console.error('Erreur chargement statistiques:', error)
      if (showLoading) {
        showToast('Erreur lors du chargement des statistiques', 'error')
      }
    } finally {
      if (showLoading) setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    await Promise.all([loadProfile(), loadStats(true)])
    showToast('Profil rafraîchi !', 'success')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.name && formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (formData.username && formData.username.trim().length < 3) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères'
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Le mot de passe actuel est requis'
      }
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Le nouveau mot de passe doit contenir au moins 8 caractères'
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showToast('Veuillez corriger les erreurs dans le formulaire', 'warning')
      return
    }

    try {
      const updateData = {
        name: formData.name || undefined,
        email: formData.email || undefined,
        username: formData.username || undefined
      }

      // Inclure le changement de mot de passe seulement si un nouveau mot de passe est fourni
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword
        updateData.newPassword = formData.newPassword
      }

      const { data } = await api.put('/users/profile', updateData)
      
      // Mettre à jour le localStorage avec les nouvelles informations
      const updatedUser = { ...user, ...data.user }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      // Recharger les statistiques après modification
      await loadStats()
      
      setIsEditing(false)
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      
      showToast('Profil mis à jour avec succès !', 'success')
      
      // Forcer le rechargement du header si nécessaire
      window.dispatchEvent(new Event('userUpdated'))
    } catch (error) {
      console.error('Erreur mise à jour profil:', error)
      const errorMessage = error.response?.data?.error || 'Erreur lors de la mise à jour du profil'
      showToast(errorMessage, 'error')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const getAvatarInitial = (name, username) => {
    const displayName = name || username || 'U'
    return displayName.charAt(0).toUpperCase()
  }

  // Composant de compteur animé
  const AnimatedCounter = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (value === undefined || value === null) return
      
      let startTime = null
      const startValue = 0
      const endValue = value

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(endValue)
        }
      }

      requestAnimationFrame(animate)
    }, [value, duration])

    return <span>{count}</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement du profil...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors mb-6 sm:mb-8 text-sm font-medium"
        >
          <FaArrowLeft />
          <span>Retour</span>
        </button>

        {/* Hero Section */}
        <section className="relative min-h-[30vh] sm:min-h-[40vh] flex items-center justify-center overflow-hidden mb-8 sm:mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
            {/* Avatar */}
            <div className="mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl sm:text-6xl font-bold text-white border-4 border-white/30 shadow-2xl">
                {getAvatarInitial(user.name, user.username)}
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 leading-tight text-white drop-shadow-2xl">
              {user.name || user.username}
            </h1>
            
            <p className="text-base sm:text-lg text-white/90 mb-4 drop-shadow-lg">
              @{user.username}
            </p>

            <p className="text-sm sm:text-base text-white/80 flex items-center justify-center gap-2">
              <FaCalendar />
              <span>Membre depuis {formatDate(user.createdAt)}</span>
            </p>
          </div>

          {/* Vague de séparation */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 sm:h-20 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" className="text-sky-50 dark:text-gray-900"></path>
            </svg>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 -mt-6 sm:-mt-8 lg:-mt-12 relative z-10">
          {/* Statistiques */}
          {stats && (
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <FaChartLine />
                      <span>Statistiques</span>
                    </h2>
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Rafraîchir les statistiques"
                    >
                      <FaSync className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaBook className="text-orange-500 text-xl" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Articles</span>
                      </div>
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        <AnimatedCounter value={stats.articles.total} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaEye className="text-blue-500 text-xl" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Vues</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        <AnimatedCounter value={stats.articles.totalViews} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaHeart className="text-red-500 text-xl" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Likes</span>
                      </div>
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                        <AnimatedCounter value={stats.articles.totalLikes} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaStar className="text-yellow-500 text-xl" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Favoris</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        <AnimatedCounter value={stats.articles.totalFavorites} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaComment className="text-green-500 text-xl" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Commentaires</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        <AnimatedCounter value={stats.articles.totalComments} />
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engagement</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Commentaires écrits</span>
                        <span className="font-semibold">
                          <AnimatedCounter value={stats.engagement.commentsWritten} duration={800} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Articles favoris</span>
                        <span className="font-semibold">
                          <AnimatedCounter value={stats.engagement.articlesFavorited} duration={800} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Articles likés</span>
                        <span className="font-semibold">
                          <AnimatedCounter value={stats.engagement.articlesLiked} duration={800} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formulaire de profil */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaUser />
                    <span>Informations du profil</span>
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full hover:scale-105 transition-all shadow-lg"
                    >
                      <FaEdit />
                      <span>Modifier</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaUser className="inline mr-2" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        isEditing ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      } ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        isEditing ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      } ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaUser className="inline mr-2" />
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        isEditing ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      } ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                  </div>

                  {/* Changement de mot de passe */}
                  {isEditing && (
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaLock />
                        <span>Changer le mot de passe</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mot de passe actuel
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                              errors.currentPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                              errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Boutons d'action */}
                  {isEditing && (
                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transition-all shadow-lg"
                      >
                        <FaSave />
                        <span>Enregistrer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            name: user.name || '',
                            email: user.email || '',
                            username: user.username || '',
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          })
                          setErrors({})
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-full hover:scale-105 transition-all"
                      >
                        <FaTimes />
                        <span>Annuler</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            to="/my-articles"
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg border border-white/50 dark:border-gray-700/50"
          >
            <FaBook />
            <span>Mes articles</span>
          </Link>
          <Link
            to="/favorites"
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg border border-white/50 dark:border-gray-700/50"
          >
            <FaStar />
            <span>Mes favoris</span>
          </Link>
          <Link
            to="/create-article"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg"
          >
            <FaEdit />
            <span>Créer un article</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

