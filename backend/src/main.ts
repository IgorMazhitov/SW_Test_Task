import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appPort = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort, () => console.log('Application started, ScoreWarriors - Welcome to the Admin'));
}
bootstrap();
