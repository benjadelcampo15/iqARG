import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { categories } from 'src/utils/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit(): Promise<void> {
    const categorias = await this.categoryRepository.find();

    if (categorias.length == 0) {
      categories.forEach((category) => {
        this.categoryRepository.save(category);
      });
    }

    
  }
}
