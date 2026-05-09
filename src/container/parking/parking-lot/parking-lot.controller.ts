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
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { ParkingLotService } from './parking-lot.service';

@Controller('parking-lots')
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  @Post()
  create(@Body() dto: CreateParkingLotDto) {
    return this.parkingLotService.create(dto);
  }

  @Get()
  findAll() {
    return this.parkingLotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parkingLotService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateParkingLotDto,
  ) {
    return this.parkingLotService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('deletedBy') deletedBy?: string,
  ) {
    return this.parkingLotService.remove(id, deletedBy);
  }
}
