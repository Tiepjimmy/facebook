import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaginationDto } from '../../../common/dto/search-dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        realmId: dto.realmId,
        ticketId: dto.ticketId,
        amount: dto.amount,
        paymentType: dto.paymentType,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
        createdBy: dto.createdBy,
      },
    });
  }

  async findAll(query: PaginationDto) {
    const page = Number(query.page ?? 1) || 1;
    const pageSize = Number(query.page_size ?? 50) || 50;
    const where = { isDeleted: false };

    const [items, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, isDeleted: false },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(id: number, dto: UpdateTransactionDto) {
    await this.findOne(id);

    return this.prisma.transaction.update({
      where: { id },
      data: {
        realmId: dto.realmId,
        ticketId: dto.ticketId,
        amount: dto.amount,
        paymentType: dto.paymentType,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
        updatedBy: dto.updatedBy,
        updatedDate: new Date(),
      },
    });
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.transaction.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedBy,
        deletedDate: new Date(),
      },
    });
  }
}
