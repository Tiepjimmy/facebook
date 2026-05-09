import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';

@Injectable()
export class ParkingLotService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateParkingLotDto) {
    if (!dto.name?.trim()) {
      throw new BadRequestException('name is required');
    }

    return this.prisma.parkingLot.create({
      data: {
        realmId: dto.realmId,
        name: dto.name.trim(),
        location: dto.location,
        capacity: dto.capacity,
        createdBy: dto.createdBy,
      },
    });
  }

  findAll() {
    return this.prisma.parkingLot.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const parkingLot = await this.prisma.parkingLot.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!parkingLot) {
      throw new NotFoundException('Parking lot not found');
    }

    return parkingLot;
  }

  async update(id: number, dto: UpdateParkingLotDto) {
    await this.findOne(id);

    const data: Prisma.ParkingLotUpdateInput = {
      updatedDate: new Date(),
    };

    if (dto.realmId !== undefined) data.realmId = dto.realmId;
    if (dto.name !== undefined) {
      if (!dto.name.trim()) {
        throw new BadRequestException('name cannot be empty');
      }
      data.name = dto.name.trim();
    }
    if (dto.location !== undefined) data.location = dto.location;
    if (dto.capacity !== undefined) data.capacity = dto.capacity;
    if (dto.updatedBy !== undefined) data.updatedBy = dto.updatedBy;

    return this.prisma.parkingLot.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.parkingLot.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedDate: new Date(),
        deletedBy,
      },
    });
  }
}
