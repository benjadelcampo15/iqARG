import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dtos/category.dto';
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

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['subCategories'] });
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['subCategories'],
    });
  }

  async createCategory(category: CategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  async deleteCategory(id: string): Promise<string> {
    await this.categoryRepository.delete(id);
    return `Category with ID ${id} has been deleted successfully.`;
  }
}
