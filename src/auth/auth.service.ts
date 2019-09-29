import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { username, userId, roles } = await this.validateUser(
      user.username,
      user.password,
    );
    if (!username) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({
        username: username,
        id: userId,
        roles: roles,
      }),
    };
  }
}
