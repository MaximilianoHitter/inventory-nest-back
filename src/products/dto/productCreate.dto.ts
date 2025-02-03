import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductCreateDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser alphanumérico' })
    nombre: string;

    @IsNotEmpty({ message: 'La marca es requerida' })
    @IsString({ message: 'La marca debe ser alphanumérica' })
    marca: string;

    @IsNotEmpty({ message: 'El precio es requerido' })
    @IsNumber({}, { message: 'El precio debe ser numérico' })
    precio: number;
}