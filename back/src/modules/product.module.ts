import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "src/controllers/product.controller";
import { Category } from "src/entities/category";
import { Product } from "src/entities/product";
import { SubCategory } from "src/entities/subCategory";
import { ProductService } from "src/services/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product , SubCategory , Category])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [],
})

export class ProductModule {}