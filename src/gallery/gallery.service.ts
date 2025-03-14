import { Injectable } from '@nestjs/common';
import { Gallery } from './entities/gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly repository: Repository<Gallery>
  ) {}


  async findByCategory(id: number) {
    return await this.repository.find({
      where: { category_id: id }
    });
  }

  async create(data){
    return await this.repository.save(data);
  }
}
