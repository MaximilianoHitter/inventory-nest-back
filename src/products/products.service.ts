import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOne({ where: { id } });
    }

    async create(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async update(id: number, product: Product): Promise<Product> {
        await this.productRepository.update(id, product);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

    async exists(id: number): Promise<boolean> {
        return await this.productRepository.findOne({ where: { id } }) != null;
    }
}
