import { UsersRepository } from '../repositories/usersRepository';
import { CreateUserDTO, UpdateUserDTO, User } from '../models/User';
import { NotImplemented } from '../errors/httpErrors';

export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(private readonly repository: UsersRepository) {}

  async getAll(): Promise<User[]> {
    throw new NotImplemented();
  }

  async getById(id: string): Promise<User> {
    throw new NotImplemented();
  }

  async create(dto: CreateUserDTO): Promise<User> {
    return await this.repository.create(dto);
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    throw new NotImplemented();
  }

  async remove(id: string): Promise<void> {
    throw new NotImplemented();
  }
}
