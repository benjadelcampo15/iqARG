import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('adminUser')
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  username: string;

  @Column()
  password: string;

}