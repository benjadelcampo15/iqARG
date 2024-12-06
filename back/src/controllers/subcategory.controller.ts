import { Controller, Get } from "@nestjs/common";
import { SubCategory } from "src/entities/subCategory";
import { subCategoryService } from "src/services/subCategoryService";

@Controller("subcategories")

export class SubCategoryController {

    constructor(private readonly subCategoryService: subCategoryService){}
    @Get()
    async getAll(): Promise<SubCategory[]> {
        return await this.subCategoryService.getAll();
    }


}