import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subCategoriesDto } from 'src/dtos/subCategory.dto';
import { Category } from 'src/entities/category';
import { SubCategory } from 'src/entities/subCategory';
import { subCategories } from 'src/utils/subCategories';
import { Repository } from 'typeorm';
@Injectable()
export class subCategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async onModuleInit(): Promise<void> {
    const exists = await this.subCategoryRepository.find();

    if (exists.length === 0) {
      for (const subCategory of subCategories) {
        // const category = await this.categoryRepository.findOne({
        //   where: { name: subCategory.category },
        // });
        const category = await this.categoryRepository.findOne({
          where: { name: subCategory.category },
        });
        console.log(category);
        // console.log(subCategory.category);

        if (category) {
          await this.subCategoryRepository.save({
            name: subCategory.name,
            category: category,
          });
        }
      }
    }
  }

  async getAll(): Promise<SubCategory[]> {
    return await this.subCategoryRepository.find({ relations: ['category'] });
  }

  async createSubCategory(subCategory: subCategoriesDto): Promise<SubCategory> {
    const category = await this.categoryRepository.findOne({
      where: { name: subCategory.category },
    });
    if (!category) {
      throw new Error(`Category with name ${subCategory.category} not found`);
    }
    const newSubCategory = this.subCategoryRepository.create({
      name: subCategory.name,
      category: category,
    });
    try {
      return await this.subCategoryRepository.save(newSubCategory);
    } catch (error) {
      throw new Error(`Failed to create subcategory: ${error.message}`);
    }
  }

  async deleteSubCategory(id: string): Promise<string> {
    await this.subCategoryRepository.delete(id);
    return `Subcategory with ID ${id} has been deleted successfully.`;
  }
}
