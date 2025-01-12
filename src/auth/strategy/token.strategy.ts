import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CryptService } from "src/crypt/crypt.service";


@Injectable()
export default class TokenStrategy {
    constructor(
        config: ConfigService
    ) {

    }

    validate(tokenEncripted: string): boolean {
        const cryptService = new CryptService();
        const token = cryptService.decrypt(tokenEncripted);
        const parts = token.split('.');
        if (JSON.parse(parts[0]).app == 'PEPE') {
            return true;
        } else {
            return false;
        }
    }
}