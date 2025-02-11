import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

// Mock next-auth
jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(() => ({
    user: {
      _id: 'test-user-id',
      provider: 'credentials'
    }
  }))
}))

// Add TextEncoder/TextDecoder for mongodb-memory-server
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add fetch for Next.js
const { fetch, Request, Response, Headers } = require('node-fetch');
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
