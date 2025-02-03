import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ExistsGuard } from 'src/guards/model-exist.guard';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    @Get()
    async findAll(): Promise<{ data: Product[] }> {
        return {
            data: await this.productsService.findAll()
        };
    }

    @Get(':id')
    @UseGuards(ExistsGuard(ProductsService))
    async findOne(@Param('id') id: number): Promise<{ data: Product }> {
        return {
            data: await this.productsService.findOne(id)
        };
    }

    @Post()
    async create(@Body() product: ProductCreateDto): Promise<{ data: Product }> {
        return {
            data: await this.productsService.create(product as Product)
        };
    }

    @Put(':id')
    @UseGuards(ExistsGuard(ProductsService))
    async update(@Param('id') id: number, @Body() product: Product): Promise<{ data: Product }> {
        return {
            data: await this.productsService.update(id, product)
        };
    }

    @Delete(':id')
    @UseGuards(ExistsGuard(ProductsService))
    async delete(@Param('id') id: number): Promise<{ data: string }> {
        const prod = await this.productsService.findOne(id);
        if (prod == null || prod == undefined) {
            return {
                data: 'Product not found'
            }
        }
        const asd = await this.productsService.delete(id);
        console.log(asd);
        return {
            data: 'Product deleted'
        }
    }
}
