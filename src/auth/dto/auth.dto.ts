import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;
}