import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './api/authentication/authentication.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),

    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),

    // APis implement here
    AuthenticationModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
