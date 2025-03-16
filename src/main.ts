import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // Tem esse nome de ValidationPipe porque ele está sendo encaixado onde os dados estão sendo passados
    new ValidationPipe({
      // Remove chaves que não estão no DTO
      whitelist: true,
      // Levantar erro quando a chave não existir
      forbidNonWhitelisted: true,
      // true -> Tenta transformar os tipos de dados de parâmetros e dtos
      transform: false,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
