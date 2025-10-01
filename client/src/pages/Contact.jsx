import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici vous pouvez ajouter l'envoi au backend
    console.log('Formulaire envoyé:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-2xl mx-auto py-10 fade-in">
      <h1 className="text-4xl font-bold text-center mb-4">
        Contactez-nous 📬
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Une question ? Une suggestion ? N'hésitez pas à nous écrire !
      </p>

      {submitted && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6 text-center">
          ✅ Votre message a été envoyé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Nom *
          </label>
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
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Envoyer le message 📨
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
  )
}

