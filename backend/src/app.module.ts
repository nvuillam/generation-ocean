import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from './database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ObservationsModule } from './observations/observations.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    /* MongooseModule.forRoot(
      'mongodb://generation-ocean:PlagesVivantes2019@ds249127.mlab.com:49127/generation-ocean',
    ), */
    ObservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
