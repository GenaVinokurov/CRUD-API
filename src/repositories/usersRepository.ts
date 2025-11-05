import { User, CreateUserDTO, UpdateUserDTO } from '../models/User';
import { NotFound, NotImplemented } from '../errors/httpErrors';
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

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const users = await readUsers();
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFound('User not found');
    }
    user.username = dto.username;
    user.age = dto.age;
    user.hobbies = dto.hobbies;
    await writeUsers(users);
    return user;
  }

  async remove(id: string): Promise<boolean> {
    const users = await readUsers();
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFound('User not found');
    }
    await writeUsers(users.filter((user) => user.id !== id));
    return true;
  }
}
