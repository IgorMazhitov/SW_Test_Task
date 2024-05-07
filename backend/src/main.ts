import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appPort = process.env.PORT || 3300;
  const appEnv = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });
  const config = new DocumentBuilder()
    .setTitle('ScoreWarriors')
    .setDescription('Documentation for admin side')
    .setVersion('1.0.0')
    .addTag('Igor Mazhitov')
    .build();
  const connection = app.get(DataSource)
  await connection.runMigrations()
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(appPort, () =>
    console.log(
      `
        Application started, ScoreWarriors - Welcome to the Admin
        PORT IS = ${appPort} and ENV IS = ${appEnv}
      `,
    ),
  );
}
bootstrap();
