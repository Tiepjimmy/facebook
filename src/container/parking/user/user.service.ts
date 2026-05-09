import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationDto } from '../../../common/dto/search-dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (!dto.fullname || !dto.username || !dto.password || !dto.role) {
      throw new BadRequestException(
        'fullname, username, password and role are required',
      );
    }

    try {
      return await this.prisma.user.create({
        data: {
          fullname: dto.fullname,
          username: dto.username,
          password: dto.password,
          role: dto.role,
          status: dto.status ?? 'ACTIVE',
          realmId: dto.realmId,
          lastLoginAt: this.parseDate(dto.lastLoginAt),
          createdBy: dto.createdBy,
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Username already exists');
    }
  }

  async findAll(query: PaginationDto) {
    const page = Number(query.page ?? 1) || 1;
    const pageSize = Number(query.page_size ?? 50) || 50;
    const where = { isDeleted: false };

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          fullname: dto.fullname,
          username: dto.username,
          password: dto.password,
          role: dto.role,
          status: dto.status,
          realmId: dto.realmId,
          lastLoginAt: this.parseDate(dto.lastLoginAt),
          updatedBy: dto.updatedBy,
          updatedDate: new Date(),
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Username already exists');
    }
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedBy,
        deletedDate: new Date(),
      },
    });
  }

  private parseDate(value?: string | null) {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('lastLoginAt must be a valid date');
    }

    return date;
  }

  private handlePrismaError(error: unknown, message: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(message);
    }

    throw error;
  }
}
