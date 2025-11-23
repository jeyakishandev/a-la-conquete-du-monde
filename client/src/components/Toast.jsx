import { useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa'

export default function Toast({ message, type = 'info', onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const bgColor = {
    success: 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600 text-green-700 dark:text-green-300',
    error: 'bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-600 text-red-700 dark:text-red-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300',
    info: 'bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300'
  }

  const icon = {
    success: <FaCheckCircle className="text-2xl" />,
    error: <FaExclamationCircle className="text-2xl" />,
    warning: <FaExclamationTriangle className="text-2xl" />,
    info: <FaInfoCircle className="text-2xl" />
  }

  return (
    <div className={`px-6 py-4 rounded-lg shadow-xl border ${bgColor[type]} animate-slide-in-right max-w-md`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon[type]}
          <p className="font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-lg hover:opacity-70 transition"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
}

