import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, FindOptionsWhere, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { unlink } from 'fs';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private categoriesService: CategoriesService
  ) {}
  async create(createProductDto,product_images,reference_images): Promise<Product> {
    createProductDto.product_images = JSON.stringify(product_images);
    createProductDto.reference_images = JSON.stringify(reference_images);
    return await this.repository.save(createProductDto);
  }
  async findAll(body): Promise<Product[]> {
    let entityFilters: FindOptionsWhere<Product> = {
      letter: Boolean(body.letter) ? body.letter : null,
      number: Boolean(body.number) ? body.number : null,
      category_id: Boolean(body.category_id) ? body.category_id : null,
    };
    return await this.repository.findBy(entityFilters);
  }
  async findOne(id: number) {
    let returnData: any = {}
    returnData = await this.repository.findOne({
      where: { id }
    });
    const previousProduct = await this.repository.findOne({
      where: { 
        category_id: returnData.category_id,
        id: LessThan(id)
      }
    });
    const nextProduct = await this.repository.findOne({
      where: { 
        category_id: returnData.category_id,
        id: MoreThan(id)
      }
    });
    returnData.category = null;
    const category = await this.categoriesService.findOne(returnData.category_id);
    if(category){
      returnData.category = category;
    }
    returnData.previous = null;
    returnData.next = null;
    returnData.product_images = JSON.parse(returnData.product_images);
    returnData.reference_images = JSON.parse(returnData.reference_images);
    if(previousProduct){
      returnData.previous = previousProduct;
    }
    if(nextProduct){
      returnData.next = nextProduct;
    }
    return returnData;
  }
  async findByCategory(category_id: number): Promise<Product[]> {
    const products = await this.repository.find({
      where: { category_id }
    });
    return products;
  }
  async update(id: number, updateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    // Merge the existing product with update data
    const updatedProduct = this.repository.merge(product, updateProductDto);
    
    return await this.repository.save(updatedProduct);
  }
  deleteImage(filename){
    unlink("public/" + filename,(err)=> {
      console.log("err");
      console.log(err);
  })
  }
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.repository.remove(product);
  }
}