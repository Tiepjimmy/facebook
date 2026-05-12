import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './container/facebook/users/users.module';
import { ExtentionModule } from './container/facebook/extention/extention.module';
import { AuthModule } from './container/facebook/auth/auth.module';
import { FbOverrideConfigModule } from './container/facebook/fb-override-config/fb-override-config.module';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    ExtentionModule,
    AuthModule,
    FbOverrideConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
