import {
  Controller,
  Post,
  Get,
  Request,
  Delete,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return 'hello auth';
  }
  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    console.log('----- register ------', registerDTO);
    return this.usersService.create(registerDTO.email, registerDTO.password);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    console.log(' ---- auth login ctrl req ----', loginDTO);
    return this.authService.login(loginDTO);
  }

  @Post('logoff')
  logoff(@Body() login) {}

  @Get('confirmemail')
  confirmEmail(@Body() login) {}

  @Post('forgotpassword')
  forgotPassword(@Body() login) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  logout(@Request() req) {
    console.log(' ----- log out -----', req.user);
    this.authService.logout(req.user);
    return req.logout();
  }
}
