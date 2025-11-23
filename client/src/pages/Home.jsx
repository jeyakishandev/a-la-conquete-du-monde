import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import { FaGlobe, FaBook, FaMapMarkedAlt, FaEye, FaCalendarAlt } from 'react-icons/fa'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalViews: 0 })

  useEffect(() => {
    loadArticles()
    loadStats()
  }, [])

  const loadArticles = async () => {
    try {
      const { data } = await axios.get('/api/articles')
      setArticles(data.slice(0, 3))
    } catch (error) {
      console.error('Erreur chargement articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const { data } = await axios.get('/api/articles/stats/all')
      setStats(data)
    } catch (error) {
      console.error('Erreur stats:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              À la Conquête du Monde
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed">
              Découvrez les plus beaux endroits de la planète à travers nos récits d'aventure, 
              conseils pratiques et guides détaillés pour vos prochains voyages.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link 
                to="/blog" 
                className="w-full sm:w-auto bg-white text-orange-600 font-bold py-3 px-6 sm:px-8 rounded-lg hover:scale-105 transition-transform text-base sm:text-lg shadow-lg"
              >
                Lire nos articles
              </Link>
              <Link 
                to="/destinations" 
                className="w-full sm:w-auto bg-orange-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg hover:scale-105 transition-transform text-base sm:text-lg shadow-lg border-2 border-white/20"
              >
                Explorer les destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-6 sm:-mt-8 lg:-mt-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-2 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <FaBook className="text-orange-500 dark:text-orange-400 text-xl sm:text-2xl mr-2" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 dark:text-orange-400">
                  {articles.length}+
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Articles récents</div>
            </div>
            <div className="p-2 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <FaEye className="text-orange-500 dark:text-orange-400 text-xl sm:text-2xl mr-2" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 dark:text-orange-400">
                  {stats.totalViews || 0}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Vues totales</div>
            </div>
            <div className="p-2 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <FaGlobe className="text-orange-500 dark:text-orange-400 text-xl sm:text-2xl mr-2" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 dark:text-orange-400">
                  50+
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Pays visités</div>
            </div>
            <div className="p-2 sm:p-4">
              <div className="flex items-center justify-center mb-2">
                <FaCalendarAlt className="text-orange-500 dark:text-orange-400 text-xl sm:text-2xl mr-2" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 dark:text-orange-400">
                  5
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles - Mobile First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-4">
            Nos Articles Récents
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 px-4">
            Découvrez nos dernières aventures et conseils de voyage
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Aucun article disponible pour le moment.</p>
          </div>
        )}

        <div className="text-center mt-6 sm:mt-8">
          <Link 
            to="/blog" 
            className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 sm:px-8 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base shadow-lg"
          >
            Voir tous les articles →
          </Link>
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-4">
            Pourquoi nous choisir ?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-2xl text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-4xl sm:text-5xl mb-4">📝</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
              Récits Authentiques
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Nos articles sont basés sur de vraies expériences de voyage, 
              avec des conseils pratiques et des anecdotes personnelles.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-2xl text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-4xl sm:text-5xl mb-4">🗺️</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
              Guides Détaillés
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Des guides complets avec itinéraires, budgets, 
              conseils pratiques et les meilleures adresses.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-2xl text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-4">🌍</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
              Monde Entier
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              De l'Europe à l'Asie, en passant par l'Afrique et les Amériques, 
              découvrez le monde dans toute sa diversité.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Prêt à partir à l'aventure ?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-95 px-4">
            Rejoignez notre communauté de voyageurs et découvrez de nouveaux horizons
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link 
              to="/destinations" 
              className="w-full sm:w-auto bg-white text-orange-600 font-bold py-3 px-6 sm:px-8 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base shadow-lg"
            >
              Explorer les destinations
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-orange-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base shadow-lg border-2 border-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
