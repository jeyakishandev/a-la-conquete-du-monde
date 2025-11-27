import { describe, it, expect } from '@jest/globals';
import {
  isValidEmail,
  isValidUsername,
  validatePassword,
  validateArticleTitle,
  validateArticleDescription,
  validateArticleContent,
  isValidCategory,
  isValidImageUrl,
  sanitizeString,
  isValidName,
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
    });
  });

  describe('validatePassword', () => {
    it('should return valid for strong passwords', () => {
      const result = validatePassword('Password123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid for weak passwords', () => {
      const result1 = validatePassword('short');
      expect(result1.isValid).toBe(false);
      expect(result1.errors.length).toBeGreaterThan(0);

      const result2 = validatePassword('nouppercase123!');
      expect(result2.isValid).toBe(false);

      const result3 = validatePassword('NOLOWERCASE123!');
      expect(result3.isValid).toBe(false);

      const result4 = validatePassword('NoNumbers!');
      expect(result4.isValid).toBe(false);

      const result5 = validatePassword('NoSpecialChar123');
      expect(result5.isValid).toBe(false);
    });
  });

  describe('validateArticleTitle', () => {
    it('should return valid for good titles', () => {
      const result = validateArticleTitle('Mon super article de voyage');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBeDefined();
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

    it('should return invalid for short descriptions', () => {
      const result = validateArticleDescription('Court');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateArticleContent', () => {
    it('should return valid for good content', () => {
      const result = validateArticleContent('Contenu détaillé de mon article de voyage avec assez de texte');
      expect(result.isValid).toBe(true);
    });

    it('should return invalid for short content', () => {
      const result = validateArticleContent('Court');
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
      expect(isValidImageUrl('')).toBe(true); // optionnel
    });

    it('should return false for invalid URLs', () => {
      expect(isValidImageUrl('not-a-url')).toBe(false);
      expect(isValidImageUrl('a'.repeat(501))).toBe(false); // trop long
    });
  });

  describe('sanitizeString', () => {
    it('should sanitize strings correctly', () => {
      expect(sanitizeString('  test  ')).toBe('test');
      expect(sanitizeString('test\n\r')).toBe('test');
      expect(sanitizeString('')).toBe('');
    });

    it('should limit string length', () => {
      const longString = 'a'.repeat(300);
      const result = sanitizeString(longString, 100);
      expect(result.length).toBe(100);
    });
  });

  describe('isValidName', () => {
    it('should return true for valid names', () => {
      expect(isValidName('Jean Dupont')).toBe(true);
      expect(isValidName("Jean d'Orient")).toBe(true);
      expect(isValidName('Marie-Claire')).toBe(true);
      expect(isValidName('')).toBe(true); // optionnel
    });

    it('should return false for invalid names', () => {
      expect(isValidName('123')).toBe(false);
      expect(isValidName('a'.repeat(51))).toBe(false);
    });
  });
});

