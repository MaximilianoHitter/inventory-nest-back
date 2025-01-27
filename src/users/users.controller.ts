import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import TokenGuard from 'src/auth/guard/token.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Get('me')
    @UseGuards(TokenGuard)
    async me(@Request() req) {
        return {
            user_id: req.user_id
        };
    }

    @Get('all')
    @UseGuards(TokenGuard)
    async all() {
        return {
            users: this.usersService.findAll()
        };
    }
}
