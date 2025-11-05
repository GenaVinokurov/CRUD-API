import request from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { createServer } from '../src/server';

describe('Users API', () => {
  const tmpFile = path.join(os.tmpdir(), `users-${Date.now()}-${Math.random()}.json`);
  let server: ReturnType<typeof createServer>;

  beforeAll(async () => {
    process.env.DATA_FILE = tmpFile;
    try {
      await fs.unlink(tmpFile);
    } catch {}
    server = createServer();
  });

  afterAll(async () => {
    try {
      await fs.unlink(tmpFile);
    } catch {}
  });

  test('GET /api/users returns empty array initially', async () => {
    const resp = await request(server).get('/api/users').expect(200);
    expect(Array.isArray(resp.body)).toBe(true);
    expect(resp.body).toEqual([]);
  });

  test('POST create and GET by id returns created user', async () => {
    const create = await request(server)
      .post('/api/users')
      .send({ username: 'Alice', age: 30, hobbies: ['chess'] })
      .set('Content-Type', 'application/json')
      .expect(201);

    const user = create.body;
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('Alice');
    expect(user.age).toBe(30);
    expect(user.hobbies).toEqual(['chess']);

    const getById = await request(server).get(`/api/users/${user.id}`).expect(200);
    expect(getById.body).toEqual(user);
  });

  test('PUT update, DELETE, then GET by id returns 404', async () => {
    const created = await request(server)
      .post('/api/users')
      .send({ username: 'Bob', age: 25, hobbies: [] })
      .set('Content-Type', 'application/json')
      .expect(201);
    const id = created.body.id as string;

    const updated = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'Bobby', age: 26, hobbies: ['reading'] })
      .set('Content-Type', 'application/json')
      .expect(200);

    expect(updated.body.id).toBe(id);
    expect(updated.body.username).toBe('Bobby');
    expect(updated.body.age).toBe(26);
    expect(updated.body.hobbies).toEqual(['reading']);

    await request(server).delete(`/api/users/${id}`).expect(204);
    await request(server).get(`/api/users/${id}`).expect(404);
  });
});
