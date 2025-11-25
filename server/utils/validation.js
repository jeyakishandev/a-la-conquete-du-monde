/**
 * Utilitaires de validation et sanitisation
 */

/**
 * Valide un email
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Expression régulière stricte pour email
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 255;
};

/**
 * Valide un nom d'utilisateur
 */
export const isValidUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return false;
  }
  
  // 3-20 caractères, alphanumériques et underscore uniquement
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Valide la force d'un mot de passe
 * Retourne un objet avec isValid et des messages
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      errors: ['Le mot de passe est requis']
    };
  }

  const errors = [];
  const minLength = 8;
  const maxLength = 128;

  if (password.length < minLength) {
    errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
  }

  if (password.length > maxLength) {
    errors.push(`Le mot de passe ne peut pas dépasser ${maxLength} caractères`);
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre minuscule');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre majuscule');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }

  // Vérifier les mots de passe courants/faibles
  const commonPasswords = ['password', '12345678', 'password123', 'admin123', 'qwerty123'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Ce mot de passe est trop commun et facile à deviner');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
};

/**
 * Calcule la force d'un mot de passe (0-100)
 */
export const calculatePasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 10;
  if (password.length >= 16) strength += 10;
  if (/[a-z]/.test(password)) strength += 10;
  if (/[A-Z]/.test(password)) strength += 10;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 15;
  if (password.length >= 20) strength += 15;

  return Math.min(100, strength);
};

/**
 * Sanitise une chaîne de caractères
 * Supprime les caractères dangereux et limite la longueur
 */
export const sanitizeString = (str, maxLength = 255) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  // Supprimer les espaces en début/fin
  let sanitized = str.trim();

  // Limiter la longueur
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Supprimer les caractères de contrôle
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

  return sanitized;
};

/**
 * Valide que deux mots de passe correspondent
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Valide un nom complet
 */
export const isValidName = (name) => {
  if (!name) return true; // Nom optionnel
  
  if (typeof name !== 'string') return false;
  
  // 1-50 caractères, lettres, espaces, apostrophes et tirets
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{1,50}$/;
  return nameRegex.test(name.trim());
};

