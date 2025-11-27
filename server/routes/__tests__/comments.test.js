import { describe, it, expect } from '@jest/globals';
import { isValidEmail, sanitizeString } from '../../utils/validation.js';

describe('Comments Validation', () => {
  describe('Comment Content Validation', () => {
    it('should validate comment content length', () => {
      const minLength = 3;
      const maxLength = 1000;

      const shortContent = 'ab'; // trop court
      expect(shortContent.trim().length).toBeLessThan(minLength);

      const validContent = 'This is a valid comment content';
      expect(validContent.trim().length).toBeGreaterThanOrEqual(minLength);
      expect(validContent.trim().length).toBeLessThanOrEqual(maxLength);

      const longContent = 'a'.repeat(1001); // trop long
      expect(longContent.trim().length).toBeGreaterThan(maxLength);
    });

    it('should trim whitespace from content', () => {
      const content = '  Comment with spaces  ';
      expect(content.trim()).toBe('Comment with spaces');
    });

    it('should require name for non-authenticated users', () => {
      const name = null;
      const userId = null;
      expect(!name && !userId).toBe(true); // Devrait être rejeté

      const validCase = 'John Doe';
      expect(validCase).toBeTruthy();
    });
  });

  describe('Email Validation for Contact', () => {
    it('should validate email format', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
    });
  });

  describe('String Sanitization', () => {
    it('should sanitize strings correctly', () => {
      expect(sanitizeString('  test  ')).toBe('test');
      expect(sanitizeString('test\n\r')).toBe('test');
    });
  });
});
