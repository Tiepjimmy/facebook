import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationDto } from '../../../common/dto/search-dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCardDto) {
    if (!dto.uid || !dto.status) {
      throw new BadRequestException('uid and status are required');
    }

    try {
      return await this.prisma.card.create({
        data: {
          uid: dto.uid,
          status: dto.status,
          realmId: dto.realmId,
          vehicleId: dto.vehicleId,
          createdBy: dto.createdBy,
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Card uid already exists');
    }
  }

  async findAll(query: PaginationDto) {
    const page = Number(query.page ?? 1) || 1;
    const pageSize = Number(query.page_size ?? 50) || 50;
    const where = { isDeleted: false };

    const [items, total] = await Promise.all([
      this.prisma.card.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.card.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const card = await this.prisma.card.findFirst({
      where: { id, isDeleted: false },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async update(id: number, dto: UpdateCardDto) {
    await this.findOne(id);

    try {
      return await this.prisma.card.update({
        where: { id },
        data: {
          uid: dto.uid,
          status: dto.status,
          realmId: dto.realmId,
          vehicleId: dto.vehicleId,
          updatedBy: dto.updatedBy,
          updatedDate: new Date(),
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Card uid already exists');
    }
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.card.update({
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
