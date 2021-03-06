import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  private accounts: any[];

  constructor() {
    this.accounts = [
      {
        id: 0,
        userId: 0,
        statsus: 'active',
      },
      {
        id: 1,
        userId: 2,
        statsus: 'active',
      },
      {
        id: 2,
        userId: 2,
        statsus: 'active',
      },
    ];
  }

  async getAll() {
    return this.accounts;
  }

  async getById(id) {}

  async getByUsername(username) {}

  async create(account) {
    this.accounts.push(account);
    return this.accounts.slice();
  }

  async update(username) {}

  async delete(username) {}

  async activate(username) {}

  async linkUser(username) {}

  async unLinkUser(username) {}
}
