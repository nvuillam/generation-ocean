// Common modules
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

// Base Resources modules
import { ObservationsModule } from './resources/base/observations/observations.module';
import { QuadratsModule } from './resources/base/quadrats/quadrats.module';
import { SitesModule } from './resources/base/sites/sites.module';
import { TransectsModule } from './resources/base/transects/transects.module';
import { UsersGroupsModule } from './resources/base/users-groups-root/user-groups.module';

// Ref resources modules
import { AlguaeDescriptionsModule } from './resources/ref/alguae-descriptions/alguae-descriptions.module';

// Services modules 
import { WeatherModule } from './services/weather/weather.module';

@Module({
  imports: [
    // Common
    ConfigModule,
    DatabaseModule,
    // Base resources
    ObservationsModule,
    QuadratsModule,
    SitesModule,
    TransectsModule,
    UsersGroupsModule,
    // Ref
    AlguaeDescriptionsModule,
    // Services
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
