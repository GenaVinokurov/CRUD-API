import { IncomingMessage, ServerResponse } from 'http';
import { NotImplemented } from '../errors/httpErrors';
import { CreateUserDTO } from '../models/User';
import { UsersService } from '../services/usersService';
import { UsersRepository } from '../repositories/usersRepository';
import { sendJson } from '../utils/response';
import { parseJsonBody } from '../utils/bodyParser';

const repository = new UsersRepository();
const service = new UsersService(repository);

export async function getAllUsers(_req: IncomingMessage, _res: ServerResponse): Promise<void> {
  console.log('getAllUsers');
  throw new NotImplemented();
}

export async function getUserById(
  _req: IncomingMessage,
  _res: ServerResponse,
  _userId: string,
): Promise<void> {
  throw new NotImplemented();
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
