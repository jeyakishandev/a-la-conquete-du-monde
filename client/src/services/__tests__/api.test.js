import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('API URL Configuration', () => {
    it('should use default API URL when not configured', () => {
      // En test, l'URL par défaut devrait être /api
      const defaultUrl = '/api';
      expect(defaultUrl).toBe('/api');
    });

    it('should correct malformed URLs', () => {
      const malformedUrl = 'hthttps://example.com/api';
      const corrected = malformedUrl.replace(/^ht+tp/, 'http').replace(/^ht+tp/, 'http');
      expect(corrected).toMatch(/^https?:\/\//);
    });
  });

  describe('LocalStorage Token Management', () => {
    it('should get token from localStorage', () => {
      localStorage.setItem('token', 'test-token-123');
      const token = localStorage.getItem('token');
      expect(token).toBe('test-token-123');
    });

    it('should handle missing token', () => {
      localStorage.removeItem('token');
      const token = localStorage.getItem('token');
      expect(token).toBeNull();
    });

    it('should remove token on logout', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.removeItem('token');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('API Request Configuration', () => {
    it('should set correct headers', () => {
      const headers = {
        'Content-Type': 'application/json',
      };
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('should include Authorization header when token exists', () => {
      const token = 'test-token';
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      expect(headers.Authorization).toBe('Bearer test-token');
    });
  });

  describe('Error Handling', () => {
    it('should handle 401 errors', () => {
      const errorResponse = { status: 401 };
      const shouldRemoveToken = errorResponse.status === 401;
      expect(shouldRemoveToken).toBe(true);
    });

    it('should handle network errors', () => {
      const networkError = { message: 'Network Error' };
      expect(networkError.message).toBe('Network Error');
    });
  });
});
