import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
          })
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
      return await this.subCategoryRepository.find({relations: ["category"]});
    }
  }

