import { Module } from '@nestjs/common';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from './entities/reference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reference]),
  ],
  controllers: [ReferencesController],
  providers: [ReferencesService]
})
export class ReferencesModule {}
