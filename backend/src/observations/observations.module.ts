import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransectsModule } from '../transects/transects.module';
import { TransectsService } from '../transects/transects.service';
import { TransectSchema } from '../transects/transect.model';

import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';
import { ObservationSchema } from './observation.model';

import { WeatherModule } from '../services/weather/weather.module';
import { WeatherService } from '../services/weather/weather.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Observation', schema: ObservationSchema },
      { name: 'Transect', schema: TransectSchema },
    ]),
    TransectsModule,
    WeatherModule
  ],
  controllers: [ObservationsController],
  providers: [ObservationsService, TransectsService, WeatherService],
})
export class ObservationsModule { } 
