import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  FaBars, 
  FaTimes, 
  FaSignOutAlt, 
  FaStar, 
  FaUser, 
  FaEdit, 
  FaBook, 
  FaHome,
  FaMapMarkedAlt,
  FaInfoCircle,
  FaEnvelope,
  FaCompass
} from 'react-icons/fa'

export default function Header({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [user, setUser] = useState(null)

  // Vérifier si on est sur la page d'accueil avec le hero coloré
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Charger le compteur de favoris
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/favorites/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setFavoritesCount(data.count || 0))
        .catch(err => console.error('Erreur favoris:', err))
    }
  }, [location.pathname])

  useEffect(() => {
    // Fermer le menu mobile quand on change de page
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
    window.location.reload()
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  // Déterminer la couleur du texte selon le contexte
  const getTextColor = (isMenu = false) => {
    // Si on est sur la page d'accueil et pas scrolled, texte blanc (sur fond orange)
    if (isHomePage && !isScrolled) {
      return 'text-white'
    }
    // Sinon, couleur selon le mode dark/light
    if (isMenu) {
      return darkMode ? 'text-gray-300' : 'text-gray-700'
    }
    return darkMode ? 'text-white' : 'text-gray-900'
  }

  // Déterminer la couleur hover
  const getHoverColor = () => {
    if (isHomePage && !isScrolled) {
      return 'hover:text-white hover:bg-white/10'
    }
    return darkMode ? 'hover:text-orange-400 hover:bg-gray-800' : 'hover:text-orange-600 hover:bg-gray-100'
  }

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? darkMode 
          ? 'bg-gray-900/98 backdrop-blur-xl shadow-2xl border-b border-orange-500/20' 
          : 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-orange-200/30'
        : isHomePage
          ? 'bg-transparent' // Transparent sur la page d'accueil
          : darkMode
            ? 'bg-gray-900/95 backdrop-blur-md'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200/50'
    }`}>
      {/* Barre de navigation principale */}
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo et Titre */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <img 
                src="/assets/images/Logo-voyage.png" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-orange-400/50 group-hover:ring-orange-500 transition-all duration-300 group-hover:scale-110" 
                alt="Logo" 
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg sm:text-xl font-bold transition-colors ${
                isHomePage && !isScrolled
                  ? 'text-white drop-shadow-lg'
                  : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                À la Conquête du Monde
              </h1>
              <p className={`text-xs transition-colors ${
                isHomePage && !isScrolled
                  ? 'text-white/80'
                  : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Explorez • Rêvez • Voyagez
              </p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                isActive('/')
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : isHomePage && !isScrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              <FaHome className="text-sm" />
              <span>Accueil</span>
            </Link>

            <Link 
              to="/blog" 
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                isActive('/blog')
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : isHomePage && !isScrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              <FaBook className="text-sm" />
              <span>Blog</span>
            </Link>

            <Link 
              to="/destinations" 
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                isActive('/destinations')
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : isHomePage && !isScrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              <FaMapMarkedAlt className="text-sm" />
              <span>Destinations</span>
            </Link>

            <Link 
              to="/about" 
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                isActive('/about')
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : isHomePage && !isScrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              <FaInfoCircle className="text-sm" />
              <span>À propos</span>
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                isActive('/contact')
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : isHomePage && !isScrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              <FaEnvelope className="text-sm" />
              <span>Contact</span>
            </Link>

            {user && (
              <Link 
                to="/favorites" 
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 relative ${
                  isActive('/favorites')
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : isHomePage && !isScrolled
                      ? 'text-white/90 hover:bg-white/10 hover:text-white'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                }`}
              >
                <FaStar className="text-sm" />
                <span>Favoris</span>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Actions utilisateur et menu mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            {user ? (
              <>
                {/* Bouton Écrire - Desktop */}
                <Link 
                  to="/create-article" 
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                >
                  <FaEdit />
                  <span>Écrire</span>
                </Link>

                {/* Menu utilisateur - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    isHomePage && !isScrolled
                      ? 'bg-white/10 backdrop-blur-md text-white/90'
                      : darkMode 
                        ? 'bg-gray-800 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    <FaUser className="inline mr-2" />
                    {user.username || user.name || user.email.split('@')[0]}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      isHomePage && !isScrolled
                        ? 'text-white/80 hover:bg-white/10'
                        : darkMode 
                          ? 'text-red-400 hover:bg-gray-800' 
                          : 'text-red-600 hover:bg-gray-100'
                    }`}
                    aria-label="Déconnexion"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>

                {/* Bouton menu mobile */}
                <button 
                  className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                    isHomePage && !isScrolled
                      ? 'text-white'
                      : darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>
              </>
            ) : (
              <>
                {/* Boutons connexion/inscription - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                  <Link 
                    to="/login" 
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isHomePage && !isScrolled
                        ? 'text-white/90 hover:bg-white/10'
                        : darkMode 
                          ? 'text-gray-300 hover:bg-gray-800' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30"
                  >
                    Inscription
                  </Link>
                </div>

                {/* Bouton menu mobile */}
                <button 
                  className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                    isHomePage && !isScrolled
                      ? 'text-white'
                      : darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className={`${
          isScrolled || !isHomePage
            ? darkMode ? 'bg-gray-900' : 'bg-white'
            : darkMode ? 'bg-gray-900/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'
        } border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaHome />
              <span>Accueil</span>
            </Link>

            <Link 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive('/blog')
                  ? 'bg-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaBook />
              <span>Blog</span>
            </Link>

            <Link 
              to="/destinations" 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive('/destinations')
                  ? 'bg-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaMapMarkedAlt />
              <span>Destinations</span>
            </Link>

            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaInfoCircle />
              <span>À propos</span>
            </Link>

            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive('/contact')
                  ? 'bg-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaEnvelope />
              <span>Contact</span>
            </Link>

            {user && (
              <>
                <Link 
                  to="/favorites" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                    isActive('/favorites')
                      ? 'bg-orange-500 text-white shadow-lg'
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaStar />
                  <span>Favoris</span>
                  {favoritesCount > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                <Link 
                  to="/create-article" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg"
                >
                  <FaEdit />
                  <span>Écrire un article</span>
                </Link>

                <Link 
                  to="/my-articles" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive('/my-articles')
                      ? 'bg-orange-500 text-white shadow-lg'
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaBook />
                  <span>Mes articles</span>
                </Link>

                <div className={`px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 text-sm">
                    <FaUser className="text-orange-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {user.username || user.name || user.email}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                >
                  <FaSignOutAlt />
                  <span>Déconnexion</span>
                </button>
              </>
            )}

            {!user && (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaUser />
                  <span>Connexion</span>
                </Link>

                <Link 
                  to="/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg"
                >
                  <FaCompass />
                  <span>S'inscrire</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}