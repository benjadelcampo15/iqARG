import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product';
import { ProductService } from 'src/services/product.service';
import { v4 as uuidv4 } from 'uuid';

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
    console.log(product);

    return await this.productService.addProduct(product);
  }

  @Put(':id')
  async modifyProduct(
    @Body() product: Partial<Product>,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.modifyProduct(id, product);
  }

  @Post(':id/view')
  async addView(@Param('id') productId: string, @Req() request: Request) {
    const userId = request?.body.userId ? request.body.userId : uuidv4();
    console.log('Se ingreso en el controlador: ', userId);

    await this.productService.addProductView(userId, productId);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.deleteProduct(id);
    return { message: `Product with ID ${id} has been deleted successfully.` };
  }
}
