import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from 'src/entities/adminUser';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [],
  providers: [],
})
export class AdminUserModule {}
