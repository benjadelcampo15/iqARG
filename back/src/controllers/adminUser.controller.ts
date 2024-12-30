import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminUserDto } from 'src/dtos/adminUser.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AdminUserService } from 'src/services/adminUser.service';

@Controller('admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  getAdminUser() {
    return this.adminUserService.getAll();
  }

  @Post()
  createAdminUser(@Body() AdminUser: AdminUserDto) {
    return this.adminUserService.createAdminUser(AdminUser);
  }

  @Delete(':id')
  deleteAdminUser(@Param('id') id: string) {
    return this.adminUserService.deleteAdminUser(id);
  }

  @Post('login')
  async login(@Body() AdminUser: AdminUserDto) {
    try {
      const token = await this.adminUserService.validateAdminUser(
        AdminUser.username,
        AdminUser.password,
      );

      return {
        message: 'Login successful',
        token,
      };
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard
  @Post('verify-token')
  verifyToken() {
    return { valid: true }; // Si el guard permite el acceso, el token es válido
  }
}

/* @Post('verify-token')
  async verifyToken(@Body() token: string) {
    try {
      
    } catch (error) {
      
    }
  } */
