import { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [currentCategory, setCurrentCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [stats, setStats] = useState({ totalViews: 0 })
  const articlesPerPage = 6

  useEffect(() => {
    loadArticles()
    loadStats()
  }, [])

  useEffect(() => {
    filterArticles()
  }, [articles, currentCategory, searchQuery])

  const loadArticles = async () => {
    try {
      const { data } = await axios.get('/api/articles')
      setArticles(data)
      setFilteredArticles(data)
    } catch (error) {
      console.error('Erreur chargement articles:', error)
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

  const filterArticles = () => {
    let filtered = articles

    // Filtre par catégorie
    if (currentCategory !== 'all') {
      filtered = filtered.filter(a => a.category === currentCategory)
    }

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredArticles(filtered)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fade-in">
      {/* Barre de recherche */}
      <div className="text-center my-6">
        <input 
          type="text"
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/2 max-w-md mx-auto bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap justify-center gap-2 my-6">
        {['all', 'destinations', 'aventure', 'culture'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              currentCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? 'Tous' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Statistiques */}
      <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
        👀 Nombre de vues : <span className="font-bold text-orange-500">{stats.totalViews}</span>
      </p>

      {/* Articles */}
      {currentArticles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Aucun article trouvé 😔
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mb-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Précédent
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 rounded-lg transition ${
                  currentPage === index + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  )
}

