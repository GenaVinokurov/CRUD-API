import { UsersRepository } from '../repositories/usersRepository';
import { CreateUserDTO, UpdateUserDTO, User } from '../models/User';
import { BadRequest, NotFound, NotImplemented } from '../errors/httpErrors';
import { isNonEmptyString, isNumber, isStringArray } from '../utils/validators';

export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(private readonly repository: UsersRepository) {}

  async getAll(): Promise<User[]> {
    return await this.repository.getAll();
  }

  async getById(id: string): Promise<User> {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new NotFound('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    if (!isNonEmptyString(dto.username)) {
      throw new BadRequest('Username is required');
    }
    if (!isNumber(dto.age)) {
      throw new BadRequest('Age must be a number');
    }
    if (!isStringArray(dto.hobbies)) {
      throw new BadRequest('Hobbies must be an array of strings');
    }
    return await this.repository.create(dto);
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    throw new NotImplemented();
  }

  async remove(id: string): Promise<void> {
    throw new NotImplemented();
  }
}
