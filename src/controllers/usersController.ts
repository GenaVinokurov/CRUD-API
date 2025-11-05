import { IncomingMessage, ServerResponse } from 'http';
import { BadRequest, NotFound, NotImplemented } from '../errors/httpErrors';
import { CreateUserDTO } from '../models/User';
import { UsersService } from '../services/usersService';
import { UsersRepository } from '../repositories/usersRepository';
import { sendError, sendJson } from '../utils/response';
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
  _req: IncomingMessage,
  _res: ServerResponse,
  _userId: string,
): Promise<void> {
  throw new NotImplemented();
}

export async function deleteUser(
  _req: IncomingMessage,
  _res: ServerResponse,
  _userId: string,
): Promise<void> {
  throw new NotImplemented();
}
