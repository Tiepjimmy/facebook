import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RealmController } from './realm.controller';
import { RealmService } from './realm.service';

@Module({
  imports: [PrismaModule],
  controllers: [RealmController],
  providers: [RealmService],
})
export class RealmModule {}
