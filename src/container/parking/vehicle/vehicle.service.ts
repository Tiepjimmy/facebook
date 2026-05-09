import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaginationDto } from '../../../common/dto/search-dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVehicleDto) {
    if (!dto.plateNumber || !dto.type) {
      throw new BadRequestException('plateNumber and type are required');
    }

    try {
      return await this.prisma.vehicle.create({
        data: {
          realmId: dto.realmId,
          plateNumber: dto.plateNumber,
          color: dto.color,
          type: dto.type,
          customerId: dto.customerId,
          createdBy: dto.createdBy,
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Vehicle plate number already exists');
    }
  }

  async findAll(query: PaginationDto) {
    const page = Number(query.page ?? 1) || 1;
    const pageSize = Number(query.page_size ?? 50) || 50;
    const where = { isDeleted: false };

    const [items, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id, isDeleted: false },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async update(id: number, dto: UpdateVehicleDto) {
    await this.findOne(id);

    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data: {
          realmId: dto.realmId,
          plateNumber: dto.plateNumber,
          color: dto.color,
          type: dto.type,
          customerId: dto.customerId,
          updatedBy: dto.updatedBy,
          updatedDate: new Date(),
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Vehicle plate number already exists');
    }
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.vehicle.update({
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
