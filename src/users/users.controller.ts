import { Controller, Post, UseGuards } from '@nestjs/common';
import TokenGuard from 'src/auth/guard/token.guard';

@Controller('users')
export class UsersController {
    @Post('login')
    @UseGuards(TokenGuard)
    async login() {
        return "login";
    }
}
