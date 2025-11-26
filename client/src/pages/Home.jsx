import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ArticleCard from '../components/ArticleCard'
import { FaGlobe, FaBook, FaMapMarkedAlt, FaEye, FaCalendarAlt, FaCompass, FaMountain } from 'react-icons/fa'

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
      const { data } = await api.get('/articles')
      setArticles(data.slice(0, 3))
    } catch (error) {
      console.error('Erreur chargement articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const { data } = await api.get('/articles/stats/all')
      setStats(data)
    } catch (error) {
      console.error('Erreur stats:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement de l'aventure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Hero Section - Design Organique et Immersif */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background avec effet de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Formes organiques flottantes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-white/30 shadow-lg">
              <FaCompass className="animate-spin-slow" />
              <span>Explorez le monde avec nous</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            <span className="block">À la Conquête</span>
            <span className="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              du Monde
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-lg">
            Découvrez les plus beaux endroits de la planète à travers nos récits d'aventure authentiques, 
            conseils pratiques et guides détaillés pour transformer vos rêves en réalité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link 
              to="/blog" 
              className="group relative w-full sm:w-auto bg-white text-orange-600 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full hover:scale-105 transition-all duration-300 text-base sm:text-lg shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaBook />
                <span>Lire nos articles</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link 
              to="/destinations" 
              className="group relative w-full sm:w-auto bg-white/10 backdrop-blur-md text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full hover:scale-105 transition-all duration-300 text-base sm:text-lg shadow-2xl border-2 border-white/30 hover:border-white/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaMapMarkedAlt />
                <span>Explorer les destinations</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Vague de séparation organique */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-20 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" className="text-sky-50 dark:text-gray-900"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section - Design Organique */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-6 sm:-mt-8 lg:-mt-12 relative z-10">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700/50 dark:to-gray-600/50 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaBook className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600 mb-2">
                  {articles.length}+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">Articles récents</div>
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700/50 dark:to-gray-600/50 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaEye className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">
                  {stats.totalViews || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">Vues totales</div>
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700/50 dark:to-gray-600/50 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaGlobe className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">Pays visités</div>
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-600/50 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaMountain className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  5
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles - Design Organique */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-700 dark:text-orange-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold">
              <FaCompass className="text-orange-500" />
              <span>Nos dernières aventures</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Articles Récents
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 px-4 max-w-2xl mx-auto">
            Découvrez nos dernières aventures et conseils de voyage pour vous inspirer
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {articles.map((article, index) => (
            <div key={article.id} className="transform transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <FaCompass className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4 animate-spin-slow" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">Aucun article disponible pour le moment.</p>
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12">
          <Link 
            to="/blog" 
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full hover:scale-110 transition-all duration-300 text-sm sm:text-base shadow-2xl hover:shadow-orange-500/50"
          >
            <span>Voir tous les articles</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* Features Section - Design Organique avec Formes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold">
              <FaMountain className="text-blue-500" />
              <span>Pourquoi nous choisir</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
            Votre Compagnon de Voyage
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="group relative bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl hover:shadow-2xl transition-all duration-500 border border-orange-100/50 dark:border-gray-700/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="mb-6 p-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl">📝</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                Récits Authentiques
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Nos articles sont basés sur de vraies expériences de voyage, 
                avec des conseils pratiques et des anecdotes personnelles qui vous transportent.
              </p>
            </div>
          </div>
          
          <div className="group relative bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl hover:shadow-2xl transition-all duration-500 border border-blue-100/50 dark:border-gray-700/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl">🗺️</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                Guides Détaillés
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Des guides complets avec itinéraires, budgets, 
                conseils pratiques et les meilleures adresses pour chaque destination.
              </p>
            </div>
          </div>
          
          <div className="group relative bg-gradient-to-br from-white to-green-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl hover:shadow-2xl transition-all duration-500 border border-green-100/50 dark:border-gray-700/50 overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="mb-6 p-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl">🌍</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                Monde Entier
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                De l'Europe à l'Asie, en passant par l'Afrique et les Amériques, 
                découvrez le monde dans toute sa diversité et sa beauté.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Design Organique avec Vagues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        {/* Vague supérieure */}
        <div className="absolute top-0 left-0 right-0 -mt-12 sm:-mt-16 lg:-mt-20">
          <svg className="w-full h-12 sm:h-20 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,0 C300,40 600,80 900,60 C1050,50 1150,30 1200,40 L1200,120 L0,120 Z" className="text-sky-50 dark:text-gray-900"></path>
          </svg>
        </div>
        
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600 text-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
          {/* Formes organiques en arrière-plan */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                <FaCompass className="animate-spin-slow" />
                <span>Prêt pour l'aventure ?</span>
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Prêt à partir à l'aventure ?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 opacity-95 max-w-2xl mx-auto">
              Rejoignez notre communauté de voyageurs passionnés et découvrez de nouveaux horizons 
              qui transformeront votre vision du monde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link 
                to="/destinations" 
                className="group w-full sm:w-auto bg-white text-orange-600 font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full hover:scale-110 transition-all duration-300 text-sm sm:text-base shadow-2xl hover:shadow-white/50 flex items-center justify-center gap-2"
              >
                <FaMapMarkedAlt />
                <span>Explorer les destinations</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                to="/contact" 
                className="group w-full sm:w-auto bg-white/10 backdrop-blur-md text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full hover:scale-110 transition-all duration-300 text-sm sm:text-base shadow-2xl border-2 border-white/30 hover:border-white/50 flex items-center justify-center gap-2"
              >
                <span>Nous contacter</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Vague inférieure */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full">
          <svg className="w-full h-12 sm:h-20 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" className="text-sky-50 dark:text-gray-900"></path>
          </svg>
        </div>
      </section>
    </div>
  )
}
