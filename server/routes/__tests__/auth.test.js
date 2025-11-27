import { describe, it, expect } from '@jest/globals';
import bcrypt from 'bcryptjs';
import { isValidEmail, isValidUsername, validatePassword } from '../../utils/validation.js';

describe('Auth Validation Utilities', () => {
  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
    });
  });

  describe('Username Validation', () => {
    it('should validate correct username formats', () => {
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('user_name')).toBe(true);
      expect(isValidUsername('abc')).toBe(true);
      expect(isValidUsername('username1234567890')).toBe(true); // 20 chars
    });

    it('should reject invalid username formats', () => {
      expect(isValidUsername('ab')).toBe(false); // trop court
      expect(isValidUsername('user-name')).toBe(false); // tiret non autorisé
      expect(isValidUsername('user name')).toBe(false); // espace non autorisé
      expect(isValidUsername('')).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('Password123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('short');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should check for required password criteria', () => {
      const result1 = validatePassword('nouppercase123!');
      expect(result1.isValid).toBe(false);

      const result2 = validatePassword('NOLOWERCASE123!');
      expect(result2.isValid).toBe(false);

      const result3 = validatePassword('NoNumbers!');
      expect(result3.isValid).toBe(false);

      const result4 = validatePassword('NoSpecialChar123');
      expect(result4.isValid).toBe(false);
    });
  });

  describe('Bcrypt Password Hashing', () => {
    it('should hash passwords correctly', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await bcrypt.hash(password, 10);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);

      const isValid = await bcrypt.compare(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should verify hashed passwords correctly', async () => {
      const password = 'MySecurePassword123!';
      const hashedPassword = await bcrypt.hash(password, 10);

      const correctMatch = await bcrypt.compare(password, hashedPassword);
      expect(correctMatch).toBe(true);

      const wrongMatch = await bcrypt.compare('WrongPassword', hashedPassword);
      expect(wrongMatch).toBe(false);
    });
  });
});
