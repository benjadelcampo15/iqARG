import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './category';
import { SubCategory } from './subCategory';
import { View } from './view';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  stock: number;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  description: string;

  // Actualiza los arrays para que usen "text[]" en PostgreSQL
  @Column('text', { array: true, nullable: true })
  color: string[];

  @Column('text', { array: true, nullable: true })
  material: string[];

  @Column('text', { array: true, nullable: true })
  size: string[];

  @Column('text', { array: true, nullable: true })
  measurement: string[];

  @Column({
    default:
      //'https://res-console.cloudinary.com/dfdjvas05/thumbnails/v1/image/upload/v1725463908/aW1hZ2UtaWNvbi10cmVuZHktZmxhdC1zdHlsZS02MDBudy02NDMwODA4OTVfcHZjY2Jl/drilldown',
      'https://acdn.mitiendanube.com/stores/001/102/572/products/producto-tn-5-0f2c77b4c638fec31017256298586857-1024-1024.webp',
  })
  img: string;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  subCategory: SubCategory;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => View, (view) => view.product)
  views: View[];
}
