import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gallery')
export class Gallery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image_path: string;

    @Column()
    description: string;

    @Column()
    category_id: number;
}