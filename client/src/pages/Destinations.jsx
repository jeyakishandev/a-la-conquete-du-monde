import React, { useState } from 'react';

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
    { id: 'all', name: 'Tous' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asie' },
    { id: 'america', name: 'Amériques' },
    { id: 'africa', name: 'Afrique' },
    { id: 'oceania', name: 'Océanie' }
  ];

  const filteredDestinations = activeContinent === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.continent === activeContinent);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Héro */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-16 rounded-2xl mb-12 text-center mx-6 mt-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Nos Destinations</h1>
        <p className="text-xl md:text-2xl opacity-90">Explorez le monde avec nos guides détaillés</p>
      </section>

      {/* Filtres par continent */}
      <section className="max-w-6xl mx-auto mb-12 px-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-wrap gap-4 justify-center">
            {continents.map(continent => (
              <button
                key={continent.id}
                onClick={() => setActiveContinent(continent.id)}
                className={`px-6 py-3 rounded-lg transition-all hover:scale-105 ${
                  activeContinent === continent.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white'
                }`}
              >
                {continent.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold">
                  {continents.find(c => c.id === destination.continent)?.name}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{destination.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{destination.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Points d'intérêt :</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-4 rounded-lg hover:scale-105 transition-transform">
                  Découvrir
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune destination trouvée</h3>
            <p className="text-gray-500">Essayez de sélectionner un autre continent</p>
          </div>
        )}
      </section>

      {/* Section CTA */}
      <section className="max-w-4xl mx-auto mt-16 px-6">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à partir à l'aventure ?</h2>
          <p className="text-xl mb-6 opacity-90">
            Découvrez nos guides détaillés et planifiez votre prochain voyage
          </p>
          <button className="bg-white text-orange-500 font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform">
            Voir tous nos guides
          </button>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
