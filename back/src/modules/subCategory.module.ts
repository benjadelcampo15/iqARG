import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrm from 'src/config/typeorm';
import { SubCategoryController } from 'src/controllers/subcategory.controller';
import { Category } from 'src/entities/category';
import { Product } from 'src/entities/product';
import { SubCategory } from 'src/entities/subCategory';
import { CategoryService } from 'src/services/category.service';
import { subCategoryService } from 'src/services/subCategoryService';

@Module({
  imports: [TypeOrmModule.forFeature([Category, SubCategory, Product])],
  controllers: [SubCategoryController],
  providers: [subCategoryService],
})
export class subCategoryModule {}
