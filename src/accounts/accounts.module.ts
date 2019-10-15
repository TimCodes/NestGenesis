import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { VerificationtokenService } from './verificationtoken.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, VerificationtokenService],
})
export class AccountsModule {}
