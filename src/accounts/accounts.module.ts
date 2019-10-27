import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '../mailer/mailer.module';

import { VerificationtokenService } from './verificationtoken.service';

@Module({
  imports: [UsersModule, AuthModule, MailerModule],
  controllers: [AccountsController],
  providers: [AccountsService, VerificationtokenService],
})
export class AccountsModule {}
