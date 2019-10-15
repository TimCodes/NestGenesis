import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
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

  @Get(':id')
  getById(@Param('id') id) {
    return 'get indvidual account';
  }

  @Post()
  @Roles('admin')
  create(@Body() account: any) {
    console.log('create new ', account);
    return this.accountsService.create(account);
  }

  @Put(':id')
  updateAccount(@Param('id') id) {
    return 'update indvidual account';
  }

  @Delete(':id')
  deleteAccount(@Param('id') id) {
    return 'delete indvidual account';
  }

  @Post('register')
  register(@Body() login) {}

  @Post('login')
  login(@Body() login) {}

  @Post('logoff')
  logoff(@Body() login) {}

  @Get('confirmemail')
  confirmEmail(@Body() login) {}

  @Post('forgotpassword')
  forgotPassword(@Body() login) {}
}
