import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reference')
export class Reference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column()
    images: string;
}