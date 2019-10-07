import { Injectable, } from '@nestjs/common';

import { ConfigService } from '../../config/config.service'
import { OpenWeatherMapService } from './openweathermap/openweathermap.service'
import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  constructor(private config: ConfigService,
    private openWeatherMapService: OpenWeatherMapService) { }

  // Call related weather info service
  async getLocalWeatherInfo(posLatitude: Number, posLongitude: Number): Promise<Weather> {
    const weatherProvider = this.getWeatherApiProvider()
    // OpenWeatherMap.com
    if (weatherProvider === 'openweathermap') {
      return this.openWeatherMapService.getLocalWeatherInfo(posLatitude, posLongitude)
    }
  }

  private getWeatherApiProvider(): string {
    return this.config.get('PROVIDER_WEATHER') || 'openweathermap'
  }

}
