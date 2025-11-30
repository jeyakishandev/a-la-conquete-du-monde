import { useEffect, useState } from 'react';
import { useBackendStatus } from '../utils/useBackendStatus';
import { FaSpinner, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

/**
 * Composant qui affiche un message informatif quand le backend est en cours de démarrage
 */
export default function BackendStatusBanner() {
  const { isBackendAvailable, isChecking, hasShownMessage } = useBackendStatus();
  const [isVisible, setIsVisible] = useState(false);
  const [wasUnavailable, setWasUnavailable] = useState(false);

  useEffect(() => {
    if (!isBackendAvailable && hasShownMessage) {
      setIsVisible(true);
      setWasUnavailable(true);
    } else if (isBackendAvailable && wasUnavailable) {
      // Le backend est maintenant disponible, afficher un message de succès brièvement
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setWasUnavailable(false);
      }, 3000); // Afficher pendant 3 secondes puis masquer
    }
  }, [isBackendAvailable, hasShownMessage, wasUnavailable]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed top-20 left-0 right-0 z-[60] transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div
        className={`mx-4 rounded-lg shadow-lg p-4 flex items-center gap-3 ${
          isBackendAvailable
            ? 'bg-green-500 dark:bg-green-600 text-white'
            : 'bg-yellow-500 dark:bg-yellow-600 text-white'
        }`}
      >
        {isBackendAvailable ? (
          <>
            <FaCheckCircle className="text-xl flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Backend disponible !</p>
              <p className="text-sm opacity-90">Le service est maintenant opérationnel.</p>
            </div>
          </>
        ) : (
          <>
            {isChecking ? (
              <FaSpinner className="text-xl flex-shrink-0 animate-spin" />
            ) : (
              <FaInfoCircle className="text-xl flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-semibold">Backend en cours de démarrage</p>
              <p className="text-sm opacity-90">
                Le serveur est en train de démarrer. Veuillez patienter quelques instants...
                {isChecking && ' Vérification en cours...'}
              </p>
            </div>
          </>
        )}
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto text-white hover:opacity-75 transition-opacity"
          aria-label="Fermer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

