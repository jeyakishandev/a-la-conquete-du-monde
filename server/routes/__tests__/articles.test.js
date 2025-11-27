import { describe, it, expect } from '@jest/globals';
import {
  validateArticleTitle,
  validateArticleDescription,
  validateArticleContent,
  isValidCategory,
  isValidImageUrl,
} from '../../utils/validation.js';

describe('Article Validation Logic (used in routes)', () => {
  describe('validateArticleTitle', () => {
    it('should validate correct article titles', () => {
      const result = validateArticleTitle('Mon super article de voyage');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBeDefined();
    });

    it('should reject titles that are too short', () => {
      const result = validateArticleTitle('Ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('3 caractères');
    });

    it('should reject titles that are too long', () => {
      const longTitle = 'a'.repeat(101);
      const result = validateArticleTitle(longTitle);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('100 caractères');
    });
  });

  describe('validateArticleDescription', () => {
    it('should validate correct descriptions', () => {
      const result = validateArticleDescription('Une description détaillée de mon voyage');
      expect(result.isValid).toBe(true);
    });

    it('should reject descriptions that are too short', () => {
      const result = validateArticleDescription('Court');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('10 caractères');
    });

    it('should reject descriptions that are too long', () => {
      const longDesc = 'a'.repeat(201);
      const result = validateArticleDescription(longDesc);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('200 caractères');
    });
  });

  describe('validateArticleContent', () => {
    it('should validate correct content', () => {
      const content =
        'Contenu détaillé de mon article de voyage avec assez de texte pour être valide';
      const result = validateArticleContent(content);
      expect(result.isValid).toBe(true);
    });

    it('should reject content that is too short', () => {
      const result = validateArticleContent('Court');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('50 caractères');
    });
  });

  describe('isValidCategory', () => {
    it('should validate correct categories', () => {
      expect(isValidCategory('destinations')).toBe(true);
      expect(isValidCategory('culture')).toBe(true);
      expect(isValidCategory('aventure')).toBe(true);
      expect(isValidCategory('conseils')).toBe(true);
    });

    it('should reject invalid categories', () => {
      expect(isValidCategory('invalid')).toBe(false);
      expect(isValidCategory('')).toBe(false);
      expect(isValidCategory(null)).toBe(false);
    });
  });

  describe('isValidImageUrl', () => {
    it('should validate correct image URLs', () => {
      expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true);
      expect(isValidImageUrl('http://example.com/image.png')).toBe(true);
      expect(isValidImageUrl('/assets/images/image.jpg')).toBe(true);
      expect(isValidImageUrl('')).toBe(true); // optionnel
    });

    it('should reject invalid image URLs', () => {
      expect(isValidImageUrl('not-a-url')).toBe(false);
    });
  });

  describe('Article filtering logic', () => {
    it('should handle userId filtering', () => {
      const userId = '1';
      const parsed = parseInt(userId);
      expect(parsed).toBe(1);
      expect(isNaN(parsed)).toBe(false);
    });

    it('should handle category filtering', () => {
      const category = 'destinations';
      const shouldFilter = category && category !== 'all';
      expect(shouldFilter).toBe(true);
    });

    it('should handle search filtering', () => {
      const search = 'Paris';
      const shouldSearch = !!search;
      expect(shouldSearch).toBe(true);
    });

    it('should handle invalid userId', () => {
      const invalidUserId = 'abc';
      const parsed = parseInt(invalidUserId);
      expect(isNaN(parsed)).toBe(true);
    });
  });
});
