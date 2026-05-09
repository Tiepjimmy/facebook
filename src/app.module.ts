import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import configuration from './config/configuration';
import { CameraLogModule } from './container/parking/camera-log/camera-log.module';
import { CardModule } from './container/parking/card/card.module';
import { CustomerModule } from './container/parking/customer/customer.module';
import { ParkingLotModule } from './container/parking/parking-lot/parking-lot.module';
import { ParkingSlotModule } from './container/parking/parking-slot/parking-slot.module';
import { RealmModule } from './container/parking/realm/realm.module';
import { TransactionModule } from './container/parking/transaction/transaction.module';
import { TicketModule } from './container/parking/ticket/ticket.module';
import { UserModule } from './container/parking/user/user.module';
import { VehicleModule } from './container/parking/vehicle/vehicle.module';
import { ParkingModule } from './container/parkings/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CardModule,
    CameraLogModule,
    CustomerModule,
    ParkingModule,
    ParkingLotModule,
    ParkingSlotModule,
    PrismaModule,
    RealmModule,
    TransactionModule,
    UserModule,
    VehicleModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
