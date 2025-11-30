import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook personnalisé pour vérifier la disponibilité du backend
 * @param {number} checkInterval - Intervalle de vérification en ms (défaut: 5000)
 * @returns {object} { isBackendAvailable, isChecking, hasShownMessage }
 */
export function useBackendStatus(checkInterval = 5000) {
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [hasShownMessage, setHasShownMessage] = useState(false);
  const intervalRef = useRef(null);
  const checkCountRef = useRef(0);
  const isBackendAvailableRef = useRef(true);

  // Mettre à jour la ref quand l'état change
  useEffect(() => {
    isBackendAvailableRef.current = isBackendAvailable;
  }, [isBackendAvailable]);

  const checkBackend = useCallback(async () => {
    // Ne pas vérifier si le backend est déjà disponible et qu'on a déjà vérifié plusieurs fois
    if (isBackendAvailableRef.current && checkCountRef.current > 3) {
      return;
    }

    setIsChecking(true);
    try {
      // Essayer de faire une requête simple vers le backend
      // On utilise une route qui devrait toujours exister (health check ou articles)
      await api.get('/articles', {
        timeout: 5000, // Timeout plus court pour la vérification
        validateStatus: (status) => status < 500, // Accepter même les erreurs 4xx (backend répond)
      });

      // Si on arrive ici, le backend répond
      if (!isBackendAvailableRef.current) {
        setIsBackendAvailable(true);
        setHasShownMessage(false); // Réinitialiser pour la prochaine fois
      }
      checkCountRef.current = 0;
    } catch (error) {
      // Erreur de connexion (ECONNREFUSED, timeout, etc.)
      const isConnectionError =
        !error.response || // Pas de réponse = backend ne répond pas
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('timeout');

      if (isConnectionError) {
        setIsBackendAvailable(false);
        if (!hasShownMessage) {
          setHasShownMessage(true);
        }
        checkCountRef.current++;
      } else {
        // Le backend répond mais avec une erreur (ex: 404, 401) = backend disponible
        setIsBackendAvailable(true);
        checkCountRef.current = 0;
      }
    } finally {
      setIsChecking(false);
    }
  }, [hasShownMessage]);

  useEffect(() => {
    // Vérifier immédiatement au montage
    checkBackend();

    // Nettoyer l'intervalle précédent s'il existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Vérifier périodiquement si le backend n'est pas disponible
    if (!isBackendAvailable) {
      intervalRef.current = setInterval(() => {
        checkBackend();
      }, checkInterval);
    } else {
      // Si le backend est disponible, vérifier encore quelques fois puis arrêter
      if (checkCountRef.current < 3) {
        intervalRef.current = setInterval(() => {
          checkBackend();
        }, checkInterval);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isBackendAvailable, checkInterval, checkBackend]);

  return { isBackendAvailable, isChecking, hasShownMessage };
}

