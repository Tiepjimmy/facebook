import { Module } from '@nestjs/common';
import { ExtentionController } from './extention.controller';
import { ExtentionService } from './extention.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExtentionController],
  providers: [ExtentionService]
})
export class ExtentionModule {}
