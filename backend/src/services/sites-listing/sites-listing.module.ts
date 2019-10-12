import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';

// Current module
import { SitesListingService } from './sites-listing.service';
import { IndigeoService } from './indigeo/indigeo.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 120000,
      maxRedirects: 5,
    }),
  ],
  exports: [SitesListingService],
  controllers: [],
  providers: [SitesListingService, IndigeoService],
})
export class SitesListingModule {}
