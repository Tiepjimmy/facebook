import { Controller, Post, Body } from '@nestjs/common';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private service: ParkingService) {}

  @Post('scan')
  scan(@Body() body: { uid: string }) {
    return this.service.scan(body.uid);
  }
}
