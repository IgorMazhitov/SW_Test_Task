import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const appPort = process.env.PORT || 3300
  const appEnv = process.env.NODE_ENV

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
                        .setTitle('ScoreWarriors')
                        .setDescription('Documentation for admin side')
                        .setVersion('1.0.0')
                        .addTag('Igor Mazhitov')
                        .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
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
