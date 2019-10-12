import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';

// Current module
import { WeatherService } from './weather.service';
import { OpenWeatherMapService } from './openweathermap/openweathermap.service';
import { IfremerService } from './ifremer/ifremer.service';
import { SitesModule } from '../../resources/base/sites/sites.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    forwardRef(() => SitesModule),
  ],
  exports: [WeatherService, IfremerService],
  controllers: [],
  providers: [WeatherService, OpenWeatherMapService, IfremerService],
})
export class WeatherModule {}
