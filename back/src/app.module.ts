import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm';
import { CategoryModule } from './modules/category.module';
import { subCategoryModule } from './modules/subCategory.module';
import { ProductModule } from './modules/product.module';
import { View } from 'typeorm';
import { ViewModule } from './modules/view.module';
import { AdminUserModule } from './modules/adminUser.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CategoryModule,
    subCategoryModule,
    ProductModule,
    ViewModule,
    AdminUserModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
