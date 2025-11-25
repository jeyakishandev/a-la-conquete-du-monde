import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '../context/ToastContext'
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaArrowLeft, FaPaperPlane, FaTrash } from 'react-icons/fa'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [commentForm, setCommentForm] = useState({ name: '', content: '' })
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    if (id) {
      loadArticle()
      loadComments()
    }
  }, [id, user])

  const loadArticle = async () => {
    try {
      const { data } = await axios.get(`/api/articles/${id}`)
      setArticle(data)
      setLikes(data._count?.likes || 0)
      
      // Vérifier si l'utilisateur a déjà liké cet article
      if (user?.id) {
        await checkUserLike()
        await checkUserFavorite()
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement article:', error)
      setLoading(false)
    }
  }

  const checkUserLike = async () => {
    try {
      if (!user?.id) return
      const { data } = await axios.get(`/api/likes/${id}?userId=${user.id}`)
      setIsLiked(data.liked || false)
    } catch (error) {
      // Ignorer l'erreur
      console.error('Erreur vérification like:', error)
    }
  }

  const checkUserFavorite = async () => {
    try {
      if (!user?.id) return
      const { data } = await axios.get(`/api/favorites/check/${id}?userId=${user.id}`)
      setIsFavorite(data.favorited || false)
    } catch (error) {
      // Ignorer l'erreur
      console.error('Erreur vérification favori:', error)
    }
  }

  const loadComments = async () => {
    try {
      const { data } = await axios.get(`/api/comments/article/${id}`)
      setComments(data)
    } catch (error) {
      console.error('Erreur commentaires:', error)
    }
  }

  const handleLike = async () => {
    try {
      const userData = localStorage.getItem('user')
      const currentUser = userData ? JSON.parse(userData) : null
      
      const { data } = await axios.post(`/api/likes/toggle/${id}`, { 
        userId: currentUser?.id || null 
      })
      
      setLikes(data.count)
      setIsLiked(data.liked)
      
      if (data.liked) {
        showToast('Article ajouté aux likes !', 'success')
      } else {
        showToast('Like retiré', 'info')
      }
    } catch (error) {
      console.error('Erreur like:', error)
      showToast('Erreur lors de l\'ajout du like. Veuillez réessayer.', 'error')
    }
  }

  const handleFavorite = async () => {
    try {
      const userData = localStorage.getItem('user')
      const currentUser = userData ? JSON.parse(userData) : null
      
      if (!currentUser?.id) {
        showToast('Vous devez être connecté pour ajouter aux favoris', 'warning')
        setTimeout(() => navigate('/login'), 1500)
        return
      }
      
      const { data } = await axios.post(`/api/favorites/toggle/${id}`, { 
        userId: currentUser.id 
      })
      setIsFavorite(data.favorited)
      
      if (data.favorited) {
        showToast('Article ajouté aux favoris !', 'success')
      } else {
        showToast('Article retiré des favoris', 'info')
      }
    } catch (error) {
      console.error('Erreur favori:', error)
      if (error.response?.status === 401) {
        showToast('Vous devez être connecté pour ajouter aux favoris', 'warning')
        setTimeout(() => navigate('/login'), 1500)
      } else {
        showToast('Erreur lors de l\'ajout aux favoris. Veuillez réessayer.', 'error')
      }
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!commentForm.content.trim()) {
      showToast('Veuillez entrer un commentaire', 'warning')
      return
    }

    // Si l'utilisateur n'est pas connecté, demander le nom
    if (!user && !commentForm.name.trim()) {
      showToast('Veuillez entrer votre nom', 'warning')
      return
    }

    try {
      const userData = localStorage.getItem('user')
      const currentUser = userData ? JSON.parse(userData) : null
      
      await axios.post('/api/comments', {
        name: currentUser?.name || currentUser?.username || commentForm.name.trim(),
        content: commentForm.content.trim(),
        articleId: parseInt(id),
        userId: currentUser?.id || null
      })
      
      setCommentForm({ name: '', content: '' })
      showToast('Commentaire publié avec succès !', 'success')
      loadComments()
      loadArticle() // Recharger pour mettre à jour le compteur
    } catch (error) {
      console.error('Erreur ajout commentaire:', error)
      showToast(error.response?.data?.error || 'Erreur lors de la publication du commentaire', 'error')
    }
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = article?.title || ''
    let shareUrl = ''

    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Article non trouvé</p>
          <Link to="/blog" className="text-orange-500 hover:text-orange-600">
            ← Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-all hover:translate-x-[-4px]"
        >
          <FaArrowLeft />
          <span>Retour</span>
        </button>

        {/* Image principale */}
        <div className="mb-8 sm:mb-12">
          <img
            src={article.image?.startsWith('/') ? article.image : `/${article.image}`}
            alt={article.title}
            className="w-full h-64 sm:h-96 lg:h-[500px] object-cover rounded-3xl sm:rounded-[2.5rem] shadow-2xl"
            onError={(e) => {
              // Fallback si l'image ne charge pas
              e.target.src = '/assets/images/cover.jpg'
            }}
          />
        </div>

        {/* En-tête de l'article */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 text-orange-800 dark:text-orange-200 px-4 sm:px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                {article.category}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {article.views} vues
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isLiked
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
              }`}
            >
              {isLiked ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
              <span>J'aime ({likes})</span>
            </button>

            <button
              onClick={handleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                isFavorite
                  ? 'bg-yellow-400 text-yellow-900'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {isFavorite ? <FaStar className="text-lg" /> : <FaRegStar className="text-lg" />}
              <span>{isFavorite ? 'Favori' : 'Ajouter aux favoris'}</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
              >
                <FaFacebook />
                <span>Partager</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-500 transition"
              >
                <FaTwitter />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

          </div>
        </div>

        {/* Contenu de l'article */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base sm:text-lg">
              {article.content}
            </p>
          </div>
        </div>

        {/* Section commentaires */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Commentaires ({comments.length})
            </h2>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-orange-500 hover:text-orange-600 transition"
            >
              {showComments ? 'Masquer' : 'Afficher'}
            </button>
          </div>

          {showComments && (
            <div className="space-y-6">
              {/* Formulaire de commentaire */}
              <form onSubmit={handleAddComment} className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-600">
                {!user && (
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-xl mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required={!user}
                  />
                )}
                {user && (
                  <div className="mb-3 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl border border-orange-200 dark:border-orange-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Commenter en tant que :</p>
                    <p className="font-semibold text-orange-700 dark:text-orange-300">
                      {user.name || user.username || user.email?.split('@')[0]}
                    </p>
                  </div>
                )}
                <textarea
                  placeholder="Partagez vos pensées..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-xl mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 font-semibold flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-sm" />
                  <span>Publier le commentaire</span>
                </button>
              </form>

              {/* Liste des commentaires */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Aucun commentaire pour le moment. Soyez le premier à commenter !
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {(comment.name || comment.user?.name || comment.user?.username || 'A')[0].toUpperCase()}
                          </div>
                          <div>
                            <strong className="text-orange-600 dark:text-orange-400 block">
                              {comment.name || comment.user?.name || comment.user?.username || 'Anonyme'}
                            </strong>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        {user && (user.id === comment.userId || user.id === comment.user?.id) && (
                          <button
                            onClick={async () => {
                              if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                                try {
                                  await axios.delete(`/api/comments/${comment.id}`)
                                  showToast('Commentaire supprimé avec succès', 'success')
                                  loadComments()
                                } catch (error) {
                                  showToast('Erreur lors de la suppression', 'error')
                                }
                              }
                            }}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Supprimer le commentaire"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Articles similaires */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-4 px-8 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
          >
            <FaArrowLeft />
            <span>Retour au blog</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

