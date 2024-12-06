import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Post()
  async addProduct(@Body() product: ProductDto): Promise<Product> {
    return await this.productService.addProduct(product);
  }

  @Put(':id')
  async modifyProduct(
    @Body() product: Partial<Product>,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.modifyProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.deleteProduct(id);
    return { message: `Product with ID ${id} has been deleted successfully.` };
  }
}
