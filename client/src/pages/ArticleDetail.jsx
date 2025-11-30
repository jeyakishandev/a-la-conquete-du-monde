import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import LazyImage from '../components/LazyImage';
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaArrowLeft,
  FaPaperPlane,
  FaTrash,
  FaTimes,
} from 'react-icons/fa';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true); // Par défaut, les commentaires sont visibles
  const [showShareMenu, setShowShareMenu] = useState(false); // Menu de partage séparé
  const [commentForm, setCommentForm] = useState({ name: '', content: '' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Erreur parsing user:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadArticle();
      loadComments();
    }
  }, [id, user]);

  const loadArticle = async () => {
    try {
      const { data } = await api.get(`/articles/${id}`);
      setArticle(data);
      setLikes(data._count?.likes || 0);

      // Vérifier si l'utilisateur a déjà liké cet article
      if (user?.id) {
        await checkUserLike();
        await checkUserFavorite();
      }

      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement article:', error);
      setLoading(false);
    }
  };

  const checkUserLike = async () => {
    try {
      if (!user?.id) return;
      const { data } = await api.get(`/likes/${id}?userId=${user.id}`);
      setIsLiked(data.liked || false);
    } catch (error) {
      // Ignorer l'erreur
      console.error('Erreur vérification like:', error);
    }
  };

  const checkUserFavorite = async () => {
    try {
      if (!user?.id) return;
      const { data } = await api.get(`/favorites/check/${id}?userId=${user.id}`);
      setIsFavorite(data.favorited || false);
    } catch (error) {
      // Ignorer l'erreur
      console.error('Erreur vérification favori:', error);
    }
  };

  const loadComments = async () => {
    try {
      const { data } = await api.get(`/comments/article/${id}`);
      setComments(data);
    } catch (error) {
      console.error('Erreur commentaires:', error);
    }
  };

  const handleLike = async () => {
    try {
      const userData = localStorage.getItem('user');
      const currentUser =
        userData && userData !== 'undefined' && userData !== 'null' ? JSON.parse(userData) : null;

      const { data } = await api.post(`/likes/toggle/${id}`, {
        userId: currentUser?.id || null,
      });

      setLikes(data.count);
      setIsLiked(data.liked);

      if (data.liked) {
        showToast('Article ajouté aux likes !', 'success');
      } else {
        showToast('Like retiré', 'info');
      }
    } catch (error) {
      console.error('Erreur like:', error);
      showToast("Erreur lors de l'ajout du like. Veuillez réessayer.", 'error');
    }
  };

  const handleFavorite = async () => {
    try {
      const userData = localStorage.getItem('user');
      const currentUser =
        userData && userData !== 'undefined' && userData !== 'null' ? JSON.parse(userData) : null;

      if (!currentUser?.id) {
        showToast('Vous devez être connecté pour ajouter aux favoris', 'warning');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      const { data } = await api.post(`/favorites/toggle/${id}`, {
        userId: currentUser.id,
      });
      setIsFavorite(data.favorited);

      if (data.favorited) {
        showToast('Article ajouté aux favoris !', 'success');
      } else {
        showToast('Article retiré des favoris', 'info');
      }
    } catch (error) {
      console.error('Erreur favori:', error);
      if (error.response?.status === 401) {
        showToast('Vous devez être connecté pour ajouter aux favoris', 'warning');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        showToast("Erreur lors de l'ajout aux favoris. Veuillez réessayer.", 'error');
      }
    }
  };

  const handleAddComment = async e => {
    e.preventDefault();

    // Validation
    if (!commentForm.content.trim()) {
      showToast('Veuillez entrer un commentaire', 'warning');
      return;
    }

    // Si l'utilisateur n'est pas connecté, demander le nom
    if (!user && !commentForm.name.trim()) {
      showToast('Veuillez entrer votre nom', 'warning');
      return;
    }

    try {
      const userData = localStorage.getItem('user');
      const currentUser =
        userData && userData !== 'undefined' && userData !== 'null' ? JSON.parse(userData) : null;

      await api.post('/comments', {
        name: currentUser?.name || currentUser?.username || commentForm.name.trim(),
        content: commentForm.content.trim(),
        articleId: parseInt(id),
        userId: currentUser?.id || null,
      });

      setCommentForm({ name: '', content: '' });
      showToast('Commentaire publié avec succès !', 'success');
      loadComments();
      loadArticle(); // Recharger pour mettre à jour le compteur
    } catch (error) {
      console.error('Erreur ajout commentaire:', error);
      showToast(
        error.response?.data?.error || 'Erreur lors de la publication du commentaire',
        'error'
      );
    }
  };

  const handleShare = platform => {
    const url = window.location.href;
    const title = article?.title || '';
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de l'article...</p>
        </div>
      </div>
    );
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 lg:mb-8 inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium text-sm sm:text-base transition-all hover:translate-x-[-4px]"
        >
          <FaArrowLeft className="text-sm sm:text-base" />
          <span>Retour</span>
        </button>

        {/* Image principale */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <LazyImage
            src={
              article.image?.startsWith('http://') || article.image?.startsWith('https://')
                ? article.image
                : article.image?.startsWith('/')
                  ? article.image
                  : `/${article.image}`
            }
            alt={article.title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-[500px] object-cover rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-2xl"
            width="1200"
            height="500"
          />
        </div>

        {/* En-tête de l'article */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-10 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 text-orange-800 dark:text-orange-200 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                {article.category}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base">
                {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base">
                {article.views} vues
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Actions - Mobile optimisé */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
              {/* Actions principales */}
              <div className="flex gap-2 sm:gap-3 flex-1">
                <button
                  onClick={handleLike}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                    isLiked
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                      : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                  }`}
                >
                  {isLiked ? (
                    <FaHeart className="text-base sm:text-lg" />
                  ) : (
                    <FaRegHeart className="text-base sm:text-lg" />
                  )}
                  <span className="whitespace-nowrap">J'aime ({likes})</span>
                </button>

                <button
                  onClick={handleFavorite}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-full transition text-sm sm:text-base ${
                    isFavorite
                      ? 'bg-yellow-400 text-yellow-900 shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {isFavorite ? (
                    <FaStar className="text-base sm:text-lg" />
                  ) : (
                    <FaRegStar className="text-base sm:text-lg" />
                  )}
                  <span className="hidden sm:inline">{isFavorite ? 'Favori' : 'Favori'}</span>
                  <span className="sm:hidden">{isFavorite ? 'Fav' : 'Fav'}</span>
                </button>
              </div>

              {/* Partage - Menu déroulant sur mobile */}
              <div className="relative sm:flex sm:gap-2 z-30">
                {/* Bouton principal sur mobile */}
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-full sm:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2.5 rounded-full text-sm hover:opacity-90 transition shadow-lg"
                >
                  <FaShare />
                  <span>Partager</span>
                </button>

                {/* Menu partage mobile - Positionné en fixed pour éviter le clipping */}
                {showShareMenu && (
                  <>
                    {/* Overlay pour fermer le menu */}
                    <div
                      className="sm:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                      onClick={() => setShowShareMenu(false)}
                    />
                    {/* Menu dropdown */}
                    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl border-t border-gray-200 dark:border-gray-700 p-4 z-50 animate-slide-up">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Partager sur
                        </h3>
                        <button
                          onClick={() => setShowShareMenu(false)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            handleShare('facebook');
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 bg-blue-500 text-white px-4 py-4 rounded-xl text-base hover:bg-blue-600 transition shadow-lg"
                        >
                          <FaFacebook className="text-xl" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => {
                            handleShare('twitter');
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 bg-blue-400 text-white px-4 py-4 rounded-xl text-base hover:bg-blue-500 transition shadow-lg"
                        >
                          <FaTwitter className="text-xl" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => {
                            handleShare('whatsapp');
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center gap-3 bg-green-500 text-white px-4 py-4 rounded-xl text-base hover:bg-green-600 transition shadow-lg"
                        >
                          <FaWhatsapp className="text-xl" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Boutons partage desktop */}
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-blue-600 transition shadow-lg"
                    title="Partager sur Facebook"
                  >
                    <FaFacebook />
                    <span className="hidden md:inline">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 bg-blue-400 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-blue-500 transition shadow-lg"
                    title="Partager sur Twitter"
                  >
                    <FaTwitter />
                    <span className="hidden md:inline">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-green-600 transition shadow-lg"
                    title="Partager sur WhatsApp"
                  >
                    <FaWhatsapp />
                    <span className="hidden md:inline">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu de l'article */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-10 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base lg:text-lg">
              {article.content}
            </p>
          </div>
        </div>

        {/* Section commentaires */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-10 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Commentaires ({comments.length})
              </h2>
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-sm sm:text-base text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition font-medium"
              >
                {showComments ? 'Masquer' : 'Afficher les commentaires'}
              </button>
            </div>

            {showComments && (
              <div className="space-y-4 sm:space-y-6">
                {/* Formulaire de commentaire */}
                <form
                  onSubmit={handleAddComment}
                  className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-md p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200 dark:border-gray-600"
                >
                  {!user && (
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={commentForm.name}
                      onChange={e => setCommentForm({ ...commentForm, name: e.target.value })}
                      className="w-full p-2.5 sm:p-3 lg:p-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                      required={!user}
                    />
                  )}
                  {user && (
                    <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg sm:rounded-xl border border-orange-200 dark:border-orange-700">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Commenter en tant que :
                      </p>
                      <p className="font-semibold text-orange-700 dark:text-orange-300 text-sm sm:text-base">
                        {user.name || user.username || user.email?.split('@')[0]}
                      </p>
                    </div>
                  )}
                  <textarea
                    placeholder="Partagez vos pensées..."
                    value={commentForm.content}
                    onChange={e => setCommentForm({ ...commentForm, content: e.target.value })}
                    className="w-full p-2.5 sm:p-3 lg:p-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                    rows="4"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <FaPaperPlane className="text-xs sm:text-sm" />
                    <span>Publier</span>
                  </button>
                </form>

                {/* Liste des commentaires */}
                <div className="space-y-3 sm:space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8 text-sm sm:text-base">
                      Aucun commentaire pour le moment. Soyez le premier à commenter !
                    </p>
                  ) : (
                    comments.map(comment => (
                      <div
                        key={comment.id}
                        className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-md p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs sm:text-sm flex-shrink-0">
                              {(comment.name ||
                                comment.user?.name ||
                                comment.user?.username ||
                                'A')[0].toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <strong className="text-orange-600 dark:text-orange-400 block text-sm sm:text-base truncate">
                                {comment.name ||
                                  comment.user?.name ||
                                  comment.user?.username ||
                                  'Anonyme'}
                              </strong>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                          {user && (user.id === comment.userId || user.id === comment.user?.id) && (
                            <button
                              onClick={async () => {
                                if (
                                  window.confirm(
                                    'Êtes-vous sûr de vouloir supprimer ce commentaire ?'
                                  )
                                ) {
                                  try {
                                    await api.delete(`/comments/${comment.id}`);
                                    showToast('Commentaire supprimé avec succès', 'success');
                                    loadComments();
                                  } catch {
                                    showToast('Erreur lors de la suppression', 'error');
                                  }
                                }
                              }}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all flex-shrink-0"
                              title="Supprimer le commentaire"
                            >
                              <FaTrash className="text-xs sm:text-sm" />
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
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

        {/* Bouton retour blog */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 text-sm sm:text-base"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
            <span>Retour au blog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
