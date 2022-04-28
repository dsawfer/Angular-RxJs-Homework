import {Body, Controller, Get, Post} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProductEntity} from '../entity/product.entity';

@Controller('products')
export class ProductsController {
    @InjectRepository(ProductEntity)
    protected readonly entitiesRepository: Repository<ProductEntity>;

    @Get()
    async getAll(): Promise<ProductEntity[]> {
        return this.entitiesRepository.find();
    }

    @Post()
    async create(@Body() product: Partial<ProductEntity>): Promise<ProductEntity> {
        return this.entitiesRepository.save(product);
    }

}
