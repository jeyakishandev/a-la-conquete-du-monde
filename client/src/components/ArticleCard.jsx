import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function ArticleCard({ article }) {
  // Formatage de la date
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay sombre permanent pour meilleure lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Badge de catégorie en haut à gauche */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-block bg-white/95 backdrop-blur-sm text-gray-900 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
          {article.category}
        </span>
      </div>

      {/* Contenu en bas */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
        {/* Titre */}
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 line-clamp-2 group-hover:text-orange-300 transition-colors">
          {article.title}
        </h2>

        {/* Date et flèche en bas */}
        <div className="flex items-center justify-between">
          {/* Date */}
          <span className="text-white/90 text-xs sm:text-sm font-medium">
            {formatDate(article.createdAt)}
          </span>

          {/* Flèche */}
          <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 sm:p-3 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/30">
            <FaArrowRight className="text-white text-sm sm:text-base" />
          </div>
        </div>
      </div>
    </Link>
  );
}
