import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ darkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Charger le compteur de favoris
    fetch('/api/favorites/count')
      .then(res => res.json())
      .then(data => setFavoritesCount(data.count))
      .catch(err => console.error('Erreur favoris:', err))
  }, [])

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? darkMode 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-700/50' 
          : 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50'
        : darkMode
          ? 'bg-gray-900/90 backdrop-blur-sm'
          : 'bg-white/90 backdrop-blur-sm'
    } ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-center p-5">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          À la Conquête du Monde
        </h1>

        <div className="flex items-center justify-center md:justify-start mt-2 md:mt-0">
          <img 
            src="/assets/images/Logo-voyage.png" 
            className="w-16 h-16 rounded-full" 
            alt="Logo" 
          />
        </div>

        <button 
          id="menu-btn"
          className="md:hidden text-2xl text-gray-800 dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>

        <nav className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row w-full md:w-auto text-center md:text-left`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/destinations" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                Destinations
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <button className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition">
                ⭐ Favoris (<span>{favoritesCount}</span>)
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  )
}

