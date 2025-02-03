import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Category } from 'src/entities/category';
import { SubCategory } from 'src/entities/subCategory';
import { Product } from 'src/entities/product';
import { View } from 'src/entities/view';
import { AdminUser } from 'src/entities/adminUser';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: 'localhost', //process.env.DB_HOST,
  port: 5432, //Number(process.env.DB_PORT),
  username: 'postgres', //process.env.DB_USERNAME
  password: 'admin', //process.env.DB_PASSWORD
  database: 'IQ Foil', //process.env.DB_NAME,
  entities: [Category, SubCategory, Product, View, AdminUser],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  autoloadEntities: true,
  logging: ['error'],
  migrationsRun: true,
  synchronize: true,
  //dropSchema: true,
};
export default registerAs('typeorm', () => config);
export const connectDataSource = () =>
  new DataSource(config as DataSourceOptions);
