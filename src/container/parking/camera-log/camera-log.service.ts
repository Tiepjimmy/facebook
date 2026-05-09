import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCameraLogDto } from './dto/create-camera-log.dto';
import { UpdateCameraLogDto } from './dto/update-camera-log.dto';

@Injectable()
export class CameraLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCameraLogDto) {
    if (!dto.type?.trim()) {
      throw new BadRequestException('type is required');
    }

    return this.prisma.cameraLog.create({
      data: {
        realmId: dto.realmId,
        ticketId: dto.ticketId,
        imageUrl: dto.imageUrl,
        type: dto.type.trim(),
        capturedAt: this.parseDate(dto.capturedAt),
        createdBy: dto.createdBy,
      },
    });
  }

  findAll() {
    return this.prisma.cameraLog.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const cameraLog = await this.prisma.cameraLog.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!cameraLog) {
      throw new NotFoundException('Camera log not found');
    }

    return cameraLog;
  }

  async update(id: number, dto: UpdateCameraLogDto) {
    await this.findOne(id);

    const data: Prisma.CameraLogUpdateInput = {
      updatedDate: new Date(),
    };

    if (dto.realmId !== undefined) data.realmId = dto.realmId;
    if (dto.ticketId !== undefined) data.ticketId = dto.ticketId;
    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl;
    if (dto.type !== undefined) {
      if (!dto.type.trim()) {
        throw new BadRequestException('type cannot be empty');
      }
      data.type = dto.type.trim();
    }
    if (dto.capturedAt !== undefined) {
      data.capturedAt = this.parseDate(dto.capturedAt);
    }
    if (dto.updatedBy !== undefined) data.updatedBy = dto.updatedBy;

    return this.prisma.cameraLog.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, deletedBy?: string) {
    await this.findOne(id);

    return this.prisma.cameraLog.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedDate: new Date(),
        deletedBy,
      },
    });
  }

  private parseDate(value?: string | null) {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('capturedAt must be a valid date');
    }

    return date;
  }
}
