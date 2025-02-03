import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryDto } from 'src/dtos/category.dto';
import { SubCategory } from 'src/entities/subCategory';
import { subCategoryService } from 'src/services/subCategoryService';
import { subCategoriesDto } from 'src/dtos/subCategory.dto';

@Controller('subcategories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: subCategoryService) {}
  @Get()
  async getAll(): Promise<SubCategory[]> {
    return await this.subCategoryService.getAll();
  }

  @Post()
  createSubCategory(@Body() subCategory: subCategoriesDto) {
    return this.subCategoryService.createSubCategory(subCategory);
  }

  @Delete(':id')
  deleteSubCategory(@Param('id') id: string) {
    return this.subCategoryService.deleteSubCategory(id);
  }
}
