import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { SubCategory } from 'src/entities/subCategory';
import { products } from 'src/utils/products';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async onModuleInit() {
    const exists = await this.productRepository.find();

    const existsCat = await this.subCategoryRepository.find();

    if (existsCat.length != 0) {
      if (exists.length === 0) {
        for (const product of products) {
          const subCategory = await this.subCategoryRepository.findOne({
            where: { name: product.subCategory },
          });

          await this.productRepository.save({
            name: product.name,
            price: product.price,
            stock: product.stock,
            subCategory: subCategory,
            
          });
        }
      }
    }
  }
  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['subCategory', 'subCategory.category'],
    });
  }
}
