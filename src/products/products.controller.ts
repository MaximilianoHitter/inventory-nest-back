import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/productCreate.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        return await this.productsService.findOne(id);
    }

    @Post()
    async create(@Body() product: ProductCreateDto): Promise<Product> {
        return await this.productsService.create(product as Product);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
        return await this.productsService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return await this.productsService.delete(id);
    }
}
