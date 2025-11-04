export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type CreateUserDTO = {
  username: string;
  age: number;
  hobbies: string[];
};

export type UpdateUserDTO = CreateUserDTO;

