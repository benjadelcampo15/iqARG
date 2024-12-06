import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product';
@Entity('view')
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  createdAt: string = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false,
  });

  @ManyToOne(() => Product, (product) => product.views)
  product: Product;
}
