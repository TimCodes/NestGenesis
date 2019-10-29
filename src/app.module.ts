import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { RolesModule } from './roles/roles.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UsersModule, AuthModule, AccountsModule, RolesModule, MailerModule, ConfigModule],
  providers: [AppService, MailerService],
})
export class AppModule {}
