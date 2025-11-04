import { promises as fs } from 'fs';
import { join } from 'path';
import { User } from '../models/User';
import { InternalError } from '../errors/httpErrors';

const DATA_DIR = 'data';
const DEFAULT_FILE = 'users.json';
const DATA_FILE = process.env.DATA_FILE || join(DATA_DIR, DEFAULT_FILE);

async function ensureDataFile(): Promise<void> {
  try {
    const dir = process.env.DATA_FILE ? DATA_FILE.split('/').slice(0, -1).join('/') : DATA_DIR;
    if (dir && dir !== '.') {
      await fs.mkdir(dir, { recursive: true });
    }
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    throw new InternalError(`Failed to initialize data file: ${(error as Error).message}`);
  }
}

export async function readUsers(): Promise<User[]> {
  await ensureDataFile();
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const users = JSON.parse(content) as User[];
    return Array.isArray(users) ? users : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw new InternalError(`Failed to read users: ${(error as Error).message}`);
  }
}

export async function writeUsers(users: User[]): Promise<void> {
  await ensureDataFile();
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    throw new InternalError(`Failed to write users: ${(error as Error).message}`);
  }
}

