import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password:
          '$2b$10$HPfnhX7WaSqUMW/WZ1sVtei1TNQ9McZJqhc9ebCX/K7Wt9h7mk2T2',
      },
      {
        userId: 2,
        username: 'chris',
        password:
          '$2b$10$HPfnhX7WaSqUMW/WZ1sVtei1TNQ9McZJqhc9ebCX/K7Wt9h7mk2T2',
      },
      {
        userId: 3,
        username: 'maria',
        password:
          '$2b$10$HPfnhX7WaSqUMW/WZ1sVtei1TNQ9McZJqhc9ebCX/K7Wt9h7mk2T2',
        helllo: 'world',
        roles: ['admin', 'manager', 'user'],
      },
    ];
  }

  async create(username, password) {
    const { hash } = await this.generatePasswordHash(password);
    this.users.push({
      userId: this.users.length + 1,
      username,
      password: hash,
    });
    return this.users;
  }
  async findByUserName(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async verifyPassword(username: string, password: string) {
    const user = await this.findByUserName(username);
    const isMatch = await Bcrypt.compare(password, user.password);
    return isMatch;
  }

  private async generatePasswordHash(password) {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(password, salt);

    return { password, hash };
  }
}
