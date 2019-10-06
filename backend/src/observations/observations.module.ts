import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';
import { ObservationSchema } from './observation.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Observation', schema: ObservationSchema },
    ]),
  ],
  controllers: [ObservationsController],
  providers: [ObservationsService],
})
export class ObservationsModule {}
