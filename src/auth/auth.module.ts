import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from 'src/models/Token.class';
import { CryptService } from 'src/crypt/crypt.service';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [Token, CryptModule],
  exports: [AuthService]
})
export class AuthModule { }
