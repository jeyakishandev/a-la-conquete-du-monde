import React from 'react';
import { FaCompass, FaHeart, FaGlobe, FaMountain, FaLeaf, FaLightbulb, FaBook, FaEye, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const About = () => {
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
              <FaHeart className="text-red-300 animate-pulse" />
              <span>Notre histoire</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            <span className="block">Notre Histoire</span>
            <span className="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Qui sommes-nous ?
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-lg">
            Découvrez qui nous sommes et notre passion pour le voyage
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
        {/* Notre mission */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden mb-8 sm:mb-12">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl shadow-lg">
                <FaCompass className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">Notre Mission</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Depuis notre création, nous nous efforçons de partager notre passion pour le voyage et de vous inspirer 
              à découvrir les merveilles du monde. Notre mission est de vous accompagner dans vos aventures, 
              que vous soyez un voyageur expérimenté ou que vous débutiez dans l'art du voyage.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Nous croyons que chaque voyage est une opportunité d'apprendre, de grandir et de créer des souvenirs 
              inoubliables. C'est pourquoi nous nous engageons à vous fournir des conseils pratiques, des récits 
              authentiques et des informations précieuses pour rendre vos voyages exceptionnels.
            </p>
          </div>
        </section>

        {/* Notre équipe */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden mb-8 sm:mb-12">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl shadow-lg">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">Notre Équipe</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group text-center bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow">
                  <span className="text-5xl font-bold text-white">A</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Alexandre</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">Fondateur & Rédacteur en chef</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Passionné de voyage depuis plus de 10 ans, Alexandre a visité plus de 50 pays. 
                  Il partage ses expériences et conseils pour vous aider à organiser vos prochains voyages.
                </p>
              </div>
              <div className="group text-center bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow">
                  <span className="text-5xl font-bold text-white">S</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Sophie</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">Photographe & Rédactrice</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Sophie capture la beauté du monde à travers son objectif. 
                  Ses photos et récits vous transportent dans les plus beaux endroits de la planète.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden mb-8 sm:mb-12">
          {/* Effet de lumière */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl shadow-lg">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">Nos Valeurs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="group text-center p-6 bg-gradient-to-br from-white to-green-50/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="mb-4 p-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl w-fit mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaLeaf className="text-white text-3xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Respect de l'environnement</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Nous prônons un tourisme responsable et respectueux de l'environnement.
                </p>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="mb-4 p-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl w-fit mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaCompass className="text-white text-3xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Authenticité</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Nous partageons des expériences authentiques et des conseils honnêtes.
                </p>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-3xl hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="mb-4 p-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl w-fit mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaLightbulb className="text-white text-3xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Inspiration</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Notre objectif est de vous inspirer à découvrir de nouveaux horizons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 dark:from-orange-600 dark:via-orange-700 dark:to-yellow-600 text-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden relative">
          {/* Formes organiques en arrière-plan */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Nos Chiffres</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="group p-6 bg-white/10 backdrop-blur-md rounded-3xl hover:scale-110 transition-all duration-300">
                <FaGlobe className="text-4xl mx-auto mb-4 text-yellow-200" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">50+</div>
                <div className="text-sm sm:text-base opacity-90">Pays visités</div>
              </div>
              <div className="group p-6 bg-white/10 backdrop-blur-md rounded-3xl hover:scale-110 transition-all duration-300">
                <FaBook className="text-4xl mx-auto mb-4 text-yellow-200" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">200+</div>
                <div className="text-sm sm:text-base opacity-90">Articles publiés</div>
              </div>
              <div className="group p-6 bg-white/10 backdrop-blur-md rounded-3xl hover:scale-110 transition-all duration-300">
                <FaEye className="text-4xl mx-auto mb-4 text-yellow-200" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">10K+</div>
                <div className="text-sm sm:text-base opacity-90">Lecteurs mensuels</div>
              </div>
              <div className="group p-6 bg-white/10 backdrop-blur-md rounded-3xl hover:scale-110 transition-all duration-300">
                <FaCalendarAlt className="text-4xl mx-auto mb-4 text-yellow-200" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">5</div>
                <div className="text-sm sm:text-base opacity-90">Années d'expérience</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
