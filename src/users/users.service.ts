import { Injectable } from '@nestjs/common';
import Bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        helllo: 'world',
        roles: ['admin', 'manager', 'user'],
      },
    ];
  }

  async create(username, password) {
    const passHash = this.generatePasswordHash(password);
    this.users.push({
      userId: this.users.length + 1,
      username,
      password: passHash,
    });
  }
  async findByUserName(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async verifyPassword(username, password: string) {
    const user = await this.findByUserName(username);
    return Bcrypt.compare(password, user.password);
  }

  private async generatePasswordHash(password) {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(password, salt);

    return { password, hash };
  }
}
