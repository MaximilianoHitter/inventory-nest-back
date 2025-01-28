import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductCreateDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNotEmpty()
    @IsNumber()
    precio: number;
}