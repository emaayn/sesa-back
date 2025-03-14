import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customFileFilter, setPhotoName } from 'src/utils/helpers';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
constructor(
    private readonly service: ProductsService
){}

//@UseGuards(AuthGuard)
@Post('create')
@UseInterceptors(FileFieldsInterceptor([
    { name: 'product_one', maxCount: 1 },
    { name: 'product_two', maxCount: 1 },
    { name: 'product_three', maxCount: 1 },
    { name: 'product_four', maxCount: 1 },
    { name: 'product_five', maxCount: 1 },
    { name: 'reference_one', maxCount: 1 },
    { name: 'reference_two', maxCount: 1 },
    { name: 'reference_three', maxCount: 1 },
    { name: 'reference_four', maxCount: 1 },
    { name: 'reference_five', maxCount: 1 },
  ],
  //options for files
  {
    storage: diskStorage({
      destination: './public/',
      filename: setPhotoName,
    }),
    fileFilter: customFileFilter,
    limits: {
      files:10,
      fileSize: 1024 * 1024 * 100
    }
  }
  ),
  )
async create(
    @Body() body,
    @UploadedFiles(
    ) files: {
      product_one?: Express.Multer.File[],
      product_two?: Express.Multer.File[],
      product_three?: Express.Multer.File[],
      product_four?: Express.Multer.File[],
      product_five?: Express.Multer.File[],
      reference_one?: Express.Multer.File[],
      reference_two?: Express.Multer.File[],
      reference_three?: Express.Multer.File[],
      reference_four?: Express.Multer.File[],
      reference_five?: Express.Multer.File[]
      }
) {
    let product_images = [];
    let reference_images = [];
    for (const [key, value] of Object.entries(files)) {
        if(key.includes("product")){
            product_images.push(value[0].filename)
        }else if (key.includes("reference")){
            reference_images.push(value[0].filename)
        }
    }
      return await this.service.create(body,product_images,reference_images);
}

@Post('get')
findAll(
  @Body() body
) {
  return this.service.findAll(body);
}
@Get('category/:id')
findByCategory(@Param('id') id: string) {
  return this.service.findByCategory(+id);
}
@Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(+id);
}
@UseGuards(AuthGuard)
@Patch(':id')
@UseInterceptors(FilesInterceptor('files', 10, {
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
  let product_images = [];
  let reference_images = [];
  for (const [key, value] of Object.entries(files)) {
      if(key.includes("product")){
          product_images.push(value[0].filename)
      }else if (key.includes("reference")){
          reference_images.push(value[0].filename)
      }
  }
  product_images.length ? body.product_images = product_images: null;
  reference_images.length ? body.reference_images = reference_images : null
  return this.service.update(+id, body);
}

@UseGuards(AuthGuard)
@Post(':id/reference-image')
@UseInterceptors(FileInterceptor('reference_image', {
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
async addReferenceImage(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File
) {
  const product = await this.service.findOne(+id);
  const currentImages = JSON.parse(product.reference_images || '[]');
  currentImages.push(file.filename);
  return this.service.update(+id, { reference_images: JSON.stringify(currentImages) });
}

@UseGuards(AuthGuard)
@Get(':id/reference-image/:filename')
async deleteReferenceImage(
  @Param('id') id: number,
  @Param('filename') filename: string
) {
  const product = await this.service.findOne(+id);
  const currentImages = JSON.parse(product.reference_images || '[]');
  const updatedImages = currentImages.filter(image => image !== filename);
  this.service.deleteImage(filename);
  return this.service.update(+id, { reference_images: JSON.stringify(updatedImages) });
}

@UseGuards(AuthGuard)
@Delete(':id')
remove(@Param('id') id: string) {
  return this.service.remove(+id);
}

@Get('photo/:file')
seeUploadedFile(@Param() params, @Res() res) {
  return res.sendFile('/' + params.file, { root: './public' });
}
}
