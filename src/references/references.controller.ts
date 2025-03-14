import { Body, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('references')
export class ReferencesController {
    constructor(
        private readonly service: ReferencesService
    ){}


    @Get('get')
    async find(){
      return await this.service.findAll();
    } 
/* @UseGuards(AuthGuard) */
@Post('create')
@UseInterceptors(FilesInterceptor('images', 10, {
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
async update(@Param('id') id: string, @Body() body, @UploadedFiles() files: Array<Express.Multer.File>) {
  let images = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    images.push(file.filename)
    
  }
  body.images = JSON.stringify(images);
  return this.service.create( body);
}
/* @UseGuards(AuthGuard) */
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

@Get('photo/:file')
seeUploadedFile(@Param() params, @Res() res) {
  return res.sendFile('/' + params.file, { root: './public' });
}
}