import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CategoryDto } from "src/dtos/category.dto";
import { CategoryService } from "src/services/category.service";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getCategories() {
        return this.categoryService.getAll();
    }

    @Post()
    createCategory(@Body () category: CategoryDto) {
        return this.categoryService.createCategory(category);
    }

    @Delete(':id')
    deleteCategory( @Param('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }


}