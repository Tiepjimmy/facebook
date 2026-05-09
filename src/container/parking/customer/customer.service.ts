import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../../common/dto/search-dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        realmId: dto.realmId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        createdBy: dto.createdBy,
      },
    });
  }

  async findAll(query: PaginationDto) {
    const page = Number(query.page ?? 1) || 1;
    const pageSize = Number(query.page_size ?? 50) || 50;
    const where = { isDeleted: false };

    const [items, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, isDeleted: false },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    await this.findOne(id);

    return this.prisma.customer.update({
      where: { id },
      data: {
        realmId: dto.realmId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        updatedBy: dto.updatedBy,
        updatedDate: new Date(),
      },
    });
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.customer.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedBy,
        deletedDate: new Date(),
      },
    });
  }
}
