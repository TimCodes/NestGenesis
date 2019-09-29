import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('accounts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAll() {
    return this.accountsService.getAll();
  }

  @Post()
  @Roles('admin')
  create(@Body() account: any) {
    console.log('create new ', account);
    return this.accountsService.create(account);
  }
}
