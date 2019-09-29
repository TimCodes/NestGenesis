import { Controller, Post, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'hello auth';
  }

  @Post('login')
  async login(@Request() req) {
    console.log(' ---- auth login ctrl req ----', req.body);
    return this.authService.login(req.body);
  }
}
