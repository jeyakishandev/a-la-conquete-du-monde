import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';

// Mock simple pour tester
const app = express();
app.get('/api/health', (req, res) => {
  const env = process.env.NODE_ENV || 'test';
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: env,
  });
});

describe('Health Check Endpoint', () => {
  it('should return 200 and status OK', async () => {
    const response = await request(app).get('/api/health').expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
    expect(response.body.environment).toBeDefined();
  });

  it('should return valid timestamp format', async () => {
    const response = await request(app).get('/api/health').expect(200);

    const timestamp = new Date(response.body.timestamp);
    expect(timestamp.getTime()).not.toBeNaN();
  });
});
