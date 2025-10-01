import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

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
      setArticles(data.slice(0, 3)) // Afficher seulement les 3 derniers articles
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-20 rounded-2xl mb-12 text-center mx-6 mt-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
          🌍 À la Conquête du Monde
        </h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
          Découvrez les plus beaux endroits de la planète à travers nos récits d'aventure, 
          conseils pratiques et guides détaillés pour vos prochains voyages.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/blog" 
            className="bg-white text-orange-500 font-bold py-4 px-8 rounded-lg hover:scale-105 transition-transform text-lg"
          >
            📖 Lire nos articles
          </Link>
          <Link 
            to="/destinations" 
            className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:scale-105 transition-transform text-lg"
          >
            🗺️ Explorer les destinations
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg dark:shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-2">{articles.length}+</div>
              <div className="text-gray-600 dark:text-gray-300">Articles récents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-2">{stats.totalViews}</div>
              <div className="text-gray-600 dark:text-gray-300">Vues totales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Pays visités</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-2">5</div>
              <div className="text-gray-600 dark:text-gray-300">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">✨ Nos Articles Récents</h2>
          <p className="text-gray-600 text-lg">Découvrez nos dernières aventures et conseils de voyage</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/blog" 
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform"
          >
            Voir tous les articles →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">🌟 Pourquoi nous choisir ?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg dark:shadow-2xl text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Récits Authentiques</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nos articles sont basés sur de vraies expériences de voyage, 
              avec des conseils pratiques et des anecdotes personnelles.
            </p>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg dark:shadow-2xl text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Guides Détaillés</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Des guides complets avec itinéraires, budgets, 
              conseils pratiques et les meilleures adresses.
            </p>
          </div>
          
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg dark:shadow-2xl text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Monde Entier</h3>
            <p className="text-gray-600 dark:text-gray-300">
              De l'Europe à l'Asie, en passant par l'Afrique et les Amériques, 
              découvrez le monde dans toute sa diversité.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Prêt à partir à l'aventure ?</h2>
          <p className="text-xl mb-6 opacity-90">
            Rejoignez notre communauté de voyageurs et découvrez de nouveaux horizons
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              to="/destinations" 
              className="bg-white text-orange-500 font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
            >
              Explorer les destinations
            </Link>
            <Link 
              to="/contact" 
              className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}