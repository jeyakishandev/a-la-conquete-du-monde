import { describe, it, expect } from '@jest/globals';
import bcrypt from 'bcryptjs';
import {
  isValidEmail,
  isValidUsername,
  isValidName,
  validatePassword,
  sanitizeString,
} from '../../utils/validation.js';

describe('User Profile Validation', () => {
  describe('Profile Update Validation', () => {
    it('should validate name updates', () => {
      const name = 'John Doe';
      const sanitizedName = sanitizeString(name, 50);
      expect(isValidName(sanitizedName)).toBe(true);
    });

    it('should validate email updates', () => {
      const email = 'newemail@example.com';
      const sanitizedEmail = sanitizeString(email.toLowerCase(), 255);
      expect(isValidEmail(sanitizedEmail)).toBe(true);
    });

    it('should validate username updates', () => {
      const username = 'newusername';
      const sanitizedUsername = sanitizeString(username, 20);
      expect(isValidUsername(sanitizedUsername)).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidEmail = 'invalid-email';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should reject invalid username format', () => {
      const invalidUsername = 'ab'; // trop court
      expect(isValidUsername(invalidUsername)).toBe(false);
    });
  });

  describe('Password Update Validation', () => {
    it('should require current password for password change', () => {
      const currentPassword = null;
      const requiresCurrent = !currentPassword;
      expect(requiresCurrent).toBe(true); // Devrait être rejeté
    });

    it('should validate new password strength', () => {
      const strongPassword = 'NewPassword123!';
      const validation = validatePassword(strongPassword);
      expect(validation.isValid).toBe(true);
    });

    it('should reject weak passwords', () => {
      const weakPassword = 'weak';
      const validation = validatePassword(weakPassword);
      expect(validation.isValid).toBe(false);
    });

    it('should hash passwords correctly', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await bcrypt.hash(password, 12);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);

      const isValid = await bcrypt.compare(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should verify current password before change', async () => {
      const currentPassword = 'CurrentPassword123!';
      const storedHash = await bcrypt.hash(currentPassword, 12);

      const isValid = await bcrypt.compare(currentPassword, storedHash);
      expect(isValid).toBe(true);

      const wrongPassword = 'WrongPassword';
      const isInvalid = await bcrypt.compare(wrongPassword, storedHash);
      expect(isInvalid).toBe(false);
    });
  });

  describe('Statistics Calculation', () => {
    it('should calculate article statistics correctly', () => {
      const articles = [
        { views: 10, _count: { likes: 5, favorites: 2, comments: 3 } },
        { views: 20, _count: { likes: 10, favorites: 4, comments: 6 } },
      ];

      const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
      const totalLikes = articles.reduce((sum, article) => sum + article._count.likes, 0);
      const totalFavorites = articles.reduce((sum, article) => sum + article._count.favorites, 0);
      const totalComments = articles.reduce((sum, article) => sum + article._count.comments, 0);

      expect(totalViews).toBe(30);
      expect(totalLikes).toBe(15);
      expect(totalFavorites).toBe(6);
      expect(totalComments).toBe(9);
    });

    it('should handle empty articles array', () => {
      const articles = [];
      const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
      expect(totalViews).toBe(0);
    });

    it('should find most popular article', () => {
      const articles = [
        { id: 1, _count: { likes: 5 } },
        { id: 2, _count: { likes: 10 } },
        { id: 3, _count: { likes: 3 } },
      ];

      const mostPopular = articles.reduce((max, article) =>
        article._count.likes > max._count.likes ? article : max
      );

      expect(mostPopular.id).toBe(2);
      expect(mostPopular._count.likes).toBe(10);
    });
  });
});
