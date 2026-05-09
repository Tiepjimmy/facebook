import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaginationDto } from '../../../common/dto/search-dto';
import { CreateRealmDto } from './dto/create-realm.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';

@Injectable()
export class RealmService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRealmDto) {
    if (!dto.code) {
      throw new BadRequestException('code is required');
    }

    try {
      return await this.prisma.realm.create({
        data: {
          realmId: dto.realmId,
          name: dto.name,
          code: dto.code,
          createdBy: dto.createdBy,
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Realm code already exists');
    }
  }

  async findAll(query: PaginationDto) {
    const page = Number(query.page ?? 1) || 1;
    const pageSize = Number(query.page_size ?? 50) || 50;
    const where = { isDeleted: false };

    const [items, total] = await Promise.all([
      this.prisma.realm.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.realm.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const realm = await this.prisma.realm.findFirst({
      where: { id, isDeleted: false },
    });

    if (!realm) {
      throw new NotFoundException('Realm not found');
    }

    return realm;
  }

  async update(id: number, dto: UpdateRealmDto) {
    await this.findOne(id);

    try {
      return await this.prisma.realm.update({
        where: { id },
        data: {
          realmId: dto.realmId,
          name: dto.name,
          code: dto.code,
          updatedBy: dto.updatedBy,
          updatedDate: new Date(),
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Realm code already exists');
    }
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.realm.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedBy,
        deletedDate: new Date(),
      },
    });
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
