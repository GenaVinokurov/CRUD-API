import { User, CreateUserDTO, UpdateUserDTO } from '../models/User';
import { NotImplemented } from '../errors/httpErrors';
import { v4 as uuidv4 } from 'uuid';
import { readUsers, writeUsers } from '../storage/fileDb';

export class UsersRepository {
  async getAll(): Promise<User[]> {
    return await readUsers();
  }

  async getById(id: string): Promise<User | null> {
    return await readUsers().then((users) => users.find((user) => user.id === id) || null);
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const user: User = {
      id: uuidv4(),
      username: dto.username,
      age: dto.age,
      hobbies: dto.hobbies,
    };
    await writeUsers([...(await readUsers()), user]);
    return user;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User | null> {
    throw new NotImplemented();
  }

  async remove(id: string): Promise<boolean> {
    throw new NotImplemented();
  }
}
