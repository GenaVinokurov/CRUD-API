import { IncomingMessage, ServerResponse } from 'http';
import { notFound, methodNotAllowed } from './utils/response';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/usersController';

export async function routeRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const method = (req.method || 'GET').toUpperCase();
  const url = (req.url || '/').split('?')[0];

  if (url === '/api/users') {
    if (method === 'GET') return getAllUsers(req, res);
    if (method === 'POST') return createUser(req, res);
    return methodNotAllowed(res, ['GET', 'POST']);
  }

  const match = url.match(/^\/api\/users\/([A-Za-z0-9-]+)$/);
  if (match) {
    const userId = match[1];
    if (method === 'GET') return getUserById(req, res, userId);
    if (method === 'PUT') return updateUser(req, res, userId);
    if (method === 'DELETE') return deleteUser(req, res, userId);
    return methodNotAllowed(res, ['GET', 'PUT', 'DELETE']);
  }

  return notFound(res, 'Route not found');
}

