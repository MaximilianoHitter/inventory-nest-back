import { Body, Controller, Get, Inject, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Cache } from 'cache-manager';
import TokenGuard from './guard/token.guard';
import { UsersService } from 'src/users/users.service';
import * as argon2 from "argon2";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject('CACHE_MANAGER') private cache: Cache,
        private readonly usersService: UsersService
    ) { }

    @Post('login')
    async login(@Body() loginDto: AuthDto) {
        /* return loginDto; */
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.password != await argon2.hash(loginDto.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = this.authService.getToken(user.id);
        const nombreCached: string = `user-${user.id}`;
        await this.cache.set(nombreCached, token, 3600 * 1000);
        const user_clean = user;
        delete user_clean.password;
        return {
            token: token,
            user: user_clean
        };
    }

    @Get('logout')
    @UseGuards(TokenGuard)
    async logout(@Request() req) {
        await this.cache.del(`user-${req.user_id}`);
        return {
            message: 'logged out',
            status: 200
        }
    }

    @Post('pepe')
    async pepe(@Body() asd: any) {
        return this.authService.encrypt(asd.pepe);
    }

    @Post('epep')
    async epep(@Body() asd: any) {
        return this.authService.decrypt(asd.pepe);
    }
}
