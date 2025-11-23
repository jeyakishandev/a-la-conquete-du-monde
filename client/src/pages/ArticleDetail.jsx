import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [commentForm, setCommentForm] = useState({ name: '', content: '' })

  useEffect(() => {
    loadArticle()
    loadComments()
  }, [id])

  const loadArticle = async () => {
    try {
      const { data } = await axios.get(`/api/articles/${id}`)
      setArticle(data)
      setLikes(data._count?.likes || 0)
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement article:', error)
      setLoading(false)
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
      const { data } = await axios.post(`/api/likes/toggle/${id}`, { userId: null })
      setLikes(data.count)
    } catch (error) {
      console.error('Erreur like:', error)
    }
  }

  const handleFavorite = async () => {
    try {
      const { data } = await axios.post(`/api/favorites/toggle/${id}`, { userId: null })
      setIsFavorite(data.favorited)
    } catch (error) {
      console.error('Erreur favori:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!commentForm.name || !commentForm.content) return

    try {
      await axios.post('/api/comments', {
        name: commentForm.name,
        content: commentForm.content,
        articleId: parseInt(id)
      })
      setCommentForm({ name: '', content: '' })
      loadComments()
      loadArticle() // Recharger pour mettre à jour le compteur
    } catch (error) {
      console.error('Erreur ajout commentaire:', error)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Article non trouvé</p>
          <Link to="/blog" className="text-orange-500 hover:text-orange-600">
            ← Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-2 transition"
        >
          ← Retour
        </button>

        {/* Image principale */}
        <div className="mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* En-tête de l'article */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-1 rounded-full text-sm font-semibold">
              {article.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              👁️ {article.views} vues
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {article.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b dark:border-gray-700">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition"
            >
              ❤️ J'aime ({likes})
            </button>

            <button
              onClick={handleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                isFavorite
                  ? 'bg-yellow-400 text-yellow-900'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⭐ {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleShare('facebook')}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
              >
                📘 Partager
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-500 transition"
              >
                🐦 Twitter
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
              >
                📱 WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Contenu de l'article */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {article.content}
            </p>
          </div>
        </div>

        {/* Section commentaires */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              💬 Commentaires ({comments.length})
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
              <form onSubmit={handleAddComment} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  className="w-full p-3 border dark:border-gray-600 rounded-lg mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  required
                />
                <textarea
                  placeholder="Votre commentaire..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  className="w-full p-3 border dark:border-gray-600 rounded-lg mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Publier le commentaire
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
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-orange-600 dark:text-orange-400">
                          {comment.name}
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
                      <p className="text-gray-700 dark:text-gray-300">
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
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
          >
            ← Retour au blog
          </Link>
        </div>
      </div>
    </div>
  )
}

