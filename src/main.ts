import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  ConfigModule.forRoot({
    ignoreEnvFile: true,
  });

  // default postman support
  const config = new DocumentBuilder()
    .setTitle('Vocabulary Learning Application')
    .setDescription('Vocabulary Learning Application API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORt, () => {
    console.log(
      'Vocabulary Learning Application server is running on port :--',
      8800,
    );
  });
}
bootstrap();
