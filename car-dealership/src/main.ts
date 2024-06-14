import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve la data innecesaria y solo acepta la del DTO
      forbidNonWhitelisted: true // Marca error en caso de que se mande data innecesaria
    })
  )

  await app.listen(3000);
}
bootstrap();
