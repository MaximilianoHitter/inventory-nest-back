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
        //validar si el token nunca vino en el header
        if (token == null) {
            throw new HttpException('Token inválido 1', HttpStatus.UNAUTHORIZED)
        }
        const tokenBearerLess = token.replace('Bearer ', '');
        const tokenDecrypted = JSON.parse(this.cryptService.decrypt(tokenBearerLess));
        //validar si el app_name es correcto
        if (tokenDecrypted.header.app_name != this.configService.get('APP_NAME')) {
            throw new HttpException('Token inválido 2', HttpStatus.UNAUTHORIZED)
        }
        //validar si el secret_crypt es correcto
        if (tokenDecrypted.signature.secret != this.configService.get('SECRET_CRYPT')) {
            throw new HttpException('Token inválido 3', HttpStatus.UNAUTHORIZED)
        }
        //validar el expires in
        if (Date.now() < tokenDecrypted.payload.expires_in) {
            throw new HttpException('Token expirado 4', HttpStatus.UNAUTHORIZED)
        }
        //validar si el token está en cache
        const tokenCached = await this.cache.get(`user-${tokenDecrypted.payload.user_id}`);
        if (tokenCached == null) {
            throw new HttpException('Token inválido 5', HttpStatus.UNAUTHORIZED)
        }
        request.user_id = tokenDecrypted.payload.user_id;
        return true;

    }
}
