import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'product_entity'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    image: string;
}