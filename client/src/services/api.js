import axios from 'axios';

// Configuration de l'URL de l'API
// En développement : utilise le proxy Vite
// En production : utilise VITE_API_URL ou l'URL par défaut
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Log pour déboguer
console.log('🔍 API Configuration Debug:');
console.log('  - VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('  - API_URL used:', API_URL);
console.log('  - import.meta.env:', import.meta.env);

// Créer une instance axios avec configuration par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Log pour déboguer
    console.log('🚀 API Request Debug:');
    console.log('  - Full URL:', config.url);
    console.log('  - Base URL:', config.baseURL);
    console.log('  - Complete URL:', (config.baseURL || '') + (config.url || ''));
    
    // Ajouter le token JWT si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('  - Token present: Yes');
    } else {
      console.log('  - Token present: No');
    }
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs 401 (non autorisé)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Rediriger vers la page de connexion si nécessaire
      if (window.location.pathname !== '/login') {
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

