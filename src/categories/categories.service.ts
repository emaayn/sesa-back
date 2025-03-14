import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { unlink } from 'fs';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>
    ){}

    async find(){
        return await this.repository.find();
    }

    async findOne(id:number){
        return await this.repository.findOneBy({id});
    }

    async findOneBySlug(slug){
        console.log("slug");
        console.log(slug);
        return await this.repository.findOneBy({slug});
    }

    async create(data){
        return await this.repository.save(data);
    }

    async update(id,data){
        return await this.repository.update({id},data)
    }

    async delete(id){
        const category = await this.repository.findOneBy({id});
        this.deleteImage(category.horizontal_image);
        this.deleteImage(category.vertical_image);
        return await this.repository.delete({id});
    }

    deleteImage(filename){
        unlink("public/" + filename,(err)=> {
          console.log("err");
          console.log(err);
      })
      }
}
