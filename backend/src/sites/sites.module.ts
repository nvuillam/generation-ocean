import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { SiteSchema } from './site.model';

import { ObservationsModule } from '../observations/observations.module';
import { ObservationsService } from '../observations/observations.service';
import { ObservationSchema } from '../observations/observation.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Site', schema: SiteSchema },
      { name: 'Observation', schema: ObservationSchema },
    ]),
    ObservationsModule
  ],
  controllers: [SitesController],
  providers: [SitesService,ObservationsService],
})
export class SitesModule {}