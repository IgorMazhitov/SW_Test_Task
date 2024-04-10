import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appPort = process.env.PORT || 3300
  const appEnv = process.env.NODE_ENV
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort, () => 
    console.log(
      `
        Application started, ScoreWarriors - Welcome to the Admin
        PORT IS = ${appPort} and ENV IS = ${appEnv}
      `
    )
  );
}
bootstrap();
