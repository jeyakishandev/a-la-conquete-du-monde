import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackendStatusBanner from './components/BackendStatusBanner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Destinations from './pages/Destinations';
import About from './pages/About';
import Contact from './pages/Contact';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';
import Profile from './pages/Profile';
import './App.css';

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
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="flex-grow mt-24 px-4 md:px-10">
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
          </main>

          <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
