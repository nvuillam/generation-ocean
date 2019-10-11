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

// User management resources
import { UsersModule } from './resources/base/users-groups-root/users/users.module';
import { GroupsModule } from './resources/base/users-groups-root/groups/groups.module';
import { AuthModule } from './resources/base/users-groups-root/auth/auth.module';

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
    // User management resources
    AuthModule,
    UsersModule,
    GroupsModule,
    // Ref
    AlguaeDescriptionsModule,
    // Services
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
