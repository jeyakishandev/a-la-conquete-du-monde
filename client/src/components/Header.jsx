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
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black bg-opacity-80 shadow-xl' : 'bg-white shadow-md'
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
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
              >
                Articles
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

        <button 
          onClick={toggleDarkMode}
          className="fixed bottom-5 right-5 bg-gray-800 dark:bg-white text-white dark:text-black p-3 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

