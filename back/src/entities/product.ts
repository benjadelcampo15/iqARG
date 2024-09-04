import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './category';
import { SubCategory } from './subCategory';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({
    default:
      'https://res-console.cloudinary.com/dfdjvas05/thumbnails/v1/image/upload/v1725463908/aW1hZ2UtaWNvbi10cmVuZHktZmxhdC1zdHlsZS02MDBudy02NDMwODA4OTVfcHZjY2Jl/drilldown',
  })
  img: string;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  subCategory: SubCategory;


}
