import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptService } from 'src/crypt/crypt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CryptService]
})
export class AuthModule { }
