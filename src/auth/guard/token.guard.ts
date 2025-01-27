import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, Request } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CryptService } from "src/crypt/crypt.service";
import { Token } from "src/models/Token.class";
import { Cache } from "cache-manager";

@Injectable()
export default class TokenGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly cryptService: CryptService,
        @Inject('CACHE_MANAGER') private readonly cache: Cache,
    ) { }

    async canActivate(context: ExecutionContext) {
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


                //validar si el token está en cache
                const tokenCached = await this.cache.get(`${tokenDecrypted.payload.user_id}`);
                throw new HttpException(tokenCached, HttpStatus.UNAUTHORIZED)
                if (tokenCached == null) {
                    //@ts-ignore
                    throw new HttpException('Token inválido 4', HttpStatus.UNAUTHORIZED)
                }
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
