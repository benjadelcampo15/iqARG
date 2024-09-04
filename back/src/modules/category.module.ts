import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import typeOrm from "src/config/typeorm";
import { Category } from "src/entities/category";
import { Product } from "src/entities/product";
import { SubCategory } from "src/entities/subCategory";
import { CategoryService } from "src/services/category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category , SubCategory , Product])],
    controllers: [],
    providers: [CategoryService],
    
})

export class CategoryModule {}