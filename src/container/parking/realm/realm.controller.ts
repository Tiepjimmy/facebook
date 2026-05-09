import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '../../../common/dto/search-dto';
import { CreateRealmDto } from './dto/create-realm.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';
import { RealmService } from './realm.service';

@Controller('realms')
export class RealmController {
  constructor(private readonly realmService: RealmService) {}

  @Post()
  create(@Body() dto: CreateRealmDto) {
    return this.realmService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.realmService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.realmService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRealmDto,
  ) {
    return this.realmService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('deletedBy') deletedBy?: string,
  ) {
    return this.realmService.remove(id, deletedBy);
  }
}
