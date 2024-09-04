import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Category } from 'src/entities/category';
import { SubCategory } from 'src/entities/subCategory';
import { Product } from 'src/entities/product';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category , SubCategory , Product],
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