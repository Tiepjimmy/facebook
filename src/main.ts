import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';


(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  // app.enableCors({
  //   // 1. Chỉ định chính xác Origin của Frontend (không dùng '*')
  //   origin: 'http://localhost:5173',
  //
  //   // 2. Cho phép gửi kèm Cookie và Header Authorization
  //   credentials: true,
  //
  //   // 3. Các phương thức bạn cho phép
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //
  //   // 4. Các header bạn cho phép
  //   allowedHeaders: 'Content-Type, Accept, Authorization',
  // });
  await app.listen(3002);
}
bootstrap();
