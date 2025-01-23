import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptService } from 'src/crypt/crypt.service';
import { Token } from 'src/models/Token.class';

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService, private readonly cryptService: CryptService) { }


    encrypt(text: string) {
        return this.cryptService.encrypt(text);
    }

    decrypt(encriptedText: string) {
        return this.cryptService.decrypt(encriptedText);
    }

    getToken(user_id: number) {
        const token: Token = {
            header: {
                app_name: this.configService.get('APP_NAME'),
            },
            payload: {
                user_id: user_id,
                expires_in: Date.now() + 3600
            },
            signature: {
                secret: this.configService.get('SECRET_CRYPT')
            }
        };
        return this.cryptService.encrypt(JSON.stringify(token))
    }
}
