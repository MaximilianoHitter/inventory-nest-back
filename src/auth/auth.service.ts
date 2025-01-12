import { Injectable } from '@nestjs/common';
import { CryptService } from 'src/crypt/crypt.service';

@Injectable()
export class AuthService {
    encrypt(text: string) {
        const cryptService = new CryptService();
        return cryptService.encrypt(text);
    }

    decrypt(encriptedText: string) {
        const cryptService = new CryptService();
        return cryptService.decrypt(encriptedText);
    }
}
