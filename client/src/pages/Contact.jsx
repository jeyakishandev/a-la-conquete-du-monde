import { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact', formData);
      showToast('Votre message a été envoyé avec succès !', 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      showToast(error.response?.data?.error || "Erreur lors de l'envoi du message", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 fade-in">
      <h1 className="text-4xl font-bold text-center mb-4">Contactez-nous</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Une question ? Une suggestion ? N'hésitez pas à nous écrire !
      </p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Nom *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Votre nom"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="votre@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            placeholder="Votre message..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FaPaperPlane />
          <span>{loading ? 'Envoi...' : 'Envoyer le message'}</span>
        </button>
      </form>

      <div className="mt-10 text-center">
        <h3 className="text-2xl font-bold mb-4">Suivez-nous</h3>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:scale-110 transition">
            <img src="/assets/images/facebook.png" className="w-10 h-10" alt="Facebook" />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <img src="/assets/images/insta.png" className="w-10 h-10" alt="Instagram" />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <img src="/assets/images/x.png" className="w-10 h-10" alt="Twitter" />
          </a>
        </div>
      </div>
    </div>
  );
}
