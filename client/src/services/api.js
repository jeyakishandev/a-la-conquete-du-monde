import axios from 'axios';

// Configuration de l'URL de l'API
// En développement : utilise le proxy Vite
// En production : utilise VITE_API_URL ou l'URL par défaut
let API_URL = import.meta.env.VITE_API_URL || '/api';

// Correction automatique des URLs mal formées (ex: hthttps:// -> https://)
if (API_URL && typeof API_URL === 'string') {
  API_URL = API_URL.replace(/^ht+tp/, 'http').replace(/^ht+tp/, 'http'); // Corriger hthttps -> https
  if (API_URL.startsWith('http://http')) {
    API_URL = API_URL.replace('http://http', 'https');
  }
}

// Debug en production
if (import.meta.env.PROD) {
  console.log('🔧 API_URL configurée:', API_URL);
  console.log('🔧 VITE_API_URL depuis env:', import.meta.env.VITE_API_URL);
}

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
    // Ajouter le token JWT si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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

