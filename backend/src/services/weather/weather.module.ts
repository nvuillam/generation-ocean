import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

import { WeatherService } from './weather.service';
import { OpenWeatherMapService } from './openweathermap/openweathermap.service';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [],
  providers: [WeatherService, OpenWeatherMapService, ConfigService],
})
export class WeatherModule { } 
