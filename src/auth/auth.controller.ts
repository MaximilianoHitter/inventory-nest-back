import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    @Post('login')
    async login(@Body() loginDto: AuthDto) {
        return loginDto;
    }

    @Post('pepe')
    async pepe(@Body() asd: any) {
        const authService = new AuthService();
        return authService.encrypt(asd.pepe);
    }

    @Post('epep')
    async epep(@Body() asd: any) {
        const authService = new AuthService();
        return authService.decrypt(asd.pepe);
    }
}
