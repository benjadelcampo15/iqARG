import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminUserDto } from 'src/dtos/adminUser.dto';
import { AdminUser } from 'src/entities/adminUser';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async getAll(): Promise<AdminUser[]> {
    return await this.adminUserRepository.find();
  }

  async createAdminUser(adminUser: AdminUserDto): Promise<AdminUser> {
    const encryptedAdminUser = {
      username: adminUser.username,
      password: await this.hashPassword(adminUser.password),
    };
    const newAdminUser = this.adminUserRepository.create(encryptedAdminUser);
    try {
      return await this.adminUserRepository.save(newAdminUser);
    } catch (error) {
      throw new Error(`Failed to create adminUser: ${error.message}`);
    }
  }

  async deleteAdminUser(id: string): Promise<string> {
    await this.adminUserRepository.delete(id);
    return `Admin User with ID ${id} has been deleted successfully.`;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validateAdminUser(username: string, password: string): Promise<string> {
    const adminUser = await this.adminUserRepository.findOne({
      where: { username },
    });

    if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
      throw new Error('Invalid credentials');
    }

    // Crear y devolver el token
    const payload = { username };
    return this.jwtService.sign(payload);
  }
}
