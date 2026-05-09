import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CardModule } from '../parking/card/card.module';

@Module({
  imports: [PrismaModule, CardModule],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
