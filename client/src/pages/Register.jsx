import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { FaUserPlus, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa'

export default function Register() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordErrors, setPasswordErrors] = useState([])

  // Validation du mot de passe en temps réel
  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password)
      setPasswordStrength(strength)
      setPasswordErrors(validatePasswordRequirements(formData.password))
    } else {
      setPasswordStrength(0)
      setPasswordErrors([])
    }
  }, [formData.password])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (password.length >= 12) strength += 10
    if (password.length >= 16) strength += 10
    if (/[a-z]/.test(password)) strength += 10
    if (/[A-Z]/.test(password)) strength += 10
    if (/[0-9]/.test(password)) strength += 10
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 15
    if (password.length >= 20) strength += 15
    return Math.min(100, strength)
  }

  const validatePasswordRequirements = (password) => {
    const errors = []
    if (password.length < 8) errors.push('Au moins 8 caractères')
    if (!/[a-z]/.test(password)) errors.push('Une lettre minuscule')
    if (!/[A-Z]/.test(password)) errors.push('Une lettre majuscule')
    if (!/[0-9]/.test(password)) errors.push('Un chiffre')
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('Un caractère spécial')
    return errors
  }

  const getStrengthColor = (strength) => {
    if (strength < 40) return 'bg-red-500'
    if (strength < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthLabel = (strength) => {
    if (strength < 40) return 'Faible'
    if (strength < 70) return 'Moyen'
    return 'Fort'
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation côté client
    if (formData.password.length < 8) {
      showToast('Le mot de passe doit contenir au moins 8 caractères', 'warning')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Les mots de passe ne correspondent pas', 'warning')
      setLoading(false)
      return
    }

    if (passwordErrors.length > 0) {
      showToast('Le mot de passe ne respecte pas tous les critères requis', 'warning')
      setLoading(false)
      return
    }

    try {
      // Ne pas envoyer confirmPassword au serveur
      const { confirmPassword, ...dataToSend } = formData
      const { data } = await api.post('/auth/register', dataToSend)
      
      // Sauvegarder le token
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      showToast('Inscription réussie !', 'success')
      
      // Rediriger vers la page d'accueil
      setTimeout(() => {
        navigate('/')
        window.location.reload() // Recharger pour mettre à jour l'état
      }, 500)
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erreur lors de l\'inscription'
      const errorDetails = error.response?.data?.details
      
      if (errorDetails && Array.isArray(errorDetails)) {
        showToast(`${errorMessage}: ${errorDetails.join(', ')}`, 'error')
      } else {
        showToast(errorMessage, 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Inscription
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Créez votre compte pour commencer
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Nom d'utilisateur *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Mot de passe *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={8}
            />
            
            {/* Indicateur de force du mot de passe */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Force: <span className={`font-semibold ${getStrengthColor(passwordStrength).replace('bg-', 'text-')}`}>
                      {getStrengthLabel(passwordStrength)}
                    </span>
                  </span>
                  <span className="text-xs text-gray-500">{passwordStrength}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                
                {/* Liste des exigences */}
                {passwordErrors.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {passwordErrors.map((error, index) => (
                      <li key={index} className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <FaTimes className="text-xs" />
                        {error}
                      </li>
                    ))}
                  </ul>
                )}
                
                {passwordErrors.length === 0 && formData.password && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <FaCheck />
                    Mot de passe conforme
                  </p>
                )}
              </div>
            )}
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum 8 caractères avec majuscule, minuscule, chiffre et caractère spécial
            </p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Confirmer le mot de passe *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                formData.confirmPassword && formData.password !== formData.confirmPassword 
                  ? 'border-red-500 dark:border-red-500' 
                  : formData.confirmPassword && formData.password === formData.confirmPassword
                  ? 'border-green-500 dark:border-green-500'
                  : ''
              }`}
              placeholder="••••••••"
              required
              minLength={8}
            />
            {formData.confirmPassword && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${
                formData.password === formData.confirmPassword 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formData.password === formData.confirmPassword ? (
                  <>
                    <FaCheck />
                    Les mots de passe correspondent
                  </>
                ) : (
                  <>
                    <FaTimes />
                    Les mots de passe ne correspondent pas
                  </>
                )}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-4 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaUserPlus />
            <span>{loading ? 'Inscription...' : 'S\'inscrire'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
              Se connecter
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center justify-center gap-1">
            <FaArrowLeft />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

