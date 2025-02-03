import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import TokenGuard from 'src/auth/guard/token.guard';
import { UsersService } from './users.service';
import * as argon2 from "argon2";

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

    @Post('register')
    async register(@Request() req) {
        const { firstName, lastName, email, password } = req.body;
        const pass = await argon2.hash(password);
        const user = await this.usersService.create({
            firstName,
            lastName,
            email,
            password: pass,
            isActive: true
        });
        const user_clean = user;
        delete user_clean.password;
        return {
            user: user_clean
        };
    }
}
