import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class VerificationtokenService {
  private tokens: string[];

  constructor() {
    this.tokens = [];
  }

  createToken(userId: string) {
    const hash = crypto.randomBytes(20).toString('hex');
    return { userId, token: hash };
  }

  verifyToken(verificationToken: string) {
    return this.tokens.includes(verificationToken);
  }
}
