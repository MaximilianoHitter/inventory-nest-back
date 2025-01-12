import { Injectable } from '@nestjs/common';
import * as CryptoJs from 'crypto-js';

@Injectable()
export class CryptService {
    private readonly secreyKey = process.env.SECRET_CRYPT;

    encrypt(text: string): string {
        return CryptoJs.AES.encrypt(text, this.secreyKey).toString();
    }

    decrypt(encriptedText: string): string {
        const bytes = CryptoJs.AES.decrypt(encriptedText, this.secreyKey);
        return bytes.toString(CryptoJs.enc.Utf8);
    }
}
