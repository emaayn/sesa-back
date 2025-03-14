import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_tr: string;

    @Column()
    name_en: string;

    @Column()
    description_tr: string;

    @Column()
    description_en: string;

    @Column()
    vertical_image: string;

    @Column()
    horizontal_image: string;

    @Column()
    slug: string;
}