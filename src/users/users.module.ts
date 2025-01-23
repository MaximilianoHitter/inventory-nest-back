import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AuthModule, CryptModule]
})
export class UsersModule { }
