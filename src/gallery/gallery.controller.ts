import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('gallery')
export class GalleryController {

    constructor(
        private readonly service: GalleryService
    ){}

@Get('items/:id')
findByCategory(@Param('id') id: string) {
  return this.service.findByCategory(+id);
}
@Get('get')
findAll() {
  return this.service.findAll();
}
@Get('delete/:id')
delete(@Param('id') id: string) {
  return this.service.delete(+id);
}
/* @UseGuards(AuthGuard) */
@Post('create')
@UseInterceptors(FileInterceptor('image', {
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
async addGalleryImage(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any
) {
  let data = body;
  data.image_path = file.filename;
  return this.service.create(data);
}

@Get('photo/:file')
seeUploadedFile(@Param() params, @Res() res) {
  return res.sendFile('/' + params.file, { root: './public' });
}
}
