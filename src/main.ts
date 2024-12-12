import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  ConfigModule.forRoot({
    ignoreEnvFile: true,
  });

  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from specific origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials
  });

  // default postman support
  const config = new DocumentBuilder()
    .setTitle('Vocabulary Learning Application')
    .setDescription('Vocabulary Learning Application API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT, () => {
    console.log(
      'Vocabulary Learning Application server is running on port :--',
      process.env.PORT,
    );
  });
}
bootstrap();
