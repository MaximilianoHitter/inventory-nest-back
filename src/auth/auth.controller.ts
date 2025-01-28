import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Cache } from 'cache-manager';
import TokenGuard from './guard/token.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject('CACHE_MANAGER') private cache: Cache
    ) { }

    @Post('login')
    async login(@Body() loginDto: AuthDto) {
        /* return loginDto; */
        const user_id = 20;
        const token = this.authService.getToken(user_id);
        const nombreCached: string = `user-${user_id}`;
        await this.cache.set(nombreCached, token, 3600 * 1000);
        return {
            token: token,
            user_id: user_id
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
