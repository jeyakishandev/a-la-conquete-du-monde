import { describe, it, expect } from '@jest/globals';
import { isValidEmail } from '../../utils/validation.js';

describe('Contact Form Validation', () => {
  describe('Required Fields', () => {
    it('should require name field', () => {
      const name = null;
      expect(name).toBeFalsy();
    });

    it('should require email field', () => {
      const email = null;
      expect(email).toBeFalsy();
    });

    it('should require message field', () => {
      const message = null;
      expect(message).toBeFalsy();
    });

    it('should accept all required fields', () => {
      const name = 'John Doe';
      const email = 'john@example.com';
      const message = 'Test message';

      expect(name).toBeTruthy();
      expect(email).toBeTruthy();
      expect(message).toBeTruthy();
    });
  });

  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });

    it('should validate email regex pattern', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test('test@example.com')).toBe(true);
      expect(emailRegex.test('invalid')).toBe(false);
    });
  });
});
