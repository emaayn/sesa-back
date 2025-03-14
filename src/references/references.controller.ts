import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('references')
export class ReferencesController {
    constructor(
        private readonly service: ReferencesService
    ){}

@UseGuards(AuthGuard)
@Post('create')
@UseInterceptors(FileInterceptor('images', {
  storage: diskStorage({
    destination: './public',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, `${uniqueSuffix}-${file.originalname}`);
    }
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  }
}))
async createReference(
  @Body() body,
  @UploadedFile() file: Express.Multer.File
) {
    body.image = file.filename;
  return this.service.create(body);
}

@UseGuards(AuthGuard)
@Get('delete/:id')
async deleteReference(
    @Param('id') id: number 
){
    return await this.service.delete(id);
}

@Get(':id')
async findOne(
    @Param('id') id: number 
){
    return await this.service.findOne(id);
}
 
@Get('get')
async find(){
  return await this.service.findAll();
}
}