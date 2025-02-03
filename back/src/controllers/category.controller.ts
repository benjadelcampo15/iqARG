import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryDto } from 'src/dtos/category.dto';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getAll();
  }

  @Post()
  async createCategory(@Body() category: CategoryDto) {
    return await this.categoryService.createCategory(category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoryService.deleteCategory(id);
    return { message: 'Category deleted successfully.' };
  }
}
