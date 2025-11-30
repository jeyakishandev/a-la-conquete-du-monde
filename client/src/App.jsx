import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackendStatusBanner from './components/BackendStatusBanner';
import ScrollToTop from './components/ScrollToTop';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import './App.css';

// Lazy loading des pages pour améliorer les performances
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const Destinations = lazy(() => import('./pages/Destinations'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CreateArticle = lazy(() => import('./pages/CreateArticle'));
const EditArticle = lazy(() => import('./pages/EditArticle'));
const MyArticles = lazy(() => import('./pages/MyArticles'));
const Profile = lazy(() => import('./pages/Profile'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Charger le mode sombre depuis localStorage
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <BackendStatusBanner />
          <PWAInstallPrompt />
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="flex-grow mt-24 px-4 md:px-10">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/create-article" element={<CreateArticle />} />
                <Route path="/edit-article/:id" element={<EditArticle />} />
                <Route path="/my-articles" element={<MyArticles />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
