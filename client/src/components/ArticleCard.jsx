import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaFacebook, FaTwitter, FaWhatsapp, FaComment, FaShare } from 'react-icons/fa'

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
    const url = window.location.origin + `/article/${article.id}`
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
    <article className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col">
      {/* Image */}
      <Link to={`/article/${article.id}`} className="block overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 hover:scale-110"
        />
      </Link>
      
      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <Link to={`/article/${article.id}`}>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 hover:text-orange-500 dark:hover:text-orange-400 transition-colors line-clamp-2">
            {article.title}
          </h2>
        </Link>
        
        {/* Description */}
        <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 flex-grow ${
          !isExpanded ? 'line-clamp-3' : ''
        }`}>
          {article.description}
        </p>

        {/* Actions Row 1 - Read More / View Full */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-2 sm:py-2.5 px-4 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base shadow-md"
          >
            {isExpanded ? 'Réduire' : 'Lire la suite'}
          </button>
          <Link
            to={`/article/${article.id}`}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 sm:py-2.5 px-4 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base text-center shadow-md"
          >
            Article complet →
          </Link>
        </div>

        {/* Actions Row 2 - Like & Favorite */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleLike}
            className="flex items-center gap-2 text-sm sm:text-base bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 sm:px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FaHeart className="text-sm sm:text-base" />
            <span className="font-semibold">{likes}</span>
          </button>

          <button 
            onClick={handleFavorite}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
              isFavorite 
                ? 'bg-yellow-400 text-yellow-900' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isFavorite ? <FaStar /> : <FaRegStar />}
            <span className="font-semibold hidden sm:inline">{isFavorite ? 'Favori' : 'Favoris'}</span>
          </button>
        </div>

        {/* Share Buttons - Mobile Optimized */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaShare className="text-gray-500 dark:text-gray-400 text-sm" />
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Partager :</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleShare('facebook')}
              className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md"
            >
              <FaFacebook />
              <span className="hidden sm:inline">Facebook</span>
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="flex-1 bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md"
            >
              <FaTwitter />
              <span className="hidden sm:inline">Twitter</span>
            </button>
            <button 
              onClick={() => handleShare('whatsapp')}
              className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md"
            >
              <FaWhatsapp />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={handleToggleComments}
              className="flex items-center gap-2 text-sm sm:text-base text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors font-medium"
            >
              <FaComment />
              <span>Commentaires ({comments.length})</span>
            </button>
            <button 
              onClick={handleToggleComments}
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showComments ? 'Masquer' : 'Afficher'}
            </button>
          </div>

          {showComments && (
            <div className="space-y-3 animate-fadeIn">
              <form onSubmit={handleAddComment} className="space-y-2">
                <input 
                  type="text"
                  placeholder="Votre nom"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <textarea 
                  placeholder="Votre commentaire..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows="2"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-2 sm:py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base shadow-md"
                >
                  Publier
                </button>
              </form>

              <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    Aucun commentaire. Soyez le premier !
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <strong className="text-sm sm:text-base text-orange-600 dark:text-orange-400">
                          {comment.name}
                        </strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
