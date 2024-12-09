import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dtos/product.dto';
import { Category } from 'src/entities/category';
import { Product } from 'src/entities/product';
import { SubCategory } from 'src/entities/subCategory';
import { View } from 'src/entities/view';
import { products } from 'src/utils/products';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>,
  ) {}

  async onModuleInit() {
    const exists = await this.productRepository.find();

    const existsCat = await this.subCategoryRepository.find();

    console.log(
      'fecha',
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false, // Deshabilita el formato de 12 horas (AM/PM)
      }),
    );

    const category = await this.categoryRepository.findOne({
      where: { name: products[0].category },
    });
    if (existsCat.length != 0) {
      if (exists.length === 0) {
        for (const product of products) {
          const subCategory = await this.subCategoryRepository.findOne({
            where: { name: product.subCategory },
          });

          await this.productRepository.save({
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            brand: product.brand,
            color: product.color,
            material: product.material,
            size: product.size,
            measurement: product.measurement,
            subCategory: subCategory,
            category: category,
          });
        }
      }
    }
  }
  async getAll(): Promise<any[]> {
    // Obtener los productos con sus relaciones
    const products = await this.productRepository.find({
      relations: ['category', 'subCategory', 'views'],
    });

    // Transformar los resultados para incluir el número de vistas
    return products.map((product) => {
      return {
        ...product,
        views: product.views?.length || 0, // Reemplazar el array de views con su tamaño
      };
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'subCategory'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async addProduct(product: ProductDto): Promise<Product> {
    try {
      const subCategory = await this.subCategoryRepository.findOne({
        where: { name: product.subCategory },
      });

      const category = await this.categoryRepository.findOne({
        where: { name: product.category },
      });

      if (!subCategory) {
        throw new NotFoundException(
          `SubCategory ${product.subCategory} not found`,
        );
      }
      await this.productRepository.save({
        name: product.name,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        description: product.description,
        color: product.color,
        material: product.material,
        size: product.size,
        measurement: product.measurement,
        subCategory: subCategory,
        category: category,
      });

      const newProduct = await this.productRepository.findOne({
        where: { name: product.name },
        relations: ['subCategory', 'subCategory.category'],
      });

      return newProduct;
    } catch (error) {
      throw new Error(`Failed to add product: ${error.message}`);
    }
  }

  async modifyProduct(id: string, product: Partial<Product>): Promise<Product> {
    // Verificar si el producto existe antes de actualizar
    const existingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Actualizar el producto
    await this.productRepository.update(id, product);

    // Retornar el producto actualizado
    const updatedProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['subCategory', 'subCategory.category'],
    });
    if (!updatedProduct) {
      throw new NotFoundException(
        `Failed to retrieve updated product with ID ${id}`,
      );
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    // Verificar si el producto existe
    const existingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Eliminar el producto
    await this.productRepository.delete(id);
  }
}
