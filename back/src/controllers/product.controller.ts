import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductDto } from "src/dtos/product.dto";
import { Product } from "src/entities/product";
import { ProductService } from "src/services/product.service";

@Controller('products')

export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    async getAll(): Promise<Product[]> {
        return await this.productService.getAll();
    }


    @Post()
    async addProduct(@Body() product: ProductDto): Promise<Product> {
        return await this.productService.addProduct(product);   
    }



}