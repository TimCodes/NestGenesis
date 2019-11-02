import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';
import { VerificationtokenService } from './verificationtoken.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { MailerService } from '../mailer/mailer.service';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('accounts')
//@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly verificationTokenService: VerificationtokenService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    console.log('----- register ------', registerDTO);
    console.log('- ------ send mailll -----');
    const user = await this.usersService.create(
      registerDTO.username,
      registerDTO.email,
      registerDTO.password,
    );
    const go = await this.mailerService
      .sendMail('verify-email', {
        userName: user.username,
        email: user.email,
        domainName: 'Genisis-ID',
        returnUrl: `localhost:3002/accounts/confirmemail/${
          this.verificationTokenService.createToken(user.userId.toString())
            .token
        }`,
      })
      .catch(console.error);
    return user;
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    console.log(' ---- auth login ctrl req ----', loginDTO);
    return this.authService.login(loginDTO);
  }

  @Post('logoff')
  logoff(@Body() login) {}

  @Get('confirmemail/:token')
  confirmEmail(@Param('token') token) {
    const isTokenValid = this.verificationTokenService.verifyToken(token);
    if (isTokenValid) {
      return 'verified ' + token;
    }
  }

  @Post('forgotpassword')
  forgotPassword(@Body() login) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  logout(@Request() req) {
    console.log(' ----- log out -----', req.user);
    this.authService.logout(req.user);
    return req.logout();
  }

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
}
