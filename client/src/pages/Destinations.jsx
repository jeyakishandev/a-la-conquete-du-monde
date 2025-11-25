import React, { useState } from 'react';
import { FaCompass, FaMapMarkedAlt, FaGlobe, FaMountain, FaUmbrellaBeach } from 'react-icons/fa';

const Destinations = () => {
  const [activeContinent, setActiveContinent] = useState('all');

  const destinations = [
    {
      id: 1,
      name: "Paris, France",
      continent: "europe",
      image: "/assets/images/cover.jpg",
      description: "La ville lumière, capitale de la romance et de l'art de vivre à la française.",
      highlights: ["Tour Eiffel", "Louvre", "Champs-Élysées", "Montmartre"]
    },
    {
      id: 2,
      name: "Tokyo, Japon",
      continent: "asia",
      image: "/assets/images/New-york.jpg",
      description: "Métropole futuriste où tradition et modernité se rencontrent.",
      highlights: ["Shibuya", "Temple Senso-ji", "Tsukiji", "Harajuku"]
    },
    {
      id: 3,
      name: "New York, USA",
      continent: "america",
      image: "/assets/images/New-york.jpg",
      description: "La ville qui ne dort jamais, symbole du rêve américain.",
      highlights: ["Times Square", "Central Park", "Statue de la Liberté", "Brooklyn Bridge"]
    },
    {
      id: 4,
      name: "Safari Kenya",
      continent: "africa",
      image: "/assets/images/Safari.jpg",
      description: "Aventure au cœur de la savane africaine avec les Big Five.",
      highlights: ["Masai Mara", "Amboseli", "Tsavo", "Lac Nakuru"]
    },
    {
      id: 5,
      name: "Sydney, Australie",
      continent: "oceania",
      image: "/assets/images/plage.jpg",
      description: "Ville cosmopolite entre océan et culture aborigène.",
      highlights: ["Opéra de Sydney", "Harbour Bridge", "Bondi Beach", "Blue Mountains"]
    },
    {
      id: 6,
      name: "Rome, Italie",
      continent: "europe",
      image: "/assets/images/Pitoresque.jpg",
      description: "Cité éternelle, berceau de la civilisation occidentale.",
      highlights: ["Colisée", "Vatican", "Forum Romain", "Trastevere"]
    }
  ];

  const continents = [
    { id: 'all', name: 'Tous', icon: FaGlobe },
    { id: 'europe', name: 'Europe', icon: FaMountain },
    { id: 'asia', name: 'Asie', icon: FaCompass },
    { id: 'america', name: 'Amériques', icon: FaMapMarkedAlt },
    { id: 'africa', name: 'Afrique', icon: FaGlobe },
    { id: 'oceania', name: 'Océanie', icon: FaUmbrellaBeach }
  ];

  const filteredDestinations = activeContinent === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.continent === activeContinent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Hero Section - Design Organique */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background avec effet de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Formes organiques flottantes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-white/30 shadow-lg">
              <FaMapMarkedAlt className="animate-pulse" />
              <span>Explorez le monde</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            <span className="block">Nos Destinations</span>
            <span className="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Découvrez le monde
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-lg">
            Explorez le monde avec nos guides détaillés et découvrez les plus beaux endroits de la planète.
          </p>
        </div>

        {/* Vague de séparation organique */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-20 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" className="text-sky-50 dark:text-gray-900"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-6 sm:-mt-8 lg:-mt-12 relative z-10">
        {/* Filtres par continent - Design Organique */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden mb-8 sm:mb-12">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
              Filtrer par continent
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {continents.map(continent => {
                const Icon = continent.icon;
                return (
                  <button
                    key={continent.id}
                    onClick={() => setActiveContinent(continent.id)}
                    className={`px-4 sm:px-6 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                      activeContinent === continent.id
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                    }`}
                  >
                    <Icon />
                    <span>{continent.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Destinations */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filteredDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500 transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {continents.find(c => c.id === destination.continent)?.name}
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{destination.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">{destination.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Points d'intérêt :</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 text-orange-800 dark:text-orange-200 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 sm:py-4 px-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2">
                    <FaCompass />
                    <span>Découvrir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl">
            <FaCompass className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4 animate-spin-slow" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Aucune destination trouvée</h3>
            <p className="text-gray-600 dark:text-gray-400">Essayez de sélectionner un autre continent</p>
          </div>
        )}

        {/* Section CTA - Design Organique */}
        <section className="mt-16 sm:mt-20 relative">
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600 text-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden relative">
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
                Découvrez nos guides détaillés et planifiez votre prochain voyage
              </p>
              <button className="bg-white text-orange-600 font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full hover:scale-110 transition-all duration-300 text-sm sm:text-base shadow-2xl hover:shadow-white/50 flex items-center justify-center gap-2 mx-auto">
                <FaMapMarkedAlt />
                <span>Voir tous nos guides</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Destinations;
