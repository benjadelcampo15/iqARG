import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(express.json({ limit: '10mb' })); // Cambia '50mb' según tus necesidades
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
