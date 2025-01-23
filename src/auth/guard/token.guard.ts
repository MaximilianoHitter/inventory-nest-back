import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Request } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CryptService } from "src/crypt/crypt.service";
import { Token } from "src/models/Token.class";

@Injectable()
export default class TokenGuard implements CanActivate {
    constructor(private readonly configService: ConfigService, private readonly cryptService: CryptService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (token == null) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
        }
        const tokenBearerLess = token.replace('Bearer ', '');
        const tokenDecrypted = JSON.parse(this.cryptService.decrypt(tokenBearerLess));
        //@ts-ignore
        if (tokenDecrypted.header.app_name != this.configService.get('APP_NAME')) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
        } else {
            //@ts-ignore
            if (tokenDecrypted.signature.secret != this.configService.get('SECRET_CRYPT')) {
                throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
            } else {
                //validar el expires in
                //@ts-ignore
                request.user_id = tokenDecrypted.payload.user_id;
                return true;
            }
        }

    }
    /* if (req.headers.authorization == null) {
        return false;
    } else {
        return true;
    } */
}
