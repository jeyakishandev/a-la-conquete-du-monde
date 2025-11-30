import { useState, useEffect } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';

/**
 * Composant qui affiche un prompt pour installer l'application PWA
 */
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Détecter si l'app peut être installée
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Afficher le prompt seulement si l'utilisateur n'a pas déjà installé
      const hasInstalled = localStorage.getItem('pwa-installed') === 'true';
      if (!hasInstalled) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Vérifier si l'app est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      localStorage.setItem('pwa-installed', 'true');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Afficher le prompt d'installation
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true');
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Ne plus afficher pendant cette session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Ne pas afficher si déjà rejeté dans cette session
  if (showPrompt && sessionStorage.getItem('pwa-prompt-dismissed') === 'true') {
    return null;
  }

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[420px] z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 relative overflow-hidden">
        {/* Bouton fermer en haut à droite */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Fermer"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="flex items-start justify-between gap-4 pr-8">
          {/* Contenu texte */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              <span className="block">Installer</span>
              <span className="block">l'application</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Installez <span className="font-semibold text-gray-900 dark:text-white">"À la Conquête du Monde"</span> sur votre appareil pour un accès rapide et une meilleure expérience.
            </p>
          </div>

          {/* Bouton d'installation */}
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 whitespace-nowrap"
          >
            <FaDownload className="text-base" />
            <span>Installer</span>
          </button>
        </div>
      </div>
    </div>
  );
}

