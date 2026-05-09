import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CameraLogController } from './camera-log.controller';
import { CameraLogService } from './camera-log.service';

@Module({
  imports: [PrismaModule],
  controllers: [CameraLogController],
  providers: [CameraLogService],
})
export class CameraLogModule {}
