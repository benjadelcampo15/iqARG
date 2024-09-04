import { Controller, Get } from "@nestjs/common";
import { Product } from "src/entities/product";
import { ProductService } from "src/services/product.service";

@Controller('products')

export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    async getAll(): Promise<Product[]> {
        return await this.productService.getAll();
    }


}