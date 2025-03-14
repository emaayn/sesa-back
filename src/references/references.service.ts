import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from './entities/reference.entity';
import { Repository } from 'typeorm';
import { unlink } from 'fs';

@Injectable()
export class ReferencesService {
    constructor(
        @InjectRepository(Reference)
        private readonly repository: Repository<Reference>
      ) {}

      async create(data){
        console.log("data")
        console.log(data)
        return await this.repository.save(data);
      }

      async delete(id){
        const reference = await this.repository.findOneBy({id});
        this.deleteImage(reference.images);
        return await this.repository.delete({id});
      }

      deleteImage(filename){
        unlink("public/" + filename,(err)=> {
          console.log("err");
          console.log(err);
        });
      }

      async findAll(){
        return await this.repository.find();
      }

      async findOne(id){
        return await this.repository.findOneBy({id});
      }
}
