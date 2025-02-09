import '@testing-library/jest-dom'

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
