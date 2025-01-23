import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import TokenGuard from 'src/auth/guard/token.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly configService: ConfigService, private readonly authService: AuthService) { }


    @Post('login')
    async login() {
        const user_id = 15;
        const token = this.authService.getToken(user_id);
        return {
            token: token,
            user_id: user_id
        };

    }

    @Get('me')
    @UseGuards(TokenGuard)
    async me(@Request() req) {
        return {
            user_id: req.user_id
        };
    }
}
