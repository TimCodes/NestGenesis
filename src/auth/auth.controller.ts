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
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'hello auth';
  }
  @Post('register')
  register(@Body() login) {}

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
