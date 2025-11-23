import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-500 dark:text-orange-400 mb-4">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
          >
            🏠 Retour à l'accueil
          </Link>
          <Link
            to="/blog"
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
          >
            📚 Voir le blog
          </Link>
        </div>

        <div className="mt-12">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-gray-500 dark:text-gray-400">
            Continuez votre voyage de découverte !
          </p>
        </div>
      </div>
    </div>
  )
}

