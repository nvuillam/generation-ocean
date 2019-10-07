// Common modules
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

// Resources modules
import { ObservationsModule } from './observations/observations.module';
import { TransectsModule } from './transects/transects.module';
import { SitesModule } from './sites/sites.module';

// Services modules
import { WeatherModule } from './services/weather/weather.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ObservationsModule,
    SitesModule,
    TransectsModule,
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
