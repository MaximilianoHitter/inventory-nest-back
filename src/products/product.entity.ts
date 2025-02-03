import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    marca: string;

    @Column('float')
    @IsNotEmpty()
    @IsNumber()
    precio: number;
}