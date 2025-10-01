// Jest setup file
// This file is run before each test file

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'file:./test.db';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods in tests
global.console = {
  ...console,
  // Uncomment to ignore console.log in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Global test utilities
global.testUtils = {
  // Helper to create test user
  createTestUser: () => ({
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpassword'
  }),
  
  // Helper to create test article
  createTestArticle: () => ({
    id: 1,
    title: 'Test Article',
    description: 'Test description',
    content: 'Test content',
    category: 'test',
    image: 'test.jpg'
  })
};
