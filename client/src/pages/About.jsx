import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Héro */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-16 rounded-2xl mb-12 text-center mx-6 mt-6 animate-pulse">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Notre Histoire</h1>
        <p className="text-xl md:text-2xl opacity-90">Découvrez qui nous sommes et notre passion pour le voyage</p>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        {/* Notre mission */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Depuis notre création, nous nous efforçons de partager notre passion pour le voyage et de vous inspirer 
            à découvrir les merveilles du monde. Notre mission est de vous accompagner dans vos aventures, 
            que vous soyez un voyageur expérimenté ou que vous débutiez dans l'art du voyage.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nous croyons que chaque voyage est une opportunité d'apprendre, de grandir et de créer des souvenirs 
            inoubliables. C'est pourquoi nous nous engageons à vous fournir des conseils pratiques, des récits 
            authentiques et des informations précieuses pour rendre vos voyages exceptionnels.
          </p>
        </section>

        {/* Notre équipe */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Équipe</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👨‍💼
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Alexandre</h3>
              <p className="text-gray-600 mb-2">Fondateur & Rédacteur en chef</p>
              <p className="text-sm text-gray-500">
                Passionné de voyage depuis plus de 10 ans, Alexandre a visité plus de 50 pays. 
                Il partage ses expériences et conseils pour vous aider à organiser vos prochains voyages.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👩‍💼
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sophie</h3>
              <p className="text-gray-600 mb-2">Photographe & Rédactrice</p>
              <p className="text-sm text-gray-500">
                Sophie capture la beauté du monde à travers son objectif. 
                Ses photos et récits vous transportent dans les plus beaux endroits de la planète.
              </p>
            </div>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Respect de l'environnement</h3>
              <p className="text-sm text-gray-600">
                Nous prônons un tourisme responsable et respectueux de l'environnement.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Authenticité</h3>
              <p className="text-sm text-gray-600">
                Nous partageons des expériences authentiques et des conseils honnêtes.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Inspiration</h3>
              <p className="text-sm text-gray-600">
                Notre objectif est de vous inspirer à découvrir de nouveaux horizons.
              </p>
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Nos Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Pays visités</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">Articles publiés</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-90">Lecteurs mensuels</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-sm opacity-90">Années d'expérience</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
