import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransectsModule } from '../transects/transects.module';
import { TransectsService } from '../transects/transects.service';
import { TransectSchema } from '../transects/transect.model';

import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';
import { ObservationSchema } from './observation.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Observation', schema: ObservationSchema },
      { name: 'Transect', schema: TransectSchema },
    ]),
    TransectsModule 
  ],
  controllers: [ObservationsController],
  providers: [ObservationsService,TransectsService],
})
export class ObservationsModule {} 
