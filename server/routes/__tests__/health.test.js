import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';

// Mock simple pour tester
const app = express();
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

describe('Health Check Endpoint', () => {
  it('should return 200 and status OK', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });
});

