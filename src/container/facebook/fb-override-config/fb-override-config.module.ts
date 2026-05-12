import { Module } from '@nestjs/common';
import { FbOverrideConfigController } from './fb-override-config.controller';
import { FbOverrideConfigService } from './fb-override-config.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
      PrismaModule,
      AuthModule
  ],
  controllers: [FbOverrideConfigController],
  providers: [FbOverrideConfigService]
})
export class FbOverrideConfigModule {}
