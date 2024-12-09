import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product';
import { Category } from './category';

@Entity({ name: 'subcategories' })
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;
}
