import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';
import { ObservationSchema } from './observation.model';

// Dependencies
import { TransectsModule } from '../transects/transects.module';
import { SitesModule } from '../sites/sites.module';
import { WeatherModule } from '../services/weather/weather.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Observation', schema: ObservationSchema },
    ]),
    forwardRef(() => SitesModule),
    TransectsModule,
    WeatherModule
  ],
  exports: [ObservationsService],
  controllers: [ObservationsController],
  providers: [ObservationsService],
})
export class ObservationsModule { } 
