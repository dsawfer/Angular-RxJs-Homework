import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductEntity} from '../entity/product.entity';
import {ProductsController} from './products.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        ProductEntity
    ])],
    controllers: [ProductsController]
})
export class ProductsModule {
}