import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Request } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CryptService } from "src/crypt/crypt.service";
import { Token } from "src/models/Token.class";

@Injectable()
export default class TokenGuard implements CanActivate {
    constructor(private readonly configService: ConfigService, private readonly cryptService: CryptService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        console.log(token)
        if (token == null) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
        }
        const tokenDecrypted = this.cryptService.decrypt(token);
        const tokenParts = tokenDecrypted.split('.');
        const tokenObject: Token = {
            header: JSON.parse(tokenParts[0]),
            payload: JSON.parse(tokenParts[1]),
            signature: JSON.parse(tokenParts[2])
        };
        if (tokenObject.header.app_name != this.configService.get('APP_NAME')) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
        } else {
            if (tokenObject.signature.secret != this.configService.get('SECRET_TOKEN')) {
                throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
            } else {
                //validar el expires in

                request.user = tokenObject.payload.user_id;
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
