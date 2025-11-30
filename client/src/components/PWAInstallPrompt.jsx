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
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">
            Installer l'application
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Installez "À la Conquête du Monde" sur votre appareil pour un accès rapide et une meilleure expérience.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full hover:scale-105 transition-all text-sm font-semibold shadow-lg"
          >
            <FaDownload />
            <span>Installer</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Fermer"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}

