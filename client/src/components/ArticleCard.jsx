import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ArticleCard({ article }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [likes, setLikes] = useState(article._count?.likes || 0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentForm, setCommentForm] = useState({ name: '', content: '' })

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`/api/likes/toggle/${article.id}`, { userId: null })
      setLikes(data.count)
    } catch (error) {
      console.error('Erreur like:', error)
    }
  }

  const handleFavorite = async () => {
    try {
      const { data } = await axios.post(`/api/favorites/toggle/${article.id}`, { userId: null })
      setIsFavorite(data.favorited)
    } catch (error) {
      console.error('Erreur favori:', error)
    }
  }

  const loadComments = async () => {
    try {
      const { data } = await axios.get(`/api/comments/article/${article.id}`)
      setComments(data)
    } catch (error) {
      console.error('Erreur commentaires:', error)
    }
  }

  const handleToggleComments = () => {
    setShowComments(!showComments)
    if (!showComments && comments.length === 0) {
      loadComments()
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!commentForm.name || !commentForm.content) return

    try {
      await axios.post('/api/comments', {
        name: commentForm.name,
        content: commentForm.content,
        articleId: article.id
      })
      setCommentForm({ name: '', content: '' })
      loadComments()
    } catch (error) {
      console.error('Erreur ajout commentaire:', error)
    }
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = article.title
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

  return (
    <article className="article-card fade-in">
      <img 
        src={article.image} 
        alt={article.title} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      
      <p className={`text-sm text-gray-600 dark:text-gray-300 mb-3 ${
        !isExpanded ? 'line-clamp-3' : ''
      }`}>
        {article.description}
      </p>

      <div className="flex gap-2 mb-3">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-2 px-4 rounded-full shadow-md hover:scale-105 transition"
        >
          {isExpanded ? 'Réduire' : 'Lire la suite'}
        </button>
        <Link
          to={`/article/${article.id}`}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded-full shadow-md hover:scale-105 transition"
        >
          Voir l'article complet →
        </Link>
      </div>

      <div className="flex justify-between items-center mb-3">
        <button 
          onClick={handleLike}
          className="like-btn text-sm"
        >
          ❤️ J'aime ({likes})
        </button>

        <button 
          onClick={handleFavorite}
          className={`px-3 py-1 rounded-full text-sm transition ${
            isFavorite 
              ? 'bg-yellow-400 text-yellow-900' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          ⭐ {isFavorite ? 'Favori' : 'Favoris'}
        </button>
      </div>

      {/* Boutons de partage */}
      <div className="flex space-x-2 mb-3">
        <button 
          onClick={() => handleShare('facebook')}
          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
        >
          📘 Facebook
        </button>
        <button 
          onClick={() => handleShare('twitter')}
          className="bg-blue-400 text-white px-3 py-1 rounded text-xs hover:bg-blue-500 transition"
        >
          🐦 Twitter
        </button>
        <button 
          onClick={() => handleShare('whatsapp')}
          className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition"
        >
          📱 WhatsApp
        </button>
      </div>

      {/* Section commentaires */}
      <div className="border-t pt-3 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            💬 Commentaires ({comments.length})
          </h4>
          <button 
            onClick={handleToggleComments}
            className="text-xs text-orange-500 hover:text-orange-600 transition"
          >
            {showComments ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        {showComments && (
          <div className="slide-in">
            <form onSubmit={handleAddComment} className="mb-3">
              <input 
                type="text"
                placeholder="Votre nom"
                value={commentForm.name}
                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                className="w-full p-2 border dark:border-gray-600 rounded mb-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <textarea 
                placeholder="Votre commentaire..."
                value={commentForm.content}
                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                className="w-full p-2 border dark:border-gray-600 rounded mb-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                rows="2"
              />
              <button 
                type="submit"
                className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition"
              >
                Publier
              </button>
            </form>

            <div className="space-y-2">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-orange-600 dark:text-orange-400">
                        {comment.name}
                      </strong>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

