import request from 'supertest';
import { createServer } from '../src/server';

describe('Users API (scaffold)', () => {
  const server = createServer();

  test.skip('GET /api/users returns empty array initially', async () => {
    await request(server).get('/api/users').expect(200);
  });

  test.skip('POST, GET by id, PUT, DELETE flow', async () => {
    // To be implemented when CRUD is added
  });

  test.skip('Invalid UUID and invalid body return 400', async () => {
    // To be implemented when validation is added
  });
});

