import { CanActivate, ExecutionContext, Injectable, Request } from "@nestjs/common";

@Injectable()
export default class TokenGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        console.log(token)
        if (token == null) {
            return false;
        }
        /* if (req.headers.authorization == null) {
            return false;
        } else {
            return true;
        } */
        return true;
    }

    /* private authToken: string;

    constructor(@Request() req) {
        this.authToken = req.headers.authorization;
        if (this.authToken == null) {
            throw new Error('No token found');
        }
    } */


}