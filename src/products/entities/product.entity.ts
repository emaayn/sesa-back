import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    letter: string;

    @Column()
    number: string;

    @Column()
    category_id: number;

    @Column()
    description: string;

    @Column()
    product_images: string;

    @Column()
    reference_images: string;

    @Column()
    dimensions: string;

    @Column()
    per_square_meter: string;

}