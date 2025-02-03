import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from 'src/entities/view';

@Module({
  imports: [TypeOrmModule.forFeature([View])],
  controllers: [],
  providers: [],
})
export class ViewModule {}
