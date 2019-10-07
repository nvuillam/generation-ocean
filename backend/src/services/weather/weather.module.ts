import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';

// Current module
import { WeatherService } from './weather.service';
import { OpenWeatherMapService } from './openWeatherMap/openWeatherMap.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [WeatherService],
  controllers: [],
  providers: [WeatherService, OpenWeatherMapService],
})
export class WeatherModule { }
