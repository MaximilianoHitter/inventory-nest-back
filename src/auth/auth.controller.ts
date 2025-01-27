import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Cache } from 'cache-manager';

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
        await this.cache.set(`${user_id}`, token, 60 * 60);
        return {
            token: token,
            user_id: user_id
        };
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
