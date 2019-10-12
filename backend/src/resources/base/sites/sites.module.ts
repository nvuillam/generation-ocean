import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { SiteSchema } from './site.model';

// Dependencies
import { ObservationsModule } from '../observations/observations.module';
import { WeatherModule } from '../../../services/weather/weather.module';
import { SitesListingModule } from '../../../services/sites-listing/sites-listing.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Site', schema: SiteSchema }]),
    forwardRef(() => ObservationsModule),
    SitesListingModule,
    WeatherModule,
  ],
  exports: [SitesService],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
