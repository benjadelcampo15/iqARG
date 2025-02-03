import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dtos/product.dto';
import { Category } from 'src/entities/category';
import { Product } from 'src/entities/product';
import { SubCategory } from 'src/entities/subCategory';
import { View } from 'src/entities/view';
import { products } from 'src/utils/products';
import { Repository } from 'typeorm';
import cloudinary from '../utils/cloudinary';

import * as fs from 'fs';
import * as path from 'path';

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

    if (existsCat.length !== 0 && exists.length === 0) {
      for (const product of products) {
        // Buscar la categoría correspondiente al producto
        const category = await this.categoryRepository.findOne({
          where: { name: product.category },
        });

        // Buscar la subcategoría correspondiente al producto
        const subCategory = await this.subCategoryRepository.findOne({
          where: { name: product.subCategory },
        });

        if (existsCat.length !== 0 && exists.length === 0) {
          for (const product of products) {
            const imagePath = path.join(
              `../../../front-windserf/src/images`,
              `${product.subCategory} ${product.category}`,
            );

            // Buscar la imagen con múltiples extensiones
            const possibleExtensions = ['.jpg', '.png', '.jpeg'];
            for (const extension of possibleExtensions) {
              const fullImagePath = `${imagePath}${extension}`;

              console.log(path.join(__dirname, fullImagePath));

              if (fs.existsSync(path.join(__dirname, fullImagePath))) {
                product.img = fullImagePath;
                break;
              }
            }
            console.log(product.img);
          }
        }

        // Guardar el producto con su propia categoría y subcategoría
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
          img: product.img ? product.img : null,
          subCategory: subCategory,
          category: category,
          discount: product.discount,
        });
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

      const uploadResult = await cloudinary.uploader
        .upload(product.img, {
          public_id: product.name,
        })
        .catch((error) => {
          console.error('Error al subir la imagen:', error);
          return null; // Asegúrate de devolver un valor manejable
        });

      if (!uploadResult || !uploadResult.secure_url) {
        throw new Error('No se pudo subir la imagen a Cloudinary');
      }

      /* const optimizeUrl = await cloudinary.url(product.name, {
        fetch_format: 'auto',
        quality: 'auto',
      }); */

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
        img: uploadResult.secure_url,
        subCategory: subCategory,
        category: category,
        discount: product.discount,
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

    delete product.views;

    if (product.img !== existingProduct.img) {
      await cloudinary.uploader.destroy(product.name);
      const uploadResult = await cloudinary.uploader
        .upload(product.img, {
          public_id: product.name,
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(uploadResult);

      const optimizeUrl = await cloudinary.url(product.name, {
        fetch_format: 'auto',
        quality: 'auto',
      });
      product.img = optimizeUrl;
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

    console.log(updatedProduct);

    return updatedProduct;
  }

  async addProductView(userId: string, productId: string) {
    const lastView = await this.viewRepository.findOne({
      where: { userId, productId },
      order: { createdAt: 'DESC' },
    });

    console.log('Last view: ', lastView);

    if (lastView) {
      const oneHourInMilliseconds = 1 * 60 * 60 * 1000;

      const [datePart, timePart] = lastView.createdAt.split(', '); // Separar por coma y espacio
      const [day, month, year] = datePart.split('/'); // Separar la fecha en día, mes, año
      const [hours, minutes, seconds] = timePart.split(':'); // Separar la hora en horas, minutos, segundos

      // Crear un objeto Date con la fecha y hora correctas
      const lastViewDate = new Date(
        Number(year), // Año
        Number(month) - 1, // Mes (0-based index)
        Number(day), // Día
        Number(hours), // Hora
        Number(minutes), // Minutos
        Number(seconds), // Segundos
      );

      const timeSinceLastView = Date.now() - lastViewDate.getTime(); // Convert to Date object

      /*       console.log(Date.now());
      console.log(lastViewDate);

      console.log('Tiempo de la ultima vista: ', timeSinceLastView);
      console.log('Una hora: ', oneHourInMilliseconds); */

      if (timeSinceLastView < oneHourInMilliseconds) {
        /*         console.log('No se registra vista'); */
        return;
      }
    }

    const newView = await this.viewRepository.create({
      userId,
      productId,
    });
    console.log('Se registra la vista: ', newView);

    return await this.viewRepository.save(newView);
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
