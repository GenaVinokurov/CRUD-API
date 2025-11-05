import { IncomingMessage, ServerResponse } from 'http';
import { BadRequest, NotFound, NotImplemented } from '../errors/httpErrors';
import { CreateUserDTO, UpdateUserDTO } from '../models/User';
import { UsersService } from '../services/usersService';
import { UsersRepository } from '../repositories/usersRepository';
import { sendEmpty, sendError, sendJson } from '../utils/response';
import { parseJsonBody } from '../utils/bodyParser';
import { isValidUuid } from '../utils/validators';

const repository = new UsersRepository();
const service = new UsersService(repository);

export async function getAllUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const users = await service.getAll();
  sendJson(res, 200, users);
}

export async function getUserById(req: IncomingMessage, res: ServerResponse, userId: string) {
  if (!isValidUuid(userId)) throw new BadRequest('Invalid UUID');
  const user = await service.getById(userId);
  sendJson(res, 200, user);
}

export async function createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await parseJsonBody<CreateUserDTO>(req);
  const user = await service.create(body);
  sendJson(res, 201, user);
}

export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): Promise<void> {
  if (!isValidUuid(userId)) throw new BadRequest('Invalid UUID');
  const body = await parseJsonBody<UpdateUserDTO>(req);
  const user = await service.update(userId, body);
  sendJson(res, 200, user);
}

export async function deleteUser(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): Promise<void> {
  if (!isValidUuid(userId)) throw new BadRequest('Invalid UUID');
  await service.remove(userId);
  sendEmpty(res, 204);
}
