import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking-slot.dto';

@Injectable()
export class ParkingSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateParkingSlotDto) {
    if (!dto.slotCode?.trim()) {
      throw new BadRequestException('slotCode is required');
    }

    return this.prisma.parkingSlot.create({
      data: {
        realmId: dto.realmId,
        lotId: dto.lotId,
        slotCode: dto.slotCode.trim(),
        status: dto.status?.trim() || 'EMPTY',
        createdBy: dto.createdBy,
      },
    });
  }

  findAll() {
    return this.prisma.parkingSlot.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const parkingSlot = await this.prisma.parkingSlot.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!parkingSlot) {
      throw new NotFoundException('Parking slot not found');
    }

    return parkingSlot;
  }

  async update(id: number, dto: UpdateParkingSlotDto) {
    await this.findOne(id);

    const data: Prisma.ParkingSlotUpdateInput = {
      updatedDate: new Date(),
    };

    if (dto.realmId !== undefined) data.realmId = dto.realmId;
    if (dto.lotId !== undefined) data.lotId = dto.lotId;
    if (dto.slotCode !== undefined) {
      if (!dto.slotCode.trim()) {
        throw new BadRequestException('slotCode cannot be empty');
      }
      data.slotCode = dto.slotCode.trim();
    }
    if (dto.status !== undefined) {
      if (!dto.status.trim()) {
        throw new BadRequestException('status cannot be empty');
      }
      data.status = dto.status.trim();
    }
    if (dto.updatedBy !== undefined) data.updatedBy = dto.updatedBy;

    return this.prisma.parkingSlot.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.parkingSlot.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedDate: new Date(),
        deletedBy,
      },
    });
  }
}
