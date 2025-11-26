import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaPaperPlane, 
  FaCompass,
  FaMapMarkedAlt,
  FaBook,
  FaEnvelope,
  FaInfoCircle,
  FaHome,
  FaStar,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaHeart
} from 'react-icons/fa'
import { useToast } from '../context/ToastContext'

export default function Footer({ darkMode }) {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      showToast('Veuillez entrer votre email', 'warning')
      return
    }
    // Ici vous pouvez ajouter l'intégration avec votre API
    showToast('Merci pour votre abonnement à la newsletter !', 'success')
    setEmail('')
  }

  return (
    <footer className={`relative mt-20 pt-12 pb-8 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-orange-500/20' 
        : 'bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/30 border-t border-orange-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Contenu principal du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Section 1: À propos */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img 
                  src="/assets/images/Logo-voyage.png" 
                  className="w-10 h-10 rounded-full ring-2 ring-orange-400/50" 
                  alt="Logo" 
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className={`font-bold text-lg ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  À la Conquête
                </h3>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  du Monde
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Découvrez les plus beaux endroits de la planète à travers nos récits d'aventure authentiques, 
              conseils pratiques et guides détaillés pour transformer vos rêves de voyage en réalité.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <FaCompass className={`text-orange-500 animate-spin-slow ${
                darkMode ? 'opacity-80' : ''
              }`} />
              <span className={`text-xs italic ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Explorez • Rêvez • Voyagez
              </span>
            </div>
          </div>

          {/* Section 2: Navigation rapide */}
          <div>
            <h4 className={`font-bold text-base mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-500 hover:translate-x-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaHome className="text-xs" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-500 hover:translate-x-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaBook className="text-xs" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/destinations" 
                  className={`flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-500 hover:translate-x-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaMapMarkedAlt className="text-xs" />
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-500 hover:translate-x-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaInfoCircle className="text-xs" />
                  <span>À propos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-500 hover:translate-x-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaEnvelope className="text-xs" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className={`flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-500 hover:translate-x-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaStar className="text-xs" />
                  <span>Favoris</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Newsletter */}
          <div className="min-w-0">
            <h4 className={`font-bold text-base mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Newsletter
            </h4>
            <p className={`text-sm mb-4 leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Restez informé de nos dernières aventures, conseils de voyage exclusifs et offres spéciales. 
              Rejoignez notre communauté de voyageurs passionnés !
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2 sm:space-y-3">
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email" 
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm sm:text-base rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2 font-semibold"
                >
                  <FaPaperPlane />
                  <span>Envoyer</span>
                </button>
              </div>
              <p className={`text-xs mt-2 ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                En vous abonnant, vous acceptez de recevoir nos emails. 
                Vous pouvez vous désabonner à tout moment.
              </p>
            </form>
          </div>

          {/* Section 4: Réseaux sociaux et contact */}
          <div className="min-w-0">
            <h4 className={`font-bold text-base mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Suivez-nous
            </h4>
            <p className={`text-sm mb-4 leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Rejoignez notre communauté sur les réseaux sociaux pour partager vos propres aventures 
              et découvrir de nouvelles destinations !
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 flex-wrap">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 text-white hover:bg-blue-600' 
                    : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white shadow-md'
                }`}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 text-white hover:bg-pink-600' 
                    : 'bg-white text-gray-700 hover:bg-pink-500 hover:text-white shadow-md'
                }`}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 text-white hover:bg-sky-500' 
                    : 'bg-white text-gray-700 hover:bg-sky-500 hover:text-white shadow-md'
                }`}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-700 hover:bg-red-600 hover:text-white shadow-md'
                }`}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 text-white hover:bg-red-500' 
                    : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-md'
                }`}
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className={`h-px w-full my-8 ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-300/50'
        }`}></div>

        {/* Bas du footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className={`text-sm text-center sm:text-left ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p className="mb-1">
              &copy; {new Date().getFullYear()} À la Conquête du Monde. Tous droits réservés.
            </p>
            <p className="text-xs">
              Fait avec <FaHeart className="inline text-red-500 animate-pulse" /> par des passionnés de voyage
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <Link 
              to="/about" 
              className={`transition-all duration-300 hover:text-orange-500 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Mentions légales
            </Link>
            <Link 
              to="/contact" 
              className={`transition-all duration-300 hover:text-orange-500 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Politique de confidentialité
            </Link>
            <Link 
              to="/contact" 
              className={`transition-all duration-300 hover:text-orange-500 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              CGU
            </Link>
            <span className={`${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Version React + Node.js + Express + Prisma
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}