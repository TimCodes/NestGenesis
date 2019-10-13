import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { RoleModule } from './role/role.module';
import { RolesModule } from './roles/roles.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, AuthModule, AccountsModule, RoleModule, RolesModule],
  providers: [AppService],
})
export class AppModule {}
