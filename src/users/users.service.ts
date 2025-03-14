import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository((User))
        private repo: Repository<User>
      ){}
    async findOne(name: string): Promise<User | undefined> {
        return this.repo.findOneBy({name});
      }
}
