import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminUserService } from '../services/adminUser.service';
import { AdminUserController } from '../controllers/adminUser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../entities/adminUser';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-very-secure-secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
  ],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
