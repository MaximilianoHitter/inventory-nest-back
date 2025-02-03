import { CanActivate, ExecutionContext, Inject, Injectable, mixin, NotFoundException, Type } from "@nestjs/common";

export function ExistsGuard(EntityService: Type<any>) {
    @Injectable()
    class ExistGuardMixin implements CanActivate {
        constructor(
            @Inject(EntityService) public readonly service: any
        ) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const id = request.params.id;
            if (!id) {
                throw new NotFoundException('ID no proporcionado');
            }
            const exists = await this.service.exists(id);
            if (!exists) {
                throw new NotFoundException('Modelo no encontrado');
            } else {
                return true;
            }
        }
    }
    return mixin(ExistGuardMixin);
}