import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CameraLogService } from './camera-log.service';
import { CreateCameraLogDto } from './dto/create-camera-log.dto';
import { UpdateCameraLogDto } from './dto/update-camera-log.dto';

@Controller('camera-logs')
export class CameraLogController {
  constructor(private readonly cameraLogService: CameraLogService) {}

  @Post()
  create(@Body() dto: CreateCameraLogDto) {
    return this.cameraLogService.create(dto);
  }

  @Get()
  findAll() {
    return this.cameraLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cameraLogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCameraLogDto,
  ) {
    return this.cameraLogService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('deletedBy') deletedBy?: string,
  ) {
    return this.cameraLogService.remove(id, deletedBy);
  }
}
