import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customFileFilter, setPhotoName } from 'src/utils/helpers';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly service: CategoriesService
    ){}

    //@UseGuards(AuthGuard)
    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
    { name: 'horizontal_image', maxCount: 1 },
    { name: 'vertical_image', maxCount: 1 }
  ],
  //options for files
  {
    storage: diskStorage({
      destination: './public/',
      filename: setPhotoName,
    }),
    fileFilter: customFileFilter,
    limits: {
      files:2,
      fileSize: 1024 * 1024 * 20
    }
  }
  ),
  )
async create(
    @Body() body,
    @UploadedFiles(
    ) files: {
        horizontal_image?: Express.Multer.File[],
        vertical_image?: Express.Multer.File[]
      }
) {
    let horizontal_image = [];
    let vertical_image = [];
    for (const [key, value] of Object.entries(files)) {
        if(key.includes("horizontal")){
            horizontal_image.push(value[0].filename);
        } else if (key.includes("vertical")){
            vertical_image.push(value[0].filename);
        }
    }
    let horizontalImages = [horizontal_image[0]];
    body.horizontal_image = JSON.stringify(horizontalImages);
    body.vertical_image = vertical_image[0];
    return await this.service.create(body);
}

/* @UseGuards(AuthGuard) */
@Post(':id/category-image')
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
async addCategoryImage(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File
) {
  const category = await this.service.findOne(+id);
  const currentImages = JSON.parse(category.horizontal_image || '[]');
  currentImages.push(file.filename);
  return this.service.update(+id, { horizontal_image: JSON.stringify(currentImages) });
}
    @Get('get')
    async getAll(){
        return await this.service.find();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.service.findOne(+id);
    }


    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.service.delete(+id);
    }

    @Get('photo/:file')
    seeUploadedFile(@Param() params, @Res() res) {
      return res.sendFile('/' + params.file, { root: './public' });
    }

}