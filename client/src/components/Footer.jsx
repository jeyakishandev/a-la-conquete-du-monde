import { Link } from 'react-router-dom'

export default function Footer({ darkMode, toggleDarkMode }) {
  return (
    <footer className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 mt-10 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-4">
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Articles
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <input 
            type="email" 
            placeholder="Votre email" 
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-l bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button className="bg-orange-500 text-white p-2 rounded-r hover:bg-orange-600 transition">
            Envoyer
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <img src="/assets/images/facebook.png" className="w-6 h-6 cursor-pointer hover:scale-110 transition" alt="Facebook" />
          <img src="/assets/images/insta.png" className="w-6 h-6 cursor-pointer hover:scale-110 transition" alt="Instagram" />
          <img src="/assets/images/x.png" className="w-6 h-6 cursor-pointer hover:scale-110 transition" alt="Twitter" />
          
          {/* Bouton Dark/Light Mode */}
          <button 
            onClick={toggleDarkMode}
            className={`p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-yellow-500/30' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-gray-800/30'
            }`}
          >
            <span className="text-lg">
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
      </div>

      <p className="text-center mt-4 text-sm">
        &copy; 2025 À la Conquête du Monde. Tous droits réservés.
      </p>
      <p className="text-center mt-2 text-xs text-gray-500">
        🚀 Version React + Node.js + Express + Prisma
      </p>
    </footer>
  )
}

