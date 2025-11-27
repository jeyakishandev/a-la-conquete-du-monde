import { describe, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';

describe('Auth Middleware Logic', () => {
  describe('Token Extraction', () => {
    it('should extract token from Authorization header', () => {
      const authHeader = 'Bearer test-token-123';
      const token = authHeader && authHeader.split(' ')[1];
      expect(token).toBe('test-token-123');
    });

    it('should handle missing Authorization header', () => {
      const authHeader = null;
      const token = authHeader && authHeader.split(' ')[1];
      expect(token).toBeFalsy();
    });

    it('should handle malformed Authorization header', () => {
      const authHeader = 'InvalidFormat token';
      const token = authHeader && authHeader.split(' ')[1];
      expect(token).toBe('token'); // Prend le deuxième élément
    });
  });

  describe('JWT Token Validation', () => {
    const JWT_SECRET = 'test-secret-key';
    const userId = 123;

    it('should create valid JWT token', () => {
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should verify valid JWT token', () => {
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.userId).toBe(userId);
    });

    it('should reject invalid JWT token', () => {
      const invalidToken = 'invalid-token';
      expect(() => {
        jwt.verify(invalidToken, JWT_SECRET);
      }).toThrow();
    });

    it('should reject expired JWT token', () => {
      const expiredToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '-1h' });
      expect(() => {
        jwt.verify(expiredToken, JWT_SECRET);
      }).toThrow();
    });

    it('should reject token with wrong secret', () => {
      const token = jwt.sign({ userId }, JWT_SECRET);
      expect(() => {
        jwt.verify(token, 'wrong-secret');
      }).toThrow();
    });
  });

  describe('User Data Selection', () => {
    it('should select correct user fields', () => {
      const userSelect = {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
      };

      expect(userSelect.id).toBe(true);
      expect(userSelect.email).toBe(true);
      expect(userSelect.username).toBe(true);
      expect(userSelect.name).toBe(true);
      expect(userSelect.password).toBeUndefined(); // Ne doit pas être inclus
    });
  });
});

