// Common modules
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

// Resources modules
import { ObservationsModule } from './resources/observations/observations.module';
import { TransectsModule } from './resources/transects/transects.module';
import { QuadratsModule } from './resources/quadrats/quadrats.module';

import { SitesModule } from './resources/sites/sites.module';

// Services modules
import { WeatherModule } from './services/weather/weather.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ObservationsModule,
    SitesModule,
    TransectsModule,
    QuadratsModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
