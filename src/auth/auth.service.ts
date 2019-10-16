import {
  Injectable,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

/*
      TODO : Delete payload from list if exists on login
*/
@Injectable()
export class AuthService {
  Logoutlist: any;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.Logoutlist = {};
    setInterval(() => {
      this.checkTokenLogoutList();
    }, 60000);
  }

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

    delete this.Logoutlist[userId];

    return {
      access_token: this.jwtService.sign({
        username: username,
        id: userId,
        roles: roles,
      }),
    };
  }

  async logout(user: any) {
    this.Logoutlist[user.id] = user;
  }

  async forgotPass() {
    return 'fogot pass';
  }

  async resetPass(req: object) {}

  checkTokenLogoutList() {
    const keys = Object.keys(this.Logoutlist);
    const formattedDate = Math.floor(Date.now() / 1000);
    keys.forEach(key => {
      const { exp } = this.Logoutlist[key];
      if (formattedDate > exp) {
        delete this.Logoutlist[key];
      }
    });
  }

  checkTokenValidity(payload: any) {
    return !this.Logoutlist.hasOwnProperty(payload.id);
  }
}
