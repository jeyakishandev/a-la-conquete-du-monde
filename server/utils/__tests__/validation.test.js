import { describe, it, expect } from '@jest/globals';
import {
  isValidEmail,
  isValidUsername,
  validatePassword,
  calculatePasswordStrength,
  validateArticleTitle,
  validateArticleDescription,
  validateArticleContent,
  isValidCategory,
  isValidImageUrl,
  sanitizeString,
  isValidName,
  passwordsMatch,
} from '../validation.js';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
    });

    it('should reject emails longer than 255 characters', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(isValidEmail(longEmail)).toBe(false);
    });
  });

  describe('isValidUsername', () => {
    it('should return true for valid usernames', () => {
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('user_name')).toBe(true);
      expect(isValidUsername('abc')).toBe(true);
      expect(isValidUsername('username1234567890')).toBe(true); // 20 chars
    });

    it('should return false for invalid usernames', () => {
      expect(isValidUsername('ab')).toBe(false); // trop court
      expect(isValidUsername('user-name')).toBe(false); // tiret non autorisé
      expect(isValidUsername('user name')).toBe(false); // espace non autorisé
      expect(isValidUsername('')).toBe(false);
      expect(isValidUsername(null)).toBe(false);
      expect(isValidUsername(undefined)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return valid for strong passwords', () => {
      const result = validatePassword('Password123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.strength).toBeDefined();
    });

    it('should return invalid for null/undefined passwords', () => {
      expect(validatePassword(null).isValid).toBe(false);
      expect(validatePassword(undefined).isValid).toBe(false);
      expect(validatePassword('').isValid).toBe(false);
    });

    it('should return invalid for passwords that are too short', () => {
      const result = validatePassword('short');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should return invalid for passwords that are too long', () => {
      const longPassword = 'a'.repeat(129);
      const result = validatePassword(longPassword);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('128 caractères'))).toBe(true);
    });

    it('should return invalid for passwords without lowercase', () => {
      const result = validatePassword('NOUPPERCASE123!');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('minuscule'))).toBe(true);
    });

    it('should return invalid for passwords without uppercase', () => {
      const result = validatePassword('nouppercase123!');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('majuscule'))).toBe(true);
    });

    it('should return invalid for passwords without numbers', () => {
      const result = validatePassword('NoNumbers!');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('chiffre'))).toBe(true);
    });

    it('should return invalid for passwords without special characters', () => {
      const result = validatePassword('NoSpecialChar123');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('spécial'))).toBe(true);
    });

    it('should reject common passwords', () => {
      const result1 = validatePassword('password');
      expect(result1.isValid).toBe(false);
      expect(result1.errors.some(e => e.includes('commun'))).toBe(true);

      const result2 = validatePassword('12345678');
      expect(result2.isValid).toBe(false);
    });

    it('should validate passwords with all requirements', () => {
      const result = validatePassword('ComplexP@ssw0rd');
      expect(result.isValid).toBe(true);
    });
  });

  describe('calculatePasswordStrength', () => {
    it('should calculate strength correctly', () => {
      expect(calculatePasswordStrength('short')).toBeGreaterThanOrEqual(0);
      expect(calculatePasswordStrength('Password123!')).toBeGreaterThan(0);
      expect(calculatePasswordStrength('VeryLongAndComplexP@ssw0rd123!')).toBeGreaterThan(50);
    });

    it('should not exceed 100', () => {
      const strength = calculatePasswordStrength('VeryLongAndComplexP@ssw0rd123456789!');
      expect(strength).toBeLessThanOrEqual(100);
    });

    it('should award points for length', () => {
      const shortStrength = calculatePasswordStrength('Pass123!');
      const longStrength = calculatePasswordStrength('VeryLongPassword123!');
      expect(longStrength).toBeGreaterThan(shortStrength);
    });
  });

  describe('validateArticleTitle', () => {
    it('should return valid for good titles', () => {
      const result = validateArticleTitle('Mon super article de voyage');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBeDefined();
    });

    it('should return invalid for null/undefined titles', () => {
      expect(validateArticleTitle(null).isValid).toBe(false);
      expect(validateArticleTitle(undefined).isValid).toBe(false);
      expect(validateArticleTitle('').isValid).toBe(false);
    });

    it('should return invalid for short titles', () => {
      const result = validateArticleTitle('Ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should return invalid for long titles', () => {
      const result = validateArticleTitle('a'.repeat(101));
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateArticleDescription', () => {
    it('should return valid for good descriptions', () => {
      const result = validateArticleDescription('Une description détaillée de mon voyage');
      expect(result.isValid).toBe(true);
    });

    it('should return invalid for null/undefined descriptions', () => {
      expect(validateArticleDescription(null).isValid).toBe(false);
      expect(validateArticleDescription(undefined).isValid).toBe(false);
    });

    it('should return invalid for short descriptions', () => {
      const result = validateArticleDescription('Court');
      expect(result.isValid).toBe(false);
    });

    it('should return invalid for long descriptions', () => {
      const result = validateArticleDescription('a'.repeat(201));
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateArticleContent', () => {
    it('should return valid for good content', () => {
      const result = validateArticleContent(
        'Contenu détaillé de mon article de voyage avec assez de texte'
      );
      expect(result.isValid).toBe(true);
    });

    it('should return invalid for null/undefined content', () => {
      expect(validateArticleContent(null).isValid).toBe(false);
      expect(validateArticleContent(undefined).isValid).toBe(false);
    });

    it('should return invalid for short content', () => {
      const result = validateArticleContent('Court');
      expect(result.isValid).toBe(false);
    });

    it('should return invalid for very long content', () => {
      const result = validateArticleContent('a'.repeat(10001));
      expect(result.isValid).toBe(false);
    });
  });

  describe('isValidCategory', () => {
    it('should return true for valid categories', () => {
      expect(isValidCategory('destinations')).toBe(true);
      expect(isValidCategory('culture')).toBe(true);
      expect(isValidCategory('aventure')).toBe(true);
      expect(isValidCategory('conseils')).toBe(true);
    });

    it('should return false for invalid categories', () => {
      expect(isValidCategory('invalid')).toBe(false);
      expect(isValidCategory('')).toBe(false);
      expect(isValidCategory(null)).toBe(false);
    });
  });

  describe('isValidImageUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true);
      expect(isValidImageUrl('http://example.com/image.png')).toBe(true);
      expect(isValidImageUrl('/assets/images/image.jpg')).toBe(true);
      expect(isValidImageUrl('./assets/images/image.jpg')).toBe(true);
      expect(isValidImageUrl('')).toBe(true); // optionnel
    });

    it('should return false for invalid URLs', () => {
      expect(isValidImageUrl('not-a-url')).toBe(false);
    });

    it('should return false for URLs longer than 500 characters', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(500);
      expect(isValidImageUrl(longUrl)).toBe(false);
    });

    it('should return true for empty/null values (optional)', () => {
      expect(isValidImageUrl(null)).toBe(true); // optionnel, donc null est accepté
      expect(isValidImageUrl('')).toBe(true); // optionnel
    });
  });

  describe('sanitizeString', () => {
    it('should sanitize strings correctly', () => {
      expect(sanitizeString('  test  ')).toBe('test');
      expect(sanitizeString('test\n\r')).toBe('test');
      expect(sanitizeString('')).toBe('');
    });

    it('should handle null/undefined', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
      expect(sanitizeString(123)).toBe('');
    });

    it('should limit string length', () => {
      const longString = 'a'.repeat(300);
      const result = sanitizeString(longString, 100);
      expect(result.length).toBe(100);
    });

    it('should remove control characters', () => {
      const withControlChars = 'test\x00\x1F\x7F\x9Ftest';
      const result = sanitizeString(withControlChars);
      expect(result).toBe('testtest');
    });
  });

  describe('passwordsMatch', () => {
    it('should return true when passwords match', () => {
      expect(passwordsMatch('password123', 'password123')).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      expect(passwordsMatch('password123', 'password456')).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('should return true for valid names', () => {
      expect(isValidName('Jean Dupont')).toBe(true);
      expect(isValidName("Jean d'Orient")).toBe(true);
      expect(isValidName('Marie-Claire')).toBe(true);
      expect(isValidName('')).toBe(true); // optionnel
      expect(isValidName(null)).toBe(true); // optionnel
    });

    it('should return false for invalid names', () => {
      expect(isValidName('123')).toBe(false);
      expect(isValidName('a'.repeat(51))).toBe(false);
      expect(isValidName(123)).toBe(false);
    });
  });
});
